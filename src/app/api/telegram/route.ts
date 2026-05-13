import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const token = '8744261373:AAEDxurdYIDjGkZ1Vc3CwzRHytAS6RM4plo';
    const chatId = '1090705043';
    
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true });
    } else {
      console.error('Telegram API Error:', data);
      return NextResponse.json({ success: false, error: data }, { status: 500 });
    }
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
