"use client";


import React, { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';

export default function AdminYorumlarPage() {
  const [reviews, setReviews] = useState<any[]>([]);

  const defaultReviews = [
    { id: 1, name: 'Ahmet Y.', productId: 'direksiyon-kilifi', text: 'Çok kaliteli bir ürün, tavsiye ederim.', rating: 5, date: '10.05.2026' },
    { id: 2, name: 'Mehmet D.', productId: 'paspas-seti', text: 'Aracıma tam uydu, teşekkürler.', rating: 4, date: '08.05.2026' },
  ];

  useEffect(() => {
    const savedReviews = localStorage.getItem('app_reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      setReviews(defaultReviews);
      localStorage.setItem('app_reviews', JSON.stringify(defaultReviews));
    }
  }, []);

  const handleDelete = (id: number) => {
    const updated = reviews.filter(r => r.id !== id);
    setReviews(updated);
    localStorage.setItem('app_reviews', JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100">
      <h1 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 uppercase mb-6">Yorum Yönetimi</h1>
      
      <div className="bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden shadow-lg">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-[#1F2937] font-heading font-bold text-gray-300 text-xs uppercase">
            <tr>
              <th className="p-4">Tarih</th>
              <th className="p-4">Kullanıcı</th>
              <th className="p-4">Ürün</th>
              <th className="p-4">Yorum</th>
              <th className="p-4">Puan</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {reviews.map((rev) => (
              <tr key={rev.id} className="border-t border-gray-800 hover:bg-[#1F2937]/50 transition-colors">
                <td className="p-4 text-gray-400">{rev.date || '11.05.2026'}</td>
                <td className="p-4 font-medium text-white">{rev.name}</td>
                <td className="p-4 text-gray-400">{rev.productId}</td>
                <td className="p-4 text-gray-400 truncate max-w-xs">{rev.text}</td>
                <td className="p-4 flex items-center">
                  <span className="font-heading font-bold text-red-500 mr-1">{rev.rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(rev.id)} className="text-red-400 hover:text-red-300 transition-colors" title="Sil">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
