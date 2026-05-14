"use client";


import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, FolderTree } from 'lucide-react';

export default function AdminKategorilerPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', slug: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = formData.id ? 'PUT' : 'POST';
      const url = formData.id ? `/api/admin/categories/${formData.id}` : '/api/admin/categories';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        fetchCategories();
        setIsAdding(false);
        setFormData({ id: '', name: '', slug: '' });
      } else {
        alert('Failed to save category');
      }
    } catch (error) {
      console.error('Error saving category:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) return;
    
    try {
      const res = await fetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchCategories();
      } else {
        alert('Failed to delete category');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 uppercase">Kategori Yönetimi</h1>
        <button 
          onClick={() => { setIsAdding(true); setFormData({ id: '', name: '', slug: '' }); }}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-xl font-heading font-bold text-sm uppercase flex items-center transition-all duration-300 shadow-lg shadow-red-500/20 transform hover:scale-105"
        >
          <Plus className="w-4 h-4 mr-1" /> Yeni Kategori Ekle
        </button>
      </div>

      {isAdding && (
        <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 mb-6 shadow-lg">
          <h2 className="text-lg font-heading font-bold text-white mb-4 uppercase">{formData.id ? 'Kategoriyi Düzenle' : 'Yeni Kategori Ekle'}</h2>
          <form className="space-y-4" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-1 text-sm font-body">Kategori Adı</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white" required />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-sm font-body">Slug</label>
                <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white" required />
              </div>
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
              <th className="p-4">Kategori Adı</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Ürün Sayısı</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {loading ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">Yükleniyor...</td>
              </tr>
            ) : categories.map((cat) => (
              <tr key={cat.id} className="border-t border-gray-800 hover:bg-[#1F2937]/50 transition-colors">
                <td className="p-4 font-medium text-white flex items-center">
                  <FolderTree className="w-4 h-4 mr-2 text-red-500" />
                  {cat.name}
                </td>
                <td className="p-4 text-gray-400">{cat.slug}</td>
                <td className="p-4 text-gray-400">{cat.productCount}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => { setIsAdding(true); setFormData({ id: cat.id, name: cat.name, slug: cat.slug }); }} className="text-blue-400 hover:text-blue-300 transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-400 hover:text-red-300 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {!loading && categories.length === 0 && (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">Kategori bulunamadı.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
