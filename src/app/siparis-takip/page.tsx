"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package, MapPin, Calendar, Clock, ShoppingBag, Truck, AlertCircle } from 'lucide-react';

export default function SiparisTakipPage() {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrderInfo(null);

    try {
      const res = await fetch(`/api/orders/track?orderId=${encodeURIComponent(orderId.trim())}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Sipariş bulunamadı.');
      }
      setOrderInfo(data.order);
    } catch (err: any) {
      setError(err.message || 'Sipariş sorgulanırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background font-body">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-8 uppercase border-b-4 border-primary pb-2">Sipariş Takibi</h1>
          
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Sipariş Numaranız (Örn: #cuid)" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="flex-1 bg-surface border border-gray-200 rounded-xl p-4 outline-none focus:border-primary transition-all font-body text-lg"
                required
              />
              <button 
                type="submit" 
                disabled={loading}
                className="bg-primary hover:bg-primary/95 text-secondary px-8 py-4 rounded-xl font-heading font-bold uppercase transition-all shadow-lg shadow-primary/20 flex items-center justify-center min-w-[180px]"
              >
                {loading ? 'Aranıyor...' : <><Search className="w-5 h-5 mr-2" /> SORGULA</>}
              </button>
            </div>
          </form>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center space-x-3 mb-8"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0 text-red-500" />
                <p className="text-sm font-semibold">{error}</p>
              </motion.div>
            )}

            {orderInfo && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="space-y-8"
              >
                <div className="bg-surface p-8 rounded-2xl border border-gray-200 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-start space-x-4">
                    <Package className="text-primary w-8 h-8" />
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sipariş Durumu</p>
                      <p className="text-lg font-heading font-bold text-secondary uppercase">{orderInfo.status}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Calendar className="text-primary w-8 h-8" />
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sipariş Tarihi</p>
                      <p className="text-lg font-heading font-bold text-secondary">
                        {new Date(orderInfo.createdAt).toLocaleDateString('tr-TR', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <Truck className="text-primary w-8 h-8" />
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Kargo Takip No</p>
                      <p className="text-lg font-heading font-bold text-secondary">{orderInfo.cargoNo}</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <MapPin className="text-primary w-8 h-8" />
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Teslimat Adresi</p>
                      <p className="text-sm font-semibold text-secondary">{orderInfo.customerAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Sipariş Edilen Ürünler */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <h3 className="text-lg font-heading font-bold text-secondary mb-4 flex items-center uppercase">
                    <ShoppingBag className="w-5 h-5 mr-2 text-primary" /> Sipariş İçeriği
                  </h3>
                  <div className="divide-y divide-gray-100">
                    {orderInfo.items.map((item: any, idx: number) => (
                      <div key={idx} className="py-4 flex justify-between items-center text-sm">
                        <div className="flex items-center space-x-3">
                          {item.image && (
                            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg border border-gray-100" />
                          )}
                          <div>
                            <p className="font-heading font-bold text-secondary">{item.name}</p>
                            <p className="text-xs text-gray-500">Miktar: {item.quantity} adet</p>
                          </div>
                        </div>
                        <p className="font-bold text-secondary">₺{(item.price * item.quantity).toLocaleString('tr-TR')}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 mt-4 pt-4 flex justify-between items-center">
                    <span className="font-heading font-bold text-secondary uppercase">Toplam Ödeme</span>
                    <span className="text-xl font-heading font-bold text-primary">₺{orderInfo.totalAmount.toLocaleString('tr-TR')}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
