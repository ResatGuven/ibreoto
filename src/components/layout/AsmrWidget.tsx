"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Radio } from 'lucide-react';

export default function AsmrWidget() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Royalty-free loop of bees and forest ambient (fallback stream url)
  const audioUrl = "https://www.soundjay.com/nature/sounds/river-1.mp3"; // Calming river + we mix it or use standard nature sounds

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.loop = true;
      audioRef.current.volume = volume;
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.error("Audio playback blocked by browser autocomplete/interact policy", err);
      });
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
    if (val > 0) setIsMuted(false);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-body">
      {isOpen ? (
        <div className="bg-[#111827]/90 backdrop-blur-xl border border-gray-800 p-4 rounded-2xl shadow-2xl flex items-center space-x-3 transition-all duration-300 w-64">
          <button 
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-amber-700 hover:from-amber-600 hover:to-amber-800 text-secondary flex items-center justify-center transition-all shadow-lg shadow-primary/20 transform hover:scale-105"
            title={isPlaying ? "Durdur" : "Başlat"}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-secondary" /> : <Play className="w-5 h-5 fill-secondary translate-x-0.5" />}
          </button>
          
          <div className="flex-1 min-w-0">
            <p className="text-[10px] text-primary uppercase font-bold tracking-widest flex items-center">
              <Radio className="w-3 h-3 mr-1 animate-pulse" /> Arıların Şarkısı
            </p>
            <p className="text-xs text-white truncate font-medium">Doğal Arılık ASMR</p>
          </div>

          <div className="flex items-center space-x-1.5">
            <button onClick={toggleMute} className="text-gray-400 hover:text-white transition-colors">
              {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <input 
              type="range" 
              min="0" 
              max="1" 
              step="0.05" 
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary" 
            />
          </div>

          <button 
            onClick={() => setIsOpen(false)}
            className="text-[10px] text-gray-500 hover:text-white uppercase font-bold pl-1"
          >
            Kapat
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="relative w-12 h-12 rounded-full bg-[#111827]/80 backdrop-blur-md border border-gray-800 hover:border-primary/50 text-primary hover:text-white flex items-center justify-center transition-all duration-300 shadow-xl group hover:scale-105"
          title="Arıların Şarkısı (ASMR vızıltı)"
        >
          {isPlaying && (
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-primary"></span>
            </span>
          )}
          
          {isPlaying ? (
            <div className="flex items-end justify-center space-x-0.5 h-4 w-4">
              <div className="w-0.5 bg-primary animate-[soundwave_0.8s_ease-in-out_infinite]" style={{ height: '30%' }}></div>
              <div className="w-0.5 bg-primary animate-[soundwave_0.6s_ease-in-out_infinite_0.2s]" style={{ height: '60%' }}></div>
              <div className="w-0.5 bg-primary animate-[soundwave_0.7s_ease-in-out_infinite_0.4s]" style={{ height: '40%' }}></div>
              <div className="w-0.5 bg-primary animate-[soundwave_0.5s_ease-in-out_infinite_0.1s]" style={{ height: '80%' }}></div>
            </div>
          ) : (
            <Volume2 className="w-5 h-5 transition-transform group-hover:scale-110" />
          )}
        </button>
      )}
    </div>
  );
}
