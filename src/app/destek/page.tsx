"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Headphones, MessageCircle, Phone, Mail } from 'lucide-react';

export default function DestekPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Headphones className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-heading font-bold uppercase mb-2">Destek Merkezi</h1>
          <p className="text-gray-300 font-body text-sm max-w-2xl mx-auto">
            Size yardımcı olmak için buradayız. Aşağıdaki kanallardan bize ulaşabilirsiniz.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-5xl">
        <Link href="/" className="text-text-muted hover:text-primary transition-colors flex items-center font-body text-sm mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> Ana Sayfaya Dön
        </Link>

        <div className="grid md:grid-cols-3 gap-8">
          {/* WhatsApp */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-heading font-bold text-secondary uppercase mb-2">WhatsApp Destek</h3>
            <p className="text-text-muted font-body text-sm mb-6">En hızlı çözüm için bize WhatsApp üzerinden yazın.</p>
            <a href="https://wa.me/905353377251" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 text-white font-heading font-bold py-2 px-6 rounded hover:bg-green-700 transition-colors uppercase text-xs">
              Sohbeti Başlat
            </a>
          </div>

          {/* Telefon */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="font-heading font-bold text-secondary uppercase mb-2">Müşteri Hattı</h3>
            <p className="text-text-muted font-body text-sm mb-6">Hafta içi 09:00 - 18:00 saatleri arasında bizi arayın.</p>
            <a href="tel:05353377251" className="inline-block bg-secondary text-white font-heading font-bold py-2 px-6 rounded hover:bg-primary transition-colors uppercase text-xs">
              Hemen Ara
            </a>
          </div>

          {/* E-posta */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center hover:shadow-md transition-shadow">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-heading font-bold text-secondary uppercase mb-2">E-Posta</h3>
            <p className="text-text-muted font-body text-sm mb-6">Sorularınızı e-posta yoluyla bize iletebilirsiniz.</p>
            <a href="mailto:destek@ibreoto.com" className="inline-block bg-primary text-white font-heading font-bold py-2 px-6 rounded hover:bg-secondary transition-colors uppercase text-xs">
              E-Posta Gönder
            </a>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8 items-center bg-surface rounded-3xl overflow-hidden">
          <div className="p-12">
            <h2 className="text-3xl font-heading font-bold text-secondary mb-6">Sıkça Sorulan Sorular</h2>
            <p className="text-text-muted font-body mb-8 leading-relaxed">
              Belki de sorunuzun cevabı çoktan verilmiştir. Hızlıca göz atmak ister misiniz?
            </p>
            <Link href="/sss" className="inline-block bg-secondary text-white font-heading font-bold py-3 px-10 rounded-lg hover:bg-primary transition-colors uppercase text-sm">
              Tüm Soruları Gör
            </Link>
          </div>
          <div className="hidden md:block h-full">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800" 
              alt="Destek" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
