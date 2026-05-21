import { NextResponse } from 'next/server';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { geminiKey, productName, category } = await req.json();

    if (!geminiKey) {
      return NextResponse.json({ error: 'Gemini API Anahtarı eksik.' }, { status: 400 });
    }

    if (!productName) {
      return NextResponse.json({ error: 'Lütfen ürün adını belirtin.' }, { status: 400 });
    }

    const systemInstruction = `
Sen profesyonel bir E-ticaret Metin Yazarı (Copywriter) ve SEO Uzmanısın.
Senden istenen ürün adı ve kategorisine göre müşterileri satın almaya teşvik edecek, ürünün doğallığını ve faydalarını ön plana çıkaran ikna edici bir ürün açıklaması ve Google arama motoru optimizasyonu (SEO) etiketleri hazırlaman.

Ürün Adı: ${productName}
Kategori: ${category || 'Genel'}

Lütfen hazırlayacağın yazıyı tam olarak aşağıdaki JSON formatında teslim et. JSON yapısı dışında başka hiçbir açıklama, markdown bloğu veya fazladan metin EKLEME:
{
  "description": "Ürünün özelliklerini, faydalarını ve nasıl kullanılması gerektiğini akıcı ve samimi bir dille anlatan, paragraf ve liste formatında zengin ürün açıklaması (HTML etiketleri kullanmadan düz metin olarak).",
  "metaTitle": "Google arama sonuçlarında görünecek, anahtar kelime barındıran ve tıklama oranını artıracak 50-60 karakterlik SEO başlığı (Örn: Hakiki Kestane Balı 850g - Analizli Doğal Ürün | Arı Hayat)",
  "metaDescription": "Arama sonuçlarında başlığın altında görünecek, ürünü özetleyen ve müşteriyi tıklamaya çeken 140-160 karakterlik meta açıklaması."
}
`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: systemInstruction }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ error: errorData.error?.message || 'Gemini API hatası' }, { status: response.status });
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    
    // Parse JSON safely
    let parsedResult;
    try {
      parsedResult = JSON.parse(resultText);
    } catch (e) {
      const cleanText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedResult = JSON.parse(cleanText);
    }

    return NextResponse.json({ success: true, data: parsedResult });
  } catch (error: any) {
    console.error("AI Product generation error:", error);
    return NextResponse.json({ error: error.message || 'Bilinmeyen bir hata oluştu' }, { status: 500 });
  }
}
