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
    <div className="p-6 bg-background min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold text-secondary uppercase">Kategori Yönetimi</h1>
        <button 
          onClick={() => { setIsAdding(true); setFormData({ id: '', name: '', slug: '' }); }}
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-heading font-bold text-sm uppercase flex items-center transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" /> Yeni Kategori Ekle
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl border border-gray-100 mb-6 shadow-sm">
          <h2 className="text-lg font-heading font-bold text-secondary mb-4 uppercase">{formData.id ? 'Kategoriyi Düzenle' : 'Yeni Kategori Ekle'}</h2>
          <form className="space-y-4" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-muted mb-1 text-sm font-body">Kategori Adı</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-')})} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" required />
              </div>
              <div>
                <label className="block text-text-muted mb-1 text-sm font-body">Slug</label>
                <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" required />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setIsAdding(false)} className="bg-gray-200 hover:bg-gray-300 text-secondary px-4 py-2 rounded-lg font-heading font-bold text-sm uppercase transition-colors">Vazgeç</button>
              <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-heading font-bold text-sm uppercase transition-colors">Kaydet</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-surface font-heading font-bold text-secondary text-xs uppercase">
            <tr>
              <th className="p-4">Kategori Adı</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Ürün Sayısı</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">Yükleniyor...</td>
              </tr>
            ) : categories.map((cat) => (
              <tr key={cat.id} className="border-t border-gray-100 hover:bg-surface/50 transition-colors">
                <td className="p-4 font-medium text-secondary flex items-center">
                  <FolderTree className="w-4 h-4 mr-2 text-primary" />
                  {cat.name}
                </td>
                <td className="p-4 text-text-muted">{cat.slug}</td>
                <td className="p-4 text-text-muted">{cat.productCount}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => { setIsAdding(true); setFormData({ id: cat.id, name: cat.name, slug: cat.slug }); }} className="text-blue-500 hover:text-blue-700 transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(cat.id)} className="text-red-500 hover:text-red-700 transition-colors"><Trash2 className="w-4 h-4" /></button>
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
