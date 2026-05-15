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
      },
      orderBy: { createdAt: 'desc' }
    });
    
    const mappedProducts = products.map(p => {
      let imageUrl = '';
      try {
        const imgs = JSON.parse(p.images);
        imageUrl = Array.isArray(imgs) ? (imgs[0] || '') : imgs;
      } catch (e) {
        imageUrl = p.images || '';
      }
      
      return {
        id: p.id,
        name: p.name,
        price: p.price.toString(),
        category: p.category.slug,
        image: imageUrl,
        description: p.description,
        stock: p.stock,
        createdAt: p.createdAt
      };
    });
    
    return NextResponse.json(mappedProducts);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
