"use client";

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Admin panelinde navbar'ı gizle
  if (pathname?.startsWith('/ibreoto-yonetim-2025')) {
    return null;
  }
  
  return <Navbar />;
}
