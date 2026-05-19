import DynamicPageClient from '@/components/layout/DynamicPageClient';

export default function SartlarPage() {
  const fallback = (
    <>
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
        Bu web sitesinde yer alan tüm içerikler (metinler, grafikler, logolar, görseller vb.) Arı Hayat'a ait olup, telif hakkı yasalarıyla korunmaktadır. İzinsiz olarak kopyalanamaz, çoğaltılamaz veya dağıtılamaz.
      </p>

      <h2>4. Hizmet Değişiklikleri</h2>
      <p>
        Şirketimiz, web sitesinde sunulan hizmetleri, ürünleri ve içerikleri önceden haber vermeksizin değiştirme, askıya alma veya sonlandırma hakkını saklı tutar.
      </p>

      <h2>5. Sorumluluk Reddi</h2>
      <p>
        Web sitesinde yer alan bilgilerin doğruluğu ve güncelliği için azami gayret gösterilmektedir; ancak bu bilgilerin hatasız olduğunu veya sitenin kesintisiz çalışacağını garanti etmiyoruz. Sitenin kullanımından doğabilecek doğrudan veya dolaylı zararlardan şirketimiz sorumlu tutulamaz.
      </p>
    </>
  );

  return <DynamicPageClient slug="sartlar" title="Kullanım Şartları" fallbackContent={fallback} />;
}
