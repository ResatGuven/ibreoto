const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
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
  console.log('Categories seeded successfully');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
