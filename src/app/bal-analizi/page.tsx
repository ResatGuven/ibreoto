"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, ShieldCheck, HelpCircle, FileText, ChevronRight, 
  Award, FlaskConical, Calendar, ArrowRight, Loader2,
  CheckCircle2, AlertTriangle, Info, Check,
  Flame, Droplets, Wind, Sparkles, Share2, Download, BookOpen, Heart, RefreshCw
} from 'lucide-react';
import { exportAnalysisPDF } from '@/utils/pdfExport';

export default function BalAnaliziPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0B0F19] text-gray-100 py-16 px-4 md:px-8 flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
      </div>
    }>
      <BalAnaliziContent />
    </Suspense>
  );
}

function BalAnaliziContent() {
  const searchParams = useSearchParams();
  const [batchNo, setBatchNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);

  const [activeCureTab, setActiveCureTab] = useState('immun');
  const [activeMyth, setActiveMyth] = useState<number | null>(null);
  const [isGeneratingCert, setIsGeneratingCert] = useState(false);
  const [certShareMessage, setCertShareMessage] = useState('');

  const getTastingNotes = (productName: string = "") => {
    const lowerName = productName.toLocaleLowerCase('tr-TR');
    if (lowerName.includes("kestane")) {
      return {
        bogaz: 8,
        kivam: 9,
        aroma: 9,
        bogazDesc: "Karakteristik Yoğun & Kalıcı Burukluk",
        kivamDesc: "Yoğun, Yavaş Akışkan Kadifemsi Kıvam",
        aromaDesc: "Kestane Çiçeği, Hafif Odunsu ve Fındıksı Notalar",
        description: "Kestane ağaçlarının derin ormanlarından süzülen bu premium bal, kestane çiçeğinin kendine has buruk tatlılığını ve damakta uzun süre kalan odunsu aromasını barındırır. Güçlü boğaz vurumu ile antioksidan gücünü hissettirir.",
        tags: ["Orman Nüansı", "Hafif Buruk", "Yüksek Tanen", "Koyu Renkli Kahve"]
      };
    } else if (lowerName.includes("yayla") || lowerName.includes("cicek") || lowerName.includes("çiçek")) {
      return {
        bogaz: 6,
        kivam: 7,
        aroma: 8,
        bogazDesc: "Yumuşak & Meyvemsi İçimli",
        kivamDesc: "Süzme Akışkan & Altın Sarısı Parlaklık",
        aromaDesc: "Yayla Kekiği, Kır Çiçekleri ve Narenciye Esintisi",
        description: "Yüksek rakımlı yaylalarda açan binbir çeşit kır çiçeğinden toplanan bu bal, ferahlatıcı meyvemsi ve kekiksi aromalarıyla son derece yumuşak bir içim sunar. Damakta taze çiçek polenlerinin kokusunu canlandırır.",
        tags: ["Kekik Kokusu", "Çiçeksi Aromatik", "Hafif Tatlı", "Berrak Altın"]
      };
    } else {
      return {
        bogaz: 7,
        kivam: 8,
        aroma: 8,
        bogazDesc: "Dengeli ve Karakterli Boğaz Vurumu",
        kivamDesc: "Dengeli Akışkanlıkta Premium Doku",
        aromaDesc: "Çam Ormanı Esintisi, Yabani Flora Baharatları",
        description: "Doğal arılıklarımızdan sofranıza ulaşan bu özel harman, yabani çiçeklerin ve orman florasının eşsiz dengesini yansıtır. Ne çok hafif ne çok ağır, tam kıvamında bir gurme bal deneyimi sunar.",
        tags: ["Yabani Flora", "Dengeli Tat", "Çok Çiçekli", "Zengin Aroma"]
      };
    }
  };

  const handleDownloadCert = async () => {
    setIsGeneratingCert(true);
    try {
      await exportAnalysisPDF(analysis);
      setCertShareMessage("Sertifika analiz belgesi başarıyla PDF olarak indirildi!");
      setTimeout(() => setCertShareMessage(""), 5000);
    } catch (e) {
      console.error("PDF generation failed:", e);
    } finally {
      setIsGeneratingCert(false);
    }
  };

  // 1. Fetch analysis details
  const fetchAnalysis = async (searchBatch: string) => {
    if (!searchBatch.trim()) return;
    setLoading(true);
    setError('');
    setAnalysis(null);
    try {
      const res = await fetch(`/api/admin/analyses?batchNo=${encodeURIComponent(searchBatch.trim().toUpperCase())}`);
      const data = await res.json();
      if (res.ok) {
        setAnalysis(data);
      } else {
        setError(data.error || 'Analiz raporu bulunamadı. Lütfen barkod üzerindeki lot kodunu doğru girdiğinizden emin olun.');
      }
    } catch (err) {
      setError('Bağlantı hatası oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // Run on mount if batch in query params
  useEffect(() => {
    const queryBatch = searchParams.get('batch') || searchParams.get('batchNo');
    if (queryBatch) {
      setBatchNo(queryBatch.toUpperCase());
      fetchAnalysis(queryBatch);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAnalysis(batchNo);
  };

  // Helper component to render SVG Radial Gauge with consumer translations and horizontal scale
  const RadialGauge = ({ value, max, label, unit, idealRange, description, colorClass = "text-primary" }: any) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (Math.min(value, max) / max) * circumference;

    // Calculate rating and comparison info dynamically
    let badgeText = "Standart";
    let badgeStyle = "bg-gray-800 text-gray-400 border border-gray-700";
    let explanationText = "";

    if (label.includes("Prolin")) {
      const ratio = (value / 180).toFixed(1);
      if (value >= 500) {
        badgeText = "Süper Premium Sınıf (Apiterapik Değer)";
        badgeStyle = "bg-amber-500/10 text-amber-400 border border-amber-500/20";
        explanationText = `Market ballarında yasal limit 180 mg/kg iken, bu bal tam ${value} mg/kg prolin içerir. Standardın ${ratio} katı gücüyle yüksek antioksidan ve tıbbi değere sahiptir.`;
      } else if (value >= 300) {
        badgeText = "Yüksek Kaliteli Yayla Balı";
        badgeStyle = "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
        explanationText = `Doğal yayla florasından toplanan bu bal, ${value} mg/kg prolin değeriyle arının doğallığını ve besleyici gücünü kanıtlamaktadır.`;
      } else {
        badgeText = "Standart Çiçek Balı";
        badgeStyle = "bg-gray-850 text-gray-400 border border-gray-800";
        explanationText = "Normal sofralık çiçek balı limitlerindedir, günlük tüketime uygundur.";
      }
    } else if (label.includes("Nem")) {
      if (value < 18) {
        badgeText = "Kusursuz Olgunluk (Ultra Yoğun Kıvam)";
        badgeStyle = "bg-blue-500/10 text-blue-400 border border-blue-500/20";
        explanationText = `Nem oranı %${value}'dir. Balın suyunun düşük olması arıların peteği tamamen sırlayıp olgunlaştırdığını kanıtlar. Balınız ekşimeden yıllarca saklanabilir.`;
      } else if (value <= 20) {
        badgeText = "Normal Kıvam ve Nem";
        badgeStyle = "bg-green-500/10 text-green-400 border border-green-500/20";
        explanationText = `Nem oranı %${value}'dir. Yasal ve doğal standartlar içindedir. Normal akışkanlıkta taze çiçek balı kıvamına sahiptir.`;
      } else {
        badgeText = "Yüksek Nem (Ekşime Riski)";
        badgeStyle = "bg-red-500/10 text-red-400 border border-red-500/20";
        explanationText = "Su oranı yüksek olduğu için fermantasyon (ekşime) riski taşır, kısa sürede tüketilmelidir.";
      }
    } else if (label.includes("Diastaz")) {
      if (value >= 12) {
        badgeText = "Canlı Enzim - Sıfır Isıl İşlem (Çiğ Bal)";
        badgeStyle = "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
        explanationText = `Diastaz sayısı ${value}'dir. Bal ısıtılmadığı (çiğ/raw) için arının salgıladığı canlı ve faydalı sindirim/bağışıklık enzimleri tamamen korunmuştur.`;
      } else if (value >= 8) {
        badgeText = "Doğal Taze Bal (Enzimler Aktif)";
        badgeStyle = "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20";
        explanationText = `Diastaz sayısı ${value}'dir. Doğal ve tazedir. Enzim aktivitesi standart limitlerin üzerindedir.`;
      } else {
        badgeText = "Enzim Kaybı (Isıtılmış / Eski Bal)";
        badgeStyle = "bg-red-500/10 text-red-400 border border-red-500/20";
        explanationText = "Isıtılmış veya uzun süre beklemiş bal olduğunu gösterir. Biyoaktif yararlı enzimleri büyük oranda yok olmuştur.";
      }
    }

    return (
      <div className="bg-[#111827]/40 border border-gray-800 p-6 rounded-3xl text-center flex flex-col items-center justify-between h-full group hover:border-gray-700/50 transition-all duration-300">
        <div className="w-full">
          <h4 className="text-xs uppercase tracking-wider font-bold text-gray-400 font-heading mb-1">{label}</h4>
          <p className="text-[10px] text-gray-500 font-body mb-3">{idealRange}</p>
          <div className="inline-block">
            <span className={`text-[8.5px] uppercase font-black px-2 py-0.5 rounded-full tracking-wider ${badgeStyle}`}>
              {badgeText}
            </span>
          </div>
        </div>
        
        {/* SVG Circular Progress */}
        <div className="relative w-32 h-32 my-4">
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Track */}
            <circle cx="64" cy="64" r={radius} className="stroke-[#1F2937]" strokeWidth="8" fill="transparent" />
            {/* Value fill */}
            <circle 
              cx="64" 
              cy="64" 
              r={radius} 
              className={`stroke-current ${colorClass} transition-all duration-1000 ease-out`} 
              strokeWidth="8" 
              fill="transparent" 
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-heading font-black text-white">{value}</span>
            <span className="text-[9px] text-gray-400 uppercase font-bold">{unit}</span>
          </div>
        </div>

        <div className="w-full space-y-2 pt-3 border-t border-gray-800/80 mb-4">
          <p className="text-[10.5px] text-gray-400 leading-relaxed font-body">{description}</p>
          {explanationText && (
            <p className="text-[10.5px] text-primary bg-primary/5 p-2 rounded-xl border border-primary/10 font-bold leading-relaxed">
              🔍 {explanationText}
            </p>
          )}
        </div>

        {/* Yatay Kalite Karşılaştırma Cetveli */}
        <div className="w-full mt-2 pt-3 border-t border-gray-800/60 text-left">
          <p className="text-[9px] uppercase font-bold text-gray-500 tracking-wider mb-2 font-heading">Kalite Skalası Cetveli</p>
          <div className="relative h-2 bg-gray-850 rounded-full overflow-visible mb-6">
            {/* Segment marks/background lines */}
            <div 
              className={`absolute top-0 bottom-0 left-0 rounded-full ${
                label.includes("Prolin") ? "bg-amber-500" : label.includes("Nem") ? "bg-blue-500" : "bg-green-500"
              }`}
              style={{ width: `${Math.min(100, (value / max) * 100)}%` }}
            ></div>
            
            {/* Interactive/pulse circle pointer */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white border-2 border-primary rounded-full shadow flex items-center justify-center -translate-x-1/2 z-10"
              style={{ left: `${Math.min(100, (value / max) * 100)}%` }}
            >
              <span className="w-1.5 h-1.5 bg-primary rounded-full animate-ping"></span>
            </div>

            {label.includes("Prolin") ? (
              <>
                <div className="absolute left-[18%] top-2.5 flex flex-col items-center -translate-x-1/2">
                  <div className="w-0.5 h-1 bg-gray-700 mb-0.5"></div>
                  <span className="text-[6.5px] text-gray-500 font-bold">180 (Limit)</span>
                </div>
                <div className="absolute left-[30%] top-2.5 flex flex-col items-center -translate-x-1/2">
                  <div className="w-0.5 h-1 bg-gray-700 mb-0.5"></div>
                  <span className="text-[6.5px] text-gray-400 font-bold">300 (Yayla)</span>
                </div>
                <div className="absolute left-[50%] top-2.5 flex flex-col items-center -translate-x-1/2">
                  <div className="w-0.5 h-1 bg-amber-500 mb-0.5"></div>
                  <span className="text-[6.5px] text-amber-500 font-black">500+ (Şifalı)</span>
                </div>
              </>
            ) : label.includes("Nem") ? (
              <>
                <div className="absolute left-[64%] top-2.5 flex flex-col items-center -translate-x-1/2">
                  <div className="w-0.5 h-1 bg-blue-500 mb-0.5"></div>
                  <span className="text-[6.5px] text-blue-400 font-black">%16 (Kusursuz)</span>
                </div>
                <div className="absolute left-[72%] top-2.5 flex flex-col items-center -translate-x-1/2">
                  <div className="w-0.5 h-1 bg-gray-700 mb-0.5"></div>
                  <span className="text-[6.5px] text-gray-400 font-bold">%18 (Yoğun)</span>
                </div>
                <div className="absolute left-[80%] top-2.5 flex flex-col items-center -translate-x-1/2">
                  <div className="w-0.5 h-1 bg-red-500 mb-0.5"></div>
                  <span className="text-[6.5px] text-red-500 font-bold">%20 (Limit)</span>
                </div>
              </>
            ) : (
              <>
                <div className="absolute left-[32%] top-2.5 flex flex-col items-center -translate-x-1/2">
                  <div className="w-0.5 h-1 bg-gray-700 mb-0.5"></div>
                  <span className="text-[6.5px] text-gray-500 font-bold">8 (Limit)</span>
                </div>
                <div className="absolute left-[48%] top-2.5 flex flex-col items-center -translate-x-1/2">
                  <div className="w-0.5 h-1 bg-gray-700 mb-0.5"></div>
                  <span className="text-[6.5px] text-gray-400 font-bold">12 (Çiğ Bal)</span>
                </div>
                <div className="absolute left-[60%] top-2.5 flex flex-col items-center -translate-x-1/2">
                  <div className="w-0.5 h-1 bg-emerald-500 mb-0.5"></div>
                  <span className="text-[6.5px] text-emerald-400 font-black">15+ (Aktif)</span>
                </div>
              </>
            )}
          </div>
          <div className="text-[7.5px] text-gray-500 italic mt-3.5 text-center">
            * Beyaz işaretçi, balınızın kalite skalasındaki konumunu gösterir.
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 py-16 px-4 md:px-8">
      {/* Page Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto border border-primary/20 mb-4 text-primary">
          <FlaskConical className="w-6 h-6 animate-pulse" />
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-black text-white uppercase tracking-tight">Bal Analiz Raporu Sorgulama</h1>
        <p className="text-xs text-gray-400 mt-2 max-w-xl mx-auto leading-relaxed">
          Kavanozunuzun arkasındaki Lot/Parti kodunu girerek, balınızın laboratuvar analiz sonuçlarını, prolin derecesini ve doğal saflık belgelerini sorgulayabilirsiniz.
        </p>
      </div>

      {/* Input Gate */}
      <div className="max-w-xl mx-auto mb-12">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <input 
              type="text" 
              value={batchNo} 
              onChange={e => setBatchNo(e.target.value.toUpperCase())}
              placeholder="Örn: KESTANE-2026-01" 
              className="w-full pl-10 pr-4 py-3.5 bg-[#111827]/60 border border-gray-800 rounded-2xl focus:border-primary outline-none text-white font-heading font-bold text-center placeholder-gray-600 transition-colors uppercase tracking-wider text-sm shadow-xl"
              required
            />
            <Search className="absolute left-3.5 top-4 w-4 h-4 text-gray-500" />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 bg-gradient-to-r from-primary to-amber-700 hover:from-amber-600 hover:to-amber-800 text-secondary font-heading font-black text-xs uppercase rounded-2xl transition-all shadow-lg shadow-primary/20 flex items-center gap-2 transform hover:scale-105"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sorgula'}
          </button>
        </form>

        {error && <p className="text-xs text-red-500 font-medium text-center mt-3">{error}</p>}

        {/* Demo suggestions */}
        {!analysis && !loading && (
          <div className="mt-6 p-4 bg-[#111827]/30 border border-gray-800/50 rounded-2xl text-center">
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-2">Denemek İçin Örnek Lot Kodları</p>
            <div className="flex justify-center gap-2 text-[10px] font-heading font-bold uppercase">
              <button onClick={() => { setBatchNo('KESTANE-2026-01'); fetchAnalysis('KESTANE-2026-01'); }} className="px-3 py-1.5 bg-[#1F2937]/50 hover:bg-gray-700 rounded-lg text-primary border border-gray-800 transition-colors">KESTANE-2026-01</button>
              <button onClick={() => { setBatchNo('YAYLA-2026-02'); fetchAnalysis('YAYLA-2026-02'); }} className="px-3 py-1.5 bg-[#1F2937]/50 hover:bg-gray-700 rounded-lg text-primary border border-gray-800 transition-colors">YAYLA-2026-02</button>
            </div>
          </div>
        )}
      </div>

      {/* Analysis Results Display */}
      {analysis && (
        <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
          {/* Analysis Info Card */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/40 border border-gray-800 p-6 rounded-3xl backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center border border-green-500/20 text-green-400">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <span className="text-[9px] bg-green-900/20 text-green-400 font-black uppercase px-2 py-0.5 rounded-full border border-green-500/20 tracking-wider">Sertifikalı Saf Bal</span>
                <h2 className="text-xl font-heading font-black text-white uppercase tracking-tight mt-1">{analysis.productName}</h2>
                <p className="text-xs text-gray-400 flex items-center mt-1">
                  <Calendar className="w-3.5 h-3.5 mr-1 text-primary" /> Analiz Tarihi: {new Date(analysis.analysisDate).toLocaleDateString('tr-TR')}
                </p>
              </div>
            </div>
            <div className="px-5 py-3 bg-gray-900/40 rounded-2xl border border-gray-800 flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Lot / Parti No</span>
              <span className="text-sm text-primary font-heading font-black tracking-widest">{analysis.batchNo}</span>
            </div>
          </div>

          {/* Gauges Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RadialGauge 
              value={analysis.proline} 
              max={1000} 
              label="Prolin Değeri" 
              unit="mg/kg" 
              idealRange="İdeal Değer: >300 mg/kg"
              description="Balın gerçekliğini belirleyen en önemli parametredir. Prolin, arıların balı olgunlaştırırken salgıladığı değerli bir amino asittir."
              colorClass="text-amber-500"
            />
            <RadialGauge 
              value={analysis.moisture} 
              max={25} 
              label="Nem Oranı" 
              unit="%" 
              idealRange="İdeal Değer: <%20"
              description="Balın içerdiği su miktarıdır. Düşük nem oranı (%17-18 civarı), balın bozulmadan (fermente olmadan) yıllarca saklanabilmesini sağlar."
              colorClass="text-blue-500"
            />
            <RadialGauge 
              value={analysis.diastase} 
              max={25} 
              label="Diastaz Sayısı" 
              unit="Gösterge" 
              idealRange="İdeal Değer: >8"
              description="Balın taze ve ısıtılmamış olduğunu gösteren enzim değeridir. Bal yüksek sıcaklığa maruz kaldığında bu enzim yok olur."
              colorClass="text-green-500"
            />
          </div>

          {/* 1. Duyusal Lezzet Kartı & Akıllı Apiterapi Sağlık Kürleri Sihirbazı */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Sommelier Tasting Card */}
            {(() => {
              const notes = getTastingNotes(analysis.productName);
              return (
                <div className="bg-[#111827]/40 border border-gray-800 p-6 rounded-3xl backdrop-blur-xl flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] bg-primary/10 text-primary font-black uppercase px-2 py-0.5 rounded-full border border-primary/20 tracking-wider mb-3 inline-block">
                      Duyusal Profil
                    </span>
                    <h3 className="text-lg font-heading font-black text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-primary" /> Sommelier Tadım Profili
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed font-body mb-6">
                      {notes.description}
                    </p>

                    {/* Tasting Metrics */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <div className="flex justify-between text-xs font-heading font-bold text-gray-400 mb-1">
                          <span>Boğaz Vurumu (Yakıcılık)</span>
                          <span className="text-primary">{notes.bogaz}/10</span>
                        </div>
                        <div className="h-1.5 bg-gray-850 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${notes.bogaz * 10}%` }}></div>
                        </div>
                        <span className="text-[9px] text-gray-500 italic mt-0.5 block">{notes.bogazDesc}</span>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-heading font-bold text-gray-400 mb-1">
                          <span>Aroma Karakteri & Kalıcılık</span>
                          <span className="text-primary">{notes.aroma}/10</span>
                        </div>
                        <div className="h-1.5 bg-gray-850 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${notes.aroma * 10}%` }}></div>
                        </div>
                        <span className="text-[9px] text-gray-500 italic mt-0.5 block">{notes.aromaDesc}</span>
                      </div>

                      <div>
                        <div className="flex justify-between text-xs font-heading font-bold text-gray-400 mb-1">
                          <span>Kıvam & Ağız Hissi</span>
                          <span className="text-primary">{notes.kivam}/10</span>
                        </div>
                        <div className="h-1.5 bg-gray-850 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: `${notes.kivam * 10}%` }}></div>
                        </div>
                        <span className="text-[9px] text-gray-500 italic mt-0.5 block">{notes.kivamDesc}</span>
                      </div>
                    </div>
                  </div>

                  {/* Flavor Tags */}
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-800/60">
                    {notes.tags.map((tag, idx) => (
                      <span key={idx} className="text-[9.5px] font-heading font-bold bg-[#1F2937]/50 text-gray-400 border border-gray-850 px-2.5 py-1 rounded-xl">
                        🍃 {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })()}

            {/* Smart Apitherapy Cures Wizard */}
            <div className="bg-[#111827]/40 border border-gray-800 p-6 rounded-3xl backdrop-blur-xl flex flex-col justify-between">
              <div>
                <span className="text-[9px] bg-green-500/10 text-green-400 font-black uppercase px-2 py-0.5 rounded-full border border-green-500/20 tracking-wider mb-3 inline-block">
                  Apiterapi Sihirbazı
                </span>
                <h3 className="text-lg font-heading font-black text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                  <BookOpen className="w-5 h-5 text-primary" /> Akıllı Kürler ve Doğal Reçeteler
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-body mb-4">
                  Balınızın laboratuvar analiz değerleri (özellikle prolin amino asiti) dikkate alınarak hazırlanmış sağlıklı apiterapik tarifler:
                </p>

                {/* Tabs */}
                <div className="flex bg-black/30 p-1 rounded-xl border border-gray-800 mb-4 text-xs font-heading font-bold">
                  <button 
                    onClick={() => setActiveCureTab('immun')}
                    className={`flex-1 py-2 text-center rounded-lg transition-all ${activeCureTab === 'immun' ? 'bg-primary text-secondary' : 'text-gray-400 hover:text-white'}`}
                  >
                    Bağışıklık Kürü
                  </button>
                  <button 
                    onClick={() => setActiveCureTab('cough')}
                    className={`flex-1 py-2 text-center rounded-lg transition-all ${activeCureTab === 'cough' ? 'bg-primary text-secondary' : 'text-gray-400 hover:text-white'}`}
                  >
                    Boğaz Yumuşatıcı
                  </button>
                  <button 
                    onClick={() => setActiveCureTab('stomach')}
                    className={`flex-1 py-2 text-center rounded-lg transition-all ${activeCureTab === 'stomach' ? 'bg-primary text-secondary' : 'text-gray-400 hover:text-white'}`}
                  >
                    Mide Dostu
                  </button>
                </div>

                {/* Tab content */}
                <div className="bg-black/25 border border-gray-900 rounded-2xl p-4 min-h-[140px] flex flex-col justify-between">
                  {activeCureTab === 'immun' && (
                    <div className="space-y-2">
                      <h4 className="text-xs uppercase font-black tracking-wider text-white">🛡️ Hücresel Bağışıklık Kalkanı</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        <strong className="text-primary font-bold">Formül:</strong> 1 Tatlı Kaşığı Bal + 1 Çay Kaşığı Taze Toz Zencefil + 3 damla sıvı propolis. Karıştırıp sabahları aç karna tüketin.
                      </p>
                      <p className="text-[10px] text-primary/80 font-bold bg-primary/5 border border-primary/10 p-1.5 rounded-lg">
                        💡 Bu bal {analysis.proline} mg/kg prolin içerir. Yüksek amino asit oranı bağışıklık korumasını en üst seviyeye taşır.
                      </p>
                    </div>
                  )}
                  {activeCureTab === 'cough' && (
                    <div className="space-y-2">
                      <h4 className="text-xs uppercase font-black tracking-wider text-white">🍯 Tahriş Giderici & Boğaz Yumuşatma</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        <strong className="text-primary font-bold">Formül:</strong> 1 Yemek Kaşığı Bal + Yarım Limon Suyu + Ilık (en fazla 40°C) Adaçayı veya ıhlamur. Ilık içilmelidir.
                      </p>
                      <p className="text-[10px] text-green-400/80 font-bold bg-green-950/20 border border-green-500/10 p-1.5 rounded-lg">
                        💡 Balın çiğ ve taze yapısındaki diastaz enzimleri (Seviye: {analysis.diastase}) boğazda antiseptik bariyer oluşturur.
                      </p>
                    </div>
                  )}
                  {activeCureTab === 'stomach' && (
                    <div className="space-y-2">
                      <h4 className="text-xs uppercase font-black tracking-wider text-white">🌱 Mide Doku & Sindirim Desteği</h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">
                        <strong className="text-primary font-bold">Formül:</strong> 1 Tatlı Kaşığı Bal + 1 Bardak Ilık İçme Suyu. Sabahları uyanınca ilk iş olarak için.
                      </p>
                      <p className="text-[10px] text-blue-400/80 font-bold bg-blue-950/20 border border-blue-500/10 p-1.5 rounded-lg">
                        💡 Düşük nem oranı (%{analysis.moisture}) balın doğallığını ve mikrobiyolojik kalitesini mide asidine karşı kararlı kılar.
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="text-[9px] text-gray-500 italic mt-3 text-center">
                * Bu bilgiler geleneksel apiterapi pratiklerine dayanır. Tıbbi ilaç yerine geçmez.
              </div>
            </div>
          </div>

          {/* 2. Certificate Image Display & Digital Certification Download Widget */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#111827]/40 border border-gray-800 p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-heading font-black text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                  <FileText className="w-4 h-4 text-primary" /> Laboratuvar Uzman Görüşü & Güvenlik Raporu
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed font-body whitespace-pre-line bg-black/25 p-4 rounded-xl border border-gray-900">
                  {analysis.notes || "Bu bal örneği akredite gıda analiz laboratuvarlarında incelenmiştir. İçeriğinde tarım ilacı kalıntısı, glikoz veya nişasta bazlı harici şurup bulunmamaktadır. Türk Gıda Kodeksi Bal Tebliği standartlarına %100 uygundur."}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-green-400 uppercase font-black tracking-widest mt-4">
                  <Award className="w-4 h-4" /> Güvenli Üretim, Doğal Hasat, Doğrudan Sofranıza
                </div>
              </div>

              {/* Certificate download / share sub-widget */}
              <div className="mt-6 pt-6 border-t border-gray-800/80">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/20 p-4 rounded-2xl border border-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-amber-500/10 rounded-xl flex items-center justify-center border border-amber-500/20 text-primary">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-heading font-black text-white uppercase">Dijital Saflık Sertifikası</h4>
                      <p className="text-[10px] text-gray-400">Gıda analizi verilerini resmi olarak imzalayıp paylaşın.</p>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <button 
                      onClick={handleDownloadCert}
                      disabled={isGeneratingCert}
                      className="flex-1 sm:flex-none px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white font-heading font-bold text-[10.5px] uppercase rounded-xl border border-gray-700 transition-all flex items-center justify-center gap-1.5"
                    >
                      {isGeneratingCert ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" /> Hazırlanıyor...
                        </>
                      ) : (
                        <>
                          <Download className="w-3.5 h-3.5" /> İndir (PDF)
                        </>
                      )}
                    </button>
                    <button 
                      onClick={() => {
                        const url = `https://api.whatsapp.com/send?text=Benim%20Arı%20Hayat%20Balımın%20Prolin%20Değeri%20${analysis.proline}!%20Analiz%20raporunu%20sorgulamak%20için%20barkod%20kodu:%20${analysis.batchNo}`;
                        window.open(url, '_blank');
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 text-white font-heading font-bold text-[10.5px] uppercase rounded-xl transition-all flex items-center justify-center gap-1.5"
                    >
                      <Share2 className="w-3.5 h-3.5" /> Paylaş
                    </button>
                  </div>
                </div>
                {certShareMessage && (
                  <p className="text-[10px] text-green-400 text-center mt-2 font-bold bg-green-950/20 border border-green-500/10 p-1.5 rounded-lg">
                    ✅ {certShareMessage}
                  </p>
                )}
              </div>
            </div>

            <div className="lg:col-span-1 bg-[#111827]/40 border border-gray-800 p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-heading font-black text-white uppercase tracking-wider flex items-center gap-2 mb-3">
                  <FlaskConical className="w-4 h-4 text-primary" /> Resmi Analiz Belgesi
                </h3>
                <p className="text-[11px] text-gray-400 font-body mb-4">Laboratuvardan onaylı resmi rapor belgesi taranmış kopyası.</p>
                <div className="aspect-[3/4] w-full bg-black rounded-xl border border-gray-800 overflow-hidden relative group cursor-zoom-in">
                  {analysis.reportImageUrl ? (
                    <img 
                      src={analysis.reportImageUrl} 
                      alt="Laboratuvar Analiz Belgesi" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-600">
                      <FileText className="w-10 h-10 mb-2" />
                      <span className="text-[10px] uppercase font-bold tracking-wider font-heading">Resmi Rapor Bulunmamaktadır</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Sahte Bal vs. Laboratuvar Gerçeği */}
          <div className="bg-[#111827]/40 border border-gray-800 p-8 rounded-3xl backdrop-blur-xl">
            <div className="text-center mb-8">
              <span className="text-[9px] bg-amber-500/10 text-primary font-black uppercase px-3 py-1 rounded-full border border-amber-500/20 tracking-wider">Doğru Bilinen Yanlışlar</span>
              <h3 className="text-2xl font-heading font-black text-white uppercase tracking-tight mt-2">Sahte Bal vs. Laboratuvar Gerçeği</h3>
              <p className="text-xs text-gray-400 mt-2 max-w-xl mx-auto leading-relaxed">
                Kulaktan kulağa yayılan batıl test yöntemleri gıda saflığını belirleyemez. Bilimin ve laboratuvar analizlerinin ardındaki gerçekleri inceleyin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  title: "Kibrit / Ateş Testi",
                  myth: "Sahte bal yanmaz, hakiki bal yanar.",
                  truth: "Gıda Güvenliği Testi Değil!",
                  explanation: "Balın yanabilirliği sadece nem (su) oranına ve kimyasal bileşimine bağlı fiziksel bir reaksiyondur. Laboratuvarlarda asla kibrit yakılmaz. Tek kesin kanıt prolin seviyesidir.",
                  icon: <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                },
                {
                  id: 2,
                  title: "Su Çözünme Testi",
                  myth: "Hakiki bal suda hemen erimez, dipte süzülür.",
                  truth: "Yanıltıcı Fiziksel Durum!",
                  explanation: "Bu durum tamamen balın yoğunluğu (nem oranı) ve viskozitesi ile ilgilidir. Yüksek yoğunluklu glikoz şurupları da suda yavaş erir. Saflığı kanıtlamaz.",
                  icon: <Droplets className="w-5 h-5 text-blue-500" />
                },
                {
                  id: 3,
                  title: "Donma / Kristalleşme",
                  myth: "Gerçek bal asla donmaz/kristalleşmez, donarsa şekerlidir.",
                  truth: "Büyük Bir Hata!",
                  explanation: "Tam aksine, çiğ ve filtre edilmemiş gerçek ballar soğuk havada doğal olarak kristalleşir. Donmayan ballar genellikle aşırı yüksek ısıya maruz kalmıştır.",
                  icon: <Wind className="w-5 h-5 text-emerald-400" />
                }
              ].map((item) => {
                const isOpen = activeMyth === item.id;
                return (
                  <div 
                    key={item.id}
                    onClick={() => setActiveMyth(isOpen ? null : item.id)}
                    className="cursor-pointer bg-black/30 border border-gray-800/80 p-6 rounded-2xl hover:border-primary/45 transition-all duration-300 flex flex-col justify-between min-h-[170px] group relative overflow-hidden"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-2 bg-gray-900 rounded-xl border border-gray-800 group-hover:border-primary/20">
                        {item.icon}
                      </div>
                      <span className="text-[10px] text-gray-500 font-bold uppercase font-heading">Tıkla & Oku</span>
                    </div>

                    <div className="space-y-1 z-10">
                      <h4 className="text-sm font-heading font-black text-white uppercase tracking-wider">{item.title}</h4>
                      <p className="text-[11px] text-red-400/80 italic font-body">“{item.myth}”</p>
                    </div>

                    <div className={`mt-4 pt-4 border-t border-gray-950 transition-all duration-300 ${isOpen ? 'max-h-[250px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                      <span className="text-[9px] bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full font-black border border-red-500/20 mr-2">{item.truth}</span>
                      <p className="text-[11px] text-gray-300 leading-relaxed font-body mt-2">
                        {item.explanation}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
