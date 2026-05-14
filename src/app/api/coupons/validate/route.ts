import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { code, totalAmount } = await request.json();

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (!coupon) {
      return NextResponse.json({ error: 'Geçersiz kupon kodu.' }, { status: 400 });
    }

    if (!coupon.isActive) {
      return NextResponse.json({ error: 'Bu kupon artık aktif değil.' }, { status: 400 });
    }

    if (new Date() > new Date(coupon.expiry)) {
      return NextResponse.json({ error: 'Kuponun kullanım süresi dolmuş.' }, { status: 400 });
    }

    let discount = 0;
    if (coupon.type === 'percentage') {
      discount = (totalAmount * coupon.discount) / 100;
    } else {
      discount = coupon.discount;
    }

    return NextResponse.json({ 
      success: true, 
      discount: discount,
      type: coupon.type,
      value: coupon.discount
    });
  } catch (error) {
    return NextResponse.json({ error: 'Kupon doğrulanamadı.' }, { status: 500 });
  }
}
