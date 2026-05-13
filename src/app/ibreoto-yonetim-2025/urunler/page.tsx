// Güncellendi
"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon, Search } from 'lucide-react';

export default function AdminUrunlerPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', price: '', category: '', image: '', description: '', stock: '0', metaTitle: '', metaDescription: '' });
  const [loading, setLoading] = useState(true);
  
  // Hızlı stok güncelleme için state'ler
  const [editingStockId, setEditingStockId] = useState<string | null>(null);
  const [tempStock, setTempStock] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products', { cache: 'no-store' });
      const data = await res.json();
      if (Array.isArray(data)) {
        // LocalStorage'dan SEO verilerini oku ve birleştir
        const mergedProducts = data.map((p: any) => {
          const savedSeo = localStorage.getItem(`seo_product_${p.id}`);
          const seo = savedSeo ? JSON.parse(savedSeo) : { metaTitle: '', metaDescription: '' };
          return { ...p, ...seo };
        });
        setProducts(mergedProducts);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = formData.id ? 'PUT' : 'POST';
      const url = formData.id ? `/api/admin/products/${formData.id}` : '/api/admin/products';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          price: formData.price,
          category: formData.category,
          image: formData.image,
          description: formData.description,
          stock: parseInt(formData.stock) || 0
        }),
      });

      if (res.ok) {
        const savedProduct = await res.json();
        const productId = formData.id || savedProduct.id;

        // SEO verilerini LocalStorage'a kaydet (Boşsa otomatik doldur)
        const metaTitle = formData.metaTitle || `${formData.name} - En Uygun Fiyatlarla ibreoto'da!`;
        const metaDescription = formData.metaDescription || `${formData.name} ürününü en uygun fiyat ve hızlı kargo avantajıyla ibreoto'dan satın alın. Hemen tıklayın!`;

        localStorage.setItem(`seo_product_${productId}`, JSON.stringify({
          metaTitle,
          metaDescription
        }));

        fetchProducts();
        setIsAdding(false);
        setFormData({ id: '', name: '', price: '', category: '', image: '', description: '', stock: '0', metaTitle: '', metaDescription: '' });
      } else {
        alert('Failed to save product');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleQuickStockUpdate = async (product: any) => {
    setEditingStockId(null);
    const stockValue = parseInt(tempStock);
    if (isNaN(stockValue)) return;

    try {
      const res = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...product,
          stock: stockValue
        }),
      });

      if (res.ok) {
        fetchProducts();
      } else {
        alert('Failed to update stock');
      }
    } catch (error) {
      console.error('Error updating stock:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu ürünü silmek istediğinize emin misiniz?')) return;
    
    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        localStorage.removeItem(`seo_product_${id}`); // SEO verisini de sil
        fetchProducts();
      } else {
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 uppercase">Ürün Yönetimi</h1>
        <button 
          onClick={() => { setIsAdding(true); setFormData({ id: '', name: '', price: '', category: '', image: '', description: '', stock: '0', metaTitle: '', metaDescription: '' }); }}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-xl font-heading font-bold text-sm uppercase flex items-center transition-all duration-300 shadow-lg shadow-red-500/20 transform hover:scale-105"
        >
          <Plus className="w-4 h-4 mr-1" /> Yeni Ürün Ekle
        </button>
      </div>

      {isAdding && (
        <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 mb-6 shadow-lg">
          <h2 className="text-lg font-heading font-bold text-white mb-4 uppercase">{formData.id ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h2>
          <form className="space-y-4" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-400 mb-1 text-sm font-body">Ürün Adı</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white" required />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-sm font-body">Fiyat (₺)</label>
                <input type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white" required />
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-sm font-body">Stok Adedi</label>
                <input type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-400 mb-1 text-sm font-body">Kategori</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white" required>
                  <option value="">Seçiniz</option>
                  <option value="ic-aksesuar">İç Aksesuar</option>
                  <option value="dis-aksesuar">Dış Aksesuar</option>
                  <option value="teknoloji">Teknoloji & Elektronik</option>
                  <option value="bakim">Bakım & Temizlik</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-400 mb-1 text-sm font-body">Görsel (Dosya veya URL)</label>
                <div className="flex space-x-2">
                  <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white text-sm" placeholder="URL girin veya dosya seçin" />
                  <label className="bg-[#1F2937] hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-heading font-bold text-sm uppercase cursor-pointer transition-colors flex items-center border border-gray-700">
                    <ImageIcon className="w-4 h-4 mr-1" /> Seç
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-sm font-body">Açıklama</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white"></textarea>
            </div>
            
            {/* SEO Alanları */}
            <div className="border-t border-gray-800 pt-4 mt-4">
              <h3 className="text-md font-heading font-bold text-white mb-3 uppercase flex items-center">
                <Search className="w-4 h-4 mr-1 text-red-500" /> SEO Yönetimi (Google'da Öne Çıkın)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1 text-sm font-body">SEO Başlığı (Meta Title)</label>
                  <input type="text" value={formData.metaTitle} onChange={e => setFormData({...formData, metaTitle: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white text-sm" placeholder="Boş bırakılırsa ürün adı kullanılır" />
                </div>
                <div>
                  <label className="block text-gray-400 mb-1 text-sm font-body">SEO Açıklaması (Meta Description)</label>
                  <input type="text" value={formData.metaDescription} onChange={e => setFormData({...formData, metaDescription: e.target.value})} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white text-sm" placeholder="Arama sonuçlarında görünecek kısa açıklama" />
                </div>
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
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left font-body text-sm">
          <thead className="bg-[#1F2937] font-heading font-bold text-gray-300 text-xs uppercase">
            <tr>
              <th className="p-4">Görsel</th>
              <th className="p-4">Ürün Adı</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Fiyat</th>
              <th className="p-4">Stok</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {loading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">Yükleniyor...</td>
              </tr>
            ) : products.map((product) => (
              <tr key={product.id} className="border-t border-gray-800 hover:bg-[#1F2937]/50 transition-colors">
                <td className="p-4">
                  <div className="w-12 h-12 bg-[#1F2937] rounded flex items-center justify-center text-gray-500 overflow-hidden border border-gray-700">
                    {product.image ? <img src={product.image} alt="" className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5" />}
                  </div>
                </td>
                <td className="p-4 font-medium text-white">{product.name}</td>
                <td className="p-4 text-gray-400">{product.category}</td>
                <td className="p-4 font-heading font-bold text-red-500">₺{product.price}</td>
                <td className="p-4 text-gray-400">
                  {editingStockId === product.id ? (
                    <input
                      type="number"
                      value={tempStock}
                      onChange={e => setTempStock(e.target.value)}
                      onBlur={() => handleQuickStockUpdate(product)}
                      onKeyDown={e => e.key === 'Enter' && handleQuickStockUpdate(product)}
                      className="w-20 p-1 bg-[#1F2937] border border-red-500 rounded text-white text-center"
                      autoFocus
                    />
                  ) : (
                    <span 
                      onClick={() => { setEditingStockId(product.id); setTempStock(product.stock.toString()); }} 
                      className="cursor-pointer hover:text-red-500 transition-colors border-b border-dashed border-gray-600"
                      title="Hızlı güncellemek için tıklayın"
                    >
                      {product.stock}
                    </span>
                  )}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => { setIsAdding(true); setFormData({...product, stock: product.stock.toString()}); }} className="text-red-400 hover:text-red-300 transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {!loading && products.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">Ürün bulunamadı.</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
