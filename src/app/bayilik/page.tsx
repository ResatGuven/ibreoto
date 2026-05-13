// Güncellendi
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Users } from 'lucide-react';

export default function BayilikPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ company: '', name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: 'Bayilik Başvurusu',
          message: `Firma Adı: ${formData.company}\nTelefon: ${formData.phone}\nMesaj: ${formData.message}`,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ company: '', name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Failed to submit application:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-secondary text-white py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            className="text-3xl md:text-5xl font-heading font-bold mb-4 uppercase tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Bayilik & Toptan Satış
          </motion.h1>
          <p className="text-gray-300 font-body text-sm max-w-2xl mx-auto">
            ibreoto ailesine katılarak kazancınızı artırın. Geniş ürün yelpazemiz ve avantajlı fiyatlarımızla yanınızdayız.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-surface p-6 rounded-xl border border-gray-100 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg text-secondary mb-2 uppercase">Yüksek Kar Marjı</h3>
              <p className="text-text-muted font-body text-xs">Bayilerimize özel iskontolar ile rekabetçi fiyatlar ve yüksek kazanç.</p>
            </div>
            <div className="bg-surface p-6 rounded-xl border border-gray-100 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg text-secondary mb-2 uppercase">Hızlı Sevkiyat</h3>
              <p className="text-text-muted font-body text-xs">Siparişleriniz aynı gün kargoya verilir, stok sorunu yaşamazsınız.</p>
            </div>
            <div className="bg-surface p-6 rounded-xl border border-gray-100 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg text-secondary mb-2 uppercase">Destek</h3>
              <p className="text-text-muted font-body text-xs">Özel bayi temsilciniz ile her an yanınızdayız.</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100">
            <h2 className="text-2xl font-heading font-bold text-secondary mb-6 text-center uppercase">Başvuru Formu</h2>
            
            {submitted ? (
              <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center text-green-700 font-body">
                Başvurunuz başarıyla alındı! Ekibimiz en kısa sürede sizinle iletişime geçecektir.
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-text-muted mb-1 text-sm font-body">Firma Adı</label>
                  <input type="text" name="company" value={formData.company} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" required />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-muted mb-1 text-sm font-body">Yetkili Adı</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" required />
                  </div>
                  <div>
                    <label className="block text-text-muted mb-1 text-sm font-body">Telefon</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" required />
                  </div>
                </div>
                <div>
                  <label className="block text-text-muted mb-1 text-sm font-body">E-Posta</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" required />
                </div>
                <div>
                  <label className="block text-text-muted mb-1 text-sm font-body">Mesajınız (Opsiyonel)</label>
                  <textarea name="message" value={formData.message} onChange={handleChange} rows={3} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"></textarea>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white px-4 py-3 rounded-xl font-heading font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-primary/20">
                  Başvuruyu Gönder
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
