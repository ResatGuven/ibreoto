"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowRight, Heart, Truck } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/context/ToastContext';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const addToCartStore = useCartStore((state) => state.addToCart);
  const toggleFavoriteStore = useCartStore((state) => state.toggleFavorite);
  const favoritesStore = useCartStore((state) => state.favorites);
  const { showToast } = useToast();

  const defaultProducts = [
    { id: 'ari-02', name: 'Arı Sütü Yerli Üretim 50 gr', price: 2000, originalPrice: null, category: 'ari-sutu', image: '/images/products/ari-sutu.png', description: 'Kendi kovanlarımızdan taze sağım, dondurulmuş saf yerli arı sütü. 50 gr.', rating: 5, reviews: 42, isNew: false, isFreeShipping: true },
    { id: 'pro-01', name: 'Zeytinyağlı Propolis 50 ml', price: 350, originalPrice: 400, category: 'propolis', image: '/images/products/propolis.png', description: 'Alkol içermeyen, soğuk sıkım zeytinyağında çözülmüş saf propolis ekstraktı. 50 ml.', rating: 5, reviews: 28, isNew: false, isFreeShipping: false },
    { id: 'bal-07', name: 'Kestane Ihlamur Balı 850 gr', price: 1480, originalPrice: null, category: 'bal', image: '/images/products/bal.png', description: 'Kestane ve ihlamur çiçeklerinin eşsiz harmanı. Güçlü antioksidan içeriği. 850 gr.', rating: 5, reviews: 56, isNew: false, isFreeShipping: true },
    { id: 'kar-01', name: 'Karışım Kids 225 gr', price: 420, originalPrice: null, category: 'karisim', image: '/images/products/karisim.png', description: 'Çocuklar için özel formül. Yerli arı sütü, ham bal, Polen ve propolis. 225 gr.', rating: 5, reviews: 31, isNew: false, isFreeShipping: false },
    { id: 'pol-01', name: 'Arı Ekmeği 100 gr', price: 450, originalPrice: null, category: 'polen-ari-ekmegi', image: '/images/products/polen.png', description: 'İşçi arıların fermente ettiği protein ve vitamin deposu arı ekmeği (perga). 100 gr.', rating: 5, reviews: 15, isNew: false, isFreeShipping: false },
    { id: 'bal-11', name: 'Arı Hayat Krem Bal 400 gr', price: 350, originalPrice: null, category: 'bal', image: '/images/products/bal.png', description: 'Pürüssüz kıvamı ve zengin aromasıyla doğalrıkın krem hali. 400 gr.', rating: 5, reviews: 9, isNew: true, isFreeShipping: false },
    { id: 'kar-04', name: 'Yetişkin Karışım 225 gr', price: 710, originalPrice: null, category: 'karisim', image: '/images/products/karisim.png', description: 'Yetişkinler için özel formül. Yerli ham bal, arı sütü, Polen ve propolis. 225 gr.', rating: 5, reviews: 22, isNew: false, isFreeShipping: false },
    { id: 'ari-04', name: 'Yerli Arı Sütü 20 gr', price: 800, originalPrice: 900, category: 'ari-sutu', image: '/images/products/ari-sutu.png', description: 'Başlangıç dozu için ideal. Kendi kovanlarımızdan elde edilen saf yerli arı sütü. 20 gr.', rating: 5, reviews: 18, isNew: false, isFreeShipping: false },
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Shuffle and take 4
        const shuffled = data.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 4).map((p: any) => ({
          ...p,
          rating: p.rating || 5,
          reviews: p.reviewCount || Math.floor(Math.random() * 50) + 10
        })));
      } else {
        setProducts(defaultProducts);
      }
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
      setProducts(defaultProducts);
    }
  };

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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 border-b border-surface pb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-heading font-black text-secondary uppercase tracking-tight">
              EN ÇOK <span className="text-primary italic">TERCİH EDİLENLER</span>
            </h2>
            <p className="text-text-muted font-body text-xs mt-1 uppercase tracking-widest font-bold">Doğadan gelen en saf ve şifalı arı ürünleri</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-4 md:mt-0"
          >
            <Link href="/urunler" className="text-text-muted hover:text-primary font-heading font-bold uppercase text-sm flex items-center transition-colors group">
              TÜMÜNÜ KEŞFET <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
                {product.isNew && (
                  <div className="bg-amber-500 text-secondary text-[10px] font-bold px-3 py-1.5 rounded-lg font-heading uppercase tracking-wider">
                    YENİ
                  </div>
                )}
                {product.isFreeShipping && (
                  <div className="bg-green-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg font-heading uppercase tracking-wider flex items-center shadow-md">
                    <Truck className="w-3 h-3 mr-1" /> ÜCRETSİZ KARGO
                  </div>
                )}
              </div>

              <button 
                onClick={() => toggleFavorite(product)}
                className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${favoritesStore.some((p: any) => String(p.id) === String(product.id)) ? 'bg-primary text-secondary' : 'bg-white text-secondary hover:text-primary'}`}
              >
                <Heart className={`w-5 h-5 ${favoritesStore.some((p: any) => String(p.id) === String(product.id)) ? 'fill-current' : ''}`} />
              </button>

              {/* Image */}
              <div className="relative w-full h-64 bg-surface/50 p-6 flex items-center justify-center overflow-hidden">
                <Link href={`/urun/${product.slug || product.id}`} className="block w-full h-full flex items-center justify-center">
                  {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        unoptimized
                        className="object-contain max-h-full transform group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                  ) : (
                    <div className="text-text-muted text-xs font-body uppercase">[ Görsel ]</div>
                  )}
                </Link>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center text-amber-500 text-sm mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < Math.round(product.rating || 5) ? 'fill-current' : 'text-gray-200'}`} 
                    />
                  ))}
                  <span className="text-text-muted text-[10px] ml-2">({product.reviews} Değerlendirme)</span>
                </div>
                
                <h3 className="font-heading font-bold text-secondary text-base mb-2 line-clamp-2 uppercase tracking-tight group-hover:text-primary transition-colors">
                  <Link href={`/urun/${product.slug || product.id}`}>{product.name}</Link>
                </h3>
                
                <div className="mt-auto pt-4 flex items-end justify-between">
                  <div className="flex flex-col">
                    {product.oldPrice && (
                      <span className="text-xs text-text-muted font-body line-through mb-0.5">
                        ₺{product.oldPrice.toLocaleString('tr-TR')}
                      </span>
                    )}
                    <span className="font-body font-bold text-2xl text-primary leading-none">
                      ₺{product.price.toLocaleString('tr-TR')}
                    </span>
                  </div>
                  
                  <button 
                    className="bg-secondary hover:bg-primary text-white w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
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
