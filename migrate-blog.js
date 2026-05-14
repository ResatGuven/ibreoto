const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const blogPostsPath = path.join(__dirname, 'src/data/blog-posts.json');
  if (!fs.existsSync(blogPostsPath)) {
    console.log('Blog posts JSON not found.');
    return;
  }

  const blogPosts = JSON.parse(fs.readFileSync(blogPostsPath, 'utf8'));

  console.log(`Migrating ${blogPosts.length} posts...`);

  for (const post of blogPosts) {
    try {
      await prisma.blogPost.upsert({
        where: { slug: post.slug },
        update: {
          category: post.category || 'Genel'
        },
        create: {
          title: post.title,
          slug: post.slug,
          content: post.content || '',
          excerpt: post.excerpt || '',
          image: post.image,
          author: post.author || 'İbreOto',
          category: post.category || 'Genel',
          published: true,
          createdAt: new Date(post.date || Date.now())
        }
      });
      console.log(`Migrated: ${post.title}`);
    } catch (e) {
      console.error(`Failed to migrate ${post.title}:`, e.message);
    }
  }

  console.log('Migration complete.');
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
