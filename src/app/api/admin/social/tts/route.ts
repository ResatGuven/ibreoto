import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, voice } = await req.json();
    const geminiKey = process.env.GEMINI_API_KEY;

    if (!geminiKey) {
      return NextResponse.json({ error: 'Sistemde Gemini API Anahtarı bulunamadı (.env).' }, { status: 500 });
    }

    if (!text) {
      return NextResponse.json({ error: 'Metin eksik.' }, { status: 400 });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;
    const prompt = `Lütfen aşağıdaki metni çok doğal, profesyonel ve etkileyici bir Türkçe seslendirme tonuyla oku. Duraklamalara ve vurgulara dikkat et. Sadece metni seslendir, başka hiçbir şey söyleme:\n\n${text}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: voice || "Aoede"
              }
            }
          }
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      return NextResponse.json({ error: errData.error?.message || 'Gemini ses üretim hatası' }, { status: response.status });
    }

    const data = await response.json();
    const part = data.candidates?.[0]?.content?.parts?.[0];

    if (!part || !part.inlineData) {
      return NextResponse.json({ error: 'Gemini API ses verisi döndürmedi.' }, { status: 500 });
    }

    // Return the base64 string and mimeType back to the client
    return NextResponse.json({
      success: true,
      audioBase64: part.inlineData.data,
      mimeType: part.inlineData.mimeType || 'audio/mp3'
    });

  } catch (error: any) {
    console.error('Gemini TTS API error:', error);
    return NextResponse.json({ error: error.message || 'Sunucu hatası' }, { status: 500 });
  }
}
