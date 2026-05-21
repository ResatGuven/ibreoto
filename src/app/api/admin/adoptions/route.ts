import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const adoptions = await prisma.hiveAdoption.findMany({
      include: {
        hive: true
      },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(adoptions);
  } catch (error) {
    return NextResponse.json({ error: 'Evlat edinme kayıtları yüklenemedi' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, hiveId, code, ownerName, ownerEmail, ownerPhone, startDate, endDate, status } = body;

    // Helper to generate a unique code if not provided
    let finalCode = code;
    if (!id && !finalCode) {
      let isUnique = false;
      while (!isUnique) {
        const rand = Math.floor(1000 + Math.random() * 9000);
        finalCode = `KOV-${rand}`;
        const existing = await prisma.hiveAdoption.findUnique({
          where: { code: finalCode }
        });
        if (!existing) isUnique = true;
      }
    }

    if (id) {
      // Update
      const adoption = await prisma.hiveAdoption.update({
        where: { id },
        data: {
          hiveId,
          code: finalCode,
          ownerName,
          ownerEmail,
          ownerPhone,
          startDate: startDate ? new Date(startDate) : undefined,
          endDate: endDate ? new Date(endDate) : undefined,
          status: status || 'ACTIVE'
        }
      });
      return NextResponse.json(adoption);
    } else {
      // Create
      const adoption = await prisma.hiveAdoption.create({
        data: {
          hiveId,
          code: finalCode,
          ownerName,
          ownerEmail,
          ownerPhone,
          startDate: startDate ? new Date(startDate) : new Date(),
          endDate: endDate ? new Date(endDate) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year default
          status: status || 'ACTIVE'
        }
      });
      return NextResponse.json(adoption);
    }
  } catch (error) {
    console.error('Adoption CRUD error:', error);
    return NextResponse.json({ error: 'Evlat edinme kaydı oluşturulamadı' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

    await prisma.hiveAdoption.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Evlat edinme kaydı silinemedi' }, { status: 500 });
  }
}
