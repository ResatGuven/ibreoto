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

    // Start prediction using stability-ai/stable-video-diffusion
    const res = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${replicateToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // stable-video-diffusion model version
        version: "3f0c32d655344d4f4835b7e974e856b69be77a1d23bc127584145478c9d2f56b",
        input: {
          image: imageUrl,
          video_length: "14_frames_with_svd",
          frames_per_second: 6,
          motion_bucket_id: 127,
          cond_aug: 0.02
        }
      })
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ success: false, error: data.detail || 'Replicate API bağlantı hatası.' }, { status: res.status });
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
