import React from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';
import prisma from '@/lib/prisma';
import StatsCards from './components/StatsCards';
import DashboardCharts from './components/DashboardCharts';

export default async function AdminDashboardPage() {
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

  const stats = [
    { label: 'Toplam Gelir', value: `₺${totalRevenue.toLocaleString('tr-TR')}`, icon: DollarSign, color: 'bg-green-100 text-green-600', trend: '+12.5%' },
    { label: 'Yeni Siparişler', value: totalOrders.toString(), icon: ShoppingCart, color: 'bg-blue-100 text-blue-600', trend: '+5.2%' },
    { label: 'Aktif Müşteriler', value: activeCustomers.toString(), icon: Users, color: 'bg-purple-100 text-purple-600', trend: '+2.4%' },
    { label: 'Dönüşüm Oranı', value: '%3.2', icon: TrendingUp, color: 'bg-orange-100 text-orange-600', trend: '+1.1%' },
  ];

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-3xl font-heading font-bold text-secondary mb-8 uppercase">Dashboard</h1>

      {/* Stats Cards (Animated) */}
      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2">
          <DashboardCharts />
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="font-heading font-bold text-lg text-secondary mb-4 border-b border-gray-100 pb-2">Kritik Stok Uyarısı</h3>
          <ul className="space-y-4 mt-4">
             {lowStockProducts.map((product) => (
                <li key={product.id} className="flex justify-between items-center">
                   <div>
                      <p className="text-sm font-medium text-gray-900">{product.name}</p>
                      <p className="text-xs text-gray-500">SKU: {product.id.substring(0, 8)}</p>
                   </div>
                   <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      product.stock === 0 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                   }`}>
                      {product.stock === 0 ? 'Stok Tükendi' : `Son ${product.stock} Adet`}
                   </div>
                </li>
             ))}
             {lowStockProducts.length === 0 && (
                <li className="text-sm text-gray-500 text-center py-4">Kritik stokta ürün yok.</li>
             )}
          </ul>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="font-heading font-bold text-lg text-secondary mb-4">Son Siparişler</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-sm text-gray-500">
                <th className="py-3 font-medium">Sipariş No</th>
                <th className="py-3 font-medium">Müşteri</th>
                <th className="py-3 font-medium">Tutar</th>
                <th className="py-3 font-medium">Durum</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-surface/50 transition-colors">
                  <td className="py-3 font-medium text-primary">#{order.id.substring(0, 8)}</td>
                  <td className="py-3 text-gray-700">{order.user?.name || 'Bilinmeyen'}</td>
                  <td className="py-3 font-medium">₺{order.totalAmount.toLocaleString('tr-TR')}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700' :
                      order.status === 'DELIVERED' ? 'bg-green-100 text-green-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status === 'PENDING' ? 'Bekliyor' :
                       order.status === 'DELIVERED' ? 'Teslim Edildi' : 'İşlemde'}
                    </span>
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-4 text-center text-gray-500">Henüz sipariş yok.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
