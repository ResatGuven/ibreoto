"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Star, Heart, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/context/ToastContext';

export default function CategoryProductsList({ products }: { products: any[] }) {
  const addToCartStore = useCartStore((state) => state.addToCart);
  const toggleFavoriteStore = useCartStore((state) => state.toggleFavorite);
  const favoritesStore = useCartStore((state) => state.favorites);
  const { showToast } = useToast();

  const toggleFavorite = (product: any) => {
    const isFav = favoritesStore.some((p: any) => String(p.id) === String(product.id));
    toggleFavoriteStore(product);
    if (isFav) {
      showToast('Ürün favorilerinizden kaldırıldı.', 'info');
    } else {
      showToast('Ürün favorilerinize eklendi!', 'success');
    }
  };

  const addToCart = (product: any) => {
    addToCartStore(product);
    showToast(`${product.name} sepete eklendi!`, 'success');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {products.map((product, index) => {
        const isFav = favoritesStore.some((p: any) => String(p.id) === String(product.id));
        return (
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
                    unoptimized
                    className="object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out p-4" 
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-text-muted text-[10px] font-heading uppercase tracking-widest">[ Görsel ]</div>
                )}
              </Link>
              <button 
                onClick={() => toggleFavorite(product)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 ${isFav ? 'bg-primary text-secondary' : 'bg-white text-secondary hover:text-primary'}`}
              >
                <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
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
                    <span className="text-[10px] text-text-muted font-body line-through mb-1">
                      ₺{product.oldPrice.toLocaleString('tr-TR')}
                    </span>
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
        );
      })}
    </div>
  );
}
