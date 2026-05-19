import DynamicPageClient from '@/components/layout/DynamicPageClient';

export default function KvkkPage() {
  const fallback = (
    <>
      <h2>1. Veri Sorumlusu</h2>
      <p>
        6698 sayılı Kişisel Verilerin Korunması Kanunu ("Kanun") uyarınca, kişisel verileriniz; veri sorumlusu olarak <strong>Arı Hayat Gıda Sanayi ve Ticaret Ltd. Şti.</strong> (Bundan sonra "Şirket" olarak anılacaktır) tarafından aşağıda açıklanan kapsamda işlenebilecektir.
      </p>
      <p>
        <strong>Adres:</strong> Bursa, Türkiye<br />
        <strong>E-posta:</strong> destek@arihayat.com
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
    </>
  );

  return <DynamicPageClient slug="kvkk" title="KVKK Aydınlatma Metni" fallbackContent={fallback} />;
}
