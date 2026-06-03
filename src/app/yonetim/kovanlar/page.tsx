"use client";

import React, { useState, useEffect } from 'react';
import { 
  Plus, Trash2, Edit, Layers, MapPin, Thermometer, 
  Droplets, Users, Compass, Key, Calendar, Mail, Phone, Loader2
} from 'lucide-react';
import { useAdminToast } from '@/context/AdminToastContext';

export default function AdminHivesPage() {
  const [activeTab, setActiveTab] = useState<'hives' | 'adoptions'>('hives');
  
  // Data States
  const [hives, setHives] = useState<any[]>([]);
  const [adoptions, setAdoptions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states for Hives
  const [isAddingHive, setIsAddingHive] = useState(false);
  const [hiveForm, setHiveForm] = useState({
    id: '',
    name: '',
    status: 'ACTIVE',
    location: '',
    temperature: 34.5,
    humidity: 62.0,
    beeCount: 45000,
    description: '',
    image: ''
  });

  // Form states for Adoptions
  const [isAddingAdoption, setIsAddingAdoption] = useState(false);
  const [adoptionForm, setAdoptionForm] = useState({
    id: '',
    hiveId: '',
    code: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    startDate: '',
    endDate: '',
    status: 'ACTIVE'
  });

  const { showToast } = useAdminToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [hivesRes, adoptionsRes] = await Promise.all([
        fetch('/api/admin/hives'),
        fetch('/api/admin/adoptions')
      ]);

      if (hivesRes.ok) {
        const hivesData = await hivesRes.json();
        setHives(hivesData);
      }
      if (adoptionsRes.ok) {
        const adoptionsData = await adoptionsRes.json();
        setAdoptions(adoptionsData);
      }
    } catch (e) {
      showToast('Veriler çekilirken hata oluştu.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // --- HIVE CRUD ACTIONS ---
  const handleSaveHive = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hiveForm.name || !hiveForm.location) {
      showToast('Kovan adı ve lokasyonu zorunludur.', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/hives', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hiveForm)
      });

      if (res.ok) {
        showToast(hiveForm.id ? 'Kovan güncellendi' : 'Kovan eklendi', 'success');
        setIsAddingHive(false);
        setHiveForm({
          id: '',
          name: '',
          status: 'ACTIVE',
          location: '',
          temperature: 34.5,
          humidity: 62.0,
          beeCount: 45000,
          description: '',
          image: ''
        });
        // Refresh data
        fetchData();
      } else {
        showToast('Kovan kaydedilemedi.', 'error');
      }
    } catch (error) {
      showToast('Kovan kaydedilemedi.', 'error');
    }
  };

  const handleEditHive = (hive: any) => {
    setHiveForm({
      id: hive.id,
      name: hive.name || '',
      status: hive.status || 'ACTIVE',
      location: hive.location || '',
      temperature: hive.temperature || 34.5,
      humidity: hive.humidity || 62.0,
      beeCount: hive.beeCount || 45000,
      description: hive.description || '',
      image: hive.image || ''
    });
    setIsAddingHive(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteHive = async (id: string) => {
    if (!window.confirm('Bu kovanı silmek istediğinize emin misiniz? Kovanla ilişkili evlat edinme kayıtları da silinecektir.')) return;
    try {
      const res = await fetch(`/api/admin/hives?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Kovan silindi', 'success');
        fetchData();
      } else {
        showToast('Silme başarısız', 'error');
      }
    } catch (e) {
      showToast('Silme başarısız', 'error');
    }
  };

  // --- ADOPTION CRUD ACTIONS ---
  const handleSaveAdoption = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adoptionForm.hiveId || !adoptionForm.ownerName || !adoptionForm.ownerEmail) {
      showToast('Kovan seçimi, sahip adı ve e-posta alanları zorunludur.', 'error');
      return;
    }

    try {
      const res = await fetch('/api/admin/adoptions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adoptionForm)
      });

      if (res.ok) {
        showToast(adoptionForm.id ? 'Evlat edinme kaydı güncellendi' : 'Evlat edinme kaydı eklendi', 'success');
        setIsAddingAdoption(false);
        setAdoptionForm({
          id: '',
          hiveId: '',
          code: '',
          ownerName: '',
          ownerEmail: '',
          ownerPhone: '',
          startDate: '',
          endDate: '',
          status: 'ACTIVE'
        });
        fetchData();
      } else {
        showToast('Kayıt oluşturulamadı.', 'error');
      }
    } catch (error) {
      showToast('Kayıt oluşturulamadı.', 'error');
    }
  };

  const handleEditAdoption = (ad: any) => {
    setAdoptionForm({
      id: ad.id,
      hiveId: ad.hiveId,
      code: ad.code || '',
      ownerName: ad.ownerName || '',
      ownerEmail: ad.ownerEmail || '',
      ownerPhone: ad.ownerPhone || '',
      startDate: ad.startDate ? ad.startDate.split('T')[0] : '',
      endDate: ad.endDate ? ad.endDate.split('T')[0] : '',
      status: ad.status || 'ACTIVE'
    });
    setIsAddingAdoption(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteAdoption = async (id: string) => {
    if (!window.confirm('Bu evlat edinme kaydını silmek istediğinize emin misiniz?')) return;
    try {
      const res = await fetch(`/api/admin/adoptions?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        showToast('Kayıt silindi', 'success');
        fetchData();
      } else {
        showToast('Silme başarısız', 'error');
      }
    } catch (e) {
      showToast('Silme başarısız', 'error');
    }
  };

  return (
    <div className="p-6 bg-background min-h-screen text-text-main font-body">
      
      {/* Header and Toggle Navigation */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-heading font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-yellow-500 uppercase tracking-tight">Kovan & Evlat Edinme</h1>
          <p className="text-xs text-text-muted font-body mt-1">Kovanların fiziki/telemetri durumunu ve evlat edinme işlemlerini yönetin.</p>
        </div>
        
        {/* Tab Selector */}
        <div className="flex bg-[#111827] border border-gray-200 rounded-xl p-1 shrink-0">
          <button
            onClick={() => setActiveTab('hives')}
            className={`px-4 py-2 text-xs font-heading font-black uppercase rounded-lg transition-all ${
              activeTab === 'hives' ? 'bg-primary text-secondary' : 'text-text-muted hover:text-secondary'
            }`}
          >
            Fiziki Kovanlar
          </button>
          <button
            onClick={() => setActiveTab('adoptions')}
            className={`px-4 py-2 text-xs font-heading font-black uppercase rounded-lg transition-all ${
              activeTab === 'adoptions' ? 'bg-primary text-secondary' : 'text-text-muted hover:text-secondary'
            }`}
          >
            Evlat Edinmeler
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <>
          {/* TAB 1: HIVES PORTAL */}
          {activeTab === 'hives' && (
            <div className="space-y-6">
              
              {/* Trigger Button & Add Form */}
              <div className="flex justify-end">
                {!isAddingHive && (
                  <button
                    onClick={() => {
                      setHiveForm({ id: '', name: '', status: 'ACTIVE', location: '', temperature: 34.5, humidity: 62.0, beeCount: 45000, description: '', image: '' });
                      setIsAddingHive(true);
                    }}
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-secondary px-4 py-2 rounded-xl font-heading font-bold text-xs uppercase flex items-center transition-all shadow-lg"
                  >
                    <Plus className="w-4 h-4 mr-1.5" /> Yeni Kovan Ekle
                  </button>
                )}
              </div>

              {isAddingHive && (
                <div className="bg-white border-gray-200 shadow-sm backdrop-blur-xl p-6 rounded-2xl border border-gray-200 shadow-xl">
                  <h2 className="text-sm font-heading font-black text-secondary uppercase tracking-wider mb-6 flex items-center gap-1.5">
                    <Layers className="w-5 h-5 text-primary" /> {hiveForm.id ? 'Kovan Bilgilerini Güncelle' : 'Yeni Fiziki Kovan Ekle'}
                  </h2>
                  <form onSubmit={handleSaveHive} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">Kovan Adı</label>
                        <input
                          type="text"
                          required
                          placeholder="Örn: Kovan Altın Petek"
                          value={hiveForm.name}
                          onChange={e => setHiveForm({...hiveForm, name: e.target.value})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">Lokasyon</label>
                        <input
                          type="text"
                          required
                          placeholder="Örn: Rize, Anzer Yaylası"
                          value={hiveForm.location}
                          onChange={e => setHiveForm({...hiveForm, location: e.target.value})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">Durum</label>
                        <select
                          value={hiveForm.status}
                          onChange={e => setHiveForm({...hiveForm, status: e.target.value})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary font-bold"
                        >
                          <option value="ACTIVE">AKTİF</option>
                          <option value="MAINTENANCE">BAKIMDA</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">Sıcaklık (°C)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={hiveForm.temperature}
                          onChange={e => setHiveForm({...hiveForm, temperature: parseFloat(e.target.value) || 0})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">Nem (%)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={hiveForm.humidity}
                          onChange={e => setHiveForm({...hiveForm, humidity: parseFloat(e.target.value) || 0})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">Arı Sayısı (Tahmini)</label>
                        <input
                          type="number"
                          value={hiveForm.beeCount}
                          onChange={e => setHiveForm({...hiveForm, beeCount: parseInt(e.target.value) || 0})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">Görsel / Video Döngü Linki</label>
                        <input
                          type="text"
                          placeholder="Unsplash görsel adresi veya mp4 kovan kamerası video linki"
                          value={hiveForm.image}
                          onChange={e => setHiveForm({...hiveForm, image: e.target.value})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">Açıklama & Notlar</label>
                        <textarea
                          placeholder="Kovan hakkında detaylı bilgileri yazın..."
                          value={hiveForm.description}
                          onChange={e => setHiveForm({...hiveForm, description: e.target.value})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary min-h-[100px]"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingHive(false)}
                        className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg font-bold text-xs uppercase transition-colors"
                      >
                        İptal
                      </button>
                      <button
                        type="submit"
                        className="bg-primary hover:bg-amber-600 text-secondary px-4 py-2 rounded-lg font-heading font-black text-xs uppercase transition-all"
                      >
                        {hiveForm.id ? 'Güncelle' : 'Kaydet'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Hives List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {hives.map(hive => (
                  <div key={hive.id} className="bg-white border-gray-200 shadow-sm border border-gray-200/80 rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between">
                    
                    {hive.image && (
                      <div className="w-full h-32 bg-gray-900 rounded-xl overflow-hidden mb-4 border border-gray-200">
                        {hive.image.endsWith('.mp4') ? (
                          <video src={hive.image} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                        ) : (
                          <img src={hive.image} alt={hive.name} className="w-full h-full object-cover" />
                        )}
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-base font-heading font-black text-secondary uppercase tracking-tight">{hive.name}</h3>
                          <p className="text-xs text-gray-500 font-body flex items-center mt-1">
                            <MapPin className="w-3 h-3 text-primary mr-1" /> {hive.location}
                          </p>
                        </div>
                        <span className={`text-[9px] px-2 py-0.5 rounded font-heading font-black ${
                          hive.status === 'ACTIVE' 
                            ? 'bg-green-900/20 text-green-400 border border-green-500/20' 
                            : 'bg-red-900/20 text-red-400 border border-red-500/20'
                        }`}>
                          {hive.status === 'ACTIVE' ? 'AKTİF' : 'BAKIMDA'}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 bg-black/20 p-3 rounded-xl">
                        <div className="text-center">
                          <span className="text-[9px] text-gray-500 uppercase block font-body">Sıcaklık</span>
                          <span className="text-xs font-heading font-bold text-secondary flex items-center justify-center mt-0.5">
                            <Thermometer className="w-3 h-3 text-red-400 mr-0.5" /> {hive.temperature}°C
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="text-[9px] text-gray-500 uppercase block font-body">Nem</span>
                          <span className="text-xs font-heading font-bold text-secondary flex items-center justify-center mt-0.5">
                            <Droplets className="w-3 h-3 text-blue-400 mr-0.5" /> {hive.humidity}%
                          </span>
                        </div>
                        <div className="text-center">
                          <span className="text-[9px] text-gray-500 uppercase block font-body">Arı Sayısı</span>
                          <span className="text-xs font-heading font-bold text-secondary flex items-center justify-center mt-0.5">
                            <Users className="w-3 h-3 text-primary mr-0.5" /> {hive.beeCount.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-text-muted leading-relaxed font-body line-clamp-2">
                        {hive.description || "Açıklama girilmemiş."}
                      </p>
                    </div>

                    <div className="flex justify-end space-x-2 mt-6 pt-4 border-t border-gray-200/80">
                      <button
                        onClick={() => handleEditHive(hive)}
                        className="p-2 text-text-muted hover:text-secondary transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteHive(hive.id)}
                        className="p-2 text-red-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                ))}

                {hives.length === 0 && (
                  <div className="col-span-2 text-center py-20 bg-[#111827]/10 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-gray-500 uppercase text-sm font-heading font-bold">Kayıtlı kovan bulunamadı.</p>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* TAB 2: ADOPTIONS PORTAL */}
          {activeTab === 'adoptions' && (
            <div className="space-y-6">
              
              {/* Trigger Button & Add Form */}
              <div className="flex justify-end">
                {!isAddingAdoption && (
                  <button
                    onClick={() => {
                      setAdoptionForm({ id: '', hiveId: hives[0]?.id || '', code: '', ownerName: '', ownerEmail: '', ownerPhone: '', startDate: '', endDate: '', status: 'ACTIVE' });
                      setIsAddingAdoption(true);
                    }}
                    disabled={hives.length === 0}
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-secondary disabled:from-gray-800 disabled:to-gray-900 disabled:text-gray-500 px-4 py-2 rounded-xl font-heading font-bold text-xs uppercase flex items-center transition-all shadow-lg"
                  >
                    <Plus className="w-4 h-4 mr-1.5" /> Yeni Evlat Edinme Kaydı
                  </button>
                )}
              </div>

              {isAddingAdoption && (
                <div className="bg-white border-gray-200 shadow-sm backdrop-blur-xl p-6 rounded-2xl border border-gray-200 shadow-xl">
                  <h2 className="text-sm font-heading font-black text-secondary uppercase tracking-wider mb-6 flex items-center gap-1.5">
                    <Compass className="w-5 h-5 text-primary" /> {adoptionForm.id ? 'Evlat Edinme Kaydını Düzenle' : 'Yeni Evlat Edinme Oluştur'}
                  </h2>
                  <form onSubmit={handleSaveAdoption} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">Kovan Seçin</label>
                        <select
                          value={adoptionForm.hiveId}
                          onChange={e => setAdoptionForm({...adoptionForm, hiveId: e.target.value})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary font-bold"
                        >
                          <option value="">Seçiniz...</option>
                          {hives.map(hive => (
                            <option key={hive.id} value={hive.id}>{hive.name} ({hive.location})</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">Evlat Edinme Kodu (Boş bırakılırsa otomatik üretilir)</label>
                        <input
                          type="text"
                          placeholder="Örn: KOV-7492"
                          value={adoptionForm.code}
                          onChange={e => setAdoptionForm({...adoptionForm, code: e.target.value})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">Durum</label>
                        <select
                          value={adoptionForm.status}
                          onChange={e => setAdoptionForm({...adoptionForm, status: e.target.value})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary font-bold"
                        >
                          <option value="ACTIVE">AKTİF</option>
                          <option value="EXPIRED">SÜRESİ DOLMUŞ</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">Sahip Adı Soyadı</label>
                        <input
                          type="text"
                          required
                          placeholder="Örn: Ahmet Yılmaz"
                          value={adoptionForm.ownerName}
                          onChange={e => setAdoptionForm({...adoptionForm, ownerName: e.target.value})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">E-Posta</label>
                        <input
                          type="email"
                          required
                          placeholder="Örn: ahmet@gmail.com"
                          value={adoptionForm.ownerEmail}
                          onChange={e => setAdoptionForm({...adoptionForm, ownerEmail: e.target.value})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">Telefon (İsteğe Bağlı)</label>
                        <input
                          type="text"
                          placeholder="Örn: 053X XXX XX XX"
                          value={adoptionForm.ownerPhone}
                          onChange={e => setAdoptionForm({...adoptionForm, ownerPhone: e.target.value})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">Başlangıç Tarihi</label>
                        <input
                          type="date"
                          value={adoptionForm.startDate}
                          onChange={e => setAdoptionForm({...adoptionForm, startDate: e.target.value})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary"
                        />
                      </div>
                      <div>
                        <label className="block text-text-muted mb-1 text-xs uppercase font-bold">Bitiş Tarihi</label>
                        <input
                          type="date"
                          value={adoptionForm.endDate}
                          onChange={e => setAdoptionForm({...adoptionForm, endDate: e.target.value})}
                          className="w-full p-3 bg-gray-50 border-gray-200/50 border border-gray-200 rounded-lg text-xs text-secondary outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddingAdoption(false)}
                        className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg font-bold text-xs uppercase transition-colors"
                      >
                        İptal
                      </button>
                      <button
                        type="submit"
                        className="bg-primary hover:bg-amber-600 text-secondary px-4 py-2 rounded-lg font-heading font-black text-xs uppercase transition-all"
                      >
                        {adoptionForm.id ? 'Güncelle' : 'Kaydet'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Adoptions Table/List */}
              <div className="bg-white border-gray-200 shadow-sm border border-gray-200/80 rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-gray-200 text-[10px] uppercase font-heading font-black text-gray-500 bg-black/10">
                        <th className="p-4">Evlat Edinme Kodu</th>
                        <th className="p-4">Sahip Bilgileri</th>
                        <th className="p-4">İlişkili Kovan</th>
                        <th className="p-4">Tarih Aralığı</th>
                        <th className="p-4">Durum</th>
                        <th className="p-4 text-right">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800/50">
                      {adoptions.map(ad => (
                        <tr key={ad.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="p-4 font-heading font-bold text-primary tracking-wider">
                            <span className="flex items-center gap-1.5">
                              <Key className="w-3.5 h-3.5" /> {ad.code}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="font-heading font-bold text-secondary uppercase">{ad.ownerName}</div>
                            <div className="text-[10px] text-gray-500 font-body flex items-center mt-1 gap-1">
                              <Mail className="w-3 h-3 shrink-0" /> {ad.ownerEmail}
                            </div>
                            {ad.ownerPhone && (
                              <div className="text-[10px] text-gray-500 font-body flex items-center mt-0.5 gap-1">
                                <Phone className="w-3 h-3 shrink-0" /> {ad.ownerPhone}
                              </div>
                            )}
                          </td>
                          <td className="p-4 font-body">
                            {ad.hive ? (
                              <div>
                                <span className="font-bold text-secondary uppercase">{ad.hive.name}</span>
                                <span className="text-[9px] text-gray-500 block">{ad.hive.location}</span>
                              </div>
                            ) : (
                              <span className="text-red-400 italic">Bilinmeyen Kovan</span>
                            )}
                          </td>
                          <td className="p-4 font-body text-text-muted">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-primary shrink-0" />
                              <span>{new Date(ad.startDate).toLocaleDateString('tr-TR')}</span>
                              <span className="text-gray-600">-</span>
                              <span>{new Date(ad.endDate).toLocaleDateString('tr-TR')}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className={`text-[9px] px-2 py-0.5 rounded font-heading font-black ${
                              ad.status === 'ACTIVE' 
                                ? 'bg-green-900/20 text-green-400 border border-green-500/20' 
                                : 'bg-gray-900 text-gray-500 border border-gray-200'
                            }`}>
                              {ad.status === 'ACTIVE' ? 'AKTİF' : 'SÜRESİ DOLDU'}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => handleEditAdoption(ad)}
                                className="p-1.5 text-text-muted hover:text-secondary transition-colors"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteAdoption(ad.id)}
                                className="p-1.5 text-red-500 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}

                      {adoptions.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center py-20 text-gray-500 font-heading font-bold uppercase">
                            Evlat edinme kaydı bulunamadı.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}
        </>
      )}

    </div>
  );
}
