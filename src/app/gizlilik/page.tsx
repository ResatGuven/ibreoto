"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';

export default function GizlilikPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Lock className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-heading font-bold uppercase mb-2">Gizlilik Politikası</h1>
          <p className="text-gray-300 font-body text-sm max-w-2xl mx-auto">
            Verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında detaylı bilgi.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <Link href="/" className="text-text-muted hover:text-primary transition-colors flex items-center font-body text-sm mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> Ana Sayfaya Dön
        </Link>

        <div className="prose prose-sm sm:prose-base max-w-none font-body text-text-muted leading-relaxed
                       prose-headings:font-heading prose-headings:font-bold prose-headings:text-secondary prose-headings:uppercase
                       prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
                       prose-p:mb-4">
          
          <h2>1. Genel Bilgilendirme</h2>
          <p>
            İbreoto olarak, kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
          </p>

          <h2>2. Toplanan Veriler</h2>
          <p>
            Web sitemizi kullanırken; adınız, soyadınız, e-posta adresiniz, telefon numaranız ve adresiniz gibi kişisel bilgileri kendi rızanızla paylaşabilirsiniz. Ayrıca, site kullanım alışkanlıklarınız, IP adresiniz ve tarayıcı bilgileriniz çerezler (cookies) vasıtasıyla otomatik olarak toplanabilir.
          </p>

          <h2>3. Verilerin Kullanım Amaçları</h2>
          <p>
            Toplanan veriler; siparişlerinizin işleme alınması ve teslim edilmesi, müşteri hizmetleri desteği sağlanması, bülten ve pazarlama iletilerinin gönderilmesi (onayınız dahilinde), web sitemizin performansının artırılması ve yasal yükümlülüklerin yerine getirilmesi amaçlarıyla kullanılmaktadır.
          </p>

          <h2>4. Veri Güvenliği</h2>
          <p>
            Kişisel verileriniz, yetkisiz erişim, kayıp veya ifşa edilmeye karşı korumak amacıyla endüstri standardı güvenlik önlemleriyle korunmaktadır. Kredi kartı bilgileriniz SSL sertifikalı güvenli altyapılar üzerinden işlem görmekte olup, tarafımızca saklanmamaktadır.
          </p>

          <h2>5. Çerezler (Cookies)</h2>
          <p>
            Sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır. Çerez kullanımını tarayıcı ayarlarınızdan kısıtlayabilir veya tamamen kapatabilirsiniz; ancak bu durumda sitenin bazı fonksiyonları düzgün çalışmayabilir.
          </p>
        </div>
      </div>
    </div>
  );
}
