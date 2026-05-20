import { NextResponse } from 'next/server';
import WebSocket from 'ws';
import crypto from 'crypto';

function generateRequestId() {
  return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

function getSecMsGecToken() {
  const ticks = BigInt(Math.floor(Date.now() / 1000) + 11644473600) * 10000000n;
  const truncatedTicks = ticks - (ticks % 3000000000n);
  const str = truncatedTicks.toString() + "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
  return crypto.createHash('sha256').update(str).digest('hex').toUpperCase();
}

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
        const voiceId = 'pNInz6obpgDQ51ujn50C'; // Rachel or a male voice
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
        console.error("ElevenLabs synthesis failed, falling back to Edge TTS:", elevenError);
      }
    }

    // 2. Primary: Free Edge Neural TTS (AhmetNeural) via server-side WebSocket client
    try {
      const requestId = generateRequestId();
      const token = getSecMsGecToken();
      const socketUrl = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?trustedclienttoken=6A5AA1D4EAFF4E9FB37E23D68491D6F4&ConnectionId=${requestId}&Sec-MS-GEC=${token}&Sec-MS-GEC-Version=1-133.0.3065.59`;

      const audioChunks = await new Promise<Buffer[]>((resolve, reject) => {
        const ws = new WebSocket(socketUrl, {
          headers: {
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36 Edg/133.0.0.0',
            'Origin': 'chrome-extension://jdiccldimpdaibdpecjgjcoojgoiboih',
            'Sec-MS-GEC': token,
            'Sec-MS-GEC-Version': '1-133.0.3065.59'
          }
        });

        const chunks: Buffer[] = [];
        const timeout = setTimeout(() => {
          if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
            ws.close();
          }
          reject(new Error('Ses sentezleme isteği zaman aşımına uğradı.'));
        }, 12000);

        ws.on('open', () => {
          const configMsg = 
            `Content-Type:application/json; charset=utf-8\r\n` +
            `Path:speech.config\r\n\r\n` +
            JSON.stringify({
              context: {
                synthesis: {
                  audio: {
                    metadataoptions: {
                      sentenceBoundaryEnabled: "false",
                      wordBoundaryEnabled: "true"
                    },
                    outputFormat: "audio-24khz-48kbitrate-mono-mp3"
                  }
                }
              }
            });
          ws.send(configMsg);

          const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='tr-TR'><voice name='Microsoft Server Speech Text to Speech Voice (tr-TR, AhmetNeural)'>${text}</voice></speak>`;
          const ssmlMsg = 
            `X-RequestId:${requestId}\r\n` +
            `Content-Type:application/ssml+xml\r\n` +
            `Path:ssml\r\n\r\n` +
            ssml;
          ws.send(ssmlMsg);
        });

        ws.on('message', (data: any, isBinary: boolean) => {
          if (!isBinary) {
            const msgStr = data.toString();
            if (msgStr.includes('Path:turn.end')) {
              clearTimeout(timeout);
              ws.close();
              resolve(chunks);
            }
          } else {
            try {
              const buffer = Buffer.isBuffer(data) ? data : Buffer.from(data);
              const headerLength = buffer.readUInt16BE(0);
              const audioChunk = buffer.subarray(2 + headerLength);
              if (audioChunk.length > 0) {
                chunks.push(audioChunk);
              }
            } catch (err) {
              console.error("Binary chunk parsing error:", err);
            }
          }
        });

        ws.on('close', () => {
          clearTimeout(timeout);
          if (chunks.length > 0) {
            resolve(chunks);
          } else {
            reject(new Error('Bağlantı ses üretilemeden kapandı.'));
          }
        });

        ws.on('error', (err) => {
          clearTimeout(timeout);
          reject(err);
        });
      });

      if (audioChunks && audioChunks.length > 0) {
        const combinedBuffer = Buffer.concat(audioChunks);
        return new Response(combinedBuffer, {
          headers: {
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': 'inline; filename="ari-hayat-ahmet-neural.mp3"'
          }
        });
      }
    } catch (edgeTtsError) {
      console.warn("Server-side Edge TTS failed, trying Google TTS fallback:", edgeTtsError);
    }

    // 3. Fallback: Google Translate TTS (100% free, keyless, reliable HTTP endpoint)
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

    throw new Error('Ses sentezleme başarısız oldu.');

  } catch (error: any) {
    console.error('TTS Endpoint Error:', error);
    return NextResponse.json({ error: 'Ses sentezleme başarısız oldu: ' + error.message }, { status: 500 });
  }
}
