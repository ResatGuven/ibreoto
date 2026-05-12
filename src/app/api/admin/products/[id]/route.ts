import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.product.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to delete product:', error);
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, price, category, image, description, stock } = body;

    const categoryRecord = await prisma.category.findUnique({
      where: { slug: category },
    });

    if (!categoryRecord) {
      return NextResponse.json({ error: 'Category not found' }, { status: 400 });
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        price: parseFloat(price),
        stock: parseInt(stock) || 0, // Stok güncelleniyor
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
    console.error('Failed to update product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}
