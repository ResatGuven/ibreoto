import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      include: {
        items: {
          include: { product: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const mapped = orders.map(order => ({
      id: order.id,
      customer: order.customerName,
      email: order.customerEmail,
      phone: order.customerPhone,
      address: order.customerAddress,
      city: order.customerCity,
      total: `₺${order.totalAmount.toLocaleString('tr-TR')}`,
      status: order.status,
      cargoNo: order.cargoNo || '',
      date: new Date(order.createdAt).toLocaleDateString('tr-TR'),
      items: order.items.map(item => ({
        name: item.product.name,
        qty: item.quantity,
        price: `₺${item.price.toLocaleString('tr-TR')}`
      }))
    }));

    return NextResponse.json(mapped);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status, cargoNo } = await request.json();
    const order = await prisma.order.update({
      where: { id },
      data: { 
        status: status,
        cargoNo: cargoNo
      }
    });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
