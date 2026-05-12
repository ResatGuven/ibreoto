const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    // Kategori oluştur
    const category = await prisma.category.create({
      data: {
        name: 'Aydınlatma',
        slug: 'aydinlatma',
        description: 'Araç içi ve dışı aydınlatma ürünleri',
      },
    });
    console.log('Category created:', category);

    // Ürün oluştur
    const product = await prisma.product.create({
      data: {
        name: 'RGB Ambiyans Led',
        slug: 'rgb-ambiyans-led',
        description: 'Telefon kontrollü araç içi ambiyans aydınlatması',
        price: 1200.0,
        stock: 50,
        images: JSON.stringify(['/images/ambient-led.jpg']),
        categoryId: category.id,
      },
    });
    console.log('Product created:', product);

    // Bir de sipariş ekleyelim mi? (Opsiyonel ama iyi olur)
    // Bunun için önce bir kullanıcı lazım.
    const user = await prisma.user.create({
      data: {
        name: 'Ahmet Yılmaz',
        email: 'ahmet@example.com',
        role: 'USER',
      },
    });
    console.log('User created:', user);

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: 'PENDING',
        totalAmount: 1200.0,
        items: {
          create: {
            productId: product.id,
            quantity: 1,
            price: 1200.0,
          },
        },
      },
    });
    console.log('Order created:', order);

  } catch (error) {
    console.error('Error seeding DB:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
