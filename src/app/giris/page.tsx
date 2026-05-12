"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function GirisPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect directly to admin panel
    router.push('/ibreoto-yonetim-2025');
  };

  return (
    <div className="pt-24 min-h-screen bg-background flex items-center justify-center">
      <motion.div 
        className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-100/50 max-w-md w-full border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-heading font-bold text-secondary mb-2 text-center uppercase">Giriş Yap</h1>
        <p className="text-text-muted text-center text-sm mb-6 font-body">Hesabınıza erişim sağlayın.</p>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-text-muted mb-1 text-sm font-body">E-Posta</label>
            <input 
              type="email" 
              placeholder="admin@ibreoto.com" 
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
            />
          </div>
          <div>
            <label className="block text-text-muted mb-1 text-sm font-body">Şifre</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
            />
          </div>
          
          <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white px-4 py-3 rounded-xl font-heading font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-primary/20">
            Giriş Yap
          </button>
        </form>

        <div className="mt-4 text-center text-xs text-text-muted font-body">
          * Giriş yap butonuna basarak direkt olarak Yönetim Paneli'ne geçebilirsiniz.
        </div>
      </motion.div>
    </div>
  );
}
