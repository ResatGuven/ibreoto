"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqCategories = [
  {
    category: "📦 Sipariş & Teslimat",
    items: [
      { question: "Siparişim ne zaman kargoya verilir?", answer: "Hafta içi saat 16:00'a kadar verdiğiniz siparişler genellikle aynı gün kargoya teslim edilmektedir. Hafta sonu ve resmi tatillerde verilen siparişler ise takip eden ilk iş gününde işleme alınır." },
      { question: "Kargo ücreti ne kadar?", answer: "1.500 TL ve üzeri alışverişlerinizde kargo tamamen ücretsizdir. Altında kalan siparişlerde standart kargo ücreti uygulanır." },
      { question: "Kaç günde teslim alırım?", answer: "Türkiye genelinde kargonuz genellikle 1-3 iş günü içinde teslim edilir. Bulunduğunuz bölgeye göre bu süre değişebilir." },
    ]
  },
  {
    category: "🍯 Ürünler & Saklama",
    items: [
      { question: "Arı sütü nasıl saklanmalıdır?", answer: "Arı sütü mutlaka buzdolabında (0-4°C) saklanmalıdır. Donmuş olarak teslim edilir, açılmadan önce buzdolabında çözdürülmeli ve açıldıktan sonra en fazla 3-4 haftada tüketilmelidir. Uzun dönem saklama için derin dondurucuda (-18°C) bekletilebilir." },
      { question: "Zeytinyağlı propolis nasıl saklanır?", answer: "Propolis ürünleri oda sıcaklığında (15-25°C), doğrudan güneş ışığı ve nem görmeyecek serin bir yerde muhafaza edilebilir. Açıldıktan sonra serin ve karanlık bir yerde saklanması önerilir." },
      { question: "Bal nasıl saklanmalıdır?", answer: "Bal oda sıcaklığında, kuru ve doğrudan güneş ışığı almayan bir yerde saklanabilir. Buzdolabına konulması gerekmez; aksine kristalleşmeyi hızlandırabilir. Kristalleşme balın doğal olduğunun göstergesidir." },
      { question: "Ürünleriniz %100 doğal mı?", answer: "Evet. Tüm Arı Hayat ürünleri %100 doğal ve katkısızdır. Kendi arılıklarımızda kimyasal ilaçlama yapılmaz, hiçbir ürünümüze yapay tatlandırıcı veya koruyucu eklenmez. 'Kendimizin ve çocuklarımızın tüketmeyeceği hiçbir ürünü satışa sunmayız.'" },
    ]
  },
  {
    category: "🐝 Sağlık & Kullanım",
    items: [
      { question: "Arı sütü nasıl kullanılır, ne kadar tüketilmeli?", answer: "Günde 1 tatlı kaşığı (yaklaşık 5 gr) arı sütü tüketilmesi önerilir. Tercihen sabah aç karnına yenilmesi tavsiye edilir. Saf olarak ağız altında tutularak veya bal ile karıştırılarak tüketilebilir." },
      { question: "Propolis kime önerilir?", answer: "Propolis, doğal antimikrobiyal özellikleriyle bağışıklık sistemini destekler. Kış aylarında, grip sezonunda veya bağışıklığı zayıf bireylere önerilir. Çocuklar için zeytinyağlı formülümüz alkol içermediği için güvenle kullanılabilir." },
      { question: "Arı ürünlerine alerjim varsa ne yapmalıyım?", answer: "Arı ürünlerine karşı alerjisi olan bireyler için bu ürünler uygun olmayabilir. Kullanmadan önce küçük bir miktar ile hassasiyet testi yapılması ve herhangi bir sağlık sorununuz varsa doktorunuza danışmanız tavsiye edilir." },
      { question: "Çocuklar arı ürünleri kullanabilir mi?", answer: "1 yaşın altındaki bebekler bal ve arı ürünü tüketemez. 1 yaş üstü çocuklar için özel 'Karışım Kids' ürünlerimiz bulunmaktadır. Çocuklarda kullanım dozajı için bir uzmana danışmanızı öneririz." },
    ]
  },
  {
    category: "💳 İade & Ödeme",
    items: [
      { question: "İade süreci nasıl işler?", answer: "Ürünü teslim aldığınız tarihten itibaren 14 gün içinde orijinal ambalajı açılmamış ve kullanılmamış olarak iade edebilirsiniz. Gıda ürünlerinde ambalaj açıldıktan sonra hijyen kuralları gereği iade kabul edilmemektedir." },
      { question: "Ödeme seçenekleriniz nelerdir?", answer: "Web sitemiz üzerinden kredi kartı, banka kartı ile güvenli ödeme yapabilirsiniz. WhatsApp üzerinden sipariş vererek ödeme seçeneklerimizi de öğrenebilirsiniz." },
    ]
  },
];

export default function SSSPage() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <div className="pt-20 min-h-screen bg-white font-body">
      {/* Header */}
      <div className="bg-secondary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-honey-gradient honeycomb-bg opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-heading font-bold uppercase mb-2">Sıkça Sorulan Sorular</h1>
          <p className="text-gray-300 font-body text-sm max-w-2xl mx-auto">
            Arı Hayat ürünleri hakkında merak ettiğiniz tüm soruların yanıtlarını burada bulabilirsiniz.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="space-y-10">
          {faqCategories.map((cat, catIdx) => (
            <div key={catIdx}>
              <h2 className="text-lg font-heading font-black text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
                {cat.category}
              </h2>
              <div className="space-y-3">
                {cat.items.map((faq, idx) => {
                  const key = `${catIdx}-${idx}`;
                  const isOpen = openItem === key;
                  return (
                    <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
                      <button
                        onClick={() => setOpenItem(isOpen ? null : key)}
                        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-amber-50/50 transition-colors focus:outline-none"
                      >
                        <span className="font-heading font-bold text-secondary text-sm md:text-base pr-4">{faq.question}</span>
                        {isOpen ? <ChevronUp className="text-primary flex-shrink-0" /> : <ChevronDown className="text-gray-400 flex-shrink-0" />}
                      </button>
                      {isOpen && (
                        <div className="p-5 bg-amber-50/30 border-t border-amber-100 font-body text-gray-600 text-sm md:text-base leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-amber-50 rounded-2xl text-center border border-amber-200">
          <div className="text-4xl mb-3">🐝</div>
          <h3 className="font-heading font-bold text-secondary mb-3 text-lg uppercase">Aradığınız Cevabı Bulamadınız mı?</h3>
          <p className="text-gray-600 font-body text-sm mb-6">Müşteri hizmetlerimiz size yardımcı olmaktan mutluluk duyacaktır.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/iletisim" className="bg-primary text-white font-heading font-bold py-3 px-8 rounded-full hover:bg-secondary transition-colors uppercase text-sm">
              Bize Ulaşın
            </Link>
            <a href="https://wa.me/905353377251" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white font-heading font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-colors uppercase text-sm">
              📱 WhatsApp Destek
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
