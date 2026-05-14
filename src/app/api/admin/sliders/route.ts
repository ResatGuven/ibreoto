import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const sliders = await prisma.slider.findMany({
      orderBy: { order: 'asc' }
    });
    return NextResponse.json(sliders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sliders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const slider = await prisma.slider.create({
      data: body
    });
    return NextResponse.json(slider);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create slider' }, { status: 500 });
  }
}
