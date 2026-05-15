"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-surface/30 flex items-center justify-center px-4 pt-20">
      <div className="max-w-xl w-full text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative mb-8"
        >
          <h1 className="text-[150px] md:text-[200px] font-heading font-extrabold text-primary/10 leading-none select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 md:w-48 md:h-48 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <Search className="w-16 h-16 md:w-24 md:h-24 text-primary absolute animate-bounce" />
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-secondary uppercase mb-4 tracking-tight">
            ARADIĞINIZ ŞİFA KAYNAĞI BULUNAMADI
          </h2>
          <p className="text-text-muted font-body text-sm md:text-base mb-10 leading-relaxed max-w-md mx-auto">
            Üzgünüz, aradığınız sayfa kovanımızda bulunmuyor. Belki de bir yanlışlık oldu ya da aradığınız ürünün ismi değişmiş veya yayından kaldırılmış olabilir.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/"
              className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-secondary px-8 py-4 rounded-2xl font-heading font-bold uppercase text-xs tracking-widest flex items-center justify-center transition-all shadow-lg shadow-primary/20 transform hover:scale-105"
            >
              <Home className="w-4 h-4 mr-2" /> ANA SAYFAYA DÖN
            </Link>
            <button 
              onClick={() => window.history.back()}
              className="w-full sm:w-auto bg-white hover:bg-surface text-secondary border-2 border-surface px-8 py-4 rounded-2xl font-heading font-bold uppercase text-xs tracking-widest flex items-center justify-center transition-all transform hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> GERİ GİT
            </button>
          </div>
        </motion.div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
           {/* Decorative elements or quick links can go here */}
        </div>
      </div>
    </div>
  );
}
