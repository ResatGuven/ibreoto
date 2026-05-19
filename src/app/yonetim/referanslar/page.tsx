"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, MessageSquare, Star } from 'lucide-react';
import { useAdminToast } from '@/context/AdminToastContext';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', role: '', comment: '', rating: 5, isActive: true });
  const { showToast } = useAdminToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/admin/testimonials');
      const data = await res.json();
      if (Array.isArray(data)) setTestimonials(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.comment) {
      showToast('İsim ve Yorum alanları zorunludur.', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        showToast(formData.id ? 'Referans güncellendi' : 'Referans eklendi', 'success');
        fetchTestimonials();
        setIsAdding(false);
        setFormData({ id: '', name: '', role: '', comment: '', rating: 5, isActive: true });
      } else {
        showToast('Bir hata oluştu', 'error');
      }
    } catch (error) {
      showToast('Bir hata oluştu', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu referansı silmek istediğinize emin misiniz?")) return;
    try {
      await fetch(`/api/admin/testimonials?id=${id}`, { method: 'DELETE' });
      setTestimonials(prev => prev.filter(s => s.id !== id));
      showToast('Referans silindi', 'success');
    } catch (error) {
      showToast('Silme başarısız', 'error');
    }
  };

  const handleEdit = (testimonial: any) => {
    setFormData({
      id: testimonial.id,
      name: testimonial.name || '',
      role: testimonial.role || '',
      comment: testimonial.comment || '',
      rating: testimonial.rating || 5,
      isActive: testimonial.isActive
    });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500 uppercase tracking-tight">Referanslar (Yorumlar)</h1>
        <button 
          onClick={() => {
            setFormData({ id: '', name: '', role: '', comment: '', rating: 5, isActive: true });
            setIsAdding(true);
          }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-xl font-heading font-bold text-sm uppercase flex items-center transition-all shadow-lg shadow-purple-500/20"
        >
          <Plus className="w-4 h-4 mr-2" /> Yeni Referans Ekle
        </button>
      </div>

      {isAdding && (
        <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 mb-8 shadow-lg">
          <h2 className="text-lg font-heading font-bold text-white mb-6 uppercase flex items-center">
            <MessageSquare className="w-5 h-5 mr-2 text-purple-500" /> {formData.id ? 'Referansı Düzenle' : 'Referans Bilgileri'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Müşteri Adı (Örn: Fatma Y.)</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-purple-500 font-heading font-bold" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Unvan / Rol (Örn: Sadık Müşteri)</label>
                <input type="text" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-purple-500" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Yorum (Müşterinin Mesajı)</label>
                <textarea 
                  value={formData.comment} 
                  onChange={e => setFormData({...formData, comment: e.target.value})} 
                  className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-purple-500 min-h-[120px]" 
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Yıldız Puanı (1-5)</label>
                <select 
                  value={formData.rating} 
                  onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})}
                  className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-purple-500"
                >
                  <option value={5}>5 Yıldız</option>
                  <option value={4}>4 Yıldız</option>
                  <option value={3}>3 Yıldız</option>
                  <option value={2}>2 Yıldız</option>
                  <option value={1}>1 Yıldız</option>
                </select>
              </div>
              <div className="flex items-center">
                <label className="flex items-center space-x-2 text-gray-400 cursor-pointer mt-6">
                  <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4 rounded bg-gray-800 border-gray-700 text-purple-500 focus:ring-purple-500 focus:ring-offset-gray-900" />
                  <span className="text-sm font-body uppercase">Referans Aktif (Anasayfada Görünür)</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-bold text-sm uppercase transition-colors">İptal</button>
              <button type="submit" className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-bold text-sm uppercase transition-colors">
                {formData.id ? 'Güncelle' : 'Kaydet'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 flex flex-col shadow-lg">
            <div className="flex space-x-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < testimonial.rating ? 'text-primary fill-primary' : 'text-gray-600'}`} />
              ))}
            </div>
            <p className="text-gray-300 font-body text-sm italic mb-4 flex-grow">"{testimonial.comment}"</p>
            <div className="flex justify-between items-end border-t border-gray-800 pt-4 mt-auto">
              <div>
                <h4 className="font-heading font-bold text-white text-sm uppercase">{testimonial.name}</h4>
                <p className="text-gray-500 text-xs">{testimonial.role}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleEdit(testimonial)} className="text-gray-400 hover:text-white p-2 transition-colors"><Edit className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(testimonial.id)} className="text-red-500 hover:text-red-400 p-2 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="absolute top-4 right-4">
               {testimonial.isActive ? (
                  <span className="bg-green-900/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full border border-green-500/20 font-bold uppercase">Aktif</span>
                ) : (
                  <span className="bg-gray-900/20 text-gray-500 text-[10px] px-2 py-0.5 rounded-full border border-gray-500/20 font-bold uppercase">Pasif</span>
                )}
            </div>
          </div>
        ))}
        {testimonials.length === 0 && !loading && (
          <div className="col-span-full text-center py-20 bg-[#111827]/30 rounded-2xl border border-dashed border-gray-800">
            <p className="text-gray-500 uppercase text-sm font-heading font-bold">Henüz hiç referans eklenmemiş.</p>
          </div>
        )}
      </div>
    </div>
  );
}
