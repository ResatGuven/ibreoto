const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

async function main() {
  console.log('🧹 Cleaning database...');
  
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

  // 2. Products (Using Pexels for better stability)
  const products = [
    { name: 'Karbon Fiber Direksiyon Kılıfı', price: 350, categorySlug: 'ic-aksesuar', image: 'https://images.pexels.com/photos/1055691/pexels-photo-1055691.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Yüksek kaliteli karbon fiber görünüm. Sportif dokunuş ve ergonomik tutuş sağlar.', stock: 15 },
    { name: '3D Havuzlu Paspas Seti - VW Golf', price: 850, categorySlug: 'ic-aksesuar', image: 'https://images.pexels.com/photos/4489749/pexels-photo-4489749.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Tam uyumlu havuzlu paspas seti. Aracınızın tabanını kir ve sudan korur.', stock: 20 },
    { name: 'Ortopedik Bel Destekli Koltuk Minderi', price: 450, categorySlug: 'ic-aksesuar', image: 'https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Uzun sürüşler için maksimum konfor. Bel ağrılarını önlemeye yardımcı olur.', stock: 10 },
    { name: 'Dört Mevsim Branda - Su Geçirmez', price: 1200, categorySlug: 'dis-aksesuar', image: 'https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Aracınızı güneş, yağmur ve tozdan korur. Dayanıklı ve uzun ömürlü kumaş.', stock: 5 },
    { name: 'Muz Tipi Silecek Takımı', price: 150, categorySlug: 'dis-aksesuar', image: 'https://images.pexels.com/photos/4489737/pexels-photo-4489737.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Sessiz ve kusursuz silme performansı. Her türlü hava koşuluna dayanıklı.', stock: 50 },
    { name: 'Krom Kapı Kolu Kaplaması', price: 250, categorySlug: 'dis-aksesuar', image: 'https://images.pexels.com/photos/119435/pexels-photo-119435.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Şık ve estetik görünüm. Kolay montaj, paslanmaz çelik malzeme.', stock: 30 },
    { name: '4K Çift Kameralı Araç İçi Kamera', price: 2500, categorySlug: 'teknoloji', image: 'https://images.pexels.com/photos/4488660/pexels-photo-4488660.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Ön ve arka eş zamanlı kayıt. Gece görüşü ve park modu özellikleri.', stock: 8 },
    { name: 'RGB Uygulama Kontrollü Ambiyans Led', price: 650, categorySlug: 'teknoloji', image: 'https://images.pexels.com/photos/4488656/pexels-photo-4488656.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Telefonunuzdan renk değiştirebileceğiniz iç aydınlatma. Sese duyarlı modlar.', stock: 25 },
    { name: 'Kablosuz Şarjlı Telefon Tutucu', price: 350, categorySlug: 'teknoloji', image: 'https://images.pexels.com/photos/4488651/pexels-photo-4488651.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Hızlı kablosuz şarj ve otomatik kavrama mekanizması.', stock: 40 },
    { name: 'Seramik Katkılı Hızlı Cila 500ml', price: 250, categorySlug: 'bakim', image: 'https://images.pexels.com/photos/5214411/pexels-photo-5214411.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Aracınıza derin bir parlaklık ve su iticilik kazandırır.', stock: 15 },
    { name: 'Cilalı Oto Şampuanı 1 Litre', price: 120, categorySlug: 'bakim', image: 'https://images.pexels.com/photos/4489745/pexels-photo-4489745.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Yıkama esnasında koruyucu bir tabaka oluşturur. Ph dengelidir.', stock: 20 },
    { name: 'Mikrofiber Kurulama Bezi 3\'lü', price: 80, categorySlug: 'bakim', image: 'https://images.pexels.com/photos/4489742/pexels-photo-4489742.jpeg?auto=compress&cs=tinysrgb&w=800', description: 'Yüksek emiş gücü. Aracınızı çizmeden kurular ve hav bırakmaz.', stock: 100 },
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

  const blogPosts = [
    {
      title: "Arabanızın İç Aksesuarlarını Seçerken Dikkat Edilmesi Gerekenler",
      slug: "ic-aksesuar-secim-rehberi",
      excerpt: "Aracınızın iç mekanını daha konforlu ve şık hale getirmek için aksesuar seçerken bilmeniz gereken 5 temel kural.",
      category: "İç Aksesuar",
      image: "https://images.pexels.com/photos/5214413/pexels-photo-5214413.jpeg?auto=compress&cs=tinysrgb&w=800",
      content: `Arabanızın iç mekanı...`
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }

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
