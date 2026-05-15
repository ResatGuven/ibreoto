"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Mail, Phone, MapPin, Youtube } from 'lucide-react';

export default function Footer() {
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch('/api/site-info');
        const data = await res.json();
        if (data.settings) setSiteSettings(data.settings);
        
        const catRes = await fetch('/api/products?categoriesOnly=true');
        const catData = await catRes.json();
        if (Array.isArray(catData)) setCategories(catData.slice(0, 4));
      } catch (e) {}
    };
    fetchInfo();
  }, []);

  return (
    <footer className="bg-secondary text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div className="space-y-6">
          <div className="flex items-center">
            <img 
              src={siteSettings?.logoUrl || "/images/logo.jpg"} 
              alt="ibreoto" 
              className="h-16 w-auto bg-white p-2 rounded-xl" 
            />
          </div>
          <p className="text-gray-400 font-body text-sm leading-relaxed">
            "{siteSettings?.siteDescription || "Aracınız için premium aksesuar çözümleri"}"<br />
            Aracınıza değer katan, şıklığı ve konforu bir araya getiren en kaliteli oto aksesuarları ile hizmetinizdeyiz.
          </p>
          <div className="flex space-x-4">
            <a href={siteSettings?.instagramUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Instagram size={18} />
            </a>
            <a href={siteSettings?.facebookUrl || "#"} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Facebook size={18} />
            </a>
            <a href="https://www.youtube.com/@ibreoto" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Kurumsal */}
        <div>
          <h3 className="font-heading uppercase font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block tracking-wider">KURUMSAL</h3>
          <ul className="space-y-3 font-body text-gray-400 text-sm">
            <li><Link href="/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
            <li><Link href="/iletisim" className="hover:text-primary transition-colors">İletişim</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link href="/siparis-takip" className="hover:text-primary transition-colors">Siparişim Nerede?</Link></li>
            <li><Link href="/sss" className="hover:text-primary transition-colors">Sıkça Sorulan Sorular</Link></li>
          </ul>
        </div>

        {/* Politikalar */}
        <div>
          <h3 className="font-heading uppercase font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block tracking-wider">POLİTİKALAR</h3>
          <ul className="space-y-3 font-body text-gray-400 text-sm">
            <li><Link href="/mesafeli-satis-sozlesmesi" className="hover:text-primary transition-colors">Mesafeli Satış Sözleşmesi</Link></li>
            <li><Link href="/iade-kosullari" className="hover:text-primary transition-colors">İptal ve İade Koşulları</Link></li>
            <li><Link href="/kargo-teslimat" className="hover:text-primary transition-colors">Kargo ve Teslimat</Link></li>
            <li><Link href="/gizlilik" className="hover:text-primary transition-colors">Gizlilik Politikası</Link></li>
            <li><Link href="/kvkk" className="hover:text-primary transition-colors">KVKK Aydınlatma Metni</Link></li>
            <li><Link href="/cerez-politikasi" className="hover:text-primary transition-colors">Çerez (Cookie) Politikası</Link></li>
          </ul>
        </div>

        {/* İletişim */}
        <div className="space-y-6">
          <h3 className="font-heading uppercase font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block tracking-wider">İLETİŞİM</h3>
          <ul className="space-y-4 font-body text-gray-400 text-sm">
            <li className="flex items-start">
              <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
              <a href={`tel:${siteSettings?.contactPhone?.replace(/\s/g, '') || "05061578963"}`} className="hover:text-primary transition-colors">{siteSettings?.contactPhone || "0506 157 89 63"}</a>
            </li>
            <li className="flex items-start">
              <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
              <a href={`mailto:${siteSettings?.contactEmail || "destek@ibreoto.com"}`} className="hover:text-primary transition-colors">{siteSettings?.contactEmail || "destek@ibreoto.com"}</a>
            </li>
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
              <a 
                href={`https://maps.google.com/?q=${encodeURIComponent(siteSettings?.address || "Güneştepe, 1. Tuğlalı Sk No:3, 16165 Osmangazi/Bursa")}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                {siteSettings?.address || "Güneştepe, 1. Tuğlalı Sk No:3, 16165 Osmangazi/Bursa"}
              </a>
            </li>
          </ul>
          <div className="pt-4 flex flex-col space-y-2">
            <p className="text-[10px] text-gray-500 uppercase font-bold">Güvenli Ödeme Altyapısı</p>
            <div className="flex space-x-2 items-center grayscale opacity-70">
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-3" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-4" />
              <img src="https://www.troyodeme.com/assets/images/troy-logo.png" alt="Troy" className="h-3" />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between font-body text-sm text-gray-500">
        <p>Copyright &copy; 2026 {siteSettings?.siteName || "ibreoto"}. Tüm hakları saklıdır.</p>
        <div className="mt-4 md:mt-0">
          <p className="text-[10px] uppercase tracking-widest">Powered by Esnekpos</p>
        </div>
      </div>
    </footer>
  );
}
