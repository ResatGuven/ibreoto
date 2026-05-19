import { NextResponse } from 'next/server';

function generateRequestId() {
  return Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');

  if (!text) {
    return NextResponse.json({ error: 'Text parametresi zorunludur.' }, { status: 400 });
  }

  const requestId = generateRequestId();
  const socketUrl = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?trustedclienttoken=6A5AA1D4EAFF4E9B87E7D8561B96A24E`;

  try {
    const audioDataPromise = new Promise<Uint8Array[]>((resolve, reject) => {
      const ws = new WebSocket(socketUrl);
      const chunks: Uint8Array[] = [];
      let opened = false;

      // Safety timeout
      const timeout = setTimeout(() => {
        if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
          ws.close();
        }
        reject(new Error('Ses sentezleme isteği zaman aşımına uğradı.'));
      }, 15000);

      ws.onopen = () => {
        opened = true;
        // 1. Send Configuration Message
        const configMsg = 
          `X-Timestamp:${Date.now()}\r\n` +
          `Content-Type:application/json; charset=utf-8\r\n` +
          `Path:speech.config\r\n\r\n` +
          JSON.stringify({
            context: {
              system: {
                name: "Edge",
                version: "112.0.1722.68",
                build: "1722.68",
                platform: "Windows"
              }
            },
            audio: {
              format: "audio-24khz-48kbitrate-mono-mp3",
              volume: 0,
              pitch: 0,
              rate: 0
            }
          });
        ws.send(configMsg);

        // 2. Send SSML Speech Synthesis Message (Using the famous AhmetNeural voice - deep, realistic Turkish male narrator)
        const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='tr-TR'><voice name='Microsoft Server Speech Text to Speech Voice (tr-TR, AhmetNeural)'>${text}</voice></speak>`;
        const ssmlMsg = 
          `X-RequestId:${requestId}\r\n` +
          `Content-Type:application/ssml+xml\r\n` +
          `X-Timestamp:${Date.now()}\r\n` +
          `Path:ssml\r\n\r\n` +
          ssml;
        ws.send(ssmlMsg);
      };

      ws.onmessage = async (event) => {
        const data = event.data;
        
        if (typeof data === 'string') {
          if (data.includes('Path:turn.end')) {
            clearTimeout(timeout);
            ws.close();
            resolve(chunks);
          }
        } else {
          // Binary message: Slice off the header to get pure audio bytes
          try {
            let arrayBuffer: ArrayBuffer;
            if (data instanceof Blob) {
              arrayBuffer = await data.arrayBuffer();
            } else {
              arrayBuffer = data;
            }

            const view = new DataView(arrayBuffer);
            // First 2 bytes contain the header length
            const headerLength = view.getUint16(0);
            // Slicing the header (2 bytes length + actual header string) gives the audio stream
            const audioChunk = new Uint8Array(arrayBuffer.slice(2 + headerLength));
            
            if (audioChunk.length > 0) {
              chunks.push(audioChunk);
            }
          } catch (err) {
            console.error("Binary chunk parsing error:", err);
          }
        }
      };

      ws.onclose = () => {
        clearTimeout(timeout);
        if (chunks.length > 0) {
          resolve(chunks);
        } else {
          reject(new Error('Bağlantı ses üretilemeden kapandı.'));
        }
      };

      ws.onerror = (err) => {
        clearTimeout(timeout);
        reject(err);
      };
    });

    const audioChunks = await audioDataPromise;
    
    // Concatenate all chunks into a single response
    const totalLength = audioChunks.reduce((acc, val) => acc + val.byteLength, 0);
    const combinedBuffer = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of audioChunks) {
      combinedBuffer.set(chunk, offset);
      offset += chunk.byteLength;
    }

    return new Response(combinedBuffer.buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline; filename="ari-hayat-ahmet-neural.mp3"'
      }
    });

  } catch (error: any) {
    console.error('Edge Neural TTS Error:', error);
    return NextResponse.json({ error: 'Gerçekçi ses sentezleme başarısız oldu: ' + error.message }, { status: 500 });
  }
}
