import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { sendOrderConfirmationEmail } from "@/lib/email";
import { sendTelegramMessage, escapeHtml } from "@/lib/telegram";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, total, coupon } = body;

    const session = await getServerSession(authOptions);

    // 1. Validate and update stock
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.id }
      });

      if (!product || product.stock < item.quantity) {
        return NextResponse.json({ 
          success: false, 
          error: `Yetersiz stok: ${product?.name || 'Bilinmeyen ürün'}` 
        }, { status: 400 });
      }
    }

    // Create order and order items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create the main order
      const newOrder = await tx.order.create({
        data: {
          userId: session?.user ? (session.user as any).id : null,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          customerAddress: customer.address,
          customerCity: customer.city,
          totalAmount: total,
          couponCode: coupon || null,
          status: "PENDING",
        }
      });

      // 2. Create order items
      const orderItemsData = items.map((item: any) => ({
        orderId: newOrder.id,
        productId: item.id,
        quantity: item.quantity,
        price: Number(item.price),
      }));

      await tx.orderItem.createMany({
        data: orderItemsData
      });

      // 3. Deduct Stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.id },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }

      return newOrder;
    });

    // 3. Post-order actions (Email & Telegram Notifications)
    const fullOrder = await prisma.order.findUnique({
      where: { id: order.id },
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

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error: any) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { success: false, error: "Sipariş oluşturulurken bir hata oluştu: " + error.message },
      { status: 500 }
    );
  }
}
