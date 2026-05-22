const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const ARIHAYAT_CATEGORIES = [
  { slug: 'ari-sutu', name: 'Arı Sütü', description: 'Kendi kovanlarımızdan taze sağım, dondurulmuş saf yerli arı sütü ürünleri.', image: '/images/products/ari-sutu.png' },
  { slug: 'besli-karisim', name: 'Beşli Karışım', description: 'Arı ekmeği ilaveli, beş doğal bileşeni bir arada sunan özel karışımlar.', image: '/images/products/karisim.png' },
  { slug: 'karisim', name: 'Karışım', description: 'Yerli arı sütü, ham bal, Polen ve Propolis karışımı. Çocuk ve yetişkin formülleri.', image: '/images/products/karisim.png' },
  { slug: 'propolis', name: 'Propolis', description: 'Zeytinyağında çözülmüş, alkol içermeyen saf propolis ekstraktı ürünleri.', image: '/images/products/propolis.png' },
  { slug: 'polen-ari-ekmegi', name: 'Polen & Arı Ekmeği', description: 'Katkısız arı ekmeği ve yerli çiçek poleni. Protein ve vitamin deposu.', image: '/images/products/polen.png' },
  { slug: 'bal', name: 'Bal', description: 'Çiçek, çam, kestane, meşe ve orman balı çeşitleri. %100 doğal ve katkısız.', image: '/images/products/bal.png' },
  { slug: 'bitkisel-yaglar', name: 'Bitkisel Yağlar', description: 'Geleneksel yöntemlerle hazırlanan saf bitkisel yağlar.', image: '/images/products/karisim.png' },
];

