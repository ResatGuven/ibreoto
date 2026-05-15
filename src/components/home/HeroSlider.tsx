"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export const HeroSlider = () => {
  const [sliders, setSliders] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchSliders = async () => {
      try {
        const res = await fetch('/api/site-info');
        const data = await res.json();
        if (data.sliders && data.sliders.length > 0) {
          setSliders(data.sliders);
        }
      } catch (e) {}
    };
    fetchSliders();
  }, []);

  useEffect(() => {
    if (sliders.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % sliders.length);
      }, 6000);
      return () => clearInterval(timer);
    }
  }, [sliders]);

  const defaultBanner = {
    title: "DOĞADAN GELEN ŞİFA",
    subtitle: "SAĞLIKLI YAŞAM İÇİN ARI HAYAT",
    description: "%100 Doğal ve katkısız ballar, arı sütü ve propolis ile bağışıklığınızı güçlendirin. Arı Hayat'ın eşsiz lezzetlerini keşfedin.",
    image: "https://images.unsplash.com/photo-1587334274328-64186a80aeee?q=80&w=1920",
    videoUrl: "", // Added to fix TS error
    buttonText: "Hemen Keşfet",
    buttonLink: "/urunler"
  };


  const currentSlider = sliders.length > 0 ? sliders[currentIndex] : defaultBanner;

  return (
    <div className="relative w-full h-[650px] bg-secondary overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Background Image with Zoom Effect */}
          <motion.div 
            className="absolute inset-0"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            {(currentSlider.videoUrl || (currentIndex === 0 && defaultBanner.videoUrl)) ? (
              <video 
                src={currentSlider.videoUrl || defaultBanner.videoUrl} 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover opacity-60"
              />
            ) : (
              <Image
                src={currentSlider.image || defaultBanner.image}
                alt={currentSlider.title || "Slider"}
                fill
                unoptimized
                className="object-cover opacity-60"
                priority
              />
            )}
            {/* Cinematic Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/20" />
          </motion.div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
            <div className="max-w-3xl text-white">
              <motion.span 
                className="text-primary font-heading font-bold uppercase tracking-[0.3em] text-xs md:text-sm mb-4 block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {currentSlider.subtitle || defaultBanner.subtitle}
              </motion.span>

              <motion.h1 
                className="text-5xl md:text-8xl font-heading font-bold mb-6 uppercase tracking-tight leading-none"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {currentSlider.title}
              </motion.h1>
              
              <motion.p 
                className="text-base md:text-xl font-body mb-8 text-gray-200 max-w-xl font-light leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {currentSlider.description || defaultBanner.description}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link href={currentSlider.buttonLink || "/urunler"} className="bg-primary hover:bg-primary-hover text-secondary font-heading font-bold uppercase tracking-wider py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/40 inline-block text-sm">
                  {currentSlider.buttonText || defaultBanner.buttonText}
                </Link>
                {sliders.length === 0 && (
                  <Link href="/hakkimizda" className="bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white font-heading font-bold uppercase tracking-wider py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block text-sm">
                    Hakkımızda
                  </Link>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Pagination dots if multiple sliders */}
      {sliders.length > 1 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {sliders.map((_, i) => (
            <button 
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-all ${currentIndex === i ? 'bg-primary w-6' : 'bg-white/30'}`}
            />
          ))}
        </div>
      )}

      {/* Bottom Bar Info */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-secondary/90 backdrop-blur-md border-t border-white/10 text-white py-6 hidden md:block z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center font-heading font-bold uppercase text-xs tracking-[0.2em]">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <span className="text-primary text-2xl group-hover:scale-125 transition-transform duration-300">★</span>
            <span className="group-hover:text-primary transition-colors duration-300">10K+ Müşteri</span>
          </div>
          <div className="flex items-center space-x-3 group cursor-pointer">
            <span className="text-primary text-2xl group-hover:scale-125 transition-transform duration-300">★</span>
            <span className="group-hover:text-primary transition-colors duration-300">500+ Ürün Çeşidi</span>
          </div>
          <div className="flex items-center space-x-3 group cursor-pointer">
            <span className="text-primary text-2xl group-hover:scale-125 transition-transform duration-300">★</span>
            <span className="group-hover:text-primary transition-colors duration-300">Hızlı & Güvenli Teslimat</span>
          </div>
          <div className="flex items-center space-x-3 group cursor-pointer">
            <span className="text-primary text-2xl group-hover:scale-125 transition-transform duration-300">★</span>
            <span className="group-hover:text-primary transition-colors duration-300">%100 Orijinal Ürün</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
