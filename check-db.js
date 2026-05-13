const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.product.count();
  console.log(`Product count in DB: ${count}`);
  const products = await prisma.product.findMany({ take: 5 });
  console.log('Sample products:', products.map(p => p.name));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
