"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function CerezPolitikasiPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100"
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-8 uppercase border-b-4 border-primary pb-4 inline-block">Çerez Politikası</h1>
          
          <div className="prose prose-amber max-w-none font-body text-text-muted leading-relaxed space-y-6">
            <p>
              Arı Hayat olarak, çevrimiçi mecralarımızı ziyaretleriniz sırasında deneyiminizi geliştirmek için çerezler, pikseller, gifler gibi bazı teknolojilerden ("çerezler") faydalanmaktayız.
            </p>
            
            <h2 className="text-xl font-bold text-secondary uppercase mt-8">Çerez Nedir?</h2>
            <p>
              Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcılar aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır.
            </p>

            <h2 className="text-xl font-bold text-secondary uppercase mt-8">Hangi Çerezleri Kullanıyoruz?</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması için gereklidir.</li>
              <li><strong>Performans Çerezleri:</strong> Sitenin kullanımını analiz etmemize yardımcı olur.</li>
              <li><strong>Fonksiyonel Çerezler:</strong> Tercihlerinizi hatırlamamızı sağlar.</li>
              <li><strong>Pazarlama Çerezleri:</strong> Size ilgi alanlarınıza göre reklamlar göstermek için kullanılır.</li>
            </ul>

            <h2 className="text-xl font-bold text-secondary uppercase mt-8">Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
            <p>
              Tarayıcınızın ayarlarını değiştirerek çerezlere ilişkin tercihlerinizi kişiselleştirme imkanına sahipsiniz. Çerezleri temizleyebilir veya engelleyebilirsiniz ancak bu durumda sitenin bazı özellikleri çalışmayabilir.
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
