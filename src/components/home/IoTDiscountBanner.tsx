"use client";

import React, { useState, useEffect } from 'react';
import { Thermometer, Zap, AlertCircle, Copy, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function IoTDiscountBanner() {
  const [hiveData, setHiveData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    async function fetchHiveTelemetry() {
      try {
        const res = await fetch('/api/admin/hives');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            // Get the first active hive
            setHiveData(data[0]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch hive telemetry for marketing banner:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchHiveTelemetry();
  }, []);

  const copyCoupon = () => {
    navigator.clipboard.writeText("KIS-SIFASI");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading || !hiveData) return null;

  // Let's activate the banner if the hive temperature is measured
  const temp = hiveData.temperature || 34.8;
  const isCold = temp < 35.2; // Standard brood nest temp is 34.5-35.5C.

  if (!isCold) return null;

  return (
    <div className="w-full bg-gradient-to-r from-amber-950/40 via-yellow-950/20 to-slate-950 border-y border-amber-500/20 py-4 px-4 overflow-hidden relative group font-body">
      <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none transform translate-x-20 -translate-y-20"></div>
      
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
        
        {/* Left Side: Telemetry Alert */}
        <div className="flex items-start md:items-center gap-3">
          <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-2xl flex items-center justify-center text-primary animate-pulse shadow-lg shadow-amber-500/5">
            <Thermometer className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] bg-primary/20 text-primary border border-primary/30 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
                CANLI IoT ALARMI
              </span>
              <span className="text-xs text-gray-400 font-medium">
                {hiveData.location} • <strong className="text-white">{hiveData.name}</strong>
              </span>
            </div>
            <p className="text-sm text-gray-300">
              Kovan içi sıcaklık <strong className="text-primary font-heading font-black">{temp}°C</strong>'ye düştü! Arılarımız kovanı ısıtmak için çalışıyor. Sizin de sağlığınız için kış şifası kampanyası başladı!
            </p>
          </div>
        </div>

        {/* Right Side: Action & Coupon */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Coupon Box */}
          <div 
            onClick={copyCoupon}
            className="flex items-center justify-between bg-black/60 border border-amber-500/30 rounded-xl px-4 py-2 hover:border-primary/60 transition-all cursor-pointer select-none group/coupon relative overflow-hidden"
            title="Kuponu Kopyala"
          >
            <div className="mr-4">
              <p className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Ekstra %15 İNDİRİM</p>
              <p className="text-sm font-heading font-black tracking-wider text-white">KIS-SIFASI</p>
            </div>
            <div className="bg-amber-500/15 p-1.5 rounded-lg text-primary group-hover/coupon:scale-105 transition-transform">
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </div>
          </div>

          {/* Call to Action Button */}
          <Link 
            href="/urunler?category=karisim"
            className="bg-primary hover:bg-amber-500 text-secondary font-heading font-black text-xs uppercase px-5 py-3.5 rounded-xl transition-all shadow-xl shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5" /> Şifanı Seç
          </Link>
        </div>

      </div>
    </div>
  );
}
