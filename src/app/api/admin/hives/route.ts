import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const hives = await prisma.hive.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(hives);
  } catch (error) {
    return NextResponse.json({ error: 'Kovanlar yüklenemedi' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name, status, location, temperature, humidity, beeCount, description, image } = body;

    if (id) {
      // Update
      const hive = await prisma.hive.update({
        where: { id },
        data: {
          name,
          status: status || 'ACTIVE',
          location,
          temperature: parseFloat(temperature) || 34.5,
          humidity: parseFloat(humidity) || 62.0,
          beeCount: parseInt(beeCount) || 45000,
          description,
          image
        }
      });
      return NextResponse.json(hive);
    } else {
      // Create
      const hive = await prisma.hive.create({
        data: {
          name,
          status: status || 'ACTIVE',
          location,
          temperature: parseFloat(temperature) || 34.5,
          humidity: parseFloat(humidity) || 62.0,
          beeCount: parseInt(beeCount) || 45000,
          description,
          image
        }
      });
      return NextResponse.json(hive);
    }
  } catch (error) {
    console.error('Hive CRUD error:', error);
    return NextResponse.json({ error: 'Kovan kaydedilemedi' }, { status: 500 });
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

    await prisma.hive.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Kovan silinemedi' }, { status: 500 });
  }
}
