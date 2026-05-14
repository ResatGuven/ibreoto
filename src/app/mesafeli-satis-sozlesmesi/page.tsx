"use client";

import React from 'react';

export default function MesafeliSatisPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-white font-body">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-heading font-bold text-secondary mb-8 uppercase border-b-2 border-primary pb-2">Mesafeli Satış Sözleşmesi</h1>
        
        <div className="prose prose-sm max-w-none text-gray-700 space-y-6 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-heading font-bold text-secondary mb-3 uppercase">1. TARAFLAR</h2>
            <p>İşbu Sözleşme aşağıdaki taraflar arasında aşağıda belirtilen hüküm ve şartlar çerçevesinde imzalanmıştır.</p>
            <p><strong>ALICI:</strong> (Sipariş sırasında belirtilen müşteri bilgileri)</p>
            <p><strong>SATICI:</strong> ibreoto (Bundan sonra "SATICI" olarak anılacaktır)</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-secondary mb-3 uppercase">2. KONU</h2>
            <p>İşbu Sözleşme’nin konusu, ALICI’nın SATICI’ya ait www.ibreoto.com internet sitesi üzerinden elektronik ortamda siparişini verdiği aşağıda nitelikleri ve satış fiyatı belirtilen ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmelere Dair Yönetmelik hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-secondary mb-3 uppercase">3. ÜRÜN BİLGİLERİ</h2>
            <p>Ürünün cinsi ve türü, miktarı, marka/modeli, rengi, satış bedeli sipariş formunda belirtildiği gibidir.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-secondary mb-3 uppercase">4. GENEL HÜKÜMLER</h2>
            <p>4.1. ALICI, SATICI’ya ait internet sitesinde sözleşme konusu ürünün temel nitelikleri, satış fiyatı ve ödeme şekli ile teslimata ilişkin ön bilgileri okuyup, bilgi sahibi olduğunu, elektronik ortamda gerekli teyidi verdiğini kabul, beyan ve taahhüt eder.</p>
            <p>4.2. Sözleşme konusu ürün, yasal 30 günlük süreyi aşmamak koşulu ile her bir ürün için ALICI’nın yerleşim yerinin uzaklığına bağlı olarak internet sitesindeki ön bilgiler kısmında açıklanan süre içinde ALICI veya gösterdiği adresteki kişi/kuruluşa teslim edilir.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-bold text-secondary mb-3 uppercase">5. CAYMA HAKKI</h2>
            <p>ALICI; mal satışına ilişkin mesafeli sözleşmelerde, ürünün kendisine veya gösterdiği adresteki kişi/kuruluşa teslim tarihinden itibaren 14 (on dört) gün içerisinde, SATICI’ya bildirmek şartıyla hiçbir hukuki ve cezai sorumluluk üstlenmeksizin ve hiçbir gerekçe göstermeksizin malı reddederek sözleşmeden cayma hakkını kullanabilir.</p>
          </section>
          
          <p className="text-gray-500 italic mt-8">Son Güncelleme: 14.05.2025</p>
        </div>
      </div>
    </div>
  );
}
