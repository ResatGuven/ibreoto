import { NextResponse } from 'next/server';

import { sendTelegramMessage } from '@/lib/telegram';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const result = await sendTelegramMessage(message);
    
    if (result.success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error('Server Error:', error);
    return NextResponse.json({ success: false, error: 'Server Error' }, { status: 500 });
  }
}
