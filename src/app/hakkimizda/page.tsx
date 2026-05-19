"use client";

import React from 'react';
import { Star } from 'lucide-react';
import Image from 'next/image';

export default function HakkimizdaPage() {
  const [testimonials, setTestimonials] = React.useState<any[]>([
    { name: "Fatma Y.", comment: "Arı Hayat'ın kestane balı gerçekten muazzam. Çocukluğumdaki o gerçek bal tadını alabildiğim tek adres.", role: "Sadık Müşteri", rating: 5 },
    { name: "Ömer K.", comment: "Propolis ürünlerini bağışıklık için kullanıyoruz. Doğallığından hiç şüphemiz yok, çok memnunuz.", role: "Bursa Yerel Sakini", rating: 5 },
    { name: "Zeynep A.", comment: "Hızlı kargo ve özenli paketleme için teşekkürler. Ürünlerin saflığı her halinden belli oluyor.", role: "Anne & Beslenme Uzmanı", rating: 5 },
    { name: "Mehmet S.", comment: "Arı sütünü 3 aydır kullanıyorum, bağışıklığım çok güçlendi. Kalite ve fiyat dengesi harika.", role: "Düzenli Müşteri", rating: 5 },
  ]);

  React.useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch('/api/admin/testimonials');
        if (res.ok) {
          const data = await res.json();
          const activeTestimonials = data.filter((t: any) => t.isActive);
          if (activeTestimonials.length > 0) {
            setTestimonials(activeTestimonials);
          }
        }
      } catch (e) {
        console.error("Failed to fetch testimonials", e);
      }
    };
    fetchTestimonials();
  }, []);

  const stats = [
    { value: '5000+', label: 'Mutlu Aile' },
    { value: '100%', label: 'Doğal & Katkısız', highlight: true },
    { value: '10+', label: 'Yıllık Deneyim' },
    { value: '24/7', label: 'Müşteri Desteği', highlight: true },
  ];

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-[#FFFBEB] text-secondary py-32 overflow-hidden">
        <div className="absolute inset-0 bg-honey-gradient honeycomb-bg opacity-30"></div>
        <div className="absolute top-10 right-10 text-8xl opacity-10 select-none">🐝</div>
        <div className="absolute bottom-10 left-10 text-6xl opacity-10 select-none">🍯</div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <span className="text-primary font-heading font-bold uppercase text-sm tracking-widest mb-4 block">Arı Hayat Dünyası</span>
            <h1 className="text-6xl font-heading font-extrabold mb-6 uppercase leading-tight tracking-tighter text-secondary">
              Doğanın <span className="text-primary italic">En Saf</span> Halini Sofranıza Taşıyoruz
            </h1>
            <p className="text-gray-700 text-xl font-body mb-10 leading-relaxed max-w-xl">
              2013 yılında başlayan arıcılık serüvenimiz, bugün Türkiye&apos;nin en güvenilir doğal arı ürünleri platformuna dönüştü.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.bursadabugun.com/haber/bursa-da-gram-gram-sagdigi-ari-sutunun-kilosunu-8-bin-liradan-satiyor-1408740.html"
                target="_blank" rel="noopener noreferrer"
                className="bg-primary text-white font-heading font-bold px-6 py-3 rounded-full hover:bg-primary-hover transition-colors text-sm uppercase tracking-wider"
              >
                📰 Basında Biz
              </a>
              <a
                href="https://www.youtube.com/watch?v=VK7JA96JFZg"
                target="_blank" rel="noopener noreferrer"
                className="border-2 border-secondary text-secondary font-heading font-bold px-6 py-3 rounded-full hover:bg-secondary hover:text-white transition-colors text-sm uppercase tracking-wider"
              >
                🎬 Videomuzu İzle
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-2">
                <span className={`text-5xl font-heading font-black block ${stat.highlight ? 'text-primary' : 'text-secondary'}`}>{stat.value}</span>
                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hikâyemiz */}
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-primary/10 rounded-3xl rotate-2 transition-transform group-hover:rotate-1"></div>
            <div className="relative h-[500px] w-full overflow-hidden rounded-2xl shadow-2xl">
              <Image
                src="/images/products/bal.png"
                alt="Arıcılık Hikayemiz"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-8 right-8 bg-white p-6 rounded-xl shadow-xl border-l-4 border-primary">
              <p className="text-secondary font-heading font-bold text-lg">&quot;Doğa bize en iyisini sunar.&quot;</p>
              <p className="text-gray-500 text-sm italic">- Arı Hayat Kurucuları</p>
            </div>
          </div>
          <div className="space-y-8">
            <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
              Hikayemiz
            </div>
            <h2 className="text-4xl font-heading font-black text-secondary uppercase leading-none">Bir Arıcılık <span className="text-primary">Tutkusu</span></h2>
            <div className="space-y-4 text-gray-600 font-body text-lg leading-relaxed">
              <p>
                Arı Hayat&apos;ın hikâyesi, 2013 yılında ziraat tarafından düzenlenen bir arıcılık kursu ile başladı. Çok uluslu bir otomotiv yan sanayinde çalışan iki arkadaş olarak başladığımız bu yolculuk, kısa sürede bir tutkuya dönüştü.
              </p>
              <p>
                İlk yıllarda hobi olarak sürdürdüğümüz arıcılık faaliyetlerimizi, iki yıl sonra eşlerimizin de katılımıyla iki aile olarak büyüttük ve arı sütü üretimine odaklandık. Bir sonraki yıl ise önemli bir karar alarak asıl işlerimizi bıraktık ve profesyonel olarak arıcılığa yöneldik.
              </p>
              <p>
                Bugün Arı Hayat olarak, kendi arılıklarımızda, üretimin her aşamasını birebir takip ederek arı sütü başta olmak üzere çeşitli arı ürünleri üretmeye devam ediyoruz. Doğallık, izlenebilirlik ve sürdürülebilir üretim anlayışı, tüm çalışmalarımızın temelini oluşturur.
              </p>
              <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-xl">
                <p className="font-bold text-secondary italic">
                  &quot;Kendimizin ve çocuklarımızın tüketmeyeceği hiçbir ürünü satışa sunmayız. Bu ilke, Arı Hayat&apos;ın en önemli değeridir.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Değerlerimiz */}
      <div className="py-20 honeycomb-bg">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-heading font-black text-secondary uppercase mb-4">Bizim <span className="text-primary">Değerlerimiz</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: '🐝', title: 'Üreticiden Direkt', desc: 'Kendi arılıklarımızdan üretiyoruz. Aradaki her halkayı ortadan kaldırarak size en taze ve en uygun fiyatlı ürünü sunuyoruz.' },
              { emoji: '🔬', title: 'Laboratuvar Analizi', desc: 'Tüm ürünlerimiz akredite laboratuvarlarda analiz edilmektedir. İçerik, saflık ve hijyen standartları belgelenmektedir.' },
              { emoji: '🌿', title: 'Doğal & Katkısız', desc: 'Hiçbir ürünümüzde yapay katkı maddesi, koruyucu veya tatlandırıcı bulunmaz. Saf doğallık, temel ilkemizdir.' },
            ].map((val, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-lg text-center hover:-translate-y-2 transition-transform">
                <div className="text-5xl mb-4">{val.emoji}</div>
                <h3 className="font-heading font-black text-secondary text-xl uppercase mb-3">{val.title}</h3>
                <p className="text-gray-500 font-body text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-black text-secondary uppercase mb-4">Sizden Gelen <span className="text-primary">Yorumlar</span></h2>
            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="text-primary fill-primary w-5 h-5" />)}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow">
                <div className="flex space-x-0.5 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className={`w-3.5 h-3.5 ${j < (t.rating || 5) ? 'text-primary fill-primary' : 'text-gray-300'}`} />
                  ))}
                </div>
                <p className="text-gray-600 font-body text-sm italic leading-relaxed mb-4">&quot;{t.comment}&quot;</p>
                <div>
                  <p className="font-heading font-bold text-secondary text-sm uppercase">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
