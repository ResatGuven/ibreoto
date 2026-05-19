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

    // Parse items to extract clean numeric price and qty
    const parsedItems = items.map((item: any) => {
      const qty = Number(item.qty || item.quantity || 1);
      
      let priceVal = 0;
      if (typeof item.price === 'number') {
        priceVal = item.price;
      } else {
        let priceStr = String(item.price || "0").trim();
        priceStr = priceStr.replace(/[₺$€\s]|TL/gi, '');
        if (priceStr.includes(',') && (!priceStr.includes('.') || priceStr.indexOf('.') < priceStr.indexOf(','))) {
          priceStr = priceStr.replace(/\./g, '').replace(',', '.');
        } else if (priceStr.includes('.') && priceStr.includes(',')) {
          priceStr = priceStr.replace(/\./g, '').replace(',', '.');
        } else if (!priceStr.includes(',') && priceStr.includes('.')) {
          // Check if dot is thousand or decimal. In TR Balances, normally dot is thousand separator unless it's a decimal float.
          // If dot is followed by exactly 3 digits and it's a large value, it's likely thousand separator.
          const parts = priceStr.split('.');
          if (parts.length === 2 && parts[1].length !== 3) {
            // e.g. 15.5 or 123.45 (decimal dot)
            // keep it as is
          } else {
            // e.g. 1.480 -> thousand separator
            priceStr = priceStr.replace(/\./g, '');
          }
        }
        priceVal = parseFloat(priceStr) || 0;
      }

      return {
        id: item.id,
        qty,
        price: priceVal
      };
    });

    // 1. Validate and update stock
    for (const item of parsedItems) {
      const product = await prisma.product.findUnique({
        where: { id: item.id }
      });

      if (!product || product.stock < item.qty) {
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
      const orderItemsData = parsedItems.map((item: any) => ({
        orderId: newOrder.id,
        productId: item.id,
        quantity: item.qty,
        price: item.price,
      }));

      await tx.orderItem.createMany({
        data: orderItemsData
      });

      // 3. Deduct Stock
      for (const item of parsedItems) {
        await tx.product.update({
          where: { id: item.id },
          data: {
            stock: {
              decrement: item.qty
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
