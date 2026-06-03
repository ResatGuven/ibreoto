"use client";


import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Ticket } from 'lucide-react';

export default function AdminKuponlarPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ id: '', code: '', discount: '', type: 'percentage', expiry: '' });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await fetch('/api/admin/coupons');
      const data = await res.json();
      if (!data.error) setCoupons(data);
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        fetchCoupons();
        setIsAdding(false);
        setFormData({ id: '', code: '', discount: '', type: 'percentage', expiry: '' });
      }
    } catch (error) {
      console.error('Failed to save coupon:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu kuponu silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`/api/admin/coupons?id=${id}`, {
        method: 'DELETE'
      });
      if (res.ok) fetchCoupons();
    } catch (error) {
      console.error('Failed to delete coupon:', error);
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen text-text-main">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 uppercase">Kupon Yönetimi</h1>
        <button 
          onClick={() => { setIsAdding(true); setFormData({ id: '', code: '', discount: '', type: 'percentage', expiry: '' }); }}
          className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-secondary px-4 py-2 rounded-xl font-heading font-bold text-sm uppercase flex items-center transition-all duration-300 shadow-lg shadow-red-500/20 transform hover:scale-105"
        >
          <Plus className="w-4 h-4 mr-1" /> Yeni Kupon Ekle
        </button>
      </div>

      {isAdding && (
        <div className="bg-white border-gray-200 shadow-sm backdrop-blur-xl p-6 rounded-2xl border border-gray-200 mb-6 shadow-lg">
          <h2 className="text-lg font-heading font-bold text-secondary mb-4 uppercase">{formData.id ? 'Kuponu Düzenle' : 'Yeni Kupon Ekle'}</h2>
          <form className="space-y-4" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-muted mb-1 text-sm font-body">Kupon Kodu</label>
                <input type="text" value={formData.code} onChange={e => setFormData({...formData, code: e.target.value})} className="w-full p-3 bg-gray-50 border-gray-200 border border-gray-200 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-secondary uppercase" required />
              </div>
              <div>
                <label className="block text-text-muted mb-1 text-sm font-body">İndirim Miktarı</label>
                <input type="number" value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} className="w-full p-3 bg-gray-50 border-gray-200 border border-gray-200 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-secondary" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-text-muted mb-1 text-sm font-body">Tür</label>
                <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full p-3 bg-gray-50 border-gray-200 border border-gray-200 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-secondary" required>
                  <option value="percentage">Yüzde (%)</option>
                  <option value="fixed">Sabit Tutar (₺)</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-500 mb-1 text-sm font-body">Son Kullanma Tarihi</label>
                <input type="date" value={formData.expiry} onChange={e => setFormData({...formData, expiry: e.target.value})} className="w-full p-3 bg-white border-gray-300 border rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-gray-900" required />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button type="button" onClick={() => setIsAdding(false)} className="bg-white border-gray-300 border hover:bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-heading font-bold text-sm uppercase transition-colors">Vazgeç</button>
              <button type="submit" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-lg font-heading font-bold text-sm uppercase transition-colors">Kaydet</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white border-gray-200 shadow-sm rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-gray-100 border-gray-200 font-heading font-bold text-gray-700 text-xs uppercase">
            <tr>
              <th className="p-4">Kupon Kodu</th>
              <th className="p-4">İndirim</th>
              <th className="p-4">Tür</th>
              <th className="p-4">Son Kullanma</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="text-gray-900">
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="border-t border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="p-4 font-medium text-gray-900 flex items-center">
                  <Ticket className="w-4 h-4 mr-2 text-red-500" />
                  {coupon.code}
                </td>
                <td className="p-4 font-heading font-bold text-red-600">
                  {coupon.type === 'percentage' ? `%${coupon.discount}` : `₺${coupon.discount}`}
                </td>
                <td className="p-4 text-text-muted">
                  {coupon.type === 'percentage' ? 'Yüzde' : 'Sabit'}
                </td>
                <td className="p-4 text-text-muted">{coupon.expiry}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(coupon.id)} className="text-red-400 hover:text-red-300 transition-colors" title="Sil">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {coupons.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">Kupon bulunamadı.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
