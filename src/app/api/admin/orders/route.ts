import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: true
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error("Orders fetch error:", error);
    return NextResponse.json(
      { error: "Siparişler getirilirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status, cargoNo } = body;

    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        cargoNo
      }
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Order update error:", error);
    return NextResponse.json(
      { error: "Sipariş güncellenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}

