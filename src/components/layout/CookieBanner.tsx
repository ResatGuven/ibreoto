"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-[400px] bg-white border border-gray-100 shadow-2xl rounded-2xl p-6 z-[100] overflow-hidden"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
          
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-heading font-bold text-secondary text-sm uppercase tracking-tight">Çerez Kullanımı</h3>
                <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-text-muted font-body text-[11px] leading-relaxed mb-4">
                Size daha iyi bir alışveriş deneyimi sunabilmek için çerezler kullanıyoruz. Sitemizi kullanmaya devam ederek çerez kullanımını kabul etmiş sayılırsınız. 
                <Link href="/gizlilik" className="text-primary hover:underline ml-1 font-bold">Detaylı bilgi için tıklayın.</Link>
              </p>
              
              <div className="flex space-x-3">
                <button 
                  onClick={handleAccept}
                  className="flex-grow bg-primary hover:bg-primary-hover text-white py-2.5 rounded-lg font-heading font-bold text-[11px] uppercase tracking-wider transition-all duration-300 shadow-lg shadow-primary/20"
                >
                  Kabul Et
                </button>
                <button 
                  onClick={handleDecline}
                  className="px-4 py-2.5 border border-gray-100 hover:bg-gray-50 text-text-muted rounded-lg font-heading font-bold text-[11px] uppercase tracking-wider transition-all"
                >
                  Reddet
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
