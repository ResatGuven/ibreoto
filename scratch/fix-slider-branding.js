const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const sliders = await prisma.slider.findMany();
  for (const slider of sliders) {
    let newTitle = slider.title;
    if (newTitle.includes('İbreOto') || newTitle.includes('Aksesuar')) {
      newTitle = newTitle.replace('İbreOto', 'ArıHayat').replace('Oto Aksesuar', 'Arı Ürünleri');
      await prisma.slider.update({
        where: { id: slider.id },
        data: { title: newTitle }
      });
      console.log(`Updated Slider: ${newTitle}`);
    }
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
