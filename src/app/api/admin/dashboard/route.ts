import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Toplam Gelir
    const orders = await prisma.order.findMany();
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // 2. Yeni Siparişler
    const totalOrders = orders.length;

    // 3. Aktif Müşteriler
    const uniqueUsers = await prisma.order.findMany({
      select: { userId: true },
      distinct: ['userId'],
    });
    const activeCustomers = uniqueUsers.length;

    // 4. Son Siparişler
    const recentOrders = await prisma.order.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { name: true },
        },
      },
    });

    // 5. Kritik Stok Uyarısı
    const lowStockProducts = await prisma.product.findMany({
      where: {
        stock: {
          lt: 5,
        },
      },
      take: 5,
    });

    return NextResponse.json({
      stats: [
        { label: 'Aylık Gelir', value: `₺${totalRevenue.toLocaleString('tr-TR')}`, trend: '+0%' },
        { label: 'Yeni Siparişler', value: totalOrders.toString(), trend: '+0%' },
        { label: 'Aktif Müşteriler', value: activeCustomers.toString(), trend: '+0%' },
        { label: 'Dönüşüm Oranı', value: '%0', trend: '+0%' },
      ],
      recentOrders: recentOrders.map((order) => ({
        id: order.id,
        customer: order.user?.name || 'Bilinmeyen',
        amount: `₺${order.totalAmount.toLocaleString('tr-TR')}`,
        status: order.status,
      })),
      lowStockProducts: lowStockProducts.map((product) => ({
        name: product.name,
        sku: product.id.substring(0, 8),
        stock: product.stock,
      })),
    });
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
