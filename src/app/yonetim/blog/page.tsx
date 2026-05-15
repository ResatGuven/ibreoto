"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Edit, Save, FileText, Image as ImageIcon, Calendar, Tag } from 'lucide-react';
import { useAdminToast } from '@/context/AdminToastContext';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ id: '', title: '', content: '', excerpt: '', image: '', author: 'Arı Hayat', category: 'Genel' });
  const { showToast } = useAdminToast();
  const deleteTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    fetchPosts();
    return () => {
      // Clear all pending deletes on unmount to prevent accidental loss
      Object.values(deleteTimeouts.current).forEach(clearTimeout);
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/admin/blog');
      const data = await res.json();
      if (Array.isArray(data)) setPosts(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        showToast(formData.id ? 'Yazı güncellendi' : 'Yazı yayınlandı', 'success');
        fetchPosts();
        setIsAdding(false);
        setFormData({ id: '', title: '', content: '', excerpt: '', image: '', author: 'İbreOto', category: 'Genel' });
      }
    } catch (error) {
      showToast('Bir hata oluştu', 'error');
    }
  };

  const handleDelete = (id: string) => {
    const postToDelete = posts.find(p => p.id === id);
    if (!postToDelete) return;

    // 1. Remove from local state immediately
    const originalPosts = [...posts];
    setPosts(prev => prev.filter(p => p.id !== id));

    showToast(`"${postToDelete.title}" siliniyor...`, 'undo', () => {
      // UNDO ACTION: Restore local state and clear timeout
      setPosts(originalPosts);
      if (deleteTimeouts.current[id]) {
        clearTimeout(deleteTimeouts.current[id]);
        delete deleteTimeouts.current[id];
      }
      showToast('İşlem geri alındı', 'success');
    });

    // 2. Set timeout for actual deletion (15 seconds)
    deleteTimeouts.current[id] = setTimeout(async () => {
      try {
        await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' });
        delete deleteTimeouts.current[id];
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }, 15000);
  };

  const handleEdit = (post: any) => {
    setFormData({
      id: post.id,
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      image: post.image || '',
      author: post.author || 'Arı Hayat',
      category: post.category || 'Genel'
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
        <h1 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 uppercase tracking-tight">Blog Yönetimi</h1>
        <button 
          onClick={() => {
            setFormData({ id: '', title: '', content: '', excerpt: '', image: '', author: 'İbreOto', category: 'Genel' });
            setIsAdding(true);
          }}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-xl font-heading font-bold text-sm uppercase flex items-center transition-all shadow-lg shadow-red-500/20"
        >
          <Plus className="w-4 h-4 mr-2" /> Yeni Yazı Yaz
        </button>
      </div>

      {isAdding && (
        <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 mb-8 shadow-lg">
          <h2 className="text-lg font-heading font-bold text-white mb-6 uppercase flex items-center">
            <FileText className="w-5 h-5 mr-2 text-red-500" /> {formData.id ? 'Yazıyı Düzenle' : 'Blog İçeriği Oluştur'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Yazı Başlığı</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-red-500 font-heading font-bold" placeholder="İlgi çekici bir başlık girin..." required />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Kategori</label>
                <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-red-500 text-sm" placeholder="Örn: Bakım, Teknoloji..." />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Özet (Kısa Açıklama)</label>
              <input type="text" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-red-500 text-sm" placeholder="Arama sonuçlarında görünecek kısa özet..." />
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Kapak Görseli</label>
              <div className="flex space-x-2">
                <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="URL veya dosya" className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-red-500 text-sm" />
                <label className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-lg cursor-pointer transition-colors flex items-center">
                  <ImageIcon className="w-4 h-4" />
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-xs font-body uppercase">İçerik (HTML destekli)</label>
              <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={10} className="w-full p-4 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-red-500 font-body text-sm" placeholder="Yazınızın detaylarını buraya yazın..."></textarea>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-700 px-4 py-2 rounded-lg font-bold text-sm uppercase">Vazgeç</button>
              <button type="submit" className="bg-red-600 px-4 py-2 rounded-lg font-bold text-sm uppercase">
                {formData.id ? 'Güncelle' : 'Yazıyı Yayınla'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden shadow-lg flex flex-col md:flex-row group">
            <div className="w-full md:w-48 h-48 bg-gray-900 shrink-0 overflow-hidden">
              {post.image ? (
                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-700 uppercase text-[10px]">Görsel Yok</div>
              )}
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center text-red-500 text-[10px] font-bold uppercase tracking-widest">
                    <Calendar className="w-3 h-3 mr-1" /> {new Date(post.createdAt).toLocaleDateString('tr-TR')}
                  </div>
                  {post.category && (
                    <span className="flex items-center bg-red-900/20 text-red-400 text-[10px] px-2 py-0.5 rounded-full border border-red-500/20">
                      <Tag className="w-2 h-2 mr-1" /> {post.category}
                    </span>
                  )}
                </div>
                <h3 className="text-white font-heading font-bold text-xl uppercase mb-2 group-hover:text-red-500 transition-colors">{post.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 font-body">{post.excerpt || 'Özet belirtilmemiş.'}</p>
              </div>
              <div className="flex justify-end space-x-4 mt-4 border-t border-gray-800 pt-4">
                <button 
                  onClick={() => handleEdit(post)}
                  className="text-gray-400 hover:text-white flex items-center text-xs uppercase font-bold"
                >
                  <Edit className="w-4 h-4 mr-1" /> Düzenle
                </button>
                <button 
                  onClick={() => handleDelete(post.id)}
                  className="text-red-600 hover:text-red-400 flex items-center text-xs uppercase font-bold"
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Sil
                </button>
              </div>
            </div>
          </div>
        ))}
        {posts.length === 0 && !loading && (
          <div className="text-center py-20 bg-[#111827]/30 rounded-2xl border border-dashed border-gray-800">
            <p className="text-gray-500 uppercase text-sm font-heading font-bold">Henüz hiç yazı yazılmamış.</p>
          </div>
        )}
      </div>
    </div>
  );
}
