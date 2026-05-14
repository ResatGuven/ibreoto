const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing existing data...');
  
  // Clear data
  await prisma.orderItem.deleteMany({});
  await prisma.order.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.slider.deleteMany({});
  await prisma.blogPost.deleteMany({});
  await prisma.coupon.deleteMany({});
  await prisma.siteSettings.deleteMany({});

  console.log('Seeding ArıHayat Full Catalog...');

  // 1. Site Settings
  await prisma.siteSettings.create({
    data: {
      id: 'current',
      siteName: 'ARI HAYAT',
      siteDescription: 'Doğanın Kalbinden Gelen Şifa',
      contactEmail: 'arihayat.tr@gmail.com',
      contactPhone: '+90 536 341 19 84',
      address: 'Güneştepe, 1. Tuğlalı Sk No:3, 16165 Osmangazi/Bursa',
      whatsappNumber: '905353377251',
      announcementBar: 'Doğal Arı Ürünleri - Üreticiden Kapınıza! Ücretsiz Kargo Fırsatını Kaçırmayın! 🐝',
      facebookUrl: 'https://www.facebook.com/mehmet.durgut.463347',
      instagramUrl: 'https://www.instagram.com/arihayat.tr/',
      twitterUrl: 'https://www.tiktok.com/@arihayat',
      logoUrl: '/images/logo.png',
    }
  });

  // 2. Categories
  const categoriesData = [
    { name: 'Arı Sütü', slug: 'ari-sutu', description: 'Taze, yerli ve %100 saf arı sütü çeşitleri.' },
    { name: 'Karışım', slug: 'karisim', description: 'Bal, polen, propolis ve arı sütü içeren özel karışımlar.' },
    { name: 'Beşli Karışım', slug: 'besli-karisim', description: 'Güçlü formüllü beşli arı ürünü karışımları.' },
    { name: 'Propolis', slug: 'propolis', description: 'Doğal bağışıklık desteği sıvı ve ham propolis.' },
    { name: 'Polen & Arı Ekmeği', slug: 'polen-ari-ekmegi', description: 'Doğal protein ve vitamin deposu polen ve perga.' },
    { name: 'Bal', slug: 'bal', description: 'Isıl işlem görmemiş, ham ve doğal bal çeşitleri.' },
    { name: 'Bitkisel Yağlar', slug: 'bitkisel-yaglar', description: 'Doğal soğuk sıkım bitkisel yağ çeşitleri.' },
    { name: 'Özel Setler', slug: 'ozel-setler', description: 'Avantajlı paketler ve diğer arı ürünleri.' },
  ];

  const categoryMap = {};
  for (const cat of categoriesData) {
    const created = await prisma.category.create({ data: cat });
    categoryMap[cat.slug] = created.id;
  }

  // Helper to generate descriptions (300-500 words)
  const generateDescription = (type, name, gramaj) => {
    const base = `**${name}** — Doğanın kalbinden, arıların titiz çalışmasıyla elde edilen eşsiz bir şifa kaynağıdır. ARI HAYAT olarak, geleneksel arıcılık yöntemlerini modern standartlarla birleştirerek, en saf ve en doğal haliyle bu mucizevi ürünü sizlere sunuyoruz. Bu ürün, ${gramaj} ambalajında, doğallığı korunarak özenle paketlenmiştir.`;
    
    const details = {
      'ari-sutu': `
Arı sütü, işçi arıların yutak üstü salgı bezlerinden salgıladıkları, kraliçe arının ve larva halindeki arıların beslenmesinde kullanılan son derece değerli bir besindir. ARI HAYAT Arı Sütü, tamamen yerli üretim olup, hasat edildiği andan itibaren soğuk zincir bozulmadan muhafaza edilir. İçeriğindeki 10-HDA, amino asitler ve vitaminler sayesinde vücudun ihtiyaç duyduğu pek çok bileşeni doğal yollarla sağlar.

**Ürün Özellikleri:**
- %100 doğal, katkısız ve ısıl işlem görmemiş
- Yerli arılıklardan elde edilmiş, taze üretim
- ${gramaj} pratik ambalajda, buzdolabında uzun süre taze kalır
- Zengin protein, vitamin (B5, B6) ve amino asit içeriği
- Hasat sonrası en kısa sürede paketlenerek gönderilir
- Katkı maddesi, koruyucu veya tatlandırıcı içermez

**Nasıl Tüketilir?**
Arı sütü, sabah aç karnına bir kaşık (yaklaşık 5-10 gr) olarak tüketilmesi önerilir. Metal kaşık yerine tahta veya plastik kaşık kullanımı tavsiye edilir. Balın altına yerleştirerek veya direkt dil altına alınarak kullanılabilir. Tadı kendine has ve keskin olduğu için ilk kez tüketecek olanlar bal ile karıştırarak tüketebilirler.

**Saklama Koşulları:**
Arı sütü canlı bir üründür ve ısıya karşı hassastır. Ürünü teslim aldığınızda mutlaka buzdolabında (-4°C ile +4°C arası) saklayınız. Uzun süreli saklama için dondurucu tercih edilebilir. Güneş ışığına doğrudan maruz bırakmayınız.

**Neden ARI HAYAT Arı Sütünü Tercih Etmelisiniz?**
Kendi arılıklarımızda, doğanın kucağında üretilen bu kıymetli ürünü, hiçbir aracı olmadan doğrudan sizlere ulaştırıyoruz. Üreticiden tüketiciye direkt satış prensibimiz sayesinde tazelikten ödün vermiyor, doğallığı garanti ediyoruz. Her bir gramında doğanın emeğini ve bizim titizliğimizi hissedeceksiniz.
      `,
      'bal': `
Ham bal, kovandan çıktığı andaki besin değerlerini koruyan, pastörize edilmemiş ve filtre edilmemiş bal demektir. ARI HAYAT ${name}, ısıl işlem görmediği için içindeki enzimler, polenler ve yararlı bileşenler korunur. Bu sayede sadece bir tatlandırıcı değil, gerçek bir şifa deposu olarak sofralarınızda yer alır.

**Ürün Özellikleri:**
- Ham bal: pastörize edilmemiş, ısıl işlem görmemiş
- Flora zenginliği yüksek bölgelerden elde edilmiştir
- Doğal kristallenme normaldir — kalite düşüklüğü değil, saflığın göstergesidir
- Katkı maddesi, şeker veya tatlandırıcı içermez
- Geleneksel hasat yöntemleriyle elde edilmiştir
- ${gramaj} cam kavanozda, uzun raf ömrüyle

**Kullanım Önerileri:**
Kahvaltıda, çayın içinde veya doğrudan tüketilebilir. Sıcak içeceklere eklendiğinde besin değerlerini kaybetmemesi için içeceğin sıcaklığının 40°C'yi geçmemesine dikkat edilmelidir. Güne zinde başlamak için bir bardak ılık suyun içine bir tatlı kaşığı ekleyerek tüketebilirsiniz.

**Saklama:**
Serin, kuru ve güneş görmeyen bir ortamda saklayın. Balın doğal yapısı gereği buzdolabına koymanıza gerek yoktur, ancak serin bir yer tercih edilmelidir. Kavanoz ağzı her kullanımdan sonra sıkıca kapatılmalıdır.

**Neden ARI HAYAT Balı?**
Bizim ballarımızda sadece arıların topladığı özler vardır. Hiçbir kimyasal işlem, şeker takviyesi veya yapay aroma içermez. Analizleri yapılmış, güvenle tüketebileceğiniz gerçek Anadolu balını sizin için paketliyoruz.
      `,
      'propolis': `
Propolis, arıların bitki tomurcuklarından ve reçinelerinden topladıkları, kovanı dış etkenlerden, mikroplardan korumak için kullandıkları doğal bir maddedir. Zeytinyağlı propolisimiz, ham propolisin en doğal çözücü olan sızma zeytinyağı içinde uzun süre bekletilerek özünün çıkarılmasıyla elde edilir. Alkol içermemesi sebebiyle her yaştan kullanıcı için uygundur.

**Ürün Özellikleri:**
- Yalnızca ham propolis + saf zeytinyağı — başka hiçbir katkı yok
- Alkol içermez (zeytinyağı bazlı, mide dostu)
- Kendi arılığımızdan elde edilen yüksek kaliteli ham propolis kullanılmıştır
- ${gramaj} damlalıklı şişede, pratik kullanım
- Geleneksel yöntemle, sabırla hazırlanmıştır

**Kullanım:**
Yetişkinler için günde 10-20 damla, çocuklar için 5-10 damla arası tüketilmesi önerilir. Bir dilim ekmeğin üzerine damlatılarak, bala karıştırılarak veya doğrudan ağıza damlatılarak kullanılabilir.

**Saklama:**
Serin, karanlık bir ortamda, ağzı kapalı şekilde saklayın. Buzdolabına koymanıza gerek yoktur, ancak güneş ışığından korumak ürünün etkisini koruması açısından kritiktir.
      `,
      'karisim': `
Bu özel karışım, arı kolonisinin en güçlü bileşenlerini bir araya getirerek günlük enerji ve bağışıklık desteği sunar. Balın koruyucu gücü, arı sütünün zenginliği ve propolisin kalkan etkisi bu kavanozda buluşuyor. Her kaşıkta doğanın sinerjisini hissedeceksiniz.

**İçerik:**
- Ham bal (ısıl işlem görmemiş)
- Taze arı sütü
- Zeytinyağında çözünmüş propolis
- [Ürüne göre] Polen ve Arı Ekmeği (Perga)
- Katkı maddesi yok, şeker yok, koruyucu yok

**Ürün Özellikleri:**
- Kullanım amacına özel (Yetişkin/Çocuk) hassas oran ayarlaması
- Tüm malzemeler kontrollü ve yerli üretimdir
- ${gramaj} ambalajında, pratik kullanım
- Hasat sonrası tazeliğini koruyacak şekilde hazırlanır

**Kullanım:**
Yetişkinler için günde 1 tatlı kaşığı, çocuklar için yarım tatlı kaşığı sabahları aç karnına tüketilmesi tavsiye edilir. Düzenli kullanımda etkisi çok daha net görülür.

**Saklama:**
Karışım canlı bileşenler içerdiği için mutlaka buzdolabında muhafaza edilmelidir (+4°C). Açıldıktan sonra besin değerlerini en üst seviyede tutmak için 3 ay içinde tüketilmesi önerilir.
      `
    };

    const section = details[type] || details['bal']; // Default to bal if type not found
    return base + section;
  };

  // 3. Products
  const productsData = [
    // ARİ SÜTÜ
    { name: 'Arı Sütü Yerli Üretim 100 gr', slug: 'ari-sutu-yerli-uretim-100-gr', price: 4000, stock: 20, categorySlug: 'ari-sutu', images: ['/images/products/ari-sutu/ari-sutu-100gr-main.webp'] },
    { name: 'Arı Sütü Yerli Üretim 50 gr', slug: 'ari-sutu-yerli-uretim-50-gr', price: 2000, stock: 35, categorySlug: 'ari-sutu', images: ['/images/products/ari-sutu/ari-sutu-50gr-main.webp'] },
    { name: 'Doğal Arı Sütü 40 g', slug: 'dogal-ari-sutu-40-g', price: 1600, oldPrice: 1800, stock: 40, categorySlug: 'ari-sutu', images: ['/images/products/ari-sutu/ari-sutu-40gr-main.webp'], isFreeShipping: true },
    { name: 'Yerli Arı Sütü 20 gram', slug: 'yerli-ari-sutu-20-gram', price: 800, oldPrice: 900, stock: 50, categorySlug: 'ari-sutu', images: ['/images/products/ari-sutu/ari-sutu-20gr-main.webp'] },

    // KARIŞIM
    { name: 'Yetişkin Karışım 225 gr', slug: 'yetiskin-karisim-225-gr', price: 550, stock: 60, categorySlug: 'karisim', images: ['/images/products/karisim/yetiskin-karisim-225gr.webp'] },
    { name: 'Yetişkin Karışım 400 gr', slug: 'yetiskin-karisim-400-gr', price: 950, stock: 45, categorySlug: 'karisim', images: ['/images/products/karisim/yetiskin-karisim-400gr.webp'] },
    { name: 'Yetişkin Karışım 850 gr', slug: 'yetiskin-karisim-850-gr', price: 1850, stock: 30, categorySlug: 'karisim', images: ['/images/products/karisim/yetiskin-karisim-850gr.webp'], isFreeShipping: true },
    { name: 'Karışım Kids 225 gr', slug: 'karisim-kids-225-gr', price: 420, stock: 70, categorySlug: 'karisim', images: ['/images/products/karisim/karisim-kids-225gr.webp'] },
    { name: 'Karışım Kids 400 gr', slug: 'karisim-kids-400-gr', price: 650, stock: 55, categorySlug: 'karisim', images: ['/images/products/karisim/karisim-kids-400gr.webp'] },
    { name: 'Karışım Kids 850 gr', slug: 'karisim-kids-850-gr', price: 1350, stock: 40, categorySlug: 'karisim', images: ['/images/products/karisim/karisim-kids-850gr.webp'], isFreeShipping: true },
    { name: 'ARI EKMEKLİ Karışım Kids 225 gr', slug: 'ari-ekmekli-karisim-kids-225-gr', price: 580, stock: 50, categorySlug: 'karisim', images: ['/images/products/karisim/ari-ekmekli-kids-225gr.webp'] },
    { name: 'ARI EKMEKLİ Karışım Kids 400 gr', slug: 'ari-ekmekli-karisim-kids-400-gr', price: 890, stock: 40, categorySlug: 'karisim', images: ['/images/products/karisim/ari-ekmekli-kids-400gr.webp'] },
    { name: 'ARI EKMEKLİ Karışım Kids 850 gr', slug: 'ari-ekmekli-karisim-kids-850-gr', price: 1650, stock: 25, categorySlug: 'karisim', images: ['/images/products/karisim/ari-ekmekli-kids-850gr.webp'], isFreeShipping: true },
    { name: 'ARI EKMEKLİ Yetişkin Karışım 225 gr', slug: 'ari-ekmekli-yetiskin-karisim-225-gr', price: 680, stock: 45, categorySlug: 'karisim', images: ['/images/products/karisim/ari-ekmekli-yetiskin-225gr.webp'] },
    { name: 'ARI EKMEKLİ Yetişkin Karışım 400 gr', slug: 'ari-ekmekli-yetiskin-karisim-400-gr', price: 1150, stock: 35, categorySlug: 'karisim', images: ['/images/products/karisim/ari-ekmekli-yetiskin-400gr.webp'] },
    { name: 'ARI EKMEKLİ Yetişkin Karışım 850 gr', slug: 'ari-ekmekli-yetiskin-karisim-850-gr', price: 2150, stock: 20, categorySlug: 'karisim', images: ['/images/products/karisim/ari-ekmekli-yetiskin-850gr.webp'], isFreeShipping: true },

    // BEŞLİ KARIŞIM
    { name: '850 g Yetişkin Tipi Beşli Karışım', slug: '850g-yetiskin-tipi-besli-karisim', price: 2450, stock: 15, categorySlug: 'besli-karisim', images: ['/images/products/karisim/besli-karisim-850gr.webp'], isFreeShipping: true },
    { name: 'Yetişkin Karışım 850 gr + Propolis 50cc', slug: 'yetiskin-karisim-850gr-propolis-50cc', price: 2150, oldPrice: 2350, stock: 25, categorySlug: 'besli-karisim', images: ['/images/products/karisim/karisim-propolis-set.webp'], isFreeShipping: true },
    { name: 'Yetişkin Karışım 225 gr + 2 Propolis 50cc', slug: 'yetiskin-karisim-225gr-2-propolis-50cc', price: 1310, oldPrice: 1450, stock: 30, categorySlug: 'besli-karisim', images: ['/images/products/karisim/karisim-2propolis-set.webp'], isFreeShipping: true },
    { name: 'Karışım Kids 850 gr + Propolis 50cc', slug: 'karisim-kids-850gr-propolis-50cc', price: 1650, oldPrice: 1850, stock: 20, categorySlug: 'besli-karisim', images: ['/images/products/karisim/kids-karisim-propolis-set.webp'], isFreeShipping: true },

    // PROPOLİS
    { name: 'Zeytinyağlı Propolis 50 ml', slug: 'zeytinyagli-propolis-50-ml', price: 350, oldPrice: 400, stock: 100, categorySlug: 'propolis', images: ['/images/products/propolis/propolis-50ml.webp'] },
    { name: 'Propolis 20cc Zeytinyağında', slug: 'propolis-20cc-zeytinyağinda', price: 180, stock: 150, categorySlug: 'propolis', images: ['/images/products/propolis/propolis-20cc.webp'] },

    // POLEN & ARI EKMEĞİ
    { name: 'Yerli Polen 100 g', slug: 'yerli-polen-100-g', price: 220, stock: 80, categorySlug: 'polen-ari-ekmegi', images: ['/images/products/polen/polen-100gr.webp'] },
    { name: 'Arı Ekmeği 100 gr', slug: 'ari-ekmegi-100-gr', price: 380, stock: 60, categorySlug: 'polen-ari-ekmegi', images: ['/images/products/polen/ari-ekmegi-100gr.webp'] },

    // BAL
    { name: 'Çiçek Balı 400 gr', slug: 'cicek-bali-400-gr', price: 300, stock: 120, categorySlug: 'bal', images: ['/images/products/bal/cicek-bali-400gr.webp'] },
    { name: 'Çiçek Balı 850 gr', slug: 'cicek-bali-850-gr', price: 600, stock: 100, categorySlug: 'bal', images: ['/images/products/bal/cicek-bali-850gr.webp'] },
    { name: 'Çiçek Balı 5 kg', slug: 'cicek-bali-5-kg', price: 3500, stock: 20, categorySlug: 'bal', images: ['/images/products/bal/cicek-bali-5kg.webp'], isFreeShipping: true },
    { name: 'Çam Balı 400 gr', slug: 'cam-bali-400-gr', price: 350, stock: 90, categorySlug: 'bal', images: ['/images/products/bal/cam-bali-400gr.webp'] },
    { name: 'Çam Balı 850 gr', slug: 'cam-bali-850-gr', price: 700, stock: 80, categorySlug: 'bal', images: ['/images/products/bal/cam-bali-850gr.webp'] },
    { name: 'Kestane Ihlamur Balı 400 gr', slug: 'kestane-ihlamur-bali-400-gr', price: 740, stock: 50, categorySlug: 'bal', images: ['/images/products/bal/kestane-bali-400gr.webp'] },
    { name: 'Kestane Ihlamur Balı 850 gr', slug: 'kestane-ihlamur-bali-850-gr', price: 1480, stock: 40, categorySlug: 'bal', images: ['/images/products/bal/kestane-bali-850gr.webp'], isFreeShipping: true },
    { name: 'Meşe Balı 400 gr', slug: 'mese-bali-400-gr', price: 480, stock: 60, categorySlug: 'bal', images: ['/images/products/bal/mese-bali-400gr.webp'] },
    { name: 'Orman Balı 400 gr', slug: 'orman-bali-400-gr', price: 425, stock: 70, categorySlug: 'bal', images: ['/images/products/bal/orman-bali-400gr.webp'] },
    { name: 'Doğal Orman Balı 850 gr', slug: 'dogal-orman-bali-850-gr', price: 850, stock: 50, categorySlug: 'bal', images: ['/images/products/bal/orman-bali-850gr.webp'] },
    { name: 'Krem Bal 400 gr', slug: 'krem-bal-400-gr', price: 350, stock: 40, categorySlug: 'bal', images: ['/images/products/bal/krem-bal-400gr.webp'] },

    // BİTKİSEL YAĞLAR
    { name: 'Kantaron Yağı 100 ml', slug: 'kantaron-yagi-100-ml', price: 250, stock: 100, categorySlug: 'bitkisel-yaglar', images: ['/images/products/yaglar/kantaron-yagi-100ml.webp'] },

    // DİĞER
    { name: 'Kantronlu Bal Mumu', slug: 'kantronlu-bal-mumu', price: 180, stock: 50, categorySlug: 'ozel-setler', images: ['/images/products/diger/bal-mumu.webp'] },
    { name: 'Doğal Bal Sirkesi', slug: 'dogal-bal-sirkesi', price: 220, stock: 40, categorySlug: 'ozel-setler', images: ['/images/products/diger/bal-sirkesi.webp'] },
    { name: 'Bal Sirkesi 250 cc', slug: 'bal-sirkesi-250-cc', price: 140, stock: 60, categorySlug: 'ozel-setler', images: ['/images/products/diger/bal-sirkesi-250cc.webp'] },
  ];

  for (const prod of productsData) {
    const gramaj = prod.name.match(/\d+\s*(gr|g|ml|kg|cc)/i)?.[0] || 'Standart';
    await prisma.product.create({
      data: {
        name: prod.name,
        slug: prod.slug,
        price: prod.price,
        oldPrice: prod.oldPrice || null,
        stock: prod.stock,
        isFreeShipping: prod.isFreeShipping || false,
        categoryId: categoryMap[prod.categorySlug],
        description: generateDescription(prod.categorySlug, prod.name, gramaj),
        images: JSON.stringify(prod.images),
        isNew: true, // Mark all migrated products as new for now
      }
    });
  }

  // 4. Sliders
  await prisma.slider.createMany({
    data: [
      {
        title: 'Doğanın Kalbinden Sofranıza',
        subtitle: 'Kendi arılıklarımızdan, ısıl işlem görmemiş %100 doğal ürünler.',
        image: '/images/hero-1.webp',
        buttonText: 'Hemen Keşfet',
        buttonLink: '/urunler',
        order: 1
      },
      {
        title: 'Bağışıklığınızı Güçlendirin',
        subtitle: 'Arı sütü, propolis ve özel karışımlarla doğal koruma kalkanı.',
        image: '/images/hero-2.webp',
        buttonText: 'Karışımları İncele',
        buttonLink: '/kategori/karisim',
        order: 2
      }
    ]
  });

  // 5. Blog Posts
  await prisma.blogPost.createMany({
    data: [
      {
        title: 'Gerçek Ham Balın Faydaları',
        slug: 'gercek-ham-balin-faydaları',
        content: 'Ham bal, pastörize edilmemiş ve filtre edilmemiş bal demektir. İçindeki tüm enzimler ve polenler korunur...',
        excerpt: 'Ham bal neden daha sağlıklıdır? Isıl işlem görmemiş balın farklarını keşfedin.',
        image: '/images/blog/blog-1.webp',
        author: 'Mehmet Durgut'
      },
      {
        title: 'Arı Sütü Nasıl Tüketilmeli?',
        slug: 'ari-sutu-nasil-tuketilmeli',
        content: 'Arı sütü, kraliçe arının besinidir. Sabah aç karnına dil altı kullanımı en etkili yöntemdir...',
        excerpt: 'Arı sütünün doğru kullanımı ve saklama koşulları hakkında bilmeniz gerekenler.',
        image: '/images/blog/blog-2.webp',
        author: 'Mehmet Durgut'
      }
    ]
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
