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
    const { topic, tone } = await req.json();
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      return NextResponse.json({ error: 'Sistemde Gemini API Anahtarı bulunamadı (.env dosyasına GEMINI_API_KEY ekleyin).' }, { status: 500 });
    }

    if (!topic) {
      return NextResponse.json({ error: 'Lütfen makale konusunu belirtin.' }, { status: 400 });
    }

    const toneDescription = 
      tone === 'scientific' ? 'bilimsel, eğitici, araştırmalara dayalı ve profesyonel' :
      tone === 'friendly' ? 'samimi, cana yakın, aile dostu ve günlük konuşma dilinde' :
      'dikkat çekici, satış odaklı, fayda vurgulayan ve promosyona teşvik eden';

    const systemInstruction = `
Sen profesyonel bir İçerik Yazarı ve SEO Uzmanısın.
Senden istenen konu hakkında yüksek kaliteli, Google arama sonuçlarında üst sıralarda çıkacak (SEO uyumlu) Türkçe bir blog yazısı hazırlaman.

Makale Konusu: ${topic}
Yazım Tonu: ${toneDescription}

Lütfen hazırlayacağın yazıyı tam olarak aşağıdaki JSON formatında teslim et. JSON yapısı dışında başka hiçbir açıklama, markdown bloğu veya fazladan metin EKLEME:
{
  "title": "Yazının dikkat çekici ve SEO uyumlu başlığı",
  "excerpt": "Arama motoru sonuçlarında (meta description) ve blog listesinde görünecek 150-160 karakterlik özet.",
  "imagePrompt": "Bu makale için kapak görseli üretmek üzere kullanılacak detaylı ve profesyonel İNGİLİZCE görsel promptu (Örn: A photorealistic macro shot of fresh organic honey dripping from a wooden spoon in warm natural morning light, depth of field, 4k)",
  "content": "HTML formatında yazılmış makale içeriği. Okunabilirliği artırmak için h2 ve h3 başlık etiketleri, paragraflar (p), kalın yazılar (strong), gerekirse sıralı/sırasız listeler (ul/ol/li) kullan. Yazının uzunluğu doyurucu olmalı (en az 3-4 ana bölümden oluşmalı) ve okuyucuya gerçek değer sunmalıdır."
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
    console.error("AI Blog generation error:", error);
    return NextResponse.json({ error: error.message || 'Bilinmeyen bir hata oluştu' }, { status: 500 });
  }
}
