"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Truck } from 'lucide-react';

export default function KargoTeslimatPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Truck className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-heading font-bold uppercase mb-2">Kargo ve Teslimat</h1>
          <p className="text-gray-300 font-body text-sm max-w-2xl mx-auto">
            Siparişlerinizin gönderim süreci, teslimat süreleri ve kargo takibi hakkında detaylı bilgi.
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
          
          <h2>1. Kargo Firmaları</h2>
          <p>
            İbreOto olarak tüm Türkiye'ye Yurtiçi Kargo, MNG Kargo ve Aras Kargo aracılığıyla teslimat yapmaktayız. Siparişiniz sırasında size en uygun olan kargo firmasını seçebilirsiniz (belirli bölgelerde kısıtlı olabilir).
          </p>

          <h2>2. Gönderim Süresi</h2>
          <p>
            Hafta içi saat 16:00'a kadar verilen siparişler genellikle aynı gün kargoya teslim edilmektedir. Hafta sonu ve resmi tatillerde verilen siparişler, takip eden ilk iş günü işleme alınır.
          </p>

          <h2>3. Teslimat Süreleri</h2>
          <p>
            Kargoya verildikten sonra teslimat süresi, bulunduğunuz bölgeye bağlı olarak 1 ile 3 iş günü arasında değişmektedir. Mobil bölgelerde (merkezden uzak yerleşim yerleri) teslimat haftanın belirli günlerinde yapılabilmektedir.
          </p>

          <h2>4. Kargo Ücretleri</h2>
          <p>
            1000 TL ve üzerindeki alışverişlerinizde kargo ücretsizdir. Bu tutarın altındaki siparişlerde kargo ücreti, sepet sayfasında ve ödeme adımında şeffaf bir şekilde gösterilmektedir.
          </p>

          <h2>5. Hasarlı Kargo ve Paket Kontrolü</h2>
          <p>
            Paketinizi teslim alırken dış ambalajda herhangi bir hasar (yırtık, ıslaklık, ezilme) olup olmadığını kontrol ediniz. Hasarlı paketleri teslim almayarak kargo görevlisine "Hasar Tespit Tutanağı" tutturmanız, iade ve değişim sürecini hızlandıracaktır.
          </p>
        </div>
      </div>
    </div>
  );
}
