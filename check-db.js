const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const users = await prisma.user.findMany();
    console.log('Users count:', users.length);
    console.log('Users:', users);
    
    const products = await prisma.product.findMany();
    console.log('Products count:', products.length);
    
    const categories = await prisma.category.findMany();
    console.log('Categories count:', categories.length);
  } catch (error) {
    console.error('Error querying DB:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
