"use client";

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star, Heart, Truck, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function KategoriPage({ params }: { params: Promise<{ slug: string }> }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);
  const resolvedParams = use(params);

  const categoryNames: { [key: string]: string } = {
    'ari-sutu': 'Arı Sütü',
    'karisim': 'Karışım',
    'besli-karisim': 'Beşli Karışım',
    'propolis': 'Propolis',
    'polen-ari-ekmegi': 'Polen & Arı Ekmeği',
    'bal': 'Bal',
    'bitkisel-yaglar': 'Bitkisel Yağlar',
    'ozel-setler': 'Özel Setler'
  };

  const categoryName = categoryNames[resolvedParams.slug] || 'Şifa Kaynağı';

  useEffect(() => {
    const savedFavs = localStorage.getItem('favorites');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs).map((p: any) => String(p.id)));
    }
    fetchProducts();
  }, [resolvedParams.slug]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (Array.isArray(data)) {
        const filtered = data.filter(p => {
           const catSlug = p.category?.slug || p.categoryId;
           return catSlug === resolvedParams.slug;
        }).map(p => {
          let imageUrl = '/images/products/placeholder.png';
          try {
            const imgs = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
            imageUrl = Array.isArray(imgs) ? imgs[0] : imgs;
          } catch (e) {}
          return { ...p, image: imageUrl };
        });
        setProducts(filtered);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = (product: any) => {
    const savedFavs = localStorage.getItem('favorites');
    let favs = savedFavs ? JSON.parse(savedFavs) : [];
    const isFav = favs.find((p: any) => String(p.id) === String(product.id));
    
    if (isFav) {
      favs = favs.filter((p: any) => String(p.id) !== String(product.id));
      setFavorites(favorites.filter(id => id !== String(product.id)));
    } else {
      favs.push(product);
      setFavorites([...favorites, String(product.id)]);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favs));
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
    <div className="pt-24 min-h-screen bg-surface/30">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <Link href="/urunler" className="inline-flex items-center text-text-muted hover:text-primary font-heading font-bold uppercase text-[10px] tracking-widest mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> TÜM ÜRÜNLER
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-surface pb-8">
            <div>
              <p className="text-primary font-heading font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Kategori</p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary uppercase tracking-tight">{categoryName}</h1>
            </div>
            <div className="text-text-muted font-body text-sm">
              <span className="text-secondary font-bold">{products.length}</span> Ürün Bulundu
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="aspect-[3/4] bg-white rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-surface">
            <ShoppingCart className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <h2 className="text-2xl font-heading font-bold text-secondary uppercase mb-4 tracking-widest">Henüz Ürün Bulunmuyor</h2>
            <p className="text-text-muted font-body text-sm mb-8 max-w-md mx-auto">Bu kategorideki şifa kaynaklarımızı kovanımıza eklemek için sabırsızlanıyoruz. Lütfen daha sonra tekrar kontrol edin.</p>
            <Link href="/urunler" className="bg-primary text-secondary px-10 py-4 rounded-2xl font-heading font-bold uppercase text-xs tracking-widest hover:bg-primary-hover transition-all shadow-lg shadow-primary/20">
              Diğer Ürünleri Keşfet
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white border border-surface hover:border-primary/20 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col transform hover:-translate-y-2"
              >
                <div className="relative w-full h-64 bg-surface/30 p-6 flex items-center justify-center overflow-hidden">
                  {/* Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
                    {product.isNew && (
                      <div className="bg-amber-500 text-secondary text-[8px] font-bold px-2 py-1.5 rounded-lg font-heading uppercase tracking-wider">
                        YENİ
                      </div>
                    )}
                    {product.isFreeShipping && (
                      <div className="bg-green-500 text-white text-[8px] font-bold px-2 py-1.5 rounded-lg font-heading uppercase tracking-wider flex items-center">
                        <Truck className="w-3 h-3 mr-1" /> ÜCRETSİZ
                      </div>
                    )}
                  </div>

                  <Link href={`/urun/${product.slug || product.id}`} className="block w-full h-full relative">
                    {product.image ? (
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill
                        className="object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out p-4" 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-text-muted text-[10px] font-heading uppercase tracking-widest">[ Görsel ]</div>
                    )}
                  </Link>
                  <button 
                    onClick={() => toggleFavorite(product)}
                    className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 ${favorites.includes(String(product.id)) ? 'bg-primary text-secondary' : 'bg-white text-secondary hover:text-primary'}`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(String(product.id)) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-amber-500 text-[10px] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                    <span className="text-text-muted ml-2">(4.9)</span>
                  </div>
                  
                  <Link href={`/urun/${product.slug || product.id}`} className="font-heading font-bold text-secondary hover:text-primary mb-4 line-clamp-2 uppercase text-base leading-tight transition-colors tracking-tight">
                    {product.name}
                  </Link>
                  
                  <div className="mt-auto pt-5 flex items-end justify-between border-t border-surface/50">
                    <div className="flex flex-col">
                      {product.oldPrice && (
                        <span className="text-[10px] text-text-muted font-body line-through mb-1">₺{product.oldPrice.toLocaleString('tr-TR')}</span>
                      )}
                      <span className="font-body font-bold text-2xl text-primary leading-none">
                        ₺{product.price.toLocaleString('tr-TR')}
                      </span>
                    </div>
                    <button 
                      className="bg-secondary hover:bg-primary text-white w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-lg shadow-secondary/10"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
