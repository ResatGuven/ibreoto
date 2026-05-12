"use client";
import React from 'react';
import { FolderTree } from 'lucide-react';

export default function AdminKategorilerPage() {
  const categories = [
    { id: 1, name: 'İç Aksesuar', slug: 'ic-aksesuar', count: 3 },
    { id: 2, name: 'Dış Aksesuar', slug: 'dis-aksesuar', count: 3 },
    { id: 3, name: 'Teknoloji & Elektronik', slug: 'teknoloji', count: 3 },
    { id: 4, name: 'Bakım & Temizlik', slug: 'bakim', count: 3 },
  ];

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-heading font-bold text-secondary uppercase mb-6">Kategori Yönetimi</h1>
      
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-surface font-heading font-bold text-secondary text-xs uppercase">
            <tr>
              <th className="p-4">Kategori Adı</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Ürün Sayısı</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} className="border-t border-gray-100 hover:bg-surface/50 transition-colors">
                <td className="p-4 font-medium text-secondary flex items-center">
                  <FolderTree className="w-4 h-4 mr-2 text-primary" />
                  {cat.name}
                </td>
                <td className="p-4 text-text-muted">{cat.slug}</td>
                <td className="p-4 text-text-muted">{cat.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
