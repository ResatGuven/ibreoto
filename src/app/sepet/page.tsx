"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingBag } from 'lucide-react';

export default function SepetPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

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
      // Remove currency symbol and dots for calculation
      const priceStr = item.price.replace('₺', '').replace('.', '').replace(' TL', '').trim();
      const price = parseFloat(priceStr);
      return acc + (price * item.qty);
    }, 0);
  };

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-heading font-bold text-secondary mb-6 uppercase">Sepetiniz</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-100 shadow-sm">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-text-muted font-body text-lg mb-6">Sepetiniz şu anda boş.</p>
            <Link href="/urunler" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-heading font-bold uppercase transition-colors">
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div key={`${item.id}-${index}`} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-surface rounded-lg flex items-center justify-center text-xs text-text-muted">
                      {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover rounded-lg" /> : '[Görsel]'}
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-secondary uppercase text-sm">{item.name}</h2>
                      <p className="text-primary font-heading font-bold">{item.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-10">
                      <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 hover:bg-surface font-bold">-</button>
                      <div className="px-3 font-body font-bold text-sm">{item.qty}</div>
                      <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 hover:bg-surface font-bold">+</button>
                    </div>
                    
                    <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Summary */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
              <h2 className="text-xl font-heading font-bold text-secondary mb-4 uppercase">Sipariş Özeti</h2>
              <div className="border-b border-gray-100 pb-4 mb-4 space-y-2 text-sm font-body">
                <div className="flex justify-between text-text-muted">
                  <span>Ara Toplam</span>
                  <span>₺{calculateTotal().toLocaleString('tr-TR')}</span>
                </div>
                <div className="flex justify-between text-text-muted">
                  <span>Kargo</span>
                  <span>Ücretsiz</span>
                </div>
              </div>
              <div className="flex justify-between font-heading font-bold text-lg text-secondary mb-6">
                <span>Toplam</span>
                <span>₺{calculateTotal().toLocaleString('tr-TR')}</span>
              </div>
              
              <Link href="/odeme" className="w-full bg-primary hover:bg-primary-hover text-white py-3 rounded-xl font-heading font-bold uppercase text-center block transition-colors shadow-lg shadow-primary/20">
                Ödemeye Geç
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
