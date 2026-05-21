"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, AlertTriangle, HelpCircle, ArrowRight, 
  FlaskConical, CheckCircle2, XCircle, Search, Sparkles,
  Info, Heart, Baby, Zap, Moon, Activity, Eye, Award
} from 'lucide-react';

export default function GercekBalRehberiPage() {
  const [batchNo, setBatchNo] = useState('');

  // Sensory Test States
  const [qCrystallization, setQCrystallization] = useState<string>('');
  const [qFlow, setQFlow] = useState<string>('');
  const [qSmell, setQSmell] = useState<string>('');
  const [qWaterTest, setQWaterTest] = useState<string>('');
  const [showSensoryResult, setShowSensoryResult] = useState<boolean>(false);

  // Remedy Wizard States
  const [activeRemedy, setActiveRemedy] = useState<string>('bogaz');

  const myths = [
    {
      myth: "Gerçek bal asla donmaz ve şekerlenmez.",
      fact: "TAMAMEN YANLIŞ!",
      explanation: "Gerçek ham bal (özellikle çiçek ve kestane balı) soğuk ortamlarda doğal olarak kristalleşir (şekerlenir). Bu balın bozulduğunu değil, aksine ısıl işlem görmemiş, filtre edilmemiş, enzim ve polen bakımından zengin HAKİKİ bir ham bal olduğunu gösterir. Çam balı ise yapısı gereği çok uzun süre donmadan kalabilir.",
      isTrue: false
    },
    {
      myth: "Balı yakarak veya suda süzerek gerçek olup olmadığını anlarız.",
      fact: "BİLİMSEL HİÇBİR GEÇERLİLİĞİ YOKTUR!",
      explanation: "İnternetteki kaşıkla sündürme, kibritle yakma veya suda çözünme testleri tamamen hurafe yöntemlerdir. Glikoz şurubu eklenmiş sahte ballar da bu testlerden geçebilir. Bir balın hakiki olduğunu anlamanın TEK yolu laboratuvarda yapılan kimyasal analizlerdir.",
      isTrue: false
    },
    {
      myth: "Balın kalitesini belirleyen en önemli parametre Prolin değeridir.",
      fact: "KESİNLİKLE DOĞRU!",
      explanation: "Prolin, sadece arıların salgı bezlerinden bala geçen çok değerli bir aminoasittir. Laboratuvar analizlerinde prolin miktarı ne kadar yüksekse arı o bala o kadar çok emek vermiş ve bitkilerden o kadar zengin nektar toplamış demektir. Türk Gıda Kodeksi'ne göre alt sınır 180 mg/kg iken, kaliteli ballarda bu değer 400-500 mg/kg üzerine çıkar.",
      isTrue: true
    }
  ];

  const remedies: Record<string, {
    title: string;
    description: string;
    mixName: string;
    ingredients: string[];
    preparation: string;
    dosage: string;
    productLink: string;
    productName: string;
    icon: React.ReactNode;
  }> = {
    bogaz: {
      title: "Boğaz & Öksürük Şifası",
      description: "Boğaz yollarını yumuşatmak, kuru öksürük ve tahrişi gidermek için kestane balı içeren en güçlü kış kürü.",
      mixName: "Kestane Ballı Zencefil Macunu",
      ingredients: [
        "2 yemek kaşığı Arı Hayat Ham Kestane Balı",
        "1 çay kaşığı toz zencefil (veya rendelenmiş taze zencefil)",
        "1/2 çay kaşığı toz zerdeçal",
        "5-6 damla taze sıkılmış limon suyu"
      ],
      preparation: "Cam bir kasede ahşap veya plastik bir kaşık yardımıyla balı, zencefili ve zerdeçalı homojen hale gelene kadar karıştırın. En son limon suyunu ekleyip yavaşça harmanlayın.",
      dosage: "Günde 2 defa (sabah-akşam) aç karnına 1 tatlı kaşığı yavaşça emilerek tüketilir. Karışımı yuttuktan sonra en az 15 dakika su veya sıvı tüketilmemesi önerilir.",
      productLink: "/urunler?category=bal",
      productName: "Ham Kestane Balı",
      icon: <Activity className="w-5 h-5 text-amber-400" />
    },
    bagisiklik: {
      title: "Çocuklar İçin Doğal Bağışıklık Kalkanı",
      description: "Kreş ve okul dönemindeki çocukların mevsim geçişlerinde vücut direncini artırmak için propolisli kür.",
      mixName: "Çocuklar İçin Propolisli Şifa Kürü",
      ingredients: [
        "1 kavanoz (250g) Arı Hayat Ham Çiçek Balı",
        "10-15 damla Arı Hayat Suda Çözünür Propolis Ekstraktı",
        "1 tatlı kaşığı öğütülmüş taze polen (opsiyonel)"
      ],
      preparation: "Çiçek balının içerisine propolis damlalarını ekleyin ve tahta kaşık yardımıyla iyice karıştırın. Serin ve loş bir yerde saklayın.",
      dosage: "1 yaşından büyük çocuklar için her sabah aç karnına 1 çay kaşığı verilir. Süte, yoğurda veya taze meyve suyuna karıştırarak da yedirebilirsiniz.",
      productLink: "/urunler?category=propolis",
      productName: "Suda Çözünür Propolis",
      icon: <Baby className="w-5 h-5 text-pink-400" />
    },
    enerji: {
      title: "Zindelik & Sporcu Güç Deposu",
      description: "Kronik halsizlik, sabah uyanamama veya spor öncesi temiz enerji arayanlar için glikozsuz formül.",
      mixName: "Arı Ekmeği & Polen Enerji Bombası",
      ingredients: [
        "3 yemek kaşığı Arı Hayat Yayla Çiçek Balı",
        "1 tatlı kaşığı Arı Ekmeği (Perga)",
        "1 çay kaşığı arı sütü",
        "1 çay kaşığı tarçın"
      ],
      preparation: "Balı tarçın ile karıştırın. Arı sütünü ve arı ekmeği tanelerini ekleyip hafifçe kaşıklayarak karıştırın. Metal kaşık değdirmemeye dikkat edin.",
      dosage: "Sabah kahvaltısından 30 dakika önce veya spordan 45 dakika önce 1 tatlı kaşığı doğrudan çiğnenerek tüketilir.",
      productLink: "/urunler?category=polen-ari-ekmegi",
      productName: "Arı Ekmeği (Perga)",
      icon: <Zap className="w-5 h-5 text-yellow-400 animate-pulse" />
    },
    stres: {
      title: "Sakinlik ve Rahat Uyku",
      description: "Günün stresini atmak, gevşemek ve uykusuzluk problemlerini doğal yoldan aşmak için gece kürü.",
      mixName: "Çam Ballı Gece İksiri",
      ingredients: [
        "1 su bardağı ılık su veya ılık melisa/papatya çayı",
        "1.5 tatlı kaşığı Arı Hayat Ham Çam Balı",
        "3 damla limon suyu"
      ],
      preparation: "Kaynatılıp 5-10 dakika dinlendirilmiş ılık çaya (balın enzimlerinin ölmemesi için suyun 40 derecenin altında olması gerekir) çam balını ve limonu ekleyip karıştırın.",
      dosage: "Gece uykusundan 45 dakika önce ılık olarak yudum yudum içilir.",
      productLink: "/urunler?category=bal",
      productName: "Süzme Çam Balı",
      icon: <Moon className="w-5 h-5 text-indigo-400" />
    }
  };

  // Sensory Test Logic Calculator
  const handleCalculateSensoryResult = () => {
    if (!qCrystallization || !qFlow || !qSmell || !qWaterTest) {
      return null;
    }

    let suspectScore = 0;
    const findings: string[] = [];

    // 1. Crystallization
    if (qCrystallization === 'butter') {
      findings.push("Tereyağı gibi homojen donma/kristalleşme: Balınızın ısıl işlem görmemiş doğal ham bal olduğuna işaret eden en güçlü ve olumlu özelliktir.");
    } else if (qCrystallization === 'sugar') {
      suspectScore += 30;
      findings.push("Dibe şeker çökelmesi: Arıya aşırı şeker şerbeti yedirildiğini veya balın içerisine glikoz şurubu karıştırıldığını gösteren şüpheli bir durumdur.");
    } else {
      findings.push("Sürekli berrak sıvı kalması: Eğer çam balı değilse, balın yüksek sıcaklıkta kaynatılarak pastörize edildiğini ve tüm besin değerini/polenlerini yitirdiğini gösterir.");
    }

    // 2. Flow
    if (qFlow === 'stretch') {
      findings.push("Kesintisiz süzülme: Balın su oranının (nem) düşük ve kıvamının ideal olduğunu gösterir. Ancak bazı şeker şurupları da uzayabilir.");
    } else {
      suspectScore += 20;
      findings.push("Hemen damlayıp kopması: Nem oranının yasal sınır olan %20'den fazla olduğuna veya bala sonradan su katıldığına işaret eder. Bal kısa sürede ekşiyebilir.");
    }

    // 3. Smell
    if (qSmell === 'sharp') {
      findings.push("Genzi yakan doğal yayla/çiçek kokusu: Arıların çiçeklerden aldığı hakiki aromatik polenlerin varlığını kanıtlar. Çok olumlu bir bulgudur.");
    } else if (qSmell === 'perfume') {
      suspectScore += 40;
      findings.push("Aşırı parfümlü yapay koku: Yapay aroma verici esanslar kullanılarak şeker şurubuna bal süsü verilmiş olma ihtimali son derece yüksektir.");
    } else {
      suspectScore += 15;
      findings.push("Neredeyse sıfır koku: Balın aşırı filtre edildiğini veya arının çiçek yüzü görmeden sadece şeker şerbetiyle beslendiğini gösterir.");
    }

    // 4. Water Test
    if (qWaterTest === 'solid') {
      findings.push("Ilık suda hemen erimeden dibe çökme: Balın içindeki su oranının düşük ve moleküler yapısının yoğun olduğunu gösteren harika bir ev testidir.");
    } else {
      suspectScore += 35;
      findings.push("Ilık suda anında dağılma: İçeriğindeki yüksek glikoz şurubu veya yapay tatlandırıcılar nedeniyle balın su ile anında bağ kurduğunu ve yapay olduğunu gösterir.");
    }

    let verdict = "DOĞAL BAL OLUMLU İPUÇLARI ✓";
    let verdictColor = "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    let score = Math.max(0, 100 - suspectScore);

    if (score < 50) {
      verdict = "SAHTE / TAĞŞİŞLİ BAL ŞÜPHESİ YÜKSEK ⚠";
      verdictColor = "bg-rose-500/10 text-rose-400 border-rose-500/30 font-black";
    } else if (score < 80) {
      verdict = "DÜŞÜK KALİTELİ / ISIL İŞLEMLİ BAL ŞÜPHESİ ⚠";
      verdictColor = "bg-amber-500/10 text-amber-400 border-amber-500/30";
    }

    return { score, verdict, verdictColor, findings };
  };

  const sensoryResult = handleCalculateSensoryResult();

  return (
    <div className="pt-24 min-h-screen bg-[#0B0F19] text-gray-100 font-body">
      
      {/* Hero Header */}
      <div className="bg-gradient-to-b from-amber-950/30 to-transparent py-16 px-4 relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-honey-gradient honeycomb-bg opacity-5 pointer-events-none"></div>
        <div className="container mx-auto max-w-4xl relative z-10">
          <span className="text-[10px] bg-amber-500/10 border border-amber-500/30 text-primary px-3 py-1 rounded-full font-black tracking-widest uppercase">
            TÜRKİYE GIDA GÜNDEMİ ÖZEL REHBERİ
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-black uppercase tracking-tight text-white mt-4 mb-6 leading-tight">
            SAHTE BAL SKANDALLARI VE <br/>
            <span className="text-primary italic">GERÇEK BAL</span> GERÇEĞİ
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Tarım Bakanlığı ifşalarının gündemde olduğu bu günlerde, sağlığınızı glikoz şuruplu yapay ballardan korumanız için bilimsel doğruları ve gerçek bal tahlil yöntemlerini bir araya getirdik.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 py-12 space-y-16">
        
        {/* Quick QR Lookup CTA */}
        <div className="bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-slate-900 border border-amber-500/20 p-8 rounded-[2.5rem] relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="max-w-md">
              <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-2 mb-2">
                <ShieldCheck className="text-primary w-6 h-6" /> LABORATUVAR GÜVENCELİ SORGULAMA
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-body">
                Arı Hayat olarak lafta değil, laboratuvarda şeffaflık sunuyoruz. Aldığınız kavanozun arkasındaki barkod kodunu girerek prolin, nem ve diastaz değerlerini anında inceleyebilirsiniz.
              </p>
            </div>
            
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                if (batchNo.trim()) window.location.href = `/bal-analizi?batch=${encodeURIComponent(batchNo.trim().toUpperCase())}`;
              }}
              className="flex items-center gap-2 w-full md:w-auto"
            >
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  value={batchNo}
                  onChange={(e) => setBatchNo(e.target.value)}
                  placeholder="Parti No (Örn: KESTANE-2026-01)"
                  className="w-full md:w-64 pl-10 pr-4 py-3 bg-[#111827] border border-gray-800 rounded-xl focus:border-primary outline-none text-white text-xs font-heading tracking-wider uppercase"
                  required
                />
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-650" />
              </div>
              <button 
                type="submit"
                className="bg-primary hover:bg-amber-500 text-secondary font-heading font-black text-xs uppercase px-5 py-3.5 rounded-xl transition-all shadow-lg shadow-primary/10 whitespace-nowrap"
              >
                Tahlili Gör
              </button>
            </form>
          </div>
        </div>

        {/* INTERACTIVE MODULE 1: Sensory Honey Analysis Wizard (Duyusal Analiz) */}
        <div className="bg-[#111827]/40 border border-gray-800/80 rounded-[2.5rem] p-6 md:p-10 space-y-8 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="text-center space-y-2">
            <span className="text-[9px] bg-amber-500/10 border border-amber-500/30 text-primary px-3 py-1 rounded-full font-black tracking-widest uppercase">
              EVDE UYGULANABİLİR DOĞALLIK DEDEKTİFİ
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-black text-white uppercase tracking-tight">
              DUYUSAL BAL TESTİ & EVDE TESPİT SİHİRBAZI
            </h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
              Elinizdeki balın laboratuvar tahlil raporu yoksa üzülmeyin. Herkesin evde kendi duyularıyla veya basit malzemelerle yapabileceği 4 soruluk testimizi tamamlayarak balın doğallık ipuçlarını öğrenin.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Input Questions Form */}
            <div className="lg:col-span-6 space-y-5 bg-black/20 p-5 rounded-3xl border border-gray-850">
              
              {/* Question 1 */}
              <div className="space-y-2">
                <label className="block text-xs font-heading font-black text-gray-300 uppercase tracking-wide">
                  1. Balın Donma / Kristalleşme Durumu Nedir?
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => { setQCrystallization('butter'); setShowSensoryResult(true); }}
                    className={`p-3 text-left text-xs rounded-xl border font-body transition-all ${
                      qCrystallization === 'butter' ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-[#111827] border-gray-800 text-gray-400'
                    }`}
                  >
                    🍯 Tereyağı kıvamında krem gibi dondu / pütürleşti
                  </button>
                  <button
                    onClick={() => { setQCrystallization('sugar'); setShowSensoryResult(true); }}
                    className={`p-3 text-left text-xs rounded-xl border font-body transition-all ${
                      qCrystallization === 'sugar' ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-[#111827] border-gray-800 text-gray-400'
                    }`}
                  >
                    ❄️ Kavanozun dibinde toz şeker gibi çökelme yaptı
                  </button>
                  <button
                    onClick={() => { setQCrystallization('liquid'); setShowSensoryResult(true); }}
                    className={`p-3 text-left text-xs rounded-xl border font-body transition-all ${
                      qCrystallization === 'liquid' ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-[#111827] border-gray-800 text-gray-400'
                    }`}
                  >
                    💧 Aylardır cam gibi dümdüz, akışkan ve berrak kaldı
                  </button>
                </div>
              </div>

              {/* Question 2 */}
              <div className="space-y-2">
                <label className="block text-xs font-heading font-black text-gray-300 uppercase tracking-wide">
                  2. Kaşıktan Akışkanlık / Süzülme Yapısı Nasıl?
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => { setQFlow('stretch'); setShowSensoryResult(true); }}
                    className={`p-3 text-left text-xs rounded-xl border font-body transition-all ${
                      qFlow === 'stretch' ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-[#111827] border-gray-800 text-gray-400'
                    }`}
                  >
                    📏 Kesintisiz, ince bir ip gibi uzayarak süzülüyor
                  </button>
                  <button
                    onClick={() => { setQFlow('drop'); setShowSensoryResult(true); }}
                    className={`p-3 text-left text-xs rounded-xl border font-body transition-all ${
                      qFlow === 'drop' ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-[#111827] border-gray-800 text-gray-400'
                    }`}
                  >
                    💧 Hemen kesilip damla damla koparak düşüyor
                  </button>
                </div>
              </div>

              {/* Question 3 */}
              <div className="space-y-2">
                <label className="block text-xs font-heading font-black text-gray-300 uppercase tracking-wide">
                  3. Balın Koku ve Yayla Çiçek Aroması Nasıl?
                </label>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => { setQSmell('sharp'); setShowSensoryResult(true); }}
                    className={`p-3 text-left text-xs rounded-xl border font-body transition-all ${
                      qSmell === 'sharp' ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-[#111827] border-gray-800 text-gray-400'
                    }`}
                  >
                    🌸 Genzi hafif yakan, buram buram doğal bitki kokusu var
                  </button>
                  <button
                    onClick={() => { setQSmell('perfume'); setShowSensoryResult(true); }}
                    className={`p-3 text-left text-xs rounded-xl border font-body transition-all ${
                      qSmell === 'perfume' ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-[#111827] border-gray-800 text-gray-400'
                    }`}
                  >
                    🍭 Aşırı parfümlü, karamelize veya yapay bir meyve şekeri kokusu var
                  </button>
                  <button
                    onClick={() => { setQSmell('none'); setShowSensoryResult(true); }}
                    className={`p-3 text-left text-xs rounded-xl border font-body transition-all ${
                      qSmell === 'none' ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-[#111827] border-gray-800 text-gray-400'
                    }`}
                  >
                    💨 Neredeyse hiçbir kokusu veya aroması yok, nötr tat
                  </button>
                </div>
              </div>

              {/* Question 4 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="block text-xs font-heading font-black text-gray-300 uppercase tracking-wide">
                    4. Ilık Su Testi Sonucu Nedir?
                  </label>
                  <span className="text-[9px] bg-primary/20 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-bold">Evde Yapın</span>
                </div>
                <p className="text-[10px] text-gray-500 font-body leading-relaxed mb-2">
                  (Bir bardak ılık suya 1 tatlı kaşığı bal bırakın ve izleyin)
                </p>
                <div className="grid grid-cols-1 gap-2">
                  <button
                    onClick={() => { setQWaterTest('solid'); setShowSensoryResult(true); }}
                    className={`p-3 text-left text-xs rounded-xl border font-body transition-all ${
                      qWaterTest === 'solid' ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-[#111827] border-gray-800 text-gray-400'
                    }`}
                  >
                    👇 Suya düşer düşmez erimedi, bardağın dibinde bütün halinde yığıldı
                  </button>
                  <button
                    onClick={() => { setQWaterTest('dissolve'); setShowSensoryResult(true); }}
                    className={`p-3 text-left text-xs rounded-xl border font-body transition-all ${
                      qWaterTest === 'dissolve' ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-[#111827] border-gray-800 text-gray-400'
                    }`}
                  >
                    🫧 Suya düşer düşmez hemen çözündü ve suya karışarak dağıldı
                  </button>
                </div>
              </div>

            </div>

            {/* Output Findings panel */}
            <div className="lg:col-span-6 space-y-6">
              {showSensoryResult && sensoryResult ? (
                <div className="bg-slate-900/60 border border-gray-850 p-6 rounded-3xl space-y-6 relative overflow-hidden">
                  
                  {/* Verdict Badge */}
                  <div className={`p-4 rounded-2xl border text-center font-heading text-xs tracking-wider uppercase ${sensoryResult.verdictColor}`}>
                    {sensoryResult.verdict}
                  </div>

                  {/* Guess trust probability */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-400 font-bold uppercase tracking-wider">Doğallık Olasılık İndeksi</span>
                      <span className={`font-black text-sm ${
                        sensoryResult.score >= 80 ? 'text-emerald-400' : sensoryResult.score >= 50 ? 'text-amber-400' : 'text-rose-500'
                      }`}>{sensoryResult.score}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-850 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${
                          sensoryResult.score >= 80 ? 'bg-emerald-500' : sensoryResult.score >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                        }`}
                        style={{ width: `${sensoryResult.score}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Findings breakdown */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-heading font-black text-gray-500 uppercase tracking-widest flex items-center gap-1">
                      <Eye className="w-4 h-4 text-primary" /> Duyusal Bulgularınız:
                    </h4>
                    
                    <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                      {sensoryResult.findings.map((f, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-start gap-2.5 p-3 bg-black/30 border border-gray-800 rounded-xl text-xs text-gray-300 font-body leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2"></span>
                          <span>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Scientific disclaimer */}
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl space-y-1.5">
                    <div className="text-[9px] font-heading font-black text-primary uppercase tracking-wider flex items-center gap-1">
                      <Info className="w-3.5 h-3.5" /> BİLİMSEL UYARI
                    </div>
                    <p className="text-[10px] text-gray-400 font-body leading-relaxed">
                      Duyusal testler bal hakkında ön bilgi verse de sahtecilik yöntemleri çok geliştiği için nihai kanıt **sadece laboratuvar analizi** ile mümkündür. Satın alacağınız balın mutlaka barkodlu akredite tahlil raporunu talep edin.
                    </p>
                  </div>

                </div>
              ) : (
                <div className="h-full bg-slate-900/20 border border-dashed border-gray-800 rounded-3xl p-12 flex flex-col items-center justify-center text-center space-y-4">
                  <FlaskConical className="w-10 h-10 text-gray-600 animate-pulse" />
                  <div className="space-y-1">
                    <h4 className="text-sm font-heading font-black text-gray-400 uppercase">Test Hazır</h4>
                    <p className="text-xs text-gray-550 font-body max-w-xs">
                      Sol paneldeki 4 soruyu cevaplayarak evdeki balınızın doğallık şüphesini test edebilirsiniz.
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* HEALTH PORTAL: Apiterapi & GETAT Guidance Panel */}
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-[#111827] border border-amber-500/20 rounded-[2.5rem] p-8 md:p-12 space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-gray-800">
            <div className="space-y-2">
              <span className="text-[9px] bg-red-500/10 border border-red-550/30 text-rose-400 px-3 py-1 rounded-full font-black tracking-widest uppercase">
                T.C. SAĞLIK BAKANLIĞI MEVZUATI
              </span>
              <h2 className="text-2xl md:text-3xl font-heading font-black text-white uppercase tracking-tight flex items-center gap-2">
                <Award className="w-8 h-8 text-primary" /> APİTERAPİ & GETAT REHBERİ
              </h2>
            </div>
            <p className="text-xs text-gray-400 font-body max-w-sm leading-relaxed">
              Arı ürünlerinin doktor gözetiminde tamamlayıcı tedavi amaçlı kullanımı, ülkemizde resmi GETAT (Geleneksel ve Tamamlayıcı Tıp) yönetmelikleri ile korunmaktadır.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-black/20 border border-gray-850 p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-primary flex items-center justify-center">
                <FlaskConical className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-heading font-black text-white uppercase tracking-wide">Ham Bal Şifası</h4>
              <p className="text-[11px] text-gray-450 leading-relaxed font-body">
                Pastörize edilmeyen ham bal; zengin enzim ve antioksidanlar sayesinde yara iyileşmesi, boğaz tahrişi ve üst solunum yolları yatıştırılmasında GETAT hekimlerince tercih edilir.
              </p>
            </div>

            <div className="bg-black/20 border border-gray-850 p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-heading font-black text-white uppercase tracking-wide">Propolis Antibiyotiği</h4>
              <p className="text-[11px] text-gray-450 leading-relaxed font-body">
                Arıların kovanı mikroplardan korumak için ürettiği propolis, en güçlü doğal antiviral ve antibakteriyel ajandır. Bağışıklık modülasyonu tedavisinde başroldedir.
              </p>
            </div>

            <div className="bg-black/20 border border-gray-850 p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center">
                <Baby className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-heading font-black text-white uppercase tracking-wide">Arı Sütü Yenileyici</h4>
              <p className="text-[11px] text-gray-450 leading-relaxed font-body">
                Sadece kraliçe arının beslendiği arı sütü; protein, aminoasit ve HDA bileşenleriyle hücresel büyüme, zihinsel gelişim ve enerji seviyelerinin desteklenmesinde etkilidir.
              </p>
            </div>

            <div className="bg-black/20 border border-gray-850 p-6 rounded-3xl space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-heading font-black text-white uppercase tracking-wide">Arı Ekmeği (Perga)</h4>
              <p className="text-[11px] text-gray-450 leading-relaxed font-body">
                Polenin arı tarafından mayalanmış halidir. Dış zarı kırıldığı için sindirimi son derece kolaydır. Sindirim sistemi mikrobiyotasını koruyan probiyotik bombasıdır.
              </p>
            </div>

          </div>

          <div className="p-5 bg-rose-500/5 border border-rose-500/20 rounded-3xl flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-rose-450 shrink-0 animate-pulse" />
            <span className="text-[11px] text-rose-300 leading-relaxed font-body">
              <strong>ÖNEMLİ UYARI:</strong> Apiterapi uygulamaları doktor teşhisi ve yönlendirmesiyle yapılmalıdır. Ayrıca 1 yaşından küçük çocukların sindirim sistemi gelişmediği için botulizm riski nedeniyle bal ve arı ürünleri kesinlikle tükettirilmemelidir.
            </span>
          </div>
        </div>

        {/* INTERACTIVE MODULE 2: Remedy & Winter Mixture Wizard */}
        <div className="bg-[#111827]/40 border border-gray-800/80 rounded-[2.5rem] p-6 md:p-10 space-y-8 relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="text-center space-y-2">
            <span className="text-[9px] bg-amber-500/10 border border-amber-500/30 text-primary px-3 py-1 rounded-full font-black tracking-widest uppercase">
              TÜRK GELENEKSEL AİLE ŞİFASI
            </span>
            <h2 className="text-2xl md:text-3xl font-heading font-black text-white uppercase tracking-tight">
              ŞİFA REÇETESİ & DOĞAL KARIŞIM SİHİRBAZI
            </h2>
            <p className="text-xs text-gray-400 max-w-xl mx-auto leading-relaxed">
              Özellikle kış aylarında veya salgın dönemlerinde aile bireylerinizin sağlığını korumak için, arı ürünlerimizi diğer doğal şifa kaynaklarıyla nasıl karıştıracağınızı keşfedin.
            </p>
          </div>

          {/* Symptom Tab Selector */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.keys(remedies).map((key) => {
              const remedy = remedies[key];
              const isSelected = activeRemedy === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveRemedy(key)}
                  className={`p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                    isSelected 
                      ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/5' 
                      : 'bg-black/20 border-gray-800 hover:border-gray-700 text-gray-450'
                  }`}
                >
                  <div className={`p-2 rounded-xl shrink-0 ${isSelected ? 'bg-primary/20 text-primary' : 'bg-gray-850'}`}>
                    {remedy.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-heading font-black uppercase tracking-tight line-clamp-1">{remedy.title}</h4>
                    <p className="text-[9px] font-body text-gray-500 mt-0.5">Bitkisel Kür</p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Recipe Card Output */}
          <div className="bg-slate-900/60 border border-gray-850 p-6 md:p-8 rounded-3xl space-y-6 relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl"></div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-gray-800">
              <div>
                <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                  Geleneksel Şifa Tarifi
                </span>
                <h3 className="text-lg md:text-xl font-heading font-black text-white uppercase tracking-tight mt-1">
                  {remedies[activeRemedy].mixName}
                </h3>
              </div>
              <div className="text-xs text-gray-400 font-body max-w-sm italic">
                "{remedies[activeRemedy].description}"
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Ingredients List */}
              <div className="space-y-4">
                <h4 className="text-[10px] font-heading font-black text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-primary" /> Karışım Malzemeleri
                </h4>
                <ul className="space-y-2">
                  {remedies[activeRemedy].ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs font-body text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0"></span>
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Prep & Usage instructions */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-[10px] font-heading font-black text-gray-500 uppercase tracking-widest">
                    Hazırlanışı
                  </h4>
                  <p className="text-xs font-body text-gray-400 leading-relaxed">
                    {remedies[activeRemedy].preparation}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h4 className="text-[10px] font-heading font-black text-gray-500 uppercase tracking-widest">
                    Tüketim Önerisi
                  </h4>
                  <p className="text-xs font-body text-gray-400 leading-relaxed">
                    {remedies[activeRemedy].dosage}
                  </p>
                </div>
              </div>

            </div>

            {/* Direct Shop Matching Callout */}
            <div className="pt-4 border-t border-gray-800/80 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" />
                <span className="text-xs text-gray-400 font-body">
                  Bu kür için en iyi sonuçları taze ve analizli <strong className="text-white">{remedies[activeRemedy].productName}</strong> ürünümüzle alabilirsiniz.
                </span>
              </div>
              <Link
                href={remedies[activeRemedy].productLink}
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-white font-heading font-black uppercase tracking-wider transition-colors whitespace-nowrap bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-xl border border-primary/20"
              >
                Şifalı Ürünü Gör <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>
        </div>

        {/* Myths & Facts Grid */}
        <div>
          <h2 className="text-2xl font-heading font-black text-white text-center uppercase tracking-tight mb-2">
            BAL HAKKINDA DOĞRU BİLİNEN YANLIŞLAR (EFSANELER & GERÇEKLER)
          </h2>
          <p className="text-center text-xs text-gray-500 mb-10 max-w-xl mx-auto">
            Halk arasında dilden dile dolaşan ama bilimsel olarak hiçbir karşılığı bulunmayan yanlış iddiaların doğrularını inceleyin.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {myths.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-[#111827]/40 border border-gray-800 p-6 rounded-3xl flex flex-col justify-between hover:border-gray-700/50 transition-all duration-300 relative group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-[10px] bg-slate-800 text-gray-300 px-2.5 py-1 rounded-full font-bold uppercase">
                      İddia {idx + 1}
                    </span>
                    {item.isTrue ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-500" />
                    ) : (
                      <XCircle className="w-6 h-6 text-rose-500" />
                    )}
                  </div>
                  
                  <h4 className="text-base font-heading font-black text-white uppercase tracking-tight mb-2">
                    "{item.myth}"
                  </h4>
                  
                  <span className={`text-[10px] font-black uppercase tracking-wider block mb-3 ${item.isTrue ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {item.fact}
                  </span>
                  
                  <p className="text-xs text-gray-400 leading-relaxed font-body">
                    {item.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scientific Metrics Breakdown */}
        <div className="bg-[#111827]/20 border border-gray-800/60 p-8 rounded-[2.5rem] space-y-6">
          <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight text-center">
            BİR BALIN SAFLIK KRİTERLERİ NELERDİR?
          </h3>
          <p className="text-xs text-gray-500 text-center max-w-xl mx-auto">
            Laboratuvar tahlillerinde incelenen ve hileli balları anında ortaya çıkaran 3 temel bilimsel ölçüm:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-heading font-black uppercase text-sm">
                <FlaskConical className="w-4 h-4" /> 1. Prolin Miktarı (mg/kg)
              </div>
              <p className="text-xs text-gray-450 leading-relaxed">
                Balın saflığını ve besleyici değerini gösteren en temel aminoasittir. Arıların bal üretimi sırasında kendi gövdelerinden kattıkları bir salgıdır. Glikoz veya nişasta bazlı şuruplarla yapılan sahte ballarda prolin değeri sıfıra yakındır.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-heading font-black uppercase text-sm">
                <FlaskConical className="w-4 h-4" /> 2. Diastaz Sayısı
              </div>
              <p className="text-xs text-gray-450 leading-relaxed">
                Arının salgıladığı, nişastayı parçalayan doğal bir enzimdir. Balın ısıl işleme tabi tutulup tutulmadığını, yani ısıtılarak filtre edilip besin değerinin öldürülüp öldürülmediğini gösterir. Taze ve ısıl işlem görmemiş ballarda yüksek çıkar.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary font-heading font-black uppercase text-sm">
                <FlaskConical className="w-4 h-4" /> 3. Nem Oranı (%)
              </div>
              <p className="text-xs text-gray-450 leading-relaxed">
                Balın içerisindeki su miktarıdır. Arılar petek gözlerini balmumuyla sırrlamadan önce balın nemini kanat çırparak uçururlar. Doğal olgunlaşmış balda nem %16-%18 arasındadır. Erken hasat edilen veya dışarıdan su/şurup katılmış ballarda nem oranı yüksek çıkar.
              </p>
            </div>

          </div>
        </div>

        {/* Commitment Banner */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <Sparkles className="w-8 h-8 text-primary mx-auto animate-pulse" />
          <h3 className="text-lg font-heading font-black text-white uppercase tracking-tight">ARI HAYAT %100 DOĞALLIK TAAHHÜDÜ</h3>
          <p className="text-xs text-gray-400 leading-relaxed">
            Biz, kovanlarımızdan aldığımız ballara hiçbir katkı maddesi eklemiyor, pastörize etmiyor ve tüm polen zenginliğini içinde bırakıyoruz. Her serimiz tescilli analiz raporuna tabidir. Ailenize şifa götürürken güveninizi boşa çıkarmıyoruz.
          </p>
          <div className="pt-2">
            <Link 
              href="/urunler" 
              className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors text-xs font-heading font-black uppercase tracking-widest"
            >
              Analizli Ürünlerimizi Keşfedin <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>

    </div>
  );
}
