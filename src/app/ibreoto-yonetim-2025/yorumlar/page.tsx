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
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-heading font-bold text-secondary uppercase mb-6">Yorum Yönetimi</h1>
      
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-surface font-heading font-bold text-secondary text-xs uppercase">
            <tr>
              <th className="p-4">Tarih</th>
              <th className="p-4">Kullanıcı</th>
              <th className="p-4">Ürün</th>
              <th className="p-4">Yorum</th>
              <th className="p-4">Puan</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((rev) => (
              <tr key={rev.id} className="border-t border-gray-100 hover:bg-surface/50 transition-colors">
                <td className="p-4 text-text-muted">{rev.date || '11.05.2026'}</td>
                <td className="p-4 font-medium text-secondary">{rev.name}</td>
                <td className="p-4 text-text-muted">{rev.productId}</td>
                <td className="p-4 text-text-muted truncate max-w-xs">{rev.text}</td>
                <td className="p-4 flex items-center">
                  <span className="font-heading font-bold text-primary mr-1">{rev.rating}</span>
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                </td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(rev.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Sil">
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
