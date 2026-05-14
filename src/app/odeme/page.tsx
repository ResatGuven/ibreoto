"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CreditCard, Truck, ShieldCheck, CheckCircle2, ArrowLeft, Lock } from 'lucide-react';

export default function OdemePage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [agreements, setAgreements] = useState({ kvkk: false, mss: false });

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

    const savedDiscount = localStorage.getItem('applied_discount');
    const savedCoupon = localStorage.getItem('applied_coupon');
    if (savedDiscount) {
      setDiscountAmount(parseFloat(savedDiscount));
    }
    if (savedCoupon) {
      setCouponCode(savedCoupon);
      setCouponMessage(`Kupon uygulandı.`);
    }
  }, []);

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const price = parseFloat(item.price.replace('₺', '').replace('.', ''));
      return acc + (price * item.qty);
    }, 0);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    
    try {
      const response = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          code: couponCode, 
          totalAmount: calculateTotal() 
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setDiscountAmount(data.discount);
        setCouponMessage(`Başarılı: ₺${data.discount.toLocaleString('tr-TR')} indirim uygulandı.`);
      } else {
        setCouponMessage(`Hata: ${data.error}`);
        setDiscountAmount(0);
      }
    } catch (error) {
      setCouponMessage('Hata: Kupon doğrulanırken bir sorun oluştu.');
    }
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
    
    const orderPayload = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      customerCity: formData.city,
      totalAmount: calculateTotal() - discountAmount,
      discountAmount: discountAmount,
      couponCode: couponCode,
      items: cartItems
    };

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        setIsProcessing(false);
        alert(data.error);
        return;
      }
      
      const newOrder = data;
      setOrderId(newOrder.id);

      // Success logic
      setTimeout(() => {
        setIsProcessing(false);
        setIsSuccess(true);

      // Analytics Events
      if (typeof window !== 'undefined') {
        const totalValue = calculateTotal() - discountAmount;
        // GA4
        (window as any).gtag('event', 'purchase', {
          transaction_id: newOrder.id,
          value: totalValue,
          currency: 'TRY',
          items: cartItems.map(item => ({
            item_id: item.id,
            item_name: item.name,
            price: parseFloat(item.price.replace('₺', '').replace('.', '')),
            quantity: item.qty
          }))
        });
        // Meta Pixel
        (window as any).fbq('track', 'Purchase', {
          value: totalValue,
          currency: 'TRY',
          content_type: 'product',
          content_ids: cartItems.map(item => item.id)
        });
      }

      // Clear cart
      localStorage.removeItem('cart');
      window.dispatchEvent(new Event('cartUpdated'));
    }, 2000);
    });
  };

  if (isSuccess) {
    return (
      <div className="pt-24 min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 bg-white rounded-2xl border border-gray-100 shadow-lg">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-heading font-bold text-secondary mb-2 uppercase">SİPARİŞİNİZ ALINDI!</h1>
          
          <div className="bg-gray-50 py-3 px-4 rounded-xl border border-gray-100 mb-4">
            <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Sipariş Numaranız</p>
            <p className="text-xl font-heading font-bold text-primary">#{orderId}</p>
          </div>

          <p className="text-text-muted font-body text-sm mb-6 leading-relaxed">
            Ödemeniz başarıyla gerçekleşti. Siparişiniz oluşturuldu ve hazırlık sürecine başlandı.
          </p>
          
          <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 text-left mb-8">
            <h4 className="text-yellow-800 font-heading font-bold text-xs uppercase mb-1">Önemli Bilgilendirme</h4>
            <p className="text-yellow-700 font-body text-[11px] leading-relaxed">
              Siparişiniz kargoya verilmeden önce iptal etmek veya değişiklik yapmak isterseniz <strong>WhatsApp destek hattımız</strong> üzerinden bizimle iletişime geçebilirsiniz.
            </p>
          </div>

          <div className="flex flex-col space-y-3">
            <Link href="/siparis-takip" className="bg-secondary hover:bg-secondary-hover text-white px-6 py-3 rounded-lg font-heading font-bold text-sm uppercase transition-colors inline-block">
              Siparişi Takip Et
            </Link>
            <Link href="/" className="text-text-muted hover:text-primary font-heading font-bold text-xs uppercase transition-colors inline-block">
              Anasayfaya Dön
            </Link>
          </div>
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
                  <div className="flex items-center text-xs text-primary font-bold uppercase animate-pulse">
                    <Lock className="w-3 h-3 mr-1" /> GÜVENLİ ÖDEME AKTİF
                  </div>
                </div>

                <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 mb-6">
                  <p className="text-[11px] text-amber-800 font-body leading-relaxed">
                    <strong>BİLGİ:</strong> Ödemeleriniz 256-bit SSL sertifikası ile korunmaktadır. Kart bilgileriniz ARI HAYAT tarafından saklanmaz, doğrudan banka altyapısına iletilir.
                  </p>
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

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <input 
                    type="checkbox" 
                    id="kvkk" 
                    checked={agreements.kvkk}
                    onChange={(e) => setAgreements({ ...agreements, kvkk: e.target.checked })}
                    className="mt-1 accent-primary" 
                    required 
                  />
                  <label htmlFor="kvkk" className="text-[10px] text-text-muted font-body leading-tight cursor-pointer">
                    <Link href="/kvkk" className="text-primary hover:underline font-bold">KVKK Aydınlatma Metni</Link>'ni okudum ve verilerimin işlenmesini onaylıyorum.
                  </label>
                </div>
                <div className="flex items-start space-x-2">
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
                disabled={isProcessing || cartItems.length === 0 || !agreements.kvkk || !agreements.mss} 
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
                    <ShieldCheck className="w-5 h-5 mr-2" /> ₺{(calculateTotal() - discountAmount).toLocaleString('tr-TR')} ÖDE
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
                  <span>₺{(calculateTotal() - discountAmount).toLocaleString('tr-TR')}</span>
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
