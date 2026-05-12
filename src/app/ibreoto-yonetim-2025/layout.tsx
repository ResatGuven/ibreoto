import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, ShoppingBag, Users, Settings, LogOut, FileText, Tag, MessageSquare } from 'lucide-react';

export const metadata = {
  title: 'ibreoto Admin Paneli',
  robots: { index: false, follow: false },
};

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/ibreoto-yonetim-2025' },
  { icon: ShoppingBag, label: 'Ürün Yönetimi', href: '/ibreoto-yonetim-2025/urunler' },
  { icon: Tag, label: 'Kategoriler', href: '/ibreoto-yonetim-2025/kategoriler' },
  { icon: FileText, label: 'Siparişler', href: '/ibreoto-yonetim-2025/siparisler' },
  { icon: Users, label: 'Müşteriler', href: '/ibreoto-yonetim-2025/musteriler' },
  { icon: MessageSquare, label: 'Yorumlar', href: '/ibreoto-yonetim-2025/yorumlar' },
  { icon: Settings, label: 'Ayarlar', href: '/ibreoto-yonetim-2025/ayarlar' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100 font-body">
      {/* Sidebar */}
      <aside className="w-64 bg-secondary text-white flex flex-col shadow-xl">
        <div className="p-6 border-b border-gray-700 flex items-center justify-center">
           <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg italic font-heading">
              i
            </div>
            <span className="text-xl font-heading font-bold text-white">
              ibre<span className="text-primary">oto</span>
            </span>
          </div>
        </div>
        <div className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
          Yönetim Paneli
        </div>
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center space-x-3 px-4 py-3 rounded text-gray-300 hover:bg-gray-800 hover:text-white transition-colors">
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-700">
          <button className="flex items-center space-x-3 px-4 py-3 w-full rounded text-red-400 hover:bg-red-900/30 transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white shadow-sm flex items-center justify-between px-8 border-b border-gray-200">
          <div className="font-heading font-bold text-secondary text-lg">
            Hoş Geldin, Sistem Yöneticisi
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" target="_blank" className="text-sm font-medium text-primary hover:underline">
              Siteyi Görüntüle
            </Link>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-secondary">
              AD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
