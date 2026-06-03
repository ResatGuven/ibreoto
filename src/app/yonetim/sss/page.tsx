"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, HelpCircle, List } from 'lucide-react';
import { useAdminToast } from '@/context/AdminToastContext';

export default function AdminFaqPage() {
  const [faqs, setFaqs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ id: '', question: '', answer: '', category: 'Sipariş & Teslimat', order: 0, isActive: true });
  const { showToast } = useAdminToast();

  const categories = [
    'Sipariş & Teslimat',
    'Ürünler & Saklama',
    'Sağlık & Kullanım',
    'İade & Ödeme',
    'Genel'
  ];

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const res = await fetch('/api/admin/faqs');
      const data = await res.json();
      if (Array.isArray(data)) setFaqs(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) {
      showToast('Soru ve Cevap alanları zorunludur.', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/faqs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        showToast(formData.id ? 'Soru güncellendi' : 'Soru eklendi', 'success');
        fetchFaqs();
        setIsAdding(false);
        setFormData({ id: '', question: '', answer: '', category: 'Sipariş & Teslimat', order: 0, isActive: true });
      } else {
        showToast('Bir hata oluştu', 'error');
      }
    } catch (error) {
      showToast('Bir hata oluştu', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu soruyu silmek istediğinize emin misiniz?")) return;
    try {
      await fetch(`/api/admin/faqs?id=${id}`, { method: 'DELETE' });
      setFaqs(prev => prev.filter(s => s.id !== id));
      showToast('Soru silindi', 'success');
    } catch (error) {
      showToast('Silme başarısız', 'error');
    }
  };

  const handleEdit = (faq: any) => {
    setFormData({
      id: faq.id,
      question: faq.question || '',
      answer: faq.answer || '',
      category: faq.category || 'Genel',
      order: faq.order || 0,
      isActive: faq.isActive
    });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6 bg-background min-h-screen text-text-main font-body">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 uppercase tracking-tight">Sıkça Sorulan Sorular</h1>
        <button 
          onClick={() => {
            setFormData({ id: '', question: '', answer: '', category: 'Sipariş & Teslimat', order: 0, isActive: true });
            setIsAdding(true);
          }}
          className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-secondary px-4 py-2 rounded-xl font-heading font-bold text-sm uppercase flex items-center transition-all shadow-lg shadow-amber-500/20"
        >
          <Plus className="w-4 h-4 mr-2" /> Yeni Soru Ekle
        </button>
      </div>

      {isAdding && (
        <div className="bg-white border-gray-200 shadow-sm backdrop-blur-xl p-6 rounded-2xl border border-gray-200 mb-8 shadow-lg">
          <h2 className="text-lg font-heading font-bold text-secondary mb-6 uppercase flex items-center">
            <HelpCircle className="w-5 h-5 mr-2 text-amber-500" /> {formData.id ? 'Soruyu Düzenle' : 'Yeni Soru Bilgileri'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-text-muted mb-1 text-xs font-body uppercase">Kategori</label>
                <select 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full p-3 bg-gray-50 border-gray-200 border border-gray-200 rounded-lg text-secondary outline-none focus:border-amber-500 font-heading font-bold"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-text-muted mb-1 text-xs font-body uppercase">Soru</label>
                <input 
                  type="text" 
                  value={formData.question} 
                  onChange={e => setFormData({...formData, question: e.target.value})} 
                  className="w-full p-3 bg-gray-50 border-gray-200 border border-gray-200 rounded-lg text-secondary outline-none focus:border-amber-500 font-heading font-bold" 
                />
              </div>
              <div>
                <label className="block text-text-muted mb-1 text-xs font-body uppercase">Cevap</label>
                <textarea 
                  value={formData.answer} 
                  onChange={e => setFormData({...formData, answer: e.target.value})} 
                  className="w-full p-3 bg-gray-50 border-gray-200 border border-gray-200 rounded-lg text-secondary outline-none focus:border-amber-500 min-h-[120px] font-body" 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-text-muted mb-1 text-xs font-body uppercase">Sıralama Sırası</label>
                  <input 
                    type="number" 
                    value={formData.order} 
                    onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})} 
                    className="w-full p-3 bg-gray-50 border-gray-200 border border-gray-200 rounded-lg text-secondary outline-none focus:border-amber-500" 
                  />
                </div>
                <div className="flex items-center">
                  <label className="flex items-center space-x-2 text-text-muted cursor-pointer mt-6">
                    <input 
                      type="checkbox" 
                      checked={formData.isActive} 
                      onChange={e => setFormData({...formData, isActive: e.target.checked})} 
                      className="w-4 h-4 rounded bg-gray-800 border-gray-200 text-amber-500 focus:ring-amber-500 focus:ring-offset-gray-900" 
                    />
                    <span className="text-sm font-body uppercase">Aktif (Sitede Gösterilir)</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-bold text-sm uppercase transition-colors">İptal</button>
              <button type="submit" className="bg-amber-600 hover:bg-amber-500 text-secondary px-4 py-2 rounded-lg font-bold text-sm uppercase transition-colors">
                {formData.id ? 'Güncelle' : 'Kaydet'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-8">
        {categories.map((cat) => {
          const catFaqs = faqs.filter(faq => (faq.category || 'Genel') === cat);
          if (catFaqs.length === 0) return null;

          return (
            <div key={cat} className="bg-white border-gray-200 shadow-sm rounded-2xl border border-gray-200/80 p-6">
              <h2 className="text-xl font-heading font-black text-amber-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                <List className="w-5 h-5" /> {cat}
              </h2>
              <div className="space-y-4">
                {catFaqs.map((faq) => (
                  <div key={faq.id} className="bg-white border-gray-200 shadow-sm backdrop-blur-xl rounded-xl border border-gray-200/50 p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-gray-200 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-heading font-bold text-secondary text-base mb-1">{faq.question}</h4>
                      <p className="text-text-muted font-body text-sm leading-relaxed">{faq.answer}</p>
                      <div className="flex gap-2 mt-2">
                        <span className="text-[10px] text-gray-600 bg-gray-100 px-2 py-0.5 rounded uppercase font-bold">Sıra: {faq.order}</span>
                        {faq.isActive ? (
                          <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded border border-green-200 font-bold uppercase">Aktif</span>
                        ) : (
                          <span className="bg-gray-50 border-gray-200 text-gray-500 text-[10px] px-2 py-0.5 rounded border border-gray-500/20 font-bold uppercase">Pasif</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 flex-shrink-0 self-end md:self-center">
                      <button onClick={() => handleEdit(faq)} className="text-gray-400 hover:text-amber-600 p-2 transition-colors"><Edit className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(faq.id)} className="text-gray-400 hover:text-red-600 p-2 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {faqs.length === 0 && !loading && (
          <div className="text-center py-20 bg-white shadow-sm border-gray-200 rounded-2xl border border-dashed border-gray-200">
            <p className="text-gray-500 uppercase text-sm font-heading font-bold">Henüz hiç soru eklenmemiş.</p>
          </div>
        )}
      </div>
    </div>
  );
}
