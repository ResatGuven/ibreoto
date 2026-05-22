"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';

export default function FavorilerPage() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter(p => String(p.id) !== String(id));
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const addToCart = (product: any) => {
    const savedCart = localStorage.getItem('cart');
    let cart = savedCart ? JSON.parse(savedCart) : [];
    
    const existing = cart.find((item: any) => String(item.id) === String(product.id));
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1, price: `₺${product.price}` });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${product.name} sepete eklendi!`);
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-background honeycomb-bg font-body">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-heading font-bold text-secondary uppercase tracking-tight">Favorilerim</h1>
          <span className="text-text-muted text-sm">{favorites.length} Ürün Listeleniyor</span>
        </div>

        {favorites.length === 0 ? (
          <div className="text-center py-20 bg-white/50 backdrop-blur-md rounded-2xl border border-dashed border-primary/20">
            <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h3 className="text-xl font-heading font-bold text-secondary uppercase mb-2">Favori Listeniz Boş</h3>
            <p className="text-text-muted text-sm mb-8">Henüz hiçbir ürünü favorilerinize eklemediniz.</p>
            <Link 
              href="/urunler" 
              className="inline-flex items-center bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-xl font-heading font-bold uppercase transition-all shadow-lg shadow-primary/20"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Alışverişe Başla
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((product) => (
              <div key={product.id} className="group bg-white border border-surface hover:border-primary/30 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col transform hover:-translate-y-1">
                <div className="relative w-full h-48 bg-surface p-4 flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="object-contain max-h-full transform group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="text-text-muted text-xs">[ Görsel Yok ]</div>
                  )}
                  <button 
                    onClick={() => removeFavorite(product.id)}
                    className="absolute top-3 right-3 w-10 h-10 bg-white shadow-md rounded-full flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                    title="Favorilerden Çıkar"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-5 flex flex-col flex-grow">
                  <Link href={`/urun/${product.id}`} className="font-heading font-bold text-secondary hover:text-primary mb-2 line-clamp-2 uppercase text-sm leading-tight transition-colors">
                    {product.name}
                  </Link>
                  
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="font-body font-extrabold text-lg text-primary">₺{product.price}</span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-secondary hover:bg-primary text-white px-4 py-2 rounded-lg font-heading font-bold text-[10px] uppercase tracking-wider flex items-center transition-all duration-300 shadow-md"
                    >
                      <ShoppingBag className="w-4 h-4 mr-2" /> Sepete Ekle
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
