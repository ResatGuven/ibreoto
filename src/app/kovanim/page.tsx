"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, Thermometer, Droplets, Tv, Award, Navigation, 
  Loader2, Lock, ShieldCheck, Heart, Sparkles, MapPin, Compass,
  CheckCircle2, AlertTriangle, ArrowRight, Download, Share2, Calendar, Sprout, Users,
  Bell, Camera
} from 'lucide-react';
import { HiveAnatomyExplorer } from '@/components/kovan/HiveAnatomyExplorer';

export default function KovanPortalPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [adoption, setAdoption] = useState<any>(null);
  
  // Support Level States (Logged out)
  // 4: Çevre Dostu (%25), 2: Doğa Ortağı (%50), 1: Baş Hami (%100)
  const [supportLevel, setSupportLevel] = useState(4); 
  const [honeyNeed, setHoneyNeed] = useState(12);

  // Simulation views
  const [viewMode, setViewMode] = useState<'simulation' | 'video'>('simulation');
  
  // Certificate states (Logged in)
  const [certName, setCertName] = useState('');
  const [certMessage, setCertMessage] = useState('');

  // SMS Notification states
  const [smsPhone, setSmsPhone] = useState('');
  const [smsRegistered, setSmsRegistered] = useState(false);
  const [smsTopics, setSmsTopics] = useState({
    weather: true,
    activity: false,
    harvest: true
  });
  
  // Simulated statistics
  const [flowersVisited, setFlowersVisited] = useState(0);
  const [flightDistance, setFlightDistance] = useState(0);
  const [honeyYield, setHoneyYield] = useState(0);

  // References for Canvas
  const flightCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const hiveCamCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // 1. Verify helper
  const verifyCode = async (verifyCodeStr: string) => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`/api/adoptions/verify?code=${encodeURIComponent(verifyCodeStr.trim().toUpperCase())}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setAdoption(data.data);
        setCertName(data.data.ownerName || 'Doğa Sever');
        // Save to local storage for quick access next time
        localStorage.setItem('ari_hayat_adoption_code', verifyCodeStr.trim().toUpperCase());
      } else {
        setError(data.error || 'Geçersiz kod.');
      }
    } catch (err) {
      setError('Bağlantı hatası oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    await verifyCode(code);
  };

  // Auto-fill and login from localStorage on load
  useEffect(() => {
    const savedCode = localStorage.getItem('ari_hayat_adoption_code');
    if (savedCode) {
      setCode(savedCode);
      verifyCode(savedCode);
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
      if (canvas && canvas.parentElement) {
        width = canvas.width = canvas.parentElement.clientWidth || 800;
      }
      height = 300;
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

  // Handle mock certificate sharing
  const handleShareCert = (e: React.FormEvent) => {
    e.preventDefault();
    setCertMessage("Sertifikanız hazırlandı! Ekran görüntüsünü alıp hemen Instagram / WhatsApp durumunuzda paylaşabilirsiniz.");
    setTimeout(() => setCertMessage(""), 6000);
  };

  return (
    <div className="min-h-screen bg-background honeycomb-bg text-text-main py-12 px-4 md:px-8">
    <div className="min-h-screen bg-gray-50 honeycomb-bg text-gray-900 py-12 px-4 md:px-8">
      {/* 1. Login Gate & Cooperative Calculator */}
      {!adoption ? (
        <div className="max-w-6xl mx-auto mt-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Login Gate */}
          <div className="lg:col-span-5 p-8 bg-white border border-gray-200 shadow-sm rounded-3xl backdrop-blur-xl">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-amber-700 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-primary/20 mb-4 transform hover:rotate-6 transition-transform">
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Hamilik yaptığınız kovanın anlık durumunu, uçuş simülasyonunu ve laboratuvar değerlerini canlı izlemek için doğa koruma kodunuzu girin.
              </p>
            </div>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1.5 font-heading">Kovan Koruma / Hamilik Kodu</label>
                <div className="relative">
                  <input 
                    type="text" 
                    value={code} 
                    onChange={e => setCode(e.target.value.toUpperCase())}
                    placeholder="KOV-1234" 
                    className="w-full pl-10 pr-4 py-3 bg-[#1F2937]/50 border border-gray-700 rounded-xl focus:border-primary outline-none text-secondary text-center font-heading font-bold placeholder-gray-600 transition-colors uppercase"
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

          {/* Right Column: Doğal Kovan Hâmiliği Info & Ecological Calculator */}
          <div className="lg:col-span-7 p-8 bg-[#111827]/40 border border-amber-500/10 rounded-3xl shadow-2xl backdrop-blur-xl space-y-6">
            <span className="text-[9px] bg-amber-500/10 border border-amber-500/30 text-primary px-3 py-1 rounded-full font-black tracking-widest uppercase">
              BİREYSEL HAMİLİK & DOĞAL ARICILIK SEFERBERLİĞİ
            </span>
            <div className="space-y-2">
              <h2 className="text-xl md:text-2xl font-heading font-black text-secondary uppercase tracking-tight">
                DOĞAL KOVAN HAMİLİĞİ İLE DOĞAYA SAHİP ÇIKIN
              </h2>
              <p className="text-xs text-text-muted font-body leading-relaxed">
                Rize Anzer Yaylası'nda sürdürülebilir arıcılık ve biyoçeşitliliğin korunmasını doğrudan destekleyin. Kendi adınıza bir kovan sahiplenerek yayla florasında hayat bulan Kafkas arılarının koruyucusu olun. Sezon sonunda kovanınızın ürettiği saf ve sınırlı hasadı hamilik kademenize göre sevgiyle teslim alın!
              </p>
            </div>

            {/* Ecological Calculator Widget */}
            <div className="bg-black/20 p-5 rounded-2xl border border-gray-850 space-y-5">
              <h3 className="text-xs font-heading font-black text-text-muted uppercase tracking-wider flex items-center gap-2">
                <Sprout className="w-4 h-4 text-primary animate-pulse" /> Kovan Hamilik ve Ekolojik Etki Simülatörü
              </h3>

              <div className="space-y-4">
                {/* Support Level selector */}
                <div className="space-y-2">
                  <label className="block text-[10px] text-gray-500 font-bold uppercase tracking-wider font-heading">
                    Kovan Hamilik ve Katkı Derecesi
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { label: 'Flora Hamisi', value: 4 },
                      { label: 'Biyoçeşitlilik Hamisi', value: 2 },
                      { label: 'Kovan Baş Hamisi', value: 1 }
                    ].map(item => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => setSupportLevel(item.value)}
                        className={`py-2 px-3 text-xs font-heading font-black uppercase rounded-lg border transition-all ${
                          supportLevel === item.value 
                            ? 'bg-primary/20 border-primary text-primary' 
                            : 'bg-gray-900 border-gray-800 text-text-muted hover:border-gray-700'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tier Description */}
                <div className="text-center text-[10px] text-text-muted italic bg-gray-900/30 p-2.5 rounded-xl border border-gray-800/40">
                  {supportLevel === 4 && "🌸 Flora Hamisi olarak yayladaki endemik kır çiçeklerinin tozlaşmasını ve Kafkas arılarının üremesini desteklersiniz."}
                  {supportLevel === 2 && "🐝 Biyoçeşitlilik Hamisi olarak arıcılık ekosisteminin korunmasını güçlendirir ve habitat zenginliğine büyük katkı sunarsınız."}
                  {supportLevel === 1 && "👑 Kovan Baş Hamisi olarak kovanın tüm bakım, arıcılık ve koruma sorumluluğunu üstlenerek doğada devasa bir iz bırakırsınız."}
                </div>

                {/* Ecological outputs display */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-gray-800/80">
                  <div className="bg-[#111827] p-3 rounded-xl border border-gray-850 text-center">
                    <div className="text-[8px] text-gray-500 font-bold uppercase">Yaşatılan Arı</div>
                    <div className="text-sm text-secondary font-heading font-black mt-1">~{Math.round(48000 / supportLevel).toLocaleString('tr-TR')}</div>
                    <div className="text-[7px] text-gray-500 font-body">Kafkas Arı Irkı</div>
                  </div>
                  
                  <div className="bg-[#111827] p-3 rounded-xl border border-gray-850 text-center">
                    <div className="text-[8px] text-primary font-bold uppercase">Tozlaşma Katkısı</div>
                    <div className="text-sm text-primary font-heading font-black mt-1">~{Math.round(1200000 / supportLevel).toLocaleString('tr-TR')}</div>
                    <div className="text-[7px] text-primary/70 font-body">Çiçek Tozlaşması / Yıl</div>
                  </div>

                  <div className="bg-[#111827] p-3 rounded-xl border border-gray-850 text-center">
                    <div className="text-[8px] text-gray-500 font-bold uppercase">Destek Alanı</div>
                    <div className="text-sm text-secondary font-heading font-black mt-1">~{Math.round(150 / supportLevel)} m²</div>
                    <div className="text-[7px] text-gray-500 font-body">Doğal Yayla Florası</div>
                  </div>

                  <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 text-center">
                    <div className="text-[8px] text-emerald-400 font-bold uppercase">Hasat Kazanımınız</div>
                    <div className="text-sm text-emerald-400 font-heading font-black mt-1">~{Math.round(24 / supportLevel)} Kg</div>
                    <div className="text-[7px] text-emerald-500 font-body">Saf Anzer Yayla Balı</div>
                  </div>
                </div>

              </div>
            </div>

            <ul className="space-y-2 text-xs font-body text-text-muted">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Ekolojik Koruma Güvencesi:</strong> Katkınızla, Rize Anzer Yaylası'nda kimyasal ilaçlardan uzak, sürdürülebilir doğal arıcılık ve biyoçeşitlilik doğrudan desteklenir.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span><strong>Canlı Kovan İzleme & Canlı Takip:</strong> Kovan paneli üzerinden arılarınızın uçuş aktivitesini, sıcaklık ve nem durumunu anlık ve canlı olarak izlersiniz.</span>
              </li>
            </ul>
          </div>

        </div>
      ) : (
        /* 2. Logged In Adoption Dashboard */
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white border border-gray-200 shadow-sm/50 p-6 rounded-3xl backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center border border-primary/20">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-black text-secondary uppercase tracking-tight">{adoption.hive.name}</h1>
                <p className="text-xs text-text-muted flex items-center mt-1">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-primary" /> {adoption.hive.location}
                </p>
              </div>
            </div>
            <div className="px-5 py-3 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-3">
              <Heart className="w-5 h-5 text-primary fill-primary animate-pulse" />
              <div>
                <p className="text-[10px] text-text-muted uppercase font-heading">Kovan Durumu</p>
                <p className="text-xs text-secondary font-heading font-black uppercase">AKTİF & SAĞLIKLI</p>
              </div>
            </div>
          </div>

          {/* Özel Hamilik & Uzman Timi Panel */}
          <div className="bg-white border border-gray-200 shadow-sm p-6 md:p-8 rounded-3xl backdrop-blur-xl space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-gray-800/80">
              <div>
                <span className="text-[9px] bg-primary/10 text-primary border border-primary/20 px-2.5 py-0.5 rounded-full font-heading font-black uppercase tracking-wider">
                  Kovan Statüsü: Müstakil & Özel Hamilik
                </span>
                <h3 className="text-lg font-heading font-black text-secondary uppercase tracking-tight mt-1 flex items-center gap-2">
                  🛡️ Kovanınızın Koruyucu Uzman Destek Kadrosu
                </h3>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-3 py-1.5 rounded-xl text-xs font-heading font-black uppercase tracking-wide">
                Özel Hamilik Güvencesi Aktif ✓
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Visual expert circle (SVG layout representing your Hive and the Experts) */}
              <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-4">
                <div className="relative w-44 h-44 flex items-center justify-center bg-black/25 rounded-full border border-gray-800/80 shadow-2xl p-2">
                  <svg className="w-full h-full" viewBox="0 0 120 120">
                    <defs>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    
                    {/* Glowing orbits representing support loops */}
                    <circle cx="60" cy="60" r="42" fill="none" stroke="#D97706" strokeWidth="0.75" strokeDasharray="4 4" className="opacity-40" />
                    <circle cx="60" cy="60" r="28" fill="none" stroke="#FBBF24" strokeWidth="0.5" strokeDasharray="2 2" className="opacity-30" />
                    
                    {/* Connections to experts */}
                    <line x1="60" y1="60" x2="60" y2="18" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-60" />
                    <line x1="60" y1="60" x2="102" y2="60" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-60" />
                    <line x1="60" y1="60" x2="60" y2="102" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-60" />
                    <line x1="60" y1="60" x2="18" y2="60" stroke="#B45309" strokeWidth="1.5" strokeDasharray="3 3" className="opacity-60" />

                    {/* Central Golden Honeycomb Cell */}
                    <polygon points="60,51 68,55 68,65 60,69 52,65 52,55" fill="#FBBF24" filter="url(#glow)" className="animate-pulse" />
                    <polygon points="60,53 66,56 66,64 60,67 54,64 54,56" fill="#78350F" />
                    <polygon points="60,55 64,57 64,63 60,65 56,63 56,57" fill="#F59E0B" />

                    {/* Outer Expert Nodes */}
                    {/* 1. Baş Arıcı (Top) */}
                    <circle cx="60" cy="18" r="5" fill="#FBBF24" stroke="#78350F" strokeWidth="1.5" />
                    {/* 2. Botanikçi (Right) */}
                    <circle cx="102" cy="60" r="5" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
                    {/* 3. Veteriner (Bottom) */}
                    <circle cx="60" cy="102" r="5" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
                    {/* 4. Siz (Left - Glowing gold) */}
                    <circle cx="18" cy="60" r="6" fill="#FFF" stroke="#FBBF24" strokeWidth="1.5" filter="url(#glow)" />
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                    <span className="text-[7px] text-gray-500 font-bold uppercase tracking-widest">KORUMA HEDEFİ</span>
                    <span className="text-[11px] text-secondary font-extrabold tracking-wider">TEK HAMİ</span>
                    <span className="text-[9px] text-primary font-bold">Saf Yayla Balı</span>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 text-center font-body max-w-xs leading-relaxed">
                  Sezonluk kovan toplam hasat tahmini: 24 Kg (Süzme Çiçek Balı)
                </p>
              </div>

              {/* Expert list with assigned statuses */}
              <div className="lg:col-span-8 space-y-4">
                <h4 className="text-[10px] font-heading font-black text-text-muted uppercase tracking-widest">
                  Kovanınıza Atanmış Profesyonel Destek Timi:
                </h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div className="bg-[#111827]/60 border border-gray-850 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="text-xs text-secondary font-bold">Ömer Asaf Efendi</div>
                      <div className="text-[9px] text-gray-500 font-heading">Rize Anzer Yaylası Baş Arıcısı</div>
                    </div>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase">
                      Bakım Tamamlandı
                    </span>
                  </div>

                  <div className="bg-[#111827]/60 border border-gray-850 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="text-xs text-secondary font-bold">Doç. Dr. Selim Tokgöz</div>
                      <div className="text-[9px] text-gray-500 font-heading">KTÜ Botanik & Flora Danışmanı</div>
                    </div>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase">
                      Polen Analizi ✓
                    </span>
                  </div>

                  <div className="bg-[#111827]/60 border border-gray-850 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="text-xs text-secondary font-bold">Dr. Canan Sever</div>
                      <div className="text-[9px] text-gray-500 font-heading">Arı Sağlığı Uzmanı & Veteriner Hekim</div>
                    </div>
                    <span className="text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase">
                      Sağlık Raporu ✓
                    </span>
                  </div>

                  <div className="bg-[#111827]/60 border border-primary/20 p-4 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="text-xs text-primary font-black">Siz (Kovan Hâmisi)</div>
                      <div className="text-[9px] text-gray-500 font-heading">Doğa Koruyucusu ve Tek Sponsor</div>
                    </div>
                    <span className="text-[9px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-0.5 rounded-full font-bold uppercase">
                      Hasat Bekleniyor
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>

          {/* Core Telemetry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-3xl flex items-center gap-4 hover:border-primary/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-orange-950/40 text-orange-400 flex items-center justify-center">
                <Thermometer className="w-6 h-6 animate-bounce" />
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Kovan İçi Sıcaklık</p>
                <p className="text-2xl font-heading font-black text-secondary">{adoption.hive.temperature}°C</p>
                <p className="text-[10px] text-green-500 font-bold mt-0.5">Optimum Değer</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-3xl flex items-center gap-4 hover:border-primary/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-blue-950/40 text-blue-400 flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Nem Oranı</p>
                <p className="text-2xl font-heading font-black text-secondary">%{adoption.hive.humidity}</p>
                <p className="text-[10px] text-blue-500 font-bold mt-0.5">Bal Sağlığı İçin İdeal</p>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 shadow-sm p-6 rounded-3xl flex items-center gap-4 hover:border-primary/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-yellow-950/40 text-yellow-400 flex items-center justify-center">
                <Sparkles className="w-6 h-6 animate-spin-slow" />
              </div>
              <div>
                <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">Tahmini Arı Sayısı</p>
                <p className="text-2xl font-heading font-black text-secondary">{adoption.hive.beeCount.toLocaleString('tr-TR')} Adet</p>
                <p className="text-[10px] text-yellow-500 font-bold mt-0.5">Aktif ve Üretken</p>
              </div>
            </div>
          </div>

          {/* Interactive Certificate Generator & Beekeeper's Seasonal Log */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left side: Certificate Generator */}
            <div className="lg:col-span-7 bg-white border border-gray-200 shadow-sm p-6 md:p-8 rounded-3xl backdrop-blur-xl flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-sm font-heading font-black text-secondary uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-primary" /> Arı Hamisi Dijital Sertifikası
                </h3>
                <p className="text-xs text-text-muted font-body mb-4">
                  Kovana olan doğa ortağı katkınızı tescilleyen dijital sertifikanızı adınıza özel düzenleyin ve sosyal medyada paylaşarak farkındalığı artırın.
                </p>

                {/* Name Input */}
                <form onSubmit={handleShareCert} className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={certName}
                    onChange={(e) => setCertName(e.target.value)}
                    placeholder="Sertifikadaki İsim..."
                    className="flex-1 px-4 py-2.5 bg-gray-900/60 border border-gray-850 rounded-xl text-secondary text-xs outline-none focus:border-primary transition-colors font-heading font-bold"
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-gradient-to-r from-primary to-amber-700 hover:from-amber-600 hover:to-amber-800 text-secondary text-[11px] font-heading font-black uppercase rounded-xl transition-all shadow-md flex items-center gap-1.5"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Sertifikayı Güncelle
                  </button>
                </form>

                {/* Certificate Display Mockup */}
                <div className="relative aspect-[1.414/1] w-full bg-gradient-to-b from-[#1C1713] to-[#0A0908] border-[8px] border-double border-amber-600/30 rounded-2xl p-6 flex flex-col justify-between items-center text-center shadow-2xl select-none overflow-hidden">
                  
                  {/* Decorative corner borders */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-500/40"></div>
                  <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-500/40"></div>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-500/40"></div>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-500/40"></div>
                  
                  {/* Faint Honeycomb Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.02]">
                    <svg className="w-60 h-60 text-primary" viewBox="0 0 100 100" fill="currentColor">
                      <polygon points="50,1 95,25 95,75 50,99 5,75 5,25" />
                    </svg>
                  </div>

                  {/* Cert Header */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <Sparkles className="w-3 h-3 text-primary" />
                      <span className="text-[7px] text-primary uppercase font-bold tracking-widest font-heading">ARI HAYAT DOĞAL HAMİLİK HAREKETİ</span>
                    </div>
                    <h4 className="text-sm md:text-base font-heading font-black text-amber-500 uppercase tracking-wider">DOĞA DOSTU ARI HAMİSİ SERTİFİKASI</h4>
                  </div>

                  {/* Cert Body */}
                  <div className="my-2 space-y-2">
                    <p className="text-[8px] md:text-[9px] text-text-muted italic">Bu belge, sürdürülebilir doğal arıcılığı desteklemek ve biyoçeşitli yayla florasını korumak amacıyla</p>
                    <p className="text-base md:text-lg font-heading font-black text-secondary tracking-wide border-b border-amber-500/20 pb-1 px-4 inline-block">{certName || 'Doğa Dostu Koruyucu'}</p>
                    <p className="text-[8px] md:text-[9px] text-text-main font-body leading-relaxed max-w-sm mx-auto">
                      adına tescil edilmiştir. Rize Anzer Yaylası'nda yer alan <strong>{adoption.hive.name}</strong> kodlu İmece Kovanı'nı sahiplenerek, binlerce kır çiçeğinin tozlaşmasına ve canlı arı neslinin yaşatılmasına katkıda bulunmuştur. Doğa adına şükranlarimizi sunarız.
                    </p>
                  </div>

                  {/* Cert Footer */}
                  <div className="w-full flex justify-between items-end border-t border-gray-850 pt-2 text-[7px] md:text-[8px] text-gray-500">
                    <div className="text-left">
                      <div>Tarih: {new Date(adoption.startDate).toLocaleDateString('tr-TR')}</div>
                      <div>Kod: {adoption.code}-CERT</div>
                    </div>
                    <div className="relative flex items-center justify-center w-10 h-10 border border-amber-500/30 rounded-full bg-amber-500/5">
                      <Award className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="text-right">
                      <div className="italic font-serif text-text-main font-bold">Ömer Asaf Efendi</div>
                      <div>Arı Hayat Baş Arıcısı</div>
                    </div>
                  </div>

                </div>

                {certMessage && (
                  <p className="text-[10px] text-amber-400 font-bold text-center mt-3 animate-pulse">{certMessage}</p>
                )}
              </div>
            </div>

            {/* Right side: Beekeeper's Seasonal Log */}
            <div className="lg:col-span-5 bg-white border border-gray-200 shadow-sm p-6 md:p-8 rounded-3xl backdrop-blur-xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-heading font-black text-secondary uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-primary" /> Kovan Günlüğü & Arıcı Notları
                </h3>
                <p className="text-xs text-text-muted font-body mb-6">
                  Arıcımızın doğrudan yayladan paylaştığı notlarla, kovanınızın sezonluk gelişimini anlık takip edin.
                </p>

                {/* Vertical Timeline */}
                <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-800">
                  
                  <div className="relative pl-8 group">
                    <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-gray-800 border border-gray-700 group-hover:border-primary transition-colors flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-500 font-heading uppercase">NİSAN 2026</span>
                      <h4 className="text-xs text-secondary font-bold mt-0.5">Bahar Uyanışı ve Bakım</h4>
                      <p className="text-[10px] text-text-muted mt-1 leading-relaxed">
                        Kovan sıcaklık kontrolleri yapıldı, kış uykusundan sağlıklı çıkan arılarımıza ilk organik besin desteği verilerek koloni gücü artırıldı.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8 group">
                    <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-gray-800 border border-gray-700 group-hover:border-primary transition-colors flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-500 font-heading uppercase">MAYIS 2026</span>
                      <h4 className="text-xs text-secondary font-bold mt-0.5">Yaylaya Yolculuk</h4>
                      <p className="text-[10px] text-text-muted mt-1 leading-relaxed">
                        Kovanımız Rize Anzer Yaylası'ndaki zengin flora alanına başarıyla taşındı. Kestane ve endemik çiçeklerin açmasıyla polen girişi başladı.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8 group">
                    <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-primary/20 border border-primary flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></div>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-primary font-heading uppercase flex items-center gap-1">
                        HAZİRAN 2026 <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> canli
                      </span>
                      <h4 className="text-xs text-secondary font-bold mt-0.5">Nektar Akışı ve Bal Sırlama</h4>
                      <p className="text-[10px] text-gray-450 mt-1 leading-relaxed">
                        Hava sıcaklıkları ideal seviyede. Arıların yayla florasındaki nektarı kovana taşıma hızı en yüksek seviyeye ulaştı. Petekler sırlanıyor.
                      </p>
                    </div>
                  </div>

                  <div className="relative pl-8 group">
                    <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-gray-900 border border-gray-800 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-700"></div>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold text-gray-500 font-heading uppercase">AĞUSTOS 2026 (Planlanan)</span>
                      <h4 className="text-xs text-gray-500 font-bold mt-0.5">Yayla Hasadı & Analiz Raporlama</h4>
                      <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                        Bal olgunlaşması tamamlandığında hasat edilecek. Laboratuvar saflık testlerinden sonra koruyucu payları taze olarak adreslere gönderilecek.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Yayla Günlüğü & Canlı Bildirim Bülteni */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Kovan Fotoğraf Albümü (lg:col-span-5) */}
            <div className="lg:col-span-5 bg-white border border-gray-200 shadow-sm p-6 rounded-3xl backdrop-blur-xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-heading font-black text-secondary uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Camera className="w-4 h-4 text-primary" /> Yayladan Güncel Fotoğraflar (Kovan Albümü)
                </h3>
                <p className="text-xs text-text-muted font-body mb-4">
                  Arıcımızın Rize Anzer Yaylası'nda çektiği en güncel kovan ve flora fotoğrafları.
                </p>
                
                {/* Visual grid of polaroid-like photos */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-black/40 p-2 rounded-xl border border-gray-850 text-center hover:border-primary/20 transition-all duration-300">
                    <div className="aspect-[4/3] bg-[#1a2236] rounded-lg overflow-hidden relative flex items-center justify-center">
                      <svg className="w-full h-full p-4 text-amber-500/20" fill="currentColor" viewBox="0 0 100 100">
                        <path d="M10,80 Q30,40 50,80 T90,80" fill="none" stroke="currentColor" strokeWidth="2" />
                        <circle cx="30" cy="55" r="8" fill="#FBBF24" />
                        <circle cx="70" cy="65" r="10" fill="#EF4444" />
                      </svg>
                      <span className="absolute bottom-1 right-2 text-[8px] bg-black/60 px-1.5 py-0.5 rounded text-text-main">Mayıs 2026</span>
                    </div>
                    <p className="text-[9px] text-text-muted font-bold mt-2">İlk Çiçeklerin Açışı</p>
                  </div>

                  <div className="bg-black/40 p-2 rounded-xl border border-gray-850 text-center hover:border-primary/20 transition-all duration-300">
                    <div className="aspect-[4/3] bg-[#1a2236] rounded-lg overflow-hidden relative flex items-center justify-center">
                      <svg className="w-full h-full p-4 text-primary/20" fill="currentColor" viewBox="0 0 100 100">
                        <ellipse cx="50" cy="50" rx="15" ry="10" fill="#F59E0B" />
                        <line x1="45" y1="40" x2="45" y2="60" stroke="#000" strokeWidth="4" />
                        <line x1="55" y1="40" x2="55" y2="60" stroke="#000" strokeWidth="4" />
                      </svg>
                      <span className="absolute bottom-1 right-2 text-[8px] bg-black/60 px-1.5 py-0.5 rounded text-text-main">Canlı</span>
                    </div>
                    <p className="text-[9px] text-text-muted font-bold mt-2">Nektar Girişi Hızlandı</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-800/60 text-[10px] text-gray-500 italic text-center">
                * Fotoğraflar yayla şartlarında haftalık olarak güncellenmektedir.
              </div>
            </div>

            {/* Right Column: Canlı SMS/WhatsApp Bülteni (lg:col-span-7) */}
            <div className="lg:col-span-7 bg-white border border-gray-200 shadow-sm p-6 md:p-8 rounded-3xl backdrop-blur-xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-heading font-black text-secondary uppercase tracking-wider flex items-center gap-2 mb-2">
                  <Bell className="w-4 h-4 text-primary" /> Yayla Canlı Bülten Aboneliği
                </h3>
                <p className="text-xs text-text-muted font-body mb-6">
                  Telefon numaranızı bırakarak, arıcımızın yayladan göndereceği kovan fotoğraflarını, hava durumu değişimlerini ve bal hasat raporlarını anlık bildirim olarak alın.
                </p>

                {smsRegistered ? (
                  <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-6 rounded-2xl text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
                    <h4 className="text-sm font-bold uppercase">Aboneliğiniz Başarıyla Oluşturuldu!</h4>
                    <p className="text-xs text-text-main">
                      Girdiğiniz telefona canlı yayla güncellemeleri SMS ve WhatsApp kanalıyla haftalık olarak ulaştırılacaktır. Ekosistemimize katıldığınız için teşekkürler!
                    </p>
                    <button 
                      type="button" 
                      onClick={() => setSmsRegistered(false)} 
                      className="text-[10px] text-primary underline hover:text-amber-500 font-bold animate-pulse"
                    >
                      Numarayı Değiştir
                    </button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSmsRegistered(true); }} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Phone Input */}
                      <div>
                        <label className="block text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-1.5 font-heading">GSM Telefon Numaranız</label>
                        <input 
                          type="tel"
                          value={smsPhone}
                          onChange={(e) => setSmsPhone(e.target.value)}
                          placeholder="05xx xxx xx xx"
                          className="w-full px-4 py-2.5 bg-gray-900/60 border border-gray-850 rounded-xl text-secondary text-xs outline-none focus:border-primary transition-colors font-bold"
                          required
                        />
                      </div>
                      
                      {/* Topics Options */}
                      <div>
                        <label className="block text-[9px] text-gray-500 font-bold uppercase tracking-wider mb-1.5 font-heading">İlgi Alanlarınız</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-2 text-[10.5px] text-text-main cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={smsTopics.weather}
                              onChange={(e) => setSmsTopics({ ...smsTopics, weather: e.target.checked })}
                              className="accent-primary rounded"
                            />
                            <span>Yayla Hava Durumu & Kar Erimesi</span>
                          </label>
                          <label className="flex items-center gap-2 text-[10.5px] text-text-main cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={smsTopics.activity}
                              onChange={(e) => setSmsTopics({ ...smsTopics, activity: e.target.checked })}
                              className="accent-primary rounded"
                            />
                            <span>Kovan Uçuş Aktivitesi & Oğul Alarmları</span>
                          </label>
                          <label className="flex items-center gap-2 text-[10.5px] text-text-main cursor-pointer">
                            <input 
                              type="checkbox"
                              checked={smsTopics.harvest}
                              onChange={(e) => setSmsTopics({ ...smsTopics, harvest: e.target.checked })}
                              className="accent-primary rounded"
                            />
                            <span>Hasat ve Analiz Çıktıları</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <button 
                      type="submit" 
                      className="w-full mt-4 py-3 bg-gradient-to-r from-primary to-amber-700 hover:from-amber-600 hover:to-amber-800 text-secondary font-heading font-black text-xs uppercase rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                    >
                      <Bell className="w-3.5 h-3.5" /> Canlı Bildirim Bültenine Kaydol
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Side: Live Feed & Telemetry Visuals */}
            <div className="lg:col-span-1 bg-white border border-gray-200 shadow-sm p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-sm font-heading font-black text-secondary uppercase tracking-wider flex items-center gap-2">
                    <Tv className="w-4 h-4 text-primary" /> Kovan Kamerası (Canlı Görünüm)
                  </h3>
                  {adoption.hive.image && (
                    <div className="flex bg-[#1F2937] p-0.5 rounded-lg border border-gray-800 text-[9px] font-heading font-black uppercase">
                      <button onClick={() => setViewMode('simulation')} className={`px-2 py-1 rounded ${viewMode === 'simulation' ? 'bg-primary text-secondary' : 'text-text-muted'}`}>Sanal</button>
                      <button onClick={() => setViewMode('video')} className={`px-2 py-1 rounded ${viewMode === 'video' ? 'bg-primary text-secondary' : 'text-text-muted'}`}>Kamera</button>
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
                <p className="text-xs text-text-main leading-relaxed font-body">{adoption.hive.description}</p>
              </div>
            </div>

            {/* Right Side: Arı Uçuş Simülasyonu */}
            <div className="lg:col-span-2 bg-white border border-gray-200 shadow-sm p-6 rounded-3xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-heading font-black text-secondary uppercase tracking-wider flex items-center gap-2 mb-4">
                  <Compass className="w-4 h-4 text-primary" /> Arı Uçuş Simülasyonu (Nektar Haritası)
                </h3>
                <div className="w-full bg-black rounded-2xl overflow-hidden border border-gray-850 relative shadow-inner">
                  <canvas ref={flightCanvasRef} className="w-full block" />
                  <div className="absolute top-4 right-4 bg-[#111827]/80 backdrop-blur border border-gray-800 p-3 rounded-xl text-[10px] font-bold space-y-1 z-10 text-text-main">
                    <div className="flex justify-between gap-4">
                      <span>Uçuş Modu:</span>
                      <span className="text-primary uppercase">Nektar Toplama</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span>Hedef Çiçekler:</span>
                      <span className="text-secondary">Kestane & Çiçek</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Counters */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-800/80 text-center">
                <div>
                  <p className="text-xs text-text-muted font-body">Ziyaret Edilen Çiçek</p>
                  <p className="text-xl font-heading font-black text-primary mt-1">{flowersVisited.toLocaleString('tr-TR')}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted font-body">Toplam Mesafe</p>
                  <p className="text-xl font-heading font-black text-secondary mt-1">{flightDistance} km</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted font-body">Üretilen Ham Bal</p>
                  <p className="text-xl font-heading font-black text-green-400 mt-1">~{honeyYield} g</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hive Anatomy Explorer */}
          <HiveAnatomyExplorer />
        </div>
      )}
    </div>
  );
}
