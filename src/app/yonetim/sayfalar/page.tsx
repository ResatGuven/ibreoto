"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit, Save, FileText } from 'lucide-react';
import { useAdminToast } from '@/context/AdminToastContext';

const RichTextEditor = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => {
  const editorRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '<p><br></p>';
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCmd = (command: string, arg: string = '') => {
    document.execCommand(command, false, arg);
    handleInput();
  };

  return (
    <div className="border border-gray-700 rounded-lg overflow-hidden bg-[#1F2937]">
      <style>{`
        .editor-content h2 { font-size: 1.5rem; font-weight: 700; margin-top: 1rem; margin-bottom: 0.5rem; color: #fff; }
        .editor-content h3 { font-size: 1.25rem; font-weight: 700; margin-top: 0.75rem; margin-bottom: 0.5rem; color: #fff; }
        .editor-content p { margin-bottom: 1rem; color: #d1d5db; line-height: 1.6; }
        .editor-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1rem; }
        .editor-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1rem; }
        .editor-content a { color: #F59E0B; text-decoration: underline; }
      `}</style>
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-[#111827] border-b border-gray-700 select-none">
        <button
          type="button"
          onClick={() => execCmd('bold')}
          className="px-3 py-1.5 hover:bg-[#1F2937] rounded text-xs font-bold text-gray-300 hover:text-white transition-colors"
          title="Kalın"
        >
          K
        </button>
        <button
          type="button"
          onClick={() => execCmd('italic')}
          className="px-3 py-1.5 hover:bg-[#1F2937] rounded text-xs italic text-gray-300 hover:text-white transition-colors"
          title="İtalik"
        >
          İ
        </button>
        <button
          type="button"
          onClick={() => execCmd('underline')}
          className="px-3 py-1.5 hover:bg-[#1F2937] rounded text-xs underline text-gray-300 hover:text-white transition-colors"
          title="Altı Çizili"
        >
          A
        </button>
        <div className="w-[1px] h-6 bg-gray-700 mx-1"></div>
        <button
          type="button"
          onClick={() => execCmd('formatBlock', '<h2>')}
          className="px-3 py-1.5 hover:bg-[#1F2937] rounded text-xs font-bold text-gray-300 hover:text-white transition-colors"
          title="Büyük Başlık"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() => execCmd('formatBlock', '<h3>')}
          className="px-3 py-1.5 hover:bg-[#1F2937] rounded text-xs font-bold text-gray-300 hover:text-white transition-colors"
          title="Küçük Başlık"
        >
          H3
        </button>
        <button
          type="button"
          onClick={() => execCmd('formatBlock', '<p>')}
          className="px-3 py-1.5 hover:bg-[#1F2937] rounded text-xs text-gray-300 hover:text-white transition-colors"
          title="Paragraf"
        >
          P
        </button>
        <div className="w-[1px] h-6 bg-gray-700 mx-1"></div>
        <button
          type="button"
          onClick={() => execCmd('insertUnorderedList')}
          className="px-3 py-1.5 hover:bg-[#1F2937] rounded text-xs text-gray-300 hover:text-white transition-colors"
          title="Madde İşaretli Liste"
        >
          • Liste
        </button>
        <button
          type="button"
          onClick={() => execCmd('insertOrderedList')}
          className="px-3 py-1.5 hover:bg-[#1F2937] rounded text-xs text-gray-300 hover:text-white transition-colors"
          title="Numaralı Liste"
        >
          1. Liste
        </button>
        <div className="w-[1px] h-6 bg-gray-700 mx-1"></div>
        <button
          type="button"
          onClick={() => execCmd('justifyLeft')}
          className="px-3 py-1.5 hover:bg-[#1F2937] rounded text-xs text-gray-300 hover:text-white transition-colors"
          title="Sola Hizala"
        >
          Sola
        </button>
        <button
          type="button"
          onClick={() => execCmd('justifyCenter')}
          className="px-3 py-1.5 hover:bg-[#1F2937] rounded text-xs text-gray-300 hover:text-white transition-colors"
          title="Ortala"
        >
          Orta
        </button>
        <button
          type="button"
          onClick={() => execCmd('justifyRight')}
          className="px-3 py-1.5 hover:bg-[#1F2937] rounded text-xs text-gray-300 hover:text-white transition-colors"
          title="Sağa Hizala"
        >
          Sağa
        </button>
        <div className="w-[1px] h-6 bg-gray-700 mx-1"></div>
        <button
          type="button"
          onClick={() => {
            const url = window.prompt('Bağlantı URL adresini girin:');
            if (url) execCmd('createLink', url);
          }}
          className="px-3 py-1.5 hover:bg-[#1F2937] rounded text-xs text-amber-500 hover:text-amber-400 transition-colors font-bold"
          title="Bağlantı Ekle"
        >
          Link Ekle
        </button>
        <button
          type="button"
          onClick={() => execCmd('removeFormat')}
          className="px-3 py-1.5 hover:bg-red-900/20 hover:text-red-400 rounded text-xs text-gray-400 transition-colors"
          title="Biçimlendirmeyi Temizle"
        >
          Temizle
        </button>
      </div>

      {/* Editor Content Area */}
      <div
        ref={editorRef}
        contentEditable={true}
        onInput={handleInput}
        className="w-full p-4 min-h-[300px] outline-none text-white overflow-y-auto text-sm editor-content"
      />
    </div>
  );
};

