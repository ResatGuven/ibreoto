"use client";


import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye } from 'lucide-react';

export default function AdminSiparislerPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders');
      const data = await res.json();
      if (!data.error) setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      if (res.ok) {
        setOrders(orders.map(order => order.id === id ? { ...order, status: newStatus } : order));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const updateCargoNo = (id: string, cargoNo: string) => {
    // Placeholder for now as cargoNo is not in DB yet
    setOrders(orders.map(order => order.id === id ? { ...order, cargoNo } : order));
  };

  return (
    <div className="p-6 bg-background min-h-screen text-text-main">
      <h1 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-700 uppercase mb-6">Sipariş Yönetimi</h1>
      
      <div className="bg-white border-gray-200 shadow-sm backdrop-blur-xl rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left font-body text-sm">
          <thead className="bg-gray-50 border-gray-200 font-heading font-bold text-text-main text-xs uppercase">
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
          <tbody className="text-text-main">
            {orders.map((order) => (
              <tr key={order.id} className="border-t border-gray-200 hover:bg-gray-50 border-gray-200/50 transition-colors">
                <td className="p-4 font-medium text-secondary">#{order.id}</td>
                <td className="p-4 text-text-muted">{order.date || '11.05.2026'}</td>
                <td className="p-4 text-secondary font-medium">{order.customer}</td>
                <td className="p-4 font-heading font-bold text-primary">{order.total}</td>
                <td className="p-4">
                  <select 
                    value={order.status} 
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-xs font-bold bg-gray-50 border-gray-200 border outline-none ${
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
                    className="p-1 bg-gray-50 border-gray-200 border border-gray-200 rounded text-secondary text-sm w-32 focus:border-primary outline-none transition-all"
                  />
                </td>
                <td className="p-4 text-right">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-400 hover:text-blue-300 transition-colors" 
                    title="Detayları Gör"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border-gray-200 shadow-sm border border-gray-200 rounded-2xl p-6 max-w-lg w-full shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-heading font-bold text-secondary uppercase">Sipariş Detayı</h2>
              <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-secondary text-2xl">&times;</button>
            </div>
            <div className="space-y-3 text-sm font-body">
              <p><span className="text-gray-500">Sipariş No:</span> <span className="text-primary font-medium font-heading">#{selectedOrder.id}</span></p>
              <p><span className="text-gray-500">Tarih:</span> <span className="text-secondary">{selectedOrder.date || '11.05.2026'}</span></p>
              <p><span className="text-gray-500">Müşteri:</span> <span className="text-secondary font-medium">{selectedOrder.customer}</span></p>
              <p><span className="text-gray-500">E-Posta:</span> <span className="text-secondary">{selectedOrder.email || 'Belirtilmemiş'}</span></p>
              <p><span className="text-gray-500">Telefon:</span> <span className="text-secondary">{selectedOrder.phone || 'Belirtilmemiş'}</span></p>
              <p><span className="text-gray-500">Adres:</span> <span className="text-secondary">{selectedOrder.address || 'Belirtilmemiş'}</span></p>
              <p><span className="text-gray-500">Toplam:</span> <span className="text-primary font-bold font-heading">{selectedOrder.total}</span></p>
              <p><span className="text-gray-500">Durum:</span> <span className="text-secondary">{selectedOrder.status}</span></p>
              <p><span className="text-gray-500">Kargo No:</span> <span className="text-secondary">{selectedOrder.cargoNo || 'Girilmemiş'}</span></p>
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-gray-500 mb-2 font-medium">Satın Alınan Ürünler:</p>
                {selectedOrder.items ? (
                  <ul className="space-y-2">
                    {selectedOrder.items.map((item: any, index: number) => (
                      <li key={index} className="text-secondary flex justify-between items-center bg-gray-50 border-gray-200 p-2 rounded">
                        <span>{item.name} <span className="text-gray-500">x{item.qty}</span></span>
                        <span className="text-primary font-heading font-bold">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-600 text-xs">Ürün detayı bulunamadı.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
