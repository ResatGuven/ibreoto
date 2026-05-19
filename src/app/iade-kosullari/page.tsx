import DynamicPageClient from '@/components/layout/DynamicPageClient';

export default function IadeKosullariPage() {
  const fallback = (
    <>
      <h2>1. İptal Koşulları</h2>
      <p>
        Siparişinizi kargoya verilmeden önce iptal edebilirsiniz. İptal talebinizi WhatsApp hattımız üzerinden veya destek@arihayat.com adresine e-posta göndererek müşteri hizmetlerimize iletebilirsiniz. Kargoya verilmiş siparişlerde iptal işlemi yapılamaz, bu durumda iade süreci başlatılmalıdır.
      </p>

      <h2>2. İade Hakkı (Cayma Hakkı)</h2>
      <p>
        Tüketici Kanunu gereği, satın aldığınız ürünleri teslim aldığınız tarihten itibaren 14 gün içerisinde herhangi bir gerekçe göstermeksizin iade edebilirsiniz. İade edilecek ürünlerin orijinal ambalajında, kullanılmamış ve yeniden satılabilir durumda olması gerekmektedir.
      </p>

      <h2>3. İade Edilemeyecek Ürünler</h2>
      <p>
        Mesafeli Sözleşmeler Yönetmeliği uyarınca; ambalajı açılmış, bozulma riski olan gıda maddeleri (Bal, Arı Sütü, Propolis vb.) ile hijyen açısından iadeye uygun olmayan ürünlerde cayma hakkı kullanılamamaktadır. Ürünün koruma mührü/bandı açılmış olması durumunda iade kabul edilmemektedir.
      </p>

      <h2>4. İade Süreci ve Geri Ödeme</h2>
      <p>
        İade talebiniz tarafımıza ulaştıktan sonra ürünün incelenmesi yapılır. İade şartlarına uygunluğu onaylanan ürünler için geri ödeme süreci başlatılır.
      </p>
      
      <div className="bg-surface p-6 rounded-xl border-l-4 border-primary mb-6">
        <h4 className="font-heading font-bold text-secondary mb-2 uppercase text-sm">Geri Ödeme Nasıl Yapılır?</h4>
        <ul className="list-disc ml-5 space-y-2 text-sm font-body">
          <li><strong>Kredi Kartı:</strong> İade onaylandığında, tutar otomatik olarak kartınıza iade edilir. Ekstrenize yansıması bankanıza bağlı olarak 7-10 iş günü sürebilir.</li>
          <li><strong>Havale/EFT:</strong> İade onayı sonrası tarafınızdan IBAN bilgisi istenir ve ödeme belirttiğiniz hesaba 3 iş günü içinde yatırılır.</li>
          <li><strong>Taksitli Ödemeler:</strong> Banka prosedürleri gereği taksitli işlemler ekstrenize yine taksitli olarak iade edilebilir.</li>
        </ul>
      </div>

      <p className="text-xs text-text-muted italic">
        * Banka kaynaklı gecikmelerden firmamız sorumlu değildir. İadeniz gerçekleştiğinde tarafınıza e-posta veya SMS ile bilgi verilecektir.
      </p>

      <h2>5. Kusurlu Ürünler</h2>
      <p>
        Teslimat sırasında hasar görmüş veya üretim hatası olan ürünler için lütfen kargo görevlisine tutanak tutturunuz. Bu tür durumlarda değişim veya iade işlemleri ücretsiz olarak gerçekleştirilecektir.
      </p>
    </>
  );

  return <DynamicPageClient slug="iade-kosullari" title="İptal ve İade Koşulları" fallbackContent={fallback} />;
}
