"use client";

import React from 'react';
import { 
  Sparkles, ShieldCheck, Zap, Heart, Cpu, FileText, ArrowLeft, 
  ExternalLink, MessageSquare, Image, Video, Volume2, Share2, Layers, CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function SaasReportPage() {
  const sections = [
    {
      title: "1. Metin ve Senaryo Üretimi (LLM)",
      icon: <MessageSquare className="w-6 h-6 text-indigo-400" />,
      description: "SaaS platformunuzda kullanıcıların otomatik senaryo, başlık ve hashtag üretmesini sağlamak için 100% ücretsiz servisler.",
      options: [
        {
          name: "Pollinations.ai Text API",
          badge: "Anahtarsız & Sınırsız",
          details: "Herhangi bir API key veya üyelik gerektirmeden Llama-3, GPT-4o-mini, Mistral ve Claude modellerine HTTP GET ile erişim sağlar. Hızlıdır ve CORS engeli yoktur.",
          url: "https://pollinations.ai/"
        },
        {
          name: "Groq Cloud (Free Tier)",
          badge: "Ultra Hızlı & Ücretsiz",
          details: "Llama 3.1 (70B & 8B) modellerini saniyede yüzlerce kelime üretecek hızda ücretsiz sınırlar dahilinde sunar. Kurumsal kalitede metin üretimi için en iyisidir.",
          url: "https://console.groq.com/"
        }
      ]
    },
    {
      title: "2. Görsel Çizimi (Image Generation)",
      icon: <Image className="w-6 h-6 text-green-400" />,
      description: "Kullanıcıların dikey Reels kapakları, Instagram gönderileri veya X görselleri çizdirmesini sağlayacak ücretsiz görsel motorları.",
      options: [
        {
          name: "Pollinations.ai Image API",
          badge: "Anahtarsız & Sınırsız",
          details: "Şu an panelde de kullandığımız, saniyeler içinde 1080x1920 dikey veya 1080x1080 kare resimler çizebilen, seed destekli tamamen ücretsiz görsel oluşturma motoru.",
          url: "https://image.pollinations.ai"
        },
        {
          name: "Hugging Face Serverless",
          badge: "Gelişmiş & Ücretsiz",
          details: "Ücretsiz bir Hugging Face hesabı açarak FLUX.1, Stable Diffusion XL gibi en güncel görsel modellerine doğrudan API üzerinden ücretsiz istek atabilirsiniz.",
          url: "https://huggingface.co/models?pipeline_tag=text-to-image"
        }
      ]
    },
    {
      title: "3. Seslendirme (Text-to-Speech)",
      icon: <Volume2 className="w-6 h-6 text-amber-400" />,
      description: "Kullanıcıların Reels veya TikTok videolarına ekleyebileceği gerçekçi, insansı seslendirmeler üretme araçları.",
      options: [
        {
          name: "Microsoft Edge Neural TTS",
          badge: "Anahtarsız & Gerçekçi",
          details: "Şu an panele entegre ettiğimiz, Microsoft Edge tarayıcısının resmi seslendirme motorunu kullanan ve AhmetNeural (Tok belgesel sesi) dahil onlarca sesi ücretsiz sunan protokol.",
          url: "https://github.com/rany2/edge-tts"
        },
        {
          name: "Puter.js AI Module",
          badge: "Kolay Entegrasyon",
          details: "Geliştiriciler için doğrudan tarayıcı üzerinden çağrılabilen, hiçbir backend ayarı gerektirmeyen keyles bulut tabanlı seslendirme ve AI araçları kütüphanesi.",
          url: "https://puter.com"
        }
      ]
    },
    {
      title: "4. Video Üretimi ve Canlandırma",
      icon: <Video className="w-6 h-6 text-red-400" />,
      description: "Oluşturulan statik görselleri veya metinleri hareketli video kliplere dönüştüren sistemler.",
      options: [
        {
          name: "Hugging Face Gradio API",
          badge: "Açık Kaynak & Ücretsiz",
          details: "Hugging Face üzerindeki binlerce ücretsiz video üretme (Stable Video Diffusion, CogVideo) alanına (Space) Gradio JS istemcisi ile bağlanarak ücretsiz video sentezleyebilirsiniz.",
          url: "https://huggingface.co/spaces"
        },
        {
          name: "Replicate Free Tiers",
          badge: "Geliştirici Dostu",
          details: "Replicate üzerindeki video canlandırma modellerini (SVD, AnimateDiff) ilk başlangıç kredileri ve ücretsiz topluluk paylaşımlı GPU'ları ile çalıştırabilirsiniz.",
          url: "https://replicate.com"
        }
      ]
    },
    {
      title: "5. Otomatik Paylaşım ve Yayınlama",
      icon: <Share2 className="w-6 h-6 text-sky-400" />,
      description: "Hazırlanan içeriklerin sosyal medya hesaplarına otomatik olarak gönderilmesini sağlayan API'lar.",
      options: [
        {
          name: "Buffer API (Ücretsiz Plan)",
          badge: "3 Sosyal Kanal Ücretsiz",
          details: "Sitenize entegre ettiğimiz Buffer API sayesinde kullanıcılar Instagram, TikTok ve X hesaplarını ücretsiz bağlayıp ayda 30 paylaşıma kadar otomatik gönderebilir.",
          url: "https://buffer.com"
        },
        {
          name: "Make.com Webhooks",
          badge: "Ayda 1000 İşlem Ücretsiz",
          details: "Sitenizden Make.com'a bir webhook (veri) göndererek hiçbir kodlama yapmadan Pinterest, LinkedIn, YouTube Shorts gibi platformlarda otomatik paylaşım tetikleyebilirsiniz.",
          url: "https://www.make.com"
        }
      ]
    }
  ];

  return (
    <div className="p-6 bg-background min-h-screen text-text-main font-body">
      
      {/* Back Button */}
      <div className="mb-6">
        <Link 
          href="/yonetim/sosyal-medya"
          className="inline-flex items-center text-xs font-bold text-text-muted hover:text-primary transition-colors uppercase tracking-wider"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Asistana Geri Dön
        </Link>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-amber-900/5 to-transparent p-8 rounded-3xl border border-primary/20 mb-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <Layers className="w-8 h-8 text-primary animate-pulse" />
          <span className="text-xs bg-primary/20 text-primary border border-primary/30 px-3 py-1 rounded-full font-bold uppercase tracking-widest">SaaS Fırsat Raporu</span>
        </div>
        <h1 className="text-3xl font-heading font-black uppercase text-secondary tracking-tight">
          Sosyal Medya AI Ajanı Geliştirme Kılavuzu
        </h1>
        <p className="text-sm text-text-muted mt-2 max-w-2xl leading-relaxed">
          Bu rapor, kurmayı hedeflediğiniz yapay zekalı sosyal medya otomasyon projesini **tamamen ücretsiz ve açık kaynaklı** araçlarla nasıl küresel bir SaaS girişimine (abone ol-öde yazılımı) dönüştürebileceğinizi açıklar.
        </p>
      </div>

      {/* Grid of Solutions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-white border-gray-200 shadow-sm backdrop-blur-xl p-6 rounded-2xl border border-gray-200 shadow-lg space-y-4 hover:border-gray-200 transition-all">
            <div className="flex items-center space-x-3 border-b border-gray-200 pb-3">
              {section.icon}
              <h3 className="text-md font-heading font-bold text-secondary uppercase">{section.title}</h3>
            </div>
            <p className="text-xs text-text-muted leading-relaxed">{section.description}</p>
            
            <div className="space-y-3 pt-2">
              {section.options.map((opt, oIdx) => (
                <div key={oIdx} className="p-3.5 bg-gray-50 border-gray-200 rounded-xl border border-gray-200/80 space-y-2 relative group">
                  <div className="flex justify-between items-start">
                    <span className="text-xs font-bold text-secondary">{opt.name}</span>
                    <span className="bg-primary/10 text-primary border border-primary/20 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{opt.badge}</span>
                  </div>
                  <p className="text-[11px] text-text-muted leading-relaxed">{opt.details}</p>
                  <a 
                    href={opt.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-[10px] text-primary hover:underline flex items-center pt-1"
                  >
                    Geliştirici Sitesi <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Business Strategy Card */}
        <div className="bg-gray-50 border-gray-200/60 to-white border-gray-200 shadow-sm p-6 rounded-2xl border border-amber-900/30 shadow-lg flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-3 border-b border-gray-200 pb-3">
              <Zap className="w-6 h-6 text-amber-500" />
              <h3 className="text-md font-heading font-bold text-secondary uppercase">SaaS Gelir Modeli Önerisi</h3>
            </div>
            <p className="text-xs text-text-main leading-relaxed">
              Bu projeyi abonelikli bir yazılıma dönüştürdüğünüzde uygulayabileceğiniz en karlı model:
            </p>
            <ul className="space-y-2 text-xs text-text-muted">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Ücretsiz Paket:</strong> Kullanıcılara ayda 5 adet ücretsiz görsel ve seslendirme hakkı verin (Maliyeti size 0₺).</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Premium Paket:</strong> Aylık abonelik alan kullanıcılara kendi ElevenLabs ve Buffer anahtarlarını girme hakkı tanıyın. Böylece API tüketim maliyetini tamamen müşteriye yüklemiş olursunuz!</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                <span><strong>Kurumsal Paket:</strong> Sizin API havuzunuzdan harcama yapan, limitleri yüksek paketler satarak kar marjınızı artırın.</span>
              </li>
            </ul>
          </div>
          
          <div className="pt-4 border-t border-gray-200/60 mt-4">
            <div className="flex items-center justify-between text-[11px] text-gray-500 font-bold">
              <span>SaaS Geliştirme Raporu v1.0</span>
              <span className="text-primary flex items-center">
                <ShieldCheck className="w-3.5 h-3.5 mr-1" /> %100 Ücretsiz Modüller
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
