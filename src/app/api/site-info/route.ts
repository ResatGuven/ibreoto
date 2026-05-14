import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'current' }
    });

    const sliders = await prisma.slider.findMany({
      where: { active: true },
      orderBy: { order: 'asc' }
    });

    const latestPosts = await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: 3
    });

    return NextResponse.json({
      settings: settings || {},
      sliders: sliders.length > 0 ? sliders : null,
      latestPosts
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch site info' }, { status: 500 });
  }
}
