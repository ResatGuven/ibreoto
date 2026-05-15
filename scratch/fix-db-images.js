const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();
  
  for (const product of products) {
    let images = [];
    try {
      images = JSON.parse(product.images);
    } catch (e) {
      images = [product.images];
    }
    
    const imagePath = images[0] || '';
    
    // Simplified mapping for existing files
    let newImage = '/images/products/placeholder.png';
    
    if (product.name.toLowerCase().includes('arı sütü')) {
      newImage = '/images/products/ari-sutu/ari-sutu-100gr-main.png';
    } else if (product.name.toLowerCase().includes('bal')) {
      newImage = '/images/products/bal/cicek-bali-850gr.png';
    } else if (product.name.toLowerCase().includes('karışım')) {
      newImage = '/images/products/karisim/ari-ekmekli-yetiskin-850gr.png';
    }
    
    // Only update if it points to a .webp that we know is missing
    if (imagePath.endsWith('.webp')) {
      await prisma.product.update({
        where: { id: product.id },
        data: { images: JSON.stringify([newImage]) }
      });
      console.log(`Updated ${product.name} to ${newImage}`);
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
