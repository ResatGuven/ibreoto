import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Evlat edinme kodu gereklidir' }, { status: 400 });
    }

    const adoption = await prisma.hiveAdoption.findUnique({
      where: { 
        code: code.trim().toUpperCase() 
      },
      include: {
        hive: true
      }
    });

    if (!adoption) {
      return NextResponse.json({ error: 'Bu kod ile eşleşen aktif bir kovan bulunamadı. Lütfen kodunuzu kontrol edin.' }, { status: 404 });
    }

    // Check expiry
    const isExpired = new Date(adoption.endDate) < new Date();
    if (isExpired || adoption.status === 'EXPIRED') {
      return NextResponse.json({ error: 'Bu kovan evlat edinme süresi dolmuştur.' }, { status: 400 });
    }

    return NextResponse.json({ success: true, data: adoption });
  } catch (error) {
    console.error("Adoption verification error:", error);
    return NextResponse.json({ error: 'Sistem hatası oluştu.' }, { status: 500 });
  }
}
