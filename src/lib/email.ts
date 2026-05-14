import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmationEmail(order: any) {
  try {
    const { customerEmail, customerName, totalAmount, id, items } = order;

    await resend.emails.send({
      from: 'İbreOto <siparis@ibreoto.com>',
      to: customerEmail,
      subject: `Siparişiniz Alındı! #${id}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #D41B1B; text-align: center;">Teşekkürler, ${customerName}!</h1>
          <p style="text-align: center; color: #666;">Siparişiniz başarıyla alındı ve hazırlık sürecine başlandı.</p>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #333;">Sipariş Özeti (#${id})</h3>
            <ul style="list-style: none; padding: 0;">
              ${items.map((item: any) => `
                <li style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee;">
                  <span>${item.product.name} (x${item.quantity})</span>
                  <strong>₺${(item.price * item.quantity).toLocaleString('tr-TR')}</strong>
                </li>
              `).join('')}
            </ul>
            <div style="text-align: right; margin-top: 15px; font-size: 18px;">
              <strong>Toplam: ₺${totalAmount.toLocaleString('tr-TR')}</strong>
            </div>
          </div>
          
          <p style="font-size: 12px; color: #999; text-align: center;">
            Bu e-posta otomatik olarak gönderilmiştir. Sorularınız için WhatsApp hattımızdan bize ulaşabilirsiniz.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Email sending failed:', error);
  }
}
