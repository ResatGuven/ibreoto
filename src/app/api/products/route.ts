import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoriesOnly = searchParams.get('categoriesOnly') === 'true';

  if (categoriesOnly) {
    try {
      const categories = await prisma.category.findMany({
        select: { id: true, name: true, slug: true }
      });
      return NextResponse.json(categories);
    } catch (e) {
      return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
  }

  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: { slug: true, name: true },
        },
        reviews: {
          select: { rating: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
    
    const mappedProducts = products.map(p => {
      let imageUrl = '/images/products/placeholder.png';
      try {
        const imgs = JSON.parse(p.images);
        imageUrl = Array.isArray(imgs) ? (imgs[0] || imageUrl) : (imgs || imageUrl);
      } catch (e) {
        imageUrl = p.images || imageUrl;
      }

      let rating = 5.0;
      if (p.reviews && p.reviews.length > 0) {
        rating = Number((p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length).toFixed(1));
      }
      
      return {
        id: p.id,
        name: p.name,
        price: p.price.toString(),
        oldPrice: p.oldPrice ? p.oldPrice.toString() : null,
        category: p.category ? {
          slug: p.category.slug,
          name: p.category.name
        } : { slug: 'genel', name: 'Genel' },
        categoryId: p.categoryId,
        image: imageUrl,
        description: p.description,
        stock: p.stock,
        isNew: p.isNew,
        rating: rating,
        createdAt: p.createdAt
      };
    });
    
    return NextResponse.json(mappedProducts);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
