"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, RotateCcw, Check, Heart, Shield, Award, HelpCircle } from 'lucide-react';
import Link from 'next/link';

interface ProductRecommendation {
  slug: string;
  name: string;
  category: string;
  image: string;
  price: number;
  reason: string;
  features: string[];
}

const recommendations: Record<string, ProductRecommendation> = {
  kestane: {
    slug: 'kestane-ihlamur-bali-400-gr',
    name: 'Kestane Ihlamur Balı 400 gr',
    category: 'Doğal Şifa Balı',
    image: '/images/products/bal.png',
    price: 740,
    reason: 'Öksürük, boğaz ağrısı ve solunum yolları şikayetleri için en yüksek antioksidan ve antibakteriyel değere sahip kestane ve ıhlamur harmanıdır.',
    features: ['Akciğer ve Solunum Desteği', 'Yoğun & Bitkisel Lezzet', 'Yüksek Prolin Değeri']
  },
  cicek: {
    slug: 'cicek-bali-850-gr',
    name: 'Çiçek Balı 850 gr',
    category: 'Günlük Tüketim Balı',
    image: '/images/products/bal.png',
    price: 600,
    reason: 'Çocukların tadını en çok sevdiği, kahvaltılarda güvenle tüketebileceğiniz, Bursa yaylalarından toplanan %100 doğal çiçek balıdır.',
    features: ['Hafif & Klasik Tatlı Lezzet', 'Çocuk Gelişimi İçin İdeal', 'Günlük Enerji Deposu']
  },
  yetiskin_karisim: {
    slug: 'yetiskin-karisim-400-gr',
    name: 'Yetişkin Karışım 400 gr',
    category: 'Apiterapi Karışımı',
    image: '/images/products/karisim.png',
    price: 1100,
    reason: 'Yerli ham bal, propolis, arı sütü ve polenin eşsiz zindelik formülüdür. Günlük enerji ihtiyacınızı karşılar ve sporcular için harika bir besindir.',
    features: ['Yüksek Zindelik & Hücre Yenileme', 'Bal + Arı Sütü + Polen + Propolis', 'Katkısız Doğal Güç']
  },
  kids_karisim: {
    slug: 'karisim-kids-400-gr',
    name: 'Karışım Kids 400 gr',
    category: 'Çocuk Özel Karışım',
    image: '/images/products/karisim.png',
    price: 650,
    reason: 'Çocukların hassas bağışıklık sistemine uygun oranlarda özel olarak hazırlanan; arı sütü, propolis, polen ve lezzetli ham bal karışımıdır.',
    features: ['Okul Dönemi Bağışıklık Koruması', '1 Yaş Üzeri Çocuklar İçin', 'Kolay Tüketim Sağlayan Tat']
  },
  propolis: {
    slug: 'zeytinyagli-propolis-50-ml',
    name: 'Zeytinyağlı Propolis 50 ml',
    category: 'Sıvı Ekstrakt',
    image: '/images/products/propolis.png',
    price: 350,
    reason: 'Alkol içermeyen, soğuk sıkım zeytinyağında çözülmüş saf propolis. Vücut direncini artırmak ve hastalıklara karşı kalkan oluşturmak için idealdir.',
    features: ['%100 Alkolsuz Ekstraksiyon', 'Güçlü Doğal Antibiyotik Etkisi', 'Günlük Birkaç Damla ile Koruma']
  }
};

