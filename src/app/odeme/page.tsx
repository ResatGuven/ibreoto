"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, CreditCard, ChevronRight, ArrowLeft } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getTotalPrice } = useCartStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponMessage, setCouponMessage] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    district: '',
    note: ''
  });

  const [agreements, setAgreements] = useState({
    kvkk: false,
    mss: false
  });

  useEffect(() => {
    if (items.length === 0) {
      // router.push('/sepet'); // Keep it on page for now to avoid redirect loop during dev
    }
  }, [items, router]);

  const handleApplyCoupon = () => {
    if (couponCode === 'ARI2026') {
      const discount = getTotalPrice() * 0.1;
      setDiscountAmount(discount);
      setCouponMessage('Kupon uygulandı: %10 indirim!');
    } else {
      setCouponMessage('Hata: Geçersiz kupon kodu.');
      setDiscountAmount(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreements.kvkk || !agreements.mss) return;

    setIsProcessing(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          items: items,
          total: getTotalPrice() - discountAmount,
          coupon: couponCode
        })
      });

      const data = await response.json();
      if (data.success) {
        clearCart();
        router.push(`/siparis-basarili?id=${data.orderId}`);
      } else {
        alert('Ödeme sırasında bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Sistem hatası. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Sol Kolon: Form */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-heading font-bold text-secondary mb-8 uppercase flex items-center">
              <CreditCard className="mr-3 text-primary" /> ÖDEME BİLGİLERİ
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-heading font-bold text-secondary mb-6 uppercase border-b border-gray-100 pb-2">İletişim & Teslimat</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-heading font-bold text-gray-500 uppercase tracking-widest">Ad Soyad</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-surface border border-gray-200 rounded-lg p-3 outline-none focus:border-primary transition-colors font-body" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-heading font-bold text-gray-500 uppercase tracking-widest">E-posta</label>
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-surface border border-gray-200 rounded-lg p-3 outline-none focus:border-primary transition-colors font-body" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-heading font-bold text-gray-500 uppercase tracking-widest">Telefon</label>
                    <input 
                      type="tel" 
                      required 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-surface border border-gray-200 rounded-lg p-3 outline-none focus:border-primary transition-colors font-body" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-heading font-bold text-gray-500 uppercase tracking-widest">Şehir</label>
                    <input 
                      type="text" 
                      required 
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full bg-surface border border-gray-200 rounded-lg p-3 outline-none focus:border-primary transition-colors font-body" 
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-xs font-heading font-bold text-gray-500 uppercase tracking-widest">Adres</label>
                    <textarea 
                      required 
                      rows={3}
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full bg-surface border border-gray-200 rounded-lg p-3 outline-none focus:border-primary transition-colors font-body resize-none" 
                    />
                  </div>
                </div>
              </div>

              {/* Sözleşmeler */}
              <div className="space-y-4 px-2">
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    id="kvkk" 
                    checked={agreements.kvkk}
                    onChange={(e) => setAgreements({ ...agreements, kvkk: e.target.checked })}
                    className="mt-1 accent-primary" 
                    required 
                  />
                  <label htmlFor="kvkk" className="text-[10px] text-text-muted font-body leading-tight cursor-pointer">
                    <Link href="/kvkk" className="text-primary hover:underline font-bold">KVKK Aydınlatma Metni</Link>'ni ve <Link href="/acik-riza-beyani" className="text-primary hover:underline font-bold">Açık Rıza Beyanı</Link>'nı okudum, onaylıyorum.
                  </label>
                </div>
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    id="mss" 
                    checked={agreements.mss}
                    onChange={(e) => setAgreements({ ...agreements, mss: e.target.checked })}
                    className="mt-1 accent-primary" 
                    required 
                  />
                  <label htmlFor="mss" className="text-[10px] text-text-muted font-body leading-tight cursor-pointer">
                    <Link href="/mesafeli-satis-sozlesmesi" className="text-primary hover:underline font-bold">Mesafeli Satış Sözleşmesi</Link>'ni ve <Link href="/iade-kosullari" className="text-primary hover:underline font-bold">İade Koşullarını</Link> okudum, onaylıyorum.
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isProcessing || items.length === 0 || !agreements.kvkk || !agreements.mss} 
                className="w-full bg-primary hover:bg-primary-hover text-secondary py-4 rounded-lg font-heading font-bold uppercase transition-colors flex items-center justify-center shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    İşleniyor...
                  </span>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5 mr-2" /> ₺{(getTotalPrice() - discountAmount).toLocaleString('tr-TR')} ÖDE
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Sipariş Özeti */}
          <div className="lg:col-span-1">
            <div className="bg-surface p-6 rounded-xl sticky top-24 border border-gray-100">
              <h2 className="text-xl font-heading font-bold text-secondary mb-4 uppercase">Sipariş Özeti</h2>
              <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                {items.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-secondary truncate max-w-[120px]">{item.name}</span>
                      <span className="text-text-muted">x{item.quantity}</span>
                    </div>
                    <span className="font-heading font-bold text-secondary">₺{item.price.toLocaleString('tr-TR')}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2 text-sm font-body">
                <div className="flex justify-between text-text-muted">
                  <span>Ara Toplam</span>
                  <span>₺{getTotalPrice().toLocaleString('tr-TR')}</span>
                </div>
                {/* Kupon Kodu */}
                <div className="mt-2 mb-2 flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Kupon Kodu"
                    className="w-full p-2 border border-gray-200 rounded-lg focus:border-primary outline-none text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-secondary hover:bg-secondary-hover text-white px-3 py-1 rounded-lg font-heading font-bold text-xs uppercase transition-colors"
                  >
                    Uygula
                  </button>
                </div>
                {couponMessage && (
                  <p className={`text-xs mt-1 ${couponMessage.startsWith('Hata') ? 'text-red-500' : 'text-green-500'}`}>
                    {couponMessage}
                  </p>
                )}
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>İndirim</span>
                    <span>-₺{discountAmount.toLocaleString('tr-TR')}</span>
                  </div>
                )}
                <div className="flex justify-between text-text-muted">
                  <span>Kargo</span>
                  <span>Ücretsiz</span>
                </div>
                <div className="flex justify-between font-heading font-bold text-lg text-secondary pt-2">
                  <span>Toplam</span>
                  <span>₺{(getTotalPrice() - discountAmount).toLocaleString('tr-TR')}</span>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-center text-xs text-text-muted">
                <ShieldCheck className="w-4 h-4 mr-1 text-green-500" /> %100 Güvenli Alışveriş Altyapısı
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
