"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Lock, Award, FlaskConical, Leaf } from 'lucide-react';
import Image from 'next/image';

const features = [
  { title: 'Saf & Doğal', desc: 'Tüm ürünlerimiz arıların doğal döngüsüne müdahale edilmeden, en saf haliyle üretilir.', icon: Leaf, emoji: '🌿' },
  { title: '%100 Yerli Üretim', desc: 'Bursa ve çevre illerin yüksek rakimlı yaylaşından gelen %100 yerli üretim garantisi.', icon: ShieldCheck, emoji: '📍' },
  { title: 'Hızlı Teslimat', desc: 'Taze ürünleriniz 24 saat içinde kargoya verilir, kapınıza kadar güvenle ulaşır.', icon: Truck, emoji: '📦' },
  { title: 'Lab Analizi Garantisi', desc: 'Tüm ürünlerimiz akredite laboratuvarlarda analiz edilerek sertifikalandırılır.', icon: FlaskConical, emoji: '🧪' },
  { title: 'Uzman Desteği', desc: 'Arı ürünleri kullanımı ve sağlığınıza etkileri hakkında uzman ekibimizden bilgi alın.', icon: Award, emoji: '🐝' },
  { title: 'Güvenli Alışveriş', desc: '256-bit SSL sertifikası ve güvenli ödeme altyapısı ile verileriniz koruma altında.', icon: Lock, emoji: '🔒' },
];

export const WhyArihayat = () => {
  return (
    <section className="py-24 honeycomb-bg overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-heading font-bold uppercase tracking-[0.4em] text-[10px] mb-4">Sağlıklı Bir Yaşam İçin</p>
          <h2 className="text-4xl md:text-6xl font-heading font-black text-secondary mb-6 uppercase tracking-tighter">
            NEDEN <span className="text-primary italic">ARI HAYAT?</span>
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

        {/* Beekeeper Spotlight */}
        <motion.div 
          className="mt-20 bg-gradient-to-br from-amber-50/60 to-orange-50/40 border border-amber-100 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-amber-900/5 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 md:gap-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Decorative gradients */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          {/* Beekeeper Photo Container */}
          <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 relative rounded-2xl overflow-hidden border-4 border-white shadow-xl shadow-amber-900/10 rotate-1 hover:rotate-0 transition-transform duration-300">
            <Image 
              src="/images/lead_beekeeper.png" 
              alt="Ömer Asaf Efendi" 
              fill
              className="object-cover"
              sizes="(max-width: 768px) 192px, 224px"
            />
          </div>

          {/* Beekeeper Info & Philosophy */}
          <div className="flex-1 text-left relative z-10">
            <span className="text-primary font-heading font-black uppercase tracking-[0.2em] text-[10px] bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              Kovanların Başındaki İsim
            </span>
            
            <h3 className="text-2xl md:text-3xl font-heading font-black text-secondary mt-3 mb-1 uppercase tracking-tight">
              ÖMER ASAF EFENDİ
            </h3>
            <p className="text-xs text-primary font-semibold tracking-wider uppercase mb-5">
              Arı Hayat Baş Arıcısı • 40+ Yıllık Yayla Tecrübesi
            </p>

            <blockquote className="relative">
              <span className="absolute -top-6 -left-4 text-7xl text-primary/10 font-serif pointer-events-none select-none">“</span>
              <p className="font-body text-gray-600 text-sm md:text-base leading-relaxed italic z-10 relative">
                Biz arılara sadece misafiriz. Onların emeğine, doğanın mucizevi döngüsüne ve yaylalarımızın doğallığına saygı duyduğumuz sürece, bize en saf şifayı sunuyorlar. Arı Hayat'ta her kavanoz bal, bu derin saygının ve nesiller boyu aktarılan geleneksel arıcılık felsefesinin bir meyvesidir.
              </p>
            </blockquote>

            <div className="mt-8 pt-6 border-t border-amber-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span className="text-xs font-bold text-secondary">Katkısız & Koruyucusuz Geleneksel Yöntemler</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                <span className="text-xs font-bold text-secondary">Bursa Yaylaları Doğal Coğrafi Tescil</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
