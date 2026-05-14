"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Flower, Droplets, Shield, Zap, Leaf, Gift, ArrowRight } from 'lucide-react';

const categories = [
  { id: 'ari-sutu', title: 'Saf Arı Sütü', desc: 'Taze, Yerli Üretim ve Yüksek Değerli Şifa Kaynağı', icon: Droplets },
  { id: 'karisim', title: 'Özel Karışımlar', desc: 'Bal, Polen, Propolis ve Arı Sütü Birlikteliği', icon: Zap },
  { id: 'propolis', title: 'Propolis', desc: 'Su ve Zeytinyağı Bazlı %100 Doğal Ekstraktlar', icon: Shield },
  { id: 'bal', title: 'Ham Bal', desc: 'Süzme Çiçek, Çam ve Kestane Ihlamur Balları', icon: Flower },
  { id: 'polen-ari-ekmegi', title: 'Polen & Arı Ekmeği', desc: 'Doğanın En Güçlü Protein ve Vitamin Deposu', icon: Leaf },
  { id: 'ozel-setler', title: 'Özel Setler', desc: 'Sevdikleriniz İçin Özenle Hazırlanmış Şifa Paketleri', icon: Gift },
];

export const CategoryShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Keşfetmeye Başla</p>
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-secondary mb-4 uppercase tracking-tight">
            ŞİFA DOLU <span className="text-primary">KATEGORİLER</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-amber-600 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Link href={`/urunler?category=${cat.id}`} className="block group h-full">
                  <div className="bg-white p-8 rounded-3xl shadow-lg shadow-gray-100/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border border-surface hover:border-primary/20 flex flex-col items-center text-center h-full transform hover:-translate-y-2">
                    <div className="w-16 h-16 bg-surface group-hover:bg-primary/10 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300 shadow-sm border border-surface">
                      <Icon className="w-8 h-8 text-secondary group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-secondary mb-3 uppercase tracking-tight group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-text-muted font-body text-sm leading-relaxed mb-6">
                      {cat.desc}
                    </p>

                    <div className="mt-auto pt-4 text-primary font-heading font-bold uppercase text-[10px] tracking-widest flex items-center opacity-70 group-hover:opacity-100 transition-opacity">
                      İNCELE <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
