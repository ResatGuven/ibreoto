"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Instagram, Camera } from 'lucide-react';

export const InstagramBanner = () => {
  return (
    <section className="relative h-[500px] flex items-center justify-center overflow-hidden group">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[2000ms] group-hover:scale-110"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1920')" }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-secondary/80 backdrop-blur-[1px]" />
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-primary rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl shadow-primary/30 rotate-12 group-hover:rotate-0 transition-transform duration-500">
            <Instagram className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-heading font-black text-white mb-6 uppercase tracking-tighter">
            STİLİNİZİ <span className="text-primary italic">PAYLAŞIN</span>
          </h2>
          
          <p className="text-gray-300 font-body mb-10 max-w-xl mx-auto text-lg leading-relaxed">
            Aracınızın yeni halini bizimle paylaşın, topluluğumuza ilham olun. En yeni projeler ve müşteri araçları için bizi takip edin.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="https://www.instagram.com/ibreoto" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-primary hover:bg-white text-white hover:text-secondary font-heading font-black uppercase tracking-widest py-5 px-12 rounded-full transition-all duration-300 transform hover:scale-110 flex items-center justify-center shadow-xl shadow-primary/20"
            >
              @ibreoto
            </a>
            <div className="flex items-center justify-center space-x-2 text-white/50 font-heading font-bold uppercase text-xs tracking-widest bg-white/5 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
              <Camera size={14} /> <span>#ibreoto #carstyle</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
    </section>
  );
};
