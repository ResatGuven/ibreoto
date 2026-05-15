"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Droplets, Zap, Heart, Flower2, ArrowRight } from 'lucide-react';

const categories = [
  { id: 'bal', title: 'Doğal Ballar', desc: 'Kestane, Çam, Meşe ve Çiçek balları.', icon: Droplets },
  { id: 'propolis', title: 'Propolis', desc: 'Bağışıklık güçlendirici doğal propolis çözeltileri.', icon: Zap },
  { id: 'ari-sutu', title: 'Arı Sütü', desc: 'Saf ve taze yerli arı sütü ürünleri.', icon: Heart },
  { id: 'polen-ari-ekmegi', title: 'Polen & Arı Ekmeği', desc: 'Protein ve vitamin deposu polen ve perga.', icon: Flower2 },
];

export const CategoryShowcase = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Geniş Ürün Yelpazesi</p>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-secondary mb-6 uppercase tracking-tighter">
            POPÜLER <span className="text-primary italic">KATEGORİLER</span>
          </h2>
          <div className="w-32 h-1.5 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
                  <div className="bg-gray-50 p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border border-transparent hover:border-primary/20 flex flex-col items-center text-center h-full transform hover:-translate-y-3">
                    <div className="w-20 h-20 bg-white group-hover:bg-primary rounded-2xl flex items-center justify-center mb-8 transition-all duration-300 shadow-lg group-hover:rotate-6">
                      <Icon className="w-10 h-10 text-secondary group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-2xl font-heading font-black text-secondary mb-4 uppercase tracking-tight group-hover:text-primary transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-gray-500 font-body text-sm leading-relaxed mb-8">
                      {cat.desc}
                    </p>

                    <div className="mt-auto pt-6 text-primary font-heading font-black uppercase text-xs tracking-widest flex items-center group-hover:translate-x-2 transition-transform">
                      TÜMÜNÜ GÖR <ArrowRight className="ml-2 w-5 h-5" />
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