export default function AdminPagesPage() {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ id: '', title: '', slug: '', content: '', isActive: true });
  const { showToast } = useAdminToast();

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const res = await fetch('/api/admin/pages');
      const data = await res.json();
      if (Array.isArray(data)) setPages(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      showToast('Başlık ve URL (slug) alanları zorunludur.', 'error');
      return;
    }
    
    // Auto format slug if user entered spaces
    const slug = formData.slug.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    try {
      const res = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, slug })
      });
      if (res.ok) {
        showToast(formData.id ? 'Sayfa güncellendi' : 'Sayfa eklendi', 'success');
        fetchPages();
        setIsAdding(false);
        setFormData({ id: '', title: '', slug: '', content: '', isActive: true });
      } else {
        showToast('Bir hata oluştu', 'error');
      }
    } catch (error) {
      showToast('Bir hata oluştu', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu sayfayı silmek istediğinize emin misiniz?")) return;
    try {
      await fetch(`/api/admin/pages?id=${id}`, { method: 'DELETE' });
      setPages(prev => prev.filter(s => s.id !== id));
      showToast('Sayfa silindi', 'success');
    } catch (error) {
      showToast('Silme başarısız', 'error');
    }
  };

  const handleEdit = (page: any) => {
    setFormData({
      id: page.id,
      title: page.title || '',
      slug: page.slug || '',
      content: page.content || '',
      isActive: page.isActive
    });
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-700 uppercase tracking-tight">Sayfa Yönetimi</h1>
        <button 
          onClick={() => {
            setFormData({ id: '', title: '', slug: '', content: '', isActive: true });
            setIsAdding(true);
          }}
          className="bg-gradient-to-r from-primary to-amber-700 hover:from-amber-600 hover:to-amber-800 text-secondary px-4 py-2 rounded-xl font-heading font-bold text-sm uppercase flex items-center transition-all shadow-lg shadow-primary/20"
        >
          <Plus className="w-4 h-4 mr-2" /> Yeni Sayfa Ekle
        </button>
      </div>

      {isAdding && (
        <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 mb-8 shadow-lg">
          <h2 className="text-lg font-heading font-bold text-white mb-6 uppercase flex items-center">
            <FileText className="w-5 h-5 mr-2 text-primary" /> {formData.id ? 'Sayfayı Düzenle' : 'Sayfa Bilgileri'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Sayfa Başlığı (Örn: Hakkımızda)</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-primary font-heading font-bold" />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-xs font-body uppercase">URL (Slug) (Örn: hakkimizda)</label>
                <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-primary" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-400 mb-2 text-xs font-body uppercase">İçerik Editörü (Görsel Zengin Editör)</label>
                <RichTextEditor 
                  value={formData.content} 
                  onChange={val => setFormData({...formData, content: val})} 
                />
              </div>
              <div>
                <label className="flex items-center space-x-2 text-gray-400 cursor-pointer">
                  <input type="checkbox" checked={formData.isActive} onChange={e => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4 rounded bg-gray-800 border-gray-700 text-primary focus:ring-primary focus:ring-offset-gray-900" />
                  <span className="text-sm font-body uppercase">Sayfa Aktif (Yayında)</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg font-bold text-sm uppercase transition-colors">İptal</button>
              <button type="submit" className="bg-primary hover:bg-primary-hover text-secondary px-4 py-2 rounded-lg font-bold text-sm uppercase transition-colors">
                {formData.id ? 'Güncelle' : 'Kaydet'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden shadow-lg">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#1F2937] text-gray-400 text-[10px] uppercase tracking-widest font-heading border-b border-gray-800">
              <th className="p-4 font-bold">Sayfa Başlığı</th>
              <th className="p-4 font-bold">URL (Slug)</th>
              <th className="p-4 font-bold">Durum</th>
              <th className="p-4 font-bold">Tarih</th>
              <th className="p-4 font-bold text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800/50 text-sm font-body">
            {pages.map((page) => (
              <tr key={page.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="p-4 font-bold text-white">{page.title}</td>
                <td className="p-4 text-gray-400">/{page.slug}</td>
                <td className="p-4">
                  {page.isActive ? (
                    <span className="bg-green-900/20 text-green-400 text-[10px] px-2 py-0.5 rounded-full border border-green-500/20 font-bold uppercase">Aktif</span>
                  ) : (
                    <span className="bg-gray-900/20 text-gray-500 text-[10px] px-2 py-0.5 rounded-full border border-gray-500/20 font-bold uppercase">Pasif</span>
                  )}
                </td>
                <td className="p-4 text-gray-500">{new Date(page.createdAt).toLocaleDateString('tr-TR')}</td>
                <td className="p-4 flex justify-end space-x-2">
                  <button onClick={() => handleEdit(page)} className="text-gray-400 hover:text-white p-2 transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(page.id)} className="text-red-500 hover:text-red-400 p-2 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {pages.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500 uppercase text-xs font-bold font-heading">Henüz sayfa oluşturulmamış.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
