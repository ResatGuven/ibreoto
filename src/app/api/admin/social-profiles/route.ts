import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const bufferToken = searchParams.get('bufferToken');

  if (!bufferToken) {
    return NextResponse.json({ error: 'Buffer Access Token gereklidir.' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.bufferapp.com/1/profiles.json`, {
      headers: {
        'Authorization': `Bearer ${bufferToken}`
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Buffer profilleri alınamadı.');
    }

    // Format profiles to return only necessary info
    const profiles = data.map((profile: any) => ({
      id: profile.id,
      service: profile.service, // 'instagram', 'tiktok', 'twitter', etc.
      service_username: profile.service_username,
      avatar: profile.avatar,
    }));

    return NextResponse.json({ success: true, profiles });
  } catch (error: any) {
    console.error('Buffer Profiles Error:', error);
    return NextResponse.json({ error: error.message || 'Profiller yüklenemedi.' }, { status: 500 });
  }
}
