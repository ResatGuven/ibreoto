import DynamicPageClient from '@/components/layout/DynamicPageClient';

export default function CerezPolitikasiPage() {
  const fallback = (
    <>
      <p>
        Arı Hayat olarak, çevrimiçi mecralarımızı ziyaretleriniz sırasında deneyiminizi geliştirmek için çerezler, pikseller, gifler gibi bazı teknolojilerden ("çerezler") faydalanmaktayız.
      </p>
      
      <h2 className="text-xl font-bold text-secondary uppercase mt-8">Çerez Nedir?</h2>
      <p>
        Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcılar aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır.
      </p>

      <h2 className="text-xl font-bold text-secondary uppercase mt-8">Hangi Çerezleri Kullanıyoruz?</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması için gereklidir.</li>
        <li><strong>Performans Çerezleri:</strong> Sitenin kullanımını analiz etmemize yardımcı olur.</li>
        <li><strong>Fonksiyonel Çerezler:</strong> Tercihlerinizi hatırlamamızı sağlar.</li>
        <li><strong>Pazarlama Çerezleri:</strong> Size ilgi alanlarınıza göre reklamlar göstermek için kullanılır.</li>
      </ul>

      <h2 className="text-xl font-bold text-secondary uppercase mt-8">Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
      <p>
        Tarayıcınızın ayarlarını değiştirerek çerezlere ilişkin tercihlerinizi kişiselleştirme imkanına sahipsiniz. Çerezleri temizleyebilir veya engelleyebilirsiniz ancak bu durumda sitenin bazı özellikleri çalışmayabilir.
      </p>

      <p className="mt-12 text-sm italic">
        Son Güncellenme Tarihi: {new Date().toLocaleDateString('tr-TR')}
      </p>
    </>
  );

  return <DynamicPageClient slug="cerez-politikasi" title="Çerez Politikası" fallbackContent={fallback} />;
}
