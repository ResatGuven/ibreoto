"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText } from 'lucide-react';

export default function SartlarPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <FileText className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-heading font-bold uppercase mb-2">Kullanım Şartları</h1>
          <p className="text-gray-300 font-body text-sm max-w-2xl mx-auto">
            Web sitemizi kullanırken uymanız gereken kurallar ve yasal şartlar.
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
          
          <h2>1. Kabul Edilme</h2>
          <p>
            Bu web sitesini ziyaret ederek veya kullanarak, bu kullanım şartlarının tamamını okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan etmiş olursunuz. Eğer bu şartları kabul etmiyorsanız, lütfen siteyi kullanmayınız.
          </p>

          <h2>2. Kullanım Amacı ve Kuralları</h2>
          <p>
            Bu site sadece yasal amaçlar için ve bu şartlara uygun olarak kullanılabilir. Sitenin güvenliğini ihlal etmek, siteye zarar vermek veya sitenin diğer kullanıcılar tarafından kullanılmasını engellemek kesinlikle yasaktır.
          </p>

          <h2>3. Fikri Mülkiyet Hakları</h2>
          <p>
            Bu web sitesinde yer alan tüm içerikler (metinler, grafikler, logolar, görseller vb.) İbreoto'ya ait olup, telif hakkı yasalarıyla korunmaktadır. İzinsiz olarak kopyalanamaz, çoğaltılamaz veya dağıtılamaz.
          </p>

          <h2>4. Hizmet Değişiklikleri</h2>
          <p>
            Şirketimiz, web sitesinde sunulan hizmetleri, ürünleri ve içerikleri önceden haber vermeksizin değiştirme, askıya alma veya sonlandırma hakkını saklı tutar.
          </p>

          <h2>5. Sorumluluk Reddi</h2>
          <p>
            Web sitesinde yer alan bilgilerin doğruluğu ve güncelliği için azami gayret gösterilmektedir; ancak bu bilgilerin hatasız olduğunu veya sitenin kesintisiz çalışacağını garanti etmiyoruz. Sitenin kullanımından doğabilecek doğrudan veya dolaylı zararlardan şirketimiz sorumlu tutulamaz.
          </p>
        </div>
      </div>
    </div>
  );
}
