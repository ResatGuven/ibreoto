"use client";

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, ChefHat, Clock, Gauge, Heart, Utensils, 
  Plus, X, RefreshCw, Key, ShieldCheck, HelpCircle, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

// Predefined popular pantry ingredients
const PRESETS = [
  { id: 'yulaf', label: 'Yulaf Ezmesi', category: 'Kuru Gıda' },
  { id: 'muz', label: 'Muz', category: 'Meyve' },
  { id: 'elma', label: 'Elma', category: 'Meyve' },
  { id: 'limon', label: 'Limon', category: 'Meyve' },
  { id: 'ceviz', label: 'Ceviz İçi', category: 'Kuruyemiş' },
  { id: 'badem', label: 'Badem', category: 'Kuruyemiş' },
  { id: 'yogurt', label: 'Süzme Yoğurt', category: 'Süt Ürünleri' },
  { id: 'sut', label: 'Süt', category: 'Süt Ürünleri' },
  { id: 'tavuk', label: 'Tavuk Göğsü', category: 'Et' },
  { id: 'sarimsak', label: 'Sarımsak', category: 'Sebze' },
  { id: 'zencefil', label: 'Taze Zencefil', category: 'Sebze' },
  { id: 'tarcin', label: 'Toz Tarçın', category: 'Baharat' },
  { id: 'chia', label: 'Chia Tohumu', category: 'Süper Gıda' },
  { id: 'yesilcay', label: 'Yeşil Çay', category: 'İçecek' }
];

