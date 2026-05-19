import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Lütfen tüm alanları doldurun." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Şifre en az 6 karakter uzunluğunda olmalıdır." },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Bu e-posta adresi zaten kullanımda." },
        { status: 400 }
      );
    }

    // Hash the password safely using bcryptjs
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in the database with default role of "USER"
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "USER",
      },
    });

    // Automatically check if the welcome coupon "UYE10" exists in DB, if not we can auto-create it!
    const couponName = "UYE10";
    const existingCoupon = await prisma.coupon.findUnique({
      where: { code: couponName },
    }).catch(() => null);

    if (!existingCoupon) {
      await prisma.coupon.create({
        data: {
          code: couponName,
          discount: 10,
          type: "percentage",
          isActive: true,
          expiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        }
      }).catch(e => console.error("Could not auto-create welcome coupon:", e));
    }

    return NextResponse.json({
      success: true,
      message: "Kayıt işlemi başarıyla tamamlandı!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Kayıt işlemi sırasında bir hata oluştu: " + error.message },
      { status: 500 }
    );
  }
}
