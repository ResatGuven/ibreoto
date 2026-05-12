"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';

export default function AdminSiparislerPage() {
  const [orders, setOrders] = useState<any[]>([]);

  const defaultOrders = [
    { id: 1001, customer: 'Ahmet Yılmaz', total: '₺1.200', status: 'Hazırlanıyor', date: '11.05.2026' },
    { id: 1002, customer: 'Mehmet Demir', total: '₺350', status: 'Kargoya Verildi', date: '10.05.2026' },
    { id: 1003, customer: 'Ayşe Kaya', total: '₺850', status: 'Teslim Edildi', date: '09.05.2026' },
  ];

  useEffect(() => {
    const savedOrders = localStorage.getItem('app_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      setOrders(defaultOrders);
      localStorage.setItem('app_orders', JSON.stringify(defaultOrders));
    }
  }, []);

  const updateStatus = (id: number, newStatus: string) => {
    const updated = orders.map(order => order.id === id ? { ...order, status: newStatus } : order);
    setOrders(updated);
    localStorage.setItem('app_orders', JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-heading font-bold text-secondary uppercase mb-6">Sipariş Yönetimi</h1>
      
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-surface font-heading font-bold text-secondary text-xs uppercase">
            <tr>
              <th className="p-4">Sipariş No</th>
              <th className="p-4">Tarih</th>
              <th className="p-4">Müşteri</th>
              <th className="p-4">Toplam</th>
              <th className="p-4">Durum</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-100 hover:bg-surface/50 transition-colors">
                <td className="p-4 font-medium text-secondary">#{order.id}</td>
                <td className="p-4 text-text-muted">{order.date || '11.05.2026'}</td>
                <td className="p-4 text-secondary font-medium">{order.customer}</td>
                <td className="p-4 font-heading font-bold text-primary">{order.total}</td>
                <td className="p-4">
                  <select 
                    value={order.status} 
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs font-bold bg-white border outline-none ${
                      order.status === 'Teslim Edildi' ? 'border-green-500 text-green-700' :
                      order.status === 'Kargoya Verildi' ? 'border-blue-500 text-blue-700' :
                      'border-yellow-500 text-yellow-700'
                    }`}
                  >
                    <option value="Beklemede">Beklemede</option>
                    <option value="Hazırlanıyor">Hazırlanıyor</option>
                    <option value="Kargoya Verildi">Kargoya Verildi</option>
                    <option value="Teslim Edildi">Teslim Edildi</option>
                    <option value="İptal Edildi">İptal Edildi</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <button className="text-secondary hover:text-primary transition-colors" title="Detayları Gör">
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
