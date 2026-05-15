"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw } from 'lucide-react';

export default function IadeKosullariPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <RefreshCw className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-heading font-bold uppercase mb-2">İptal ve İade Koşulları</h1>
          <p className="text-gray-300 font-body text-sm max-w-2xl mx-auto">
            Sipariş iptali ve ürün iade süreçleri hakkında bilmeniz gerekenler.
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
          
          <h2>1. İptal Koşulları</h2>
          <p>
            Siparişinizi kargoya verilmeden önce iptal edebilirsiniz. İptal talebinizi WhatsApp hattımız üzerinden veya ibreoto.tr@gmail.com adresine e-posta göndererek müşteri hizmetlerimize iletebilirsiniz. Kargoya verilmiş siparişlerde iptal işlemi yapılamaz, bu durumda iade süreci başlatılmalıdır.
          </p>

          <h2>2. İade Hakkı (Cayma Hakkı)</h2>
          <p>
            Tüketici Kanunu gereği, satın aldığınız ürünleri teslim aldığınız tarihten itibaren 14 gün içerisinde herhangi bir gerekçe göstermeksizin iade edebilirsiniz. İade edilecek ürünlerin orijinal ambalajında, kullanılmamış ve yeniden satılabilir durumda olması gerekmektedir.
          </p>

          <h2>3. İade Edilemeyecek Ürünler</h2>
          <p>
            Mesafeli Sözleşmeler Yönetmeliği uyarınca; ambalajı açılmış, bozulma riski olan gıda maddeleri (Bal, Arı Sütü, Propolis vb.) ile hijyen açısından iadeye uygun olmayan ürünlerde cayma hakkı kullanılamamaktadır. Ürünün koruma mührü/bandı açılmış olması durumunda iade kabul edilmemektedir.
          </p>

          <h2>4. İade Süreci ve Geri Ödeme</h2>
          <p>
            İade talebiniz tarafımıza ulaştıktan sonra ürünün incelenmesi yapılır. İade şartlarına uygunluğu onaylanan ürünler için geri ödeme süreci başlatılır.
          </p>
          
          <div className="bg-surface p-6 rounded-xl border-l-4 border-primary mb-6">
            <h4 className="font-heading font-bold text-secondary mb-2 uppercase text-sm">Geri Ödeme Nasıl Yapılır?</h4>
            <ul className="list-disc ml-5 space-y-2 text-sm font-body">
              <li><strong>Kredi Kartı:</strong> İade onaylandığında, tutar otomatik olarak kartınıza iade edilir. Ekstrenize yansıması bankanıza bağlı olarak 7-10 iş günü sürebilir.</li>
              <li><strong>Havale/EFT:</strong> İade onayı sonrası tarafınızdan IBAN bilgisi istenir ve ödeme belirttiğiniz hesaba 3 iş günü içinde yatırılır.</li>
              <li><strong>Taksitli Ödemeler:</strong> Banka prosedürleri gereği taksitli işlemler ekstrenize yine taksitli olarak iade edilebilir.</li>
            </ul>
          </div>

          <p className="text-xs text-text-muted italic">
            * Banka kaynaklı gecikmelerden firmamız sorumlu değildir. İadeniz gerçekleştiğinde tarafınıza e-posta veya SMS ile bilgi verilecektir.
          </p>

          <h2>5. Kusurlu Ürünler</h2>
          <p>
            Teslimat sırasında hasar görmüş veya üretim hatası olan ürünler için lütfen kargo görevlisine tutanak tutturunuz. Bu tür durumlarda değişim veya iade işlemleri ücretsiz olarak gerçekleştirilecektir.
          </p>
        </div>
      </div>
    </div>
  );
}
