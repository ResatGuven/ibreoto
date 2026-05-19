import DynamicPageClient from '@/components/layout/DynamicPageClient';

export default function UyelikSozlesmesiPage() {
  const fallback = (
    <>
      <h2 className="text-xl font-bold text-secondary uppercase mt-8">1. TARAFLAR</h2>
      <p>
        İşbu sözleşme, arihayat.com internet sitesi üzerinden üye olan kullanıcılar ile Arı Hayat (Bundan sonra "Şirket" olarak anılacaktır) arasında akdedilmiştir.
      </p>
      
      <h2 className="text-xl font-bold text-secondary uppercase mt-8">2. KONU</h2>
      <p>
        İşbu Sözleşme'nin konusu, internet sitesi üzerinden sunulan hizmetlerden üyelerin yararlanma şartlarının ve tarafların hak ve yükümlülüklerinin belirlenmesidir.
      </p>

      <h2 className="text-xl font-bold text-secondary uppercase mt-8">3. ÜYELİK ŞARTLARI</h2>
      <p>
        Üyelik, internet sitesinde yer alan üyelik formunun doldurulması ve onaylanması ile tamamlanır. Üye, verdiği bilgilerin doğru ve güncel olduğunu kabul eder.
      </p>

      <h2 className="text-xl font-bold text-secondary uppercase mt-8">4. HAK VE YÜKÜMLÜLÜKLER</h2>
      <p>
        Üye, internet sitesini kullanırken yasal mevzuat hükümlerine riayet etmeyi ve bunları ihlal etmemeyi kabul ve taahhüt eder. Şirket, üyenin sözleşmeye aykırı davranması durumunda üyeliği askıya alma veya iptal etme hakkına sahiptir.
      </p>

      <p className="mt-12 text-sm italic">
        Son Güncellenme Tarihi: {new Date().toLocaleDateString('tr-TR')}
      </p>
    </>
  );

  return <DynamicPageClient slug="uyelik-sozlesmesi" title="Üyelik Sözleşmesi" fallbackContent={fallback} />;
}
