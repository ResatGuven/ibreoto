"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';

export const InstagramBanner = () => {
  return (
    <section className="relative h-[400px] flex items-center justify-center overflow-hidden group">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1920')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-secondary/60 backdrop-blur-[2px]" />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center"
        >
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-6 shadow-2xl shadow-primary/40 animate-bounce">
            <Instagram className="w-10 h-10 text-secondary" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 uppercase tracking-tighter">
            Bizi <span className="text-primary italic">Instagram'da</span> Takip Edin
          </h2>
          
          <p className="text-gray-200 font-body mb-8 max-w-lg mx-auto">
            Doğal yaşam ipuçları, arı ürünleri hakkında bilgiler ve en yeni kampanyalarımız için topluluğumuza katılın.
          </p>
          
          <a 
            href="https://www.instagram.com/arihayat.tr/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white text-secondary hover:bg-primary hover:text-secondary font-heading font-bold uppercase tracking-widest py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-110 flex items-center"
          >
            @arihayat.tr
          </a>
        </motion.div>
      </div>

      {/* Decorative Honeycombs */}
      <div className="absolute -bottom-10 -left-10 w-40 h-40 border-8 border-primary/20 rounded-full opacity-20" />
      <div className="absolute -top-10 -right-10 w-60 h-60 border-8 border-primary/10 rounded-full opacity-10" />
    </section>
  );
};
