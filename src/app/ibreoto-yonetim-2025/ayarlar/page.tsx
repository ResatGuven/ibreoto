"use client";
import React from 'react';

export default function AdminAyarlarPage() {
  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-heading font-bold text-secondary uppercase mb-6">Sistem Ayarları</h1>
      
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm max-w-2xl">
        <form className="space-y-4">
          <div>
            <label className="block text-text-muted mb-1 text-sm font-body">Site Başlığı</label>
            <input type="text" defaultValue="ibreoto | İbreni Yüksel, Yolunu Belirle" className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-text-muted mb-1 text-sm font-body">Site Açıklaması</label>
            <textarea defaultValue="Aracını Tamamla, Yola Koy. 500'den fazla orijinal araba aksesuarı..." rows={3} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary outline-none"></textarea>
          </div>
          <div>
            <label className="block text-text-muted mb-1 text-sm font-body">İletişim E-postası</label>
            <input type="email" defaultValue="destek@ibreoto.com" className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary outline-none" />
          </div>
          <button type="button" className="bg-primary hover:bg-primary-hover text-white px-4 py-3 rounded-xl font-heading font-bold uppercase tracking-wider transition-colors">
            Ayarları Kaydet
          </button>
        </form>
      </div>
    </div>
  );
}
