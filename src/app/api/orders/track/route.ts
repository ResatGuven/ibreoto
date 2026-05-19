import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    let orderId = searchParams.get("orderId") || "";
    
    // Normalize orderId (remove prefix '#' if user typed it)
    orderId = orderId.trim().replace(/^#/, "");

    if (!orderId) {
      return NextResponse.json(
        { error: "Lütfen bir sipariş numarası giriniz." },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    if (!order) {
      return NextResponse.json(
        { error: "Sipariş bulunamadı. Lütfen sipariş numaranızı kontrol ediniz." },
        { status: 404 }
      );
    }

    // Map database status string to display status in Turkish
    let statusText = "Ödeme Bekleniyor";
    if (order.status === "PAID" || order.status === "COMPLETED") {
      statusText = "Hazırlanıyor / Hazırlandı";
    } else if (order.status === "SHIPPED") {
      statusText = "Kargoya Verildi";
    } else if (order.status === "DELIVERED") {
      statusText = "Teslim Edildi";
    } else if (order.status === "CANCELLED") {
      statusText = "İptal Edildi";
    } else {
      statusText = order.status;
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        customerName: order.customerName,
        customerAddress: `${order.customerAddress}, ${order.customerCity}`,
        status: statusText,
        statusCode: order.status,
        cargoNo: order.cargoNo || "Kargo bilgisi bulunmuyor",
        totalAmount: order.totalAmount,
        shippingCost: order.shippingCost,
        createdAt: order.createdAt,
        items: order.items.map(item => ({
          name: item.product.name,
          quantity: item.quantity,
          price: item.price,
          image: item.product.images ? item.product.images.split(",")[0] : null
        }))
      }
    });
  } catch (error: any) {
    console.error("Order tracking API error:", error);
    return NextResponse.json(
      { error: "Sipariş bilgisi sorgulanırken bir hata oluştu." },
      { status: 500 }
    );
  }
}
