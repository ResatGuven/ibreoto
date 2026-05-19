const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding CMS data (CustomPages, Testimonials, FAQs)...');

  // 1. Custom Pages Seed
  const pages = [
    {
      title: 'Kişisel Verilerin Korunması Kanunu (KVKK)',
      slug: 'kvkk',
      content: `
        <p>
          Arı Hayat olarak, kişisel verilerinizin güvenliğine büyük önem veriyoruz. Bu kapsamda, başta özel hayatın gizliliği olmak üzere, anayasal haklarınızı korumak amacıyla 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca hazırlanan aydınlatma metnini bilgilerinize sunuyoruz.
        </p>

        <h2>1. Veri Sorumlusu</h2>
        <p>
          6698 sayılı KVKK uyarınca, kişisel verileriniz veri sorumlusu olarak Arı Hayat tarafından aşağıda açıklanan kapsamda işlenebilecektir.
        </p>

        <h2>2. Kişisel Verilerin İşlenme Amacı</h2>
        <p>
          Toplanan kişisel verileriniz, şirketimiz tarafından sunulan ürün ve hizmetlerin sizlerin beğeni, kullanım alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek sizlere önerilmesi ve tanıtılması; şirketimiz tarafından yürütülen ticari faaliyetlerin gerçekleştirilmesi için gerekli çalışmaların yapılması amaçlarıyla işlenmektedir.
        </p>

        <h2>3. İşlenen Kişisel Verilerin Aktarılması</h2>
        <p>
          Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda, iş ortaklarımıza, tedarikçilerimize, kanunen yetkili kamu kurumlarına ve özel kişilere KVKK'nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde aktarılabilecektir.
        </p>

        <h2>4. Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi</h2>
        <p>
          Kişisel verileriniz, şirketimizle temas kurduğunuz kanallar (web sitesi, mobil uygulama, fiziki mağaza vb.) aracılığıyla elektronik veya fiziki ortamlarda toplanmaktadır. Kişisel verilerinizin toplanmasının hukuki sebebi, sözleşmenin kurulması, ifası ve kanuni yükümlülüklerin yerine getirilmesidir.
        </p>
      `
    },
    {
      title: 'Gizlilik Sözleşmesi',
      slug: 'gizlilik',
      content: `
        <p>
          Arı Hayat, kullanıcıların arihayat.com sitesi üzerinden ilettikleri kişisel bilgilerini, Gizlilik Politikası ile belirlenen amaçlar ve kapsam dışında kullanmayacak, üçüncü kişilere açıklamayacak veya satmayacaktır.
        </p>

        <h2>1. Bilgilerin Korunması</h2>
        <p>
          Şirketimiz, kişisel bilgilerin gizli tutulmasını, güvenliğinin sağlanmasını ve yetkisiz erişimi engellemek için gerekli tüm teknik ve idari tedbirleri almaktadır. Kredi kartı gibi hassas ödeme bilgileri doğrudan banka altyapısıyla şifreli olarak işlenmekte, sitemizde depolanmamaktadır.
        </p>

        <h2>2. Çerezler (Cookies)</h2>
        <p>
          Sitemizde, kullanıcı deneyimini iyileştirmek ve site trafiğini analiz etmek amacıyla çerezler kullanılmaktadır. Çerez tercihlerini tarayıcınızın ayarlarından dilediğiniz gibi değiştirebilirsiniz.
        </p>
      `
    },
    {
      title: 'İade ve İptal Koşulları',
      slug: 'iade-kosullari',
      content: `
        <p>
          Arı Hayat'tan satın aldığınız ürünlerin iade ve iptal işlemleri, 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümlerine tabidir.
        </p>

        <h2>1. İade Hakkı</h2>
        <p>
          Almış olduğunuz gıda dışı ürünleri, teslim aldığınız tarihten itibaren 14 gün içinde ambalajını açmadan, bozmadan ve kullanmadan iade edebilirsiniz. Ancak arı sütü, karışımlar ve bal gibi gıda ürünlerinde, hijyen ve sağlık koşulları gereği ambalajı açılmış ürünlerin iadesi kabul edilmemektedir.
        </p>

        <h2>2. İade Süreci</h2>
        <p>
          İade etmek istediğiniz ürünü faturası ile birlikte tarafımıza göndermeniz gerekmektedir. İade onaylandığında, ürün bedeli 7 iş günü içinde kartınıza veya banka hesabınıza iade edilir.
        </p>
      `
    },
    {
      title: 'Mesafeli Satış Sözleşmesi',
      slug: 'mesafeli-satis-sozlesmesi',
      content: `
        <p>
          İşbu sözleşmenin konusu, ALICI'nın SATICI'ya ait arihayat.com internet sitesinden elektronik ortamda siparişini verdiği ürünün satışı ve teslimi ile ilgili olarak 6502 sayılı Tüketicinin Korunması Hakkındaki Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
        </p>

        <h2>1. Taraflar</h2>
        <p>
          SATICI: Arı Hayat (Adres: Güneştepe, 1. Tuğlalı Sk No:3, 16165 Osmangazi/Bursa)<br/>
          ALICI: Siteden alışveriş yapan ve üye olan kişi.
        </p>

        <h2>2. Sözleşme Konusu Ürünler</h2>
        <p>
          Ürünlerin cinsi, miktarı, marka/modeli, rengi ve satış bedeli sipariş formunda belirtildiği gibidir.
        </p>
      `
    },
    {
      title: 'Açık Rıza Beyanı',
      slug: 'acik-riza-beyani',
      content: `
        <p>
          6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Arı Hayat tarafından sunulan ürün ve hizmetlerden faydalanmam ve şirket ile olan ilişkim kapsamında;
        </p>
        
        <p>
          Kişisel verilerimin; şirket tarafından sunulan ürün ve hizmetlerin beğeni, kullanım alışkanlıklarım ve ihtiyaçlarıma göre özelleştirilerek bana önerilmesi, pazarlama faaliyetlerinin yürütülmesi, kampanya, çekiliş, indirim ve benzeri bildirimlerin tarafıma iletilmesi amaçlarıyla işlenmesine;
        </p>

        <p>
          Bu amaçlarla şirket'in iş ortaklarına, tedarikçilerine ve kanunen yetkili kamu kurumlarına aktarılmasına; özgür irademle açık rıza verdiğimi kabul ve beyan ederim.
        </p>

        <p>
          Bu rızamı dilediğim zaman geri alma hakkına sahip olduğumu bildiğimi beyan ederim.
        </p>
      `
    },
    {
      title: 'Çerez Politikası',
      slug: 'cerez-politikasi',
      content: `
        <p>
          Arı Hayat olarak, çevrimiçi mecralarımızı ziyaretleriniz sırasında deneyiminizi geliştirmek için çerezler, pikseller, gifler gibi bazı teknolojilerden ("çerezler") faydalanmaktayız.
        </p>
        
        <h2>Çerez Nedir?</h2>
        <p>
          Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcılar aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır.
        </p>

        <h2>Hangi Çerezleri Kullanıyoruz?</h2>
        <ul>
          <li><strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması için gereklidir.</li>
          <li><strong>Performans Çerezleri:</strong> Sitenin kullanımını analiz etmemize yardımcı olur.</li>
          <li><strong>Fonksiyonel Çerezler:</strong> Tercihlerinizi hatırlamamızı sağlar.</li>
          <li><strong>Pazarlama Çerezleri:</strong> Size ilgi alanlarınıza göre reklamlar göstermek için kullanılır.</li>
        </ul>

        <h2>Çerezleri Nasıl Kontrol Edebilirsiniz?</h2>
        <p>
          Tarayıcınızın ayarlarını değiştirerek çerezlere ilişkin tercihlerinizi kişiselleştirme imkanına sahipsiniz. Çerezleri temizleyebilir veya engelleyebilirsiniz ancak bu durumda sitenin bazı özellikleri çalışmayabilir.
        </p>
      `
    },
    {
      title: 'Bayilik Başvurusu',
      slug: 'bayilik',
      content: `
        <p>
          Arı Hayat olarak, doğal ve sağlıklı arı ürünlerimizi daha geniş kitlelere ulaştırmak amacıyla Türkiye genelinde bayilik ağımızı genişletiyoruz. Sektördeki 10 yıllık tecrübemiz ve yüksek kalite standartlarımızla, iş ortaklarımıza kazançlı bir iş modeli sunuyoruz.
        </p>

        <h2>Neden Arı Hayat Bayisi Olmalısınız?</h2>
        <ul>
          <li>%100 Doğal ve Katkısız Ürün Garantisi</li>
          <li>Zengin Ürün Gamı (Bal, Arı Sütü, Propolis, Polen vb.)</li>
          <li>Pazarlama ve Reklam Desteği</li>
          <li>Yüksek Kar Marjı ve Sürekli Stok Desteği</li>
          <li>Hızlı ve Güvenilir Lojistik Ağı</li>
        </ul>

        <h2>Başvuru Süreci</h2>
        <p>
          Bayilik başvurusu için <strong>destek@arihayat.com</strong> adresine firmanızın bilgilerini ve faaliyet göstermek istediğiniz bölgeyi içeren bir e-posta gönderebilir veya <strong>0535 337 72 51</strong> numaralı hattımızdan bizimle iletişime geçebilirsiniz.
        </p>
      `
    },
    {
      title: 'Kargo ve Teslimat',
      slug: 'kargo-teslimat',
      content: `
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
      `
    },
    {
      title: 'Kullanım Şartları',
      slug: 'sartlar',
      content: `
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
          Şirketimiz, web sitesinde sunulan hizmetleri, ürünleri ve içerikleri önceden haber vermöksek değiştirmek, askıya almak veya sonlandırmak hakkını saklı tutar.
        </p>

        <h2>5. Sorumluluk Reddi</h2>
        <p>
          Web sitesinde yer alan bilgilerin doğruluğu ve güncelliği için azami gayret gösterilmektedir; ancak bu bilgilerin hatasız olduğunu veya sitenin kesintisiz çalışacağını garanti etmiyoruz. Sitenin kullanımından doğabilecek doğrudan veya dolaylı zararlardan şirketimiz sorumlu tutulamaz.
        </p>
      `
    },
    {
      title: 'Üyelik Sözleşmesi',
      slug: 'uyelik-sozlesmesi',
      content: `
        <h2>1. TARAFLAR</h2>
        <p>
          İşbu sözleşme, arihayat.com internet sitesi üzerinden üye olan kullanıcılar ile Arı Hayat (Bundan sonra "Şirket" olarak anılacaktır) arasında akdedilmiştir.
        </p>
        
        <h2>2. KONU</h2>
        <p>
          İşbu Sözleşme'nin konusu, internet sitesi üzerinden sunulan hizmetlerden üyelerin yararlanma şartlarının ve tarafların hak ve yükümlülüklerinin belirlenmesidir.
        </p>

        <h2>3. ÜYELİK ŞARTLARI</h2>
        <p>
          Üyelik, internet sitesinde yer alan üyelik formunun doldurulması ve onaylanması ile tamamlanır. Üye, verdiği bilgilerin doğru ve güncel olduğunu kabul eder.
        </p>

        <h2>4. HAK VE YÜKÜMLÜLÜKLER</h2>
        <p>
          Üye, internet sitesini kullanırken yasal mevzuat hükümlerine riayet etmeyi ve bunları ihlal etmemeyi kabul ve taahhüt eder. Şirket, üyenin sözleşmeye aykırı davranması durumunda üyeliği askıya alma veya iptal etme hakkına sahiptir.
        </p>
      `
    }
  ];

  for (const page of pages) {
    const exists = await prisma.customPage.findUnique({
      where: { slug: page.slug }
    });
    if (!exists) {
      console.log(`Creating page: ${page.slug}`);
      await prisma.customPage.create({
        data: {
          title: page.title,
          slug: page.slug,
          content: page.content,
          isActive: true
        }
      });
    } else {
      console.log(`Page already exists: ${page.slug}`);
    }
  }

  // 2. Testimonials Seed
  const testimonials = [
    { name: "Fatma Y.", comment: "Arı Hayat'ın kestane balı gerçekten muazzam. Çocukluğumdaki o gerçek bal tadını alabildiğim tek adres.", role: "Sadık Müşteri", rating: 5 },
    { name: "Ömer K.", comment: "Propolis ürünlerini bağışıklık için kullanıyoruz. Doğallığından hiç şüphemiz yok, çok memnunuz.", role: "Bursa Yerel Sakini", rating: 5 },
    { name: "Zeynep A.", comment: "Hızlı kargo ve özenli paketleme için teşekkürler. Ürünlerin saflığı her halinden belli oluyor.", role: "Anne & Beslenme Uzmanı", rating: 5 },
    { name: "Mehmet S.", comment: "Arı sütünü 3 aydır kullanıyorum, bağışıklığım çok güçlendi. Kalite ve fiyat dengesi harika.", role: "Düzenli Müşteri", rating: 5 },
  ];

  for (const test of testimonials) {
    const exists = await prisma.testimonial.findFirst({
      where: { name: test.name, comment: test.comment }
    });
    if (!exists) {
      console.log(`Creating testimonial: ${test.name}`);
      await prisma.testimonial.create({
        data: {
          name: test.name,
          role: test.role,
          comment: test.comment,
          rating: test.rating,
          isActive: true
        }
      });
    } else {
      console.log(`Testimonial already exists: ${test.name}`);
    }
  }

  // 3. FAQs Seed
  const faqs = [
    { category: "Sipariş & Teslimat", question: "Siparişim ne zaman kargoya verilir?", answer: "Hafta içi saat 16:00'a kadar verdiğiniz siparişler genellikle aynı gün kargoya teslim edilmektedir. Hafta sonu ve resmi tatillerde verilen siparişler ise takip eden ilk iş gününde işleme alınır.", order: 1 },
    { category: "Sipariş & Teslimat", question: "Kargo ücreti ne kadar?", answer: "1.500 TL ve üzeri alışverişlerinizde kargo tamamen ücretsizdir. Altında kalan siparişlerde standart kargo ücreti uygulanır.", order: 2 },
    { category: "Sipariş & Teslimat", question: "Kaç günde teslim alırım?", answer: "Türkiye genelinde kargonuz genellikle 1-3 iş günü içinde teslim edilir. Bulunduğunuz bölgeye göre bu süre değişebilir.", order: 3 },
    { category: "Ürünler & Saklama", question: "Arı sütü nasıl saklanmalıdır?", answer: "Arı sütü mutlaka buzdolabında (0-4°C) saklanmalıdır. Donmuş olarak teslim edilir, açılmadan önce buzdolabında çözdürülmeli ve açıldıktan sonra en fazla 3-4 haftada tüketilmelidir. Uzun dönem saklama için derin dondurucuda (-18°C) bekletilebilir.", order: 4 },
    { category: "Ürünler & Saklama", question: "Zeytinyağlı propolis nasıl saklanır?", answer: "Propolis ürünleri oda sıcaklığında (15-25°C), doğrudan güneş ışığı ve nem görmeyecek serin bir yerde muhafaza edilebilir. Açıldıktan sonra serin ve karanlık bir yerde saklanması önerilir.", order: 5 },
    { category: "Ürünler & Saklama", question: "Bal nasıl saklanmalıdır?", answer: "Bal oda sıcaklığında, kuru ve doğrudan güneş ışığı almayan bir yerde saklanabilir. Buzdolabına konulması gerekmez; aksine kristalleşmeyi hızlandırabilir. Kristalleşme balın doğal olduğunun göstergesidir.", order: 6 },
    { category: "Ürünler & Saklama", question: "Ürünleriniz %100 doğal mı?", answer: "Evet. Tüm Arı Hayat ürünleri %100 doğal ve katkısızdır. Kendi arılıklarımızda kimyasal ilaçlama yapılmaz, hiçbir ürünümüze yapay tatlandırıcı veya koruyucu eklenmez. 'Kendimizin ve çocuklarımızın tüketmeyeceği hiçbir ürünü satışa sunmayız.'", order: 7 },
    { category: "Sağlık & Kullanım", question: "Arı sütü nasıl kullanılır, ne kadar tüketilmeli?", answer: "Günde 1 tatlı kaşığı (yaklaşık 5 gr) arı sütü tüketilmesi önerilir. Tercihen sabah aç karnına yenilmesi tavsiye edilir. Saf olarak ağız altında tutularak veya bal ile karıştırılarak tüketilebilir.", order: 8 },
    { category: "Sağlık & Kullanım", question: "Propolis kime önerilir?", answer: "Propolis, doğal antimikrobiyal özellikleriyle bağışıklık sistemini destekler. Kış aylarında, grip sezonunda veya bağışıklığı zayıf bireylere önerilir. Çocuklar için zeytinyağlı formülümüz alkol içermediği için güvenle kullanılabilir.", order: 9 },
    { category: "Sağlık & Kullanım", question: "Arı ürünlerine alerjim varsa ne yapmalıyım?", answer: "Arı ürünlerine karşı alerjisi olan bireyler için bu ürünler uygun olmayabilir. Kullanmadan önce küçük bir miktar ile hassasiyet testi yapılması ve herhangi bir sağlık sorununuz varsa doktorunuza danışmanız tavsiye edilir.", order: 10 },
    { category: "Sağlık & Kullanım", question: "Çocuklar arı ürünleri kullanabilir mi?", answer: "1 yaşın altındaki bebekler bal ve arı ürünü tüketemez. 1 yaş üstü çocuklar için özel 'Karışım Kids' ürünlerimiz bulunmaktadır. Çocuklarda kullanım dozajı için bir uzmana danışmanızı öneririz.", order: 11 },
    { category: "İade & Ödeme", question: "İade süreci nasıl işler?", answer: "Ürünü teslim aldığınız tarihten itibaren 14 gün içinde orijinal ambalajı açılmamış ve kullanılmamış olarak iade edebilirsiniz. Gıda ürünlerinde ambalaj açıldıktan sonra hijyen kuralları gereği iade kabul edilmemektedir.", order: 12 },
    { category: "İade & Ödeme", question: "Ödeme seçenekleriniz nelerdir?", answer: "Web sitemiz üzerinden kredi kartı, banka kartı ile güvenli ödeme yapabilirsiniz. WhatsApp üzerinden sipariş vererek ödeme seçeneklerimizi de öğrenebilirsiniz.", order: 13 },
  ];

  for (const faq of faqs) {
    const exists = await prisma.faq.findFirst({
      where: { question: faq.question }
    });
    if (!exists) {
      console.log(`Creating FAQ: ${faq.question}`);
      await prisma.faq.create({
        data: {
          question: faq.question,
          answer: faq.answer,
          category: faq.category,
          order: faq.order,
          isActive: true
        }
      });
    } else {
      console.log(`FAQ already exists: ${faq.question}`);
    }
  }

  // 4. Coupons Seed
  const coupons = [
    { code: 'INSTA10', discount: 10, type: 'percentage', expiry: new Date('2030-12-31') },
    { code: 'ARI10', discount: 10, type: 'percentage', expiry: new Date('2030-12-31') }
  ];

  for (const coupon of coupons) {
    const exists = await prisma.coupon.findUnique({
      where: { code: coupon.code }
    });
    if (!exists) {
      console.log(`Creating Coupon: ${coupon.code}`);
      await prisma.coupon.create({
        data: {
          code: coupon.code,
          discount: coupon.discount,
          type: coupon.type,
          expiry: coupon.expiry,
          isActive: true
        }
      });
    } else {
      console.log(`Coupon already exists: ${coupon.code}`);
    }
  }

  console.log('CMS Seeding completed.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
