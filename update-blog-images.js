const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const updates = [
    { slug: 'dogru-koltuk-kilifi-secimi', image: '/images/blog/seat-cover.png' },
    { slug: 'arac-ici-kameralarin-onemi', image: '/images/blog/dashcam.png' },
    { slug: 'ambiyans-aydinlatma-rehberi', image: '/images/blog/ambient.png' },
    { slug: 'arac-bakim-periyodlari', image: '/images/blog/maintenance.png' },
    { slug: 'oto-aksesuar-trendleri-2026', image: '/images/blog/trends.png' }
  ];

  for (const update of updates) {
    try {
      await prisma.blogPost.update({
        where: { slug: update.slug },
        data: { image: update.image }
      });
      console.log(`Updated image for: ${update.slug}`);
    } catch (e) {
      console.error(`Failed to update ${update.slug}:`, e.message);
    }
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
