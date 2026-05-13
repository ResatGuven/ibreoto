"use client";

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // Admin panelinde footer'ı gizle
  if (pathname?.startsWith('/ibreoto-yonetim-2025')) {
    return null;
  }
  
  return <Footer />;
}
