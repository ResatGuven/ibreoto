"use client";

import React, { useState } from 'react';
import { 
  Sparkles, Video, Play, Download, Copy, ExternalLink, 
  Music, Check, Wand2, Image as ImageIcon, Volume2, Share2 
} from 'lucide-react';
import { useAdminToast } from '@/context/AdminToastContext';

// Sample pre-configured templates generator
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
      ]
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
      ]
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
        `3/ Şeffaf gıda politikamız gereği tüm tahlil sonuçlarımızı sitemizde yayınlıyoruz. Raporları incelemek için: [Site Linki]`
      ]
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
    ]
  };
};

export default function SocialMediaAssistant() {
  const [product, setProduct] = useState('Kestane Balı');
  const [style, setStyle] = useState('educational');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'script' | 'caption' | 'twitter'>('script');
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const { showToast } = useAdminToast();

  const data = generateTemplates(product, style);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    showToast(`${label} kopyalandı!`, 'success');
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleGenerateVoice = async () => {
    setLoading(true);
    setAudioUrl(null);
    try {
      const res = await fetch(`/api/tts?text=${encodeURIComponent(data.scriptText)}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        showToast('Yapay zeka seslendirmesi üretildi!', 'success');
      } else {
        showToast('Seslendirme üretilemedi. Lütfen tekrar deneyin.', 'error');
      }
    } catch (error) {
      showToast('Bir hata oluştu.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-700 uppercase tracking-tight flex items-center">
            <Sparkles className="w-8 h-8 mr-2 text-primary animate-pulse" /> Sosyal Medya Asistanı
          </h1>
          <p className="text-sm text-gray-400 font-body mt-1">Görsel canlandırma talimatları, seslendirmeler ve otomatik paylaşımlar üretin.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Control Panel */}
        <div className="lg:col-span-1 bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg space-y-6 h-fit">
          <h2 className="text-md font-heading font-bold text-white uppercase flex items-center border-b border-gray-800 pb-3">
            <Wand2 className="w-5 h-5 mr-2 text-primary" /> İçerik Yapılandırma
          </h2>

          <div>
            <label className="block text-gray-400 mb-2 text-xs font-body uppercase">Ürün veya Konu Seçin</label>
            <select 
              value={product} 
              onChange={e => setProduct(e.target.value)} 
              className="w-full p-3 bg-[#1F2937] border border-gray-700 rounded-xl text-white outline-none focus:border-primary font-bold text-sm"
            >
              <option value="Kestane Balı">Kestane Balı</option>
              <option value="Süzme Çiçek Balı">Süzme Çiçek Balı</option>
              <option value="Propolis Damla">Propolis Damla</option>
              <option value="Kral Arı Sütü">Kral Arı Sütü</option>
              <option value="Doğal Arı Poleni">Doğal Arı Poleni</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-400 mb-2 text-xs font-body uppercase">Video Tarzı / Konsepti</label>
            <div className="space-y-2">
              {[
                { id: 'educational', label: 'Eğitici & Sağlık Faydaları' },
                { id: 'asmr', label: 'ASMR & Rahatlatıcı Çekim' },
                { id: 'trust', label: 'Güven & Şeffaf Analiz' },
                { id: 'behind', label: 'Kovan Hayatı (Üretim)' }
              ].map((styleOption) => (
                <button
                  key={styleOption.id}
                  onClick={() => {
                    setStyle(styleOption.id);
                    setAudioUrl(null);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-bold transition-all flex justify-between items-center ${
                    style === styleOption.id 
                      ? 'bg-primary/10 border-primary text-primary' 
                      : 'bg-[#1F2937]/50 border-gray-800 text-gray-400 hover:border-gray-700'
                  }`}
                >
                  {styleOption.label}
                  {style === styleOption.id && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={handleGenerateVoice}
              disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-amber-700 hover:from-amber-600 hover:to-amber-800 text-secondary p-3.5 rounded-xl font-heading font-black text-sm uppercase flex items-center justify-center transition-all shadow-lg disabled:opacity-50"
            >
              {loading ? (
                <>Seslendirme Üretiliyor...</>
              ) : (
                <>
                  <Music className="w-4 h-4 mr-2" /> Ücretsiz Seslendirme Üret
                </>
              )}
            </button>
          </div>

          {audioUrl && (
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl space-y-3">
              <div className="flex items-center text-xs font-bold text-primary">
                <Volume2 className="w-4 h-4 mr-2 animate-bounce" /> Seslendirme Dosyanız Hazır!
              </div>
              <audio src={audioUrl} controls className="w-full accent-primary" />
              <a 
                href={audioUrl} 
                download={`ari-hayat-${product.toLowerCase().replace(/\s+/g, '-')}-${style}.mp3`}
                className="w-full py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-xs font-bold text-center block text-white transition-colors flex items-center justify-center"
              >
                <Download className="w-4 h-4 mr-2" /> MP3 Dosyasını İndir
              </a>
            </div>
          )}
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
                  {/* Script Narration Text */}
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

                  {/* Visual Instructions */}
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

          {/* Quick Platform Shortcuts & Prompts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* AI Visual Assets */}
            <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg space-y-4">
              <h3 className="text-sm font-heading font-bold text-white uppercase flex items-center">
                <ImageIcon className="w-4 h-4 mr-2 text-primary" /> Üretilen Hazır Sosyal Medya Medyaları
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">Projeye kopyalanmış 4K kalitesindeki dikey görsellerinizi indirip Luma Labs veya Runway ile video yapın.</p>
              
              <div className="space-y-2 pt-2">
                {[
                  { name: 'chestnut_honey_dripping.png', label: 'Süzülen Bal Görseli' },
                  { name: 'organic_beehives_field.png', label: 'Kovanlar Görseli' },
                  { name: 'propolis_bottle_honeycomb.png', label: 'Propolis Şişesi Görseli' }
                ].map((media, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 bg-gray-900/30 rounded-xl border border-gray-800/50">
                    <span className="text-xs text-gray-300 font-medium">{media.label}</span>
                    <a 
                      href={`/marketing/${media.name}`} 
                      download={media.name} 
                      className="text-xs bg-gray-800 hover:bg-gray-700 text-white px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center"
                    >
                      <Download className="w-3.5 h-3.5 mr-1" /> İndir
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Sharing Platforms */}
            <div className="bg-[#111827]/60 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-lg space-y-4">
              <h3 className="text-sm font-heading font-bold text-white uppercase flex items-center">
                <Share2 className="w-4 h-4 mr-2 text-primary" /> Tek Tıkla Kolay Paylaşım
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed">Aşağıdaki butonlara bastığınızda açıklama yazınız otomatik olarak panonuza kopyalanır ve platformun yükleme ekranı açılır.</p>
              
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    handleCopy(data.caption, 'Açıklama');
                    window.open('https://business.facebook.com/creatorstudio', '_blank');
                  }}
                  className="bg-[#E1306C]/10 border border-[#E1306C]/30 text-[#E1306C] p-3 rounded-xl font-heading font-black text-[10px] uppercase text-center hover:bg-[#E1306C]/20 transition-all flex items-center justify-center"
                >
                  Instagram Reels <ExternalLink className="w-3 h-3 ml-1.5" />
                </button>

                <button
                  onClick={() => {
                    handleCopy(data.caption, 'Açıklama');
                    window.open('https://www.tiktok.com/upload', '_blank');
                  }}
                  className="bg-white/10 border border-white/20 text-white p-3 rounded-xl font-heading font-black text-[10px] uppercase text-center hover:bg-white/20 transition-all flex items-center justify-center"
                >
                  TikTok Yükle <ExternalLink className="w-3 h-3 ml-1.5" />
                </button>

                <button
                  onClick={() => {
                    const tweetContent = data.tweets[0];
                    handleCopy(data.tweets.slice(1).join('\n\n'), 'Kalan Tweetler');
                    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetContent)}`, '_blank');
                  }}
                  className="bg-sky-500/10 border border-sky-500/30 text-sky-400 p-3 rounded-xl font-heading font-black text-[10px] uppercase text-center hover:bg-sky-500/20 transition-all flex items-center justify-center col-span-2"
                >
                  X / Twitter'da Paylaş <ExternalLink className="w-3 h-3 ml-1.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
