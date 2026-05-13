// Güncellendi
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function IletisimPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: 'İletişim Mesajı',
          message: formData.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      }
    } catch (error) {
      console.error('Failed to submit message:', error);
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
            İletişim
          </motion.h1>
          <p className="text-gray-300 font-body text-sm max-w-2xl mx-auto">
            Sorularınız, önerileriniz veya destek talepleriniz için bizimle iletişime geçin.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <div className="bg-surface p-6 rounded-xl border border-gray-100 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg text-secondary mb-2 uppercase">Adres</h3>
              <p className="text-text-muted font-body text-xs">İkitelli O.S.B. Dolapdere Sanayi Sitesi, Başakşehir / İstanbul</p>
            </div>
            <div className="bg-surface p-6 rounded-xl border border-gray-100 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg text-secondary mb-2 uppercase">Telefon</h3>
              <p className="text-text-muted font-body text-xs mb-1">0850 123 45 67</p>
              <p className="text-text-muted font-body text-xs">Pzt - Cmt: 09:00 - 18:00</p>
            </div>
            <div className="bg-surface p-6 rounded-xl border border-gray-100 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg text-secondary mb-2 uppercase">E-Posta</h3>
              <p className="text-text-muted font-body text-xs mb-1">destek@ibreoto.com</p>
              <p className="text-text-muted font-body text-xs">7/24 Mail Gönderebilirsiniz</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl shadow-gray-100/50 border border-gray-100">
              <h2 className="text-2xl font-heading font-bold text-secondary mb-6 uppercase">Bize Yazın</h2>
              
              {submitted ? (
                <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center text-green-700 font-body">
                  Mesajınız başarıyla iletildi! En kısa sürede dönüş yapacağız.
                </div>
              ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label className="block text-text-muted mb-1 text-sm font-body">Adınız Soyadınız</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted mb-1 text-sm font-body">E-Posta Adresiniz</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" 
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-text-muted mb-1 text-sm font-body">Mesajınız</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4} 
                      className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" className="w-full bg-primary hover:bg-primary-hover text-white px-4 py-3 rounded-xl font-heading font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-primary/20">
                    Mesajı Gönder
                  </button>
                </form>
              )}
            </div>

            {/* Google Map */}
            <div className="bg-surface rounded-2xl border border-gray-100 overflow-hidden h-[400px] md:h-auto">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d192697.793276837!2d28.86701!3d41.0082376!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d!2sIstanbul!5e0!3m2!1sen!2str!4v1715450000000!5m2!1sen!2str" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
