"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

export default function WhatsAppButton() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/ibreoto-yonetim-2025');

  if (isAdmin) return null;

  return (
    <a
      href="https://wa.me/905061578963?text=Merhaba,%20ibreoto%20sitenizden%20ula%C5%9F%C4%B1yorum.%20%C3%9Cr%C3%BCnler%20hakk%C4%B1nda%20bilgi%20alabilir%20miyim%3F" // Varsayılan mesaj eklendi
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all duration-300 z-50 flex items-center justify-center transform hover:scale-110"
      title="WhatsApp ile İletişime Geçin"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-6 h-6">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l113.4-29.7c32.6 17.4 69.2 26.5 106.4 26.5 122.4 0 222-99.6 222-222 0-59.3-23-115.1-64.9-157.1zM223.9 446c-33.1 0-65.5-8.9-93.8-25.7l-6.7-4-67 17.5 17.9-65.3-4.4-7c-18.4-29.2-28.1-63.1-28.1-97.9 0-101.4 82.6-184 184-184 49.1 0 95.3 19.2 130 53.9s53.9 80.9 53.9 130c0 101.4-82.6 184-184 184zm101.5-138.3c-5.5-2.8-32.8-16.2-37.9-18.1-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18.1-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-5.5-2.8-23.4-8.6-44.5-27.5-16.4-14.6-27.5-32.7-30.7-38.2-3.2-5.5-.3-8.5 2.5-11.2 2.5-2.5 5.5-6.5 8.3-9.7 2.8-3.2 3.7-5.5 5.5-9.2 1.9-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 13.2 5.7 23.6 9.2 31.6 11.7 13.3 4.2 25.4 3.6 35 2.2 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
    </a>
  );
}
