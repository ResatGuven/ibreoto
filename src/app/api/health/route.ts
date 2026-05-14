import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Check DB connection
    await prisma.$queryRaw`SELECT 1`;
    
    return NextResponse.json({ 
      status: 'healthy', 
      timestamp: new Date().toISOString(),
      database: 'connected'
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'unhealthy', 
      error: 'Database connection failed' 
    }, { status: 500 });
  }
}
