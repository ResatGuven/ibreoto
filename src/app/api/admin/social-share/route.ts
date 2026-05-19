import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { bufferToken, profileIds, text, mediaUrl } = await request.json();

    if (!bufferToken) {
      return NextResponse.json({ error: 'Buffer Access Token gereklidir.' }, { status: 400 });
    }
    if (!profileIds || profileIds.length === 0) {
      return NextResponse.json({ error: 'En az bir sosyal medya profili seçilmelidir.' }, { status: 400 });
    }
    if (!text) {
      return NextResponse.json({ error: 'Gönderi metni zorunludur.' }, { status: 400 });
    }

    // Build the request payload for Buffer API
    const payload: any = {
      profile_ids: profileIds,
      text: text,
      shorten: false,
    };

    if (mediaUrl) {
      // Buffer expects media link for images/videos
      const isVideo = mediaUrl.endsWith('.mp4') || mediaUrl.includes('video') || mediaUrl.includes('tts') || mediaUrl.includes('audio');
      if (isVideo) {
        payload.media = {
          video: mediaUrl,
          thumbnail: 'https://arihayat.com/images/logo.png', // Fallback thumbnail
        };
      } else {
        payload.media = {
          photo: mediaUrl,
        };
      }
    }

    const response = await fetch('https://api.bufferapp.com/1/updates/create.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${bufferToken}`
      },
      body: new URLSearchParams(payload).toString()
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Buffer paylaşım isteği başarısız oldu.');
    }

    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error('Buffer Share Error:', error);
    return NextResponse.json({ error: error.message || 'Paylaşım sırasında bir hata oluştu.' }, { status: 500 });
  }
}
