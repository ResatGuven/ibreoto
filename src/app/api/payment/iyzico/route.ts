import { NextResponse } from 'next/server';
// import Iyzipay from 'iyzipay'; // Kullanıcı "npm install iyzipay" komutu ile kurduğunda aktifleştirilecek

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, items, total, orderId } = body;

    // TODO: Gerçek iyzipay kurulumu yapıldığında bu ayarlar process.env den alınacak
    /*
    const iyzipay = new Iyzipay({
      apiKey: process.env.IYZICO_API_KEY || 'your_api_key',
      secretKey: process.env.IYZICO_SECRET_KEY || 'your_secret_key',
      uri: 'https://sandbox-api.iyzipay.com'
    });

    const request = {
      locale: Iyzipay.LOCALE.TR,
      conversationId: orderId,
      price: total.toString(),
      paidPrice: total.toString(),
      currency: Iyzipay.CURRENCY.TRY,
      basketId: orderId,
      paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
      callbackUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/payment/callback`,
      enabledInstallments: [2, 3, 6, 9],
      buyer: {
        id: "BY789",
        name: customer.name.split(' ')[0],
        surname: customer.name.split(' ').slice(1).join(' ') || 'Bilinmeyen',
        gsmNumber: customer.phone,
        email: customer.email,
        identityNumber: "74300864791",
        lastLoginDate: "2015-10-05 12:43:35",
        registrationDate: "2013-04-21 15:12:09",
        registrationAddress: customer.address,
        ip: "85.34.78.112",
        city: customer.city,
        country: "Turkey",
        zipCode: "34732"
      },
      shippingAddress: {
        contactName: customer.name,
        city: customer.city,
        country: "Turkey",
        address: customer.address,
        zipCode: "34742"
      },
      billingAddress: {
        contactName: customer.name,
        city: customer.city,
        country: "Turkey",
        address: customer.address,
        zipCode: "34742"
      },
      basketItems: items.map(item => ({
        id: item.id,
        name: item.name || 'Arı Hayat Ürünü',
        category1: "Doğal Ürünler",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price: item.price.toString()
      }))
    };

    return new Promise((resolve, reject) => {
      iyzipay.checkoutFormInitialize.create(request, function (err, result) {
        if (err || result.status !== 'success') {
          resolve(NextResponse.json({ error: err || result.errorMessage }, { status: 400 }));
        } else {
          resolve(NextResponse.json({ 
            success: true, 
            checkoutFormContent: result.checkoutFormContent,
            token: result.token,
            paymentPageUrl: result.paymentPageUrl
          }));
        }
      });
    });
    */

    // Şimdilik "cmd" kullanımı istenmediğinden paket kurulamadı, sahte başarılı yanıt dönülüyor
    return NextResponse.json({ 
      success: true, 
      mockIyzico: true,
      message: 'Iyzico paketi kurulamadığından sahte Iyzico formu başlatıldı.',
      paymentPageUrl: `/odeme/basarili?orderId=${orderId}`
    });

  } catch (error: any) {
    console.error('Iyzico init error:', error);
    return NextResponse.json({ error: error.message || 'Iyzico başlatılamadı' }, { status: 500 });
  }
}
