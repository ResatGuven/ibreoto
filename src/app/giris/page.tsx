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
        callbackUrl: '/yonetim',
      });

      if (result?.error) {
        setError('Hatalı e-posta veya şifre.');
      } else {
        router.push('/yonetim');
        router.refresh();
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px] animate-pulse" />
      
      <motion.div 
        className="bg-[#111827]/80 backdrop-blur-2xl p-10 rounded-[2.5rem] shadow-2xl shadow-black/50 max-w-md w-full border border-white/5 relative z-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary-hover rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 mb-6 rotate-3">
            <span className="text-white font-black text-4xl italic">İO</span>
          </div>
          <h1 className="text-4xl font-heading font-black text-white mb-2 uppercase tracking-tighter italic">
            İBRE<span className="text-primary">OTO</span>
          </h1>
          <p className="text-gray-500 font-body text-xs uppercase tracking-[0.3em] font-bold">Yönetim Paneli</p>
        </div>
        
        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-[10px] font-heading font-black mb-6 text-center uppercase tracking-widest"
          >
            {error}
          </motion.div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="block text-gray-400 text-[10px] font-heading font-black uppercase tracking-widest ml-1">E-Posta Adresi</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ibreoto.com" 
              className="w-full p-4 bg-[#1F2937]/50 border border-white/5 rounded-2xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all font-body text-white text-sm placeholder:text-gray-600" 
            />
          </div>
          <div className="space-y-2">
            <label className="block text-gray-400 text-[10px] font-heading font-black uppercase tracking-widest ml-1">Güvenlik Şifresi</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              className="w-full p-4 bg-[#1F2937]/50 border border-white/5 rounded-2xl focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all font-body text-white text-sm placeholder:text-gray-600" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover text-white py-5 rounded-2xl font-heading font-black uppercase tracking-[0.2em] text-xs transition-all duration-500 transform hover:scale-[1.02] shadow-xl shadow-primary/20 disabled:opacity-50 group overflow-hidden relative"
          >
            <span className="relative z-10">{loading ? 'Doğrulanıyor...' : 'Sisteme Giriş Yap'}</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </button>
        </form>

        <div className="mt-10 text-center text-[9px] text-gray-600 font-body uppercase tracking-[0.4em] font-bold">
          İbreOto Premium Yönetim Sistemi v2.0
        </div>
      </motion.div>
    </div>
  );
}
