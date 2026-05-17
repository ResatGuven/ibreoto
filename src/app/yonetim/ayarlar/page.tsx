"use client";

import React, { useState, useEffect } from 'react';
import { Save, Globe, Phone, Mail, MapPin, MessageSquare, Facebook, Instagram, Twitter, ShieldAlert } from 'lucide-react';
import { useAdminToast } from '@/context/AdminToastContext';

export default function AdminSettingsPage() {
  const { showToast } = useAdminToast();
  const [settings, setSettings] = useState<any>({
    siteName: 'Arı Hayat',
    siteDescription: '%100 Doğal Bal, Propolis ve Arı Ürünleri. Kendi arılıklarımızdan üreticiden taze teslimat.',
    contactEmail: 'destek@arihayat.com',
    contactPhone: '0536 341 19 84',
    address: 'Bursa, Türkiye',
    whatsappNumber: '905353377251',
    facebookUrl: '',
    instagramUrl: 'https://www.instagram.com/arihayat',
    twitterUrl: '',
    announcementBar: '🐝 Ücretsiz Kargo: 1.500 TL ve Üzeri Alışverişlerde! Doğal ürünler, güvenilir teslimat.',
    isMaintenance: false
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/admin/settings');
      const data = await res.json();
      if (data && !data.error) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        showToast('Ayarlar başarıyla kaydedildi!', 'success');
      }
    } catch (error) {
      showToast('Kaydedilirken hata oluştu.', 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-8 text-white text-center">Yükleniyor...</div>;

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-700 uppercase">Genel Site Ayarları</h1>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-primary to-amber-700 hover:from-amber-600 hover:to-amber-800 text-secondary px-8 py-3 rounded-xl font-heading font-bold text-sm uppercase flex items-center transition-all shadow-lg shadow-primary/20"
        >
          <Save className="w-4 h-4 mr-2" /> {saving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Temel Bilgiler */}
        <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg space-y-4">
          <h2 className="text-lg font-heading font-bold text-white mb-4 flex items-center uppercase">
            <Globe className="w-5 h-5 mr-2 text-primary" /> Kurumsal Bilgiler
          </h2>
          <div>
            <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Site Başlığı</label>
            <input 
              type="text" 
              value={settings.siteName} 
              onChange={e => setSettings({...settings, siteName: e.target.value})} 
              className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-primary" 
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Site Açıklaması (Slogan)</label>
            <input 
              type="text" 
              value={settings.siteDescription} 
              onChange={e => setSettings({...settings, siteDescription: e.target.value})} 
              className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-primary" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-400 mb-1 text-xs font-body uppercase">E-Posta</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                <input 
                  type="email" 
                  value={settings.contactEmail} 
                  onChange={e => setSettings({...settings, contactEmail: e.target.value})} 
                  className="w-full p-3 pl-10 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-primary" 
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Telefon</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  value={settings.contactPhone} 
                  onChange={e => setSettings({...settings, contactPhone: e.target.value})} 
                  className="w-full p-3 pl-10 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-primary" 
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Adres</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <textarea 
                value={settings.address} 
                onChange={e => setSettings({...settings, address: e.target.value})} 
                className="w-full p-3 pl-10 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-primary" 
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Sosyal Medya & İletişim */}
        <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg space-y-4">
          <h2 className="text-lg font-heading font-bold text-white mb-4 flex items-center uppercase">
            <MessageSquare className="w-5 h-5 mr-2 text-primary" /> Sosyal Medya & Kanallar
          </h2>
          <div>
            <label className="block text-gray-400 mb-1 text-xs font-body uppercase">WhatsApp Hattı (Numara)</label>
            <input 
              type="text" 
              value={settings.whatsappNumber} 
              onChange={e => setSettings({...settings, whatsappNumber: e.target.value})} 
              placeholder="905XXXXXXXXX"
              className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-primary" 
            />
          </div>
          <div className="space-y-4">
            <div className="relative">
              <Facebook className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <input type="text" value={settings.facebookUrl} onChange={e => setSettings({...settings, facebookUrl: e.target.value})} placeholder="Facebook Linki" className="w-full p-3 pl-10 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-primary" />
            </div>
            <div className="relative">
              <Instagram className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <input type="text" value={settings.instagramUrl} onChange={e => setSettings({...settings, instagramUrl: e.target.value})} placeholder="Instagram Linki" className="w-full p-3 pl-10 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-primary" />
            </div>
            <div className="relative">
              <Twitter className="absolute left-3 top-3.5 w-4 h-4 text-gray-500" />
              <input type="text" value={settings.twitterUrl} onChange={e => setSettings({...settings, twitterUrl: e.target.value})} placeholder="X (Twitter) Linki" className="w-full p-3 pl-10 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-primary" />
            </div>
          </div>
        </div>

        {/* Duyuru & Bakım Modu */}
        <div className="lg:col-span-2 bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg">
          <h2 className="text-lg font-heading font-bold text-white mb-4 flex items-center uppercase">
            <ShieldAlert className="w-5 h-5 mr-2 text-primary" /> Kritik Durumlar & Duyurular
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Üst Duyuru Barı (Announcement)</label>
              <input 
                type="text" 
                value={settings.announcementBar} 
                onChange={e => setSettings({...settings, announcementBar: e.target.value})} 
                placeholder="Örn: Tüm ürünlerde %15 indirim! Kod: ARIHAYAT15"
                className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-lg text-white outline-none focus:border-primary" 
              />
            </div>
            <div className="flex items-center space-x-4 p-4 bg-[#1F2937] rounded-xl border border-gray-700 mt-5">
              <input 
                type="checkbox" 
                checked={settings.isMaintenance} 
                onChange={e => setSettings({...settings, isMaintenance: e.target.checked})}
                className="w-6 h-6 accent-primary cursor-pointer" 
              />
              <div>
                <p className="font-heading font-bold text-sm text-white uppercase">Siteyi Bakım Moduna Al</p>
                <p className="text-[10px] text-gray-500 uppercase">Aktif edilirse ziyaretçiler "Bakım Çalışması Var" ekranı görür.</p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
