"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, ShoppingBag, Settings, LogOut, FileText, Tag, MessageSquare, 
  Mail, Ticket, BookOpen, Menu, X, Image as ImageIcon, Users, Star, HelpCircle, 
  Sparkles, ShieldAlert, Loader2 
} from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AdminToastProvider } from '@/context/AdminToastContext';

const menuItems = [
  { icon: LayoutDashboard, label: 'Genel Durum', href: '/yonetim' },
  { icon: ShoppingBag, label: 'Kovan & Ürünler', href: '/yonetim/urunler' },
  { icon: Sparkles, label: 'Sosyal Medya Asistanı', href: '/yonetim/sosyal-medya' },
  { icon: Mail, label: 'Gelen Mesajlar', href: '/yonetim/mesajlar' },
  { icon: Users, label: 'Arıcılar (Müşteriler)', href: '/yonetim/musteriler' },
  { icon: Tag, label: 'Kategoriler', href: '/yonetim/kategoriler' },
  { icon: FileText, label: 'Hasat & Sipariş', href: '/yonetim/siparisler' },
  { icon: MessageSquare, label: 'Ürün Yorumları', href: '/yonetim/yorumlar' },
  { icon: Star, label: 'Müşteri Referansları', href: '/yonetim/referanslar' },
  { icon: HelpCircle, label: 'Sıkça Sorulan Sorular', href: '/yonetim/sss' },
  { icon: Ticket, label: 'İndirim Kuponları', href: '/yonetim/kuponlar' },
  { icon: ImageIcon, label: 'Vitrin Yönetimi', href: '/yonetim/slider' },
  { icon: BookOpen, label: 'Arı Günlüğü (Blog)', href: '/yonetim/blog' },
  { icon: FileText, label: 'Sayfa Yönetimi', href: '/yonetim/sayfalar' },
  { icon: Settings, label: 'Sistem Ayarları', href: '/yonetim/ayarlar' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/giris');
    }
  }, [status, router]);

  // 1. Loading state
  if (status === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B0F19] text-white">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <p className="text-sm font-bold uppercase tracking-widest text-gray-400">Giriş Bilgileri Doğrulanıyor...</p>
      </div>
    );
  }

  // 2. Unauthorized state (must have role === "ADMIN")
  if (!session || (session.user as any).role !== 'ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B0F19] text-white px-4">
        <div className="p-8 bg-[#111827]/60 border border-red-950/40 rounded-3xl text-center max-w-md shadow-2xl backdrop-blur-xl">
          <ShieldAlert className="w-16 h-16 text-red-500 mx-auto mb-4 animate-bounce" />
          <h2 className="text-xl font-heading font-black uppercase text-red-400 tracking-tight">Yetkisiz Erişim Engellendi</h2>
          <p className="text-xs text-gray-400 mt-2 leading-relaxed">
            Bu yönetim paneline erişim yetkiniz bulunmamaktadır. Lütfen yetkili bir yönetici hesabı ile giriş yapın.
          </p>
          <div className="mt-6 flex space-x-3">
            <Link 
              href="/giris" 
              className="flex-1 py-2.5 bg-primary hover:bg-primary-hover text-secondary font-bold text-xs uppercase rounded-xl transition-all block text-center"
            >
              Yönetici Girişi
            </Link>
            <Link 
              href="/" 
              className="flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs uppercase rounded-xl transition-all block text-center"
            >
              Ana Sayfa
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 3. Authenticated Admin View
  return (
    <AdminToastProvider>
      <div className="flex h-screen bg-[#0B0F19] text-gray-100 font-body overflow-hidden relative">
        {/* Mobile Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          className="md:hidden fixed top-4 left-4 z-30 bg-[#1F2937] p-2 rounded-lg border border-gray-700 text-white shadow-lg"
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-10 md:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <aside className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:translate-x-0 
          w-72 bg-[#0F172A] border-r border-white/5 flex flex-col z-20 
          fixed md:static h-full transition-transform duration-500 ease-in-out shadow-2xl shadow-black
        `}>
          <div className="p-8 mb-4">
            <Link href="/" className="flex flex-col items-center group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 mb-4 transform group-hover:rotate-6 transition-transform">
                <span className="text-white font-black text-2xl italic">AH</span>
              </div>
              <h1 className="text-2xl font-heading font-black text-white uppercase tracking-tighter italic">
                ARI<span className="text-primary">HAYAT</span>
              </h1>
              <div className="h-0.5 w-12 bg-primary mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform" />
            </Link>
          </div>
          
          <div className="px-8 py-2 text-[10px] font-heading font-black text-gray-500 uppercase tracking-[0.3em] mb-4">
            Menü
          </div>
          
          <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link 
                  key={item.href} 
                  href={item.href} 
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center space-x-4 px-5 py-3.5 rounded-2xl text-gray-400 hover:bg-white/5 hover:text-white transition-all duration-300 group relative overflow-hidden"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                  <Icon size={18} className="group-hover:text-primary transition-colors z-10" />
                  <span className="font-heading font-bold text-[11px] uppercase tracking-widest z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="p-6 border-t border-white/5 bg-black/20">
            <button 
              onClick={() => signOut({ callbackUrl: '/' })}
              className="flex items-center space-x-4 px-5 py-4 w-full rounded-2xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300 group"
            >
              <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="font-heading font-black text-[11px] uppercase tracking-widest">Güvenli Çıkış</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#0B0F19] relative">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex-1 overflow-y-auto p-6 md:p-12 relative z-10">
            <div className="h-12 md:hidden"></div> 
            {children}
          </div>
        </main>
      </div>
    </AdminToastProvider>
  );
}
