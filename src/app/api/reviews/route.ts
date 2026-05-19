import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: "Yorum yapmak için giriş yapmalısınız." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { rating, comment, productId } = body;

    if (!rating || !productId) {
      return NextResponse.json(
        { success: false, error: "Lütfen ürün ve yıldız puanı belirtin." },
        { status: 400 }
      );
    }

    // Ensure rating is between 1 and 5
    const parsedRating = parseInt(rating, 10);
    if (parsedRating < 1 || parsedRating > 5) {
      return NextResponse.json(
        { success: false, error: "Puan 1 ile 5 arasında olmalıdır." },
        { status: 400 }
      );
    }

    const userEmail = session.user.email;
    if (!userEmail) {
      return NextResponse.json(
        { success: false, error: "Kullanıcı bilgisi eksik." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user) {
      return NextResponse.json(
        { success: false, error: "Kullanıcı bulunamadı." },
        { status: 404 }
      );
    }

    // Create the review
    const review = await prisma.review.create({
      data: {
        rating: parsedRating,
        comment: comment || null,
        productId,
        userId: user.id,
      },
      include: {
        user: {
          select: {
            name: true,
            image: true,
          }
        }
      }
    });

    return NextResponse.json({ success: true, review }, { status: 201 });
  } catch (error: any) {
    console.error("Yorum ekleme hatası:", error);
    return NextResponse.json(
      { success: false, error: "Yorum eklenirken bir hata oluştu." },
      { status: 500 }
    );
  }
}
