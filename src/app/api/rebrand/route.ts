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
        logoUrl: '/images/logo.png',
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
      {
        name: 'Ultra Parlak LED Far Seti H7',
        description: '6000K beyaz ışık, 12000 lümen yüksek performanslı LED far seti.',
        price: 850.00,
        categoryId: disAksesuar?.id,
        stock: 100,
        images: JSON.stringify(['https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg']),
      },
      {
        name: 'Android Multimedya Ekran 10"',
        description: 'Kablosuz Apple CarPlay ve Android Auto destekli, 4GB RAM akıllı ekran.',
        price: 4500.00,
        categoryId: icAksesuar?.id,
        stock: 25,
        images: JSON.stringify(['https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg']),
      }
    ];

    for (const prod of products) {
      await prisma.product.create({ data: prod });
    }

    // 6. Create Blog Posts
    const blogPosts = [
      {
        title: 'Arabanızın İç Aksesuarlarını Seçerken Dikkat Edilmesi Gerekenler',
        content: 'Aracınızın iç mekanını kişiselleştirmek sürüş keyfini artırır. Ancak aksesuar seçerken sadece estetik değil, fonksiyonellik ve güvenlik de ön planda olmalıdır...',
        excerpt: 'İç mekan konforunu artıran en popüler aksesuarlar ve seçim rehberi.',
        image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg',
        slug: 'ic-aksesuar-secim-rehberi',
        author: 'İbreOto Uzman',
        published: true
      },
      {
        title: '2026\'nın En Popüler Araç Dış Aksesuar Trendleri',
        content: 'Bu yıl araç dış tasarımında minimalist çizgiler ve karbon fiber detaylar ön planda. Aerodinamik yapıyı bozmadan araca agresif bir görünüm kazandıran spoyler ve yan etekler...',
        excerpt: 'Bu yılın modifiye dünyasındaki en yeni trendleri keşfedin.',
        image: 'https://images.pexels.com/photos/3729464/pexels-photo-3729464.jpeg',
        slug: '2026-dis-aksesuar-trendleri',
        author: 'Modifiye Editörü',
        published: true
      },
      {
        title: 'Oto Aksesuar Takarken Yapılan 5 Hata',
        content: 'Birçok araç sahibi, aksesuarları kendisi takmak isterken geri dönüşü olmayan hatalar yapabiliyor. Yanlış elektrik bağlantıları, boyaya zarar veren yapıştırıcılar...',
        excerpt: 'Aksesuar montajında yapılan hatalardan kaçınmak için bu rehbere göz atın.',
        image: 'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg',
        slug: 'oto-aksesuar-montaj-hatalari',
        author: 'Teknik Ekip',
        published: true
      },
      {
        title: 'Araba Aydınlatmasında LED mi Xenon mu?',
        content: 'Far seçimi hem görüş kalitesi hem de aracın dış görünüşü için kritiktir. LED farlar daha uzun ömürlü ve anında tam parlaklığa ulaşırken, Xenon farlar daha geniş bir alanı aydınlatabilir...',
        excerpt: 'Farklı aydınlatma teknolojilerinin avantajlarını ve dezavantajlarını karşılaştırıyoruz.',
        image: 'https://images.pexels.com/photos/3311574/pexels-photo-3311574.jpeg',
        slug: 'led-vs-xenon-aydinlatma',
        author: 'Aydınlatma Uzmanı',
        published: true
      },
      {
        title: 'Kış Mevsiminde Aracınız İçin En Gerekli 5 Aksesuar',
        content: 'Kış şartları araçlar için zorlayıcı olabilir. Kaydırmaz paspaslar, buğu önleyici spreyler ve kaliteli silecekler kışın sürüş güvenliğinizi artıran temel aksesuarlardır...',
        excerpt: 'Soğuk kış günlerinde güvenli sürüş için yanınızda bulundurmanız gerekenler.',
        image: 'https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg',
        slug: 'kis-mevsimi-aksesuar-rehberi',
        author: 'Sürüş Eğitmeni',
        published: true
      },
      {
        title: 'Modifiye Tutkunları İçin Başlangıç Rehberi',
        content: 'Modifiyeye nereden başlayacağını bilmeyenler için en temel adımlar: Jant seçimi, süspansiyon ayarları ve yazılım güncellemeleri. Aracınızın garantisini bozmadan yapabileceğiniz iyileştirmeler...',
        excerpt: 'Aracınızı kişiselleştirmeye başlamak için bilmeniz gereken temel ipuçları.',
        image: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg',
        slug: 'modifiye-baslangic-rehberi',
        author: 'İbreOto Editör',
        published: true
      }
    ];

    for (const post of blogPosts) {
      await prisma.blogPost.create({ data: post });
    }

    // 7. Create Sliders
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
