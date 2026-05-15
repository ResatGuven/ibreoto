import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('🧹 Cleaning database...');
    
    await prisma.slider.deleteMany();
    await prisma.blogPost.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.siteSettings.deleteMany();
    
    // 1. Categories
    const categories = [
      { name: 'İç Aksesuar', slug: 'ic-aksesuar' },
      { name: 'Dış Aksesuar', slug: 'dis-aksesuar' },
      { name: 'Teknoloji & Elektronik', slug: 'teknoloji' },
      { name: 'Bakım & Temizlik', slug: 'bakim' },
    ];

    for (const cat of categories) {
      await prisma.category.create({ data: cat });
    }

    // 2. Products
    const automotiveProducts = [
      { name: 'Karbon Fiber Direksiyon Kılıfı', price: 350, categorySlug: 'ic-aksesuar', image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Yüksek kaliteli karbon fiber görünüm. Sportif dokunuş ve ergonomik tutuş sağlar.', stock: 15 },
      { name: '3D Havuzlu Paspas Seti - VW Golf', price: 850, categorySlug: 'ic-aksesuar', image: 'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Tam uyumlu havuzlu paspas seti. Aracınızın tabanını kir ve sudan korur.', stock: 20 },
      { name: '4K Çift Kameralı Araç İçi Kamera', price: 2500, categorySlug: 'teknoloji', image: 'https://images.pexels.com/photos/4488660/pexels-photo-4488660.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Ön ve arka eş zamanlı kayıt. Gece görüşü ve park modu özellikleri.', stock: 8 },
      { name: 'Seramik Katkılı Hızlı Cila 500ml', price: 250, categorySlug: 'bakim', image: 'https://images.pexels.com/photos/5214411/pexels-photo-5214411.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Aracınıza derin bir parlaklık ve su iticilik kazandırır.', stock: 15 }
    ];

    for (const prod of automotiveProducts) {
      const category = await prisma.category.findUnique({
        where: { slug: prod.categorySlug },
      });

      if (category) {
        const slug = prod.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        await prisma.product.create({
          data: {
            name: prod.name,
            slug: slug,
            price: prod.price,
            images: JSON.stringify([prod.image]),
            description: prod.description,
            stock: prod.stock,
            categoryId: category.id,
          },
        });
      }
    }

    // 3. Site Settings
    await prisma.siteSettings.create({
      data: {
        id: 'current',
        siteName: 'İbreOto',
        siteDescription: 'Premium Araç Aksesuarları & Modifiye Çözümleri',
        contactEmail: 'destek@ibreoto.com',
        contactPhone: '0506 157 89 63',
        whatsappNumber: '905061578963',
        address: 'Merkez Mahallesi, Otomotiv Plaza No:12, İstanbul',
        logoUrl: '/images/logo.jpg',
        announcementBar: 'YENİ SEZON ARAÇ AKSESUARLARINDA %20 İNDİRİM! 🚀',
        instagramUrl: 'https://instagram.com/ibreoto',
        facebookUrl: 'https://facebook.com/ibreoto',
      },
    });

    const adminPassword = await bcrypt.hash('ibreoto-admin-2026', 10);
    await prisma.user.upsert({
      where: { email: 'admin@ibreoto.com' },
      update: { password: adminPassword },
      create: {
        email: 'admin@ibreoto.com',
        name: 'İbreOto Admin',
        password: adminPassword,
        role: 'ADMIN',
      },
    });

    const sliders = [
      {
        title: "Premium Araç Aksesuarları",
        subtitle: "Aracınıza değer katan dokunuşlar",
        image: "https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=1920",
        buttonText: "Hemen İncele",
        buttonLink: "/urunler",
        order: 1
      }
    ];

    for (const slider of sliders) {
      await prisma.slider.create({ data: slider });
    }

    return NextResponse.json({ message: '🚀 DB SETUP COMPLETED SUCCESSFULLY!' });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
