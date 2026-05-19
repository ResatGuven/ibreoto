import DynamicPageClient from '@/components/layout/DynamicPageClient';

export default function GizlilikPage() {
  const fallback = (
    <>
      <h2>1. Genel Bilgilendirme</h2>
      <p>
        Arı Hayat olarak, kullanıcılarımızın gizliliğine büyük önem veriyoruz. Bu gizlilik politikası, web sitemizi ziyaret ettiğinizde veya hizmetlerimizi kullandığınızda kişisel verilerinizin nasıl toplandığını, kullanıldığını ve korunduğunu açıklamaktadır.
      </p>

      <h2>2. Toplanan Veriler</h2>
      <p>
        Web sitemizi kullanırken; adınız, soyadınız, e-posta adresiniz, telefon numaranız ve adresiniz gibi kişisel bilgileri kendi rızanızla paylaşabilirsiniz. Ayrıca, site kullanım alışkanlıklarınız, IP adresiniz ve tarayıcı bilgileriniz çerezler (cookies) vasıtasıyla otomatik olarak toplanabilir.
      </p>

      <h2>3. Verilerin Kullanım Amaçları</h2>
      <p>
        Toplanan veriler; siparişlerinizin işleme alınması ve teslim edilmesi, müşteri hizmetleri desteği sağlanması, bülten ve pazarlama iletilerinin gönderilmesi (onayınız dahilinde), web sitemizin performansının artırılması ve yasal yükümlülülüklerin yerine getirilmesi amaçlarıyla kullanılmaktadır.
      </p>

      <h2>4. Veri Güvenliği</h2>
      <p>
        Kişisel verileriniz, yetkisiz erişim, kayıp veya ifşa edilmeye karşı korumak amacıyla endüstri standardı güvenlik önlemleriyle korunmaktadır. Kredi kartı bilgileriniz SSL sertifikalı güvenli altyapılar üzerinden işlem görmekte olup, tarafımızca saklanmamaktadır.
      </p>

      <h2>5. Çerezler (Cookies)</h2>
      <p>
        Sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanmaktadır. Çerez kullanımını tarayıcı ayarlarınızdan kısıtlayabilir veya tamamen kapatabilirsiniz; ancak bu durumda sitenin bazı fonksiyonları düzgün çalışmayabilir.
      </p>
    </>
  );

  return <DynamicPageClient slug="gizlilik" title="Gizlilik Politikası" fallbackContent={fallback} />;
}
