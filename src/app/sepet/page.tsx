"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingBag, Truck, ArrowRight, ShieldCheck } from 'lucide-react';

const FREE_SHIPPING_THRESHOLD = 1000;

export default function SepetPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  useEffect(() => {
    const savedDiscount = localStorage.getItem('applied_discount');
    const savedCoupon = localStorage.getItem('applied_coupon');
    if (savedDiscount) {
      setDiscountAmount(parseFloat(savedDiscount));
    }
    if (savedCoupon) {
      setCouponCode(savedCoupon);
      setCouponMessage(`Kupon uygulandı: ${savedCoupon}`);
    }
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };

    updateCart();
    window.addEventListener('cartUpdated', updateCart);
    window.addEventListener('storage', updateCart);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCart);
      window.removeEventListener('storage', updateCart);
    };
  }, []);

  const removeItem = (id: any) => {
    const updated = cartItems.filter(item => String(item.id) !== String(id));
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const updateQty = (id: any, newQty: number) => {
    if (newQty < 1) return;
    const updated = cartItems.map(item => 
      String(item.id) === String(id) ? { ...item, qty: newQty } : item
    );
    setCartItems(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => {
      const priceStr = String(item.price).replace('₺', '').replace('.', '').replace(' TL', '').trim();
      const price = parseFloat(priceStr);
      return acc + (price * item.qty);
    }, 0);
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) return;
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: couponCode })
      });
      const data = await res.json();

      if (data.valid) {
        const total = calculateTotal();
        let discount = 0;
        if (data.type === 'percentage') {
          discount = (total * data.discount) / 100;
        } else {
          discount = data.discount;
        }
        setDiscountAmount(discount);
        localStorage.setItem('applied_discount', discount.toString());
        localStorage.setItem('applied_coupon', couponCode);
        setCouponMessage(`Başarılı: ₺${discount.toLocaleString('tr-TR')} indirim uygulandı.`);
      } else {
        setCouponMessage(`Hata: ${data.message || 'Geçersiz kupon kodu.'}`);
        handleRemoveCoupon();
      }
    } catch (error) {
      setCouponMessage('Hata: Kupon doğrulanırken bir sorun oluştu.');
    }
  };

  const handleRemoveCoupon = () => {
    setDiscountAmount(0);
    setCouponCode('');
    setCouponMessage('');
    localStorage.removeItem('applied_discount');
    localStorage.removeItem('applied_coupon');
  };

  const totalAmount = calculateTotal();
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - totalAmount);
  const freeShippingPercentage = Math.min(100, (totalAmount / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <div className="pt-24 min-h-screen bg-surface/30">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-surface pb-6 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary uppercase tracking-tight">SEPETİNİZ</h1>
            <p className="text-text-muted font-body text-sm mt-1 uppercase tracking-widest">Seçtiğiniz şifa kaynakları burada</p>
          </div>
          <Link href="/urunler" className="text-text-muted hover:text-primary font-heading font-bold uppercase text-xs flex items-center transition-colors group">
            ALIŞVERİŞE DEVAM ET <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-surface shadow-sm">
            <div className="w-24 h-24 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-gray-300" />
            </div>
            <p className="text-text-muted font-body text-lg mb-8">Sepetiniz şu anda boş. Size en uygun şifa kaynağını keşfedin.</p>
            <Link href="/urunler" className="bg-primary hover:bg-primary-hover text-secondary px-10 py-4 rounded-2xl font-heading font-bold uppercase transition-all shadow-lg shadow-primary/20 transform hover:scale-105">
              Ürünleri Keşfet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {/* Free Shipping Progress */}
              <div className="bg-white p-6 rounded-2xl border border-surface shadow-sm overflow-hidden relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center font-heading font-bold text-xs uppercase tracking-widest text-secondary">
                    <Truck className="w-4 h-4 mr-2 text-primary" />
                    {remainingForFreeShipping > 0 
                      ? `ÜCRETSİZ KARGO İÇİN ₺${remainingForFreeShipping.toLocaleString('tr-TR')} KALDI` 
                      : 'TEBRİKLER! KARGONUZ ÜCRETSİZ!'}
                  </div>
                  <span className="text-[10px] font-bold text-primary font-body">%{freeShippingPercentage.toFixed(0)}</span>
                </div>
                <div className="h-2 w-full bg-surface rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-1000 ease-out" 
                    style={{ width: `${freeShippingPercentage}%` }}
                  ></div>
                </div>
                {remainingForFreeShipping > 0 && (
                  <p className="text-[10px] text-text-muted mt-3 font-body">
                    Sepetinize <span className="font-bold text-secondary">₺{remainingForFreeShipping.toLocaleString('tr-TR')}</span> değerinde ürün ekleyerek kargo ücretinden tasarruf edebilirsiniz.
                  </p>
                )}
              </div>

              <div className="space-y-4">
                {cartItems.map((item, index) => (
                  <div key={`${item.id}-${index}`} className="bg-white p-4 md:p-6 rounded-2xl border border-surface shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 group hover:border-primary/20 transition-colors">
                    <div className="flex items-center space-x-6 w-full sm:w-auto">
                      <div className="w-20 h-20 bg-surface/50 rounded-xl flex items-center justify-center p-2 flex-shrink-0 border border-surface">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500" />
                        ) : (
                          <span className="text-[10px] text-text-muted font-heading uppercase">Görsel</span>
                        )}
                      </div>
                      <div>
                        <h2 className="font-heading font-bold text-secondary uppercase text-sm mb-1 leading-tight">{item.name}</h2>
                        <p className="text-primary font-body font-bold">{String(item.price).includes('₺') ? item.price : `₺${item.price}`}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between w-full sm:w-auto sm:space-x-8">
                      <div className="flex items-center border-2 border-surface rounded-xl overflow-hidden h-11 bg-white">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-10 h-full hover:bg-surface font-bold transition-colors">-</button>
                        <div className="w-10 h-full flex items-center justify-center font-body font-bold text-sm border-x border-surface">{item.qty}</div>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-10 h-full hover:bg-surface font-bold transition-colors">+</button>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="hidden sm:block text-right">
                          <p className="text-[10px] text-text-muted font-heading uppercase mb-1">Ara Toplam</p>
                          <p className="font-body font-bold text-secondary">₺{(parseFloat(String(item.price).replace('₺', '').replace('.', '').trim()) * item.qty).toLocaleString('tr-TR')}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="w-10 h-10 flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Summary */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-surface shadow-sm h-fit sticky top-28">
                <h2 className="text-lg font-heading font-bold text-secondary mb-6 uppercase tracking-widest border-b border-surface pb-4">SİPARİŞ ÖZETİ</h2>
                
                <div className="space-y-4 mb-8 text-sm font-body">
                  <div className="flex justify-between text-text-muted">
                    <span>Ara Toplam</span>
                    <span className="font-bold text-secondary">₺{calculateTotal().toLocaleString('tr-TR')}</span>
                  </div>
                  
                  {/* Coupon Code */}
                  <div className="py-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                        placeholder="Kupon Kodu"
                        className="flex-grow p-3 border border-surface rounded-xl focus:border-primary outline-none text-xs bg-surface/20 uppercase font-bold tracking-widest"
                      />
                      <button
                        type="button"
                        onClick={handleApplyCoupon}
                        className="bg-secondary hover:bg-secondary-hover text-white px-5 py-2 rounded-xl font-heading font-bold text-[10px] uppercase transition-all shadow-md shadow-secondary/10"
                      >
                        Uygula
                      </button>
                    </div>
                    {couponMessage && (
                      <div className="flex items-center justify-between mt-3 px-1">
                        <p className={`text-[10px] font-bold ${couponMessage.startsWith('Hata') ? 'text-red-500' : 'text-green-600'}`}>
                          {couponMessage}
                        </p>
                        {!couponMessage.startsWith('Hata') && (
                          <button 
                            onClick={handleRemoveCoupon}
                            className="text-[10px] text-red-500 hover:underline font-bold uppercase"
                          >
                            Kaldır
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600 font-bold">
                      <span>İndirim</span>
                      <span>-₺{discountAmount.toLocaleString('tr-TR')}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-text-muted">
                    <span>Kargo Ücreti</span>
                    <span className={totalAmount >= FREE_SHIPPING_THRESHOLD ? "text-green-600 font-bold" : "text-secondary font-bold"}>
                      {totalAmount >= FREE_SHIPPING_THRESHOLD ? 'ÜCRETSİZ' : '₺59,90'}
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-surface mb-8">
                  <div className="flex justify-between font-heading font-bold text-2xl text-primary">
                    <span>TOPLAM</span>
                    <span>₺{(calculateTotal() - discountAmount + (totalAmount >= FREE_SHIPPING_THRESHOLD ? 0 : 59.90)).toLocaleString('tr-TR')}</span>
                  </div>
                </div>
                
                <Link href="/odeme" className="w-full bg-primary hover:bg-primary-hover text-secondary h-14 rounded-2xl font-heading font-bold uppercase flex items-center justify-center transition-all shadow-lg shadow-primary/20 transform hover:scale-[1.02] mb-6">
                  GÜVENLİ ÖDEMEYE GEÇ <ArrowRight className="ml-2 w-5 h-5" />
                </Link>

                <div className="flex flex-col items-center justify-center space-y-4 pt-4 border-t border-surface/50">
                  <div className="flex items-center text-[10px] text-text-muted font-bold uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4 mr-2 text-green-600" /> 256-Bit SSL GÜVENLİ ÖDEME
                  </div>
                  <div className="flex space-x-2 grayscale opacity-50">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-3" alt="Visa" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-3" alt="Mastercard" />
                    <img src="https://www.troyodeme.com/images/troy-logo.png" className="h-3" alt="Troy" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
