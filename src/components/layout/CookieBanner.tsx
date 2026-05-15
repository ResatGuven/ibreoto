"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, X } from 'lucide-react';

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:w-[450px] z-[100]"
        >
          <div className="bg-white/95 backdrop-blur-md border border-surface rounded-3xl shadow-2xl p-5 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-primary"></div>
            
            <button 
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-secondary transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              
              <div className="flex-grow pt-1">
                <h3 className="font-heading font-bold text-secondary uppercase tracking-widest text-[10px] md:text-xs mb-2 md:mb-3">Çerez Politikası & KVKK</h3>
                <p className="text-text-muted font-body text-[10px] md:text-xs leading-relaxed mb-4 md:mb-6">
                  Size daha iyi bir deneyim sunabilmek için yasal düzenlemelere uygun çerezler kullanıyoruz. Sitemizi kullanarak çerez kullanımını kabul etmiş sayılırsınız. 
                  <a href="/kvkk" className="text-primary font-bold hover:underline ml-1 uppercase">Detaylı Bilgi</a>
                </p>
                
                <div className="flex space-x-3">
                  <button
                    onClick={acceptCookies}
                    className="flex-grow bg-secondary hover:bg-secondary-hover text-white py-2.5 md:py-3 rounded-xl font-heading font-bold text-[9px] md:text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-secondary/10"
                  >
                    Tümünü Kabul Et
                  </button>
                  <button
                    onClick={() => setIsVisible(false)}
                    className="bg-surface hover:bg-surface-dark text-secondary px-4 md:px-6 py-2.5 md:py-3 rounded-xl font-heading font-bold text-[9px] md:text-[10px] uppercase tracking-widest transition-all"
                  >
                    Reddet
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
