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
    const { topic } = await req.json();
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      return NextResponse.json({ error: 'Sistemde Gemini API Anahtarı bulunamadı (.env dosyasına GEMINI_API_KEY ekleyin).' }, { status: 500 });
    }

    if (!topic) {
      return NextResponse.json({ error: 'Lütfen video konusunu belirtin.' }, { status: 400 });
    }

    const systemInstruction = `
Sen profesyonel bir Sosyal Medya İçerik Üreticisi ve Dijital Pazarlama Uzmanısın.
Senden Instagram Reels, TikTok ve YouTube Shorts formatına uygun, dikey formatta çekilecek ilgi çekici, bilgilendirici ve viral potansiyeli yüksek 30 saniyelik bir Türkçe video senaryosu hazırlamanı istiyoruz.
Senaryonun dili samimi, merak uyandırıcı, dinamik ve akıcı olmalıdır.

Video Konusu: ${topic}

Lütfen hazırlayacağın yazıyı tam olarak aşağıdaki JSON formatında teslim et. JSON yapısı dışında başka hiçbir açıklama, markdown bloğu veya fazladan metin EKLEME:
{
  "title": "Videonun Başlığı (Örn: Hakiki Bal Neden Donar?)",
  "totalDuration": "Tahmini Süre (Örn: 30 Saniye)",
  "fullVoiceover": "Seslendirme için okunacak tüm metnin birleştirilmiş akıcı hali. Okuma hızına uygun, duraksamaları olan, arka arkaya okunacak düz paragraf (maksimum 150 kelime).",
  "scenes": [
    {
      "sceneNo": 1,
      "duration": "5 Saniye",
      "visual": "Kamera açısı, görsel çekim talimatı (Örn: Donmuş süzme bal kavanozu yakın çekim gösterilir, el ile dokunulur.)",
      "text": "Seslendirilecek cümle (Örn: Aldığınız bal dondu diye çöpe mi attınız? Durun, büyük hata yaptınız!)"
    }
  ]
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
    console.error("AI Reels Script generation error:", error);
    return NextResponse.json({ error: error.message || 'Bilinmeyen bir hata oluştu' }, { status: 500 });
  }
}
