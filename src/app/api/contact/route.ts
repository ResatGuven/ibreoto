import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { sendTelegramMessage, escapeHtml } from '@/lib/telegram';

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
    const telegramMessage = `✉️ <b>YENİ MESAJ ALINDI!</b> \n\n` +
      `👤 <b>Ad:</b> ${escapeHtml(name)}\n` +
      `📧 <b>E-Posta:</b> ${escapeHtml(email)}\n` +
      `📌 <b>Konu:</b> ${escapeHtml(subject || 'İletişim Mesajı')}\n\n` +
      `📝 <b>Mesaj:</b> \n${escapeHtml(message)}`;

    await sendTelegramMessage(telegramMessage).catch(e => console.error('Telegram Notify Error:', e));

    return NextResponse.json(newMessage);
  } catch (error) {
    console.error('Failed to create message:', error);
    return NextResponse.json({ error: 'Failed to create message' }, { status: 500 });
  }
}
