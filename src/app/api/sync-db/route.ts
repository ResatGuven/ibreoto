import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    console.log('Starting DB sync...');

    // 1. Clear ALL existing data in reverse order of dependencies
    await prisma.slider.deleteMany({});
    await prisma.blogPost.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.siteSettings.deleteMany({});
    await prisma.user.deleteMany({});

    console.log('Tables cleared.');

    // 2. Create Admin User
    const hashedPassword = await bcrypt.hash('ibreoto-admin-2026', 10);
    await prisma.user.create({
      data: {
        email: 'admin@ibreoto.com',
        password: hashedPassword,
        name: 'İbreOto Admin',
        role: 'ADMIN',
      },
    });

    // 3. Create Site Settings
    await prisma.siteSettings.create({
      data: {
        id: 'current',
        siteName: 'İbreOto',
        siteDescription: 'Premium Araç Aksesuarları & Modifiye Çözümleri',
        contactEmail: 'destek@ibreoto.com',
        contactPhone: '0506 157 89 63',
        address: 'Merkez Mahallesi, Otomotiv Plaza No:12, İstanbul',
        whatsappNumber: '905061578963',
        facebookUrl: 'https://facebook.com/ibreoto',
        instagramUrl: 'https://instagram.com/ibreoto',
        logoUrl: '/images/logo.jpg',
        announcementBar: 'YENİ SEZON ARAÇ AKSESUARLARINDA %20 İNDİRİM! 🚀',
        isMaintenance: false,
      },
    });

    // 4. Create Categories
    const categories = [
      { name: 'İç Aksesuar', slug: 'ic-aksesuar', description: 'Araç içi konfor ve estetik ürünleri' },
      { name: 'Dış Aksesuar', slug: 'dis-aksesuar', description: 'Gövde kitleri, spoyler ve dış modifiye' },
      { name: 'Teknoloji', slug: 'teknoloji', description: 'Multimedya, ses sistemleri ve aydınlatma' },
      { name: 'Bakım & Temizlik', slug: 'bakim', description: 'Profesyonel araç bakım ürünleri' },
    ];

    for (const cat of categories) {
      await prisma.category.create({ data: cat });
    }

    const icAksesuar = await prisma.category.findUnique({ where: { slug: 'ic-aksesuar' } });
    const disAksesuar = await prisma.category.findUnique({ where: { slug: 'dis-aksesuar' } });

    // 5. Create Sample Products
    const products = [
      {
        name: 'Premium Karbon Direksiyon Kaplama',
        description: 'Gerçek karbon fiber dokulu, ergonomik tasarım direksiyon kaplama.',
        price: 1250.00,
        categoryId: icAksesuar?.id,
        stock: 50,
        images: JSON.stringify(['https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg']),
      },
      {
        name: 'BMW G20 M-Sport Gövde Kiti',
        description: 'BMW 3 Serisi G20 için tam uyumlu M-Sport body kit seti.',
        price: 8500.00,
        categoryId: disAksesuar?.id,
        stock: 10,
        images: JSON.stringify(['https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg']),
      },
    ];

    for (const prod of products) {
      await prisma.product.create({ data: prod });
    }

    // 6. Create Sliders
    const sliders = [
      {
        title: 'PREMİUM MODİFİYE',
        subtitle: 'ARACINIZA DEĞER KATIN',
        description: 'En kaliteli dış aksesuarlar ve body kit çözümleri İbreOto\'da.',
        image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg',
        buttonText: 'Koleksiyonu Keşfet',
        buttonLink: '/urunler?category=dis-aksesuar',
        order: 1,
        active: true,
      },
      {
        title: 'İÇ KONFOR VE ESTETİK',
        subtitle: 'SÜRÜŞ KEYFİNİ ARTIRIN',
        description: 'Direksiyon kaplamadan multimedya sistemlerine kadar her şey.',
        image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
        buttonText: 'Hemen İncele',
        buttonLink: '/urunler?category=ic-aksesuar',
        order: 2,
        active: true,
      },
    ];

    for (const slider of sliders) {
      await prisma.slider.create({ data: slider });
    }

    console.log('DB Seeded successfully.');

    return NextResponse.json({ 
      success: true, 
      message: 'Database cleared and seeded with İbreOto data.' 
    });
  } catch (error) {
    console.error('DB Sync Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}
