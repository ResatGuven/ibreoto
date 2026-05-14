"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';

export default function GirisPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Hatalı e-posta veya şifre.');
      } else {
        router.push('/ibreoto-yonetim-2025');
        router.refresh();
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-surface flex items-center justify-center">
      <motion.div 
        className="bg-white p-8 rounded-2xl shadow-xl shadow-gray-100/50 max-w-md w-full border border-gray-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-heading font-bold text-secondary mb-2 text-center uppercase">Giriş Yap</h1>
        <p className="text-text-muted text-center text-sm mb-6 font-body">Hesabınıza güvenli erişim sağlayın.</p>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-lg text-xs font-body mb-4 border border-red-100 text-center uppercase font-bold">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-text-muted mb-1 text-sm font-body uppercase font-bold">E-Posta</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ibreoto.com" 
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body text-sm" 
            />
          </div>
          <div>
            <label className="block text-text-muted mb-1 text-sm font-body uppercase font-bold">Şifre</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body text-sm" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white px-4 py-3 rounded-xl font-heading font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-[1.02] shadow-md hover:shadow-primary/20 disabled:opacity-50"
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>

        <div className="mt-6 text-center text-[10px] text-text-muted font-body uppercase tracking-widest">
          İbreOto Güvenli Yönetim Sistemi
        </div>
      </motion.div>
    </div>
  );
}
