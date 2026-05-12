import React from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Aylık Gelir', value: '₺124.500', icon: DollarSign, color: 'bg-green-100 text-green-600', trend: '+12.5%' },
  { label: 'Yeni Siparişler', value: '145', icon: ShoppingCart, color: 'bg-blue-100 text-blue-600', trend: '+5.2%' },
  { label: 'Aktif Müşteriler', value: '8.432', icon: Users, color: 'bg-purple-100 text-purple-600', trend: '+2.4%' },
  { label: 'Dönüşüm Oranı', value: '%3.2', icon: TrendingUp, color: 'bg-orange-100 text-orange-600', trend: '+1.1%' },
];

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-heading font-bold text-secondary mb-8">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 flex items-center">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center mr-4 ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                <p className="text-xs text-green-600 font-medium mt-1">
                  {stat.trend} geçen aydan
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
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
                <tr className="border-b border-gray-100">
                  <td className="py-3 font-medium text-primary">#ORD-001</td>
                  <td className="py-3 text-gray-700">Ahmet Yılmaz</td>
                  <td className="py-3 font-medium">₺1.250</td>
                  <td className="py-3"><span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">Bekliyor</span></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 font-medium text-primary">#ORD-002</td>
                  <td className="py-3 text-gray-700">Mehmet Demir</td>
                  <td className="py-3 font-medium">₺3.450</td>
                  <td className="py-3"><span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-medium">Hazırlanıyor</span></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 font-medium text-primary">#ORD-003</td>
                  <td className="py-3 text-gray-700">Ayşe Kaya</td>
                  <td className="py-3 font-medium">₺850</td>
                  <td className="py-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Teslim Edildi</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock Placeholder */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h3 className="font-heading font-bold text-lg text-secondary mb-4 border-b border-gray-100 pb-2">Stok Uyarısı (Kritik Seviye)</h3>
          <ul className="space-y-4 mt-4">
             <li className="flex justify-between items-center">
                <div>
                   <p className="text-sm font-medium text-gray-900">Karbon Fiber Direksiyon Kılıfı</p>
                   <p className="text-xs text-gray-500">SKU: CF-STR-01</p>
                </div>
                <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                   Son 2 Adet
                </div>
             </li>
             <li className="flex justify-between items-center">
                <div>
                   <p className="text-sm font-medium text-gray-900">3D Havuzlu Paspas Seti - VW Golf</p>
                   <p className="text-xs text-gray-500">SKU: 3D-VW-GOLF</p>
                </div>
                <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">
                   Stok Tükendi
                </div>
             </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
