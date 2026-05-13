import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, FileText, Tag, MessageSquare, Mail } from 'lucide-react';

export const metadata = {
  title: 'ibreoto Admin Paneli',
  robots: { index: false, follow: false },
};

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/ibreoto-yonetim-2025' },
  { icon: ShoppingBag, label: 'Ürün Yönetimi', href: '/ibreoto-yonetim-2025/urunler' },
  { icon: Mail, label: 'Mesajlar', href: '/ibreoto-yonetim-2025/mesajlar' },
  { icon: Tag, label: 'Kategoriler', href: '/ibreoto-yonetim-2025/kategoriler' },
  { icon: FileText, label: 'Siparişler', href: '/ibreoto-yonetim-2025/siparisler' },
  { icon: Users, label: 'Müşteriler', href: '/ibreoto-yonetim-2025/musteriler' },
  { icon: MessageSquare, label: 'Yorumlar', href: '/ibreoto-yonetim-2025/yorumlar' },
  { icon: Settings, label: 'Ayarlar', href: '/ibreoto-yonetim-2025/ayarlar' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#0B0F19] text-gray-100 font-body overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111827] border-r border-gray-800 flex flex-col z-20">
        <div className="p-5 border-b border-gray-800 flex items-center justify-center bg-[#1F2937]">
          <Link href="/">
            <img src="/images/logo.jpg" alt="ibreoto" className="h-10 w-auto rounded" />
          </Link>
        </div>
        
        <div className="px-6 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Yönetim Paneli
        </div>
        
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-[#1F2937] hover:text-white transition-all duration-200 group"
              >
                <Icon size={20} className="group-hover:text-blue-500 transition-colors" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-gray-800">
          <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-900/20 transition-all duration-200 group">
            <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
            <span className="font-medium">Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-[#0B0F19]">
        {/* Top Header */}
        <header className="h-16 bg-[#111827]/80 backdrop-blur-xl flex items-center justify-between px-8 border-b border-gray-800 z-10">
          <div className="font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-xl">
            Hoş Geldin, Sistem Yöneticisi
          </div>
          
          <div className="flex items-center space-x-6">
            <Link 
              href="/" 
              target="_blank" 
              className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
            >
              <span>Siteyi Görüntüle</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a20 20 0 000 12h4m10-6h2a2 2 0 012 2v4a2 2 0 01-2 2h-2m-6-12l4 4-4 4"></path></svg>
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20">
                AD
              </div>
              <div className="hidden md:block text-sm">
                <p className="font-medium text-gray-200">Admin</p>
                <p className="text-xs text-gray-500">Yönetici</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#0B0F19]">
          {children}
        </div>
      </main>
    </div>
  );
}
