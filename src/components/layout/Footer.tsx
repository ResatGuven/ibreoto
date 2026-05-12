import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* Brand */}
        <div>
          <div className="flex items-center mb-6">
            <img src="/images/logo.jpg" alt="ibreoto" className="h-16 w-auto bg-white p-1 rounded" />
          </div>
          <p className="text-gray-400 mb-6 font-body text-sm leading-relaxed">
            "İbreni Yüksel, Yolunu Belirle."<br />
            Aracınız için aradığınız en kaliteli iç ve dış aksesuarlar, güvenli alışveriş ve hızlı kargo avantajıyla ibreoto'da.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="font-heading uppercase font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block">Hızlı Linkler</h3>
          <ul className="space-y-3 font-body text-gray-400">
            <li><Link href="/hakkimizda" className="hover:text-primary transition-colors">Hakkımızda</Link></li>
            <li><Link href="/iletisim" className="hover:text-primary transition-colors">İletişim</Link></li>
            <li><Link href="/bayilik" className="hover:text-primary transition-colors">Bayilik & Toptan</Link></li>
            <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="font-heading uppercase font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block">Kategoriler</h3>
          <ul className="space-y-3 font-body text-gray-400">
            <li><Link href="/kategori/ic-aksesuar" className="hover:text-primary transition-colors">İç Aksesuar</Link></li>
            <li><Link href="/kategori/dis-aksesuar" className="hover:text-primary transition-colors">Dış Aksesuar</Link></li>
            <li><Link href="/kategori/teknoloji" className="hover:text-primary transition-colors">Teknoloji & Elektronik</Link></li>
            <li><Link href="/kategori/bakim" className="hover:text-primary transition-colors">Bakım & Temizlik</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-heading uppercase font-bold text-lg mb-6 border-b border-gray-700 pb-2 inline-block">İletişim</h3>
          <ul className="space-y-3 font-body text-gray-400">
            <li>Müşteri Hizmetleri: 0850 123 45 67</li>
            <li>E-posta: destek@ibreoto.com</li>
            <li>Adres: Oto Sanayi Sitesi, 34. Sokak, Maslak / İstanbul</li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 pt-8 border-t border-gray-700 flex flex-col md:flex-row items-center justify-between font-body text-sm text-gray-500">
        <p>Copyright &copy; 2025 ibreoto. Tüm hakları saklıdır.</p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link href="/kvkk" className="hover:text-primary">KVKK</Link>
          <Link href="/gizlilik" className="hover:text-primary">Gizlilik Politikası</Link>
          <Link href="/sartlar" className="hover:text-primary">Kullanım Şartları</Link>
        </div>
      </div>
    </footer>
  );
};
