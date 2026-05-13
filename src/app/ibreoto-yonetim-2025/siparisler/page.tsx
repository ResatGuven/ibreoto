// Güncellendi
"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';

export default function AdminSiparislerPage() {
  const [orders, setOrders] = useState<any[]>([]);

  const defaultOrders = [
    { id: 1001, customer: 'Ahmet Yılmaz', total: '₺1.200', status: 'Hazırlanıyor', date: '11.05.2026', cargoNo: '' },
    { id: 1002, customer: 'Mehmet Demir', total: '₺350', status: 'Kargoya Verildi', date: '10.05.2026', cargoNo: 'TR123456789' },
    { id: 1003, customer: 'Ayşe Kaya', total: '₺850', status: 'Teslim Edildi', date: '09.05.2026', cargoNo: 'TR987654321' },
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

  const updateCargoNo = (id: number, cargoNo: string) => {
    const updated = orders.map(order => order.id === id ? { ...order, cargoNo } : order);
    setOrders(updated);
    localStorage.setItem('app_orders', JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100">
      <h1 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 uppercase mb-6">Sipariş Yönetimi</h1>
      
      <div className="bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden shadow-lg">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-[#1F2937] font-heading font-bold text-gray-300 text-xs uppercase">
            <tr>
              <th className="p-4">Sipariş No</th>
              <th className="p-4">Tarih</th>
              <th className="p-4">Müşteri</th>
              <th className="p-4">Toplam</th>
              <th className="p-4">Durum</th>
              <th className="p-4">Kargo No</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-800 hover:bg-[#1F2937]/50 transition-colors">
                <td className="p-4 font-medium text-white">#{order.id}</td>
                <td className="p-4 text-gray-400">{order.date || '11.05.2026'}</td>
                <td className="p-4 text-white font-medium">{order.customer}</td>
                <td className="p-4 font-heading font-bold text-red-500">{order.total}</td>
                <td className="p-4">
                  <select 
                    value={order.status} 
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs font-bold bg-[#1F2937] border outline-none ${
                      order.status === 'Teslim Edildi' ? 'border-green-500 text-green-400' :
                      order.status === 'Kargoya Verildi' ? 'border-blue-500 text-blue-400' :
                      'border-yellow-500 text-yellow-400'
                    }`}
                  >
                    <option value="Beklemede">Beklemede</option>
                    <option value="Hazırlanıyor">Hazırlanıyor</option>
                    <option value="Kargoya Verildi">Kargoya Verildi</option>
                    <option value="Teslim Edildi">Teslim Edildi</option>
                    <option value="İptal Edildi">İptal Edildi</option>
                  </select>
                </td>
                <td className="p-4">
                  <input
                    type="text"
                    value={order.cargoNo || ''}
                    onChange={(e) => updateCargoNo(order.id, e.target.value)}
                    placeholder="Kargo No Girin"
                    className="p-1 bg-[#1F2937] border border-gray-700 rounded text-white text-sm w-32 focus:border-red-500 outline-none transition-all"
                  />
                </td>
                <td className="p-4 text-right">
                  <button className="text-blue-400 hover:text-blue-300 transition-colors" title="Detayları Gör">
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
