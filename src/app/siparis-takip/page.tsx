"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, MapPin, Calendar, Clock } from 'lucide-react';

export default function SiparisTakipPage() {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderInfo, setOrderInfo] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setLoading(false);
      // Mock result
      if (orderId) {
        setOrderInfo({
          id: orderId,
          status: 'Kargoya Verildi',
          date: '12.05.2026',
          location: 'Bursa Lojistik Merkezi',
          estimatedDelivery: '15.05.2026'
        });
      }
    }, 1000);
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
          
          <form onSubmit={handleSearch} className="mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Sipariş Numaranız (Örn: #12345)" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                className="flex-1 bg-surface border border-gray-200 rounded-xl p-4 outline-none focus:border-primary transition-all font-body text-lg"
                required
              />
              <button 
                type="submit" 
                disabled={loading}
                className="bg-primary hover:bg-primary-hover text-secondary px-8 py-4 rounded-xl font-heading font-bold uppercase transition-all shadow-lg shadow-primary/20 flex items-center justify-center min-w-[180px]"
              >
                {loading ? 'Aranıyor...' : <><Search className="w-5 h-5 mr-2" /> SORGULA</>}
              </button>
            </div>
          </form>

          {orderInfo && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-surface p-8 rounded-2xl border border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4">
                  <Package className="text-primary w-8 h-8" />
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sipariş Durumu</p>
                    <p className="text-xl font-heading font-bold text-secondary">{orderInfo.status}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Calendar className="text-primary w-8 h-8" />
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Sipariş Tarihi</p>
                    <p className="text-xl font-heading font-bold text-secondary">{orderInfo.date}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin className="text-primary w-8 h-8" />
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Son İşlem Yeri</p>
                    <p className="text-xl font-heading font-bold text-secondary">{orderInfo.location}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Clock className="text-primary w-8 h-8" />
                  <div>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Tahmini Teslimat</p>
                    <p className="text-xl font-heading font-bold text-secondary">{orderInfo.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
