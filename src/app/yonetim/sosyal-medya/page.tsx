"use client";

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Video, Play, Download, Copy, ExternalLink, 
  Music, Check, Wand2, Image as ImageIcon, Volume2, Share2, Loader2, RefreshCw,
  Calendar, CheckCircle, Clock, AlertCircle, Edit2, Key, ShieldCheck, Layers
} from 'lucide-react';
import { useAdminToast } from '@/context/AdminToastContext';

// Helper to generate social content templates
const generateTemplates = (product: string, style: string) => {
  const normalizedProduct = product || "Ham Bal";
  
  if (style === 'educational') {
    return {
      scriptText: `Her sabah bir kaşık ${normalizedProduct} tüketmenin vücudunuzda neler yapabileceğini biliyor musunuz? Tamamen ham ve işlem görmemiş ${normalizedProduct}, içerdiği yüksek antioksidan ve doğal enzimler sayesinde bağışıklık sisteminizi çelik gibi güçlendirir. Isıl işlem görmediği için tüm vitaminlerini korur. Şifayı uzaklarda aramayın, doğanın mucizesi kovanlardan sofranıza ulaşıyor.`,
      visuals: [
        { time: "00:00 - 00:05", scene: `Yakın çekim kaşıkla kavanozdan ${normalizedProduct} süzülmesi, sabah güneşi ışığı.` },
        { time: "00:05 - 00:15", scene: `${normalizedProduct}'ın pürüzsüz dokusu ve parıldayan altın rengi, ekranda fayda yazıları.` },
        { time: "00:15 - 00:30", scene: "Arı Hayat şık kavanozu ve arkasındaki analiz raporu, laboratuvar güvencesi vurgusu." }
      ],
      caption: `🍯 Şifayı kovanlardan doğrudan sofranıza getiriyoruz! %100 doğal ve analiz raporlu ham ${normalizedProduct} ile güne zinde başlayın. \n\n👉 Sipariş vermek için profilimizdeki linki ziyaret edebilirsiniz. İlk siparişe özel ARI10 kuponu geçerlidir!\n\n#arıhayat #dogalurunler #saglikliyasam #hambal #propolis #sifa`,
      tweets: [
        `1/ Her sabah bir kaşık ${normalizedProduct} tüketmenin vücudunuza etkilerini biliyor musunuz? Bilimsel olarak kanıtlanmış en güçlü doğal antibiyotik ve bağışıklık koruyucularından birini inceliyoruz. 👇 (Zincir)`,
        `2/ Isıl işlem görmüş market ballarının aksine, ham ${normalizedProduct} içerdiği canlı polenler, enzimler ve aminoasitleri tamamen korur. Bu sayede hücre yenilenmesini hızlandırır.`,
        `3/ Biz Arı Hayat olarak ürettiğimiz her seriyi bağımsız laboratuvarlarda analiz ettiriyoruz. Prolin değerleri ve saflık test raporları şeffafça web sitemizde yayındadır.`,
        `4/ Sağlığınızı ve sevdiklerinizi kimyasal katkılardan korumak için hakiki ham arı ürünlerimize göz atın: [Site Linki]`
      ],
      imagePrompt: `Close-up macro shot of organic raw ${normalizedProduct} slowly dripping from a wooden honey dipper, soft natural morning light, highly detailed texture, cinematic, warm color palette, 4k`
    };
  }

  if (style === 'asmr') {
    return {
      scriptText: `Sadece kovanın içindeki o doğal ritim. Ve petekten yavaşça süzülen taze ham ${normalizedProduct}. Hiçbir katkı maddesi, renklendirici veya koruyucu içermez. Doğanın kendi akışı, kovanların en taze ve en lezzetli anı. Arı Hayat ile doğallığı hissedin.`,
      visuals: [
        { time: "00:00 - 00:08", scene: `Körükten çıkan hafif duman, peteğin sırrının yavaşça kesilmesi, çıtırtı sesleri.` },
        { time: "00:08 - 00:20", scene: `Ağır çekim süzülen taze ${normalizedProduct}'ın petek üzerindeki kıvrımları, ASMR vızıltı sesi.` }
      ],
      caption: `🔊 Sesi açın ve doğanın saf melodisini dinleyin. Kovanlarımızdan yeni hasat edilen ham ${normalizedProduct}. 🐝\n\nAnaliz raporlu ürünlerimiz için profilimizdeki linki ziyaret edin.\n\n#asmr #satisfying #arisever #aricilik #hambal #dogalyasam`,
      tweets: [
        `1/ Doğanın kendi ritmi ve muazzam geometrisi. Sırrı kesilen petekten akan taze ${normalizedProduct} karesiyle güne sakin bir başlangıç yapın. 🍯 👇`,
        `2/ Hiçbir yapay ısıl işlem ve kimyasal filtreleme uygulamadan, kovan içi sıcaklığı koruyarak şişelediğimiz ham arı ürünlerimiz sitemizde satışta: [Site Linki]`
      ],
      imagePrompt: `A satisfying view of fresh organic raw ${normalizedProduct} dripping from a honeycomb frame, macro realism, cinematic lighting, warm golden tones, highly detailed, 4k`
    };
  }

  if (style === 'trust') {
    return {
      scriptText: `Bir balın gerçek olup olmadığını anlamak için yakmak veya suya damlatmak yeterli değildir. Hakiki balın tek ispatı laboratuvar analizleridir. Arı Hayat olarak ürettiğimiz her bir ${normalizedProduct} kavanozu için prolin değeri, pestisit ve saflık analizleri yaptırıyoruz. Raporlarımız herkese açık ve şeffaftır.`,
      visuals: [
        { time: "00:00 - 00:07", scene: `Analiz raporu belgesinin resmi kaşesi ve prolin değerlerinin yakın çekim gösterilmesi.` },
        { time: "00:07 - 00:18", scene: `Şişelenen ${normalizedProduct} ürünlerimizin üzerindeki karekodların taranma anı.` },
        { time: "00:18 - 00:30", scene: "Analizli ürünlerimizin web sitemizden sorgulanma arayüzü ekranı." }
      ],
      caption: `📝 Sağlığınızı şansa bırakmayın! Her kavanoz ham ${normalizedProduct} ürünümüzün prolin ve saflık analiz raporunu web sitemizden şeffafça inceleyebilirsiniz. \n\n🔗 Detaylı bilgi için profildeki linke tıklayın.\n\n#arıhayat #guvenilirgida #analizlibal #laboratuvar #sagliklibeslenme`,
      tweets: [
        `1/ Balın sahteliğini kaşıkla süzerek veya yakarak anlayamazsınız. Gerçek test ancak laboratuvarda prolin miktarı ölçülerek yapılır. Peki prolin nedir? 👇`,
        `2/ Prolin, balın kalitesini belirleyen en önemli aminoasittir. Arı Hayat ${normalizedProduct} ürünlerimiz yüksek prolin oranlarıyla standartların çok üzerindedir.`,
        `3/ Şeffaf gıda politikamız gereği tüm tahlil sonuçlarimizi sitemizde yayınlıyoruz. Raporları incelemek için: [Site Linki]`
      ],
      imagePrompt: `A premium dark amber dropper bottle of organic ${normalizedProduct} on a rustic wooden table with honeycomb in background, soft sunbeams, depth of field, 4k`
    };
  }

  // Default behind-the-scenes
  return {
    scriptText: `Arılarımızın kovan içi hummalı çalışması. Doğal çiçek polenlerini toplarken sergiledikleri o muhteşem doğa mucizesi. Arı Hayat kovanlarında arıcılık geleneksel yöntemlerle ve arı sağlığı korunarak sürdürülür. Doğaya ve emeğe saygıyla üretilen ham arı ürünlerimizi keşfedin.`,
    visuals: [
      { time: "00:00 - 00:10", scene: "Çiçeklerin üzerinde polen toplayan işçi arıların yakın makro çekimi." },
      { time: "00:10 - 00:25", scene: "Arıcının kovan çerçevesini dikkatle incelemesi, arıların hareketliliği." }
    ],
    caption: `🐝 Kovanların içinde neler oluyor? İşçi arılarımızın hummalı çalışması ve doğal hasat sürecimiz. \n\nDoğaya zarar vermeden ürettiğimiz ham ballarımız profil linkinde.\n\n#arıcılık #arıkovanı #hambal #dogalhasat #dogayaguleruz`,
    tweets: [
      `1/ Arıların bir damla bal için binlerce çiçeği ziyaret ettiğini biliyor muydunuz? Doğanın en çalışkan mimarlarıyla kovan içi yaşamdan kesitler: 👇`,
      `2/ Doğaya ve arı ekosistemine saygılı geleneksel arıcılık yöntemlerimizle elde ettiğimiz ham ballarımız şimdi yayında: [Site Linki]`
    ],
    imagePrompt: `High professional photograph of modern wooden beehives in a sunny organic lavender field, thousands of honeybees flying around, macro realism, cinematic lighting, 4k`
  };
};

