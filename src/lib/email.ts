import nodemailer from 'nodemailer';
import prisma from '@/lib/prisma';

export async function sendOrderConfirmationEmail(order: any) {
  try {
    const { customerEmail, customerName, totalAmount, id, items } = order;

    // Fetch dynamic SMTP settings from database
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'current' }
    });

    const host = settings?.smtpHost || process.env.SMTP_HOST;
    const port = settings?.smtpPort || Number(process.env.SMTP_PORT) || 587;
    const user = settings?.smtpUser || process.env.SMTP_USER;
    const pass = settings?.smtpPass || process.env.SMTP_PASS;
    const from = settings?.smtpFrom || process.env.SMTP_FROM || 'ARI HAYAT <bilgi@arihayat.com>';

    if (!host || !user || !pass) {
      console.warn('SMTP configurations are missing in both DB and Environment variables. Skipping email.');
      return;
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const itemsHtml = items.map((item: any) => `
      <li style="display: flex; justify-content: space-between; padding: 5px 0; border-bottom: 1px solid #eee;">
        <span>${item.product.name} (x${item.quantity})</span>
        <strong>₺${(item.price * item.quantity).toLocaleString('tr-TR')}</strong>
      </li>
    `).join('');

    const htmlContent = `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h1 style="color: #F59E0B; text-align: center;">Teşekkürler, ${customerName}!</h1>
        <p style="text-align: center; color: #666;">Siparişiniz başarıyla alındı ve hazırlık sürecine başlandı.</p>
        
        <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #333;">Sipariş Özeti (#${id})</h3>
          <ul style="list-style: none; padding: 0;">
            ${itemsHtml}
          </ul>
          <div style="text-align: right; margin-top: 15px; font-size: 18px;">
            <strong>Toplam: ₺${totalAmount.toLocaleString('tr-TR')}</strong>
          </div>
        </div>
        
        <p style="font-size: 12px; color: #999; text-align: center;">
          Bu e-posta otomatik olarak gönderilmiştir. Sorularınız için WhatsApp hattımızdan bize ulaşabilirsiniz.
        </p>
      </div>
    `;

    await transporter.sendMail({
      from,
      to: customerEmail,
      subject: `Siparişiniz Alındı! #${id}`,
      html: htmlContent,
    });

    console.log('Email sent successfully via Nodemailer.');
  } catch (error) {
    console.error('Email sending failed:', error);
  }
}
