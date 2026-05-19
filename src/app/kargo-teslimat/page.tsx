import DynamicPageClient from '@/components/layout/DynamicPageClient';

export default function KargoTeslimatPage() {
  const fallback = (
    <>
      <h2>1. Teslimat Süresi</h2>
      <p>
        Hafta içi saat 16:00'ya kadar verilen siparişler aynı gün kargoya teslim edilmektedir. 16:00'dan sonra veya hafta sonu ve resmi tatil günlerinde verilen siparişler, takip eden ilk iş gününde işleme alınır. Kargonuzun size ulaşma süresi bulunduğunuz bölgeye bağlı olarak 1-3 iş günü arasındadır.
      </p>

      <h2>2. Arı Sütü Soğuk Zincir Teslimat</h2>
      <p>
        Arı sütü ürünlerimiz canlılığını ve etkinliğini koruyabilmesi için derin dondurucuda muhafaza edilmekte ve soğuk zincir kargo ile gönderilmektedir. Özel ısı yalıtımlı ambalajlar ve buz aküleri kullanılarak soğuk zincir sürekliliği sağlanmaktadır. Teslim aldığınızda ürünü hemen buzdolabına koyunuz.
      </p>

      <h2>3. Paketleme ve Güvenlik</h2>
      <p>
        Bal ve diğer sıvı arı ürünlerimiz kırılma ve sızmaya karşı özel darbe emici, hava geçirmez paketlerle ambalajlanmaktadır. Tüm ürünlerimiz hijyenik koşullarda paketlenerek sevk edilir. Hasarlı veya sızmış ürün teslim etmeniz halinde bizimle iletişime geçiniz.
      </p>

      <h2>4. Kargo Ücretleri</h2>
      <p>
        1.500 TL ve üzeri alışverişlerinizde kargo tamamen ÜCRETSİZDİR. Altında kalan siparişlerde kargo ücreti, ödeme sayfasında sepet tutarınıza göre otomatik olarak hesaplanacaktır. Arı sütü ürünlerinde ek soğuk zincir kargo ücreti uygulanabilir.
      </p>

      <h2>5. Kargo Firması</h2>
      <p>
        Siparişleriniz Türkiye'nin güvenilir kargo firmaları (Yurtiçi Kargo, MNG Kargo, Sürat Kargo) aracılığıyla gönderilmektedir. Kargonuzun takip kodunu sipariş onay e-postanızda bulabilirsiniz.
      </p>
    </>
  );

  return <DynamicPageClient slug="kargo-teslimat" title="Kargo ve Teslimat" fallbackContent={fallback} />;
}
