"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export const HeroSlider = () => {
  return (
    <div className="relative w-full h-[650px] bg-secondary overflow-hidden">
      {/* Background Image with Zoom Effect */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src="/images/products/hero_banner_new.png"
          alt="Aracını Tamamla"
          fill
          className="object-cover opacity-80"
          priority
        />
        {/* Cinematic Dark Overlay on the left for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        {/* Subtle color cast from top right */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-primary/20" />
      </motion.div>

      {/* Abstract Glowing Accent */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="max-w-3xl text-white">
          <motion.span 
            className="text-primary font-heading font-bold uppercase tracking-widest text-xs mb-4 block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            PREMIUM OTO AKSESUARLARI
          </motion.span>

          <motion.h1 
            className="text-6xl md:text-8xl font-heading font-bold mb-6 uppercase tracking-tight leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            ARACINI<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-red-500 to-orange-400">YENİLE</span>
          </motion.h1>
          
          <motion.p 
            className="text-base md:text-lg font-body mb-8 text-gray-300 max-w-xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Aracınızın tarzını ve konforunu bir üst seviyeye taşıyın. 500'den fazla lüks aksesuar ve hızlı teslimat avantajıyla ibreoto'da.
          </motion.p>
          
          <motion.div 
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link href="/urunler" className="bg-primary hover:bg-primary-hover text-white font-heading font-bold uppercase tracking-wider py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary/40 inline-block text-sm">
              Alışverişe Başla
            </Link>
            <Link href="/hakkimizda" className="bg-white/5 backdrop-blur-sm border border-white/20 hover:bg-white/10 text-white font-heading font-bold uppercase tracking-wider py-4 px-10 rounded-lg transition-all duration-300 transform hover:scale-105 inline-block text-sm">
              Hakkımızda
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar Info */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-secondary/90 backdrop-blur-md border-t border-white/10 text-white py-4 hidden md:block"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center font-heading font-bold uppercase text-sm tracking-widest">
          <div className="flex items-center space-x-2 group cursor-pointer">
            <span className="text-primary text-xl group-hover:scale-125 transition-transform duration-300">✓</span>
            <span className="group-hover:text-primary transition-colors duration-300">500+ Ürün</span>
          </div>
          <div className="flex items-center space-x-2 group cursor-pointer">
            <span className="text-primary text-xl group-hover:scale-125 transition-transform duration-300">✓</span>
            <span className="group-hover:text-primary transition-colors duration-300">10.000+ Müşteri</span>
          </div>
          <div className="flex items-center space-x-2 group cursor-pointer">
            <span className="text-primary text-xl group-hover:scale-125 transition-transform duration-300">✓</span>
            <span className="group-hover:text-primary transition-colors duration-300">Ücretsiz Kargo</span>
          </div>
          <div className="flex items-center space-x-2 group cursor-pointer">
            <span className="text-primary text-xl group-hover:scale-125 transition-transform duration-300">✓</span>
            <span className="group-hover:text-primary transition-colors duration-300">7/24 Destek</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