export default function RecipeWizardPage() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>(['Yulaf Ezmesi', 'Muz', 'Ceviz İçi']);
  const [customIngredient, setCustomIngredient] = useState('');
  const [geminiKey, setGeminiKey] = useState('');
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<any>(null);
  const [isFallback, setIsFallback] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved Gemini Key from localStorage on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('ari_hayat_gemini_key');
    if (savedKey) {
      setGeminiKey(savedKey);
    }
  }, []);

  const handleSaveKey = () => {
    localStorage.setItem('ari_hayat_gemini_key', geminiKey);
    setShowKeyInput(false);
  };

  const toggleIngredient = (name: string) => {
    if (selectedIngredients.includes(name)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== name));
    } else {
      setSelectedIngredients([...selectedIngredients, name]);
    }
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customIngredient.trim();
    if (trimmed && !selectedIngredients.includes(trimmed)) {
      setSelectedIngredients([...selectedIngredients, trimmed]);
      setCustomIngredient('');
    }
  };

  const handleGenerateRecipe = async () => {
    if (selectedIngredients.length === 0) {
      setError("Lütfen en az bir malzeme seçin veya ekleyin.");
      return;
    }

    setLoading(true);
    setError(null);
    setRecipe(null);

    try {
      const res = await fetch('/api/recipes/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          geminiKey: geminiKey.trim() || null,
          ingredients: selectedIngredients
        })
      });

      const data = await res.json();
      if (data.success && data.data) {
        setRecipe(data.data);
        setIsFallback(data.isFallback);
        if (data.isFallback && !geminiKey) {
          // Informative note if no api key was entered
          setError("Not: Özel AI tarifi için API Anahtarı girilmediğinden hazır tariflerden biri sunulmuştur.");
        }
      } else {
        setError(data.error || "Tarif oluşturulurken bir hata meydana geldi.");
      }
    } catch (e) {
      setError("Bağlantı hatası. Lütfen tekrar deneyin.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex w-16 h-16 bg-gradient-to-br from-primary/20 to-amber-500/20 border border-primary/30 rounded-2xl items-center justify-center text-primary mb-2 shadow-lg">
            <ChefHat className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-tight leading-none">
            Akıllı Ballı Tarifler <span className="text-primary">Sihirbazı</span>
          </h1>
          <p className="max-w-xl mx-auto text-xs text-gray-400 font-body leading-relaxed">
            Evinizdeki malzemeleri seçin, yapay zeka şeker yerine şifa kaynağı ballarımızla hazırlayabileceğiniz en özel, lezzetli ve sağlıklı tarifleri hazırlasın!
          </p>
        </div>

        {/* Configuration Bar */}
        <div className="bg-[#111827]/30 border border-gray-800/80 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-primary" />
            <span className="text-xs text-gray-400 font-body">
              {geminiKey ? "Premium Yapay Zeka Modu Aktif ✓" : "Yapay Zeka Modu (Hazır Tarifler Aktif)"}
            </span>
          </div>
          <button 
            onClick={() => setShowKeyInput(!showKeyInput)}
            className="text-xs text-primary hover:text-white underline font-bold uppercase transition-colors"
          >
            {geminiKey ? "API Anahtarını Değiştir" : "API Anahtarı Ekle (Kişisel Tarifler İçin)"}
          </button>
        </div>

        {/* API Key Modal/Input Block */}
        {showKeyInput && (
          <div className="bg-[#111827]/80 border border-primary/20 rounded-2xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-heading font-black text-white uppercase tracking-wider">Gemini API Anahtarı</h3>
            <p className="text-xs text-gray-400 font-body leading-relaxed">
              Kilerinizdeki malzemelere göre sınırsız özgün tarifler üretmek için ücretsiz bir Gemini API Anahtarı girin. Bu anahtar sunucularımıza kaydedilmez, sadece tarayıcınızda yerel olarak saklanır.
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                placeholder="AIzaSy..."
                value={geminiKey}
                onChange={(e) => setGeminiKey(e.target.value)}
                className="flex-1 bg-[#1F2937]/50 border border-gray-800 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-primary"
              />
              <button 
                onClick={handleSaveKey}
                className="bg-primary hover:bg-amber-600 text-secondary font-heading font-black text-xs uppercase px-4 py-2 rounded-xl transition-all"
              >
                Kaydet
              </button>
            </div>
          </div>
        )}

        {/* Main Interface Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Ingredients Picker */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-[#111827]/40 border border-gray-800 rounded-3xl p-6 md:p-8 space-y-6">
              
              <div className="space-y-1">
                <h2 className="text-sm font-heading font-black text-white uppercase tracking-wider">1. Kilerinizde Ne Var?</h2>
                <p className="text-xs text-gray-500 font-body">Mutfaktaki malzemelerinizden seçin veya yazın.</p>
              </div>

              {/* Selected List Pills */}
              {selectedIngredients.length > 0 ? (
                <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-800/80">
                  {selectedIngredients.map(ing => (
                    <span 
                      key={ing} 
                      className="inline-flex items-center gap-1 bg-primary/10 text-primary border border-primary/20 text-xs px-3 py-1 rounded-full font-body"
                    >
                      {ing}
                      <button onClick={() => toggleIngredient(ing)} className="hover:text-white">
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-600 italic font-body py-2">Henüz malzeme seçilmedi...</p>
              )}

              {/* Custom Add Form */}
              <form onSubmit={handleAddCustom} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Başka bir malzeme ekle..."
                  value={customIngredient}
                  onChange={(e) => setCustomIngredient(e.target.value)}
                  className="flex-1 bg-[#1F2937]/30 border border-gray-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-primary/50"
                />
                <button 
                  type="submit"
                  className="p-2.5 bg-gray-800 hover:bg-primary text-gray-400 hover:text-secondary rounded-xl transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>

              {/* Presets List */}
              <div className="space-y-3">
                <h4 className="text-[10px] font-heading font-black text-gray-500 uppercase tracking-widest">Önerilen Kiler Malzemeleri</h4>
                <div className="grid grid-cols-2 gap-2">
                  {PRESETS.map(preset => {
                    const isSelected = selectedIngredients.includes(preset.label);
                    return (
                      <button
                        key={preset.id}
                        onClick={() => toggleIngredient(preset.label)}
                        className={`text-left text-xs p-2.5 rounded-xl border transition-all ${
                          isSelected 
                            ? 'bg-primary/5 border-primary/40 text-primary' 
                            : 'bg-black/20 border-gray-800 hover:border-gray-700 text-gray-400'
                        }`}
                      >
                        <div className="font-bold truncate">{preset.label}</div>
                        <div className="text-[9px] text-gray-600 font-body">{preset.category}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Run Trigger Button */}
              <button
                onClick={handleGenerateRecipe}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-primary to-amber-700 hover:from-amber-600 hover:to-amber-800 disabled:from-gray-800 disabled:to-gray-900 text-secondary disabled:text-gray-500 font-heading font-black text-xs uppercase rounded-2xl transition-all shadow-lg flex items-center justify-center gap-2 transform active:scale-95"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Tarif Hazırlanıyor...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Şifalı Tarif Üret
                  </>
                )}
              </button>

            </div>
          </div>

          {/* Right Panel: Recipe Showcase */}
          <div className="md:col-span-7 space-y-6">
            
            {error && (
              <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs rounded-2xl leading-relaxed font-body">
                {error}
              </div>
            )}

            {recipe ? (
              <div className="bg-[#111827]/40 border border-gray-800 rounded-3xl p-6 md:p-8 space-y-8 animate-fade-in relative overflow-hidden">
                
                {/* Visual Glow */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-[60px] pointer-events-none" />

                {/* Recipe Badge and Title */}
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full font-heading font-black uppercase tracking-wider">
                      {isFallback ? "Arı Hayat Klasiği" : "Özel AI Tarifi"}
                    </span>
                    <span className="text-[9px] bg-gray-800 text-gray-400 px-2.5 py-0.5 rounded-full font-heading font-black uppercase tracking-wider flex items-center gap-1">
                      <Clock className="w-3 h-3 text-primary" /> {recipe.prepTime}
                    </span>
                    <span className="text-[9px] bg-gray-800 text-gray-400 px-2.5 py-0.5 rounded-full font-heading font-black uppercase tracking-wider flex items-center gap-1">
                      <Gauge className="w-3 h-3 text-primary" /> {recipe.difficulty}
                    </span>
                  </div>
                  <h2 className="text-xl md:text-2xl font-heading font-black text-white uppercase tracking-tight">
                    {recipe.name}
                  </h2>
                </div>

                {/* Honey Recommendation Callout */}
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl space-y-1">
                  <div className="text-[9px] font-heading font-black text-primary uppercase tracking-widest flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Tercih Edilen Bal & Nedeni
                  </div>
                  <p className="text-xs text-gray-300 font-body leading-relaxed">
                    {recipe.honeyUsage}
                  </p>
                </div>

                {/* Ingredients List */}
                <div className="space-y-3">
                  <h4 className="text-[10px] font-heading font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-primary" /> Tarif İçin Malzemeler
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {recipe.ingredients.map((item: string, idx: number) => (
                      <li key={idx} className="text-xs text-gray-300 font-body flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Step by Step Instructions */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-heading font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                    <ChefHat className="w-4 h-4 text-primary" /> Hazırlanışı
                  </h4>
                  <ol className="space-y-3">
                    {recipe.instructions.map((stepStr: string, idx: number) => (
                      <li key={idx} className="flex gap-3 items-start">
                        <span className="w-5 h-5 rounded-full bg-gray-800 text-[10px] text-primary flex items-center justify-center font-heading font-black shrink-0 border border-gray-700">
                          {idx + 1}
                        </span>
                        <p className="text-xs text-gray-300 font-body leading-relaxed pt-0.5">
                          {stepStr}
                        </p>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Health Benefits Card */}
                <div className="p-5 bg-gradient-to-r from-primary/10 to-amber-700/10 border border-primary/20 rounded-2xl space-y-2">
                  <h4 className="text-[10px] font-heading font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                    <Heart className="w-4 h-4 text-red-500 animate-pulse" /> Bu Tarifin Şifası & Faydaları
                  </h4>
                  <p className="text-xs text-gray-400 font-body leading-relaxed">
                    {recipe.benefits}
                  </p>
                </div>

                {/* Call-to-action link to shop */}
                <div className="pt-2 flex justify-end">
                  <Link 
                    href="/urunler" 
                    className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-white font-heading font-black uppercase tracking-wider transition-colors"
                  >
                    Şifalı Balları İncele <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>
            ) : (
              !loading && (
                <div className="bg-[#111827]/10 border border-gray-800/80 rounded-3xl p-12 text-center space-y-4">
                  <div className="w-12 h-12 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto text-gray-500">
                    <ChefHat className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-heading font-bold text-gray-300 uppercase">Tarif Sihirbazı Hazır</h3>
                    <p className="text-xs text-gray-500 font-body max-w-sm mx-auto leading-relaxed">
                      Kilerinizdeki malzemeleri yan taraftan seçtikten sonra &ldquo;Şifalı Tarif Üret&rdquo; butonuna basarak size özel hazırlanmış sağlıklı lezzetleri görebilirsiniz.
                    </p>
                  </div>
                </div>
              )
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