export function HoneySelector() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [age, setAge] = useState('');
  const [taste, setTaste] = useState('');

  const handleNext = (val: string) => {
    if (step === 1) {
      setGoal(val);
      setStep(2);
    } else if (step === 2) {
      setAge(val);
      setStep(3);
    } else if (step === 3) {
      setTaste(val);
      setStep(4);
    }
  };

  const resetWizard = () => {
    setStep(1);
    setGoal('');
    setAge('');
    setTaste('');
  };

  const getRecommendation = (): ProductRecommendation => {
    if (goal === 'cough') {
      return recommendations.kestane;
    }
    if (goal === 'kids') {
      return recommendations.kids_karisim;
    }
    if (goal === 'energy') {
      return recommendations.yetiskin_karisim;
    }
    // Immunity target
    if (goal === 'immunity') {
      if (age === 'kids') {
        return recommendations.kids_karisim;
      }
      return recommendations.propolis;
    }
    // Fallback based on age or taste
    if (age === 'kids') {
      return taste === 'sweet' ? recommendations.cicek : recommendations.kids_karisim;
    }
    return taste === 'spicy' ? recommendations.kestane : recommendations.yetiskin_karisim;
  };

  const recommendedProduct = step === 4 ? getRecommendation() : null;

  return (
    <section className="py-20 bg-background relative overflow-hidden font-body">
      <div className="absolute inset-0 honeycomb-bg opacity-40"></div>
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12">
          <span className="text-primary font-heading font-black uppercase tracking-[0.3em] text-[10px] bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
            Kişiselleştirilmiş Şifa Sihirbazı
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-secondary mt-4 uppercase tracking-tight">
            HANGİ BALI <span className="text-primary italic">SEÇMELİYİM?</span>
          </h2>
          <p className="text-sm text-gray-500 max-w-lg mx-auto mt-3">
            Kafanız karışmasın. Sağlık hedefinizi ve tercihlerinizi belirtin, Bursa yaylalarından size en uygun şifayı bulalım.
          </p>
        </div>

        {/* Wizard Card Container */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          
          <AnimatePresence mode="wait">
            
            {/* Step 1: Health Goal */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Adım 1/3: Sağlık Hedefiniz</span>
                </div>
                <h3 className="text-lg md:text-xl font-heading font-bold text-secondary mb-6 uppercase">
                  Sizin veya ailenizin şu anki öncelikli ihtiyacı nedir?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'cough', emoji: '🤒', title: 'Öksürük, Boğaz & Solunum Desteği', desc: 'Kestane ve lüks bal kürleri ile rahatlama.' },
                    { id: 'immunity', emoji: '🛡️', title: 'Güçlü Bağışıklık & Kış Koruması', desc: 'Vücut direncini artıran propolis ve kürler.' },
                    { id: 'kids', emoji: '👶', title: 'Çocuk Gelişimi & Sağlıklı Beslenme', desc: 'Çocukların damak tadına uygun vitamin destekleri.' },
                    { id: 'energy', emoji: '⚡', title: 'Doğal Enerji, Zindelik & Spor', desc: 'Saf arı ürünleri ve polenle gelen hücre yenileme.' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleNext(opt.id)}
                      className="flex items-start text-left p-5 border border-gray-100 hover:border-primary/40 rounded-2xl bg-surface hover:bg-primary/5 transition-all duration-300 group hover:-translate-y-0.5"
                    >
                      <span className="text-3xl mr-4 p-2 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">{opt.emoji}</span>
                      <div>
                        <h4 className="font-heading font-bold text-secondary text-sm group-hover:text-primary transition-colors mb-1">{opt.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Age Group */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Adım 2/3: Yaş Grubu</span>
                </div>
                <h3 className="text-lg md:text-xl font-heading font-bold text-secondary mb-6 uppercase">
                  Ürünü tüketecek kişinin yaş aralığı nedir?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'kids', emoji: '🧒', title: '1-12 Yaş Arası Çocuk', desc: 'Çocuk bünyesine ve damak tadına uygun yumuşak formüller.' },
                    { id: 'adult', emoji: '🧑', title: 'Yetişkin (12+ Yaş)', desc: 'Yüksek yoğunluklu ve güçlü aktif apiterapi bileşenleri.' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleNext(opt.id)}
                      className="flex items-start text-left p-5 border border-gray-100 hover:border-primary/40 rounded-2xl bg-surface hover:bg-primary/5 transition-all duration-300 group hover:-translate-y-0.5"
                    >
                      <span className="text-3xl mr-4 p-2 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">{opt.emoji}</span>
                      <div>
                        <h4 className="font-heading font-bold text-secondary text-sm group-hover:text-primary transition-colors mb-1">{opt.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={resetWizard} className="mt-8 flex items-center text-xs text-gray-400 hover:text-primary transition-colors">
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Başa Dön
                </button>
              </motion.div>
            )}

            {/* Step 3: Taste Preference */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Adım 3/3: Tadım Tercihi</span>
                </div>
                <h3 className="text-lg md:text-xl font-heading font-bold text-secondary mb-6 uppercase">
                  Nasıl bir lezzet/kıvam tercih edersiniz?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 'sweet', emoji: '🍯', title: 'Klasik Tatlı & Hafif Lezzet', desc: 'Güleryüzlü, yumuşak, çocukların kolayca yiyebileceği tatlar.' },
                    { id: 'spicy', emoji: '🍂', title: 'Yoğun, Baharatlı & Karakteristik Lezzet', desc: 'Kendine has aroması olan, hafif buruk ve geniz yakan şifa balları.' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => handleNext(opt.id)}
                      className="flex items-start text-left p-5 border border-gray-100 hover:border-primary/40 rounded-2xl bg-surface hover:bg-primary/5 transition-all duration-300 group hover:-translate-y-0.5"
                    >
                      <span className="text-3xl mr-4 p-2 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">{opt.emoji}</span>
                      <div>
                        <h4 className="font-heading font-bold text-secondary text-sm group-hover:text-primary transition-colors mb-1">{opt.title}</h4>
                        <p className="text-xs text-gray-500 leading-relaxed">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <button onClick={resetWizard} className="mt-8 flex items-center text-xs text-gray-400 hover:text-primary transition-colors">
                  <RotateCcw className="w-3.5 h-3.5 mr-1" /> Başa Dön
                </button>
              </motion.div>
            )}

            {/* Step 4: Recommendation Results */}
            {step === 4 && recommendedProduct && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                {/* Result Image */}
                <div className="w-full md:w-1/3 flex justify-center bg-surface p-6 rounded-2xl border border-gray-50 relative group">
                  <div className="absolute top-2 left-2 bg-primary text-secondary text-[8px] font-black tracking-widest px-2 py-0.5 rounded-full uppercase">
                    ŞİFA ÖNERİSİ
                  </div>
                  <img src={recommendedProduct.image} alt={recommendedProduct.name} className="h-44 object-contain transition-transform group-hover:scale-105 duration-300" />
                </div>

                {/* Result Text */}
                <div className="w-full md:w-2/3">
                  <span className="text-[10px] text-primary uppercase font-bold tracking-widest">{recommendedProduct.category}</span>
                  <h3 className="text-xl md:text-2xl font-heading font-bold text-secondary mt-1 mb-3 uppercase tracking-tight">
                    {recommendedProduct.name}
                  </h3>
                  
                  <p className="text-xs text-gray-500 leading-relaxed mb-6 font-body">
                    {recommendedProduct.reason}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    {recommendedProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center text-xs text-secondary font-bold">
                        <span className="w-4 h-4 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mr-2 shrink-0">
                          <Check className="w-2.5 h-2.5" />
                        </span>
                        {feat}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-4 border-t border-gray-100 pt-5">
                    <div>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest">Özel Şifa Fiyatı</p>
                      <p className="text-xl font-heading font-black text-primary">{recommendedProduct.price} TL</p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <button onClick={resetWizard} className="p-3 border border-gray-200 hover:border-primary/40 rounded-xl text-gray-400 hover:text-primary transition-all active:scale-95" title="Yeniden Başlat">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/urun/${recommendedProduct.slug}`}
                        className="bg-primary hover:bg-amber-500 text-secondary font-heading font-black text-xs uppercase px-5 py-3 rounded-xl transition-all shadow-xl shadow-primary/10 flex items-center gap-1.5 hover:-translate-y-0.5"
                      >
                        Ürünü İncele <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
