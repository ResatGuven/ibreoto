// Güncellendi
"use client";

import React, { useState, useEffect } from 'react';
import { DollarSign, ShoppingCart, Users, TrendingUp } from 'lucide-react';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState([
    { label: 'Toplam Gelir', value: '₺0', icon: DollarSign, color: 'text-green-500', trend: '+0%' },
    { label: 'Yeni Siparişler', value: '0', icon: ShoppingCart, color: 'text-red-500', trend: '+0%' },
    { label: 'Aktif Müşteriler', value: '0', icon: Users, color: 'text-purple-500', trend: '+0%' },
    { label: 'Dönüşüm Oranı', value: '%3.2', icon: TrendingUp, color: 'text-orange-500', trend: '+1.1%' },
  ]);

  useEffect(() => {
    // LocalStorage'dan siparişleri oku
    const savedOrders = localStorage.getItem('app_orders');
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders);
      setOrders(parsedOrders);

      // İstatistikleri hesapla
      const totalRevenue = parsedOrders.reduce((sum: number, order: any) => {
        const amount = parseFloat(order.total.replace('₺', '').replace('.', '')) || 0;
        return sum + amount;
      }, 0);

      const uniqueCustomers = new Set(parsedOrders.map((o: any) => o.customer)).size;

      setStats([
        { label: 'Toplam Gelir', value: `₺${totalRevenue.toLocaleString('tr-TR')}`, icon: DollarSign, color: 'text-green-500', trend: '+12.5%' },
        { label: 'Yeni Siparişler', value: parsedOrders.length.toString(), icon: ShoppingCart, color: 'text-red-500', trend: '+5.2%' },
        { label: 'Aktif Müşteriler', value: uniqueCustomers.toString(), icon: Users, color: 'text-purple-500', trend: '+2.4%' },
        { label: 'Dönüşüm Oranı', value: '%3.2', icon: TrendingUp, color: 'text-orange-500', trend: '+1.1%' },
      ]);
    }
  }, []);

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100">
      <h1 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 mb-8 uppercase">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <h3 className="text-2xl font-heading font-bold text-white mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl bg-[#1F2937] ${stat.color}`}>
                  <Icon size={20} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs">
                <span className="text-green-500 font-bold">{stat.trend}</span>
                <span className="text-gray-600 ml-2">geçen aya göre</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Sales Chart (Mock) */}
        <div className="lg:col-span-2 bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 shadow-lg">
          <h3 className="font-heading font-bold text-lg text-white mb-4 uppercase">Haftalık Satış Analizi</h3>
          <div className="h-64 flex items-end justify-between space-x-2 pt-4">
            {['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'].map((day, index) => {
              const heights = ['h-20', 'h-32', 'h-16', 'h-40', 'h-48', 'h-24', 'h-56'];
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div className={`w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t-lg ${heights[index]} transition-all duration-500 hover:from-red-500 hover:to-red-300`}></div>
                  <span className="text-xs text-gray-500 mt-2">{day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Low Stock (Mock) */}
        <div className="bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 shadow-lg">
          <h3 className="font-heading font-bold text-lg text-white mb-4 uppercase">Kritik Stok Uyarısı</h3>
          <ul className="space-y-4 mt-4">
            <li className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-white">Karbon Fiber Direksiyon Kılıfı</p>
                <p className="text-xs text-gray-500">SKU: 12345678</p>
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-bold bg-yellow-900/50 text-yellow-300 border border-yellow-700">
                Son 3 Adet
              </div>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-white">3D Havuzlu Paspas Seti</p>
                <p className="text-xs text-gray-500">SKU: 87654321</p>
              </div>
              <div className="px-3 py-1 rounded-full text-xs font-bold bg-red-900/50 text-red-300 border border-red-700">
                Stok Tükendi
              </div>
            </li>
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
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-gray-800 hover:bg-[#1F2937]/50 transition-colors">
                  <td className="py-3 font-medium text-red-400">#{order.id}</td>
                  <td className="py-3 text-white">{order.customer}</td>
                  <td className="py-3 font-medium text-red-500">{order.total}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                      order.status === 'Teslim Edildi' ? 'bg-green-900/50 text-green-300 border border-green-700' :
                      order.status === 'Kargoya Verildi' ? 'bg-blue-900/50 text-blue-300 border border-blue-700' :
                      'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
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
