import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    console.log('Starting ArıHayat DB sync...');

    // 1. Clear ALL existing data
    await prisma.slider.deleteMany({});
    await prisma.blogPost.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.siteSettings.deleteMany({});
    await prisma.user.deleteMany({});

    // 2. Create Admin User
    const hashedPassword = await bcrypt.hash('arihayat-admin-2026', 10);
    await prisma.user.create({
      data: {
        email: 'admin@arihayat.com',
        password: hashedPassword,
        name: 'ArıHayat Admin',
        role: 'ADMIN',
      },
    });

    // 3. Create Site Settings
    await prisma.siteSettings.create({
      data: {
        id: 'current',
        siteName: 'Arı Hayat',
        siteDescription: '%100 Doğal Bal, Propolis ve Arı Ürünleri',
        contactEmail: 'destek@arihayat.com',
        contactPhone: '0535 337 72 51',
        address: 'Bursa, Türkiye',
        whatsappNumber: '905353377251',
        facebookUrl: 'https://facebook.com/arihayat',
        instagramUrl: 'https://instagram.com/arihayat',
        logoUrl: '/images/logo.png',
        announcementBar: 'DOĞAL ARI ÜRÜNLERİNDE SEZON İNDİRİMİ! 🐝',
        isMaintenance: false,
      },
    });

    // 4. Create Categories
    const categories = [
      { name: 'Arı Sütü', slug: 'ari-sutu', description: 'Saf ve taze yerli arı sütü ürünleri' },
      { name: 'Propolis', slug: 'propolis', description: 'Bağışıklık güçlendirici doğal propolis çözeltileri' },
      { name: 'Bal', slug: 'bal', description: 'Kestane, Çam, Meşe ve Çiçek balları' },
      { name: 'Karışım', slug: 'karisim', description: 'Özel formüllü arı ürünü karışımları' },
      { name: 'Polen & Arı Ekmeği', slug: 'polen-ari-ekmegi', description: 'Protein ve vitamin deposu polen ve perga' },
    ];

    for (const cat of categories) {
      await prisma.category.create({ data: cat });
    }

    const ariSutuCat = await prisma.category.findUnique({ where: { slug: 'ari-sutu' } });
    const propolisCat = await prisma.category.findUnique({ where: { slug: 'propolis' } });
    const balCat = await prisma.category.findUnique({ where: { slug: 'bal' } });

    // 5. Create Sample Products
    const products = [
      {
        name: 'Arı Sütü Yerli Üretim 100 gr',
        description: 'Bursa yöresinden taze sağım, dondurulmuş saf yerli arı sütü.',
        price: 4000.00,
        categoryId: ariSutuCat?.id,
        stock: 10,
        images: JSON.stringify(['/images/products/ari-sutu.jpg']),
      },
      {
        name: 'Zeytinyağlı Propolis 50 ml',
        description: 'Alkol içermeyen, zeytinyağı bazlı doğal propolis ekstraktı.',
        price: 350.00,
        categoryId: propolisCat?.id,
        stock: 100,
        images: JSON.stringify(['/images/products/propolis.jpg']),
      },
      {
        name: 'Kestane Ihlamur Balı 850 gr',
        description: 'Yüksek rakımlı ormanlardan toplanan, yoğun aromalı şifa kaynağı bal.',
        price: 1480.00,
        categoryId: balCat?.id,
        stock: 50,
        images: JSON.stringify(['/images/products/bal.jpg']),
      }
    ];

    for (const prod of products) {
      await prisma.product.create({ data: prod });
    }

    // 6. Create Blog Posts
    const blogPosts = [
      {
        title: 'Gerçek Bal Nasıl Anlaşılır?',
        content: 'Bal alırken gerçek ve doğal olduğunu anlamanın yolları... Kristalleşme, koku ve doku analizleri.',
        excerpt: 'Doğal bal ile sahte bal arasındaki farkları keşfedin.',
        image: '/images/blog/blog-1.jpg',
        slug: 'gercek-bal-nasil-anlasilir',
        author: 'Arı Hayat Uzman',
        published: true
      },
      {
        title: 'Arı Ekmeği (Perga) Nedir?',
        content: 'Arıların poleni fermente ederek oluşturduğu mucizevi besin: Perga.',
        excerpt: 'Arı ekmeğinin faydaları ve kullanımı hakkında her şey.',
        image: '/images/blog/blog-2.jpg',
        slug: 'ari-ekmegi-nedir',
        author: 'Arı Hayat Uzman',
        published: true
      }
    ];

    for (const post of blogPosts) {
      await prisma.blogPost.create({ data: post });
    }

    // 7. Create Sliders
    const sliders = [
      {
        title: 'DOĞANIN ŞİFASI',
        subtitle: 'ARILARIMIZDAN SOFRANIZA',
        description: '%100 Doğal ve Katkısız Arı Ürünleri ile Sağlıklı Yaşam.',
        image: '/images/hero-1.webp',
        buttonText: 'Hemen Keşfet',
        buttonLink: '/urunler',
        order: 1,
        active: true,
      },
      {
        title: 'SAF PROPOLİS',
        subtitle: 'BAĞIŞIKLIĞINIZI GÜÇLENDİRİN',
        description: 'Zeytinyağı bazlı, alkolsüz doğal propolis çözeltileri.',
        image: '/images/hero-2.webp',
        buttonText: 'Ürünleri Gör',
        buttonLink: '/kategori/propolis',
        order: 2,
        active: true,
      },
    ];

    for (const slider of sliders) {
      await prisma.slider.create({ data: slider });
    }

    return NextResponse.json({ success: true, message: 'ArıHayat DB synced successfully.' });
  } catch (error) {
    console.error('DB Sync Error:', error);
    return NextResponse.json({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
