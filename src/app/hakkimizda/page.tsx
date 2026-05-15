"use client";

import React from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';

export default function HakkimizdaPage() {
  const testimonials = [
    { name: "Fatma Y.", comment: "Arı Hayat&apos;ın kestane balı gerçekten muazzam. Çocukluğumdaki o gerçek bal tadını alabildiğim tek adres.", role: "Sadık Müşteri" },
    { name: "Ömer K.", comment: "Propolis ürünlerini bağışıklık için kullanıyoruz. Doğallığından hiç şüphemiz yok, çok memnunuz.", role: "Bursa Yerel Sakini" },
    { name: "Zeynep A.", comment: "Hızlı kargo ve özenli paketleme için teşekkürler. Ürünlerin saflığı her halinden belli oluyor.", role: "Anne & Beslenme Uzmanı" }
  ];

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-[#FFFBEB] text-secondary py-32 overflow-hidden">
        <div className="absolute inset-0 bg-honey-gradient honeycomb-bg opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-heading font-bold uppercase text-sm tracking-widest mb-4 block animate-in slide-in-from-left duration-700">Arı Hayat Dünyası</span>
            <h1 className="text-6xl font-heading font-extrabold mb-6 uppercase leading-tight tracking-tighter">
              Doğanın <span className="text-primary italic">En Saf</span> Halini Sofranıza Taşıyoruz
            </h1>
            <p className="text-gray-700 text-xl font-body mb-10 leading-relaxed max-w-xl">
              2013 yılında başlayan arıcılık serüvenimiz, bugün Türkiye&apos;nin en güvenilir doğal arı ürünleri platformuna dönüştü.
            </p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
              <span className="text-5xl font-heading font-black text-secondary block">5000+</span>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Mutlu Aile</span>
            </div>
            <div className="space-y-2">
              <span className="text-5xl font-heading font-black text-primary block">100%</span>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Doğal & Katkısız</span>
            </div>
            <div className="space-y-2">
              <span className="text-5xl font-heading font-black text-secondary block">10+</span>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Yıllık Deneyim</span>
            </div>
            <div className="space-y-2">
              <span className="text-5xl font-heading font-black text-primary block">24/7</span>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Müşteri Desteği</span>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Story Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl rotate-2 transition-transform group-hover:rotate-1"></div>
            <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image 
                src="/images/products/bal.png" 
                alt="Arıcılık Hikayemiz" 
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div className="absolute bottom-8 right-8 bg-white p-6 rounded-xl shadow-xl border-l-4 border-primary">
              <p className="text-secondary font-heading font-bold text-lg">&quot;Doğa bize en iyisini sunar.&quot;</p>
              <p className="text-gray-500 text-sm italic">- Arı Hayat Kurucusu</p>
            </div>
          </div>
          <div className="space-y-8">
            <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
              Hikayemiz
            </div>
            <h2 className="text-4xl font-heading font-black text-secondary uppercase leading-none">Bir Arıcılık <span className="text-primary">Tutkusu</span></h2>
            <p className="text-gray-600 font-body text-lg leading-relaxed">
              Arı Hayat&apos;ın hikâyesi, 2013 yılında ziraat tarafından düzenlenen bir arıcılık kursu ile başladı. Bu eğitimle başlayan doğa yolculuğumuz, arıların mucizevi dünyasını daha yakından tanımamıza vesile oldu.
            </p>
            <p className="text-gray-600 font-body text-lg leading-relaxed">
              Isıl işlem görmemiş, katkı maddesi içermeyen ve arıların doğal döngüsüne müdahale edilmeden üretilen ballarımızı sofralarınıza ulaştırmak en büyük gayemizdir. Şifa kaynağı ürünlerimizle sağlığınıza değer katıyoruz.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-black text-secondary uppercase mb-4">Sizden Gelen <span className="text-primary">Yorumlar</span></h2>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="text-primary fill-primary w-5 h-5" />)}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:border-primary transition-colors">
                <p className="text-gray-600 font-body italic mb-8 leading-relaxed">&quot;{t.comment}&quot;</p>
                <div>
                  <h4 className="font-heading font-bold text-secondary uppercase">{t.name}</h4>
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
