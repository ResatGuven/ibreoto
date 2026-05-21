"use client";

import React, { useState, useEffect } from 'react';
import { 
  Star, Trash2, Share2, Sparkles, Download, 
  X, Loader2, Quote, CheckCircle, RefreshCw 
} from 'lucide-react';
import { useAdminToast } from '@/context/AdminToastContext';

export default function AdminYorumlarPage() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [cardTheme, setCardTheme] = useState<'gold-dark' | 'amber-light'>('gold-dark');
  const [generatingCard, setGeneratingCard] = useState(false);
  const [cardImage, setCardImage] = useState<string | null>(null);

  const { showToast } = useAdminToast();

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reviews');
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setReviews(data.reviews);
        }
      }
    } catch (e) {
      showToast('Yorumlar yüklenirken hata oluştu.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu yorumu silmek istediğinize emin misiniz?")) return;
    try {
      const res = await fetch(`/api/reviews?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Yorum silindi', 'success');
        setReviews(prev => prev.filter(r => r.id !== id));
      } else {
        showToast('Yorum silinemedi', 'error');
      }
    } catch (error) {
      showToast('İşlem başarısız', 'error');
    }
  };

  // HTML5 Canvas card renderer
  const generateSocialCard = (review: any, theme: 'gold-dark' | 'amber-light') => {
    setGeneratingCard(true);
    
    // Create canvas (1080x1080 Instagram post size)
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw Background
    if (theme === 'gold-dark') {
      const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1080);
      bgGrad.addColorStop(0, '#0F172A'); // Dark slate
      bgGrad.addColorStop(1, '#020617'); // Pitch black
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1080);

      // Draw Gold Accent Rings
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.1)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(1080, 0, 400, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 1080, 300, 0, Math.PI * 2);
      ctx.stroke();

      // Outer Gold Frame border
      ctx.strokeStyle = 'rgba(217, 119, 6, 0.3)';
      ctx.lineWidth = 16;
      ctx.strokeRect(40, 40, 1000, 1000);
    } else {
      // Light Amber theme
      const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1080);
      bgGrad.addColorStop(0, '#FFFBEB'); // Warm white
      bgGrad.addColorStop(1, '#FEF3C7'); // Light amber
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1080);

      // Outer Border
      ctx.strokeStyle = 'rgba(180, 83, 9, 0.3)';
      ctx.lineWidth = 16;
      ctx.strokeRect(40, 40, 1000, 1000);
    }

    // Draw Quote Icon
    ctx.fillStyle = theme === 'gold-dark' ? 'rgba(217, 119, 6, 0.25)' : 'rgba(180, 83, 9, 0.15)';
    ctx.font = 'black 140px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.fillText('“', 540, 240);

    // Draw Star Ratings
    const rating = review.rating || 5;
    const starSpacing = 40;
    const startX = 540 - ((rating - 1) * starSpacing) / 2;
    ctx.fillStyle = '#F59E0B'; // Amber star color
    ctx.font = '36px sans-serif';
    ctx.textAlign = 'center';
    for (let i = 0; i < rating; i++) {
      ctx.fillText('★', startX + i * starSpacing, 320);
    }

    // Draw Review Comment (with Word Wrap)
    ctx.fillStyle = theme === 'gold-dark' ? '#E2E8F0' : '#1E293B';
    ctx.font = 'italic 34px Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const words = (review.comment || 'Harika bir lezzet!').split(' ');
    let line = '';
    const lines = [];
    const maxTextWidth = 780;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxTextWidth && n > 0) {
        lines.push(line.trim());
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());

    // Limit lines count to prevent overflow
    const visibleLines = lines.slice(0, 8);
    const lineHeight = 54;
    const startY = 520 - (visibleLines.length * lineHeight) / 2;

    visibleLines.forEach((l, idx) => {
      ctx.fillText(l, 540, startY + idx * lineHeight);
    });

    // Draw Divider Line
    ctx.strokeStyle = theme === 'gold-dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(440, 740);
    ctx.lineTo(640, 740);
    ctx.stroke();

    // Draw Customer Name
    ctx.fillStyle = theme === 'gold-dark' ? '#F8FAFC' : '#0F172A';
    ctx.font = 'bold 30px "Outfit", sans-serif';
    ctx.fillText(review.user?.name || review.name || 'Müşteri', 540, 800);

    // Draw Product Name
    ctx.fillStyle = '#D97706'; // Gold/Amber
    ctx.font = 'bold 22px "Outfit", sans-serif';
    ctx.fillText((review.product?.name || review.productId || 'Doğal Arı Ürünü').toUpperCase(), 540, 845);

    // Draw Logo Watermark at Bottom
    ctx.fillStyle = theme === 'gold-dark' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.4)';
    ctx.font = '900 20px "Outfit", sans-serif';
    ctx.fillText('ARI HAYAT', 540, 960);
    ctx.font = '14px "Outfit", sans-serif';
    ctx.fillText('doğal şifa kaynağı', 540, 985);

    // Generate output image URL
    try {
      const url = canvas.toDataURL('image/png');
      setCardImage(url);
    } catch (e) {
      showToast('Görsel oluşturulurken bir hata oluştu.', 'error');
    } finally {
      setGeneratingCard(false);
    }
  };

  const handleOpenCardGenerator = (rev: any) => {
    setSelectedReview(rev);
    setCardImage(null);
    // Generate initial card
    setTimeout(() => generateSocialCard(rev, cardTheme), 100);
  };

  const handleThemeChange = (newTheme: 'gold-dark' | 'amber-light') => {
    setCardTheme(newTheme);
    if (selectedReview) {
      generateSocialCard(selectedReview, newTheme);
    }
  };

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100 font-body">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 uppercase tracking-tight">Ürün Yorumları</h1>
          <p className="text-xs text-gray-400 font-body mt-1">Müşterilerden gelen ürün değerlendirmelerini görüntüleyin, yönetin ve sosyal paylaşım kartları üretin.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="bg-[#111827]/40 border border-gray-800/80 rounded-2xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-[10px] uppercase font-heading font-black text-gray-500 bg-black/10">
                  <th className="p-4">Tarih</th>
                  <th className="p-4">Müşteri</th>
                  <th className="p-4">Ürün</th>
                  <th className="p-4">Yorum</th>
                  <th className="p-4 text-center">Puan</th>
                  <th className="p-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {reviews.map((rev) => (
                  <tr key={rev.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-gray-400 font-body">
                      {new Date(rev.createdAt || Date.now()).toLocaleDateString('tr-TR')}
                    </td>
                    <td className="p-4">
                      <div className="font-heading font-bold text-white uppercase">{rev.user?.name || rev.name || 'Müşteri'}</div>
                      <div className="text-[10px] text-gray-500 font-body mt-0.5">{rev.user?.email}</div>
                    </td>
                    <td className="p-4 font-body">
                      {rev.product ? (
                        <div>
                          <span className="font-bold text-white uppercase">{rev.product.name}</span>
                          <span className="text-[9px] text-amber-600 block">{rev.product.slug}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500 italic uppercase">Bilinmeyen Ürün ({rev.productId})</span>
                      )}
                    </td>
                    <td className="p-4 text-gray-300 font-body max-w-xs truncate" title={rev.comment}>
                      {rev.comment || <span className="text-gray-600 italic">Yorum yazılmamış...</span>}
                    </td>
                    <td className="p-4">
                      <div className="flex justify-center items-center gap-0.5">
                        <span className="font-heading font-black text-amber-500 mr-1">{rev.rating}</span>
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star 
                            key={idx} 
                            className={`w-3.5 h-3.5 ${
                              idx < rev.rating 
                                ? 'text-amber-500 fill-amber-500' 
                                : 'text-gray-700'
                            }`} 
                          />
                        ))}
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end items-center space-x-2">
                        {rev.comment && (
                          <button
                            onClick={() => handleOpenCardGenerator(rev)}
                            className="bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 px-3 py-1.5 rounded-lg font-heading font-bold text-[10px] uppercase flex items-center gap-1 transition-all"
                            title="Sosyal Medya Paylaşım Kartı Üret"
                          >
                            <Share2 className="w-3 h-3" /> Kart Üret
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(rev.id)} 
                          className="p-1.5 text-red-500 hover:text-red-400 transition-colors" 
                          title="Yorumu Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {reviews.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center py-20 text-gray-500 font-heading font-bold uppercase">
                      Henüz hiç ürün yorumu bulunmuyor.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CARD GENERATOR MODAL */}
      {selectedReview && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-4xl bg-[#111827] border border-gray-800 rounded-3xl p-6 md:p-8 relative shadow-2xl flex flex-col md:flex-row gap-8">
            
            <button 
              onClick={() => setSelectedReview(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white p-2"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Visual Preview */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <span className="text-[10px] font-heading font-black text-gray-400 uppercase tracking-widest">Görsel Kart Önizleme (1080x1080)</span>
              
              <div className="border border-gray-800 rounded-2xl overflow-hidden shadow-xl bg-slate-900 w-full max-w-[360px] aspect-square flex items-center justify-center relative">
                {generatingCard ? (
                  <div className="text-center space-y-2 text-xs text-gray-500">
                    <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />
                    <span>Kart çiziliyor...</span>
                  </div>
                ) : cardImage ? (
                  <img src={cardImage} alt="Social review card" className="w-full h-full object-cover" />
                ) : null}
              </div>
            </div>

            {/* Right Column: Settings & Download */}
            <div className="w-full md:w-96 flex flex-col justify-between space-y-6 pt-4 md:pt-0">
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-heading font-black text-white uppercase tracking-tight flex items-center gap-1.5">
                    <Sparkles className="w-5 h-5 text-primary animate-pulse" /> Sosyal Medya Kart Sihirbazı
                  </h3>
                  <p className="text-[11px] text-gray-400 font-body leading-relaxed mt-1">
                    Bu yorumu Instagram, Facebook veya Twitter hesabınızda hakiki apiterapi kalitesini sergilemek için göz alıcı bir tasarımla indirin.
                  </p>
                </div>

                {/* Theme Selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-heading font-black text-gray-400 uppercase tracking-widest block">Kart Tema Şablonu</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleThemeChange('gold-dark')}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                        cardTheme === 'gold-dark'
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'bg-[#1F2937]/50 border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      Premium Altın (Koyu)
                    </button>
                    <button
                      onClick={() => handleThemeChange('amber-light')}
                      className={`p-3 rounded-xl border text-xs font-bold text-center transition-all ${
                        cardTheme === 'amber-light'
                          ? 'bg-amber-600/10 border-amber-600 text-amber-500'
                          : 'bg-[#1F2937]/50 border-gray-800 text-gray-400 hover:border-gray-700'
                      }`}
                    >
                      Kır Çiçeği (Açık)
                    </button>
                  </div>
                </div>

                {/* Review Details readout */}
                <div className="p-4 bg-black/20 rounded-2xl border border-gray-800 text-xs leading-relaxed space-y-2 font-body">
                  <div className="font-bold text-white flex items-center gap-1 text-[10px]">
                    <Quote className="w-3.5 h-3.5 text-primary" /> YORUM METNİ
                  </div>
                  <p className="text-gray-400 italic font-body line-clamp-3">
                    &ldquo;{selectedReview.comment}&rdquo;
                  </p>
                  <p className="text-right text-[10px] text-primary font-heading font-bold uppercase">
                    — {selectedReview.user?.name || selectedReview.name || 'Müşteri'}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                {cardImage && (
                  <a
                    href={cardImage}
                    download={`ari-hayat-yorum-${selectedReview.id}.png`}
                    className="w-full py-4 bg-gradient-to-r from-primary to-amber-700 hover:from-amber-600 hover:to-amber-800 text-secondary font-heading font-black text-xs uppercase rounded-xl transition-all shadow-lg flex items-center justify-center gap-1.5"
                  >
                    <Download className="w-4 h-4" /> Kart Görselini İndir (PNG)
                  </a>
                )}
                
                <button
                  onClick={() => setSelectedReview(null)}
                  className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl font-bold text-xs uppercase transition-colors"
                >
                  Kapat
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}
