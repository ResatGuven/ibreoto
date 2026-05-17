"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingBag, Phone, MapPin, Calendar, CreditCard, ChevronRight } from 'lucide-react';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get('id');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      router.push('/');
      return;
    }

    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders?id=${orderId}`);
        const data = await res.json();
        if (data && !data.error) {
          setOrder(data);
        }
      } catch (e) {
        console.error('Order fetch error:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        <p className="mt-4 text-secondary font-heading font-bold text-sm uppercase tracking-wider">Sipariş Bilgileri Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background font-body">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div 
          className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-amber-100 flex flex-col items-center text-center mb-8 relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Confetti Glow Backgrounds */}
          <div className="absolute top-[-20%] left-[-20%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-20%] w-[50%] h-[50%] bg-amber-200/20 rounded-full blur-[100px] pointer-events-none" />

          {/* Icon */}
          <motion.div 
            className="w-24 h-24 bg-amber-50 rounded-full flex items-center justify-center text-primary mb-6 shadow-inner"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          >
            <CheckCircle className="w-14 h-14" />
          </motion.div>

          <span className="text-[10px] bg-green-50 text-green-600 px-4 py-1.5 rounded-full font-heading font-black tracking-widest uppercase mb-4">
            ÖDEME ONAYLANDI
          </span>
          <h1 className="text-3xl md:text-5xl font-heading font-black text-secondary mb-4 uppercase tracking-tighter">
            SİPARİŞİNİZ ALINDI!
          </h1>
          <p className="text-text-muted text-sm md:text-base max-w-md mb-8 leading-relaxed">
            Harika bir tercih yaptınız! Doğal arı ürünleriniz özenle paketlenip en kısa sürede kargoya teslim edilecektir.
          </p>

          {/* Quick Invoice/Summary */}
          {order && (
            <div className="w-full bg-surface border border-gray-100 rounded-2xl p-6 text-left space-y-4 mb-8 font-body">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-4 border-b border-gray-100 gap-2">
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">SİPARİŞ KODU</span>
                  <span className="font-heading font-bold text-secondary text-sm">#{order.id}</span>
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">SİPARİŞ TARİHİ</span>
                  <div className="flex items-center text-secondary text-sm font-semibold mt-0.5">
                    <Calendar className="w-3.5 h-3.5 mr-1 text-primary" /> {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Shipping Details */}
                <div className="space-y-2">
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block">TESLİMAT ADRESİ</span>
                  <div className="flex items-start text-xs text-text-muted">
                    <MapPin className="w-4 h-4 mr-2 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-secondary">{order.customerName}</p>
                      <p className="mt-0.5 leading-tight">{order.customerAddress}</p>
                      <p className="font-semibold text-secondary mt-1">{order.customerCity}</p>
                      <p className="mt-0.5">{order.customerPhone}</p>
                    </div>
                  </div>
                </div>

                {/* Payment summary */}
                <div className="space-y-3 bg-amber-50/30 p-4 rounded-xl border border-amber-100/50">
                  <span className="text-[10px] text-primary font-bold uppercase tracking-widest block">ÖDEME DETAYLARI</span>
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-text-muted">
                      <span>Ödeme Tipi:</span>
                      <span className="font-semibold text-secondary flex items-center">
                        <CreditCard className="w-3 h-3 mr-1 text-primary" /> Kredi Kartı / Havale
                      </span>
                    </div>
                    {order.couponCode && (
                      <div className="flex justify-between text-green-600">
                        <span>Kupon:</span>
                        <span className="font-bold uppercase">{order.couponCode}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-secondary font-bold text-sm pt-1.5 border-t border-amber-200/50">
                      <span>Ödenen Tutar:</span>
                      <span className="text-primary text-base">₺{order.totalAmount.toLocaleString('tr-TR')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link 
              href={`/siparis-takip?id=${orderId}`}
              className="bg-secondary hover:bg-secondary-hover text-white px-8 py-4 rounded-xl font-heading font-bold text-xs uppercase transition-colors tracking-widest flex items-center justify-center shadow-lg shadow-secondary/15"
            >
              Sipariş Takibi <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <Link 
              href="/urunler"
              className="bg-primary hover:bg-primary-hover text-secondary px-8 py-4 rounded-xl font-heading font-bold text-xs uppercase transition-colors tracking-widest flex items-center justify-center shadow-lg shadow-primary/20"
            >
              <ShoppingBag className="w-4 h-4 mr-2" /> Alışverişe Devam Et
            </Link>
          </div>
        </motion.div>

        {/* Support Callout */}
        <div className="bg-amber-50 rounded-2xl p-6 border border-amber-100 flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-green-500 shadow-sm border border-green-100 flex-shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-heading font-bold text-secondary text-sm">Bir sorunuz mu var?</h4>
              <p className="text-text-muted text-xs font-body mt-0.5">7/24 WhatsApp destek hattımızdan siparişiniz hakkında bilgi alabilirsiniz.</p>
            </div>
          </div>
          <a 
            href={`https://wa.me/905353377251?text=Sipariş%20No%3A%20%23${orderId}%20hakkında%20bilgi%20almak%20istiyorum.`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white font-heading font-bold text-[10px] uppercase tracking-wider px-5 py-2.5 rounded-lg transition-colors inline-block"
          >
            WhatsApp Destek
          </a>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        <p className="mt-4 text-secondary font-heading font-bold text-sm uppercase tracking-wider">Sipariş Bilgileri Yükleniyor...</p>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
