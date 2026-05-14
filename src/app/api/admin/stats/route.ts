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
    // 1. Toplam Gelir ve Sipariş Sayısı
    const orders = await prisma.order.findMany({
      select: {
        totalAmount: true,
        status: true,
        createdAt: true,
        id: true,
        customerName: true
      }
    });

    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const orderCount = orders.length;

    // 2. Müşteri Sayısı (Benzersiz e-postalar)
    const uniqueCustomers = await prisma.order.groupBy({
      by: ['customerEmail'],
      _count: true
    });

    // 3. Kritik Stok (5'ten az olanlar)
    const lowStockProducts = await prisma.product.findMany({
      where: {
        stock: {
          lte: 5
        }
      },
      select: {
        name: true,
        stock: true,
        id: true
      },
      take: 5
    });

    // 4. Son Siparişler
    const recentOrders = orders
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5)
      .map(o => ({
        id: o.id,
        customer: o.customerName,
        total: `₺${o.totalAmount.toLocaleString('tr-TR')}`,
        status: o.status
      }));

    return NextResponse.json({
      totalRevenue: `₺${totalRevenue.toLocaleString('tr-TR')}`,
      orderCount: orderCount.toString(),
      customerCount: uniqueCustomers.length.toString(),
      lowStock: lowStockProducts.map(p => ({
        name: p.name,
        stock: p.stock,
        status: p.stock === 0 ? 'Stok Tükendi' : `Son ${p.stock} Adet`
      })),
      recentOrders
    });
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
