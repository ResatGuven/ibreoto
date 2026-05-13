// Güncellendi
import React from 'react';
import prisma from '@/lib/prisma';
import StatsCards from './components/StatsCards';
import DashboardCharts from './components/DashboardCharts';

export const dynamic = 'force-dynamic';

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
    { label: 'Toplam Gelir', value: `₺${totalRevenue.toLocaleString('tr-TR')}`, icon: 'DollarSign', color: 'bg-green-500/10 text-green-500', trend: '+12.5%' },
    { label: 'Yeni Siparişler', value: totalOrders.toString(), icon: 'ShoppingCart', color: 'bg-blue-500/10 text-blue-500', trend: '+5.2%' },
    { label: 'Aktif Müşteriler', value: activeCustomers.toString(), icon: 'Users', color: 'bg-purple-500/10 text-purple-500', trend: '+2.4%' },
    { label: 'Dönüşüm Oranı', value: '%3.2', icon: 'TrendingUp', color: 'bg-orange-500/10 text-orange-500', trend: '+1.1%' },
  ];

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100">
      <h1 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-8 uppercase">Dashboard</h1>

      {/* Stats Cards */}
      <StatsCards stats={stats} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2">
          <DashboardCharts />
        </div>

        {/* Low Stock */}
        <div className="bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 shadow-lg">
          <h3 className="font-heading font-bold text-lg text-white mb-4 border-b border-gray-800 pb-2 uppercase">Kritik Stok Uyarısı</h3>
          <ul className="space-y-4 mt-4">
             {lowStockProducts.map((product) => (
                <li key={product.id} className="flex justify-between items-center">
                   <div>
                      <p className="text-sm font-medium text-white">{product.name}</p>
                      <p className="text-xs text-gray-500">SKU: {product.id.substring(0, 8)}</p>
                   </div>
                   <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      product.stock === 0 ? 'bg-red-900/50 text-red-300 border border-red-700' : 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
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
      <div className="bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 shadow-lg">
        <h3 className="font-heading font-bold text-lg text-white mb-4 uppercase">Son Siparişler</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-body text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="py-3 font-medium">Sipariş No</th>
                <th className="py-3 font-medium">Müşteri</th>
                <th className="py-3 font-medium">Tutar</th>
                <th className="py-3 font-medium">Durum</th>
              </tr>
            </thead>
            <tbody className="text-gray-300">
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-800 hover:bg-[#1F2937]/50 transition-colors">
                  <td className="py-3 font-medium text-blue-400">#{order.id.substring(0, 8)}</td>
                  <td className="py-3 text-white">{order.user?.name || 'Bilinmeyen'}</td>
                  <td className="py-3 font-medium">₺{order.totalAmount.toLocaleString('tr-TR')}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      order.status === 'PENDING' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-700' :
                      order.status === 'DELIVERED' ? 'bg-green-900/50 text-green-300 border border-green-700' :
                      'bg-blue-900/50 text-blue-300 border border-blue-700'
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
