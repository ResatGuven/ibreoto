import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    const newMessage = await prisma.message.create({
      data: {
        name,
        email,
        subject: subject || 'İletişim Mesajı',
        message,
      },
    });

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error('Failed to create message:', error);
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
  }
}
