const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  console.log('Starting seed...');

  // 1. Categories
  const categories = [
    { name: 'İç Aksesuar', slug: 'ic-aksesuar' },
    { name: 'Dış Aksesuar', slug: 'dis-aksesuar' },
    { name: 'Teknoloji & Elektronik', slug: 'teknoloji' },
    { name: 'Bakım & Temizlik', slug: 'bakim' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }
  console.log('Categories seeded');

  // 2. Products
  const products = [
    { name: 'Karbon Fiber Direksiyon Kılıfı', price: 350, categorySlug: 'ic-aksesuar', image: '/images/products/steering_wheel_cover.png', description: 'Yüksek kaliteli karbon fiber görünüm. Sportif dokunuş ve ergonomik tutuş sağlar.', stock: 15 },
    { name: '3D Havuzlu Paspas Seti - VW Golf', price: 850, categorySlug: 'ic-aksesuar', image: '/images/products/paspas_seti.png', description: 'Tam uyumlu havuzlu paspas seti. Aracınızın tabanını kir ve sudan korur.', stock: 20 },
    { name: 'Ortopedik Bel Destekli Koltuk Minderi', price: 450, categorySlug: 'ic-aksesuar', image: '/images/products/koltuk_minderi.png', description: 'Uzun sürüşler için maksimum konfor. Bel ağrılarını önlemeye yardımcı olur.', stock: 10 },
    { name: 'Dört Mevsim Branda - Su Geçirmez', price: 1200, categorySlug: 'dis-aksesuar', image: '/images/products/araba_brandasi.png', description: 'Aracınızı güneş, yağmur ve tozdan korur. Dayanıklı ve uzun ömürlü kumaş.', stock: 5 },
    { name: 'Muz Tipi Silecek Takımı', price: 150, categorySlug: 'dis-aksesuar', image: '/images/products/silecek_takimi.png', description: 'Sessiz ve kusursuz silme performansı. Her türlü hava koşuluna dayanıklı.', stock: 50 },
    { name: 'Krom Kapı Kolu Kaplaması', price: 250, categorySlug: 'dis-aksesuar', image: '/images/products/krom_kapi_kolu.png', description: 'Şık ve estetik görünüm. Kolay montaj, paslanmaz çelik malzeme.', stock: 30 },
    { name: '4K Çift Kameralı Araç İçi Kamera', price: 2500, categorySlug: 'teknoloji', image: '/images/products/dash_cam.png', description: 'Ön ve arka eş zamanlı kayıt. Gece görüşü ve park modu özellikleri.', stock: 8 },
    { name: 'RGB Uygulama Kontrollü Ambiyans Led', price: 650, categorySlug: 'teknoloji', image: '/images/products/interior_led.png', description: 'Telefonunuzdan renk değiştirebileceğiniz iç aydınlatma. Sese duyarlı modlar.', stock: 25 },
    { name: 'Kablosuz Şarjlı Telefon Tutucu', price: 350, categorySlug: 'teknoloji', image: '/images/products/telefon_tutucu.png', description: 'Hızlı kablosuz şarj ve otomatik kavrama mekanizması.', stock: 40 },
    { name: 'Seramik Katkılı Hızlı Cila 500ml', price: 250, categorySlug: 'bakim', image: '/images/products/seramik_cila.png', description: 'Aracınıza derin bir parlaklık ve su iticilik kazandırır.', stock: 15 },
    { name: 'Cilalı Oto Şampuanı 1 Litre', price: 120, categorySlug: 'bakim', image: '/images/products/oto_sampuani.png', description: 'Yıkama esnasında koruyucu bir tabaka oluşturur. Ph dengelidir.', stock: 20 },
    { name: 'Mikrofiber Kurulama Bezi 3\'lü', price: 80, categorySlug: 'bakim', image: '/images/products/kurulama_bezi.png', description: 'Yüksek emiş gücü. Aracınızı çizmeden kurular ve hav bırakmaz.', stock: 100 },
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

      await prisma.product.upsert({
        where: { slug: slug },
        update: {
          name: prod.name,
          price: prod.price,
          images: JSON.stringify([prod.image]),
          description: prod.description,
          stock: prod.stock,
          categoryId: category.id,
        },
        create: {
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
  console.log('Products seeded');

  // 3. Site Settings
  await prisma.siteSettings.upsert({
    where: { id: 'current' },
    update: {
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
    create: {
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
  console.log('Site settings seeded');

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
  console.log('Admin user seeded');

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
    },
    {
      title: "Oto Aksesuar Takarken Yapılan 5 Yaygın Hata",
      slug: "oto-aksesuar-montaj-hatalari",
      excerpt: "Kendi başınıza aksesuar takarken aracınıza zarar vermemek için bu yaygın hatalardan kaçının.",
      category: "Rehber",
      image: "https://images.unsplash.com/photo-1486006396123-27c249a0d0d4?q=80&w=1000",
      content: `Birçok sürücü aksesuarlarını kendi takmak ister ancak bazı hatalar maliyetli sonuçlar doğurabilir:\n\n1. Yanlış Yüzey Hazırlığı: Yapıştırmalı ürünleri takmadan önce yüzeyin tamamen temizlendiğinden emin olun.\n2. Elektrik Bağlantıları: Led gibi ürünlerde sigorta kutusuna yanlış müdahale etmek tüm sistemi etkileyebilir.\n3. Zorlayarak Takma: Geçmeli parçalarda aşırı güç kullanmak tırnakları kırabilir.\n4. Kalitesiz Yapıştırıcı: Ürünle gelen yapıştırıcı yetersizse, mutlaka profesyonel çift taraflı bantlar kullanın.\n5. Kullanım Kılavuzunu Atlamak: 'Biliyorum' demeyin, her ürünün kendine has bir takılma yöntemi vardır.`
    },
    {
      title: "Araç Camı Filmi Seçim Rehberi: Hangisi Sana Uygun?",
      slug: "araç-cama-filmi-rehberi",
      excerpt: "Cam filmi sadece estetik değil, bir ihtiyaçtır. Isı korumalı, UV filtreli ve farklı tonlardaki cam filmleri hakkında her şey.",
      category: "Rehber",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000",
      content: `Cam filmi seçimi sürüş konforunuzu doğrudan etkiler:\n\n- UV Korumalı Filmler: Cildinizi ve aracınızın döşemelerini güneşten korur.\n- Isı Reddi: Yaz aylarında aracınızın içini serin tutan seramik filmler.\n- Güvenlik Filmleri: Olası kaza anında camın dağılmasını engeller.\n- Yasal Sınırlar: Ön ve yan camlar için izin verilen geçirgenlik oranlarına dikkat edilmelidir.`
    },
    {
      title: "Elektrikli Araçlar İçin En İyi Aksesuar Önerileri 2026",
      slug: "elektrikli-arac-aksesuar-onerileri",
      excerpt: "Elektrikli araç sahipleri için olmazsa olmaz aksesuarlar: Taşınabilir şarj üniteleri, özel paspaslar ve daha fazlası.",
      category: "Teknoloji",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=1000",
      content: `Elektrikli araçlar farklı ihtiyaçları da beraberinde getiriyor:\n\n- Kablo Düzenleyiciler: Bagajınızda karmaşa yaratan şarj kabloları için özel çantalar.\n- Aerodinamik Jant Kapakları: Menzilinizi artırmaya yardımcı olan düşük dirençli kapaklar.\n- Frunk Düzenleyiciler: Ön bagajı (Frunk) daha verimli kullanmak için özel bölmeler.\n- Akıllı Ekran Koruyucular: Büyük multimedya ekranları için parmak izi bırakmayan camlar.`
    },
    {
      title: "Araç Bakımında Aksesuar Kullanımının Önemi",
      slug: "arac-bakim-ve-aksesuar-onemi",
      excerpt: "Doğru aksesuarlar aracınızın ikinci el değerini nasıl korur? Branda, seramik cila ve koltuk koruyucuların etkisi.",
      category: "Bakım",
      image: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1000",
      content: `Aksesuar sadece süs değildir, bir koruma kalkanıdır:\n\n- Branda Kullanımı: Boyanın matlaşmasını ve kuş pisliklerinin zararını önler.\n- Seramik Cila: Aracınızın her zaman ilk günkü gibi parlamasını sağlar ve yıkamayı kolaylaştırır.\n- Koltuk Minderleri: Orijinal döşemenin aşınmasını engelleyerek ikinci el değerini artırır.\n- Kapı Eşiği Korumaları: Ayakkabı darbeleriyle oluşan çizikleri önler.`
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
  }
  console.log('Blog posts seeded');

  // 6. Sliders
  const sliders = [
    {
      title: "Premium Araç Aksesuarları",
      subtitle: "Aracınıza değer katan dokunuşlar",
      image: "/images/hero_banner.png",
      buttonText: "Hemen İncele",
      buttonLink: "/urunler",
      order: 1
    },
    {
      title: "Yeni Nesil Teknoloji",
      subtitle: "Akıllı araç içi çözümler",
      image: "/images/hero_banner_new.png",
      buttonText: "Ürünleri Gör",
      buttonLink: "/urunler?category=teknoloji",
      order: 2
    }
  ];

  for (const slider of sliders) {
    await prisma.slider.create({ data: slider });
  }
  console.log('Sliders seeded');

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
