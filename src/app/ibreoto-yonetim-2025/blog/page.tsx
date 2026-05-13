// Güncellendi
"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, FileText, Edit } from 'lucide-react';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ id: '', title: '', slug: '', content: '', date: '' });

  const defaultPosts = [
    { id: 1, title: 'Doğru Direksiyon Kılıfı Nasıl Seçilir?', slug: 'dogru-direksiyon-kilifi-secimi', content: 'Direksiyon kılıfı seçerken dikkat edilmesi gerekenler...', date: '2026-05-10' },
    { id: 2, title: 'Yaz Aylarında Araç Bakımı', slug: 'yaz-aylarinda-arac-bakimi', content: 'Yaz aylarında aracınızın ömrünü uzatacak ipuçları...', date: '2026-05-08' },
  ];

  useEffect(() => {
    const savedPosts = localStorage.getItem('app_blogs');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      setPosts(defaultPosts);
      localStorage.setItem('app_blogs', JSON.stringify(defaultPosts));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const newPost = {
      id: formData.id || Date.now(),
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      content: formData.content,
      date: formData.date || new Date().toISOString().split('T')[0]
    };

    let updated;
    if (formData.id) {
      updated = posts.map(p => p.id === formData.id ? newPost : p);
    } else {
      updated = [...posts, newPost];
    }

    setPosts(updated);
    localStorage.setItem('app_blogs', JSON.stringify(updated));
    setIsAdding(false);
    setFormData({ id: '', title: '', slug: '', content: '', date: '' });
  };

  const handleDelete = (id: number) => {
    if (!confirm('Bu yazıyı silmek istediğinize emin misiniz?')) return;
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    localStorage.setItem('app_blogs', JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 uppercase">Blog Yönetimi</h1>
        <button 
          onClick={() => { setIsAdding(true); setFormData({ id: '', title: '', slug: '', content: '', date: '' }); }}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-xl font-heading font-bold text-sm uppercase flex items-center transition-all duration-300 shadow-lg shadow-red-500/20 transform hover:scale-105"
        >
          <Plus className="w-4 h-4 mr-1" /> Yeni Yazı Ekle
        </button>
      </div>

      {isAdding && (
        <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 mb-6 shadow-lg">
          <h2 className="text-lg font-heading font-bold text-white mb-4 uppercase">{formData.id ? 'Yazıyı Düzenle' : 'Yeni Yazı Ekle'}</h2>
          <form className="space-y-4" onSubmit={handleSave}>
            <div>
              <label className="block text-gray-400 mb-1 text-sm font-body">Başlık</label>
              <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white" required />
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-sm font-body">Slug (Opsiyonel)</label>
              <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white" placeholder="Bos bırakılırsa başlıktan oluşturulur" />
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-sm font-body">İçerik</label>
              <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={6} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white" required></textarea>
            </div>
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-heading font-bold text-sm uppercase transition-colors">Vazgeç</button>
              <button type="submit" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg font-heading font-bold text-sm uppercase transition-colors">Kaydet</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden shadow-lg">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-[#1F2937] font-heading font-bold text-gray-300 text-xs uppercase">
            <tr>
              <th className="p-4">Başlık</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Tarih</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {posts.map((post) => (
              <tr key={post.id} className="border-t border-gray-800 hover:bg-[#1F2937]/50 transition-colors">
                <td className="p-4 font-medium text-white flex items-center">
                  <FileText className="w-4 h-4 mr-2 text-red-500" />
                  {post.title}
                </td>
                <td className="p-4 text-gray-400">{post.slug}</td>
                <td className="p-4 text-gray-400">{post.date}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => { setIsAdding(true); setFormData(post); }} className="text-blue-400 hover:text-blue-300 transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:text-red-300 transition-colors" title="Sil">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">Yazı bulunamadı.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
