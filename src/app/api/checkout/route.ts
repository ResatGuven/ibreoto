import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, total, coupon } = body;

    // Create order and order items in a transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create the main order
      const newOrder = await tx.order.create({
        data: {
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
        price: item.price,
      }));

      await tx.orderItem.createMany({
        data: orderItemsData
      });

      return newOrder;
    });

    return NextResponse.json({ success: true, orderId: order.id });
  } catch (error) {
    console.error("Checkout API error:", error);
    return NextResponse.json(
      { success: false, error: "Sipariş oluşturulurken bir hata oluştu." },
      { status: 500 }
    );
  }
}
