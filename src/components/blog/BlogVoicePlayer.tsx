"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Loader2, Volume2, Sparkles, VolumeX } from 'lucide-react';

interface BlogVoicePlayerProps {
  contentHtml: string;
  title: string;
}

export function BlogVoicePlayer({ contentHtml, title }: BlogVoicePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Clean HTML tags and limit text to be processed
  const getCleanText = () => {
    if (!contentHtml) return '';
    // Strip HTML tags
    let clean = contentHtml.replace(/<[^>]*>/g, ' ');
    // Strip multiple spaces
    clean = clean.replace(/\s+/g, ' ').trim();
    // Limit to first 1200 chars for quick and responsive TTS generation
    if (clean.length > 1200) {
      return clean.substring(0, 1200) + '...';
    }
    return clean;
  };

  const handlePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        }).catch(err => {
          console.error("Playback failed:", err);
          setIsLoading(false);
        });
      }
      return;
    }

    const textToSpeak = getCleanText();
    if (!textToSpeak) {
      setError('Seslendirilecek içerik bulunamadı.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const audioUrl = `/api/tts?text=${encodeURIComponent(textToSpeak)}`;
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.onended = () => {
        setIsPlaying(false);
      };

      audio.onerror = () => {
        setError('Ses dosyası yüklenemedi. Lütfen tekrar deneyin.');
        setIsLoading(false);
        audioRef.current = null;
      };

      audio.oncanplaythrough = () => {
        setIsLoading(false);
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          setError('Oynatma tarayıcı engeline takıldı, lütfen butona tekrar basın.');
        });
      };
    } catch (err) {
      console.error(err);
      setError('Ses sentezlenirken hata oluştu.');
      setIsLoading(false);
      audioRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-[#111827] border border-amber-500/20 rounded-3xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-body shadow-xl relative overflow-hidden group">
      {/* Background soft light */}
      <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/10 rounded-full blur-2xl pointer-events-none group-hover:bg-primary/15 transition-all"></div>
      
      <div className="flex items-center gap-4 relative z-10 w-full sm:w-auto">
        <button
          onClick={handlePlay}
          disabled={isLoading}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-amber-600 hover:from-amber-500 hover:to-amber-700 text-secondary flex items-center justify-center transition-all duration-300 shadow-lg shadow-primary/20 transform hover:scale-105 active:scale-95 shrink-0"
          title={isPlaying ? "Durdur" : "Sesli Dinle"}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5 fill-secondary" />
          ) : (
            <Play className="w-5 h-5 fill-secondary translate-x-0.5" />
          )}
        </button>
        
        <div className="min-w-0">
          <p className="text-[10px] text-primary uppercase font-black tracking-widest flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> ARI SESLİ GÜNLÜK ASİSTANI
          </p>
          <h4 className="text-sm font-semibold text-white truncate max-w-[250px] sm:max-w-[400px]">
            {isPlaying ? "Yazı Seslendiriliyor..." : "Bu Günlüğü Yapay Zekadan Dinleyin"}
          </h4>
          <p className="text-[11px] text-gray-400">
            {isPlaying ? "Arıların dünyasından sesli günlük kaydı" : "AhmetNeural profesyonel seslendirici ile dinle"}
          </p>
        </div>
      </div>

      {/* Right side: Audio Waves or Error Msg */}
      <div className="flex items-center justify-end w-full sm:w-auto shrink-0 relative z-10">
        {error ? (
          <span className="text-xs text-rose-400 font-medium">{error}</span>
        ) : isPlaying ? (
          <div className="flex items-end space-x-1.5 h-6 px-4">
            <div className="w-0.5 bg-primary animate-[soundwave_0.8s_ease-in-out_infinite]" style={{ height: '30%' }}></div>
            <div className="w-0.5 bg-primary animate-[soundwave_0.6s_ease-in-out_infinite_0.2s]" style={{ height: '70%' }}></div>
            <div className="w-0.5 bg-primary animate-[soundwave_0.7s_ease-in-out_infinite_0.4s]" style={{ height: '40%' }}></div>
            <div className="w-0.5 bg-primary animate-[soundwave_0.5s_ease-in-out_infinite_0.1s]" style={{ height: '90%' }}></div>
            <div className="w-0.5 bg-primary animate-[soundwave_0.9s_ease-in-out_infinite_0.3s]" style={{ height: '50%' }}></div>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 text-xs text-gray-400 font-medium px-4">
            <Volume2 className="w-4 h-4 text-gray-500" /> Yaklaşık 2 dk. dinleme
          </div>
        )}
      </div>
    </div>
  );
}
