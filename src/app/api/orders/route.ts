import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { sendTelegramMessage, escapeHtml } from "@/lib/telegram";

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
      const telegramMessage = `🛍 <b>YENİ SİPARİŞ ALINDI!</b> \n\n` +
        `📦 <b>No:</b> #${fullOrder.id}\n` +
        `👤 <b>Müşteri:</b> ${escapeHtml(fullOrder.customerName)}\n` +
        `💰 <b>Tutar:</b> ₺${fullOrder.totalAmount.toLocaleString('tr-TR')}\n` +
        `📍 <b>Şehir:</b> ${escapeHtml(fullOrder.customerCity)}\n\n` +
        `<b>Ürünler:</b> \n` +
        fullOrder.items.map(i => `• ${escapeHtml(i.product.name)} (x${i.quantity})`).join('\n') + 
        `\n\n<i>Hayırlı işler bol kazançlar!</i> 🚀`;

      await sendTelegramMessage(telegramMessage).catch(e => console.error('Telegram Notify Error:', e));
    }

    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Order creation failed:', error);
    return NextResponse.json({ error: 'Sipariş oluşturulamadı: ' + error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

