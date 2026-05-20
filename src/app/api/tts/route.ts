import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const text = searchParams.get('text');
    const elevenLabsKey = searchParams.get('elevenLabsKey');

    if (!text) {
      return NextResponse.json({ error: 'Text parametresi zorunludur.' }, { status: 400 });
    }

    // 1. If ElevenLabs Key is provided, use ElevenLabs
    if (elevenLabsKey && elevenLabsKey.trim() !== '' && elevenLabsKey !== 'undefined') {
      try {
        const voiceId = 'pNInz6obpgDQ51ujn50C'; // Rachel or custom voice
        const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
          method: 'POST',
          headers: {
            'xi-api-key': elevenLabsKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            model_id: 'eleven_multilingual_v2',
            voice_settings: {
              stability: 0.5,
              similarity_boost: 0.75,
            }
          })
        });

        if (res.ok) {
          const audioBuffer = await res.arrayBuffer();
          return new Response(audioBuffer, {
            headers: {
              'Content-Type': 'audio/mpeg',
            }
          });
        }
      } catch (elevenError) {
        console.error("ElevenLabs synthesis failed, falling back to Google:", elevenError);
      }
    }

    // 2. Fallback: Google Translate TTS (100% free, keyless, reliable HTTP endpoint)
    // Splitting text into chunks of 200 characters because Google TTS has a 200-char limit per request
    const chunks: string[] = [];
    const words = text.split(/\s+/);
    let currentChunk = "";
    
    for (const word of words) {
      if ((currentChunk + " " + word).trim().length > 180) {
        chunks.push(currentChunk.trim());
        currentChunk = word;
      } else {
        currentChunk = (currentChunk + " " + word).trim();
      }
    }
    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }

    const audioBuffers: Buffer[] = [];
    for (const chunk of chunks) {
      const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(chunk)}&tl=tr&total=1&idx=0&textlen=${chunk.length}&client=tw-ob&ttsspeed=1`;
      
      const res = await fetch(googleTtsUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.0.0 Safari/537.36'
        }
      });
      
      if (res.ok) {
        const arrayBuffer = await res.arrayBuffer();
        audioBuffers.push(Buffer.from(arrayBuffer));
      }
    }

    if (audioBuffers.length > 0) {
      const combinedBuffer = Buffer.concat(audioBuffers);
      return new Response(combinedBuffer, {
        headers: {
          'Content-Type': 'audio/mpeg',
          'Content-Disposition': 'inline; filename="ari-hayat-google-tts.mp3"'
        }
      });
    }

    throw new Error('Google TTS audio chunks could not be fetched.');

  } catch (error: any) {
    console.error('TTS Endpoint Error:', error);
    return NextResponse.json({ error: 'Ses sentezleme başarısız oldu: ' + error.message }, { status: 500 });
  }
}
