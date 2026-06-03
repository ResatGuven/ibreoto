"use client";

import React, { useState } from 'react';
import { 
  Heart, Sparkles, ShieldCheck, Flame, ChevronRight, 
  ArrowLeft, ShoppingCart, Award, CheckCircle, RefreshCw
} from 'lucide-react';
import Link from 'next/link';

export default function BalAsistaniPage() {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ goal: '', age: '', taste: '' });
  const [recommendation, setRecommendation] = useState<any>(null);

  // Question lists
  const questions = [
    {
      id: 'goal',
      title: "Balı ve arı ürünlerini en çok hangi amaçla tüketmek istiyorsunuz?",
      description: "Sağlık hedefinizi seçerek size en uygun biyoaktif bileşeni bulmamıza yardımcı olun.",
      options: [
        { value: 'health', label: 'Bağışıklık Gücü & Koruma', desc: 'Sık hastalanmayı önlemek, vücut direncini artırmak.', icon: ShieldCheck },
        { value: 'energy', label: 'Doğal Enerji & Hücre Yenilenmesi', desc: 'Gün boyu zindelik, yorgunluk giderme, spor desteği.', icon: Flame },
        { value: 'throat', label: 'Öksürük & Boğaz Rahatlatma', desc: 'Boğaz tahrişini gidermek, üst solunum yollarını rahatlatmak.', icon: Heart },
        { value: 'gourmet', label: 'Gurme Kahvaltılık Lezzet', desc: 'Geleneksel lezzetler, kahvaltı keyfi ve zengin sofralar.', icon: Sparkles }
      ]
    },
    {
      id: 'age',
      title: "Bu arı ürününü kim tüketecek?",
      description: "Yaş gruplarına göre tüketilmesi güvenli ve en faydalı dozajlar değişiklik gösterir.",
      options: [
        { value: 'child', label: 'Küçük Çocuklar (1-12 Yaş)', desc: 'Gelişimi destekleyen, yemesi kolay hafif aromalar.', icon: CheckCircle },
        { value: 'adult', label: 'Yetişkinler (12-65 Yaş)', desc: 'Yoğun biyoaktif koruma, günlük enerji ihtiyacı.', icon: CheckCircle },
        { value: 'elderly', label: 'İleri Yaştakiler (65+ Yaş)', desc: 'Hücre yenilenmesi, kemik ve eklem sağlığı destekleri.', icon: CheckCircle }
      ]
    },
    {
      id: 'taste',
      title: "Nasıl bir aromatik tat profilinden hoşlanırsınız?",
      description: "Balın floral kökenine göre tadı hafif ve tatlıdan, yoğun ve acımsıya değişir.",
      options: [
        { value: 'sweet', label: 'Hafif & Çiçeksi Tatlılık', desc: 'Boğazı yakmayan, yumuşak içimli klasik yayla balları.', icon: CheckCircle },
        { value: 'bitter', label: 'Keskin, Hafif Acımsı & Odunsu', desc: 'Şeker oranı düşük, antioksidan deposu orman/kestane balları.', icon: CheckCircle },
        { value: 'mix', label: 'Yoğun ve Karışık (Arı Sütü & Polen)', desc: 'Bal dışında arı ürünleri içeren kremsi, zengin dokular.', icon: CheckCircle }
      ]
    }
  ];

  const handleSelectOption = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      calculateRecommendation({ ...answers, [key]: value });
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  const calculateRecommendation = (finalAnswers: typeof answers) => {
    let result: any = {};

    // Logic matching products
    if (finalAnswers.goal === 'throat' || finalAnswers.taste === 'bitter') {
      result = {
        name: "Kestane Ihlamur Balı 850 gr",
        slug: "kestane-ihlamur-bali-850-gr",
        image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=400",
        description: "Boğaz ağrıları, öksürük ve solunum yolları tahrişlerinde bir numaralı doğal destektir. Kestane ve ıhlamurun eşsiz harmanı yüksek antioksidan ve prolin değerine sahiptir.",
        whyMatch: "Öksürük/boğaz rahatlatma hedefiniz ve odunsu aroma tercihiniz kestane balımızın yüksek biyoaktif bileşimiyle tam olarak uyuşuyor.",
        usage: "Günde bir tatlı kaşığı, sabah aç karnına veya ılık suya karıştırılarak tüketilmesi tavsiye edilir."
      };
    } else if (finalAnswers.goal === 'health' && (finalAnswers.age === 'adult' || finalAnswers.age === 'elderly')) {
      result = {
        name: "Yetişkin Yerli Ham Bal, Polen, Arı Sütü ve Propolis Karışımı (850 gr)",
        slug: "yetiskin-karisim-850-gr-tam",
        image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=400",
        description: "Doğal propolis ekstraktı, taze arı sütü, kurutulmuş çiçek poleni ve süzme yayla balının dengeli bir karışımıdır. Hücresel direnç ve yüksek bağışıklık koruması için formüle edilmiştir.",
        whyMatch: "Yetişkin bağışıklık koruması hedefiniz için arı sütü ve propolisin yoğun antioksidan birleşimini içeren bu özel şifa formülü en etkili çözümdür.",
        usage: "Her sabah kahvaltıdan 15 dakika önce bir çay kaşığı tahta kaşık yardımıyla dil altına konularak emilmesi önerilir."
      };
    } else if (finalAnswers.age === 'child' || finalAnswers.taste === 'sweet' || finalAnswers.goal === 'gourmet') {
      result = {
        name: "Doğal Süzme Çiçek Balı 850 gr",
        slug: "cicek-bali-850-gr",
        image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&q=80&w=400",
        description: "Doğu Karadeniz yaylalarının zengin kır çiçeklerinden elde edilen, yumuşak içimli, boğazı yakmayan ve çocuklar tarafından çok sevilen klasik, saf süzme balımızdır.",
        whyMatch: "Hafif aromatik tat arayışınız ve yaş grubu gereksinimleriniz göz önüne alındığında, sindirimi en kolay ve lezzetli çiçek balımız sizin için idealdir.",
        usage: "Kahvaltıda doğrudan tüketilebilir, yoğurt veya yulaf ezmesi gibi gıdaların üzerine eklenerek sağlıklı tatlandırıcı olarak kullanılabilir."
      };
    } else {
      result = {
        name: "Doğal Süzme Çam Balı 850 gr",
        slug: "cam-bali-850-gr",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=400",
        description: "Ege ormanlarının kıymetli çam balı. Yoğun aroması ve şekerlenmeyen yapısıyla sofralarınızın vazgeçilmez şifa kaynağıdır.",
        whyMatch: "Doğal enerji kazanma ve geleneksel saf gurme lezzet arayışınız için katkısız çam balımız eşsiz bir besleyici kaynaktır.",
        usage: "Sabah kahvaltılarında kaymak veya peynir eşliğinde doğrudan tüketilmesi veya bitkisel çaylara karıştırılması tavsiye edilir."
      };
    }

    setRecommendation(result);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ goal: '', age: '', taste: '' });
    setRecommendation(null);
  };

  const currentQuestion = questions[step - 1];

  return (
    <div className="min-h-screen bg-background honeycomb-bg text-text-main py-16 px-4 md:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white border border-gray-200 shadow-sm p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Shimmer decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] pointer-events-none" />

        {/* STEP 1-3: QUESTIONS */}
        {step <= 3 && currentQuestion && (
          <div className="space-y-6">
            <div className="flex justify-between items-center text-xs font-heading font-black text-gray-500 uppercase tracking-widest">
              {step > 1 ? (
                <button onClick={handlePrev} className="flex items-center hover:text-secondary transition-colors">
                  <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Geri
                </button>
              ) : (
                <span />
              )}
              <span>Soru {step} / 3</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-heading font-black text-secondary uppercase tracking-tight leading-snug">
                {currentQuestion.title}
              </h2>
              <p className="text-xs text-text-muted font-body leading-relaxed">
                {currentQuestion.description}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 pt-4">
              {currentQuestion.options.map((opt) => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.value}
                    onClick={() => handleSelectOption(currentQuestion.id, opt.value)}
                    className="flex items-start text-left p-4 rounded-2xl bg-surface border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gray-100 group-hover:bg-primary/10 text-gray-500 group-hover:text-primary flex items-center justify-center mr-4 shrink-0 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-heading font-bold text-secondary group-hover:text-primary transition-colors uppercase">{opt.label}</h4>
                      <p className="text-xs text-text-muted font-body mt-1 leading-relaxed">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: RECOMMENDATION SCREEN */}
        {step === 4 && recommendation && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-400 mb-2 border border-green-500/20">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-heading font-black text-secondary uppercase tracking-tight">Kişiselleştirilmiş Şifa Analiziniz Hazır!</h2>
              <p className="text-xs text-text-muted font-body">Seçtiğiniz hedeflere en uygun arı ürünü belirlendi:</p>
            </div>

            {/* Recommendation Display Card */}
            <div className="bg-black/25 border border-gray-900 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-36 h-36 bg-gray-900 rounded-2xl overflow-hidden shrink-0 border border-gray-800">
                <img src={recommendation.image} alt={recommendation.name} className="w-full h-full object-cover" />
              </div>
              <div className="space-y-3">
                <span className="text-[9px] bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20 font-heading font-black uppercase tracking-wider">Tavsiye Edilen Eşleşme</span>
                <h3 className="text-lg font-heading font-black text-secondary uppercase tracking-tight">{recommendation.name}</h3>
                <p className="text-xs text-text-muted leading-relaxed font-body">{recommendation.description}</p>
                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-xs text-primary leading-relaxed font-body">
                  <strong>Neden Bu Ürün?</strong> {recommendation.whyMatch}
                </div>
              </div>
            </div>

            {/* Usage Details */}
            <div className="space-y-2 bg-[#1F2937]/20 border border-gray-800 p-5 rounded-2xl">
              <h4 className="text-[10px] font-heading font-black text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                <Award className="w-4 h-4 text-primary" /> Tüketim ve Kullanım Önerisi
              </h4>
              <p className="text-xs text-text-main leading-relaxed font-body">{recommendation.usage}</p>
            </div>

            {/* Special Promo code to convert sale */}
            <div className="p-5 bg-gradient-to-r from-primary/10 to-amber-700/10 border border-primary/20 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
              <div>
                <h4 className="text-xs font-heading font-bold text-secondary uppercase tracking-tight flex items-center justify-center md:justify-start gap-1">
                  <Sparkles className="w-4 h-4 text-primary animate-pulse" /> Sadece Size Özel Şifa İndirimi!
                </h4>
                <p className="text-[11px] text-text-muted font-body mt-0.5">Asistanı kullandığınız için sepetinizde %10 indirim kazandınız.</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-gray-900 border border-primary/30 rounded-xl font-heading font-black text-sm tracking-widest text-primary">ŞİFA10</span>
                <Link 
                  href={`/urun/${recommendation.slug}`}
                  className="px-4 py-2.5 bg-gradient-to-r from-primary to-amber-700 hover:from-amber-600 hover:to-amber-800 text-secondary font-heading font-black text-xs uppercase rounded-xl transition-all shadow-lg flex items-center gap-1.5 transform hover:scale-105"
                >
                  <ShoppingCart className="w-3.5 h-3.5" /> Ürüne Git
                </Link>
              </div>
            </div>

            {/* Reset Button */}
            <div className="flex justify-center pt-2">
              <button 
                onClick={handleReset}
                className="text-xs text-gray-500 hover:text-secondary uppercase font-bold flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Testi Yeniden Çöz
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