interface DayPlan {
  dayName: string;
  dayKey: string;
  product: string;
  style: string;
  status: 'draft' | 'ready' | 'posted';
  audioUrl: string | null;
  imageUrl: string | null;
  customPrompt: string;
}

interface BufferProfile {
  id: string;
  service: string;
  service_username: string;
  avatar: string;
}

const defaultWeeklyPlan: DayPlan[] = [
  { dayName: 'Pazartesi', dayKey: 'pazartesi', product: 'Kestane Balı', style: 'educational', status: 'draft', audioUrl: null, imageUrl: null, customPrompt: '' },
  { dayName: 'Salı', dayKey: 'sali', product: 'Propolis Damla', style: 'trust', status: 'draft', audioUrl: null, imageUrl: null, customPrompt: '' },
  { dayName: 'Çarşamba', dayKey: 'carsamba', product: 'Kral Arı Sütü', style: 'asmr', status: 'draft', audioUrl: null, imageUrl: null, customPrompt: '' },
  { dayName: 'Perşembe', dayKey: 'persembe', product: 'Süzme Çiçek Balı', style: 'behind', status: 'draft', audioUrl: null, imageUrl: null, customPrompt: '' },
  { dayName: 'Cuma', dayKey: 'cuma', product: 'Doğal Arı Poleni', style: 'educational', status: 'draft', audioUrl: null, imageUrl: null, customPrompt: '' },
  { dayName: 'Cumartesi', dayKey: 'cumartesi', product: 'Propolis Damla', style: 'asmr', status: 'draft', audioUrl: null, imageUrl: null, customPrompt: '' },
  { dayName: 'Pazar', dayKey: 'pazar', product: 'Kestane Balı', style: 'trust', status: 'draft', audioUrl: null, imageUrl: null, customPrompt: '' },
];

