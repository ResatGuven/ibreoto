import { NextResponse } from 'next/server';
// import Iyzipay from 'iyzipay'; // Kullanıcı "npm install iyzipay" komutu ile kurduğunda aktifleştirilecek
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const token = formData.get('token');

    if (!token) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/odeme?error=invalid_token`);
    }

    // TODO: Gerçek iyzipay kurulumu yapıldığında bu kısımlar aktifleştirilecek
    /*
    const iyzipay = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY || 'your_api_key',
      secretKey: process.env.IYZICO_SECRET_KEY || 'your_secret_key',
      uri: 'https://sandbox-api.iyzipay.com'
    });

    return new Promise((resolve, reject) => {
      iyzipay.checkoutForm.retrieve({ token: token.toString() }, async function (err, result) {
        if (err || result.status !== 'success' || result.paymentStatus !== 'SUCCESS') {
          // Ödeme Başarısız
          resolve(NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/odeme?error=${encodeURIComponent(result?.errorMessage || 'Ödeme reddedildi')}`));
        } else {
          // Ödeme Başarılı, siparişi veritabanında onayla
          const orderId = result.basketId; 
          
          await prisma.order.update({
            where: { id: orderId },
            data: { status: 'PAID', paymentId: result.paymentId }
          });

          resolve(NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/odeme/basarili?orderId=${orderId}`));
        }
      });
    });
    */

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/odeme/basarili?orderId=mock_order`);

  } catch (error: any) {
    console.error('Iyzico callback error:', error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/odeme?error=system_error`);
  }
}
