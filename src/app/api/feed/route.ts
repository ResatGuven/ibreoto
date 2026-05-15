import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: { category: true }
    });

    const baseUrl = 'https://arihayat.com';
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>ArıHayat - Doğal Arı Ürünleri</title>
    <link>${baseUrl}</link>
    <description>Doğanın kalbinden taze ve %100 doğal arı sütü, propolis ve ballar.</description>
`;

    products.forEach(product => {
      xml += `    <item>
      <g:id>${product.id}</g:id>
      <g:title>${product.name}</g:title>
      <g:description>${product.description.substring(0, 5000)}</g:description>
      <g:link>${baseUrl}/urun/${product.slug}</g:link>
      <g:image_link>${JSON.parse(product.images)[0] || ''}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${product.stock > 0 ? 'in_stock' : 'out_of_stock'}</g:availability>
      <g:price>${product.price} TRY</g:price>
      <g:brand>ArıHayat</g:brand>
      <g:google_product_category>Sağlık & Gıda</g:google_product_category>
    </item>
`;
    });

    xml += `  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Feed oluşturulamadı.' }, { status: 500 });
  }
}
