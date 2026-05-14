"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Edit, Save, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { useAdminToast } from '@/context/AdminToastContext';

export default function AdminSliderPage() {
  const [sliders, setSliders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ id: '', title: '', subtitle: '', image: '', buttonText: 'Şimdi İncele', buttonLink: '/urunler', order: 0 });
  const { showToast } = useAdminToast();
  const deleteTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    fetchSliders();
    return () => {
      Object.values(deleteTimeouts.current).forEach(clearTimeout);
    };
  }, []);

  const fetchSliders = async () => {
    try {
      const res = await fetch('/api/admin/sliders');
      const data = await res.json();
      if (Array.isArray(data)) setSliders(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/sliders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        showToast(formData.id ? 'Slider güncellendi' : 'Slider eklendi', 'success');
        fetchSliders();
        setIsAdding(false);
        setFormData({ id: '', title: '', subtitle: '', image: '', buttonText: 'Şimdi İncele', buttonLink: '/urunler', order: 0 });
      }
    } catch (error) {
      showToast('Bir hata oluştu', 'error');
    }
  };

  const handleDelete = (id: string) => {
    const sliderToDelete = sliders.find(s => s.id === id);
    if (!sliderToDelete) return;

    const originalSliders = [...sliders];
    setSliders(prev => prev.filter(s => s.id !== id));

    showToast(`"${sliderToDelete.title || 'Slider'}" siliniyor...`, 'undo', () => {
      setSliders(originalSliders);
      if (deleteTimeouts.current[id]) {
        clearTimeout(deleteTimeouts.current[id]);
        delete deleteTimeouts.current[id];
      }
      showToast('İşlem geri alındı', 'success');
    });

    deleteTimeouts.current[id] = setTimeout(async () => {
      try {
        await fetch(`/api/admin/sliders?id=${id}`, { method: 'DELETE' });
        delete deleteTimeouts.current[id];
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }, 15000);
  };

  const handleEdit = (slider: any) => {
    setFormData({
      id: slider.id,
      title: slider.title || '',
      subtitle: slider.subtitle || '',
      image: slider.image || '',
      buttonText: slider.buttonText || 'Şimdi İncele',
      buttonLink: slider.buttonLink || '/urunler',
      order: slider.order || 0
    });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 uppercase tracking-tight">Slider Yönetimi</h1>
        <button 
          onClick={() => {
            setFormData({ id: '', title: '', subtitle: '', image: '', buttonText: 'Şimdi İncele', buttonLink: '/urunler', order: 0 });
            setIsAdding(true);
          }}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-xl font-heading font-bold text-sm uppercase flex items-center transition-all shadow-lg shadow-red-500/20"
        >
          <Plus className="w-4 h-4 mr-2" /> Yeni Görsel Ekle
        </button>
      </div>

      {isAdding && (
        <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 mb-8 shadow-lg">
          <h2 className="text-lg font-heading font-bold text-white mb-6 uppercase flex items-center">
            <ImageIcon className="w-5 h-5 mr-2 text-red-500" /> {formData.id ? 'Sliderı Düzenle' : 'Slider Bilgileri'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Ana Başlık</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-red-500 font-heading font-bold" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Alt Başlık</label>
                <input type="text" value={formData.subtitle} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-red-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Görsel (Dosya veya URL)</label>
                <div className="flex space-x-2">
                  <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="URL girin veya seçin" className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-red-500 text-sm" />
                  <label className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg cursor-pointer transition-colors flex items-center border border-gray-600">
                    <ImageIcon className="w-4 h-4 mr-1" /> Seç
                    <input type="file" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Buton Metni</label>
                <input type="text" value={formData.buttonText} onChange={e => setFormData({...formData, buttonText: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Buton Linki</label>
                <input type="text" value={formData.buttonLink} onChange={e => setFormData({...formData, buttonLink: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-red-500" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Görüntüleme Sırası</label>
                <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value) || 0})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-red-500" />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-700 px-4 py-2 rounded-lg font-bold text-sm uppercase">İptal</button>
              <button type="submit" className="bg-red-600 px-4 py-2 rounded-lg font-bold text-sm uppercase">
                {formData.id ? 'Güncelle' : 'Sliderı Kaydet'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sliders.map((slider) => (
          <div key={slider.id} className="bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden shadow-lg group">
            <div className="relative h-48 overflow-hidden bg-gray-900">
              {slider.image ? (
                <img src={slider.image} alt={slider.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-600 uppercase text-xs font-heading font-bold">Görsel Yok</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-heading font-bold text-lg leading-tight uppercase truncate">{slider.title || 'Başlıksız'}</h3>
                <p className="text-gray-400 text-xs mt-1 truncate">{slider.subtitle}</p>
              </div>
            </div>
            <div className="p-4 flex justify-between items-center bg-[#111827]">
              <div className="flex items-center space-x-2">
                <div className="bg-red-900/20 text-red-400 text-[10px] px-2 py-0.5 rounded-full border border-red-500/20 font-bold uppercase">
                  Sıra: {slider.order}
                </div>
                {slider.active ? (
                  <span className="bg-green-900/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full border border-green-500/20 font-bold uppercase">Aktif</span>
                ) : (
                  <span className="bg-gray-900/20 text-gray-500 text-[10px] px-2 py-0.5 rounded-full border border-gray-500/20 font-bold uppercase">Pasif</span>
                )}
              </div>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEdit(slider)}
                  className="text-gray-400 hover:text-white p-2 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDelete(slider.id)}
                  className="text-red-600 hover:text-red-500 p-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {sliders.length === 0 && !loading && (
          <div className="col-span-full text-center py-20 bg-[#111827]/30 rounded-2xl border border-dashed border-gray-800">
            <p className="text-gray-500 uppercase text-sm font-heading font-bold">Henüz hiç slider eklenmemiş.</p>
          </div>
        )}
      </div>
    </div>
  );
}
