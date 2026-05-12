"use client";

import React from 'react';
import Link from 'next/link';
import { Target, Eye, Users, ShoppingBag, Truck, ShieldCheck, Award, ChevronRight } from 'lucide-react';

export default function HakkimizdaPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-secondary text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611245555445-3b3fb001099b?q=80&w=2070')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <span className="text-primary font-heading font-bold uppercase text-sm tracking-wider mb-2 block">Biz Kimiz?</span>
            <h1 className="text-5xl font-heading font-bold mb-6 uppercase leading-tight">Yolculuğunuzu <span className="text-primary">Mükemmelleştiren</span> Dokunuş</h1>
            <p className="text-gray-300 text-lg font-body mb-8">
              İbreoto olarak, 2018'den beri araç tutkunlarına en kaliteli aksesuarları sunuyoruz. "İbreni Yükselt, Yolunu Belirle" sloganıyla çıktığımız bu yolda, aracınızı sadece bir ulaşım aracı değil, bir yaşam alanı olarak görüyoruz.
            </p>
            <div className="flex space-x-4">
              <Link href="/urunler" className="bg-primary hover:bg-primary-hover text-white font-heading font-bold uppercase py-3 px-6 rounded-lg transition-all flex items-center text-sm">
                Ürünlerimizi Keşfedin <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
              <Link href="/iletisim" className="bg-transparent border-2 border-white hover:bg-white hover:text-secondary text-white font-heading font-bold uppercase py-3 px-6 rounded-lg transition-all text-sm">
                Bize Ulaşın
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-surface py-12 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <span className="text-4xl font-heading font-bold text-primary block mb-1">10K+</span>
              <span className="text-text-muted text-sm font-body uppercase">Mutlu Müşteri</span>
            </div>
            <div className="p-4">
              <span className="text-4xl font-heading font-bold text-secondary block mb-1">500+</span>
              <span className="text-text-muted text-sm font-body uppercase">Ürün Çeşidi</span>
            </div>
            <div className="p-4">
              <span className="text-4xl font-heading font-bold text-secondary block mb-1">15+</span>
              <span className="text-text-muted text-sm font-body uppercase">Yıllık Tecrübe</span>
            </div>
            <div className="p-4">
              <span className="text-4xl font-heading font-bold text-primary block mb-1">24/7</span>
              <span className="text-text-muted text-sm font-body uppercase">Destek</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-secondary mb-3 uppercase">Misyonumuz</h3>
              <p className="text-text-muted font-body text-sm leading-relaxed">
                Her bütçeye ve her araç modeline uygun, yüksek kaliteli aksesuarları erişilebilir kılarak sürücülerin sürüş keyfini ve araç konforunu maksimuma çıkarmak. Yenilikçi çözümlerle otomotiv aksesuar sektöründe standartları belirlemek.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-heading font-bold text-secondary mb-3 uppercase">Vizyonumuz</h3>
              <p className="text-text-muted font-body text-sm leading-relaxed">
                Türkiye'nin en çok tercih edilen ve güvenilen otomotiv aksesuar markası olmak. Sadece ürün satan değil, araç kültürünü zenginleştiren ve topluluk oluşturan bir marka haline gelmek.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/5 rounded-3xl transform rotate-3 scale-105"></div>
            <div className="relative bg-white p-8 rounded-3xl border border-gray-100 shadow-lg">
              <span className="text-primary font-heading font-bold uppercase text-xs mb-2 block">Neden Biz?</span>
              <h2 className="text-3xl font-heading font-bold text-secondary mb-6 uppercase">Sıradan Değil, <span className="text-primary">Sıra Dışı</span> Hizmet</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-secondary text-sm uppercase">%100 Orijinal Ürünler</h4>
                    <p className="text-text-muted font-body text-xs mt-1">Sattığımız her ürün kalite kontrol ekibimiz tarafından onaylanmıştır.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-secondary text-sm uppercase">Hızlı ve Güvenli Teslimat</h4>
                    <p className="text-text-muted font-body text-xs mt-1">Siparişleriniz en geç 24 saat içinde kargoya teslim edilir.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center text-primary flex-shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-secondary text-sm uppercase">Müşteri Memnuniyeti Garantisi</h4>
                    <p className="text-text-muted font-body text-xs mt-1">Sorunsuz iade ve değişim politikamızla her zaman yanınızdayız.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-heading font-bold mb-4 uppercase">Aracınıza Hak Ettiği Değeri Verin</h2>
          <p className="text-white/80 font-body mb-8 max-w-2xl mx-auto text-sm">
            Hemen geniş ürün yelpazemizi inceleyin, aracınızın havasını ve konforunu değiştirecek aksesuarları keşfedin.
          </p>
          <Link href="/urunler" className="bg-white hover:bg-surface text-secondary font-heading font-bold uppercase py-3 px-8 rounded-lg transition-colors inline-block text-sm">
            Alışverişe Başla
          </Link>
        </div>
      </div>
    </div>
  );
}