export default function SocialMediaAssistant() {
  const [weeklyPlan, setWeeklyPlan] = useState<DayPlan[]>(defaultWeeklyPlan);
  const [selectedDayKey, setSelectedDayKey] = useState<string>('pazartesi');
  const [loading, setLoading] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [activeTab, setActiveTab] = useState<'script' | 'caption' | 'twitter'>('script');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Settings & API keys (stored safely client-side in localStorage)
  const [elevenLabsKey, setElevenLabsKey] = useState('');
  const [bufferToken, setBufferToken] = useState('');
  const [profiles, setProfiles] = useState<BufferProfile[]>([]);
  const [selectedProfiles, setSelectedProfiles] = useState<string[]>([]);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [postingStatus, setPostingStatus] = useState(false);

  const { showToast } = useAdminToast();

  // Load configuration and plans on mount
  useEffect(() => {
    const savedPlan = localStorage.getItem('ari_hayat_weekly_plan');
    if (savedPlan) {
      try { setWeeklyPlan(JSON.parse(savedPlan)); } catch (e) {}
    }

    const savedElevenKey = localStorage.getItem('ari_hayat_elevenlabs_key');
    if (savedElevenKey) setElevenLabsKey(savedElevenKey);

    const savedBufferToken = localStorage.getItem('ari_hayat_buffer_token');
    if (savedBufferToken) {
      setBufferToken(savedBufferToken);
      fetchBufferProfiles(savedBufferToken);
    }
  }, []);

  const savePlan = (updatedPlan: DayPlan[]) => {
    setWeeklyPlan(updatedPlan);
    localStorage.setItem('ari_hayat_weekly_plan', JSON.stringify(updatedPlan));
  };

  const saveSettings = (elevenKey: string, bToken: string) => {
    localStorage.setItem('ari_hayat_elevenlabs_key', elevenKey);
    localStorage.setItem('ari_hayat_buffer_token', bToken);
    showToast('Bağlantı anahtarları başarıyla güncellendi!', 'success');
    if (bToken) fetchBufferProfiles(bToken);
  };

  const fetchBufferProfiles = async (token: string) => {
    setLoadingProfiles(true);
    try {
      const res = await fetch(`/api/admin/social-profiles?bufferToken=${encodeURIComponent(token)}`);
      const data = await res.json();
      if (data.success) {
        setProfiles(data.profiles);
        setSelectedProfiles(data.profiles.map((p: any) => p.id));
      } else {
        showToast('Buffer profilleri alınamadı. Tokenı kontrol edin.', 'error');
      }
    } catch (e) {
      showToast('Profil çekme hatası.', 'error');
    } finally {
      setLoadingProfiles(false);
    }
  };

  const currentDayPlan = weeklyPlan.find(d => d.dayKey === selectedDayKey) || weeklyPlan[0];
  const data = generateTemplates(currentDayPlan.product, currentDayPlan.style);

  const updateCurrentDay = (fields: Partial<DayPlan>) => {
    const updated = weeklyPlan.map(d => {
      if (d.dayKey === selectedDayKey) {
        return { ...d, ...fields };
      }
      return d;
    });
    savePlan(updated);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    showToast(`${label} kopyalandı!`, 'success');
    setTimeout(() => setCopiedText(null), 2000);
  };

  // Browser-Side Edge Neural TTS Client (bypass serverless WS blocks)
  const synthesizeSpeechInBrowser = (text: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const requestId = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const socketUrl = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?trustedclienttoken=6A5AA1D4EAFF4E9B87E7D8561B96A24E`;
      
      const ws = new WebSocket(socketUrl);
      ws.binaryType = 'arraybuffer';
      const chunks: ArrayBuffer[] = [];
      
      const timeout = setTimeout(() => {
        ws.close();
        reject(new Error('Ses sentezleme zaman aşımına uğradı.'));
      }, 12000);

      ws.onopen = () => {
        const configMsg = 
          `X-Timestamp:${Date.now()}\r\n` +
          `Content-Type:application/json; charset=utf-8\r\n` +
          `Path:speech.config\r\n\r\n` +
          JSON.stringify({
            context: {
              system: {
                name: "Edge",
                version: "112.0.1722.68",
                build: "1722.68",
                platform: "Windows"
              }
            },
            audio: {
              format: "audio-24khz-48kbitrate-mono-mp3",
              volume: 0,
              pitch: 0,
              rate: 0
            }
          });
        ws.send(configMsg);

        const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='tr-TR'><voice name='Microsoft Server Speech Text to Speech Voice (tr-TR, AhmetNeural)'>${text}</voice></speak>`;
        const ssmlMsg = 
          `X-RequestId:${requestId}\r\n` +
          `Content-Type:application/ssml+xml\r\n` +
          `X-Timestamp:${Date.now()}\r\n` +
          `Path:ssml\r\n\r\n` +
          ssml;
        ws.send(ssmlMsg);
      };

      ws.onmessage = (event) => {
        const msgData = event.data;
        if (typeof msgData === 'string') {
          if (msgData.includes('Path:turn.end')) {
            clearTimeout(timeout);
            ws.close();
            const blob = new Blob(chunks, { type: 'audio/mpeg' });
            resolve(blob);
          }
        } else if (msgData instanceof ArrayBuffer) {
          const view = new DataView(msgData);
          const headerLength = view.getUint16(0);
          const audioChunk = msgData.slice(2 + headerLength);
          if (audioChunk.byteLength > 0) {
            chunks.push(audioChunk);
          }
        }
      };

      ws.onclose = () => {
        clearTimeout(timeout);
        if (chunks.length > 0) {
          const blob = new Blob(chunks, { type: 'audio/mpeg' });
          resolve(blob);
        } else {
          reject(new Error('Bağlantı ses üretilemeden kapandı.'));
        }
      };

      ws.onerror = (err) => {
        clearTimeout(timeout);
        reject(err);
      };
    });
  };

  const handleGenerateVoice = async () => {
    setLoading(true);
    updateCurrentDay({ audioUrl: null });
    
    try {
      // 1. Try Browser-side Edge Neural TTS WebSocket (tr-TR, AhmetNeural)
      const blob = await synthesizeSpeechInBrowser(data.scriptText);
      const url = URL.createObjectURL(blob);
      updateCurrentDay({ audioUrl: url });
      showToast(`${currentDayPlan.dayName} günü için premium Ahmet (Tok Erkek) sesi üretildi!`, 'success');
    } catch (browserError) {
      console.warn("Browser-side Edge TTS failed, falling back to server endpoint:", browserError);
      
      // 2. Fallback to server endpoint (Google Translate TTS or ElevenLabs if key available)
      try {
        const res = await fetch(`/api/tts?text=${encodeURIComponent(data.scriptText)}&elevenLabsKey=${encodeURIComponent(elevenLabsKey)}`);
        if (res.ok) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          updateCurrentDay({ audioUrl: url });
          showToast(`${currentDayPlan.dayName} için yedek seslendirme dosyası oluşturuldu.`, 'success');
        } else {
          showToast('Seslendirme üretilemedi. Lütfen tekrar deneyin.', 'error');
        }
      } catch (err) {
        showToast('Ses motoru başlatılamadı.', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    setGeneratingImage(true);
    updateCurrentDay({ imageUrl: null });
    try {
      const prompt = currentDayPlan.customPrompt || data.imagePrompt;
      const seed = Math.floor(Math.random() * 1000000);
      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1080&height=1920&nologo=true&seed=${seed}`;
      
      const img = new Image();
      img.src = url;
      img.onload = () => {
        updateCurrentDay({ imageUrl: url });
        setGeneratingImage(false);
        showToast(`${currentDayPlan.dayName} günü için yapay zeka resmi çizildi!`, 'success');
      };
      img.onerror = () => {
        throw new Error('Image load failed');
      };
    } catch (error) {
      showToast('Görsel üretilirken bir hata oluştu.', 'error');
      setGeneratingImage(false);
    }
  };

  const handleAutoShare = async () => {
    if (!bufferToken) {
      showToast('Lütfen önce Buffer Access Token girin.', 'error');
      return;
    }
    if (selectedProfiles.length === 0) {
      showToast('Lütfen en az bir paylaşılacak sosyal medya hesabı seçin.', 'error');
      return;
    }

    setPostingStatus(true);
    try {
      const res = await fetch('/api/admin/social-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bufferToken,
          profileIds: selectedProfiles,
          text: data.caption,
          mediaUrl: currentDayPlan.imageUrl || 'https://arihayat.com/images/logo.png',
        })
      });

      const resData = await res.json();
      if (resData.success) {
        updateCurrentDay({ status: 'posted' });
        showToast('Tüm seçili kanallara otomatik paylaşıldı (Buffer Sırasına Eklendi)!', 'success');
      } else {
        showToast(`Paylaşım başarısız: ${resData.error}`, 'error');
      }
    } catch (e) {
      showToast('Otomatik paylaşım sırasında bir ağ hatası oluştu.', 'error');
    } finally {
      setPostingStatus(false);
    }
  };

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-700 uppercase tracking-tight flex items-center">
            <Sparkles className="w-8 h-8 mr-2 text-primary animate-pulse" /> Sosyal Medya Asistanı
          </h1>
          <p className="text-sm text-gray-400 font-body mt-1">Haftalık içeriklerinizi yönetin, premium sesler oluşturun ve otomatik paylaşın.</p>
        </div>
        
        <div className="flex space-x-2">
          <a
            href="/yonetim/sosyal-medya/rapor"
            className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/30 rounded-xl text-xs font-bold transition-all flex items-center"
          >
            <Layers className="w-4 h-4 mr-1.5 animate-pulse" /> SaaS Entegrasyon Raporu
          </a>
          <button 
            onClick={() => {
              if(confirm("Haftalık planı varsayılana sıfırlamak istiyor musunuz?")) {
                savePlan(defaultWeeklyPlan);
                showToast("Plan sıfırlandı", "success");
              }
            }}
            className="px-4 py-2 bg-red-950/40 hover:bg-red-900/30 text-red-400 border border-red-900/50 rounded-xl text-xs font-bold transition-all"
          >
            Haftalık Planı Sıfırla
          </button>
        </div>
      </div>

      {/* 📅 Weekly Calendar Timeline */}
      <div className="bg-[#111827]/40 backdrop-blur-xl p-4 rounded-2xl border border-gray-800/80 mb-8 overflow-x-auto shadow-inner">
        <div className="flex items-center space-x-2 text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">
          <Calendar className="w-4 h-4 text-primary" /> Haftalık İçerik Planlama Akışı
        </div>
        
        <div className="flex min-w-[760px] gap-3">
          {weeklyPlan.map((day) => {
            const isActive = day.dayKey === selectedDayKey;
            return (
              <button
                key={day.dayKey}
                onClick={() => {
                  setSelectedDayKey(day.dayKey);
                  setActiveTab('script');
                }}
                className={`flex-1 p-4 rounded-xl border transition-all text-left relative overflow-hidden group ${
                  isActive 
                    ? 'bg-gradient-to-br from-primary/10 to-amber-600/5 border-primary shadow-lg shadow-primary/5' 
                    : 'bg-[#151D30]/40 border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className={`absolute top-0 left-0 bottom-0 w-1 ${isActive ? 'bg-primary' : 'bg-transparent'}`} />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider block">{day.dayName}</span>
                <span className="text-xs text-white font-bold block mt-1 truncate">{day.product}</span>
                <span className="text-[9px] text-gray-400 italic block mt-0.5 capitalize">{day.style === 'trust' ? 'Güven/Analiz' : day.style === 'asmr' ? 'ASMR' : day.style === 'educational' ? 'Eğitici' : 'Kovan Hayatı'}</span>
                
                {/* Status Badges */}
                <div className="mt-3 flex items-center justify-between">
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${
                    day.status === 'posted'
                      ? 'bg-green-950/80 text-green-400 border-green-800/60'
                      : day.status === 'ready'
                      ? 'bg-blue-950/80 text-blue-400 border-blue-800/60'
                      : 'bg-gray-800 text-gray-400 border-gray-700'
                  }`}>
                    {day.status === 'posted' ? 'Paylaşıldı' : day.status === 'ready' ? 'Hazır' : 'Taslak'}
                  </span>

                  {/* Visual Presence Indicators */}
                  <div className="flex space-x-1">
                    {day.audioUrl && <Volume2 className="w-3 h-3 text-primary" />}
                    {day.imageUrl && <ImageIcon className="w-3 h-3 text-amber-500" />}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Configuration & Settings API Keys */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Settings API Keys Panel */}
          <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg space-y-4">
            <h2 className="text-sm font-heading font-bold text-white uppercase flex items-center">
              <Key className="w-4 h-4 mr-2 text-primary" /> Sosyal Medya & AI Bağlantıları
            </h2>
            <p className="text-[11px] text-gray-400 leading-relaxed">Hesaplarınızı bağlayıp Premium sesleri etkinleştirmek için anahtarlarınızı buraya girin. Bilgiler sadece tarayıcınızda saklanır.</p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-gray-400 mb-1 text-[10px] uppercase font-bold">ElevenLabs API Anahtarı (Gerçekçi Sesler)</label>
                <input 
                  type="password"
                  placeholder="ElevenLabs API Key..."
                  value={elevenLabsKey}
                  onChange={e => setElevenLabsKey(e.target.value)}
                  className="w-full p-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 text-[10px] uppercase font-bold">Buffer Access Token (Otomatik Paylaşım)</label>
                <input 
                  type="password"
                  placeholder="Buffer Access Token..."
                  value={bufferToken}
                  onChange={e => setBufferToken(e.target.value)}
                  className="w-full p-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-primary"
                />
              </div>

              <button
                onClick={() => saveSettings(elevenLabsKey, bufferToken)}
                className="w-full py-2 bg-primary hover:bg-primary-hover text-secondary font-bold text-xs uppercase rounded-lg transition-colors flex items-center justify-center"
              >
                <ShieldCheck className="w-4 h-4 mr-1.5" /> Bağlantıları Kaydet
              </button>
            </div>
          </div>

          {/* Selected Day Setup */}
          <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg space-y-6 h-fit">
            <h2 className="text-xs font-heading font-bold text-gray-400 uppercase flex items-center border-b border-gray-800 pb-3">
              <Wand2 className="w-4 h-4 mr-2 text-primary" /> {currentDayPlan.dayName} Günü Ayarları
            </h2>

            {/* Product Select */}
            <div>
              <label className="block text-gray-400 mb-2 text-xs font-body uppercase">Ürün</label>
              <select 
                value={currentDayPlan.product} 
                onChange={e => updateCurrentDay({ product: e.target.value })} 
                className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-xl text-white outline-none focus:border-primary font-bold text-sm"
              >
                <option value="Kestane Balı">Kestane Balı</option>
                <option value="Süzme Çiçek Balı">Süzme Çiçek Balı</option>
                <option value="Propolis Damla">Propolis Damla</option>
                <option value="Kral Arı Sütü">Kral Arı Sütü</option>
                <option value="Doğal Arı Poleni">Doğal Arı Poleni</option>
              </select>
            </div>

            {/* Style Select */}
            <div>
              <label className="block text-gray-400 mb-2 text-xs font-body uppercase">Konsept Tarzı</label>
              <div className="space-y-1.5">
                {[
                  { id: 'educational', label: 'Eğitici & Sağlık Faydaları' },
                  { id: 'asmr', label: 'ASMR & Canlandırıcı Çekim' },
                  { id: 'trust', label: 'Güven & Şeffaf Analiz' },
                  { id: 'behind', label: 'Kovan Hayatı (Üretim)' }
                ].map((styleOption) => (
                  <button
                    key={styleOption.id}
                    onClick={() => updateCurrentDay({ style: styleOption.id })}
                    className={`w-full text-left px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex justify-between items-center ${
                      currentDayPlan.style === styleOption.id 
                        ? 'bg-primary/10 border-primary text-primary' 
                        : 'bg-[#1F2937]/50 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    {styleOption.label}
                    {currentDayPlan.style === styleOption.id && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Status Tracker */}
            <div>
              <label className="block text-gray-400 mb-2 text-xs font-body uppercase">Yayın Durumu</label>
              <div className="flex gap-2">
                {[
                  { id: 'draft', label: 'Taslak' },
                  { id: 'ready', label: 'Hazır' },
                  { id: 'posted', label: 'Paylaşıldı' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => updateCurrentDay({ status: s.id as any })}
                    className={`flex-1 py-2 rounded-lg border text-xs font-bold text-center transition-all ${
                      currentDayPlan.status === s.id
                        ? 'bg-primary text-secondary border-primary'
                        : 'bg-[#1F2937]/30 border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Generator Trigger */}
            <div className="pt-4 border-t border-gray-800">
              <button
                onClick={handleGenerateVoice}
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-amber-700 hover:from-amber-600 hover:to-amber-800 text-secondary p-3 rounded-xl font-heading font-black text-xs uppercase flex items-center justify-center transition-all shadow-lg disabled:opacity-50"
              >
                {loading ? (
                  <>Seslendiriliyor...</>
                ) : (
                  <>
                    <Music className="w-4 h-4 mr-2" /> Premium Ahmet Sesiyle Üret
                  </>
                )}
              </button>
            </div>

            {currentDayPlan.audioUrl && (
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
                <div className="flex items-center text-xs font-bold text-primary">
                  <Volume2 className="w-4 h-4 mr-2 animate-bounce" /> Seslendirme Dosyanız Hazır!
                </div>
                <audio src={currentDayPlan.audioUrl} controls className="w-full accent-primary" />
                <a 
                  href={currentDayPlan.audioUrl} 
                  download={`ari-hayat-${currentDayPlan.dayKey}-${currentDayPlan.product.toLowerCase().replace(/\s+/g, '-')}.mp3`}
                  className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs font-bold text-center block text-white transition-colors flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" /> MP3 İndir
                </a>
              </div>
            )}
          </div>

        </div>

        {/* Center/Right Outputs Panel */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Main AI Output Box */}
          <div className="bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden shadow-lg">
            
            {/* Tabs */}
            <div className="flex border-b border-gray-800 bg-[#111827] select-none">
              {[
                { id: 'script', label: 'Reels / TikTok Senaryosu' },
                { id: 'caption', label: 'Açıklama & Hashtag' },
                { id: 'twitter', label: 'X (Twitter) Flood' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 py-4 text-xs font-heading font-black uppercase tracking-widest border-b-2 transition-all ${
                    activeTab === tab.id 
                      ? 'border-primary text-primary bg-[#1F2937]/30' 
                      : 'border-transparent text-gray-500 hover:text-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Body */}
            <div className="p-6">
              {activeTab === 'script' && (
                <div className="space-y-6">
                  <div className="bg-[#1F2937]/40 p-4 rounded-xl border border-gray-800">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-gray-400 uppercase">Dış Ses (Seslendirilecek Metin)</span>
                      <button 
                        onClick={() => handleCopy(data.scriptText, 'Senaryo')}
                        className="text-primary hover:text-primary-hover text-xs font-bold flex items-center transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5 mr-1" /> Kopyala
                      </button>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-200">{data.scriptText}</p>
                  </div>

                  <div className="space-y-3">
                    <span className="text-xs font-bold text-gray-400 uppercase block">Kamera & Görsel Akış Talimatları</span>
                    {data.visuals.map((vis, idx) => (
                      <div key={idx} className="flex space-x-3 p-3 bg-gray-900/30 rounded-lg border border-gray-800/50">
                        <span className="text-xs font-mono font-bold text-primary">{vis.time}</span>
                        <p className="text-xs text-gray-300">{vis.scene}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'caption' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">Kopyalanabilir Açıklama</span>
                    <button 
                      onClick={() => handleCopy(data.caption, 'Açıklama')}
                      className="text-primary hover:text-primary-hover text-xs font-bold flex items-center transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5 mr-1" /> Kopyala
                    </button>
                  </div>
                  <textarea 
                    readOnly 
                    value={data.caption} 
                    className="w-full p-4 bg-[#1F2937]/40 border border-gray-800 rounded-xl text-sm text-gray-200 outline-none min-h-[180px] font-body"
                  />
                </div>
              )}

              {activeTab === 'twitter' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">Kopyalanabilir Tweetler</span>
                    <button 
                      onClick={() => handleCopy(data.tweets.join('\n\n'), 'Tweet Zinciri')}
                      className="text-primary hover:text-primary-hover text-xs font-bold flex items-center transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5 mr-1" /> Tümünü Kopyala
                    </button>
                  </div>
                  <div className="space-y-3">
                    {data.tweets.map((tweet, idx) => (
                      <div key={idx} className="p-4 bg-[#1F2937]/30 border border-gray-800 rounded-xl relative group">
                        <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleCopy(tweet, `Tweet ${idx + 1}`)}
                            className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 p-1.5 rounded"
                          >
                            Kopyala
                          </button>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase block mb-1">Tweet {idx + 1}</span>
                        <p className="text-sm text-gray-300">{tweet}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AI Image Generation Area */}
          <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg space-y-6">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-md font-heading font-bold text-white uppercase flex items-center">
                <ImageIcon className="w-5 h-5 mr-2 text-primary" /> Görsel Oluşturucu ({currentDayPlan.dayName})
              </h3>
              <span className="bg-green-950 text-green-400 border border-green-800 text-[10px] px-2 py-0.5 rounded-full font-bold">ÜCRETSİZ & SINIRSIZ</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Prompt Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Görsel Oluşturma İstemi (Prompt)</label>
                  <textarea 
                    value={currentDayPlan.customPrompt || data.imagePrompt}
                    onChange={e => updateCurrentDay({ customPrompt: e.target.value })}
                    className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-xl text-white outline-none focus:border-primary text-xs font-mono min-h-[120px]"
                    placeholder="İngilizce olarak oluşturmak istediğiniz resmi detaylıca tarif edin..."
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">En iyi sonuç için İngilizce komutlar tercih edin.</span>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={handleGenerateImage}
                    disabled={generatingImage}
                    className="flex-1 bg-primary hover:bg-primary-hover text-secondary p-3.5 rounded-xl font-heading font-black text-xs uppercase flex items-center justify-center transition-all disabled:opacity-50"
                  >
                    {generatingImage ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Görsel Çiziliyor...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4 mr-2" /> Görseli Oluştur
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => updateCurrentDay({ customPrompt: '' })}
                    className="bg-gray-800 hover:bg-gray-700 text-white p-3.5 rounded-xl font-bold transition-colors"
                    title="Varsayılana Sıfırla"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 bg-gray-900/40 rounded-xl border border-gray-800/80">
                  <span className="text-xs font-bold text-amber-500 uppercase block mb-1">💡 Videoya Canlandırma Tüyosu</span>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Oluşturulan resmi indirip <a href="https://lumalabs.ai/dream-machine" target="_blank" className="text-primary underline">Luma Labs</a> veya <a href="https://runwayml.com" target="_blank" className="text-primary underline">Runway ML</a> sitesine yükleyerek ücretsiz canlandırabilirsiniz.
                  </p>
                </div>
              </div>

              {/* Generated Image Result */}
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-950 flex flex-col justify-center items-center min-h-[300px] relative">
                {generatingImage ? (
                  <div className="text-center p-6 space-y-3">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                    <span className="text-xs text-gray-400 block font-bold uppercase tracking-wider">Arı Hayat AI çizim yapıyor...</span>
                  </div>
                ) : currentDayPlan.imageUrl ? (
                  <>
                    <img 
                      src={currentDayPlan.imageUrl} 
                      alt="AI Generated" 
                      className="w-full h-[320px] object-cover"
                    />
                    <div className="absolute bottom-3 right-3">
                      <a 
                        href={currentDayPlan.imageUrl} 
                        download={`ari-hayat-ai-${currentDayPlan.dayKey}.png`}
                        className="bg-black/80 hover:bg-black/95 text-white px-3 py-2 rounded-lg font-bold text-xs flex items-center backdrop-blur transition-all"
                      >
                        <Download className="w-3.5 h-3.5 mr-1" /> Resmi İndir
                      </a>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6 text-gray-600">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-700" />
                    <span className="text-xs font-bold uppercase block tracking-wider">Henüz Görsel Üretilmedi</span>
                    <p className="text-[11px] text-gray-500 max-w-[200px] mx-auto mt-1">Sol taraftaki komutu kullanarak yeni bir görsel oluşturun.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Buffer Automated Social Publisher */}
          <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg space-y-4">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-sm font-heading font-bold text-white uppercase flex items-center">
                <Share2 className="w-4 h-4 mr-2 text-primary" /> Sosyal Medya Otomatik Paylaşım (Buffer)
              </h3>
            </div>
            
            {bufferToken ? (
              <div className="space-y-4">
                {loadingProfiles ? (
                  <div className="flex items-center space-x-2 text-xs text-gray-400">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span>Bağlı hesaplar çekiliyor...</span>
                  </div>
                ) : profiles.length > 0 ? (
                  <div className="space-y-3">
                    <label className="block text-gray-400 text-xs font-bold uppercase">Paylaşılacak Hesapları Seçin</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {profiles.map((profile) => {
                        const isSelected = selectedProfiles.includes(profile.id);
                        return (
                          <button
                            key={profile.id}
                            onClick={() => {
                              if (isSelected) {
                                setSelectedProfiles(selectedProfiles.filter(id => id !== profile.id));
                              } else {
                                setSelectedProfiles([...selectedProfiles, profile.id]);
                              }
                            }}
                            className={`flex items-center space-x-2 p-2 rounded-lg border text-left transition-all ${
                              isSelected 
                                ? 'bg-primary/10 border-primary text-white' 
                                : 'bg-[#1F2937]/30 border-gray-800 text-gray-400 hover:border-gray-700'
                            }`}
                          >
                            <img src={profile.avatar} alt={profile.service} className="w-6 h-6 rounded-full border border-gray-800" />
                            <div className="overflow-hidden">
                              <span className="text-[10px] font-bold block uppercase text-primary">{profile.service}</span>
                              <span className="text-[9px] text-gray-300 block truncate">@{profile.service_username}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <button
                      onClick={handleAutoShare}
                      disabled={postingStatus || selectedProfiles.length === 0}
                      className="w-full bg-gradient-to-r from-primary to-amber-700 hover:from-amber-600 hover:to-amber-800 text-secondary p-3.5 rounded-xl font-heading font-black text-xs uppercase flex items-center justify-center transition-all disabled:opacity-50"
                    >
                      {postingStatus ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Paylaşım Yapılıyor (Buffer)...
                        </>
                      ) : (
                        <>
                          <Share2 className="w-4 h-4 mr-2" /> Seçili Hesaplarda Otomatik Paylaş
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">Bağlı sosyal medya hesabı bulunamadı. Lütfen Buffer profilinize gidip sosyal ağlarınızı bağlayın.</p>
                )}
              </div>
            ) : (
              <div className="p-4 bg-yellow-950/20 border border-yellow-900/50 rounded-xl text-xs text-yellow-300 leading-relaxed">
                📢 Otomatik paylaşımı aktif etmek için sol paneldeki <strong>Buffer Access Token</strong> alanını doldurun ve kaydedin. Hesaplarınız otomatik olarak buraya gelecektir.
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
