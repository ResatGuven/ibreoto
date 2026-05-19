import DynamicPageClient from '@/components/layout/DynamicPageClient';

export default function AcikRizaBeyaniPage() {
  const fallback = (
    <>
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, Arı Hayat tarafından sunulan ürün ve hizmetlerden faydalanmam ve şirket ile olan ilişkim kapsamında;
      </p>
      
      <p>
        Kişisel verilerimin; şirket tarafından sunulan ürün ve hizmetlerin beğeni, kullanım alışkanlıklarım ve ihtiyaçlarıma göre özelleştirilerek bana önerilmesi, pazarlama faaliyetlerinin yürütülmesi, kampanya, çekiliş, indirim ve benzeri bildirimlerin tarafıma iletilmesi amaçlarıyla işlenmesine;
      </p>

      <p>
        Bu amaçlarla şirket&apos;in iş ortaklarına, tedarikçilerine ve kanunen yetkili kamu kurumlarına aktarılmasına; özgür irademle açık rıza verdiğimi kabul ve beyan ederim.
      </p>

      <p>
        Bu rızamı dilediğim zaman geri alma hakkına sahip olduğumu bildiğimi beyan ederim.
      </p>

      <p className="mt-12 text-sm italic">
        Son Güncellenme Tarihi: {new Date().toLocaleDateString('tr-TR')}
      </p>
    </>
  );

  return <DynamicPageClient slug="acik-riza-beyani" title="Açık Rıza Beyanı" fallbackContent={fallback} />;
}
