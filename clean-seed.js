const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  console.log('🧹 Cleaning database...');
  
  // Delete in order to avoid foreign key constraints
  await prisma.slider.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.siteSettings.deleteMany();
  
  console.log('✅ Database cleaned');

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
  console.log('✅ Categories seeded');

  // 2. Products
  const products = [
    { name: 'Karbon Fiber Direksiyon Kılıfı', price: 350, categorySlug: 'ic-aksesuar', image: 'https://images.unsplash.com/photo-1598450844431-23b91480603e?q=80&w=800', description: 'Yüksek kaliteli karbon fiber görünüm. Sportif dokunuş ve ergonomik tutuş sağlar.', stock: 15 },
    { name: '3D Havuzlu Paspas Seti - VW Golf', price: 850, categorySlug: 'ic-aksesuar', image: 'https://images.unsplash.com/photo-1605515298946-d062f2e9da53?q=80&w=800', description: 'Tam uyumlu havuzlu paspas seti. Aracınızın tabanını kir ve sudan korur.', stock: 20 },
    { name: 'Ortopedik Bel Destekli Koltuk Minderi', price: 450, categorySlug: 'ic-aksesuar', image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=800', description: 'Uzun sürüşler için maksimum konfor. Bel ağrılarını önlemeye yardımcı olur.', stock: 10 },
    { name: 'Dört Mevsim Branda - Su Geçirmez', price: 1200, categorySlug: 'dis-aksesuar', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800', description: 'Aracınızı güneş, yağmur ve tozdan korur. Dayanıklı ve uzun ömürlü kumaş.', stock: 5 },
    { name: 'Muz Tipi Silecek Takımı', price: 150, categorySlug: 'dis-aksesuar', image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=800', description: 'Sessiz ve kusursuz silme performansı. Her türlü hava koşuluna dayanıklı.', stock: 50 },
    { name: 'Krom Kapı Kolu Kaplaması', price: 250, categorySlug: 'dis-aksesuar', image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=800', description: 'Şık ve estetik görünüm. Kolay montaj, paslanmaz çelik malzeme.', stock: 30 },
    { name: '4K Çift Kameralı Araç İçi Kamera', price: 2500, categorySlug: 'teknoloji', image: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800', description: 'Ön ve arka eş zamanlı kayıt. Gece görüşü ve park modu özellikleri.', stock: 8 },
    { name: 'RGB Uygulama Kontrollü Ambiyans Led', price: 650, categorySlug: 'teknoloji', image: 'https://images.unsplash.com/photo-1507133311040-ae3ba655bc10?q=80&w=800', description: 'Telefonunuzdan renk değiştirebileceğiniz iç aydınlatma. Sese duyarlı modlar.', stock: 25 },
    { name: 'Kablosuz Şarjlı Telefon Tutucu', price: 350, categorySlug: 'teknoloji', image: 'https://images.unsplash.com/photo-1586815593704-3580805322c7?q=80&w=800', description: 'Hızlı kablosuz şarj ve otomatik kavrama mekanizması.', stock: 40 },
    { name: 'Seramik Katkılı Hızlı Cila 500ml', price: 250, categorySlug: 'bakim', image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=800', description: 'Aracınıza derin bir parlaklık ve su iticilik kazandırır.', stock: 15 },
    { name: 'Cilalı Oto Şampuanı 1 Litre', price: 120, categorySlug: 'bakim', image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800', description: 'Yıkama esnasında koruyucu bir tabaka oluşturur. Ph dengelidir.', stock: 20 },
    { name: 'Mikrofiber Kurulama Bezi 3\'lü', price: 80, categorySlug: 'bakim', image: 'https://images.unsplash.com/photo-1552650272-b8a34e21bc4b?q=80&w=800', description: 'Yüksek emiş gücü. Aracınızı çizmeden kurular ve hav bırakmaz.', stock: 100 },
  ];

  for (const prod of products) {
    const category = await prisma.category.findUnique({
      where: { slug: prod.categorySlug },
    });

    if (category) {
      const slug = prod.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

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
  console.log('✅ Products seeded');

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
  console.log('✅ Site settings seeded');

  // 4. Admin User
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
  console.log('✅ Admin user seeded');

  // 5. Blog Posts
  const blogPosts = [
    {
      title: "Arabanızın İç Aksesuarlarını Seçerken Dikkat Edilmesi Gerekenler",
      slug: "ic-aksesuar-secim-rehberi",
      excerpt: "Aracınızın iç mekanını daha konforlu ve şık hale getirmek için aksesuar seçerken bilmeniz gereken 5 temel kural.",
      category: "İç Aksesuar",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1000",
      content: `Arabanızın iç mekanı, sürüş deneyiminizin en büyük parçasıdır. İşte seçim yaparken dikkat etmeniz gerekenler:\n\n1. Kalite ve Malzeme: Plastik yerine yumuşak dokulu ve dayanıklı malzemeleri tercih edin.\n2. Uyum: Her aksesuar her araca uymaz, aracınızın modeline tam uyumlu ürünler seçin.\n3. Fonksiyonellik: Sadece güzel görünen değil, hayatınızı kolaylaştıran aksesuarlara odaklanın.\n4. Güvenlik: Sürüş güvenliğini engelleyecek, görüşü kapatacak ürünlerden kaçının.\n5. Temizlik: Kolay temizlenebilir ürünler, aracınızın her zaman yeni kalmasını sağlar.`
    },
    {
      title: "2026'nın En Popüler Araç Dış Aksesuar Trendleri",
      slug: "2026-dis-aksesuar-trendleri",
      excerpt: "Bu yıl sokaklarda en çok göreceğimiz araç dış aksesuar trendleri: Karbon fiber detaylar, mat kaplamalar ve fazlası.",
      category: "Dış Aksesuar",
      image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=1000",
      content: `2026 yılı otomobil dünyasında kişiselleştirmenin yılı oluyor. İşte bu yılın en popüler trendleri:\n\n- Stealth Görünüm: Mat siyah kaplamalar ve karartılmış logolar yükselişte.\n- Akıllı Ledler: Araç dışına entegre edilen, karşılama animasyonlu led şeritler.\n- Aerodinamik Spoilerlar: Hem performans hem de agresif bir görünüm için tasarlanan yeni nesil kanatlar.\n- Çevreci Malzemeler: Geri dönüştürülmüş karbon fiber ve sürdürülebilir materyaller.`
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }
  console.log('✅ Blog posts seeded');

  // 6. Sliders
  const sliders = [
    {
      title: "Premium Araç Aksesuarları",
      subtitle: "Aracınıza değer katan dokunuşlar",
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1920",
      buttonText: "Hemen İncele",
      buttonLink: "/urunler",
      order: 1
    }
  ];

  for (const slider of sliders) {
    await prisma.slider.create({ data: slider });
  }
  console.log('✅ Sliders seeded');

  console.log('🚀 CLEAN SEED COMPLETED!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
