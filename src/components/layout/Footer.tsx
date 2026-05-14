"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/site-info');
        const data = await res.json();
        if (data.settings) setSiteSettings(data.settings);
      } catch (e) {}
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-secondary text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div className="space-y-6">
          <div className="flex items-center">
            <img src={siteSettings?.logoUrl || "/images/logo.jpg"} alt="ibreoto" className="h-16 w-auto bg-white p-1 rounded" />
          </div>
          <p className="text-gray-400 font-body text-sm leading-relaxed">
            "{siteSettings?.siteDescription || "İbreni Yüksel, Yolunu Belirle."}"<br />
            Aracınız için aradığınız en kaliteli iç ve dış aksesuarlar, güvenli alışveriş ve hızlı kargo avantajıyla ibreoto'da.
          </p>
          <div className="flex space-x-4">
            <a href={siteSettings?.instagramUrl || "https://www.instagram.com/ibreoto"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Instagram size={18} />
            </a>
            <a href={siteSettings?.facebookUrl || "https://www.facebook.com/ibreoto"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Facebook size={18} />
            </a>
            {siteSettings?.twitterUrl && (
              <a href={siteSettings.twitterUrl} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Hızlı Linkler */}
        <div>
          <h3 className="font-heading uppercase font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block tracking-wider">HIZLI LİNKLER</h3>
          <ul className="space-y-3 font-body text-gray-400 text-sm">
            <li><Link href="/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
            <li><Link href="/iletisim" className="hover:text-primary transition-colors">İletişim</Link></li>
            <li><Link href="/bayilik" className="hover:text-primary transition-colors">Bayilik & Toptan</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors font-bold text-white">Blog</Link></li>
          </ul>
        </div>

        {/* Kategoriler */}
        <div>
          <h3 className="font-heading uppercase font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block tracking-wider">KATEGORİLER</h3>
          <ul className="space-y-3 font-body text-gray-400 text-sm">
            <li><Link href="/kategori/ic-aksesuar" className="hover:text-primary transition-colors">İç Aksesuar</Link></li>
            <li><Link href="/kategori/dis-aksesuar" className="hover:text-primary transition-colors">Dış Aksesuar</Link></li>
            <li><Link href="/kategori/teknoloji" className="hover:text-primary transition-colors">Teknoloji & Elektronik</Link></li>
            <li><Link href="/kategori/bakim" className="hover:text-primary transition-colors">Bakım & Temizlik</Link></li>
          </ul>
        </div>

        {/* İletişim */}
        <div className="space-y-6">
          <h3 className="font-heading uppercase font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block tracking-wider">İLETİŞİM</h3>
          <ul className="space-y-4 font-body text-gray-400 text-sm">
            <li className="flex items-start">
              <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
              <a href={`tel:${siteSettings?.contactPhone?.replace(/\s/g, '') || "+905061578963"}`} className="hover:text-primary transition-colors">{siteSettings?.contactPhone || "0506 157 89 63"}</a>
            </li>
            <li className="flex items-start">
              <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
              <a href={`mailto:${siteSettings?.contactEmail || "destek@ibreoto.com"}`} className="hover:text-primary transition-colors">{siteSettings?.contactEmail || "destek@ibreoto.com"}</a>
            </li>
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(siteSettings?.address || "Oto Sanayi Sitesi, 34. Sokak, Maslak, İstanbul")}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {siteSettings?.address || "Oto Sanayi Sitesi, 34. Sokak, Maslak / İstanbul"}
              </a>
            </li>
          </ul>
          <div className="pt-4">
            <img src="https://www.shopier.com/img/footer_badge.png" alt="Shopier Güvenli Ödeme" className="h-10 opacity-80" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between font-body text-sm text-gray-500">
        <p>Copyright &copy; {new Date().getFullYear()} {siteSettings?.siteName || "ibreoto"}. Tüm hakları saklıdır.</p>
        <div className="flex space-x-6 mt-4 md:mt-0 items-center">
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 grayscale hover:grayscale-0 transition-all opacity-50" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 grayscale hover:grayscale-0 transition-all opacity-50" />
        </div>
      </div>
    </footer>
  );
}
