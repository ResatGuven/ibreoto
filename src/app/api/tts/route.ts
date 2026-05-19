import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');
  const elevenLabsKey = searchParams.get('elevenLabsKey');

  if (!text) {
    return NextResponse.json({ error: 'Text parametresi zorunludur.' }, { status: 400 });
  }

  // Option 1: Use ElevenLabs if an API Key is provided
  if (elevenLabsKey) {
    try {
      // Default ElevenLabs Turkish compatible premium male voice (e.g. Rachel/Adam or custom)
      const voiceId = 'pNInz6obpgus51hpZaae'; // Turkish neural voice ID or standard
      const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`;

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'accept': 'audio/mpeg',
          'xi-api-key': elevenLabsKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.6,
            similarity_boost: 0.8
          }
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail?.status || 'ElevenLabs seslendirme isteği başarısız oldu.');
      }

      const buffer = await res.arrayBuffer();
      return new Response(buffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Disposition': 'inline; filename="ari-hayat-elevenlabs.mp3"'
        }
      });
    } catch (error: any) {
      console.error('ElevenLabs Error, falling back to free Google TTS:', error);
      // Fall through to free Google TTS if premium key fails
    }
  }

  // Option 2: Fallback to Free Google Translate TTS (split text into 200 char chunks)
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
  const chunks: string[] = [];
  let currentChunk = '';

  for (const sentence of sentences) {
    if ((currentChunk + sentence).length < 200) {
      currentChunk += ' ' + sentence;
    } else {
      if (currentChunk) chunks.push(currentChunk.trim());
      currentChunk = sentence;
    }
  }
  if (currentChunk) chunks.push(currentChunk.trim());

  try {
    const audioBuffers: ArrayBuffer[] = [];

    for (const chunk of chunks) {
      const encodedText = encodeURIComponent(chunk);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=tr&client=tw-ob&q=${encodedText}`;

      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
      });

      if (!res.ok) {
        throw new Error('TTS fetch failed for chunk: ' + chunk);
      }

      const buffer = await res.arrayBuffer();
      audioBuffers.push(buffer);
    }

    // Concatenate all audio buffers
    const totalLength = audioBuffers.reduce((acc, val) => acc + val.byteLength, 0);
    const combinedBuffer = new Uint8Array(totalLength);
    let offset = 0;
    for (const buffer of audioBuffers) {
      combinedBuffer.set(new Uint8Array(buffer), offset);
      offset += buffer.byteLength;
    }

    return new Response(combinedBuffer.buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline; filename="ari-hayat-seslendirme.mp3"'
      }
    });
  } catch (error: any) {
    console.error('TTS Error:', error);
    return NextResponse.json({ error: 'Seslendirme üretilemedi: ' + error.message }, { status: 500 });
  }
}
