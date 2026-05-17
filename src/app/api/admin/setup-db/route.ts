import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { ARIHAYAT_PRODUCTS, ARIHAYAT_CATEGORIES, ARIHAYAT_SITE_INFO } from '@/lib/seed-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    console.log('🧹 Cleaning database for Arı Hayat...');
    
    // Clear old data safely
    await prisma.slider.deleteMany({});
    await prisma.blogPost.deleteMany({});
    await prisma.review.deleteMany({});
    await prisma.orderItem.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.siteSettings.deleteMany({});
    
    console.log('✅ Database cleaned. Seeding categories...');

    // 1. Seed Categories
    for (const cat of ARIHAYAT_CATEGORIES) {
      await prisma.category.create({
        data: {
          name: cat.name,
          slug: cat.slug,
          image: cat.image,
          description: cat.description,
        }
      });
    }
    console.log('✅ Categories seeded.');

    // Get categories to map slugs to IDs
    const seededCategories = await prisma.category.findMany();
    const categoryMap = new Map<string, string>();
    seededCategories.forEach((c) => {
      categoryMap.set(c.slug, c.id);
    });

    console.log('📦 Seeding products...');

    // 2. Seed Products
    for (const prod of ARIHAYAT_PRODUCTS) {
      const categoryId = categoryMap.get(prod.category);
      if (!categoryId) {
        console.warn(`Category slug "${prod.category}" not found for product "${prod.name}". Skipping.`);
        continue;
      }

      await prisma.product.create({
        data: {
          id: prod.id,
          name: prod.name,
          slug: prod.slug,
          price: prod.price,
          oldPrice: prod.originalPrice,
          stock: prod.stock,
          images: JSON.stringify([prod.image]),
          description: prod.description,
          categoryId: categoryId,
          isFreeShipping: prod.isFreeShipping,
          isNew: prod.isNew,
        }
      });
    }
    console.log('✅ Products seeded.');

    // 3. Seed Site Settings
    await prisma.siteSettings.create({
      data: {
        id: 'current',
        siteName: ARIHAYAT_SITE_INFO.name,
        siteDescription: ARIHAYAT_SITE_INFO.description,
        contactEmail: ARIHAYAT_SITE_INFO.email,
        contactPhone: ARIHAYAT_SITE_INFO.phone,
        whatsappNumber: ARIHAYAT_SITE_INFO.whatsapp,
        address: ARIHAYAT_SITE_INFO.address,
        logoUrl: ARIHAYAT_SITE_INFO.logoUrl,
        announcementBar: ARIHAYAT_SITE_INFO.announcementBar,
        instagramUrl: ARIHAYAT_SITE_INFO.instagram,
      },
    });
    console.log('✅ Site settings seeded.');

    // 4. Seed Admin User
    const adminPassword = await bcrypt.hash('arihayat-admin-2026', 10);
    await prisma.user.upsert({
      where: { email: 'admin@arihayat.com' },
      update: { password: adminPassword },
      create: {
        email: 'admin@arihayat.com',
        name: 'Arı Hayat Admin',
        password: adminPassword,
        role: 'ADMIN',
      },
    });
    console.log('✅ Admin user seeded.');

    // 5. Seed 4 SEO-Friendly Blog Posts
    const blogPosts = [
      {
        title: "Yeni Başlayanlar İçin Arıcılık: Hangi Ekipmana İhtiyacınız Var?",
        slug: "yeni-baslayanlar-icin-aricilik-ekipmanlari",
        excerpt: "Arıcılığa yeni mi başlıyorsunuz? İhtiyacınız olan maske, körük, el demiri ve kovan gibi temel arıcılık ekipmanlarını bu başlangıç rehberimizde keşfedin!",
        category: "Arıcılık",
        image: "/images/blog/blog-1.webp",
        content: `Arıcılık, doğayla iç içe olmanın, üretmenin ve ekosisteme katkıda bulunmanın en huzurlu ve verimli yollarından biridir. Ancak bu büyüleyici dünyaya adım atarken doğru araç ve gereçlerle yola çıkmak hem sizin güvenliğiniz hem de arı koloninizin sağlığı için son derece kritik bir öneme sahiptir. Eğer siz de "Arıcılığa başlamak istiyorum ama hangi malzemeleri almalıyım?" diyorsanız, yeni başlayanlar için hazırladığımız temel ekipman listesine göz atın.\n\n##### 1. Arıcı Maskesi ve Koruyucu Elbise\n\nArıcılıkta güvenlik her şeyden önce gelir. İlk kez kovan açacağınız zaman yaşayacağınız heyecan ve acemilik arıları hissedebilir. Bu yüzden yüzünüzü ve vücudunu tamamen koruyan, nefes alabilen beyaz renkli bir arıcı maskesi (veya astronot tipi elbise) edinmelisiniz. Arıların koyu renkleri tehdit olarak algıladığını unutmayın; bu yüzden ekipman seçiminde daima beyaz veya açık sarı renkleri tercih edin.\n\n##### 2. Körük (Smoke Generator)\n\nKörük, arıcının en yakın dostudur. Kovanı açmadan önce içeriye hafifçe verilen duman, arılara orman yangını algısı yaratarak onların bal yemesini sağlar. Karnı bal ile dolan arılar sakinleşir ve sokma refleksleri önemli ölçüde azalır. Kaliteli, paslanmaz çelikten üretilmiş ve derisi sağlam körükler uzun ömürlü kullanım sunar. Körük yakıtı olarak ise doğal talaş, kuru ot veya karton kullanabilirsiniz.\n\n##### 3. Arıcı El Demiri (Kovan Kazıyıcı)\n\nArılar, kovan içi yalıtımı sağlamak ve delikleri kapatmak için propolis adı verilen yapışkan bir reçine üretirler. Bu madde kovan kapaklarının ve çerçevelerin birbirine sıkıca yapışmasına neden olur. Çerçeveleri kovandan kolayca çıkarmak, petekleri kazımak ve kovan temizliği yapmak için özel tasarlanmış arıcı el demiri mutlaka çantanızda bulunmalıdır.\n\n##### 4. Arıcı Eldiveni\n\nKalın deriden üretilmiş, kolları elastik bantlı arıcı eldivenleri ellerinizi sokmalardan korur. Ancak zamanla tecrübe kazandıkça, arıları daha iyi hissetmek ve onları ezmemek için daha ince lateks eldivenlere veya eldivensiz çalışmaya geçiş yapabilirsiniz. Yeni başlayanlar için deri eldiven kullanımı güvenli bir geçiş sağlayacaktır.\n\n##### 5. Standart Langstroth veya Dadant Kovanı\n\nArılarınızın yaşayacağı ev olan kovan seçimi bölgenizin iklim koşullarına uygun olmalıdır. Türkiye'de en yaygın kullanılan kovan tipi standart çift katlı ahşap Langstroth kovanlardır. Kovanın uçuş tahtasının sağlam olması, havalandırma deliklerinin bulunması arı sağlığı için çok önemlidir.\n\nArıcılık sabır, gözlem ve sevgi gerektiren bir süreçtir. Doğru ekipmanlarla başlayıp, arılarınızla doğru bağ kurduğunuzda, ilk hasat ettiğiniz balın lezzeti tüm yorgunluğunuzu unutturacaktır.`
      },
      {
        title: "Doğal Bal ile Saf Bal Arasındaki Fark",
        slug: "dogal-bal-ile-saf-bal-arasindaki-fark",
        excerpt: "Doğal bal ve saf bal terimleri arasındaki farkları öğrenin. Hakiki, katkısız ham balın özelliklerini ve sahte ballardan nasıl ayırt edileceğini keşfedin.",
        category: "Sağlık & Yaşam",
        image: "/images/blog/blog-2.webp",
        content: `Market raflarında, şarküterilerde veya internet sitelerinde gezinirken sık sık "doğal bal", "saf bal", "organik bal" veya "hakiki bal" gibi terimlerle karşılaşırız. Çoğu zaman birbirinin yerine kullanılan bu kavramlar aslında balın üretim sürecine, içeriğine ve gördüğü işlemlere dair oldukça farklı detayları barındırır. Tüketici olarak sağlığınızı korumak ve gerçek şifaya ulaşmak için bu terimlerin arkasındaki gerçekleri bilmeniz gerekir.\n\n##### Doğal Bal Nedir?\n\n"Doğal" kelimesi, doğada kendiliğinden var olan veya doğaya uygun üretilen maddeleri tanımlar. Ancak gıda sektöründe bu kelime bazen yanıltıcı olabilir. Bir balın "doğal bal" olarak etiketlenmesi, onun arılar tarafından çiçek nektarlarından üretildiği anlamına gelir. Fakat arıların beslenmesinde kimyasal şuruplar (nişasta bazlı şeker, glukoz şurubu) kullanılmışsa veya kovan çevresinde tarımsal ilaçlama yapılmışsa, elde edilen bal teknik olarak arı tarafından yapıldığı için "doğal" denilse de sağlığa zararlı kalıntılar barındırabilir.\n\n##### Saf Bal (Ham Bal) Nedir?\n\nSaf bal, kovan içerisinden süzüldükten sonra hiçbir katkı maddesi (şeker şurubu, su vb.) eklenmemiş, balın doğal yapısını değiştirecek yüksek sıcaklıklarda ısıl işlem (pastörizasyon) görmemiş ve polenleri filtre edilmemiş balı tanımlar. Saf bal, doğadaki arının kovanında ürettiği canlı yapıyı birebir korur. İçerisinde doğal enzimler, vitaminler, antioksidanlar ve en önemlisi çiçek polenleri tamamen korunur. Saf bal bu nedenle zamanla berraklığını kaybederek kristalleşir (şekerlenir). Kristalleşen bal sahte değil, aksine canlı ve saf balın ta kendisidir.\n\n##### Aralarındaki Temel Farklar Nelerdir?\n\n1. İşlem Görme Durumu: Doğal ballar piyasada daha uzun süre sıvı ve berrak kalması için yüksek ısılarda pastörize edilip ultra filtre edilebilir. Saf (ham) bal ise sadece kaba süzgeçten geçirilerek kavanozlanır.\n2. Polen İçeriği: Ultra filtre edilmiş doğal ballarda polenler tamamen yok edilir, bu da balın kaynağının tespit edilmesini engeller. Saf balda ise polenler korunur.\n3. Besin Değeri: Saf bal yüksek enzim ve antioksidan değerine sahipken, ısıl işlem görmüş doğal balların besin değerleri ısı nedeniyle büyük oranda kaybolur.\n\n##### Nasıl Güvenli Seçim Yapılır?\n\nGerçek şifaya ulaşmak için tercihiniz daima "Analiz Raporlu Ham Saf Bal" olmalıdır. Arı Hayat olarak sunduğumuz tüm bal çeşitlerimiz, arıcılarımızın yüksek yaylalarda geleneksel yöntemlerle ürettiği, pastörize edilmemiş ve polenleri korunmuş saf ballardan oluşmaktadır. Ailenize şifa sunarken etiket okumayı ihmal etmeyin, analiz raporlarını sorgulayın ve doğallığa aracısız ulaşın.`
      },
      {
        title: "Arı Kovanı Bakımında 4 Mevsim Rehberi",
        slug: "ari-kovani-bakimi-4-mevsim-rehberi",
        excerpt: "İlkbahar, yaz, sonbahar ve kış aylarında yapılması gereken arı kovanı bakım adımları. Arılarınızı mevsimsel değişikliklere hazırlayın ve bal verimini artırın.",
        category: "Arıcılık",
        image: "/images/blog/blog-1.webp",
        content: `Arıcılık, doğanın döngüsüyle tamamen uyumlu yürütülmesi gereken, mevsim geçişlerine duyarlı profesyonel bir zanaattır. Başarılı ve yüksek verimli bir arıcılık faaliyeti için koloninin yıl boyunca değişen ihtiyaçlarını zamanında ve doğru adımlarla karşılamak gerekir. İşte arılarınızı dört mevsim boyunca sağlıklı tutacak ve bal veriminizi zirveye çıkaracak yıllık kovan bakım rehberi.\n\n##### İlkbahar Bakımı: Uyanış ve Hızlı Gelişim\n\nKış uykusundan çıkan koloninin ilkbaharda en büyük hedefi hızlıca çoğalmak ve işçi arı sayısını artırmaktır.\n- İlk Kontrol: Havalar 15 derecenin üzerine çıktığında kovanlar hızlıca açılıp ana arı varlığı ve yiyecek stokları kontrol edilmelidir.\n- Teşvik Beslemesi: Ana arının yumurtlamasını teşvik etmek amacıyla bire bir (1:1) oranında şerbetleme veya arı keki ile erken ilkbahar beslemesi yapılır.\n- Varroa Mücadelesi: Kovan içi nüfus patlamadan önce, arıların en büyük düşmanı olan Varroa akarlarına karşı organik ve ruhsatlı ilaçlamalar mutlaka tamamlanmalıdır.\n- Petek Ekleme: Nüfusu sıkışan kovanlara yeni kabarmış petekler eklenerek alan genişletilir.\n\n##### Yaz Bakımı: Hasat ve Yoğun Çalışma\n\nYaz ayları arıların nektar toplama (bal akımı) dönemidir. Arıcının en tatlı yorgunlukları bu mevsimde yaşanır.\n- Kat Atma: Güçlü kolonilere bal katları (ilave) eklenerek arıların bal depolayacağı alanlar artırılır.\n- Havalandırma ve Gölge: Aşırı sıcaklarda kovan içi ısınmayı önlemek için kovan uçuş delikleri tamamen açılmalı, gerekirse kovanlar gölgelik alanlara taşınmalıdır.\n- Bal Hasadı: Peteklerin en az 2/3'si arılar tarafından sırlandığında (bal mumuyla kapatıldığında) olgunlaşmış bal hasat edilir. Hasat esnasında arılara kışlık yiyecek payı bırakılmalıdır.\n\n##### Sonbahar Bakımı: Kışa Güçlü Hazırlık\n\nKışın koloninin hayatta kalması tamamen sonbaharda yapılan hazırlıklara bağlıdır.\n- Sonbahar Beslemesi: Kış salkımına girecek genç işçi arıların yetişmesi için koyu şerbet (2:1) beslemesiyle kışlık stoklar tamamlanır.\n- Kovan Birleştirme: Zayıf ve ana arısız kovanlar birleştirilerek kışa güçlü tek bir koloni halinde girmeleri sağlanır.\n- Giriş Daraltma: Yağmacılığı önlemek ve kovan içi sıcaklığı korumak için kovan uçuş delikleri daraltılır.\n\n##### Kış Bakımı: Sessizlik ve Koruma\n\nKış dönemi arıların kış salkımı oluşturarak kendilerini ısıttıkları, kovan içi faaliyetlerin durduğu dönemdir.\n- Rahatsız Etmeme: Kışın kovanlar kesinlikle açılmamalıdır. Soğuk hava akımı kış salkımını bozarak koloninin sönmesine neden olabilir.\n- Rüzgar ve Nem Koruması: Kovanlar sert rüzgarlardan korunmalı, kovan eğimi öne doğru verilerek içeride biriken nemin dışarı akması sağlanmalıdır. Nem, soğuktan daha ölümcüldür.\n\nArılarınıza doğanın ritmine uygun şekilde eşlik ettiğinizde, kovanlarınızın sağlıklı kalmasını ve her yıl size altın sarısı şifalı ballar sunmasını garantilersiniz.`
      },
      {
        title: "En Çok Sorulan 10 Arıcılık Sorusu ve Yanıtları",
        slug: "en-cok-sorulan-10-aricilik-sorusu",
        excerpt: "Arıcılık ve bal üretimi hakkında en çok merak edilen 10 sorunun bilimsel ve pratik yanıtları. Bal neden donar? Arılar kışın ne yer? Detaylar rehberimizde.",
        category: "Soru & Cevap",
        image: "/images/blog/blog-2.webp",
        content: `Arıcılık hem büyüleyici dünyasıyla hem de sunduğu şifa kaynaklarıyla her zaman merak uyandıran bir alan olmuştur. Gerek arıcılığa yeni başlamak isteyenler gerekse bilinçli bal tüketicileri tarafından bizlere sıkça yöneltilen en popüler 10 soruyu ve yanıtlarını sizler için bir araya getirdik.\n\n##### 1. Bal neden şekerlenir (kristalleşir)? Sahte mi demektir?\n\nKesinlikle hayır! Saf, ham balın içerisinde bulunan doğal glukoz moleküllerinin zamanla çökelerek katılaşması tamamen doğal bir fiziksel süreçtir. Isıl işlem görmemiş hakiki ballar kristalleşir. Sahte veya yüksek ısıda pastörize edilmiş ballar ise kristalleşmez, sürekli sıvı kalır.\n\n##### 2. Arılar kışın ne yer, nasıl beslenirler?\n\nArılar kış aylarında kovan içerisinde oluşturdukları kış salkımında, yaz boyunca depoladıkları kendi ballarını tüketerek beslenirler. Eğer kovanın bal stoğu yetersiz ise arıcılar kovan içi besleme aparatlarıyla arı keki veya şeker şurubu takviyesi yaparlar.\n\n##### 3. Kraliçe (Ana) arı ne kadar yaşar?\n\nİşçi arılar yazın sadece 4-6 hafta yaşarken, kraliçe arı kovanın en uzun ömürlü bireyidir ve ortalama 3 ila 5 yıl arasında yaşayabilir. Görevi kovandaki nüfusun devamlılığını sağlamak için günde binlerce yumurta bırakmaktır.\n\n##### 4. Arı sokması faydalı mıdır?\n\nEvet, apiterapi (arı ürünleriyle tedavi) yöntemlerinde arı zehri aktif olarak kullanılır. Arı sokması, içerdiği melitin maddesi sayesinde bağışıklığı uyarır, kan dolaşımını hızlandırır ve eklem romatizmalarına karşı koruyucu etki gösterebilir. Ancak alerjisi olanlar için ölümcül olabilir.\n\n##### 5. Bir kovanda kaç arı yaşar?\n\nGüçlü bir kolonide ilkbahar ve yaz aylarında işçi arı sayısı 50.000 ila 80.000 arasına kadar ulaşabilir. Kış aylarında ise bu sayı azalarak 10.000 - 20.000 seviyelerine geriler.\n\n##### 6. Ham bal (Raw Honey) ne demektir?\n\nKovandan alındıktan sonra 45°C'den yüksek sıcaklıklara ısıtılmamış ve polenleri yok edecek seviyede ince filtre edilmemiş, tüm enzim ve besin değerleri korunmuş en doğal bal formuna ham bal denir.\n\n##### 7. Propolis alkol içermeden çözülebilir mi?\n\nEvet! Propolis ham halde sindirilemez; mutlaka özütlenmesi gerekir. Alkol hassasiyeti olanlar veya çocuklar için saf zeytinyağı veya su bazlı özel özütleme teknolojileri kullanılarak alkolsüz propolis damlaları üretilmektedir.\n\n##### 8. Bal bebeklere neden verilmez?\n\n1 yaşından küçük bebeklerin sindirim sistemi henüz tam gelişmediği için balın içinde doğal olarak bulunabilen Clostridium botulinum sporlarına karşı savunmasızdır. Bu durum bebeklerde "botulizm" adı verilen ciddi bir zehirlenmeye yol açabilir.\n\n##### 9. Balın bozulma süresi var mıdır?\n\nHayır. Doğal saf bal nem oranı düşük ve asidik yapıda olduğu için bakteri üremesine izin vermez. Mısır piramitlerindeki mezarlarda bulunan 3000 yıllık balların bile hala yenilebilir durumda olduğu bilinmektedir.\n\n##### 10. Arılar kırmızı rengi görebilir mi?\n\nHayır. Arılar spektrumun ultra violet (morötesi) ucunu çok iyi görürken kırmızı rengi siyah veya koyu gri olarak algılarlar. Bu yüzden arıların en çok yöneldiği çiçekler mavi, mor, sarı ve beyaz renklerdedir.`
      }
    ];

    for (const post of blogPosts) {
      await prisma.blogPost.create({ data: post });
    }
    console.log('✅ Blog posts seeded.');

    // 6. Seed Sliders
    const sliders = [
      {
        title: "DOĞAL VE HAKİKİ ARI ÜRÜNLERİ",
        subtitle: "Yüksek Yaylaların Saf Şifası Sofranızda",
        image: "/images/hero-1.webp",
        buttonText: "Ürünleri Keşfet",
        buttonLink: "/urunler",
        order: 1
      },
      {
        title: "%100 SAF YERLİ ARI SÜTÜ",
        subtitle: "Bağışıklığınız İçin Kovanlarımızdan Taze Sağım",
        image: "/images/hero-2.webp",
        buttonText: "Arı Sütü Ürünleri",
        buttonLink: "/urunler?category=ari-sutu",
        order: 2
      }
    ];

    for (const slider of sliders) {
      await prisma.slider.create({ data: slider });
    }
    console.log('✅ Sliders seeded.');

    return NextResponse.json({ 
      success: true, 
      message: '🚀 ARI HAYAT DB SETUP COMPLETED SUCCESSFULLY WITH LOCAL IMAGES AND 31 PRODUCTS!' 
    });
  } catch (error: any) {
    console.error('Setup failed:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
