"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Edit, FileText, FlaskConical, Award, 
  Calendar, Eye, BarChart3, Loader2, Sparkles
} from 'lucide-react';
import { useAdminToast } from '@/context/AdminToastContext';

export default function AdminAnalysesPage() {
  const [analyses, setAnalyses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    id: '',
    batchNo: '',
    productName: '',
    proline: 850,
    moisture: 17.2,
    diastase: 12.5,
    analysisDate: '',
    reportImageUrl: '',
    notes: ''
  });

  const { showToast } = useAdminToast();

  useEffect(() => {
    fetchAnalyses();
  }, []);

  const fetchAnalyses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/analyses');
      if (res.ok) {
        const data = await res.json();
        setAnalyses(data);
      }
    } catch (e) {
      showToast('Analiz raporları yüklenirken hata oluştu.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.batchNo || !formData.productName) {
      showToast('Parti Numarası ve Ürün Adı zorunludur.', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/analyses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        showToast(formData.id ? 'Analiz raporu güncellendi' : 'Analiz raporu eklendi', 'success');
        setIsAdding(false);
        setFormData({
          id: '',
          batchNo: '',
          productName: '',
          proline: 850,
          moisture: 17.2,
          diastase: 12.5,
          analysisDate: '',
          reportImageUrl: '',
          notes: ''
        });
        fetchAnalyses();
      } else {
        showToast('Rapor kaydedilemedi. Parti Numarası benzersiz olmalıdır.', 'error');
      }
    } catch (error) {
      showToast('Bir hata oluştu.', 'error');
    }
  };

  const handleEdit = (an: any) => {
    setFormData({
      id: an.id,
      batchNo: an.batchNo || '',
      productName: an.productName || '',
      proline: an.proline || 850,
      moisture: an.moisture || 17.2,
      diastase: an.diastase || 12.5,
      analysisDate: an.analysisDate ? an.analysisDate.split('T')[0] : '',
      reportImageUrl: an.reportImageUrl || '',
      notes: an.notes || ''
    });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Bu analiz raporunu silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`/api/admin/analyses?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Analiz raporu silindi', 'success');
        fetchAnalyses();
      } else {
        showToast('Silme başarısız', 'error');
      }
    } catch (e) {
      showToast('Silme başarısız', 'error');
    }
  };

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100 font-body">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 uppercase tracking-tight">Bal Analiz Raporları</h1>
          <p className="text-xs text-gray-400 font-body mt-1">Laboratuvardan gelen bal saflık ve prolin analiz sonuçlarını girin.</p>
        </div>
        
        {!isAdding && (
          <button 
            onClick={() => {
              setFormData({ id: '', batchNo: '', productName: '', proline: 850, moisture: 17.2, diastase: 12.5, analysisDate: '', reportImageUrl: '', notes: '' });
              setIsAdding(true);
            }}
            className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-4 py-2 rounded-xl font-heading font-bold text-xs uppercase flex items-center transition-all shadow-lg"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Yeni Analiz Ekle
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 mb-8 shadow-xl">
          <h2 className="text-sm font-heading font-black text-white uppercase tracking-wider mb-6 flex items-center gap-1.5">
            <FlaskConical className="w-5 h-5 text-primary" /> {formData.id ? 'Analiz Bilgilerini Düzenle' : 'Yeni Bal Analiz Raporu Ekle'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 mb-1 text-xs uppercase font-bold">Parti No / QR Kodu (Benzersiz)</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: KESTANE-2026-01"
                  value={formData.batchNo}
                  disabled={!!formData.id}
                  onChange={e => setFormData({...formData, batchNo: e.target.value})}
                  className="w-full p-3 bg-[#1F2937]/50 border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-primary disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-xs uppercase font-bold">Ürün Adı</label>
                <input
                  type="text"
                  required
                  placeholder="Örn: Hakiki Kestane Balı"
                  value={formData.productName}
                  onChange={e => setFormData({...formData, productName: e.target.value})}
                  className="w-full p-3 bg-[#1F2937]/50 border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-xs uppercase font-bold">Analiz Tarihi</label>
                <input
                  type="date"
                  value={formData.analysisDate}
                  onChange={e => setFormData({...formData, analysisDate: e.target.value})}
                  className="w-full p-3 bg-[#1F2937]/50 border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 mb-1 text-xs uppercase font-bold">Prolin Değeri (mg/kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={formData.proline}
                  onChange={e => setFormData({...formData, proline: parseFloat(e.target.value) || 0})}
                  className="w-full p-3 bg-[#1F2937]/50 border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-xs uppercase font-bold">Nem Oranı (%)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={formData.moisture}
                  onChange={e => setFormData({...formData, moisture: parseFloat(e.target.value) || 0})}
                  className="w-full p-3 bg-[#1F2937]/50 border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-xs uppercase font-bold">Diastaz Sayısı</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={formData.diastase}
                  onChange={e => setFormData({...formData, diastase: parseFloat(e.target.value) || 0})}
                  className="w-full p-3 bg-[#1F2937]/50 border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-gray-400 mb-1 text-xs uppercase font-bold">Laboratuvar Belgesi Resim URL</label>
                <input
                  type="text"
                  placeholder="Analiz belgesi görsel linki"
                  value={formData.reportImageUrl}
                  onChange={e => setFormData({...formData, reportImageUrl: e.target.value})}
                  className="w-full p-3 bg-[#1F2937]/50 border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-xs uppercase font-bold">Lab Notları & Yorumlar</label>
                <textarea
                  placeholder="Balın kalitesi ve laboratuvar sonuçları hakkında notlar girin..."
                  value={formData.notes}
                  onChange={e => setFormData({...formData, notes: e.target.value})}
                  className="w-full p-3 bg-[#1F2937]/50 border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-primary min-h-[80px]"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg font-bold text-xs uppercase transition-colors"
              >
                İptal
              </button>
              <button
                type="submit"
                className="bg-primary hover:bg-amber-600 text-secondary px-4 py-2 rounded-lg font-heading font-black text-xs uppercase transition-all"
              >
                {formData.id ? 'Güncelle' : 'Kaydet'}
              </button>
            </div>
          </form>
        </div>
      )}

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
                  <th className="p-4">Parti Kodu</th>
                  <th className="p-4">Ürün Adı</th>
                  <th className="p-4 text-center">Prolin (mg/kg)</th>
                  <th className="p-4 text-center">Nem Oranı</th>
                  <th className="p-4 text-center">Diastaz Sayısı</th>
                  <th className="p-4">Analiz Tarihi</th>
                  <th className="p-4 text-right">İşlemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {analyses.map(an => (
                  <tr key={an.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 font-heading font-bold text-primary tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5" /> {an.batchNo}
                      </span>
                    </td>
                    <td className="p-4 font-heading font-bold text-white uppercase">{an.productName}</td>
                    <td className="p-4 text-center font-bold text-amber-400">
                      {an.proline} mg/kg
                    </td>
                    <td className="p-4 text-center text-blue-400 font-bold">
                      %{an.moisture}
                    </td>
                    <td className="p-4 text-center text-green-400 font-bold">
                      {an.diastase}
                    </td>
                    <td className="p-4 text-gray-400 font-body">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-primary shrink-0" />
                        {an.analysisDate ? new Date(an.analysisDate).toLocaleDateString('tr-TR') : '-'}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end space-x-2">
                        {an.reportImageUrl && (
                          <a 
                            href={an.reportImageUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="p-1.5 text-gray-400 hover:text-white transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        )}
                        <button
                          onClick={() => handleEdit(an)}
                          className="p-1.5 text-gray-400 hover:text-white transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(an.id)}
                          className="p-1.5 text-red-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {analyses.length === 0 && (
                  <tr>
                    <td colSpan={7} className="text-center py-20 text-gray-500 font-heading font-bold uppercase">
                      Kayıtlı analiz raporu bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
