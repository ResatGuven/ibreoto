import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('🧹 Cleaning database for Arı Hayat...');
    
    await prisma.slider.deleteMany();
    await prisma.blogPost.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.siteSettings.deleteMany();
    
    // 1. Categories
    const categories = [
      { name: 'Arı Sütü', slug: 'ari-sutu' },
      { name: 'Propolis', slug: 'propolis' },
      { name: 'Bal Çeşitleri', slug: 'bal' },
      { name: 'Arı Karışımları', slug: 'karisim' },
    ];

    for (const cat of categories) {
      await prisma.category.create({ data: cat });
    }

    const ariSutuCat = await prisma.category.findUnique({ where: { slug: 'ari-sutu' } });
    const balCat = await prisma.category.findUnique({ where: { slug: 'bal' } });

    // 2. Products
    const products = [
      { name: 'Arı Sütü Yerli Üretim 100 gr', price: 4000, categoryId: ariSutuCat?.id, image: '/images/products/ari-sutu.jpg', description: 'Saf ve taze yerli üretim arı sütü.', stock: 10 },
      { name: 'Kestane Ihlamur Balı 850 gr', price: 1480, categoryId: balCat?.id, image: '/images/products/bal.jpg', description: 'Doğal ormanlardan gelen şifa kaynağı.', stock: 50 },
    ];

    for (const prod of products) {
      const slug = prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      await prisma.product.create({
        data: {
          name: prod.name,
          slug: slug,
          price: prod.price,
          images: JSON.stringify([prod.image]),
          description: prod.description,
          stock: prod.stock,
          categoryId: prod.categoryId!,
        },
      });
    }

    // 3. Site Settings
    await prisma.siteSettings.create({
      data: {
        id: 'current',
        siteName: 'Arı Hayat',
        siteDescription: '%100 Doğal Bal, Propolis ve Arı Ürünleri',
        contactEmail: 'destek@arihayat.com',
        contactPhone: '0535 337 72 51',
        whatsappNumber: '905353377251',
        address: 'Bursa, Türkiye',
        logoUrl: '/images/logo.png',
        announcementBar: 'DOĞAL ARI ÜRÜNLERİNDE SEZON İNDİRİMİ! 🐝',
        instagramUrl: 'https://instagram.com/arihayat',
        facebookUrl: 'https://facebook.com/arihayat',
      },
    });

    const adminPassword = await bcrypt.hash('arihayat-admin-2026', 10);
    await prisma.user.upsert({
      where: { email: 'admin@arihayat.com' },
      update: { password: adminPassword },
      create: {
        email: 'admin@arihayat.com',
        name: 'Arı Hayat Admin',
        password: adminPassword,
        role: 'ADMIN',
      },
    });

    const sliders = [
      {
        title: "DOĞANIN ŞİFASI",
        subtitle: "ARILARIMIZDAN SOFRANIZA",
        image: "/images/hero-1.webp",
        buttonText: "Hemen İncele",
        buttonLink: "/urunler",
        order: 1
      }
    ];

    for (const slider of sliders) {
      await prisma.slider.create({ data: slider });
    }

    return NextResponse.json({ message: '🚀 ARI HAYAT DB SETUP COMPLETED SUCCESSFULLY!' });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
