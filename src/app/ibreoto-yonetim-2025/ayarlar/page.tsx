// Güncellendi
"use client";
import React from 'react';

export default function AdminAyarlarPage() {
  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100">
      <h1 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 uppercase mb-6">Sistem Ayarları</h1>
      
      <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg max-w-2xl">
        <form className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1 text-sm font-body">Site Başlığı</label>
            <input type="text" defaultValue="ibreoto | İbreni Yüksel, Yolunu Belirle" className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white" />
          </div>
          <div>
            <label className="block text-gray-400 mb-1 text-sm font-body">Site Açıklaması</label>
            <textarea defaultValue="Aracını Tamamla, Yola Koy. 500'den fazla orijinal araba aksesuarı..." rows={3} className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white"></textarea>
          </div>
          <div>
            <label className="block text-gray-400 mb-1 text-sm font-body">İletişim E-postası</label>
            <input type="email" defaultValue="destek@ibreoto.com" className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white" />
          </div>
          <button type="button" className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-heading font-bold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-red-500/20 transform hover:scale-105">
            Ayarları Kaydet
          </button>
        </form>
      </div>
    </div>
  );
}
