"use client";

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Video, Play, Download, Copy, ExternalLink, 
  Music, Check, Wand2, Image as ImageIcon, Volume2, Share2, Loader2, RefreshCw,
  Calendar, CheckCircle, Clock, AlertCircle, Edit2, Key, ShieldCheck, Layers, Zap
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
  videoUrl?: string | null;
  aspectRatio?: '9:16' | '1:1' | '16:9';
  customPrompt: string;
  scriptText?: string;
  caption?: string;
  tweets?: string[];
  customVisuals?: any[];
}

interface BufferProfile {
  id: string;
  service: string;
  service_username: string;
  avatar: string;
}

const defaultWeeklyPlan: DayPlan[] = [
  { dayName: 'Pazartesi', dayKey: 'pazartesi', product: 'Kestane Balı', style: 'educational', status: 'draft', audioUrl: null, imageUrl: null, videoUrl: null, aspectRatio: '9:16', customPrompt: '' },
  { dayName: 'Salı', dayKey: 'sali', product: 'Propolis Damla', style: 'trust', status: 'draft', audioUrl: null, imageUrl: null, videoUrl: null, aspectRatio: '9:16', customPrompt: '' },
  { dayName: 'Çarşamba', dayKey: 'carsamba', product: 'Kral Arı Sütü', style: 'asmr', status: 'draft', audioUrl: null, imageUrl: null, videoUrl: null, aspectRatio: '9:16', customPrompt: '' },
  { dayName: 'Perşembe', dayKey: 'persembe', product: 'Süzme Çiçek Balı', style: 'behind', status: 'draft', audioUrl: null, imageUrl: null, videoUrl: null, aspectRatio: '9:16', customPrompt: '' },
  { dayName: 'Cuma', dayKey: 'cuma', product: 'Doğal Arı Poleni', style: 'educational', status: 'draft', audioUrl: null, imageUrl: null, videoUrl: null, aspectRatio: '9:16', customPrompt: '' },
  { dayName: 'Cumartesi', dayKey: 'cumartesi', product: 'Propolis Damla', style: 'asmr', status: 'draft', audioUrl: null, imageUrl: null, videoUrl: null, aspectRatio: '9:16', customPrompt: '' },
  { dayName: 'Pazar', dayKey: 'pazar', product: 'Kestane Balı', style: 'trust', status: 'draft', audioUrl: null, imageUrl: null, videoUrl: null, aspectRatio: '9:16', customPrompt: '' },
];

