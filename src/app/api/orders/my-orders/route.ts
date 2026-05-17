import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Bu işlemi gerçekleştirmek için giriş yapmalısınız." },
        { status: 401 }
      );
    }

    const email = session.user.email;
    const userId = (session.user as any).id;

    // Fetch orders matching user's id or user's email
    const orders = await prisma.order.findMany({
      where: {
        OR: [
          userId ? { userId: userId } : {},
          email ? { customerEmail: email } : {}
        ].filter(condition => Object.keys(condition).length > 0)
      },
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json({ success: true, orders });
  } catch (error: any) {
    console.error("Fetch user orders error:", error);
    return NextResponse.json(
      { error: "Siparişleriniz alınırken bir hata oluştu: " + error.message },
      { status: 500 }
    );
  }
}
