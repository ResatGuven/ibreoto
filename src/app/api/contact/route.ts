import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendTelegramMessage } from '@/lib/telegram';

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

    // Telegram Notification
    const telegramMessage = `✉️ *YENİ MESAJ ALINDI!* \n\n` +
      `👤 *Ad:* ${name}\n` +
      `📧 *E-Posta:* ${email}\n` +
      `📌 *Konu:* ${subject || 'İletişim Mesajı'}\n\n` +
      `📝 *Mesaj:* \n${message}`;

    sendTelegramMessage(telegramMessage).catch(e => console.error('Telegram Notify Error:', e));

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error('Failed to create message:', error);
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
  }
}
