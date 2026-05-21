"use client";

import React, { useState } from 'react';
import { Layers, ShieldCheck, Heart, Sparkles, AlertCircle, Info } from 'lucide-react';

interface HiveLayer {
  id: string;
  title: string;
  turkishTitle: string;
  description: string;
  icon: React.ReactNode;
  fact: string;
  tempRange: string;
  colorClass: string;
  offsetY: string;
}

export function HiveAnatomyExplorer() {
  const [selectedLayer, setSelectedLayer] = useState<string>('super');

  const layers: HiveLayer[] = [
    {
      id: 'roof',
      title: 'Outer Cover',
      turkishTitle: 'Teleskobik Kovan Kapağı (Çatı)',
      description: 'Kovanın en üstünde yer alan, kovanı yağmur, kar, rüzgar ve doğrudan güneş ışınlarından koruyan metal kaplı yalıtımlı çatı tabakasıdır. Kovan içi ısı ve nem dengesini korumada kritik rol oynar.',
      icon: <ShieldCheck className="w-5 h-5" />,
      fact: 'Çatının yalıtımı iyi olmazsa arılar kışın donabilir, yazın ise kovanı soğutmak için bal tüketmek yerine sürekli kanat çırpmak zorunda kalır.',
      tempRange: 'Dış ortam sıcaklığına göre tampon bölge oluşturur.',
      colorClass: 'from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600',
      offsetY: 'hover:-translate-y-4'
    },
    {
      id: 'super',
      title: 'Honey Super',
      turkishTitle: 'Ballık Katı (Bal Deposu)',
      description: 'Sadece arıların ürettiği fazla balı depolamaları için kuluçkalığın üzerine yerleştirilen kattır. Bizim hasat ettiğimiz hakiki, katkısız ballar işte bu ballık katındaki peteklerden sağılır.',
      icon: <Sparkles className="w-5 h-5" />,
      fact: 'Arılar 1 gram bal yapabilmek için yaklaşık 120.000 adet çiçeği ziyaret eder ve ballık katına taşır.',
      tempRange: 'Optimum bal olgunlaşması için 33°C - 35°C',
      colorClass: 'from-amber-500 via-yellow-500 to-amber-600 hover:brightness-110',
      offsetY: 'hover:-translate-y-2'
    },
    {
      id: 'brood',
      title: 'Brood Chamber',
      turkishTitle: 'Kuluçkalık (Kovanın Kalbi)',
      description: 'Kraliçe arının yumurtladığı, işçi arıların larva ve pupaları büyüttüğü, arı kolonisinin yaşam ve üreme alanıdır. Burada arı sütü salgılanır, polen ve arı ekmeği depolanır.',
      icon: <Heart className="w-5 h-5" />,
      fact: 'Kraliçe arı kuluçkalıkta günde kendi ağırlığının iki katı kadar, yani yaklaşık 1500-2000 adet yumurta bırakabilir.',
      tempRange: 'Yavruların gelişimi için sabit 34.5°C - 35.5°C olmalıdır.',
      colorClass: 'from-amber-700 to-amber-900 hover:from-amber-650 hover:to-amber-800',
      offsetY: 'hover:translate-y-1'
    },
    {
      id: 'board',
      title: 'Bottom Board',
      turkishTitle: 'Uçuş Tahtası & Polen Tuzağı',
      description: 'Kovanın en alt kısmıdır. Arıların dış dünyaya açılan kapısıdır. Modern kovanlarımızda polen çekmeceli uçuş tahtaları kullanılarak arıların ayaklarındaki fazla polenler zarar görmeden hasat edilir.',
      icon: <Layers className="w-5 h-5" />,
      fact: 'Uçuş tahtası aynı zamanda kovanın havalandırma merkezidir; nöbetçi arılar burada kanat çırparak kovanı serinletir.',
      tempRange: 'Hava sirkülasyonu ve nem kontrol tabanı.',
      colorClass: 'from-slate-700 to-slate-900 hover:from-slate-650 hover:to-slate-800',
      offsetY: 'hover:translate-y-3'
    }
  ];

  const currentLayer = layers.find(l => l.id === selectedLayer) || layers[1];

  return (
    <div className="bg-[#111827]/40 border border-gray-800 p-8 rounded-[2.5rem] backdrop-blur-xl font-body shadow-2xl relative overflow-hidden">
      
      {/* Decors */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
        
        {/* Left: 3D-like Interactive Stack */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center py-8">
          <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mb-8 font-heading text-center">
            Etkileşimli Kovan Yapısı
          </p>
          
          <div className="relative w-72 h-[340px] flex flex-col items-center gap-1.5 Perspective-1000">
            {layers.map((layer) => {
              const isSelected = selectedLayer === layer.id;
              return (
                <div
                  key={layer.id}
                  onClick={() => setSelectedLayer(layer.id)}
                  className={`
                    w-full cursor-pointer transition-all duration-500 ease-out transform
                    bg-gradient-to-r ${layer.colorClass}
                    border ${isSelected ? 'border-primary shadow-2xl shadow-primary/30 scale-105 z-20' : 'border-gray-800/40 hover:border-amber-500/40 scale-100 z-10'}
                    rounded-2xl p-4 flex items-center justify-between text-white font-heading font-black uppercase tracking-wider text-xs
                    ${layer.offsetY} Rotate-X-20 Preserve-3d shadow-xl
                  `}
                  style={{
                    height: layer.id === 'roof' ? '60px' : layer.id === 'board' ? '50px' : '90px',
                    transform: isSelected ? 'rotateX(15deg) translateZ(20px) scale(1.05)' : 'rotateX(20deg)'
                  }}
                >
                  <span className="flex items-center gap-2">
                    {layer.icon}
                    {layer.turkishTitle.split(' ')[0]} {/* Short name */}
                  </span>
                  
                  {isSelected && (
                    <span className="text-[9px] bg-secondary text-primary font-bold px-2 py-0.5 rounded-full animate-pulse border border-primary/20">
                      AKTİF KATMAN
                    </span>
                  )}
                </div>
              );
            })}
          </div>
          <p className="text-[10px] text-gray-500 mt-4 text-center">
            *Katmanların üzerine tıklayarak kovan içi detayları inceleyebilirsiniz.
          </p>
        </div>

        {/* Right: Layer Info Details */}
        <div className="w-full lg:w-1/2 flex flex-col justify-between h-full space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full font-black uppercase tracking-widest font-heading">
                Katman Analizi
              </span>
              <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                {currentLayer.title}
              </span>
            </div>
            
            <h2 className="text-2xl font-heading font-black text-white uppercase tracking-tight mb-4">
              {currentLayer.turkishTitle}
            </h2>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-6 font-body">
              {currentLayer.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Telemetry Target Info */}
            <div className="bg-black/40 border border-gray-800/80 p-4 rounded-2xl flex flex-col justify-between">
              <div>
                <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black mb-1">Katman Sıcaklık Dengesi</p>
                <p className="text-xs text-white font-medium font-body leading-tight">
                  {currentLayer.tempRange}
                </p>
              </div>
            </div>

            {/* Fun Fact */}
            <div className="bg-amber-500/5 border border-amber-500/10 p-4 rounded-2xl flex flex-col justify-between">
              <div>
                <p className="text-[9px] text-primary uppercase tracking-widest font-black mb-1 flex items-center gap-1">
                  <Info className="w-3 h-3" /> Bunları Biliyor musunuz?
                </p>
                <p className="text-xs text-gray-300 leading-relaxed font-body">
                  {currentLayer.fact}
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
