import DynamicPageClient from '@/components/layout/DynamicPageClient';

export default function BayilikPage() {
  const fallback = (
    <>
      <p>
        Arı Hayat olarak, doğal ve sağlıklı arı ürünlerimizi daha geniş kitlelere ulaştırmak amacıyla Türkiye genelinde bayilik ağımızı genişletiyoruz. Sektördeki 10 yıllık tecrübemiz ve yüksek kalite standartlarımızla, iş ortaklarımıza kazançlı bir iş modeli sunuyoruz.
      </p>

      <h2 className="text-xl font-heading font-bold text-secondary uppercase mt-8 flex items-center">
        Neden Arı Hayat Bayisi Olmalısınız?
      </h2>
      <ul className="list-disc pl-5 space-y-2">
        <li>%100 Doğal ve Katkısız Ürün Garantisi</li>
        <li>Zengin Ürün Gamı (Bal, Arı Sütü, Propolis, Polen vb.)</li>
        <li>Pazarlama ve Reklam Desteği</li>
        <li>Yüksek Kar Marjı ve Sürekli Stok Desteği</li>
        <li>Hızlı ve Güvenilir Lojistik Ağı</li>
      </ul>

      <h2 className="text-xl font-heading font-bold text-secondary uppercase mt-8 flex items-center">
        Başvuru Süreci
      </h2>
      <p>
        Bayilik başvurusu için <strong>destek@arihayat.com</strong> adresine firmanızın bilgilerini ve faaliyet göstermek istediğiniz bölgeyi içeren bir e-posta gönderebilir veya <strong>0535 337 72 51</strong> numaralı hattımızdan bizimle iletişime geçebilirsiniz.
      </p>
    </>
  );

  return <DynamicPageClient slug="bayilik" title="Bayilik Başvurusu" fallbackContent={fallback} />;
}
