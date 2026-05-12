"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, RotateCcw, Headset, Zap, Lock } from 'lucide-react';

const features = [
  { title: 'Orijinal & Sertifikalı', desc: 'Tüm ürünlerimiz garantili ve %100 orijinaldir.', icon: ShieldCheck },
  { title: 'Ücretsiz Kargo', desc: '299 TL ve üzeri tüm siparişlerinizde ücretsiz kargo.', icon: Truck },
  { title: '30 Gün İade', desc: 'Koşulsuz şartsız 30 gün içinde iade garantisi.', icon: RotateCcw },
  { title: '7/24 Destek', desc: 'Uzman ekibimizle her an yanınızdayız.', icon: Headset },
  { title: 'Hızlı Teslimat', desc: 'Siparişleriniz 1-3 iş günü içinde kapınızda.', icon: Zap },
  { title: 'Güvenli Ödeme', desc: '256-bit SSL ve 3D Secure ile güvenli alışveriş.', icon: Lock },
];

export const WhyIbreoto = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-surface overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-secondary mb-4 uppercase tracking-tight">
            Neden <span className="text-primary">ibreoto?</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-red-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index} 
                className="bg-white p-8 rounded-2xl flex items-start space-x-5 border border-gray-100 hover:border-primary/10 shadow-lg shadow-gray-100/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 transform hover:-translate-y-1"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-14 h-14 bg-surface group-hover:bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-text-main uppercase mb-2 tracking-tight">
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
