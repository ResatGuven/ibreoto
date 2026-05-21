"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Search, ShieldCheck, HelpCircle, FileText, ChevronRight, 
  Award, FlaskConical, Calendar, ArrowRight, Loader2
} from 'lucide-react';

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

  // Helper component to render SVG Radial Gauge
  const RadialGauge = ({ value, max, label, unit, idealRange, description, colorClass = "text-primary" }: any) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (Math.min(value, max) / max) * circumference;

    return (
      <div className="bg-[#111827]/40 border border-gray-800 p-6 rounded-3xl text-center flex flex-col items-center justify-between h-full group hover:border-gray-700/50 transition-all duration-300">
        <div className="w-full">
          <h4 className="text-xs uppercase tracking-wider font-bold text-gray-400 font-heading mb-1">{label}</h4>
          <p className="text-[10px] text-gray-500 font-body mb-4">{idealRange}</p>
        </div>
        
        {/* SVG Circular Progress */}
        <div className="relative w-32 h-32 mb-4">
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

        <p className="text-xs text-gray-400 leading-relaxed font-body pt-2 border-t border-gray-800/80 w-full">{description}</p>
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

          {/* Laboratory Certificate Image Upload / Display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-[#111827]/40 border border-gray-800 p-6 rounded-3xl">
              <h3 className="text-sm font-heading font-black text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-primary" /> Laboratuvar Uzman Görüşü & Notlar
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed font-body whitespace-pre-line bg-black/25 p-4 rounded-xl border border-gray-900">
                {analysis.notes || "Bu bal örneği akredite gıda analiz laboratuvarlarında incelenmiştir. İçeriğinde tarım ilacı kalıntısı, glikoz veya nişasta bazlı harici şurup bulunmamaktadır. Türk Gıda Kodeksi Bal Tebliği standartlarına %100 uygundur."}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-green-400 uppercase font-black tracking-widest mt-4">
                <Award className="w-4 h-4" /> Güvenli Üretim, Doğal Hasat, Doğrudan Sofranıza
              </div>
            </div>

            <div className="lg:col-span-1 bg-[#111827]/40 border border-gray-800 p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-heading font-black text-white uppercase tracking-wider flex items-center gap-2 mb-3">
                  <FlaskConical className="w-4 h-4 text-primary" /> Analiz Rapor Belgesi
                </h3>
                <p className="text-[11px] text-gray-400 font-body mb-4">Laboratuvardan onaylı imzalı test raporu belgesi görseli.</p>
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
                      <span className="text-[10px] uppercase font-bold tracking-wider">Resmi Rapor Görseli</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
