import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
      customerName, 
      customerEmail, 
      customerPhone, 
      customerAddress, 
      customerCity, 
      items, 
      totalAmount, 
      discountAmount, 
      couponCode 
    } = body;

    const session = await getServerSession(authOptions);

    // 1. Validate and update stock
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.id }
      });

      if (!product || product.stock < item.qty) {
        return NextResponse.json({ 
          error: `Yetersiz stok: ${product?.name || 'Bilinmeyen ürün'}` 
        }, { status: 400 });
      }
    }

    // 2. Transaction for Order and Stock Update
    const result = await prisma.$transaction(async (tx) => {
      // Create Order
      const order = await tx.order.create({
        data: {
          userId: session?.user ? (session.user as any).id : null,
          customerName,
          customerEmail,
          customerPhone,
          customerAddress,
          customerCity,
          totalAmount: parseFloat(totalAmount),
          discountAmount: parseFloat(discountAmount || 0),
          couponCode,
          items: {
            create: items.map((item: any) => ({
              productId: item.id,
              quantity: item.qty,
              price: parseFloat(item.price.replace('₺', '').replace('.', '').replace(',', '.'))
            }))
          }
        }
      });

      // Deduct Stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.id },
          data: {
            stock: {
              decrement: item.qty
            }
          }
        });
      }

      return order;
    });

    // 3. Post-order actions (Email, etc.)
    const fullOrder = await prisma.order.findUnique({
      where: { id: result.id },
      include: { items: { include: { product: true } } }
    });
    
    if (fullOrder) {
      // Send email (non-blocking)
      sendOrderConfirmationEmail(fullOrder).catch(console.error);

      // Telegram Notification
      const telegramMessage = `🛍️ *YENİ SİPARİŞ ALINDI!* \n\n` +
        `📦 *No:* #${fullOrder.id}\n` +
        `👤 *Müşteri:* ${fullOrder.customerName}\n` +
        `💰 *Tutar:* ₺${fullOrder.totalAmount.toLocaleString('tr-TR')}\n` +
        `📍 *Şehir:* ${fullOrder.customerCity}\n\n` +
        `*Ürünler:* \n` +
        fullOrder.items.map(i => `- ${i.product.name} (x${i.quantity})`).join('\n') + 
        `\n\n_Hayırlı işler bol kazançlar!_ 🚀`;

      fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/telegram`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: telegramMessage })
      }).catch(e => console.error('Telegram Notify Error:', e));
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Order creation failed:', error);
    return NextResponse.json({ error: 'Sipariş oluşturulamadı: ' + error.message }, { status: 500 });
  }
}
