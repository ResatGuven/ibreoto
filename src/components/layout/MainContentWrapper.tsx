"use client";

import { usePathname } from 'next/navigation';

export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/ibreoto-yonetim-2025');
  
  return (
    <main className={`flex-grow ${isAdmin ? '' : 'pt-20'}`}>
      {children}
    </main>
  );
}
