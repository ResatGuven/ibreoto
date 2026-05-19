import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');

  if (!text) {
    return NextResponse.json({ error: 'Text parametresi zorunludur.' }, { status: 400 });
  }

  // Google Translate TTS accepts max 200 characters per chunk, so we split the text if it is longer.
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
