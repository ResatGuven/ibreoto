"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Armchair, Car, Camera, Sparkles } from 'lucide-react';

const categories = [
  { id: 'ic', title: 'İç Aksesuar', desc: 'Koltuk Kılıfı, Paspas, Direksiyon...', icon: Armchair },
  { id: 'dis', title: 'Dış Aksesuar', desc: 'Rüzgarlık, Jant Kapağı, Spoiler...', icon: Car },
  { id: 'teknoloji', title: 'Teknoloji', desc: 'Kamera, Multimedya, Sensör...', icon: Camera },
  { id: 'bakim', title: 'Bakım & Temizlik', desc: 'Seramik Kaplama, Cila, Bez...', icon: Sparkles },
];

export const CategoryShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-surface to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-secondary mb-4 uppercase tracking-tight">
            Aradığın Kategoriye <span className="text-primary">Göz At</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-red-400 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                <Link href={`/kategori/${cat.id}`} className="block group h-full">
                  <div className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-100 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 border border-gray-100 hover:border-primary/20 flex flex-col items-center text-center h-full transform hover:-translate-y-2">
                    <div className="w-16 h-16 bg-surface group-hover:bg-primary/10 rounded-2xl flex items-center justify-center mb-6 transition-colors duration-300">
                      <Icon className="w-8 h-8 text-secondary group-hover:text-primary transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-text-main mb-3 uppercase tracking-tight">
                      {cat.title}
                    </h3>
                    <p className="text-text-muted font-body text-sm leading-relaxed">
                      {cat.desc}
                    </p>

                    <div className="mt-auto pt-6 text-primary font-heading font-bold uppercase text-xs tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                      İncele <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
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
