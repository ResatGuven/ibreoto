import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { code, totalAmount } = await request.json();

    let coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() }
    });

    if (!coupon) {
      // Auto-create standard coupon codes if they are valid marketing codes
      const marketingCoupons: Record<string, { discount: number; type: string }> = {
        'ŞİFA10': { discount: 10, type: 'percentage' },
        'KIS-SIFASI': { discount: 15, type: 'percentage' },
        'UYE10': { discount: 10, type: 'percentage' }
      };

      const normalizedCode = code.toUpperCase();
      if (marketingCoupons[normalizedCode]) {
        try {
          const promo = marketingCoupons[normalizedCode];
          coupon = await prisma.coupon.create({
            data: {
              code: normalizedCode,
              discount: promo.discount,
              type: promo.type,
              expiry: new Date('2030-12-31'),
              isActive: true
            }
          });
        } catch (dbErr) {
          console.error("Failed to auto-create marketing coupon:", dbErr);
        }
      }
    }

    if (!coupon) {
      return NextResponse.json({ error: 'Geçersiz kupon kodu.', message: 'Geçersiz kupon kodu.', valid: false, success: false }, { status: 400 });
    }

    if (!coupon.isActive) {
      return NextResponse.json({ error: 'Bu kupon artık aktif değil.', message: 'Bu kupon artık aktif değil.', valid: false, success: false }, { status: 400 });
    }

    if (new Date() > new Date(coupon.expiry)) {
      return NextResponse.json({ error: 'Kuponun kullanım süresi dolmuş.', message: 'Kuponun kullanım süresi dolmuş.', valid: false, success: false }, { status: 400 });
    }

    let discount = 0;
    const finalTotalAmount = totalAmount || 0;
    if (coupon.type === 'percentage') {
      discount = (finalTotalAmount * coupon.discount) / 100;
    } else {
      discount = coupon.discount;
    }

    return NextResponse.json({ 
      success: true, 
      valid: true,
      discount: totalAmount !== undefined ? discount : coupon.discount,
      type: coupon.type,
      value: coupon.discount,
      message: 'Kupon kodu başarıyla uygulandı.'
    });
  } catch (error) {
    return NextResponse.json({ error: 'Kupon doğrulanamadı.', message: 'Kupon doğrulanamadı.', valid: false, success: false }, { status: 500 });
  }
}
