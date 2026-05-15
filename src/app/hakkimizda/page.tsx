"use client";

import React from 'react';
import Link from 'next/link';
import { Target, Eye, Users, ShoppingBag, Truck, ShieldCheck, Award, ChevronRight, Zap, Star, Car, Settings } from 'lucide-react';

export default function HakkimizdaPage() {
  const testimonials = [
    { name: "Ahmet Yılmaz", comment: "İbreOto'dan aldığım ambiyans aydınlatma setinden çok memnun kaldım. Montajı çok kolaydı ve aracımın havası tamamen değişti.", role: "BMW 320i Sahibi" },
    { name: "Mehmet Demir", comment: "Hızlı kargo ve kaliteli ürün. Karbon fiber direksiyon kılıfı tam istediğim gibi çıktı. Teşekkürler!", role: "VW Golf Sahibi" },
    { name: "Selin Kaya", comment: "Müşteri hizmetleri çok ilgili. Ürün seçerken teknik detaylarda çok yardımcı oldular.", role: "Tesla Model 3 Sahibi" }
  ];

  const partners = [
    { name: "Bosch", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Bosch-logo.svg/1280px-Bosch-logo.svg.png" },
    { name: "3M", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/3M_logo.svg/1280px-3M_logo.svg.png" },
    { name: "Meguiar's", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/ef/Meguiars_Logo.svg/1200px-Meguiars_Logo.svg.png" },
    { name: "Brembo", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Brembo_logo.svg/1280px-Brembo_logo.svg.png" }
  ];

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-secondary text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2070')] bg-cover bg-center opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/80 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-heading font-bold uppercase text-sm tracking-widest mb-4 block animate-in slide-in-from-left duration-700">İbreOto Dünyası</span>
            <h1 className="text-6xl font-heading font-extrabold mb-6 uppercase leading-tight tracking-tighter">
              Aracınıza <span className="text-primary italic">Ruh</span> Katıyoruz
            </h1>
            <p className="text-gray-300 text-xl font-body mb-10 leading-relaxed max-w-xl">
              2010 yılında bir garajda başlayan otomotiv tutkusu, bugün Türkiye'nin en seçkin araç aksesuar platformuna dönüştü.
            </p>
            <div className="flex space-x-6">
              <Link href="/urunler" className="bg-primary hover:bg-primary-hover text-white font-heading font-bold uppercase py-4 px-8 rounded-full transition-all flex items-center shadow-lg shadow-primary/20">
                Koleksiyonu İncele <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <div className="space-y-2">
              <span className="text-5xl font-heading font-black text-secondary block">10K+</span>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Mutlu Sürücü</span>
            </div>
            <div className="space-y-2">
              <span className="text-5xl font-heading font-black text-primary block">500+</span>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Premium Ürün</span>
            </div>
            <div className="space-y-2">
              <span className="text-5xl font-heading font-black text-secondary block">15+</span>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Yıllık Deneyim</span>
            </div>
            <div className="space-y-2">
              <span className="text-5xl font-heading font-black text-primary block">81</span>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">İl Gönderim</span>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Story Section */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl rotate-2 transition-transform group-hover:rotate-1"></div>
            <img 
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1000" 
              alt="Kurucu Hikayesi" 
              className="relative rounded-2xl shadow-2xl object-cover h-[500px] w-full"
            />
            <div className="absolute bottom-8 right-8 bg-white p-6 rounded-xl shadow-xl border-l-4 border-primary">
              <p className="text-secondary font-heading font-bold text-lg">"Her araç bir hikaye anlatır."</p>
              <p className="text-gray-500 text-sm italic">- Kurucumuzun Notu</p>
            </div>
          </div>
          <div className="space-y-8">
            <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
              Biz Kimiz
            </div>
            <h2 className="text-4xl font-heading font-black text-secondary uppercase leading-none">Tutkudan <span className="text-primary">Profesyonelliğe</span></h2>
            <p className="text-gray-600 font-body text-lg leading-relaxed">
              İbreOto'nun hikayesi, kurucumuzun çocukluk yıllarında babasının klasik otomobilini tamir ederken duyduğu o ilk motor sesiyle başladı. Otomobillere olan bu bitmek bilmeyen merak, zamanla bir iş modeline dönüştü.
            </p>
            <p className="text-gray-600 font-body text-lg leading-relaxed">
              Bugün, sadece bir aksesuar satıcısı değiliz; aracınızın karakterini yansıtan, sürüş konforunuzu artıran ve teknolojiyle estetiği buluşturan bir çözüm ortağıyız. Her bir ürünü, sanki kendi aracımıza takacakmış gibi titizlikle seçiyoruz.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-secondary text-white rounded-lg flex items-center justify-center"><Zap size={20} /></div>
                <span className="font-heading font-bold text-secondary uppercase text-sm">Hızlı Montaj</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center"><Award size={20} /></div>
                <span className="font-heading font-bold text-secondary uppercase text-sm">Garantili Ürün</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Showroom & Depot Section */}
      <div className="bg-secondary py-24">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-4xl font-heading font-black text-white uppercase mb-4">Merkezimizi <span className="text-primary">Ziyaret Edin</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto uppercase text-xs tracking-widest font-bold">Showroom ve Lojistik Merkezimiz</p>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden h-96 relative group">
            <img src="https://images.unsplash.com/photo-1562141982-c5a79acdb553?q=80&w=1000" alt="Showroom" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-60"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-heading font-bold uppercase">Deneyim Merkezi</h3>
              <p className="text-sm opacity-80 uppercase tracking-widest">İstanbul Showroom</p>
            </div>
          </div>
          <div className="rounded-3xl overflow-hidden h-96 relative group">
            <img src="https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=1000" alt="Warehouse" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-60"></div>
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-heading font-bold uppercase">Lojistik Merkezi</h3>
              <p className="text-sm opacity-80 uppercase tracking-widest">Günde 1000+ Paket Çıkışı</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-black text-secondary uppercase mb-4">Müşterilerimiz <span className="text-primary">Ne Diyor?</span></h2>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="text-primary fill-primary w-5 h-5" />)}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100 hover:border-primary transition-colors">
                <p className="text-gray-600 font-body italic mb-8 leading-relaxed">"{t.comment}"</p>
                <div>
                  <h4 className="font-heading font-bold text-secondary uppercase">{t.name}</h4>
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners */}
      <div className="py-20 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400 font-bold uppercase text-xs tracking-[0.3em] mb-12">Çalıştığımız Markalar & Tedarikçiler</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all">
            {partners.map((p, i) => (
              <img key={i} src={p.logo} alt={p.name} className="h-8 md:h-12 w-auto object-contain" />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute right-0 top-0 h-full opacity-10 pointer-events-none">
          <Car size={400} className="-mr-20 -mt-20" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl font-heading font-black mb-6 uppercase tracking-tighter">Aracınızın Limitlerini Zorlamaya Hazır Mısınız?</h2>
          <p className="text-white/90 font-body mb-10 max-w-2xl mx-auto text-xl">
            Siz de binlerce memnun İbreOto müşterisi arasına katılın ve farkı hissedin.
          </p>
          <Link href="/urunler" className="bg-secondary hover:bg-black text-white font-heading font-bold uppercase py-5 px-12 rounded-full transition-all inline-block shadow-2xl text-lg">
            Hemen Başlayın
          </Link>
        </div>
      </div>
    </div>
  );
}
