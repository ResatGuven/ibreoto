"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CreditCard, Truck, ShieldCheck, CheckCircle2, ArrowLeft, Lock } from 'lucide-react';

export default function OdemePage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  });

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price.replace('₺', '').replace('.', ''));
      return acc + (price * item.qty);
    }, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    let value = e.target.value;
    
    // Auto-format card number (add spaces every 4 digits)
    if (e.target.name === 'cardNumber') {
      value = value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    
    // Auto-format expiry (add / after 2 digits)
    if (e.target.name === 'cardExpiry') {
      value = value.replace(/\//g, '');
      if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
      }
    }

    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Save order to localStorage for Admin Panel
    const savedOrders = localStorage.getItem('app_orders');
    let orders = savedOrders ? JSON.parse(savedOrders) : [];
    const newOrder = {
      id: Date.now(),
      customer: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: `${formData.address}, ${formData.city}`,
      total: `₺${calculateTotal().toLocaleString('tr-TR')}`,
      date: new Date().toLocaleDateString('tr-TR'),
      status: 'Beklemede',
      items: cartItems
    };
    orders.unshift(newOrder); // Add to top
    localStorage.setItem('app_orders', JSON.stringify(orders));

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      // Clear cart
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="pt-24 min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl border border-gray-100 shadow-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-secondary mb-2 uppercase">SİPARİŞİNİZ ALINDI!</h1>
          <p className="text-text-muted font-body text-sm mb-6">
            Ödemeniz başarıyla gerçekleşti. Siparişiniz oluşturuldu ve yönetim paneline iletildi.
          </p>
          <Link href="/" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-lg font-heading font-bold text-sm uppercase transition-colors inline-block">
            Alışverişe Devam Et
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/sepet" className="text-text-muted hover:text-primary transition-colors flex items-center font-body text-sm">
            <ArrowLeft className="w-4 h-4 mr-1" /> Sepete Geri Dön
          </Link>
          <h1 className="text-3xl font-heading font-bold text-secondary mt-2 uppercase">GÜVENLİ ÖDEME</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Kişisel Bilgiler */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center mb-4 text-secondary">
                  <Truck className="w-5 h-5 mr-2" />
                  <h2 className="text-lg font-heading font-bold uppercase">Teslimat Bilgileri</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-muted mb-1 text-xs font-body uppercase">Ad Soyad</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" required />
                  </div>
                  <div>
                    <label className="block text-text-muted mb-1 text-xs font-body uppercase">E-Posta</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" required />
                  </div>
                  <div>
                    <label className="block text-text-muted mb-1 text-xs font-body uppercase">Telefon</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} maxLength={11} placeholder="05XXXXXXXXX" className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" required />
                  </div>
                  <div>
                    <label className="block text-text-muted mb-1 text-xs font-body uppercase">Şehir</label>
                    <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-text-muted mb-1 text-xs font-body uppercase">Açık Adres</label>
                    <textarea name="address" value={formData.address} onChange={handleInputChange} rows={3} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" required></textarea>
                  </div>
                </div>
              </div>

              {/* Kart Bilgileri */}
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-4 text-secondary">
                  <div className="flex items-center">
                    <CreditCard className="w-5 h-5 mr-2" />
                    <h2 className="text-lg font-heading font-bold uppercase">Kart Bilgileri</h2>
                  </div>
                  <div className="flex items-center text-xs text-text-muted">
                    <Lock className="w-3 h-3 mr-1" /> SSL Korumalı
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-text-muted mb-1 text-xs font-body uppercase">Kart Üzerindeki İsim</label>
                    <input type="text" name="cardName" value={formData.cardName} onChange={handleInputChange} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" required />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-text-muted mb-1 text-xs font-body uppercase">Kart Numarası</label>
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" maxLength={19} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" required />
                  </div>
                  <div>
                    <label className="block text-text-muted mb-1 text-xs font-body uppercase">S.K.T (AA/YY)</label>
                    <input type="text" name="cardExpiry" value={formData.cardExpiry} onChange={handleInputChange} placeholder="MM/YY" maxLength={5} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" required />
                  </div>
                  <div>
                    <label className="block text-text-muted mb-1 text-xs font-body uppercase">CVV</label>
                    <input type="text" name="cardCvv" value={formData.cardCvv} onChange={handleInputChange} placeholder="000" maxLength={3} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" required />
                  </div>
                </div>
              </div>

              <button type="submit" disabled={isProcessing || cartItems.length === 0} className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-lg font-heading font-bold uppercase transition-colors flex items-center justify-center shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
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
                    <ShieldCheck className="w-5 h-5 mr-2" /> ₺{calculateTotal().toLocaleString('tr-TR')} ÖDE
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
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="flex justify-between items-center text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-secondary truncate max-w-[120px]">{item.name}</span>
                      <span className="text-text-muted">x{item.qty}</span>
                    </div>
                    <span className="font-heading font-bold text-secondary">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-200 pt-4 space-y-2 text-sm font-body">
                <div className="flex justify-between text-text-muted">
                  <span>Ara Toplam</span>
                  <span>₺{calculateTotal().toLocaleString('tr-TR')}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Kargo</span>
                  <span>Ücretsiz</span>
                </div>
                <div className="flex justify-between font-heading font-bold text-lg text-secondary pt-2">
                  <span>Toplam</span>
                  <span>₺{calculateTotal().toLocaleString('tr-TR')}</span>
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
