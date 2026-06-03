"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Plus, Trash2, Edit, Save, FileText, Image as ImageIcon, Calendar, Tag, Sparkles, Wand2, Loader2 } from 'lucide-react';
import { useAdminToast } from '@/context/AdminToastContext';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ id: '', title: '', content: '', excerpt: '', image: '', author: 'Arı Hayat', category: 'Genel' });
  const [aiTopic, setAiTopic] = useState('');
  const [aiTone, setAiTone] = useState('scientific');
  const [generatingAi, setGeneratingAi] = useState(false);
  const [generatingAiImage, setGeneratingAiImage] = useState(false);
  const [aiImagePrompt, setAiImagePrompt] = useState('');
  const { showToast } = useAdminToast();
  const deleteTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  useEffect(() => {
    fetchPosts();
    return () => {
      // Clear all pending deletes on unmount to prevent accidental loss
      Object.values(deleteTimeouts.current).forEach(clearTimeout);
    };
  }, []);

  const handleGenerateAiBlog = async () => {

    if (!aiTopic.trim()) {
      showToast('Lütfen üretilecek yazı konusunu girin.', 'error');
      return;
    }

    setGeneratingAi(true);
    try {
      const res = await fetch('/api/admin/blog/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: aiTopic, tone: aiTone })
      });
      const data = await res.json();
      if (data.success && data.data) {
        setFormData(prev => ({
          ...prev,
          title: data.data.title,
          excerpt: data.data.excerpt,
          content: data.data.content
        }));
        setAiImagePrompt(data.data.imagePrompt);
        showToast('Yazı içeriği başarıyla oluşturuldu! Form alanları dolduruldu.', 'success');
      } else {
        showToast(`İçerik üretilirken hata oluştu: ${data.error || 'Bilinmeyen hata'}`, 'error');
      }
    } catch (e) {
      showToast('Ağ hatası. İçerik üretilemedi.', 'error');
    } finally {
      setGeneratingAi(false);
    }
  };

  const handleGenerateAiImage = async () => {
    if (!aiImagePrompt) {
      // Let's generate a quick fallback prompt if not present
      showToast('Lütfen önce bir yazı içeriği üreterek görsel promptunun oluşturulmasını sağlayın.', 'error');
      return;
    }

    setGeneratingAiImage(true);
    try {
      const seed = Math.floor(Math.random() * 1000000);
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(aiImagePrompt)}?width=800&height=500&nologo=true&seed=${seed}`;
      
      const img = new Image();
      img.src = url;
      img.onload = () => {
        setFormData(prev => ({ ...prev, image: url }));
        setGeneratingAiImage(false);
        showToast('Blog kapak görseli başarıyla çizildi!', 'success');
      };
      img.onerror = () => {
        showToast('Görsel yüklenirken bir sorun oluştu.', 'error');
        setGeneratingAiImage(false);
      };
    } catch (e) {
      showToast('Görsel üretilemedi.', 'error');
      setGeneratingAiImage(false);
    }
  };

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
        setFormData({ id: '', title: '', content: '', excerpt: '', image: '', author: 'Arı Hayat', category: 'Genel' });
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
    <div className="p-6 bg-background text-text-main min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 uppercase tracking-tight">Blog Yönetimi</h1>
        <button 
          onClick={() => {
            setFormData({ id: '', title: '', content: '', excerpt: '', image: '', author: 'Arı Hayat', category: 'Genel' });
            setIsAdding(true);
          }}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-xl font-heading font-bold text-sm uppercase flex items-center transition-all shadow-lg shadow-red-500/20"
        >
          <Plus className="w-4 h-4 mr-2" /> Yeni Yazı Yaz
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-2xl border border-gray-100 mb-8 shadow-sm">
          <h2 className="text-lg font-heading font-bold text-gray-900 mb-6 uppercase flex items-center">
            <FileText className="w-5 h-5 mr-2 text-red-500" /> {formData.id ? 'Yazıyı Düzenle' : 'Blog İçeriği Oluştur'}
          </h2>
          
          {/* AI Blog Assistant Panel */}
          {!formData.id && (
            <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-2xl">
              <h3 className="text-sm font-heading font-bold text-gray-900 mb-4 uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-500 animate-pulse" /> Yapay Zeka Blog Asistanı
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-gray-500 mb-1 text-[10px] font-body uppercase tracking-wider">Makale Konusu veya Ürün</label>
                  <input 
                    type="text" 
                    value={aiTopic} 
                    onChange={e => setAiTopic(e.target.value)} 
                    placeholder="Örn: Hakiki Kestane Balı'nın 7 mucizevi faydası, Kışın propolis kullanımı..." 
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-900 outline-none focus:border-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1 text-[10px] font-body uppercase tracking-wider">Yazım Tonu</label>
                  <select 
                    value={aiTone} 
                    onChange={e => setAiTone(e.target.value)} 
                    className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-900 outline-none focus:border-red-500 text-sm"
                  >
                    <option value="scientific">Bilimsel / Eğitici</option>
                    <option value="friendly">Samimi / Aile Dostu</option>
                    <option value="sales">Satış / Kampanya</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={handleGenerateAiBlog}
                  disabled={generatingAi}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-5 py-3 rounded-xl font-heading font-bold text-xs uppercase flex items-center gap-2 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {generatingAi ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Yazı Yazılıyor...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4" /> AI ile İçerik Üret
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-500 mb-1 text-xs font-body uppercase">Yazı Başlığı</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-900 outline-none focus:border-red-500 font-heading font-bold" placeholder="İlgi çekici bir başlık girin..." required />
              </div>
              <div>
                <label className="block text-gray-500 mb-1 text-xs font-body uppercase">Kategori</label>
                <input type="text" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-900 outline-none focus:border-red-500 text-sm" placeholder="Örn: Sağlık, Apiterapi, Bal..." />
              </div>
            </div>
            <div>
              <label className="block text-gray-500 mb-1 text-xs font-body uppercase">Özet (Kısa Açıklama)</label>
              <input type="text" value={formData.excerpt} onChange={e => setFormData({...formData, excerpt: e.target.value})} className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-900 outline-none focus:border-red-500 text-sm" placeholder="Arama sonuçlarında görünecek kısa özet..." />
            </div>
            <div>
              <label className="block text-gray-500 mb-1 text-xs font-body uppercase">Kapak Görseli</label>
              <div className="flex space-x-2">
                <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} placeholder="URL veya dosya" className="w-full p-3 bg-white border border-gray-200 rounded-lg text-gray-900 outline-none focus:border-red-500 text-sm" />
                {aiImagePrompt && (
                  <button
                    type="button"
                    onClick={handleGenerateAiImage}
                    disabled={generatingAiImage}
                    className="bg-gray-50 border-gray-200 text-red-400 px-4 py-3 rounded-lg font-heading font-bold text-xs uppercase transition-colors flex items-center border border-gray-200 gap-1 disabled:opacity-50"
                    title="Yazı içeriğine uygun AI resmi çiz"
                  >
                    {generatingAiImage ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                    <span>Resim Çiz</span>
                  </button>
                )}
                <label className="bg-gray-700 hover:bg-gray-600 text-secondary px-4 py-3 rounded-lg cursor-pointer transition-colors flex items-center">
                  <ImageIcon className="w-4 h-4" />
                  <input type="file" className="hidden" onChange={handleFileChange} />
                </label>
              </div>
            </div>
            <div>
              <label className="block text-text-muted mb-1 text-xs font-body uppercase">İçerik (HTML destekli)</label>
              <textarea value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={10} className="w-full p-4 bg-[#1F2937] border border-gray-700 rounded-lg text-secondary outline-none focus:border-red-500 font-body text-sm" placeholder="Yazınızın detaylarını buraya yazın..."></textarea>
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
                <h3 className="text-secondary font-heading font-bold text-xl uppercase mb-2 group-hover:text-red-500 transition-colors">{post.title}</h3>
                <p className="text-text-muted text-sm line-clamp-2 font-body">{post.excerpt || 'Özet belirtilmemiş.'}</p>
              </div>
              <div className="flex justify-end space-x-4 mt-4 border-t border-gray-800 pt-4">
                <button 
                  onClick={() => handleEdit(post)}
                  className="text-text-muted hover:text-secondary flex items-center text-xs uppercase font-bold"
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
