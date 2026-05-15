"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function UyelikSozlesmesiPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100"
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-8 uppercase border-b-4 border-primary pb-4 inline-block">Üyelik Sözleşmesi</h1>
          
          <div className="prose prose-amber max-w-none font-body text-text-muted leading-relaxed space-y-6">
            <h2 className="text-xl font-bold text-secondary uppercase mt-8">1. TARAFLAR</h2>
            <p>
              İşbu sözleşme, ibreoto.com internet sitesi üzerinden üye olan kullanıcılar ile �breOto (Bundan sonra "Şirket" olarak anılacaktır) arasında akdedilmiştir.
            </p>
            
            <h2 className="text-xl font-bold text-secondary uppercase mt-8">2. KONU</h2>
            <p>
              İşbu Sözleşme’nin konusu, internet sitesi üzerinden sunulan hizmetlerden üyelerin yararlanma şartlarının ve tarafların hak ve yükümlülüklerinin belirlenmesidir.
            </p>

            <h2 className="text-xl font-bold text-secondary uppercase mt-8">3. ÜYELİK ŞARTLARI</h2>
            <p>
              Üyelik, internet sitesinde yer alan üyelik formunun doldurulması ve onaylanması ile tamamlanır. Üye, verdiği bilgilerin doğru ve güncel olduğunu kabul eder.
            </p>

            <h2 className="text-xl font-bold text-secondary uppercase mt-8">4. HAK VE YÜKÜMLÜLÜKLER</h2>
            <p>
              Üye, internet sitesini kullanırken yasal mevzuat hükümlerine riayet etmeyi ve bunları ihlal etmemeyi kabul ve taahhüt eder. Şirket, üyenin sözleşmeye aykırı davranması durumunda üyeliği askıya alma veya iptal etme hakkına sahiptir.
            </p>

            <p className="mt-12 text-sm italic">
              Son Güncellenme Tarihi: {new Date().toLocaleDateString('tr-TR')}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
