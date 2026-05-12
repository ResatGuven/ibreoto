"use client";

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Image as ImageIcon } from 'lucide-react';

export default function AdminUrunlerPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ id: 0, name: '', price: '', category: '', image: '', description: '' });

  const defaultProducts = [
    { id: 1, name: 'Karbon Fiber Direksiyon Kılıfı', price: '350', category: 'ic-aksesuar', image: '/images/products/steering_wheel_cover.png', description: 'Yüksek kaliteli karbon fiber görünüm.' },
    { id: 2, name: '3D Havuzlu Paspas Seti - VW Golf', price: '850', category: 'ic-aksesuar', image: '/images/products/paspas_seti.png', description: 'Tam uyumlu havuzlu paspas.' },
    { id: 3, name: 'Ortopedik Bel Destekli Koltuk Minderi', price: '450', category: 'ic-aksesuar', image: '/images/products/koltuk_minderi.png', description: 'Uzun sürüşler için konfor.' },
    { id: 4, name: 'Dört Mevsim Branda - Su Geçirmez', price: '1200', category: 'dis-aksesuar', image: '/images/products/araba_brandasi.png', description: 'Aracınızı dış etkenlerden korur.' },
    { id: 5, name: 'Muz Tipi Silecek Takımı', price: '150', category: 'dis-aksesuar', image: '/images/products/silecek_takimi.png', description: 'Sessiz ve temiz silme.' },
    { id: 6, name: 'Krom Kapı Kolu Kaplaması', price: '250', category: 'dis-aksesuar', image: '/images/products/krom_kapi_kolu.png', description: 'Şık krom görünüm.' },
    { id: 7, name: '4K Çift Kameralı Araç İçi Kamera', price: '2500', category: 'teknoloji', image: '/images/products/dash_cam.png', description: 'Ön ve arka kayıt.' },
    { id: 8, name: 'RGB Uygulama Kontrollü Ambiyans Led', price: '650', category: 'teknoloji', image: '/images/products/interior_led.png', description: 'Telefon kontrollü renkler.' },
    { id: 9, name: 'Kablosuz Şarjlı Telefon Tutucu', price: '350', category: 'teknoloji', image: '/images/products/telefon_tutucu.png', description: 'Otomatik kavrama.' },
    { id: 10, name: 'Seramik Katkılı Hızlı Cila 500ml', price: '250', category: 'bakim', image: '/images/products/seramik_cila.png', description: 'Derin parlaklık ve koruma.' },
    { id: 11, name: 'Cilalı Oto Şampuanı 1 Litre', price: '120', category: 'bakim', image: '/images/products/oto_sampuani.png', description: 'Temizler ve parlatır.' },
    { id: 12, name: 'Mikrofiber Kurulama Bezi 3\'lü', price: '80', category: 'bakim', image: '/images/products/kurulama_bezi.png', description: 'Hav bırakmaz.' },
  ];

  useEffect(() => {
    let allProducts = [];
    const savedProducts = localStorage.getItem('app_products');
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      // Merge with default products to get images if missing
      allProducts = parsed.map((p: any) => {
        const def = defaultProducts.find(d => d.id === p.id);
        return {
          ...p,
          image: p.image || (def ? def.image : '')
        };
      });
    } else {
      allProducts = defaultProducts;
      localStorage.setItem('app_products', JSON.stringify(defaultProducts));
    }
    setProducts(allProducts);
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    let updated;
    if (formData.id) {
      // Edit
      updated = products.map(p => p.id === formData.id ? formData : p);
    } else {
      // Add
      const newProduct = { ...formData, id: Date.now() };
      updated = [...products, newProduct];
    }
    setProducts(updated);
    localStorage.setItem('app_products', JSON.stringify(updated));
    setIsAdding(false);
    setFormData({ id: 0, name: '', price: '', category: '', image: '', description: '' });
  };

  const handleDelete = (id: number) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('app_products', JSON.stringify(updated));
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
    <div className="p-6 bg-background min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold text-secondary uppercase">Ürün Yönetimi</h1>
        <button 
          onClick={() => { setIsAdding(true); setFormData({ id: 0, name: '', price: '', category: '', image: '', description: '' }); }}
          className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-lg font-heading font-bold text-sm uppercase flex items-center transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" /> Yeni Ürün Ekle
        </button>
      </div>

      {isAdding && (
        <div className="bg-white p-6 rounded-xl border border-gray-100 mb-6 shadow-sm">
          <h2 className="text-lg font-heading font-bold text-secondary mb-4 uppercase">{formData.id ? 'Ürünü Düzenle' : 'Yeni Ürün Ekle'}</h2>
          <form className="space-y-4" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-muted mb-1 text-sm font-body">Ürün Adı</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" required />
              </div>
              <div>
                <label className="block text-text-muted mb-1 text-sm font-body">Fiyat (₺)</label>
                <input type="text" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-muted mb-1 text-sm font-body">Kategori</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" required>
                  <option value="">Seçiniz</option>
                  <option value="ic-aksesuar">İç Aksesuar</option>
                  <option value="dis-aksesuar">Dış Aksesuar</option>
                  <option value="teknoloji">Teknoloji & Elektronik</option>
                  <option value="bakim">Bakım & Temizlik</option>
                </select>
              </div>
              <div>
                <label className="block text-text-muted mb-1 text-sm font-body">Görsel (Dosya veya URL)</label>
                <div className="flex space-x-2">
                  <input type="text" value={formData.image} onChange={e => setFormData({...formData, image: e.target.value})} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm" placeholder="URL girin veya dosya seçin" />
                  <label className="bg-surface hover:bg-gray-200 text-secondary px-4 py-3 rounded-lg font-heading font-bold text-sm uppercase cursor-pointer transition-colors flex items-center">
                    <ImageIcon className="w-4 h-4 mr-1" /> Seç
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                  </label>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-text-muted mb-1 text-sm font-body">Açıklama</label>
              <textarea value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"></textarea>
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
              <th className="p-4">Görsel</th>
              <th className="p-4">Ürün Adı</th>
              <th className="p-4">Kategori</th>
              <th className="p-4">Fiyat</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-gray-100 hover:bg-surface/50 transition-colors">
                <td className="p-4">
                  <div className="w-12 h-12 bg-surface rounded flex items-center justify-center text-gray-400 overflow-hidden">
                    {product.image ? <img src={product.image} alt="" className="w-full h-full object-cover" /> : <ImageIcon className="w-5 h-5" />}
                  </div>
                </td>
                <td className="p-4 font-medium text-secondary">{product.name}</td>
                <td className="p-4 text-text-muted">{product.category}</td>
                <td className="p-4 font-heading font-bold text-primary">₺{product.price}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => { setIsAdding(true); setFormData(product); }} className="text-blue-500 hover:text-blue-700 transition-colors"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
