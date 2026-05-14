"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, RotateCcw, Lock, Leaf, Home, Zap } from 'lucide-react';

const features = [
  { title: '%100 Doğal & Katkısız', desc: 'Isıl işlem görmemiş, katkısız ve %100 doğal arı ürünleri.', icon: Leaf },
  { title: 'Üreticiden Direkt', desc: 'Aracı olmadan, taze üretim ürünler doğrudan kapınıza.', icon: Home },
  { title: 'Ücretsiz Kargo', desc: '1000 TL ve üzeri tüm siparişlerinizde ücretsiz kargo.', icon: Truck },
  { title: '14 Gün İade', desc: 'Memnun kalmadığınız ürünlerde 14 gün iade garantisi.', icon: RotateCcw },
  { title: 'Hızlı Teslimat', desc: 'Siparişleriniz taze şekilde 1-3 iş günü içinde kapınızda.', icon: Zap },
  { title: 'Güvenli Ödeme', desc: 'Iyzico/Shopier altyapısı ile 3D Secure güvenli alışveriş.', icon: Lock },
];

export const WhyAriHayat = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-background overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Güven ve Kalite</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-secondary mb-4 uppercase tracking-tight">
            NEDEN <span className="text-primary">ARI HAYAT?</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-amber-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index} 
                className="bg-white p-8 rounded-3xl flex items-start space-x-5 border border-surface hover:border-primary/20 shadow-lg shadow-gray-100/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 transform hover:-translate-y-2 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-14 h-14 bg-surface group-hover:bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-300 shadow-sm border border-surface">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-secondary uppercase mb-2 tracking-tight group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="font-body text-text-muted text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
