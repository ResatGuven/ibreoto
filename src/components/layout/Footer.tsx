import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div className="space-y-6">
          <div className="flex items-center">
            <img src="/images/logo.jpg" alt="ibreoto" className="h-16 w-auto bg-white p-1 rounded" />
          </div>
          <p className="text-gray-400 font-body text-sm leading-relaxed">
            "İbreni Yüksel, Yolunu Belirle."<br />
            Aracınız için aradığınız en kaliteli iç ve dış aksesuarlar, güvenli alışveriş ve hızlı kargo avantajıyla ibreoto'da.
          </p>
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/ibreoto" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Instagram size={18} />
            </a>
            <a href="https://www.facebook.com/ibreoto" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Facebook size={18} />
            </a>
          </div>
        </div>

        {/* Kurumsal */}
        <div>
          <h3 className="font-heading uppercase font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block">Kurumsal</h3>
          <ul className="space-y-3 font-body text-gray-400 text-sm">
            <li><Link href="/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
            <li><Link href="/iletisim" className="hover:text-primary transition-colors">İletişim</Link></li>
            <li><Link href="/bayilik" className="hover:text-primary transition-colors">Bayilik & Toptan</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            <li><Link href="/sss" className="hover:text-primary transition-colors">Sıkça Sorulan Sorular</Link></li>
          </ul>
        </div>

        {/* Müşteri Hizmetleri */}
        <div>
          <h3 className="font-heading uppercase font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block">Müşteri Hizmetleri</h3>
          <ul className="space-y-3 font-body text-gray-400 text-sm">
            <li><Link href="/mesafeli-satis-sozlesmesi" className="hover:text-primary transition-colors">Mesafeli Satış Sözleşmesi</Link></li>
            <li><Link href="/iade-kosullari" className="hover:text-primary transition-colors">İptal ve İade Koşulları</Link></li>
            <li><Link href="/kargo-teslimat" className="hover:text-primary transition-colors">Kargo ve Teslimat</Link></li>
            <li><Link href="/gizlilik" className="hover:text-primary transition-colors">Gizlilik Politikası</Link></li>
            <li><Link href="/kvkk" className="hover:text-primary transition-colors">KVKK Aydınlatma Metni</Link></li>
            <li><Link href="/siparis-takip" className="hover:text-primary transition-colors font-bold text-white">Siparişim Nerede?</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-6">
          <h3 className="font-heading uppercase font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block">İletişim</h3>
          <ul className="space-y-4 font-body text-gray-400 text-sm">
            <li className="flex items-start">
              <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
              <a href="tel:+905061578963" className="hover:text-primary transition-colors">0506 157 89 63</a>
            </li>
            <li className="flex items-start">
              <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
              <a href="mailto:destek@ibreoto.com" className="hover:text-primary transition-colors">destek@ibreoto.com</a>
            </li>
            <li className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-primary flex-shrink-0" />
              <a 
                href="https://maps.google.com/?q=Oto+Sanayi+Sitesi,+34.+Sokak,+Maslak,+İstanbul" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Oto Sanayi Sitesi, 34. Sokak, Maslak / İstanbul
              </a>
            </li>
          </ul>
          <div className="pt-4">
            <img src="https://www.shopier.com/img/footer_badge.png" alt="Shopier Güvenli Ödeme" className="h-10 opacity-80" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between font-body text-sm text-gray-500">
        <p>Copyright &copy; {new Date().getFullYear()} ibreoto. Tüm hakları saklıdır.</p>
        <div className="flex space-x-6 mt-4 md:mt-0 items-center">
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 grayscale hover:grayscale-0 transition-all opacity-50" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 grayscale hover:grayscale-0 transition-all opacity-50" />
        </div>
      </div>
    </footer>
  );
}
