"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, ShieldCheck } from 'lucide-react';

export default function KargoTeslimatPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-background font-body">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
        >
          <div className="flex items-center space-x-4 mb-8">
            <Truck className="text-primary w-12 h-12" />
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary uppercase border-b-4 border-primary pb-2">Kargo ve Teslimat</h1>
          </div>
          
          <div className="prose prose-amber max-w-none text-text-muted leading-relaxed space-y-6">
            <p>
              Arı Hayat'tan verdiğiniz siparişlerin size en hızlı ve en güvenli şekilde ulaşması için Türkiye'nin önde gelen kargo firmalarıyla iş birliği yapıyoruz.
            </p>

            <h2 className="text-xl font-heading font-bold text-secondary uppercase mt-8 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-primary" /> Teslimat Süresi
            </h2>
            <p>
              Hafta içi saat 16:00'ya kadar verilen siparişler aynı gün kargoya teslim edilmektedir. 16:00'dan sonra veya hafta sonu verilen siparişler ise takip eden ilk iş gününde işleme alınır. Kargonuzun size ulaşma süresi bulunduğunuz bölgeye bağlı olarak 1-3 iş günü arasındadır.
            </p>

            <h2 className="text-xl font-heading font-bold text-secondary uppercase mt-8 flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-primary" /> Paketleme ve Güvenlik
            </h2>
            <p>
              Bal ve diğer arı ürünlerimiz, kırılma ve sızmaya karşı özel darbe emici paketlerle ambalajlanmaktadır. Arı sütü gibi soğuk zincir gerektiren ürünlerimiz ise ısı yalıtımlı özel ambalajlar ve buz aküleri ile sevk edilmektedir.
            </p>

            <h2 className="text-xl font-heading font-bold text-secondary uppercase mt-8">Kargo Ücretleri</h2>
            <p>
              Belirli bir tutarın üzerindeki alışverişlerinizde kargo ücretsizdir. Diğer siparişlerinizde kargo ücreti, ödeme sayfasında sepet tutarınıza göre otomatik olarak hesaplanacaktır.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
