"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, RotateCcw, Lock, Zap, Award, Star, Settings } from 'lucide-react';

const features = [
  { title: 'Premium Kalite', desc: 'Her ürün, aracınız için en yüksek kalite standartlarında titizlikle seçilir.', icon: Award },
  { title: 'Orijinal Ürün Garantisi', desc: 'Sattığımız tüm ürünler %100 orijinal ve marka garantilidir.', icon: ShieldCheck },
  { title: 'Hızlı Teslimat', desc: 'Siparişleriniz 24 saat içinde kargoya verilir, 1-3 iş günü içinde elinize ulaşır.', icon: Truck },
  { title: 'Kolay İade & Değişim', desc: 'Memnun kalmadığınız ürünlerde 14 gün içinde koşulsuz iade ve değişim imkanı.', icon: RotateCcw },
  { title: 'Müşteri Desteği', desc: 'Teknik detaylar ve montaj sorularınız için uzman ekibimiz her zaman yanınızda.', icon: Settings },
  { title: 'Güvenli Alışveriş', desc: '256-bit SSL sertifikası ve güvenli ödeme altyapısı ile verileriniz koruma altında.', icon: Lock },
];

export const WhyIbreoto = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Ayrıcalıklı Hizmet</p>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-secondary mb-6 uppercase tracking-tighter">
            NEDEN <span className="text-primary italic">İBREOTO?</span>
          </h2>
          <div className="w-32 h-1.5 bg-primary mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index} 
                className="bg-white p-10 rounded-[2.5rem] flex flex-col items-start space-y-6 border border-gray-100 hover:border-primary/20 shadow-xl shadow-gray-200/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 transform hover:-translate-y-3 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-secondary group-hover:bg-primary rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-lg rotate-3 group-hover:rotate-0">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-heading font-black text-xl text-secondary uppercase mb-3 tracking-tight group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="font-body text-gray-500 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
