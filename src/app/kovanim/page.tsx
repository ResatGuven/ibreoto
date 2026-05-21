"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Thermometer, Droplets, Tv, Award, Navigation, 
  Loader2, Lock, ShieldCheck, Heart, Sparkles, MapPin, Compass
} from 'lucide-react';

export default function KovanPortalPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adoption, setAdoption] = useState<any>(null);
  
  // Simulation views
  const [viewMode, setViewMode] = useState<'simulation' | 'video'>('simulation');
  
  // Simulated statistics
  const [flowersVisited, setFlowersVisited] = useState(0);
  const [flightDistance, setFlightDistance] = useState(0);
  const [honeyYield, setHoneyYield] = useState(0);

  // References for Canvas
  const flightCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const hiveCamCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Handle Verification Login
  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/adoptions/verify?code=${encodeURIComponent(code.trim())}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setAdoption(data.data);
        // Save to local storage for quick access next time
        localStorage.setItem('ari_hayat_adoption_code', code.trim().toUpperCase());
      } else {
        setError(data.error || 'Geçersiz kod.');
      }
    } catch (err) {
      setError('Bağlantı hatası oluştu.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-fill from localStorage on load
  useEffect(() => {
    const savedCode = localStorage.getItem('ari_hayat_adoption_code');
    if (savedCode) {
      setCode(savedCode);
    }
  }, []);

  // 2. Flight Simulation Canvas Animation (Arı Uçuş Simülasyonu)
  useEffect(() => {
    if (!adoption || !flightCanvasRef.current) return;
    const canvas = flightCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = 300);

    // Resize handler
    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 800;
      height = canvas.height = 300;
    };
    window.addEventListener('resize', handleResize);

    // Bees in flight array
    const bees = Array.from({ length: 12 }, () => ({
      x: 100 + Math.random() * (width - 200),
      y: 50 + Math.random() * (height - 100),
      speed: 1.5 + Math.random() * 2,
      targetX: Math.random() > 0.5 ? width - 80 : 80,
      targetY: 80 + Math.random() * (height - 130),
      size: 4 + Math.random() * 4,
      wiggle: Math.random() * 10
    }));

    // Flowers array
    const flowers = Array.from({ length: 15 }, () => ({
      x: width - 120 + Math.random() * 80,
      y: height - 100 + Math.random() * 80,
      color: ['#F59E0B', '#EF4444', '#EC4899', '#8B5CF6'][Math.floor(Math.random() * 4)],
      petalSize: 3 + Math.random() * 4
    }));

    // Hive coordinates
    const hiveX = 80;
    const hiveY = height - 100;

    let statsTimer = 0;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw Background Sky
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#0F172A');
      skyGrad.addColorStop(1, '#0B0F19');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Draw Green Grass/Field
      ctx.fillStyle = '#064E3B';
      ctx.beginPath();
      ctx.ellipse(width / 2, height + 80, width, 150, 0, 0, Math.PI, true);
      ctx.fill();

      // Draw Physical Hive
      ctx.fillStyle = '#D97706'; // Wood amber color
      ctx.fillRect(hiveX - 25, hiveY - 40, 50, 60);
      ctx.fillStyle = '#B45309'; // Roof
      ctx.beginPath();
      ctx.moveTo(hiveX - 35, hiveY - 40);
      ctx.lineTo(hiveX + 35, hiveY - 40);
      ctx.lineTo(hiveX, hiveY - 55);
      ctx.closePath();
      ctx.fill();
      // Hive Stand
      ctx.fillStyle = '#4B5563';
      ctx.fillRect(hiveX - 15, hiveY + 20, 5, 20);
      ctx.fillRect(hiveX + 10, hiveY + 20, 5, 20);
      // Entrance hole
      ctx.fillStyle = '#000000';
      ctx.fillRect(hiveX - 10, hiveY + 5, 20, 8);

      // Draw Flowers
      flowers.forEach(f => {
        ctx.fillStyle = '#10B981'; // Stem
        ctx.fillRect(f.x - 1, f.y - 10, 2, 20);
        ctx.fillStyle = f.color; // Petals
        ctx.beginPath();
        ctx.arc(f.x, f.y - 10, f.petalSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#FBBF24'; // Center
        ctx.beginPath();
        ctx.arc(f.x, f.y - 10, f.petalSize / 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Update & Draw Bees
      bees.forEach(b => {
        b.wiggle += 0.15;
        const wiggleY = Math.sin(b.wiggle) * 4;

        // Move towards target
        const dx = b.targetX - b.x;
        const dy = b.targetY - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 5) {
          b.x += (dx / dist) * b.speed;
          b.y += (dy / dist) * b.speed + wiggleY * 0.1;
        } else {
          // Switch target when reached
          if (b.targetX === hiveX) {
            // Reached Hive -> Drop off pollen -> Go back to flower fields
            b.targetX = width - 120 + Math.random() * 80;
            b.targetY = height - 120 + Math.random() * 80;
          } else {
            // Reached flowers -> Collect pollen -> Go back to hive
            b.targetX = hiveX;
            b.targetY = hiveY + Math.random() * 20;
          }
          b.speed = 1.5 + Math.random() * 2.5;
        }

        // Draw Bee body (Yellow-Black stripes)
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.fillStyle = '#F59E0B'; // Yellow
        ctx.beginPath();
        ctx.ellipse(0, 0, b.size * 1.5, b.size, 0, 0, Math.PI * 2);
        ctx.fill();
        // Stripes
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = b.size / 3;
        ctx.beginPath();
        ctx.moveTo(-b.size / 2, -b.size + 1);
        ctx.lineTo(-b.size / 2, b.size - 1);
        ctx.moveTo(0, -b.size);
        ctx.lineTo(0, b.size);
        ctx.moveTo(b.size / 2, -b.size + 1);
        ctx.lineTo(b.size / 2, b.size - 1);
        ctx.stroke();

        // Wings
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.ellipse(-b.size / 3, -b.size * 0.9, b.size * 0.7, b.size * 1.2, -Math.PI / 6, 0, Math.PI * 2);
        ctx.ellipse(b.size / 3, -b.size * 0.9, b.size * 0.7, b.size * 1.2, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Update counters dynamically over time to simulate actual bee output
      statsTimer++;
      if (statsTimer % 60 === 0) {
        setFlowersVisited(prev => prev + Math.floor(Math.random() * 8) + 3);
        setFlightDistance(prev => parseFloat((prev + 0.12).toFixed(2)));
        setHoneyYield(prev => parseFloat((prev + 0.04).toFixed(2)));
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [adoption]);

  // 3. Simulated Honeycomb Camera Canvas (Sanal Kovan İçi Kamera)
  useEffect(() => {
    if (!adoption || viewMode !== 'simulation' || !hiveCamCanvasRef.current) return;
    const canvas = hiveCamCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let camAnimId: number;
    const width = (canvas.width = 450);
    const height = (canvas.height = 300);

    const cellRadius = 25;
    const hexWidth = cellRadius * Math.sqrt(3);
    const hexHeight = cellRadius * 2;

    // Simulated telemetry factors bees speed
    const tempFactor = Math.max(1, Math.min(5, (adoption.hive.temperature - 20) / 4));
    
    // Cell database
    const cells: any[] = [];
    for (let y = -cellRadius; y < height + cellRadius; y += hexHeight * 0.75) {
      let offset = 0;
      const row = Math.round(y / (hexHeight * 0.75));
      if (row % 2 !== 0) offset = hexWidth / 2;

      for (let x = -hexWidth; x < width + hexWidth; x += hexWidth) {
        cells.push({
          x: x + offset,
          y: y,
          honeyFill: Math.random() * 100, // percentage full of honey
          larvaProgress: Math.random() > 0.6 ? Math.random() * 100 : 0 // larva status
        });
      }
    }

    // Bees moving inside the hive
    const internalBees = Array.from({ length: 8 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speed: 0.4 * tempFactor,
      targetX: Math.random() * width,
      targetY: Math.random() * height,
      size: 10 + Math.random() * 4,
      angle: Math.random() * Math.PI * 2
    }));

    const drawHexagon = (cx: number, cy: number, r: number, fillPercent: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i + Math.PI / 6;
        ctx.lineTo(cx + r * Math.cos(angle), cy + r * Math.sin(angle));
      }
      ctx.closePath();
      
      // Cell wall
      ctx.strokeStyle = '#78350F';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Honey fill inside cell (Amber dynamic gradient)
      if (fillPercent > 0) {
        const honeyR = r * 0.9 * (fillPercent / 100);
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i + Math.PI / 6;
          ctx.lineTo(cx + honeyR * Math.cos(angle), cy + honeyR * Math.sin(angle));
        }
        ctx.closePath();
        ctx.fillStyle = `rgba(217, 119, 6, ${0.2 + (fillPercent / 150)})`;
        ctx.fill();
      }
    };

    const animateCam = () => {
      ctx.clearRect(0, 0, width, height);

      // Dark background
      ctx.fillStyle = '#111827';
      ctx.fillRect(0, 0, width, height);

      // Draw Honeycomb Comb
      cells.forEach(c => {
        drawHexagon(c.x, c.y, cellRadius, c.honeyFill);
      });

      // Update & Draw Bees
      internalBees.forEach(b => {
        // Move towards internal coordinates
        const dx = b.targetX - b.x;
        const dy = b.targetY - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 5) {
          b.x += (dx / dist) * b.speed;
          b.y += (dy / dist) * b.speed;
          b.angle = Math.atan2(dy, dx);
        } else {
          b.targetX = Math.random() * width;
          b.targetY = Math.random() * height;
        }

        // Draw Bee crawling inside cell
        ctx.save();
        ctx.translate(b.x, b.y);
        ctx.rotate(b.angle);

        // Body stripes
        ctx.fillStyle = '#D97706';
        ctx.beginPath();
        ctx.ellipse(0, 0, b.size * 1.3, b.size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.fillRect(-b.size / 2, -b.size * 0.6, b.size / 3, b.size * 1.2);
        ctx.fillRect(0, -b.size * 0.7, b.size / 3, b.size * 1.4);
        ctx.fillRect(b.size / 2, -b.size * 0.6, b.size / 3, b.size * 1.2);

        // Tiny wings
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.beginPath();
        ctx.ellipse(-b.size / 4, -b.size * 0.7, b.size * 0.4, b.size * 0.7, -Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // Monitor Scanlines effect for camera overlay
      ctx.fillStyle = 'rgba(0, 255, 0, 0.03)';
      for (let y = 0; y < height; y += 4) {
        ctx.fillRect(0, y, width, 1.5);
      }

      // "LIVE" overlay indicator
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(35, 25, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = 'white';
      ctx.font = 'bold 10px monospace';
      ctx.fillText('LIVE KOVAN-IC', 48, 28);
      ctx.fillText(`TEMP: ${adoption.hive.temperature}°C`, 350, 28);

      camAnimId = requestAnimationFrame(animateCam);
    };

    animateCam();

    return () => {
      cancelAnimationFrame(camAnimId);
    };
  }, [adoption, viewMode]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-gray-100 py-12 px-4 md:px-8">
      {/* 1. Login Gate */}
      {!adoption ? (
        <div className="max-w-md mx-auto mt-20 p-8 bg-[#111827]/60 border border-gray-800 rounded-3xl shadow-2xl backdrop-blur-xl">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-amber-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-primary/20 mb-4 transform hover:rotate-6 transition-transform">
              <Lock className="w-8 h-8 text-secondary" />
            </div>
            <h1 className="text-2xl font-heading font-black text-white uppercase tracking-tight">Kovan Portalı Girişi</h1>
            <p className="text-xs text-gray-400 mt-1 leading-relaxed">
              Kovanınızın anlık durumunu, uçuş simülasyonunu ve laboratuvar değerlerini canlı izlemek için evlat edinme kodunuzu girin.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1.5 font-heading">Kovan Evlat Edinme Kodu</label>
              <div className="relative">
                <input 
                  type="text" 
                  value={code} 
                  onChange={e => setCode(e.target.value.toUpperCase())}
                  placeholder="KOV-1234" 
                  className="w-full pl-10 pr-4 py-3 bg-[#1F2937]/50 border border-gray-700 rounded-xl focus:border-primary outline-none text-white text-center font-heading font-bold placeholder-gray-600 transition-colors uppercase"
                  required
                />
                <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-500" />
              </div>
            </div>

            {error && <p className="text-xs text-red-500 font-medium text-center">{error}</p>}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-primary to-amber-700 hover:from-amber-600 hover:to-amber-800 text-secondary font-heading font-black text-xs uppercase rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transform hover:scale-105"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Kovana Bağlan'}
            </button>
          </form>
        </div>
      ) : (
        /* 2. Logged In Adoption Dashboard */
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#111827]/40 border border-gray-800/50 p-6 rounded-3xl backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-black text-white uppercase tracking-tight">{adoption.hive.name}</h1>
                <p className="text-xs text-gray-400 flex items-center mt-1">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-primary" /> {adoption.hive.location}
                </p>
              </div>
            </div>
            <div className="px-5 py-3 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-3">
              <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Evlat Edinen Veli</p>
                <p className="text-xs text-white font-bold">{adoption.ownerName}</p>
              </div>
            </div>
          </div>

          {/* Core Telemetry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111827]/40 border border-gray-800 p-6 rounded-3xl flex items-center gap-4 hover:border-primary/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-950/40 text-orange-400 flex items-center justify-center">
                <Thermometer className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Kovan İçi Sıcaklık</p>
                <p className="text-2xl font-heading font-black text-white">{adoption.hive.temperature}°C</p>
                <p className="text-[10px] text-green-500 font-bold mt-0.5">Optimum Değer</p>
              </div>
            </div>
            
            <div className="bg-[#111827]/40 border border-gray-800 p-6 rounded-3xl flex items-center gap-4 hover:border-primary/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-950/40 text-blue-400 flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Nem Oranı</p>
                <p className="text-2xl font-heading font-black text-white">%{adoption.hive.humidity}</p>
                <p className="text-[10px] text-blue-500 font-bold mt-0.5">Bal Sağlığı İçin İdeal</p>
              </div>
            </div>
            
            <div className="bg-[#111827]/40 border border-gray-800 p-6 rounded-3xl flex items-center gap-4 hover:border-primary/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-yellow-950/40 text-yellow-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">Tahmini Arı Sayısı</p>
                <p className="text-2xl font-heading font-black text-white">{adoption.hive.beeCount.toLocaleString('tr-TR')} Adet</p>
                <p className="text-[10px] text-yellow-500 font-bold mt-0.5">Aktif ve Üretken</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: Live Feed & Telemetry Visuals */}
            <div className="lg:col-span-1 bg-[#111827]/40 border border-gray-800 p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-heading font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <Tv className="w-4 h-4 text-primary" /> Kovan Kamerası (Canlı Görünüm)
                  </h3>
                  {adoption.hive.image && (
                    <div className="flex bg-[#1F2937] p-0.5 rounded-lg border border-gray-800 text-[9px] font-heading font-black uppercase">
                      <button onClick={() => setViewMode('simulation')} className={`px-2 py-1 rounded ${viewMode === 'simulation' ? 'bg-primary text-secondary' : 'text-gray-400'}`}>Sanal</button>
                      <button onClick={() => setViewMode('video')} className={`px-2 py-1 rounded ${viewMode === 'video' ? 'bg-primary text-secondary' : 'text-gray-400'}`}>Kamera</button>
                    </div>
                  )}
                </div>

                <div className="w-full aspect-square md:aspect-video lg:aspect-square bg-black rounded-2xl overflow-hidden border border-gray-800 relative flex items-center justify-center shadow-inner">
                  {viewMode === 'simulation' ? (
                    <canvas ref={hiveCamCanvasRef} className="w-full h-full object-cover" />
                  ) : (
                    adoption.hive.image && <img src={adoption.hive.image} alt="Kovan Yayla Kamerası" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-800/80">
                <h4 className="text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1 font-heading">Kovan Hakkında</h4>
                <p className="text-xs text-gray-300 leading-relaxed font-body">{adoption.hive.description}</p>
              </div>
            </div>

            {/* Right Side: Arı Uçuş Simülasyonu */}
            <div className="lg:col-span-2 bg-[#111827]/40 border border-gray-800 p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-heading font-black text-white uppercase tracking-wider flex items-center gap-2 mb-4">
                  <Compass className="w-4 h-4 text-primary" /> Arı Uçuş Simülasyonu (Nektar Haritası)
                </h3>
                <div className="w-full bg-black rounded-2xl overflow-hidden border border-gray-800 relative shadow-inner">
                  <canvas ref={flightCanvasRef} className="w-full block" />
                  <div className="absolute top-4 right-4 bg-[#111827]/80 backdrop-blur border border-gray-800 p-3 rounded-xl text-[10px] font-bold space-y-1 z-10 text-gray-300">
                    <div className="flex justify-between gap-4">
                      <span>Uçuş Modu:</span>
                      <span className="text-primary uppercase">Nektar Toplama</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Hedef Çiçekler:</span>
                      <span className="text-white">Kestane & Çiçek</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Counters */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-800/80 text-center">
                <div>
                  <p className="text-xs text-gray-400 font-body">Ziyaret Edilen Çiçek</p>
                  <p className="text-xl font-heading font-black text-primary mt-1">{flowersVisited.toLocaleString('tr-TR')}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-body">Toplam Mesafe</p>
                  <p className="text-xl font-heading font-black text-white mt-1">{flightDistance} km</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-body">Üretilen Ham Bal</p>
                  <p className="text-xl font-heading font-black text-green-400 mt-1">~{honeyYield} g</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
