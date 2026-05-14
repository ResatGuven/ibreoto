"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Heart, ShoppingCart, User, X, Menu } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [siteSettings, setSiteSettings] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch('/api/site-info');
        const data = await res.json();
        if (data.settings) setSiteSettings(data.settings);
      } catch (e) {}
    };
    fetchSettings();
  }, []);

  useEffect(() => {
    const updateCounts = () => {
      // Cart count
      const savedCart = localStorage.getItem('cart');
      const cart = savedCart ? JSON.parse(savedCart) : [];
      setCartCount(cart.reduce((acc: number, item: any) => acc + item.qty, 0));

      // Favorites count
      const savedFavs = localStorage.getItem('favorites');
      const favs = savedFavs ? JSON.parse(savedFavs) : [];
      setFavoritesCount(favs.length);
    };

    updateCounts();
    window.addEventListener('cartUpdated', updateCounts);
    window.addEventListener('favoritesUpdated', updateCounts);
    window.addEventListener('storage', updateCounts);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCounts);
      window.removeEventListener('favoritesUpdated', updateCounts);
      window.removeEventListener('storage', updateCounts);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/urunler?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-all duration-300">
      {/* Announcement Bar */}
      {siteSettings?.announcementBar && (
        <div className="bg-gradient-to-r from-red-600 to-red-800 text-white text-[10px] md:text-xs py-2 text-center font-heading font-bold uppercase tracking-widest px-4">
          {siteSettings.announcementBar}
        </div>
      )}
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Hamburger Menu (Mobile) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="md:hidden text-secondary hover:text-primary transition-colors p-2"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/images/logo.jpg" alt="ibreoto" className="h-12 md:h-16 w-auto hover:opacity-90 transition-opacity" />
        </Link>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/" className="font-heading uppercase font-bold text-secondary hover:text-primary transition-colors text-sm tracking-wider">
            Ana Sayfa
          </Link>
          <Link href="/urunler" className="font-heading uppercase font-bold text-secondary hover:text-primary transition-colors text-sm tracking-wider">
            Ürünler
          </Link>
          <Link href="/hakkimizda" className="font-heading uppercase font-bold text-secondary hover:text-primary transition-colors text-sm tracking-wider">
            Hakkımızda
          </Link>
          <Link href="/blog" className="font-heading uppercase font-bold text-secondary hover:text-primary transition-colors text-sm tracking-wider">
            Blog
          </Link>
          <Link href="/iletisim" className="font-heading uppercase font-bold text-secondary hover:text-primary transition-colors text-sm tracking-wider">
            İletişim
          </Link>
          <Link href="/siparis-takip" className="font-heading uppercase font-bold text-white bg-primary hover:bg-primary-hover px-4 py-2 rounded-lg transition-all text-xs tracking-widest ml-4 shadow-lg shadow-primary/20">
            Siparişim Nerede?
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-surface border border-gray-100 rounded-full px-4 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/20 transition-all">
            <input 
              type="text" 
              placeholder="Ürün ara..." 
              className="bg-transparent outline-none text-xs w-32 xl:w-48 font-body" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit">
              <Search className="w-4 h-4 text-text-muted hover:text-primary transition-colors" />
            </button>
          </form>
          
          <button onClick={() => setSearchOpen(!searchOpen)} className="lg:hidden text-secondary hover:text-primary p-2">
            <Search className="w-5 h-5" />
          </button>
          
          <Link href="/favoriler" className="text-secondary hover:text-primary hidden sm:block p-2 relative group">
            <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {favoritesCount > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm animate-in zoom-in duration-300">
                {favoritesCount}
              </span>
            )}
          </Link>
          
          <Link href="/sepet" className="text-secondary hover:text-primary relative group p-2">
            <div className="bg-surface group-hover:bg-primary/10 p-2 rounded-full transition-all duration-300">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-white text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm animate-in zoom-in duration-300">
                {cartCount}
              </span>
            )}
          </Link>
          
          <Link href="/giris" className="text-secondary hover:text-primary hidden sm:block p-2">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {searchOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 animate-in slide-in-from-top duration-300">
          <form onSubmit={handleSearch} className="flex items-center bg-surface border border-gray-100 rounded-xl px-4 py-2">
            <input 
              type="text" 
              placeholder="Ürün veya kategori ara..." 
              className="bg-transparent outline-none text-sm w-full font-body" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button type="submit">
              <Search className="w-5 h-5 text-primary" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 py-6 px-6 space-y-4 absolute top-20 left-0 right-0 shadow-2xl z-40 animate-in slide-in-from-top-10 duration-300">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-secondary hover:text-primary transition-colors py-3 border-b border-gray-50 tracking-wider">
            Ana Sayfa
          </Link>
          <Link href="/urunler" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-secondary hover:text-primary transition-colors py-3 border-b border-gray-50 tracking-wider">
            Ürünler
          </Link>
          <Link href="/hakkimizda" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-secondary hover:text-primary transition-colors py-3 border-b border-gray-50 tracking-wider">
            Hakkımızda
          </Link>
          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-secondary hover:text-primary transition-colors py-3 border-b border-gray-50 tracking-wider">
            Blog
          </Link>
          <Link href="/iletisim" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-secondary hover:text-primary transition-colors py-3 border-b border-gray-50 tracking-wider">
            İletişim
          </Link>
          <Link href="/siparis-takip" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-primary transition-colors py-3 tracking-widest">
            Siparişim Nerede?
          </Link>
          
          {/* Mobile Only Actions */}
          <div className="flex space-x-6 pt-6 border-t border-gray-100">
            <Link href="/favoriler" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary hover:text-primary flex items-center space-x-3">
              <Heart className="w-6 h-6" /> <span className="font-bold text-sm uppercase">Favoriler</span>
            </Link>
            <Link href="/giris" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary hover:text-primary flex items-center space-x-3">
              <User className="w-6 h-6" /> <span className="font-bold text-sm uppercase">Giriş Yap</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
