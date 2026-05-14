"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star, ShoppingCart, ArrowRight, Heart, Truck } from 'lucide-react';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  const defaultProducts = [
    { id: '1', name: 'Yerli Üretim Arı Sütü 100 gr', price: 4000, oldPrice: 4500, category: 'ari-sutu', image: '/images/products/ari-sutu/ari-sutu-100gr-main.webp', description: 'Saf taze yerli üretim arı sütü.', rating: 5, reviews: 24, isNew: true, isFreeShipping: true },
    { id: '2', name: 'ARI EKMEKLİ Yetişkin Karışımı 850 gr', price: 2150, oldPrice: 2450, category: 'karisim', image: '/images/products/karisim/ari-ekmekli-yetiskin-850gr.webp', description: 'Bal, polen, propolis ve arı sütü karışımı.', rating: 5, reviews: 12, isNew: false, isFreeShipping: true },
    { id: '3', name: 'Çiçek Balı 850 gr', price: 600, category: 'bal', image: '/images/products/bal/cicek-bali-850gr.webp', description: 'Doğal süzme çiçek balı.', rating: 5, reviews: 30, isNew: false, isFreeShipping: false },
    { id: '4', name: 'Propolis 50 ml (Zeytin Yağında)', price: 350, oldPrice: 400, category: 'propolis', image: '/images/products/propolis/propolis-50ml.webp', description: 'Zeytinyağında çözülmüş doğal propolis.', rating: 5, reviews: 18, isNew: true, isFreeShipping: false },
  ];

  useEffect(() => {
    const savedFavs = localStorage.getItem('favorites');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs).map((p: any) => String(p.id)));
    }

    fetchProducts();

    const updateFavorites = () => {
      const saved = localStorage.getItem('favorites');
      if (saved) {
        setFavorites(JSON.parse(saved).map((p: any) => String(p.id)));
      }
    };
    window.addEventListener('favoritesUpdated', updateFavorites);
    return () => window.removeEventListener('favoritesUpdated', updateFavorites);
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        // Shuffle and take 4
        const shuffled = data.sort(() => 0.5 - Math.random());
        setProducts(shuffled.slice(0, 4).map((p: any) => {
          let imageUrl = '/images/products/placeholder.png';
          try {
            const imgs = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
            imageUrl = Array.isArray(imgs) ? imgs[0] : imgs;
          } catch (e) {
            imageUrl = p.images || imageUrl;
          }
          
          return {
            ...p,
            image: imageUrl,
            rating: 5,
            reviews: Math.floor(Math.random() * 50) + 10
          };
        }));
      } else {
        setProducts(defaultProducts);
      }
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
      setProducts(defaultProducts);
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
              ÖNE ÇIKAN <span className="text-primary">ŞİFA KAYNAKLARI</span>
            </h2>
            <p className="text-text-muted font-body text-sm mt-1 uppercase tracking-widest">En çok tercih edilen ARI HAYAT lezzetleri</p>
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
                className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${favorites.includes(String(product.id)) ? 'bg-primary text-secondary' : 'bg-white text-secondary hover:text-primary'}`}
              >
                <Heart className={`w-5 h-5 ${favorites.includes(String(product.id)) ? 'fill-current' : ''}`} />
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
                      className={`w-3 h-3 ${i < product.rating ? 'fill-current' : 'text-gray-200'}`} 
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
