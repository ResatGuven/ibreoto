const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  
  // Clear order items first due to relations
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.slider.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.coupon.deleteMany({});
  await prisma.siteSettings.deleteMany({});

  console.log('Seeding new data for ArıHayat...');

  // Site Settings
  await prisma.siteSettings.create({
    data: {
      id: 'current',
      siteName: 'ARI HAYAT',
      siteDescription: 'Arıdan gelen sağlık',
      contactEmail: 'arihayat.tr@gmail.com',
      contactPhone: '+90 536 341 19 84',
      address: 'Güneştepe, 1. Tuğlalı Sk No:3, 16165 Osmangazi/Bursa',
      whatsappNumber: '905353377251',
      announcementBar: 'Doğal Arı Ürünleri - Üreticiden Kapınıza! 🐝',
      facebookUrl: 'https://www.facebook.com/mehmet.durgut.463347',
      instagramUrl: 'https://www.instagram.com/arihayat.tr/',
      twitterUrl: 'https://www.tiktok.com/@arihayat', // Using TikTok as Twitter alternative if needed
      logoUrl: 'https://arihayat.com/storage/settings/October2023/v0i60uRz2Zz7zX9zXzXz.png',
    }
  });

  // Categories
  const categories = [
    { name: 'Arı Sütü', slug: 'ari-sutu', description: 'Taze ve saf arı sütü çeşitleri.' },
    { name: 'BEŞLİ KARIŞIM', slug: 'besli-karisim', description: 'Özel formüllü beşli karışımlar.' },
    { name: 'Karışım', slug: 'karisim', description: 'Arı ürünü karışımları.' },
    { name: 'Propolis', slug: 'propolis', description: 'Doğal bağışıklık desteği propolis.' },
    { name: 'Polen & Arı Ekmeği', slug: 'polen-ari-ekmegi', description: 'Protein deposu polen ve perga.' },
    { name: 'Bal', slug: 'bal', description: 'Isıl işlem görmemiş ham ballar.' },
    { name: 'Bitkisel Yağlar', slug: 'bitkisel-yaglar', description: 'Doğal soğuk sıkım bitkisel yağlar.' },
    { name: 'Özel Setler', slug: 'ozel-setler', description: 'Avantajlı kombin paketler.' },
  ];

  const createdCategories = {};
  for (const cat of categories) {
    const created = await prisma.category.create({ data: cat });
    createdCategories[cat.slug] = created.id;
  }

  // Products
  const products = [
    // Arı Sütü
    { name: 'Yerli Üretim Arı Sütü 20 gr', slug: 'yerli-ari-sutu-20gr', price: 450, stock: 50, categoryId: createdCategories['ari-sutu'], description: 'Saf taze yerli üretim arı sütü.', images: JSON.stringify(['https://images.unsplash.com/photo-1587049352860-12000d68c937?q=80&w=800']) },
    { name: 'Yerli Üretim Arı Sütü 50 gr', slug: 'yerli-ari-sutu-50gr', price: 950, stock: 30, categoryId: createdCategories['ari-sutu'], description: 'Saf taze yerli üretim arı sütü.', images: JSON.stringify(['https://images.unsplash.com/photo-1587049352860-12000d68c937?q=80&w=800']) },
    
    // Karışım
    { name: 'ARI EKMEKLİ Yetişkin Karışımı 225 gr', slug: 'ari-ekmekli-yetiskin-225gr', price: 550, stock: 40, categoryId: createdCategories['karisim'], description: 'Bal, polen, propolis ve arı sütü karışımı.', images: JSON.stringify(['https://images.unsplash.com/photo-1587049352860-12000d68c937?q=80&w=800']) },
    { name: 'Arı Ekmekli Karışım Kids 225 gr', slug: 'ari-ekmekli-kids-225gr', price: 450, stock: 60, categoryId: createdCategories['besli-karisim'], description: 'Çocuklar için özel formüllü arı ekmekli karışım.', images: JSON.stringify(['https://images.unsplash.com/photo-1587049352860-12000d68c937?q=80&w=800']) },

    // Bal
    { name: 'Çiçek Balı 850 gr', slug: 'cicek-bali-850gr', price: 350, stock: 100, categoryId: createdCategories['bal'], description: 'Doğal süzme çiçek balı.', images: JSON.stringify(['https://images.unsplash.com/photo-1587049352860-12000d68c937?q=80&w=800']) },
    { name: 'Kestane Ihlamur Balı 850 gr', slug: 'kestane-ihlamur-bali-850gr', price: 580, stock: 40, categoryId: createdCategories['bal'], description: 'Karadeniz yöresi kestane ıhlamur balı.', images: JSON.stringify(['https://images.unsplash.com/photo-1587049352860-12000d68c937?q=80&w=800']) },
    
    // Propolis
    { name: 'Propolis 20cc (Zeytin Yağında)', slug: 'propolis-20cc', price: 280, stock: 150, categoryId: createdCategories['propolis'], description: 'Zeytinyağında çözülmüş doğal propolis.', images: JSON.stringify(['https://images.unsplash.com/photo-1587049352860-12000d68c937?q=80&w=800']) },
    
    // Polen & Arı Ekmeği
    { name: 'Yerli Polen 100 gr', slug: 'yerli-polen-100gr', price: 180, stock: 200, categoryId: createdCategories['polen-ari-ekmegi'], description: 'Doğal taze yerli polen.', images: JSON.stringify(['https://images.unsplash.com/photo-1587049352860-12000d68c937?q=80&w=800']) },
    { name: 'Arı Ekmeği / Perga 100 gr', slug: 'ari-ekmegi-perga-100gr', price: 320, stock: 120, categoryId: createdCategories['polen-ari-ekmegi'], description: 'Fermente arı ekmeği (perga).', images: JSON.stringify(['https://images.unsplash.com/photo-1587049352860-12000d68c937?q=80&w=800']) },
  ];

  for (const prod of products) {
    await prisma.product.create({ data: prod });
  }

  // Sliders
  await prisma.slider.create({
    data: {
      title: 'Doğanın Mucizesi: Arı Sütü',
      subtitle: '%100 Saf ve Taze Üretim',
      image: 'https://images.unsplash.com/photo-1587049352860-12000d68c937?q=80&w=1920',
      buttonText: 'İncele',
      buttonLink: '/kategori/ari-sutu',
      order: 1
    }
  });

  // Blog Posts
  await prisma.blogPost.create({
    data: {
      title: 'Gerçek Bal Nasıl Anlaşılır?',
      slug: 'gercek-bal-nasil-anlasilir',
      content: 'Gerçek balı sahtesinden ayırmak için bilmeniz gerekenler...',
      excerpt: 'Bal alırken nelere dikkat etmelisiniz?',
      image: 'https://images.unsplash.com/photo-1587049352860-12000d68c937?q=80&w=800',
      author: 'ArıHayat'
    }
  });

  console.log('Seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
