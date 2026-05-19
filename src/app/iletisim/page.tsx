"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';
import Link from 'next/link';

export default function IletisimPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [kvkkAccepted, setKvkkAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!kvkkAccepted) return;

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'İletişim Formu Mesajı'
        })
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        setError(data.error || 'Mesaj gönderilirken bir sorun oluştu. Lütfen tekrar deneyin.');
      }
    } catch (e) {
      console.error('Contact submit error:', e);
      setError('Bağlantı hatası. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 bg-secondary text-white overflow-hidden">
        <div className="absolute inset-0 bg-honey-gradient honeycomb-bg opacity-10"></div>
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
            Ürünlerimiz hakkında bilgi almak, toptan sipariş veya iş birliği talepleriniz için bize ulaşın.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {/* Contact Info Cards */}
            <div className="bg-background p-6 rounded-xl border border-gray-100 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg text-secondary mb-2 uppercase">Adres</h3>
              <p className="text-text-muted font-body text-xs">
                Bursa, Türkiye
              </p>
            </div>
            <div className="bg-background p-6 rounded-xl border border-gray-100 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg text-secondary mb-2 uppercase">Telefon</h3>
              <p className="text-text-muted font-body text-xs mb-1">
                <a href="tel:+905363411984" className="hover:text-primary transition-colors font-bold">0536 341 19 84</a>
              </p>
              <p className="text-text-muted font-body text-xs">Pzt - Cmt: 09:00 - 19:00</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl border border-green-200 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-heading font-bold text-lg text-secondary mb-2 uppercase">WhatsApp</h3>
              <p className="text-text-muted font-body text-xs mb-1">
                <a href="https://wa.me/905353377251" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors font-bold text-green-700">0535 337 72 51</a>
              </p>
              <p className="text-text-muted font-body text-xs">7/24 Mesaj Gönderin</p>
            </div>
            <div className="bg-background p-6 rounded-xl border border-gray-100 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-heading font-bold text-lg text-secondary mb-2 uppercase">E-Posta</h3>
              <p className="text-text-muted font-body text-xs mb-1">
                <a href="mailto:destek@arihayat.com" className="hover:text-primary transition-colors font-bold">destek@arihayat.com</a>
              </p>
              <p className="text-text-muted font-body text-xs">7/24 Mail Gönderin</p>
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
                  <div className="flex items-start space-x-2 mb-4">
                    <input 
                      type="checkbox" 
                      id="kvkk" 
                      checked={kvkkAccepted}
                      onChange={(e) => setKvkkAccepted(e.target.checked)}
                      className="mt-1 accent-primary" 
                      required 
                    />
                    <label htmlFor="kvkk" className="text-[11px] text-text-muted font-body leading-tight cursor-pointer">
                      <Link href="/kvkk" className="text-primary hover:underline font-bold">KVKK Aydınlatma Metni</Link>'ni okudum ve kişisel verilerimin işlenmesini kabul ediyorum.
                    </label>
                  </div>
                  {error && (
                    <div className="bg-red-50 p-4 rounded-xl border border-red-200 text-center text-red-700 font-body text-xs">
                      {error}
                    </div>
                  )}
                  <button 
                    type="submit" 
                    disabled={isSubmitting || !kvkkAccepted}
                    className="w-full bg-primary hover:bg-primary-hover text-secondary px-4 py-3 rounded-xl font-heading font-bold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-primary/20 disabled:opacity-50 disabled:transform-none flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-secondary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Gönderiliyor...
                      </span>
                    ) : (
                      'Mesajı Gönder'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Google Map */}
            <div className="bg-background rounded-2xl border border-gray-100 overflow-hidden h-[400px] md:h-auto">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3046.297426177531!2d29.02058377652758!3d40.22464196726213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14ca3f707f59d64b%3A0xe679261c169df31c!2sG%C3%BCne%C5%9Ftepe%2C%201.%20Tu%C4%9Flal%C4%B1%20Sk%20No%3A3%2C%2016165%20Osmangazi%2FBursa!5e0!3m2!1str!2str!4v1715670000000!5m2!1str!2str" 
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
