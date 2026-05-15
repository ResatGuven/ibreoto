const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const productsData = [
  {
    "name": "ARI EKMEKLİ Karışım Kids 225 gr",
    "price": 440,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69b979fc22548/WhatsAppImage2026-03-28at22.53.133.jpeg",
    "category": "karisim"
  },
  {
    "name": "ARI EKMEKLİ Karışım Kids 400 gr",
    "price": 770,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69b97a2e8790c/WhatsAppImage2026-03-28at22.53.133.jpeg",
    "category": "karisim"
  },
  {
    "name": "ARI EKMEKLİ Karışım Kids 850 gr",
    "price": 1550,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69b97a5a3a2d2/WhatsAppImage2026-03-28at22.53.133.jpeg",
    "category": "karisim"
  },
  {
    "name": "ARI EKMEKLİ 225 gr Yetişkin Karışımı",
    "price": 730,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69b9799c2b2e8/WhatsAppImage2026-03-28at22.53.133.jpeg",
    "category": "karisim"
  },
  {
    "name": "Arı Sütü Yerli Üretim 100 gr",
    "price": 4000,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69f9bd39b1afd/WhatsAppImage2026-05-05at12.40.32.jpeg",
    "category": "ari-sutu"
  },
  {
    "name": "Arı Sütü Yerli Üretim 50 gr",
    "price": 2000,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69f9bd1d4f8e2/WhatsAppImage2026-05-05at12.40.32.jpeg",
    "category": "ari-sutu"
  },
  {
    "name": "Doğal Arı Sütü 40 g",
    "price": 1600,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69f9bcdb4f8e2/WhatsAppImage2026-05-05at12.40.32.jpeg",
    "category": "ari-sutu"
  },
  {
    "name": "Yerli Arı Sütü 20 gram",
    "price": 800,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69f9bc9b4f8e2/WhatsAppImage2026-05-05at12.40.32.jpeg",
    "category": "ari-sutu"
  },
  {
    "name": "Çiçek balı 5 kg",
    "price": 3500,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69b97b1a3a2d2/WhatsAppImage2026-03-28at22.53.133.jpeg",
    "category": "bal"
  },
  {
    "name": "Arı Hayat Krem Bal (400 gr)",
    "price": 350,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69b97ae03a2d2/WhatsAppImage2026-03-28at22.53.133.jpeg",
    "category": "bal"
  },
  {
    "name": "Orman Balı 400 Gr",
    "price": 425,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69b97ab03a2d2/WhatsAppImage2026-03-28at22.53.133.jpeg",
    "category": "bal"
  },
  {
    "name": "Doğal Orman Balı 850 g",
    "price": 850,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69b97a803a2d2/WhatsAppImage2026-03-28at22.53.133.jpeg",
    "category": "bal"
  },
  {
    "name": "Polen Taze Yerli Üretim 400 gr",
    "price": 500,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69b97b4a3a2d2/WhatsAppImage2026-03-28at22.53.133.jpeg",
    "category": "polen-ari-ekmegi"
  },
  {
    "name": "Arı Ekmeği (Perga) 100 gr",
    "price": 800,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69b97b7a3a2d2/WhatsAppImage2026-03-28at22.53.133.jpeg",
    "category": "polen-ari-ekmegi"
  },
  {
    "name": "Ham Çam Balı 850 gr",
    "price": 600,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69b97ba03a2d2/WhatsAppImage2026-03-28at22.53.133.jpeg",
    "category": "bal"
  },
  {
    "name": "Propolis Su Bazlı 30 ml",
    "price": 350,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69b97bd03a2d2/WhatsAppImage2026-03-28at22.53.133.jpeg",
    "category": "propolis"
  },
  {
    "name": "Propolis Alkol Bazlı 30 ml",
    "price": 450,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69b97c003a2d2/WhatsAppImage2026-03-28at22.53.133.jpeg",
    "category": "propolis"
  },
  {
    "name": "Arı Zehiri Kremi 50 ml",
    "price": 650,
    "image": "https://arihayat.com/media/ks-prod/images/shop/67c5873414f8e/product/69b97c303a2d2/WhatsAppImage2026-03-28at22.53.133.jpeg",
    "category": "ozel-setler"
  }
];

async function main() {
  console.log('Seeding products from arihayat.com...');
  
  for (const item of productsData) {
    const slug = item.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    // Get category ID
    let category = await prisma.category.findUnique({
      where: { slug: item.category }
    });

    if (!category) {
      category = await prisma.category.create({
        data: {
          name: item.category.charAt(0).toUpperCase() + item.category.slice(1).replace('-', ' '),
          slug: item.category
        }
      });
    }

    await prisma.product.upsert({
      where: { slug: slug },
      update: {
        price: item.price,
        images: JSON.stringify([item.image]),
        categoryId: category.id
      },
      create: {
        name: item.name,
        slug: slug,
        price: item.price,
        images: JSON.stringify([item.image]),
        description: `${item.name} - arihayat.com güvencesiyle %100 doğal arı ürünü.`,
        stock: 50,
        categoryId: category.id
      }
    });
    console.log(`Upserted: ${item.name}`);
  }
  
  console.log('Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
