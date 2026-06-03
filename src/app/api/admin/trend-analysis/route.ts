import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { keywords, product } = await req.json();
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      return NextResponse.json({ success: false, error: 'Sistemde Gemini API Anahtarı bulunamadı (.env dosyasına GEMINI_API_KEY ekleyin).' }, { status: 500 });
    }

    if (!keywords) {
      return NextResponse.json({ success: false, error: 'Lütfen analiz edilecek kelimeleri/hesapları girin.' }, { status: 400 });
    }

    const systemInstruction = `
Sen profesyonel bir Sosyal Medya Uzmanı ve Trend Analistisin. 
Senden istenen konu ve rakiplerle ilgili gündemi analiz ederek, ürün satışı ve marka bilinirliği için VİRAL olmaya en uygun BİR ADET konsept çıkarman.

Ürün: ${product}
Trend/Rakip Konusu: ${keywords}

Lütfen cevabını sadece ve tam olarak aşağıdaki JSON formatında ver, başka hiçbir metin ekleme:
{
  "scriptText": "Dış sesin okuyacağı etkileyici, kancalı (hook) kısa video senaryosu.",
  "visuals": [
    { "time": "00:00 - 00:05", "scene": "Videonun bu saniyesinde ekranda ne gözükecek detaylı anlatım." },
    { "time": "00:05 - 00:15", "scene": "Devam eden sahne..." }
  ],
  "caption": "Videoyla birlikte paylaşılacak dikkat çekici açıklama, CTA ve bol hashtagler.",
  "tweets": [
    "X (Twitter) için yazılmış, bu konu hakkında viral olabilecek bir flood serisinin ilk tweeti (dikkat çekici).",
    "Floodun ikinci tweeti: kanıtlar veya ilginç bilgiler.",
    "Floodun son tweeti: Siteye yönlendiren Call to Action."
  ],
  "imagePrompt": "Bu konsepti yansıtacak yapay zeka resim üretici komutu (Kesinlikle detaylı ve İNGİLİZCE olmalı. Örn: Cinematic macro shot of...)"
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
          temperature: 0.8,
          responseMimeType: "application/json"
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json({ success: false, error: errorData.error?.message || 'Gemini API hatası' }, { status: response.status });
    }

    const data = await response.json();
    const resultText = data.candidates[0].content.parts[0].text;
    
    // Attempt to parse JSON safely
    let parsedResult;
    try {
      parsedResult = JSON.parse(resultText);
    } catch (e) {
      // In case it has markdown code block formatting
      const cleanText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedResult = JSON.parse(cleanText);
    }

    return NextResponse.json({ success: true, data: parsedResult });
  } catch (error: any) {
    console.error("Trend analysis error:", error);
    return NextResponse.json({ success: false, error: error.message || 'Bilinmeyen bir hata oluştu' }, { status: 500 });
  }
}
