import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const batchNo = searchParams.get('batchNo');

    // Public lookup endpoint (accessible without admin session)
    if (batchNo) {
      const analysis = await prisma.honeyAnalysis.findUnique({
        where: { batchNo }
      });
      if (!analysis) {
        return NextResponse.json({ error: 'Analiz raporu bulunamadı' }, { status: 404 });
      }
      return NextResponse.json(analysis);
    }

    // List all (admin only)
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const analyses = await prisma.honeyAnalysis.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(analyses);
  } catch (error) {
    return NextResponse.json({ error: 'Analiz raporları yüklenemedi' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, batchNo, productName, proline, moisture, diastase, analysisDate, reportImageUrl, notes } = body;

    if (id) {
      // Update
      const analysis = await prisma.honeyAnalysis.update({
        where: { id },
        data: {
          batchNo,
          productName,
          proline: parseFloat(proline) || 0,
          moisture: parseFloat(moisture) || 0,
          diastase: parseFloat(diastase) || 0,
          analysisDate: analysisDate ? new Date(analysisDate) : undefined,
          reportImageUrl,
          notes
        }
      });
      return NextResponse.json(analysis);
    } else {
      // Create
      const analysis = await prisma.honeyAnalysis.create({
        data: {
          batchNo,
          productName,
          proline: parseFloat(proline) || 0,
          moisture: parseFloat(moisture) || 0,
          diastase: parseFloat(diastase) || 0,
          analysisDate: analysisDate ? new Date(analysisDate) : new Date(),
          reportImageUrl,
          notes
        }
      });
      return NextResponse.json(analysis);
    }
  } catch (error) {
    console.error('Analysis CRUD error:', error);
    return NextResponse.json({ error: 'Analiz raporu kaydedilemedi' }, { status: 500 });
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

    await prisma.honeyAnalysis.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Analiz raporu silinemedi' }, { status: 500 });
  }
}
