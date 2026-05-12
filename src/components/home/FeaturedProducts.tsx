"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowRight } from 'lucide-react';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);

  const defaultProducts = [
    { id: 1, name: 'Karbon Fiber Direksiyon Kılıfı', price: '350', category: 'ic-aksesuar', image: '/images/products/steering_wheel_cover.png', description: 'Yüksek kaliteli karbon fiber görünüm.', rating: 5, reviews: 24, badge: 'YENİ' },
    { id: 2, name: '3D Havuzlu Paspas Seti - VW Golf', price: '850', category: 'ic-aksesuar', image: '/images/products/paspas_seti.png', description: 'Tam uyumlu havuzlu paspas.', rating: 4, reviews: 12, badge: 'ÇOK SATAN' },
    { id: 3, name: 'Ortopedik Bel Destekli Koltuk Minderi', price: '450', category: 'ic-aksesuar', image: '/images/products/koltuk_minderi.png', description: 'Uzun sürüşler için konfor.', rating: 5, reviews: 30, badge: null },
    { id: 4, name: 'Dört Mevsim Branda - Su Geçirmez', price: '1200', category: 'dis-aksesuar', image: '/images/products/araba_brandasi.png', description: 'Aracınızı dış etkenlerden korur.', rating: 4, reviews: 8, badge: 'İNDİRİM %15' },
  ];

  useEffect(() => {
    const savedProducts = localStorage.getItem('app_products');
    if (savedProducts) {
      const all = JSON.parse(savedProducts);
      // Merge with default products to get images if missing
      const merged = all.map((p: any) => {
        const def = defaultProducts.find(d => d.id === p.id);
        return {
          ...p,
          image: p.image || (def ? def.image : '')
        };
      });
      // Take first 4 for display, adding some dummy fields if missing
      const display = merged.slice(0, 4).map((p: any, idx: number) => {
        const def = defaultProducts.find(d => d.id === p.id);
        return {
          ...p,
          rating: p.rating || (def ? def.rating : 4),
          reviews: p.reviews || (def ? def.reviews : 10),
          badge: p.badge || (def ? def.badge : null)
        };
      });
      setProducts(display);
    } else {
      setProducts(defaultProducts);
      localStorage.setItem('app_products', JSON.stringify(defaultProducts));
    }
  }, []);

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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 border-b border-surface pb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-secondary uppercase tracking-tight">
              Öne Çıkan <span className="text-primary">Ürünler</span>
            </h2>
            <p className="text-text-muted font-body text-sm mt-1">En çok tercih edilen ve en yeni ürünlerimiz</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-4 md:mt-0"
          >
            <Link href="/urunler" className="text-text-muted hover:text-primary font-heading font-bold uppercase text-sm flex items-center transition-colors group">
              Tümünü Gör <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <motion.div 
              key={product.id}
              className="group relative bg-white border border-gray-100 hover:border-primary/20 rounded-2xl overflow-hidden shadow-lg shadow-gray-100/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full transform hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Badge */}
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-primary to-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg font-heading uppercase tracking-wider">
                  {product.badge}
                </div>
              )}

              {/* Image */}
              <div className="relative w-full h-64 bg-surface p-6 flex items-center justify-center overflow-hidden">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="object-contain max-h-full transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="text-text-muted text-xs font-body">[ Görsel ]</div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-yellow-400 text-sm mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < product.rating ? 'fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-text-muted text-xs ml-2">({product.reviews})</span>
                </div>
                
                <h3 className="font-heading font-bold text-text-main text-lg mb-2 line-clamp-2 uppercase tracking-tight group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                
                <div className="mt-auto pt-4 flex items-center justify-between">
                  <span className="font-body font-bold text-xl text-primary">
                    ₺{product.price}
                  </span>
                  
                  <button 
                    className="bg-secondary hover:bg-primary text-white w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:rotate-6 shadow-lg hover:shadow-primary/30"
                    onClick={() => addToCart(product)}
                  >
                    <ShoppingCart className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
