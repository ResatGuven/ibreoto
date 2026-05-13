import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic'; // Statik cache'i devre dışı bırakır

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: {
          select: { slug: true, name: true },
        },
      },
    });
    
    const mappedProducts = products.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price.toString(),
      category: p.category.slug,
      image: JSON.parse(p.images)[0] || '',
      description: p.description,
      stock: p.stock
    }));
    
    return NextResponse.json(mappedProducts);
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, price, category, image, description, stock } = body;

    const categoryRecord = await prisma.category.findUnique({
      where: { slug: category },
    });

    if (!categoryRecord) {
      return NextResponse.json({ error: 'Category not found' }, { status: 400 });
    }

    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    const product = await prisma.product.create({
      data: {
        name,
        slug: `${slug}-${Date.now()}`,
        price: parseFloat(price),
        stock: parseInt(stock) || 0,
        images: JSON.stringify([image]),
        description,
        categoryId: categoryRecord.id,
      },
    });

    return NextResponse.json({
      id: product.id,
      name: product.name,
      price: product.price.toString(),
      category: category,
      image: image,
      description: product.description,
      stock: product.stock
    });
  } catch (error) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
