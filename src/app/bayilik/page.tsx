"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Handshake, MapPin, CheckCircle } from 'lucide-react';

export default function BayilikPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-background font-body">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
        >
          <div className="flex items-center space-x-4 mb-8">
            <Handshake className="text-primary w-12 h-12" />
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary uppercase border-b-4 border-primary pb-2">Bayilik Başvurusu</h1>
          </div>
          
          <div className="prose prose-amber max-w-none text-text-muted leading-relaxed space-y-6">
            <p>
              Arı Hayat olarak, doğal ve sağlıklı arı ürünlerimizi daha geniş kitlelere ulaştırmak amacıyla Türkiye genelinde bayilik ağımızı genişletiyoruz. Sektördeki 10 yıllık tecrübemiz ve yüksek kalite standartlarımızla, iş ortaklarımıza kazançlı bir iş modeli sunuyoruz.
            </p>

            <h2 className="text-xl font-heading font-bold text-secondary uppercase mt-8 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-primary" /> Neden Arı Hayat Bayisi Olmalısınız?
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>%100 Doğal ve Katkısız Ürün Garantisi</li>
              <li>Zengin Ürün Gamı (Bal, Arı Sütü, Propolis, Polen vb.)</li>
              <li>Pazarlama ve Reklam Desteği</li>
              <li>Yüksek Kar Marjı ve Sürekli Stok Desteği</li>
              <li>Hızlı ve Güvenilir Lojistik Ağı</li>
            </ul>

            <h2 className="text-xl font-heading font-bold text-secondary uppercase mt-8 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-primary" /> Başvuru Süreci
            </h2>
            <p>
              Bayilik başvurusu için <strong>destek@arihayat.com</strong> adresine firmanızın bilgilerini ve faaliyet göstermek istediğiniz bölgeyi içeren bir e-posta gönderebilir veya <strong>0535 337 72 51</strong> numaralı hattımızdan bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
