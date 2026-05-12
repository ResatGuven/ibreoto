const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = [
    { name: 'Karbon Fiber Direksiyon Kılıfı', price: 350, categorySlug: 'ic-aksesuar', image: '/images/products/steering_wheel_cover.png', description: 'Yüksek kaliteli karbon fiber görünüm.', stock: 15 },
    { name: '3D Havuzlu Paspas Seti - VW Golf', price: 850, categorySlug: 'ic-aksesuar', image: '/images/products/paspas_seti.png', description: 'Tam uyumlu havuzlu paspas.', stock: 20 },
    { name: 'Ortopedik Bel Destekli Koltuk Minderi', price: 450, categorySlug: 'ic-aksesuar', image: '/images/products/koltuk_minderi.png', description: 'Uzun sürüşler için konfor.', stock: 10 },
    { name: 'Dört Mevsim Branda - Su Geçirmez', price: 1200, categorySlug: 'dis-aksesuar', image: '/images/products/araba_brandasi.png', description: 'Aracınızı dış etkenlerden korur.', stock: 5 },
    { name: 'Muz Tipi Silecek Takımı', price: 150, categorySlug: 'dis-aksesuar', image: '/images/products/silecek_takimi.png', description: 'Sessiz ve temiz silme.', stock: 50 },
    { name: 'Krom Kapı Kolu Kaplaması', price: 250, categorySlug: 'dis-aksesuar', image: '/images/products/krom_kapi_kolu.png', description: 'Şık krom görünüm.', stock: 30 },
    { name: '4K Çift Kameralı Araç İçi Kamera', price: 2500, categorySlug: 'teknoloji', image: '/images/products/dash_cam.png', description: 'Ön ve arka kayıt.', stock: 8 },
    { name: 'RGB Uygulama Kontrollü Ambiyans Led', price: 650, categorySlug: 'teknoloji', image: '/images/products/interior_led.png', description: 'Telefon kontrollü renkler.', stock: 25 },
    { name: 'Kablosuz Şarjlı Telefon Tutucu', price: 350, categorySlug: 'teknoloji', image: '/images/products/telefon_tutucu.png', description: 'Otomatik kavrama.', stock: 40 },
    { name: 'Seramik Katkılı Hızlı Cila 500ml', price: 250, categorySlug: 'bakim', image: '/images/products/seramik_cila.png', description: 'Derin parlaklık ve koruma.', stock: 15 },
    { name: 'Cilalı Oto Şampuanı 1 Litre', price: 120, categorySlug: 'bakim', image: '/images/products/oto_sampuani.png', description: 'Temizler ve parlatır.', stock: 20 },
    { name: 'Mikrofiber Kurulama Bezi 3\'lü', price: 80, categorySlug: 'bakim', image: '/images/products/kurulama_bezi.png', description: 'Hav bırakmaz.', stock: 100 },
  ];

  for (const prod of products) {
    const category = await prisma.category.findUnique({
      where: { slug: prod.categorySlug },
    });

    if (category) {
      // Create slug from name
      const slug = prod.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      await prisma.product.upsert({
        where: { slug: slug },
        update: {},
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
  console.log('Real products seeded successfully');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