const ARIHAYAT_PRODUCTS = [
  { name: 'Çiçek Balı 400 gr', slug: 'cicek-bali-400-gr', price: 300, originalPrice: null, category: 'bal', image: '/images/products/bal.png', description: 'Doğanın en taze çiçeklerinden toplanan %100 saf çiçek balı. 400 gr.', stock: 50, isFreeShipping: false, isNew: false },
  { name: 'Çiçek Balı 850 gr', slug: 'cicek-bali-850-gr', price: 600, originalPrice: null, category: 'bal', image: '/images/products/bal.png', description: 'Doğanın en taze çiçeklerinden toplanan %100 saf çiçek balı. 850 gr.', stock: 40, isFreeShipping: false, isNew: false },
  { name: 'Çiçek Balı 5 kg', slug: 'cicek-bali-5-kg', price: 3500, originalPrice: null, category: 'bal', image: '/images/products/bal.png', description: 'Ailecek kullanım için ekonomik boy. %100 doğal çiçek balı. 5 kg.', stock: 20, isFreeShipping: true, isNew: false },
  { name: 'Çam Balı 400 gr', slug: 'cam-bali-400-gr', price: 350, originalPrice: null, category: 'bal', image: '/images/products/bal.png', description: 'Ege ormanlarının kıymetli çam balı. Koyu rengi ve kendine has aromasıyla. 400 gr.', stock: 35, isFreeShipping: false, isNew: false },
  { name: 'Çam Balı 850 gr', slug: 'cam-bali-850-gr', price: 700, originalPrice: null, category: 'bal', image: '/images/products/bal.png', description: 'Ege ormanlarının kıymetli çam balı. Koyu rengi ve kendine has aromasıyla. 850 gr.', stock: 30, isFreeShipping: false, isNew: false },
  { name: 'Kestane Ihlamur Balı 400 gr', slug: 'kestane-ihlamur-bali-400-gr', price: 740, originalPrice: null, category: 'bal', image: '/images/products/bal.png', description: 'Kestane ve ihlamur çiçeklerinin eşsiz harmanı. Güçlü antioksidan içeriği. 400 gr.', stock: 25, isFreeShipping: false, isNew: false },
  { name: 'Kestane Ihlamur Balı 850 gr', slug: 'kestane-ihlamur-bali-850-gr', price: 1480, originalPrice: null, category: 'bal', image: '/images/products/bal.png', description: 'Kestane ve ihlamur çiçeklerinin eşsiz harmanı. Güçlü antioksidan içeriği. 850 gr.', stock: 20, isFreeShipping: true, isNew: false },
  { name: 'Meşe Balı 400 gr', slug: 'mese-bali-400-gr', price: 480, originalPrice: null, category: 'bal', image: '/images/products/bal.png', description: 'Nadir ve değerli meşe balı. Koyu rengi ve yoğun aromasıyla özel bir tat. 400 gr.', stock: 15, isFreeShipping: false, isNew: false },
  { name: 'Orman Balı 400 gr', slug: 'orman-bali-400-gr', price: 425, originalPrice: null, category: 'bal', image: '/images/products/bal.png', description: 'Orman florası zenginliğini taşıyan çok çiçekli bal. 400 gr.', stock: 0, isFreeShipping: false, isNew: false },
  { name: 'Doğal Orman Balı 850 gr', slug: 'dogal-orman-bali-850-gr', price: 850, originalPrice: null, category: 'bal', image: '/images/products/bal.png', description: 'Üreticiden saf orman balı. Doğanın tüm şifasını içinde barındırır. 850 gr.', stock: 0, isFreeShipping: false, isNew: false },
  { name: 'Arı Hayat Krem Bal 400 gr', slug: 'krem-bal-400-gr', price: 350, originalPrice: null, category: 'bal', image: '/images/products/bal.png', description: 'Pürüzsüz kıvamı ve zengin aromasıyla doğallığın krem hali. 400 gr.', stock: 45, isFreeShipping: false, isNew: true },
  
  { name: 'Arı Sütü Yerli Üretim 100 gr', slug: 'ari-sutu-yerli-uretim-100-gr', price: 4000, originalPrice: null, category: 'ari-sutu', image: '/images/products/ari-sutu.png', description: 'Kendi kovanlarımızdan taze sağım, dondurulmuş saf yerli arı sütü. 100 gr.', stock: 30, isFreeShipping: true, isNew: false },
  { name: 'Arı Sütü Yerli Üretim 50 gr', slug: 'ari-sutu-yerli-uretim-50-gr', price: 2000, originalPrice: null, category: 'ari-sutu', image: '/images/products/ari-sutu.png', description: 'Kendi kovanlarımızdan taze sağım, dondurulmuş saf yerli arı sütü. 50 gr.', stock: 40, isFreeShipping: true, isNew: false },
  { name: 'Doğal Arı Sütü 40 gr | Taze & Yerli Üretim', slug: 'dogal-ari-sutu-40-gr', price: 1600, originalPrice: 1800, category: 'ari-sutu', image: '/images/products/ari-sutu.png', description: 'Taze ve yerli üretim doğal arı sütü. Bağışıklık sistemi için güçlü destek. 40 gr.', stock: 35, isFreeShipping: true, isNew: false },
  { name: 'Yerli Arı Sütü 20 gr', slug: 'yerli-ari-sutu-20-gr', price: 800, originalPrice: 900, category: 'ari-sutu', image: '/images/products/ari-sutu.png', description: 'Başlangıç dozu için ideal. Kendi kovanlarımızdan elde edilen saf yerli arı sütü. 20 gr.', stock: 50, isFreeShipping: false, isNew: false },
  
  { name: 'Zeytinyağlı Propolis 50 ml', slug: 'zeytinyagli-propolis-50-ml', price: 350, originalPrice: 400, category: 'propolis', image: '/images/products/propolis.png', description: 'Alkol içermeyen, soğuk sıkım zeytinyağında çözülmüş saf propolis ekstraktı. 50 ml.', stock: 60, isFreeShipping: false, isNew: false },
  { name: 'Propolis 20cc Zeytinyağında Çözülmüş', slug: 'propolis-20cc-zeytinyaginda', price: 175, originalPrice: 200, category: 'propolis', image: '/images/products/propolis.png', description: 'Zeytinyağında çözülmüş saf propolis. Yüksek emilim ve doğal içerik. 20 cc.', stock: 70, isFreeShipping: false, isNew: true },
  
  { name: 'Karışım Kids 225 gr', slug: 'karisim-kids-225-gr', price: 420, originalPrice: null, category: 'karisim', image: '/images/products/karisim.png', description: 'Çocuklar için özel formül. Yerli arı sütü, ham bal, polen ve propolis. 225 gr.', stock: 45, isFreeShipping: false, isNew: false },
  { name: 'Karışım Kids 400 gr', slug: 'karisim-kids-400-gr', price: 650, originalPrice: 710, category: 'karisim', image: '/images/products/karisim.png', description: 'Çocuklar için özel formül. Yerli arı sütü, ham bal, polen ve propolis. 400 gr.', stock: 40, isFreeShipping: false, isNew: false },
  { name: 'Karışım Kids 850 gr', slug: 'karisim-kids-850-gr', price: 1350, originalPrice: 1420, category: 'karisim', image: '/images/products/karisim.png', description: 'Çocuklar için özel formül. Yerli arı sütü, ham bal, polen ve propolis. 850 gr.', stock: 30, isFreeShipping: true, isNew: false },
  { name: 'Yetişkin Karışım 225 gr', slug: 'yetiskin-karisim-225-gr', price: 710, originalPrice: null, category: 'karisim', image: '/images/products/karisim.png', description: 'Yetişkinler için özel formül. Yerli ham bal, arı sütü, polen ve propolis. 225 gr.', stock: 40, isFreeShipping: false, isNew: false },
  { name: 'Yetişkin Karışım 400 gr', slug: 'yetiskin-karisim-400-gr', price: 1100, originalPrice: 1165, category: 'karisim', image: '/images/products/karisim.png', description: 'Yetişkinler için özel formül. Yerli ham bal, arı sütü, polen ve propolis. 400 gr.', stock: 35, isFreeShipping: false, isNew: false },
  { name: '850 gr Yetişkin Yerli Ham Bal, Polen, Arı Sütü ve Propolis Karışımı', slug: 'yetiskin-karisim-850-gr-tam', price: 2200, originalPrice: 2330, category: 'karisim', image: '/images/products/karisim.png', description: 'Tam içerikli yetişkin karışımı. Yerli ham bal, arı sütü, polen ve propolis. 850 gr.', stock: 25, isFreeShipping: true, isNew: false },
  { name: 'Yetişkin Karışım 850 gr + Propolis 50cc Zeytinyağında', slug: 'yetiskin-karisim-850-gr-propolis', price: 2500, originalPrice: 2700, category: 'karisim', image: '/images/products/karisim.png', description: 'Yetişkin karışımı + zeytinyağlı propolis hediye. Tam bağışıklık desteği paketi. 850 gr.', stock: 20, isFreeShipping: true, isNew: false },
  { name: 'Yetişkin Karışım 225 gr + 2 adet Propolis 50cc', slug: 'yetiskin-karisim-225-gr-propolis-2x', price: 1310, originalPrice: 1450, category: 'karisim', image: '/images/products/karisim.png', description: 'Yetişkin karışımı + 2 adet zeytinyağlı propolis. Avantajlı paket.', stock: 20, isFreeShipping: false, isNew: true },
  { name: 'Karışım Kids 850 gr + Propolis 50cc Zeytinyağında', slug: 'karisim-kids-850-gr-propolis', price: 1650, originalPrice: 1790, category: 'karisim', image: '/images/products/karisim.png', description: 'Çocuk karışımı + zeytinyağlı propolis. Çocuklar için tam koruma paketi.', stock: 25, isFreeShipping: true, isNew: true },
  
  { name: 'ARI EKMEKLİ 225 gr Yetişkin Karışımı', slug: 'ari-ekmekli-225-gr-yetiskin', price: 730, originalPrice: null, category: 'besli-karisim', image: '/images/products/karisim.png', description: 'Arı ekmeği (perga) ilaveli yetişkin karışımı. Bal, arı sütü, polen, propolis + arı ekmeği. 225 gr.', stock: 30, isFreeShipping: false, isNew: false },
  { name: 'ARI EKMEKLİ 400 gr Yetişkin Karışımı', slug: 'ari-ekmekli-400-gr-yetiskin', price: 1200, originalPrice: null, category: 'besli-karisim', image: '/images/products/karisim.png', description: 'Arı ekmeği (perga) ilaveli yetişkin karışımı. Bal, arı sütü, polen, propolis + arı ekmeği. 400 gr.', stock: 25, isFreeShipping: false, isNew: false },
  { name: 'ARI EKMEKLİ 850 gr Yetişkin Karışımı', slug: 'ari-ekmekli-850-gr-yetiskin', price: 2400, originalPrice: null, category: 'besli-karisim', image: '/images/products/karisim.png', description: 'Arı ekmeği (perga) ilaveli yetişkin karışımı. Bal, arı sütü, polen, propolis + arı ekmeği. 850 gr.', stock: 20, isFreeShipping: true, isNew: false },
  { name: 'ARI EKMEKLİ Karışım Kids 225 gr', slug: 'ari-ekmekli-karisim-kids-225-gr', price: 440, originalPrice: null, category: 'besli-karisim', image: '/images/products/karisim.png', description: 'Arı ekmeği ilaveli çocuk karışımı. Doğal beş bileşen bir arada. 225 gr.', stock: 30, isFreeShipping: false, isNew: false },
  { name: 'ARI EKMEKLİ Karışım Kids 400 gr', slug: 'ari-ekmekli-karisim-kids-400-gr', price: 770, originalPrice: null, category: 'besli-karisim', image: '/images/products/karisim.png', description: 'Arı ekmeği ilaveli çocuk karışımı. Doğal beş bileşen bir arada. 400 gr.', stock: 25, isFreeShipping: false, isNew: false },
  { name: 'ARI EKMEKLİ Karışım Kids 850 gr', slug: 'ari-ekmekli-karisim-kids-850-gr', price: 1550, originalPrice: null, category: 'besli-karisim', image: '/images/products/karisim.png', description: 'Arı ekmeği ilaveli çocuk karışımı. Doğal beş bileşen bir arada. 850 gr.', stock: 20, isFreeShipping: true, isNew: false },
  
  { name: 'Arı Ekmeği 100 gr', slug: 'ari-ekmegi-100-gr', price: 450, originalPrice: null, category: 'polen-ari-ekmegi', image: '/images/products/polen.png', description: 'İşçi arıların fermente ettiği protein ve vitamin deposu arı ekmeği (perga). 100 gr.', stock: 40, isFreeShipping: false, isNew: false },
  { name: 'Yerli Polen 100 gr', slug: 'yerli-polen-100-gr', price: 150, originalPrice: 175, category: 'polen-ari-ekmegi', image: '/images/products/polen.png', description: 'Yerli üretim taze çiçek poleni. Renk renk granüller, doğal enerji kaynağı. 100 gr.', stock: 55, isFreeShipping: false, isNew: false },
  
  { name: '100 ml Kantaron Yağı', slug: 'kantaron-yagi-100-ml', price: 155, originalPrice: null, category: 'bitkisel-yaglar', image: '/images/products/karisim.png', description: 'Geleneksel yöntemlerle hazırlanmış saf kantaron (sarı kantaron) yağı. 100 ml.', stock: 35, isFreeShipping: false, isNew: false },
];

