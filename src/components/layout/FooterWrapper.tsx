"use client";

import { usePathname } from 'next/navigation';
import Footer from './Footer';

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // Admin panelinde footer'ı gizle
  if (pathname?.startsWith('/yonetim')) {
    return null;
  }
  
  return <Footer />;
}
