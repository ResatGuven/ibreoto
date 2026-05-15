import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    message: 'Deployment is working',
    time: new Date().toISOString()
  });
}
