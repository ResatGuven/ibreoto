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
  const [loading, setLoading] = useState(true);
  const [lowStock, setLowStock] = useState<any[]>([]);
  const [weeklySales, setWeeklySales] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/stats');
        const data = await res.json();
        
        if (data.error) throw new Error(data.error);

        setStats([
          { label: 'Toplam Gelir', value: data.totalRevenue, icon: DollarSign, color: 'text-green-500', trend: '+12.5%' },
          { label: 'Yeni Siparişler', value: data.orderCount, icon: ShoppingCart, color: 'text-red-500', trend: '+5.2%' },
          { label: 'Aktif Müşteriler', value: data.customerCount, icon: Users, color: 'text-purple-500', trend: '+2.4%' },
          { label: 'Dönüşüm Oranı', value: '%3.2', icon: TrendingUp, color: 'text-orange-500', trend: '+1.1%' },
        ]);

        setOrders(data.recentOrders);
        setLowStock(data.lowStock);
        setWeeklySales(data.weeklySales || []);
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const maxSale = Math.max(...weeklySales.map(s => s.total), 1);

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-heading font-black text-secondary uppercase tracking-tighter italic mb-2">
            ARIHAYAT <span className="text-primary">YÖNETİM</span>
          </h1>
          <p className="text-gray-500 font-body text-[10px] uppercase tracking-[0.4em] font-bold ml-1">Doğal Şifa Kaynağı Performans Verileri</p>
        </div>
        <div className="flex items-center space-x-3 bg-white px-6 py-3 rounded-2xl border border-gray-200 shadow-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
          <span className="text-[10px] font-heading font-black text-text-main uppercase tracking-widest">Sistem Aktif</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white shadow-sm border border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                  <h3 className="text-2xl font-heading font-bold text-secondary mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl bg-gray-50 ${stat.color}`}>
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
        {/* Sales Chart (Live) */}
        <div className="lg:col-span-2 bg-white shadow-sm border border-gray-200">
          <h3 className="font-heading font-bold text-lg text-secondary mb-4 uppercase flex justify-between items-center">
            Haftalık Satış Analizi
            <span className="text-[10px] text-gray-500 font-body">Son 7 Gün</span>
          </h3>
          <div className="h-64 flex items-end justify-between space-x-2 pt-4">
            {weeklySales.map((data, index) => {
              const heightPercentage = (data.total / maxSale) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center group relative">
                  {/* Tooltip */}
                  <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-red-600 text-secondary text-[10px] px-2 py-1 rounded font-bold z-10 whitespace-nowrap">
                    ₺{data.total.toLocaleString('tr-TR')}
                  </div>
                  <div 
                  style={{ height: `${Math.max(heightPercentage, 5)}%` }}
                    className="w-full bg-gradient-to-t from-amber-600 to-amber-400 rounded-t-lg transition-all duration-700 hover:from-amber-500 hover:to-amber-300 shadow-lg shadow-amber-600/20"
                  ></div>
                  <span className="text-[10px] text-gray-500 mt-3 font-bold uppercase">{data.day}</span>
                </div>
              );
            })}
            {weeklySales.length === 0 && (
              <div className="w-full h-full flex items-center justify-center text-gray-600 italic text-sm">Veri yükleniyor...</div>
            )}
          </div>
        </div>

        {/* Low Stock (Mock) */}
        <div className="bg-white shadow-sm border border-gray-200">
          <h3 className="font-heading font-bold text-lg text-secondary mb-4 uppercase">Kritik Stok Uyarısı</h3>
          <ul className="space-y-4 mt-4">
            {lowStock.map((item, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-secondary">{item.name}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  item.stock === 0 ? 'bg-red-900/50 text-red-300 border border-red-700' : 'bg-yellow-900/50 text-yellow-300 border border-yellow-700'
                }`}>
                  {item.status}
                </div>
              </li>
            ))}
            {lowStock.length === 0 && (
              <li className="text-sm text-gray-500 italic">Kritik stokta ürün bulunmuyor.</li>
            )}
          </ul>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white shadow-sm border border-gray-200">
        <h3 className="font-heading font-bold text-lg text-secondary mb-4 uppercase">Son Siparişler</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse font-body text-sm">
            <thead>
              <tr className="border-b border-gray-800 text-text-muted">
                <th className="py-3 font-medium">Sipariş No</th>
                <th className="py-3 font-medium">Müşteri</th>
                <th className="py-3 font-medium">Tutar</th>
                <th className="py-3 font-medium">Durum</th>
              </tr>
            </thead>
            <tbody className="text-text-main">
              {orders.slice(0, 5).map((order) => (
                <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 font-medium text-amber-400">#{order.id}</td>
                  <td className="py-3 text-secondary">{order.customer}</td>
                  <td className="py-3 font-medium text-amber-500">{order.total}</td>
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
