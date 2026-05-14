"use client";

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export default function KvkkPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Shield className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-heading font-bold uppercase mb-2">KVKK Aydınlatma Metni</h1>
          <p className="text-gray-300 font-body text-sm max-w-2xl mx-auto">
            Kişisel verilerinizin güvenliği ve korunması hakkında bilgilendirme.
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
          
          <h2>1. Veri Sorumlusu</h2>
          <p>
            6698 sayılı Kişisel Verilerin Korunması Kanunu ("Kanun") uyarınca, kişisel verileriniz; veri sorumlusu olarak <strong>ARI HAYAT Gıda Sanayi ve Ticaret Ltd. Şti.</strong> (Bundan sonra "Şirket" olarak anılacaktır) tarafından aşağıda açıklanan kapsamda işlenebilecektir.
          </p>
          <p>
            <strong>Adres:</strong> Güneştepe, 1. Tuğlalı Sk No:3, 16165 Osmangazi/Bursa<br />
            <strong>E-posta:</strong> arihayat.tr@gmail.com
          </p>

          <h2>2. Kişisel Verilerin Hangi Amaçla İşleneceği</h2>
          <p>
            Toplanan kişisel verileriniz, Şirketimiz tarafından sunulan doğal arı ürünlerinden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması; Şirketimiz tarafından sunulan ürünlerin sizlerin beğeni, kullanım alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek sizlere önerilmesi; Şirketimizin ve Şirketimizle iş ilişkisi içerisinde olan kişilerin hukuki ve ticari güvenliğinin temini amaçlarıyla işlenebilecektir.
          </p>

          <h2>3. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</h2>
          <p>
            Toplanan kişisel verileriniz; yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda, iş ortaklarımıza, tedarikçilerimize, kanunen yetkili kamu kurumları ve özel kişilere, Kanun'un 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
          </p>

          <h2>4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
          <p>
            Kişisel verileriniz, Şirketimiz tarafından farklı kanallarla (web sitesi, mobil uygulama, çağrı merkezi vb.) ve farklı hukuki sebeplere dayanarak toplanmaktadır. Bu süreçte toplanan kişisel verileriniz, Kanun'un 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları kapsamında işbu Aydınlatma Metni'nde belirtilen amaçlarla da işlenebilmekte ve aktarılabilmektedir.
          </p>

          <h2>5. Kişisel Veri Sahibinin Kanun'un 11. Maddesinde Sayılan Hakları</h2>
          <p>
            Kişisel veri sahipleri olarak, haklarınıza ilişkin taleplerinizi Şirketimize iletmeniz durumunda, Şirketimiz talebin niteliğine göre talebi en kısa sürede ve en geç otuz gün içinde ücretsiz olarak sonuçlandıracaktır. Bu kapsamda kişisel veri sahipleri; kişisel veri işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep etme, işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme haklarına sahiptir.
          </p>
        </div>
      </div>
    </div>
  );
}