const ARIHAYAT_SITE_INFO = {
  name: 'Arı Hayat',
  description: 'Kendi arılıklarımızdan ürettiğimiz %100 doğal arı sütü, bal, propolis ve karışım ürünleri. Üreticiden tüketiciye doğrudan satış.',
  phone: '0536 341 19 84',
  whatsapp: '905353377251',
  email: 'destek@arihayat.com',
  address: 'Bursa, Türkiye',
  instagram: 'https://www.instagram.com/arihayat',
  logoUrl: '/images/logo.png',
  announcementBar: '🐝 Ücretsiz Kargo: 1.500 TL ve Üzeri Alışverişlerde! Doğal ürünler, güvenilir teslimat.',
};

async function main() {
  console.log('🧹 Cleaning database for Arı Hayat...');
  
  await prisma.slider.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.orderItem.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.siteSettings.deleteMany({});
  
  console.log('✅ Database cleaned. Seeding categories...');

  // 1. Categories
  for (const cat of ARIHAYAT_CATEGORIES) {
    await prisma.category.create({
      data: {
        name: cat.name,
        slug: cat.slug,
        image: cat.image,
        description: cat.description,
      }
    });
  }
  console.log('✅ Categories seeded.');

  const seededCategories = await prisma.category.findMany();
  const categoryMap = new Map();
  seededCategories.forEach((c) => {
    categoryMap.set(c.slug, c.id);
  });

  console.log('📦 Seeding products...');

  // 2. Products
  for (const prod of ARIHAYAT_PRODUCTS) {
    const categoryId = categoryMap.get(prod.category);
    if (!categoryId) {
      console.warn(`Category slug "${prod.category}" not found for product "${prod.name}". Skipping.`);
      continue;
    }

    await prisma.product.create({
      data: {
        name: prod.name,
        slug: prod.slug,
        price: prod.price,
        oldPrice: prod.originalPrice,
        stock: prod.stock,
        images: JSON.stringify([prod.image]),
        description: prod.description,
        categoryId: categoryId,
        isFreeShipping: prod.isFreeShipping,
        isNew: prod.isNew,
      }
    });
  }
  console.log('✅ Products seeded.');

  // 3. Site Settings
  await prisma.siteSettings.create({
    data: {
      id: 'current',
      siteName: ARIHAYAT_SITE_INFO.name,
      siteDescription: ARIHAYAT_SITE_INFO.description,
      contactEmail: ARIHAYAT_SITE_INFO.email,
      contactPhone: ARIHAYAT_SITE_INFO.phone,
      whatsappNumber: ARIHAYAT_SITE_INFO.whatsapp,
      address: ARIHAYAT_SITE_INFO.address,
      logoUrl: ARIHAYAT_SITE_INFO.logoUrl,
      announcementBar: ARIHAYAT_SITE_INFO.announcementBar,
      instagramUrl: ARIHAYAT_SITE_INFO.instagram,
    },
  });
  console.log('✅ Site settings seeded.');

  // 4. Admin User
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
  console.log('✅ Admin user seeded.');

  // 5. Sliders
  const sliders = [
    {
      title: "DOĞAL VE HAKİKİ ARI ÜRÜNLERİ",
      subtitle: "Yüksek Yaylaların Saf Şifası Sofranızda",
      image: "/images/hero-1.webp",
      buttonText: "Ürünleri Keşfet",
      buttonLink: "/urunler",
      order: 1
    },
    {
      title: "%100 SAF YERLİ ARI SÜTÜ",
      subtitle: "Bağışıklığınız İçin Kovanlarımızdan Taze Sağım",
      image: "/images/hero-2.webp",
      buttonText: "Arı Sütü Ürünleri",
      buttonLink: "/urunler?category=ari-sutu",
      order: 2
    }
  ];

  for (const slider of sliders) {
    await prisma.slider.create({ data: slider });
  }
  console.log('✅ Sliders seeded.');

  // 6. Coupons
  console.log('🎫 Seeding coupons...');
  await prisma.coupon.deleteMany({});
  await prisma.coupon.createMany({
    data: [
      {
        code: 'UYE10',
        discount: 10,
        type: 'percentage',
        expiry: new Date('2030-12-31'),
        isActive: true
      },
      {
        code: 'ŞİFA10',
        discount: 10,
        type: 'percentage',
        expiry: new Date('2030-12-31'),
        isActive: true
      },
      {
        code: 'KIS-SIFASI',
        discount: 15,
        type: 'percentage',
        expiry: new Date('2030-12-31'),
        isActive: true
      }
    ]
  });
  console.log('✅ Coupons seeded.');

  // 7. Blog Posts
  console.log('📝 Seeding blog posts...');
  await prisma.blogPost.deleteMany({});
  
  const blogPosts = [
    {
      title: 'Doğal Balın Faydaları Nelerdir?',
      slug: 'dogal-balin-faydalari',
      content: '<p>Doğal bal, asırlardır şifa kaynağı olarak kullanılmaktadır. Antioksidan özelliği yüksek olan bal, bağışıklık sistemini destekler ve enerji verir. Özellikle sabahları ılık suyla tüketildiğinde güne zinde başlamanızı sağlar.</p><p>Arı Hayat olarak, kovanlarımızdan sofralarınıza en saf haliyle ulaştırdığımız doğal ballarımız, hiçbir ısıl işlem görmeden kavanozlanmaktadır. Gerçek doğal balın kristalize olabileceğini (donabileceğini) ve bunun balın saflığının bir göstergesi olduğunu unutmayın.</p>',
      excerpt: 'Doğal balın sağlık üzerindeki mucizevi etkileri ve doğru tüketim yöntemleri hakkında bilmeniz gereken her şey.',
      image: '/images/products/bal.png',
      author: 'Arı Hayat',
      category: 'Rehber',
      published: true
    },
    {
      title: 'Propolis Nedir ve Nasıl Kullanılır?',
      slug: 'propolis-nedir',
      content: '<p>Propolis, arıların bitki tomurcuklarından ve özsularından topladığı, kovanı dış etkenlerden ve mikroorganizmalardan korumak için ürettiği doğal bir arı ürünüdür. Arıların doğal antibiyotiği olarak da bilinir.</p><p>Suda veya yağda çözünen propolis damlalarımızı günlük sıvı tüketiminize damlatarak kullanabilirsiniz. Bağışıklık sistemini güçlendirme ve hastalıklara karşı direnç sağlama konusunda doğanın bize sunduğu en değerli hediyelerden biridir.</p>',
      excerpt: 'Doğal antibiyotik propolisin elde edilişi, faydaları ve günlük rutininize nasıl entegre edebileceğiniz hakkında rehber.',
      image: '/images/products/propolis.png',
      author: 'Arı Hayat',
      category: 'Sağlık',
      published: true
    },
    {
      title: 'Polen ve Arı Ekmeği (Perga) Farkı',
      slug: 'polen-ve-ari-ekmegi-farki',
      content: '<p>Polen, bitkilerin üreme hücresidir ve arıların temel protein kaynağıdır. Arı ekmeği (perga) ise arıların topladığı bu poleni kendi enzimleriyle mayalayarak petek gözlerinde depolamasıyla oluşur.</p><p>Arı ekmeği, polenin fermente olmuş hali olduğu için insan vücudu tarafından sindirimi çok daha kolaydır ve vitamin değerleri daha yüksektir. Günlük B vitamini ihtiyacınızı karşılamak için sabah kahvaltılarında yoğurt veya süt ile tüketebilirsiniz.</p>',
      excerpt: 'Polen mi, arı ekmeği mi? Besin değerleri, farklılıkları ve en sağlıklı tüketim yöntemleri.',
      image: '/images/products/polen.png',
      author: 'Arı Hayat',
      category: 'Beslenme',
      published: true
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.create({ data: post });
  }
  console.log('✅ Blog posts seeded.');

  console.log('🚀 STANDALONE SEED COMPLETED SUCCESSFULLY!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
