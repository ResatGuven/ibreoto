import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { imageUrl, replicateToken } = await request.json();

    if (!replicateToken) {
      return NextResponse.json({ success: false, error: 'Replicate API Anahtarı gereklidir.' }, { status: 400 });
    }
    if (!imageUrl) {
      return NextResponse.json({ success: false, error: 'Canlandırılacak görsel URL adresi gereklidir.' }, { status: 400 });
    }

    // Start prediction using the latest premium minimax/video-01 model
    const res = await fetch('https://api.replicate.com/v1/models/minimax/video-01/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${replicateToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          first_frame_image: imageUrl,
          prompt: "cinematic panning shot, natural movement, gentle breeze, organic flow, slow motion, high quality",
          prompt_optimizer: true
        }
      })
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ success: false, error: data.detail || 'Video üretimi başlatılamadı.' }, { status: res.status });
    }

    return NextResponse.json({ success: true, predictionId: data.id, status: data.status });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    const token = searchParams.get('replicateToken');

    if (!id || !token) {
      return NextResponse.json({ success: false, error: 'ID ve Replicate Token gereklidir.' }, { status: 400 });
    }

    const res = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: {
        'Authorization': `Token ${token}`,
      }
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ success: false, error: data.detail || 'Durum çekme hatası.' }, { status: res.status });
    }

    return NextResponse.json({
      success: true,
      status: data.status,
      output: data.output, // Array of strings (containing video URL when succeeded)
      error: data.error
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
