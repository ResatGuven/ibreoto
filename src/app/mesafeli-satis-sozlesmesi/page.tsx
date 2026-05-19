"use client";

import React from 'react';

import DynamicPageClient from '@/components/layout/DynamicPageClient';

export default function MesafeliSatisPage() {
  const fallback = (
    <>
      <section>
        <h2 className="text-xl font-heading font-bold text-secondary mb-3 uppercase">1. TARAFLAR</h2>
        <p>İşbu Sözleşme aşağıdaki taraflar arasında aşağıda belirtilen hüküm ve şartlar çerçevesinde imzalanmıştır.</p>
        <p><strong>ALICI:</strong> (Sipariş sırasında belirtilen müşteri bilgileri)</p>
        <p><strong>SATICI:</strong><br />
        <strong>Unvan:</strong> Arı Hayat Gıda Sanayi ve Ticaret Ltd. Şti.<br />
        <strong>Adres:</strong> Bursa, Türkiye<br />
        <strong>Telefon:</strong> 0535 337 72 51<br />
        <strong>E-posta:</strong> destek@arihayat.com</p>
      </section>

      <section>
        <h2 className="text-xl font-heading font-bold text-secondary mb-3 uppercase">2. KONU</h2>
        <p>İşbu Sözleşme'nin konusu, ALICI'nın SATICI'ya ait arihayat.com internet sitesi üzerinden elektronik ortamda siparişini verdiği aşağıda nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>
      </section>

      <section>
        <h2 className="text-xl font-heading font-bold text-secondary mb-3 uppercase">3. ÜRÜN BİLGİLERİ</h2>
        <p>Ürünün cinsi ve türü, miktarı, marka/modeli, rengi, satış bedeli sipariş formunda belirtildiği gibidir.</p>
      </section>

      <section>
        <h2 className="text-xl font-heading font-bold text-secondary mb-3 uppercase">4. GENEL HÜKÜMLER</h2>
        <p>4.1. ALICI, SATICI'ya ait internet sitesinde sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup, bilgi sahibi olduğunu, elektronik ortamda gerekli teyidi verdiğini kabul, beyan ve taahhüt eder.</p>
        <p>4.2. Sözleşme konusu ürün, yasal 30 günlük süreyi aşmamak koşulu ile her bir ürün için ALICI'nın yerleşim yerinin uzaklığına bağlı olarak internet sitesindeki ön bilgiler kısmında açıklanan süre içinde ALICI veya gösterdiği adresteki kişi/kuruluşa teslim edilir.</p>
      </section>

      <section>
        <h2 className="text-xl font-heading font-bold text-secondary mb-3 uppercase">5. CAYMA HAKKI</h2>
        <p>ALICI; mal satışına ilişkin mesafeli sözleşmelerde, ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa teslim tarihinden itibaren 14 (on dört) gün içerisinde, SATICI'ya bildirmek şartıyla hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkını kullanabilir.</p>
      </section>
      
      <p className="text-gray-500 italic mt-8">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
    </>
  );

  return <DynamicPageClient slug="mesafeli-satis-sozlesmesi" title="Mesafeli Satış Sözleşmesi" fallbackContent={fallback} />;
}