export default function SocialMediaAssistant() {
  const [weeklyPlan, setWeeklyPlan] = useState<DayPlan[]>(defaultWeeklyPlan);
  const [selectedDayKey, setSelectedDayKey] = useState<string>('pazartesi');
  const [loading, setLoading] = useState(false);
  const [generatingImage, setGeneratingImage] = useState(false);
  const [generatingVideo, setGeneratingVideo] = useState(false);
  const [videoPollingStatus, setVideoPollingStatus] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'script' | 'caption' | 'twitter'>('script');
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // AI Trend State
  const [geminiKey, setGeminiKey] = useState('');
  const [geminiVoice, setGeminiVoice] = useState('Aoede');
  const [trendKeywords, setTrendKeywords] = useState('');
  const [analyzingTrends, setAnalyzingTrends] = useState(false);

  // Settings & API keys (stored safely client-side in localStorage)
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
      try { 
        const parsed = JSON.parse(savedPlan);
        // Migrating old storage keys to include default aspectRatio & videoUrl
        const migrated = parsed.map((p: any) => ({
          ...p,
          aspectRatio: p.aspectRatio || '9:16',
          videoUrl: p.videoUrl || null
        }));
        setWeeklyPlan(migrated); 
      } catch (e) {}
    }

    const savedGeminiKey = localStorage.getItem('ari_hayat_gemini_key');
    if (savedGeminiKey) setGeminiKey(savedGeminiKey);

    const savedGeminiVoice = localStorage.getItem('ari_hayat_gemini_voice');
    if (savedGeminiVoice) setGeminiVoice(savedGeminiVoice);

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

  const saveSettings = (bToken: string, gKey: string, gVoice: string) => {
    localStorage.setItem('ari_hayat_buffer_token', bToken);
    localStorage.setItem('ari_hayat_gemini_key', gKey);
    localStorage.setItem('ari_hayat_gemini_voice', gVoice);
    showToast('Bağlantı anahtarları ve ses ayarları başarıyla güncellendi!', 'success');
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
  const templateData = generateTemplates(currentDayPlan.product, currentDayPlan.style);
  
  const data = {
    scriptText: currentDayPlan.scriptText || templateData.scriptText,
    caption: currentDayPlan.caption || templateData.caption,
    tweets: currentDayPlan.tweets || templateData.tweets,
    imagePrompt: currentDayPlan.customPrompt || templateData.imagePrompt,
    visuals: currentDayPlan.customVisuals || templateData.visuals
  };

  const updateCurrentDay = (fields: Partial<DayPlan>) => {
    const updated = weeklyPlan.map(d => {
      if (d.dayKey === selectedDayKey) {
        return { ...d, ...fields };
      }
      return d;
    });
    savePlan(updated);
  };

  const handleTrendAnalysis = async () => {
    if (!geminiKey) {
      showToast('Lütfen önce ayarlardan Gemini API Anahtarı girin.', 'error');
      return;
    }
    if (!trendKeywords) {
      showToast('Lütfen rakip hesapları veya analiz edilecek konuyu girin.', 'error');
      return;
    }

    setAnalyzingTrends(true);
    try {
      const res = await fetch('/api/admin/trend-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          geminiKey,
          keywords: trendKeywords,
          product: currentDayPlan.product
        })
      });

      const data = await res.json();
      if (data.success) {
        updateCurrentDay({
          scriptText: data.data.scriptText,
          caption: data.data.caption,
          tweets: data.data.tweets,
          customPrompt: data.data.imagePrompt,
          customVisuals: data.data.visuals
        });
        showToast('Yapay Zeka trend analizi tamamlandı ve içerik oluşturuldu!', 'success');
      } else {
        showToast(`Analiz hatası: ${data.error}`, 'error');
      }
    } catch (e) {
      showToast('Ağ hatası. Trend analizi yapılamadı.', 'error');
    } finally {
      setAnalyzingTrends(false);
    }
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    showToast(`${label} kopyalandı!`, 'success');
    setTimeout(() => setCopiedText(null), 2000);
  };

  const sha256_pure_js = (ascii: string): string => {
    function rightRotate(value: number, amount: number) {
      return (value >>> amount) | (value << (32 - amount));
    }
    
    const mathPow = Math.pow;
    const maxWord = mathPow(2, 32);
    const lengthProperty = 'length';
    let i, j;
    let result = '';

    const words: number[] = [];
    const asciiLength = ascii[lengthProperty] * 8;
    
    let hash: number[] = [];
    const k: number[] = [];
    let primeCounter = 0;

    const isPrime = (n: number) => {
      let divisor = 2;
      while (n % divisor) {
        divisor++;
      }
      return divisor === n;
    };

    let candidate = 2;
    while (primeCounter < 64) {
      if (isPrime(candidate)) {
        if (primeCounter < 8) {
          hash[primeCounter] = (mathPow(candidate, .5) * maxWord) | 0;
        }
        k[primeCounter] = (mathPow(candidate, 1/3) * maxWord) | 0;
        primeCounter++;
      }
      candidate++;
    }
    
    ascii += '\x80';
    while (ascii[lengthProperty] % 64 - 56) ascii += '\x00';
    
    for (i = 0; i < ascii[lengthProperty]; i++) {
      j = ascii.charCodeAt(i);
      if (j >> 8) return ''; // ASCII only
      words[i >> 2] |= j << (24 - (i % 4) * 8);
    }
    words[words[lengthProperty]] = ((asciiLength / maxWord) | 0);
    words[words[lengthProperty]] = (asciiLength | 0);
    
    for (j = 0; j < words[lengthProperty];) {
      const w = words.slice(j, j += 16);
      const oldHash = hash.slice(0);
      
      for (i = 0; i < 64; i++) {
        const w15 = w[i - 15], w2 = w[i - 2];
        const s0 = rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15 >>> 3);
        const s1 = rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2 >>> 10);
        w[i] = i < 16 ? w[i] : (w[i - 16] + s0 + w[i - 7] + s1) | 0;
        
        const a = hash[0], e = hash[4];
        const temp1 = (hash[7] + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + ((e & hash[5]) ^ (~e & hash[6])) + k[i] + w[i]) | 0;
        const temp2 = ((rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + ((a & hash[1]) ^ (a & hash[2]) ^ (hash[1] & hash[2]))) | 0;
        
        hash = [(temp1 + temp2) | 0].concat(hash);
        hash[4] = (hash[4] + temp1) | 0;
      }
      
      for (i = 0; i < 8; i++) {
        hash[i] = (hash[i] + oldHash[i]) | 0;
      }
    }
    
    for (i = 0; i < 8; i++) {
      const val = hash[i] >>> 0;
      result += val.toString(16).padStart(8, '0');
    }
    return result.toUpperCase();
  };

  const sha256 = async (message: string): Promise<string> => {
    if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
      try {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        return hashHex.toUpperCase();
      } catch (e) {
        console.warn("Subtle crypto digest failed, falling back to pure JS hash:", e);
      }
    }
    return sha256_pure_js(message);
  };

  const getSecMsGecToken = async (): Promise<string> => {
    const ticks = BigInt(Math.floor(Date.now() / 1000) + 11644473600) * BigInt("10000000");
    const truncatedTicks = ticks - (ticks % BigInt("3000000000"));
    const str = truncatedTicks.toString() + "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
    return await sha256(str);
  };

  const synthesizeSpeechInBrowser = async (text: string): Promise<Blob> => {
    const token = await getSecMsGecToken();
    const requestId = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    const socketUrl = `wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?trustedclienttoken=6A5AA1D4EAFF4E9FB37E23D68491D6F4&ConnectionId=${requestId}&Sec-MS-GEC=${token}&Sec-MS-GEC-Version=1-133.0.3065.59`;

    return new Promise((resolve, reject) => {
      const ws = new WebSocket(socketUrl);
      ws.binaryType = 'arraybuffer';
      const chunks: ArrayBuffer[] = [];
      
      const timeout = setTimeout(() => {
        ws.close();
        reject(new Error('Ses sentezleme zaman aşımına uğradı.'));
      }, 15000);

      ws.onopen = () => {
        const configMsg = 
          `Content-Type:application/json; charset=utf-8\r\n` +
          `Path:speech.config\r\n\r\n` +
          JSON.stringify({
            context: {
              synthesis: {
                audio: {
                  metadataoptions: {
                    sentenceBoundaryEnabled: "false",
                    wordBoundaryEnabled: "true"
                  },
                  outputFormat: "audio-24khz-48kbitrate-mono-mp3"
                }
              }
            }
          });
        ws.send(configMsg);

        const ssml = `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='tr-TR'><voice name='Microsoft Server Speech Text to Speech Voice (tr-TR, AhmetNeural)'>${text}</voice></speak>`;
        const ssmlMsg = 
          `X-RequestId:${requestId}\r\n` +
          `Content-Type:application/ssml+xml\r\n` +
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
          try {
            const view = new DataView(msgData);
            const headerLength = view.getUint16(0);
            const audioChunk = msgData.slice(2 + headerLength);
            if (audioChunk.byteLength > 0) {
              chunks.push(audioChunk);
            }
          } catch (e) {
            console.error("Binary audio chunk parse error:", e);
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

  const synthesizeSpeechWithGemini = async (text: string, apiKey: string, voice: string): Promise<Blob> => {
    // We use gemini-2.0-flash as the standard native audio model
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const prompt = `Lütfen aşağıdaki metni çok doğal, profesyonel ve etkileyici bir Türkçe seslendirme tonuyla oku. Duraklamalara ve vurgulara dikkat et. Sadece metni seslendir, başka hiçbir şey söyleme:\n\n${text}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: {
                voiceName: voice 
              }
            }
          }
        }
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error?.message || 'Gemini ses üretim hatası');
    }

    const data = await response.json();
    const part = data.candidates?.[0]?.content?.parts?.[0];
    
    if (!part || !part.inlineData) {
      throw new Error('Gemini API ses verisi döndürmedi. Lütfen API anahtarınızı veya model desteğini kontrol edin.');
    }

    const base64Data = part.inlineData.data;
    const mimeType = part.inlineData.mimeType || 'audio/mp3';
    
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: mimeType });
  };

  const handleGenerateVoice = async () => {
    setLoading(true);
    updateCurrentDay({ audioUrl: null });
    
    try {
      // 1. Try Gemini API TTS first if Gemini key is present
      if (geminiKey) {
        console.log("Attempting Gemini API TTS with voice:", geminiVoice);
        const blob = await synthesizeSpeechWithGemini(data.scriptText || '', geminiKey, geminiVoice);
        const url = URL.createObjectURL(blob);
        updateCurrentDay({ audioUrl: url });
        showToast(`${currentDayPlan.dayName} günü için Gemini yapay zeka sesi üretildi!`, 'success');
        setLoading(false);
        return;
      }
      
      // If no Gemini key, fall back to browser client-side Edge TTS
      console.log("Attempting client-side Edge TTS...");
      const blob = await synthesizeSpeechInBrowser(data.scriptText || '');
      const url = URL.createObjectURL(blob);
      updateCurrentDay({ audioUrl: url });
      showToast(`${currentDayPlan.dayName} günü için ücretsiz yapay zeka sesi üretildi!`, 'success');
    } catch (clientErr: any) {
      console.warn("Primary TTS failed, trying server-side proxy:", clientErr);
      
      // 2. Fallback: Try server-side API route (which has clock sync and Google Translate backup)
      try {
        console.log("Attempting server-side TTS proxy...");
        const res = await fetch(`/api/tts?text=${encodeURIComponent(data.scriptText || '')}`);
        if (!res.ok) {
          throw new Error('Ses sentezleme API hatası');
        }
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        updateCurrentDay({ audioUrl: url });
        showToast(`${currentDayPlan.dayName} günü için ücretsiz yapay zeka sesi üretildi (Yedek Hat)!`, 'success');
      } catch (serverErr: any) {
        console.error("Server-side TTS failed too:", serverErr);
        showToast(`Ses motoru başlatılamadı. Lütfen tekrar deneyin. (Hata: ${clientErr?.message || 'Tarayıcı hatası'} / ${serverErr?.message || 'Sunucu hatası'})`, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    setGeneratingImage(true);
    updateCurrentDay({ imageUrl: null, videoUrl: null }); // Clear previous image and video
    try {
      const prompt = currentDayPlan.customPrompt || data.imagePrompt;
      const seed = Math.floor(Math.random() * 1000000);
      
      // Select dimensions based on aspect ratio
      const ratio = currentDayPlan.aspectRatio || '9:16';
      let w = 1080;
      let h = 1920;
      if (ratio === '1:1') {
        w = 1080;
        h = 1080;
      } else if (ratio === '16:9') {
        w = 1280;
        h = 720;
      }

      const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${w}&height=${h}&nologo=true&seed=${seed}`;
      
      const img = new Image();
      img.src = url;
      img.onload = () => {
        updateCurrentDay({ imageUrl: url });
        setGeneratingImage(false);
        showToast(`${currentDayPlan.dayName} günü için ${ratio} formatında AI resmi çizildi!`, 'success');
      };
      img.onerror = () => {
        throw new Error('Image load failed');
      };
    } catch (error) {
      showToast('Görsel üretilirken bir hata oluştu.', 'error');
      setGeneratingImage(false);
    }
  };

  // Free Client-Side Animated Video Generator with Audio Spectrum Visualizer
  const handleGenerateVideoFree = async () => {
    if (!currentDayPlan.imageUrl) {
      showToast('Animasyon oluşturmak için öncelikle bir AI görseli üretmelisiniz.', 'error');
      return;
    }
    if (!currentDayPlan.audioUrl) {
      showToast('Lütfen önce "Premium Ahmet Sesiyle Üret" butonuna basarak ses dosyasını oluşturun.', 'error');
      return;
    }

    setGeneratingVideo(true);
    setVideoPollingStatus('Ücretsiz Video Sentezleniyor (Ses ve Görsel Birleştiriliyor)...');
    updateCurrentDay({ videoUrl: null });

    try {
      const audioUrl = currentDayPlan.audioUrl;
      let audioResponse;
      try {
        audioResponse = await fetch(audioUrl);
        if (!audioResponse.ok) throw new Error('Network error');
      } catch (e) {
        throw new Error('Ses dosyası bulunamadı veya süresi dolmuş. Lütfen "Sesi Üret" butonuna tekrar basarak sesi yenileyin.');
      }
      const audioBlob = await audioResponse.blob();
      const audioArrayBuffer = await audioBlob.arrayBuffer();

      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const audioBuffer = await audioCtx.decodeAudioData(audioArrayBuffer);
      const duration = audioBuffer.duration;

      const ratio = currentDayPlan.aspectRatio || '9:16';
      let w = 720;
      let h = 1280;
      if (ratio === '1:1') {
        w = 720;
        h = 720;
      } else if (ratio === '16:9') {
        w = 1280;
        h = 720;
      }

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas 2D context could not be created');

      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = currentDayPlan.imageUrl;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Görsel yüklenemedi. Eğer manuel URL girdiyseniz, sunucu CORS engeline takılmış olabilir.'));
      });

      const bufferSource = audioCtx.createBufferSource();
      bufferSource.buffer = audioBuffer;

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const dest = audioCtx.createMediaStreamDestination();
      bufferSource.connect(analyser);
      bufferSource.connect(dest);

      const canvasStream = canvas.captureStream(30);
      const combinedStream = new MediaStream();
      canvasStream.getVideoTracks().forEach(track => combinedStream.addTrack(track));
      dest.stream.getAudioTracks().forEach(track => combinedStream.addTrack(track));

      let options = { mimeType: 'video/webm;codecs=vp9,opus' };
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/webm;codecs=vp8,opus' };
      }
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: 'video/webm' };
      }
      if (!MediaRecorder.isTypeSupported(options.mimeType)) {
        options = { mimeType: '' };
      }

      const recorder = new MediaRecorder(combinedStream, options);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      // Prepare Subtitle Data
      const sentences = data.scriptText.split(/(?<=[.!?])\s+/);
      const totalChars = data.scriptText.length;
      let charSum = 0;
      const subtitleData = sentences.map(s => {
        const start = (charSum / totalChars) * duration;
        charSum += s.length;
        const end = (charSum / totalChars) * duration;
        return { text: s, start, end };
      });

      let animationFrameId: number;
      const startTime = Date.now();

      const drawFrame = () => {
        const elapsed = (Date.now() - startTime) / 1000;
        if (elapsed >= duration) return;

        const progress = elapsed / duration;

        // 1. Draw a beautiful dark gradient background
        const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
        bgGrad.addColorStop(0, '#1e1b4b'); // Deep indigo
        bgGrad.addColorStop(1, '#020617'); // Black
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, w, h);

        // 2. Draw Foreground Card with White Border & Subtle Zoom (CORS-safe & high-performance)
        ctx.save();
        const cardW = w * 0.82;
        const imgRatio = (img.height && img.width) ? (img.height / img.width) : (16 / 9);
        let finalCardW = cardW;
        let finalCardH = cardW * imgRatio;
        // Limit card height to avoid overlapping elements
        if (finalCardH > h * 0.52) {
          finalCardH = h * 0.52;
          finalCardW = finalCardH / imgRatio;
        }
        const cardY = (h - finalCardH) / 2 - (h * 0.05); // shift up slightly for wave & subtitles
        const zoomScale = 1.0 + (progress * 0.06);

        ctx.translate(w / 2, cardY + finalCardH / 2);
        ctx.scale(zoomScale, zoomScale);

        // Draw image
        ctx.drawImage(img, -finalCardW / 2, -finalCardH / 2, finalCardW, finalCardH);

        // Draw card border
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
        ctx.strokeRect(-finalCardW / 2, -finalCardH / 2, finalCardW, finalCardH);
        ctx.restore();

        // 3. Draw Watermark Title at Top
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.font = 'bold 16px Outfit, Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('ARI HAYAT AI', w / 2, 45);

        // 4. Draw Animated Subtitles
        const currentSub = subtitleData.find(s => elapsed >= s.start && elapsed <= s.end);
        if (currentSub) {
          ctx.save();
          ctx.font = 'bold 22px Outfit, Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          // Wrap text lines to fit screen width
          const maxTextWidth = w * 0.78;
          const words = currentSub.text.split(' ');
          let line = '';
          const lines = [];
          for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxTextWidth && n > 0) {
              lines.push(line.trim());
              line = words[n] + ' ';
            } else {
              line = testLine;
            }
          }
          lines.push(line.trim());

          const lineHeight = 30;
          const paddingY = 14;
          const paddingX = 20;
          const rectH = lines.length * lineHeight + paddingY * 2;
          const rectW = Math.min(w * 0.85, maxTextWidth + paddingX * 2);
          const rectX = (w - rectW) / 2;
          const rectY = h * 0.73 - rectH / 2;

          ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
          ctx.beginPath();
          if (ctx.roundRect) {
            ctx.roundRect(rectX, rectY, rectW, rectH, 16);
          } else {
            ctx.rect(rectX, rectY, rectW, rectH);
          }
          ctx.fill();

          ctx.fillStyle = '#FFFFFF';
          lines.forEach((l, idx) => {
            const textY = rectY + paddingY + lineHeight / 2 + idx * lineHeight;
            ctx.fillText(l, w / 2, textY);
          });
          ctx.restore();
        }

        // 5. Draw Glowing Neon Audio Wave Line
        analyser.getByteFrequencyData(dataArray);
        ctx.save();
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.9)'; // Neon purple
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(168, 85, 247, 0.7)';

        const sliceWidth = w / bufferLength;
        let waveX = 0;
        const waveBaseY = h * 0.86;

        for (let i = 0; i < bufferLength; i++) {
          const v = dataArray[i] / 255.0;
          const yShift = (v * (h * 0.08)) * Math.sin((i / bufferLength) * Math.PI); // smooth edges
          const waveY = waveBaseY + (i % 2 === 0 ? yShift : -yShift);

          if (i === 0) {
            ctx.moveTo(waveX, waveY);
          } else {
            ctx.lineTo(waveX, waveY);
          }
          waveX += sliceWidth;
        }
        ctx.lineTo(w, waveBaseY);
        ctx.stroke();
        ctx.restore();

        // 6. Progress Bar and Remaining Time
        ctx.fillStyle = '#a855f7';
        ctx.fillRect(0, h - 8, w * progress, 8);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.font = 'bold 22px Outfit, Inter, sans-serif';
        const remaining = Math.max(0, Math.ceil(duration - elapsed));
        ctx.fillText(`00:${remaining.toString().padStart(2, '0')}`, w - 100, 45);

        setVideoPollingStatus(`Video oluşturuluyor: %${Math.min(100, Math.floor(progress * 100))}`);
        animationFrameId = requestAnimationFrame(drawFrame);
      };

      recorder.onstop = () => {
        cancelAnimationFrame(animationFrameId);
        audioCtx.close();

        const videoBlob = new Blob(chunks, { type: chunks[0].type || 'video/webm' });
        const videoUrl = URL.createObjectURL(videoBlob);
        updateCurrentDay({ videoUrl });

        showToast('Animasyonlu pazarlama videosu 100% ücretsiz olarak üretildi!', 'success');
        setGeneratingVideo(false);
        setVideoPollingStatus(null);
      };

      recorder.start();
      bufferSource.start();
      drawFrame();

      bufferSource.onended = () => {
        if (recorder.state === 'recording') {
          recorder.stop();
        }
      };

    } catch (err: any) {
      console.error("Free video rendering failed:", err);
      showToast(`Ücretsiz video üretimi başarısız oldu: ${err.message}`, 'error');
      setGeneratingVideo(false);
      setVideoPollingStatus(null);
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
          // Share video if exists, fallback to image, fallback to logo
          mediaUrl: currentDayPlan.videoUrl || currentDayPlan.imageUrl || 'https://arihayat.com/images/logo.png',
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
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100 font-body">
      
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
                    {day.videoUrl && <Video className="w-3 h-3 text-red-400" />}
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
            <p className="text-[11px] text-gray-400 leading-relaxed">Hesaplarınızı bağlayıp Premium AI araçlarını etkinleştirmek için anahtarlarınızı buraya girin.</p>

            <div className="space-y-3 pt-2">
              <div>
                <label className="block text-gray-400 mb-1 text-[10px] uppercase font-bold">Google Gemini API Anahtarı (Gündem & Ses)</label>
                <input 
                  type="password"
                  placeholder="Gemini API Key (Ücretsiz)..."
                  value={geminiKey}
                  onChange={e => setGeminiKey(e.target.value)}
                  className="w-full p-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1 text-[10px] uppercase font-bold">Gemini Ses Tonu (Yapay Zeka Sesi)</label>
                <select
                  value={geminiVoice}
                  onChange={e => setGeminiVoice(e.target.value)}
                  className="w-full p-2.5 bg-[#1F2937] border border-gray-700 rounded-lg text-xs text-white outline-none focus:border-primary"
                >
                  <option value="Aoede">Aoede (Kadın - Akıcı ve Doğal)</option>
                  <option value="Puck">Puck (Erkek - Canlı ve Güçlü)</option>
                  <option value="Kore">Kore (Kadın - Dengeli ve Ciddi)</option>
                  <option value="Fenrir">Fenrir (Erkek - Tok ve Derin)</option>
                  <option value="Zephyr">Zephyr (Kadın - Sıcak ve Samimi)</option>
                </select>
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
                onClick={() => saveSettings(bufferToken, geminiKey, geminiVoice)}
                className="w-full py-2 bg-primary hover:bg-primary-hover text-secondary font-bold text-xs uppercase rounded-lg transition-colors flex items-center justify-center"
              >
                <ShieldCheck className="w-4 h-4 mr-1.5" /> Bağlantıları Kaydet
              </button>
            </div>
          </div>

          {/* AI Trend & Competitor Analysis Panel */}
          <div className="bg-gradient-to-br from-[#111827]/80 to-purple-900/20 backdrop-blur-xl p-6 rounded-2xl border border-purple-900/40 shadow-[0_0_20px_rgba(168,85,247,0.1)] space-y-4">
            <h2 className="text-sm font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 uppercase flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-purple-400 animate-pulse" /> Yapay Zeka Gündem & Trend Analizi
            </h2>
            <p className="text-[11px] text-gray-400 leading-relaxed">Gündemdeki konuları, rakip hesapları veya sektörünüzle ilgili anahtar kelimeleri girin. Yapay zeka bunu analiz edip sizin için viral olmaya aday yepyeni bir video konsepti, senaryo ve görsel komutu üretsin.</p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-purple-300/70 mb-1 text-[10px] uppercase font-bold">Rakip veya Trend Anahtar Kelimeleri</label>
                <textarea 
                  placeholder="Örn: Tiktok bal asmr trendi, @rakiphesap son videosu, organik beslenme, şifa kaynağı..."
                  value={trendKeywords}
                  onChange={e => setTrendKeywords(e.target.value)}
                  className="w-full p-3 bg-[#1F2937]/50 border border-purple-900/50 rounded-xl text-xs text-white outline-none focus:border-purple-500 min-h-[80px]"
                />
              </div>
              <button
                onClick={handleTrendAnalysis}
                disabled={analyzingTrends}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white p-3 rounded-xl font-heading font-black text-[11px] uppercase flex items-center justify-center transition-all shadow-lg disabled:opacity-50"
              >
                {analyzingTrends ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analiz Ediliyor...</>
                ) : (
                  <><Wand2 className="w-4 h-4 mr-2" /> Trendi İncele & Viral İçerik Üret</>
                )}
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
                onChange={e => {
                  const newProduct = e.target.value;
                  const newTemplate = generateTemplates(newProduct, currentDayPlan.style);
                  updateCurrentDay({ 
                    product: newProduct,
                    scriptText: newTemplate.scriptText,
                    caption: newTemplate.caption,
                    tweets: newTemplate.tweets,
                    customPrompt: ''
                  });
                }} 
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
                    onClick={() => {
                      const newTemplate = generateTemplates(currentDayPlan.product, styleOption.id);
                      updateCurrentDay({ 
                        style: styleOption.id,
                        scriptText: newTemplate.scriptText,
                        caption: newTemplate.caption,
                        tweets: newTemplate.tweets,
                        customPrompt: ''
                      });
                    }}
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
                  <div className="bg-[#1F2937]/40 p-4 rounded-xl border border-gray-800 flex flex-col">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-gray-400 uppercase">Dış Ses (Seslendirilecek Metin)</span>
                      <button 
                        onClick={() => handleCopy(data.scriptText, 'Senaryo')}
                        className="text-primary hover:text-primary-hover text-xs font-bold flex items-center transition-colors"
                      >
                        <Copy className="w-3.5 h-3.5 mr-1" /> Kopyala
                      </button>
                    </div>
                    <textarea 
                      value={data.scriptText} 
                      onChange={e => updateCurrentDay({ scriptText: e.target.value })}
                      className="w-full p-4 bg-[#1F2937]/80 border border-gray-700 rounded-xl text-sm text-gray-200 outline-none focus:border-primary min-h-[150px] font-body resize-y"
                    />
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
                <div className="space-y-4 flex flex-col">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">Açıklama & Etiketler</span>
                    <button 
                      onClick={() => handleCopy(data.caption, 'Açıklama')}
                      className="text-primary hover:text-primary-hover text-xs font-bold flex items-center transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5 mr-1" /> Kopyala
                    </button>
                  </div>
                  <textarea 
                    value={data.caption} 
                    onChange={e => updateCurrentDay({ caption: e.target.value })}
                    className="w-full p-4 bg-[#1F2937]/80 border border-gray-700 rounded-xl text-sm text-gray-200 outline-none focus:border-primary min-h-[180px] font-body resize-y"
                  />
                </div>
              )}

              {activeTab === 'twitter' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">X (Twitter) Flood</span>
                    <button 
                      onClick={() => handleCopy(data.tweets.join('\n\n'), 'Tweet Zinciri')}
                      className="text-primary hover:text-primary-hover text-xs font-bold flex items-center transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5 mr-1" /> Tümünü Kopyala
                    </button>
                  </div>
                  <div className="space-y-3">
                    {data.tweets.map((tweet, idx) => (
                      <div key={idx} className="p-4 bg-[#1F2937]/30 border border-gray-800 rounded-xl relative group flex flex-col">
                        <div className="absolute right-3 top-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleCopy(tweet, `Tweet ${idx + 1}`)}
                            className="text-xs bg-gray-800 hover:bg-gray-700 text-gray-300 p-1.5 rounded"
                          >
                            Kopyala
                          </button>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 uppercase block mb-2">Tweet {idx + 1}</span>
                        <textarea
                          value={tweet}
                          onChange={(e) => {
                            const newTweets = [...data.tweets];
                            newTweets[idx] = e.target.value;
                            updateCurrentDay({ tweets: newTweets });
                          }}
                          className="w-full bg-[#1F2937]/80 border border-gray-700 rounded-lg text-sm text-gray-300 p-3 outline-none focus:border-primary resize-y min-h-[80px]"
                        />
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

            {/* Sizing & Aspect Ratio Selector */}
            <div className="p-4 bg-gray-900/30 rounded-xl border border-gray-800 space-y-3">
              <span className="text-xs font-bold text-white uppercase block">Boyutlandırma / Sosyal Medya Formatı</span>
              <div className="flex gap-2">
                {[
                  { id: '9:16', label: '9:16 (Reels/TikTok/Story)' },
                  { id: '1:1', label: '1:1 (Instagram Post)' },
                  { id: '16:9', label: '16:9 (Yatay/X/Twitter)' }
                ].map((ratio) => (
                  <button
                    key={ratio.id}
                    onClick={() => updateCurrentDay({ aspectRatio: ratio.id as any, imageUrl: null, videoUrl: null })}
                    className={`flex-1 py-2.5 rounded-xl border text-[11px] font-bold text-center transition-all ${
                      (currentDayPlan.aspectRatio || '9:16') === ratio.id
                        ? 'bg-primary border-primary text-secondary'
                        : 'bg-[#1F2937]/50 border-gray-800 text-gray-400 hover:border-gray-700'
                    }`}
                  >
                    {ratio.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Prompt Controls */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-400 mb-1 text-xs font-body uppercase">Görsel Oluşturma İstemi (Prompt)</label>
                  <textarea 
                    value={currentDayPlan.customPrompt}
                    onChange={e => updateCurrentDay({ customPrompt: e.target.value })}
                    className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-xl text-white outline-none focus:border-primary text-xs font-mono min-h-[120px]"
                    placeholder={data.imagePrompt}
                  />
                  <span className="text-[10px] text-gray-500 mt-1 block">Boş bırakırsanız varsayılan şablon komutu kullanılacaktır. En iyi sonuç için İngilizce yazın.</span>
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
                    onClick={() => updateCurrentDay({ customPrompt: data.imagePrompt })}
                    className="bg-gray-800 hover:bg-gray-700 text-white p-3 px-4 rounded-xl font-bold transition-colors flex items-center gap-1.5"
                    title="Şablon İstemi Yükle"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-xs">Şablonu Yükle</span>
                  </button>
                </div>
              </div>

              {/* Generated Image Result */}
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-950 flex flex-col justify-center items-center min-h-[300px] relative">
                <div className="absolute top-2 w-full px-2 z-10">
                  <input 
                    type="text" 
                    placeholder="Manuel Görsel URL'si Girebilirsiniz..."
                    value={currentDayPlan.imageUrl || ''}
                    onChange={e => updateCurrentDay({ imageUrl: e.target.value })}
                    className="w-full bg-black/60 border border-gray-700 text-xs text-white p-2 rounded-lg backdrop-blur-sm outline-none focus:border-primary placeholder:text-gray-500"
                  />
                </div>
                {generatingImage ? (
                  <div className="text-center p-6 space-y-3">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                    <span className="text-xs text-gray-400 block font-bold uppercase tracking-wider">Arı Hayat AI çizim yapıyor...</span>
                  </div>
                ) : currentDayPlan.imageUrl ? (
                  <div className="w-full flex items-center justify-center p-4">
                    <img 
                      src={currentDayPlan.imageUrl} 
                      alt="AI Generated" 
                      className={`object-cover border border-gray-800 rounded-lg shadow-xl ${
                        (currentDayPlan.aspectRatio || '9:16') === '9:16'
                          ? 'h-[280px] aspect-[9/16]'
                          : (currentDayPlan.aspectRatio || '9:16') === '1:1'
                          ? 'w-[240px] h-[240px] aspect-square'
                          : 'w-full aspect-[16/9]'
                      }`}
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
                  </div>
                ) : (
                  <div className="text-center p-6 text-gray-600">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-700" />
                    <span className="text-xs font-bold uppercase block tracking-wider">Henüz Görsel Üretilmedi</span>
                    <p className="text-[11px] text-gray-500 max-w-[200px] mx-auto mt-1 font-body">Yukarıdaki butonu kullanarak seçili formatta yeni bir görsel oluşturun.</p>
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* AI Video Generation Card */}
          <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg space-y-6">
            <div className="flex justify-between items-center border-b border-gray-800 pb-3">
              <h3 className="text-md font-heading font-bold text-white uppercase flex items-center">
                <Video className="w-5 h-5 mr-2 text-primary animate-pulse" /> Yapay Zeka Video Oluşturucu
              </h3>
              <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] px-2 py-0.5 rounded-full font-bold">100% ÜCRETSİZ & PREMİUM</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div className="space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <p className="text-xs text-gray-400 leading-relaxed font-body">
                    Oluşturduğunuz görsel ve seslendirmeyi birleştirerek **100% ücretsiz** ve hareketli/spektrumlu bir video üretebilir veya Replicate API'niz üzerinden canlandırabilirsiniz.
                  </p>
                  <div className="p-3.5 bg-gray-900/40 rounded-xl border border-gray-800/80 text-[11px] text-gray-400 space-y-1.5">
                    <span className="font-bold text-white block">💡 Video Format/Boyut Ayarı:</span>
                    Görsel hangi boyutta üretildiyse (9:16 dikey, 1:1 kare, veya 16:9 yatay), video da otomatik olarak o en boy oranında animasyonlu spektrumla hazırlanır.
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleGenerateVideoFree}
                    disabled={generatingVideo || !currentDayPlan.imageUrl || !currentDayPlan.audioUrl}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white p-3.5 rounded-xl font-heading font-black text-xs uppercase flex items-center justify-center transition-all disabled:opacity-50"
                  >
                    {generatingVideo && videoPollingStatus?.includes('Sentezleniyor') ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" /> {videoPollingStatus}
                      </>
                    ) : (
                      <>
                        <Zap className="w-4 h-4 mr-2 text-yellow-300 fill-yellow-300" /> Ücretsiz Video Sentezle (Hızlı)
                      </>
                    )}
                  </button>

                  {!currentDayPlan.imageUrl && (
                    <span className="text-[10px] text-red-400 block text-center">Öncelikle yukarıdan bir görsel üretmelisiniz.</span>
                  )}
                  {currentDayPlan.imageUrl && !currentDayPlan.audioUrl && (
                    <span className="text-[10px] text-amber-400 block text-center">Ücretsiz video için önce premium ses dosyasını üretin.</span>
                  )}
                </div>
              </div>

              {/* Video Result Preview */}
              <div className="border border-gray-800 rounded-xl overflow-hidden bg-gray-950 flex flex-col justify-center items-center min-h-[300px] relative">
                <div className="absolute top-2 w-full px-2 z-10">
                  <input 
                    type="text" 
                    placeholder="Manuel Video URL'si Girebilirsiniz..."
                    value={currentDayPlan.videoUrl || ''}
                    onChange={e => updateCurrentDay({ videoUrl: e.target.value })}
                    className="w-full bg-black/60 border border-gray-700 text-xs text-white p-2 rounded-lg backdrop-blur-sm outline-none focus:border-primary placeholder:text-gray-500"
                  />
                </div>
                {generatingVideo ? (
                  <div className="text-center p-6 space-y-3">
                    <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" />
                    <span className="text-xs text-gray-400 block font-bold uppercase tracking-wider">{videoPollingStatus}</span>
                  </div>
                ) : currentDayPlan.videoUrl ? (
                  <div className="w-full flex justify-center items-center p-4">
                    <video 
                      src={currentDayPlan.videoUrl} 
                      controls 
                      loop 
                      autoPlay 
                      className={`rounded-lg object-cover shadow-xl border border-gray-800 ${
                        (currentDayPlan.aspectRatio || '9:16') === '9:16'
                          ? 'h-[280px] aspect-[9/16]'
                          : (currentDayPlan.aspectRatio || '9:16') === '1:1'
                          ? 'w-[240px] h-[240px] aspect-square'
                          : 'w-full aspect-[16/9]'
                      }`}
                    />
                    <div className="absolute bottom-3 right-3">
                      <a 
                        href={currentDayPlan.videoUrl} 
                        download={`ari-hayat-video-${currentDayPlan.dayKey}.mp4`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/80 hover:bg-black/95 text-white px-3 py-2 rounded-lg font-bold text-xs flex items-center backdrop-blur transition-all"
                      >
                        <Download className="w-3.5 h-3.5 mr-1" /> Videoyu İndir
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 text-gray-600">
                    <Video className="w-12 h-12 mx-auto mb-2 text-gray-700" />
                    <span className="text-xs font-bold uppercase block tracking-wider font-heading">Henüz Video Üretilmedi</span>
                    <p className="text-[11px] text-gray-500 max-w-[200px] mx-auto mt-1 font-body">Görselinizi canlandırarak video klip üretmek için soldaki butona basın.</p>
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
