"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, Heart, ShoppingCart, User, X, Menu, Phone, MessageCircle, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [siteSettings, setSiteSettings] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [catDropdownOpen, setCatDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const res = await fetch('/api/site-info');
        const data = await res.json();
        if (data.settings) setSiteSettings(data.settings);
        
        // Fetch categories for dropdown
        const catRes = await fetch('/api/products?categoriesOnly=true');
        const catData = await catRes.json();
        if (Array.isArray(catData)) setCategories(catData);
      } catch (e) {}
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    const updateCounts = () => {
      const savedCart = localStorage.getItem('cart');
      const cart = savedCart ? JSON.parse(savedCart) : [];
      setCartCount(cart.reduce((acc: number, item: any) => acc + item.qty, 0));

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
      {/* Top Bar */}
      <div className="bg-secondary text-white py-2 text-[10px] md:text-xs font-body">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href={`tel:${siteSettings?.contactPhone || '0506 157 89 63'}`} className="flex items-center hover:text-primary transition-colors">
              <Phone className="w-3 h-3 mr-1" /> {siteSettings?.contactPhone || '0506 157 89 63'}
            </a>
            <a href={`https://wa.me/${siteSettings?.whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-green-400 transition-colors">
              <MessageCircle className="w-3 h-3 mr-1" /> WhatsApp Destek
            </a>
          </div>
          <div className="hidden sm:flex items-center space-x-4 uppercase font-bold tracking-tighter">
            <Link href="/siparis-takip" className="hover:text-primary transition-colors border-r border-gray-600 pr-4">Siparişim Nerede?</Link>
            <Link href="/giris" className="hover:text-primary transition-colors">Giriş Yap / Kayıt Ol</Link>
          </div>
        </div>
      </div>

      {/* Announcement Bar */}
      {siteSettings?.announcementBar && (
        <div className="bg-primary text-secondary text-[10px] md:text-xs py-1.5 text-center font-heading font-bold uppercase tracking-widest px-4">
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
          <img 
            src={siteSettings?.logoUrl || "/images/logo.png"} 
            alt="Arı Hayat" 
            className="h-10 md:h-14 w-auto hover:opacity-90 transition-opacity" 
          />
        </Link>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="font-heading uppercase font-bold text-secondary hover:text-primary transition-colors text-sm tracking-wider">
            Ana Sayfa
          </Link>
          
          {/* Categories Dropdown */}
          <div className="relative group">
            <button 
              className="flex items-center font-heading uppercase font-bold text-secondary hover:text-primary transition-colors text-sm tracking-wider"
              onMouseEnter={() => setCatDropdownOpen(true)}
              onClick={() => setCatDropdownOpen(!catDropdownOpen)}
            >
              Ürünler <ChevronDown className="w-4 h-4 ml-1" />
            </button>
            <div 
              className={`absolute top-full left-0 w-56 bg-white shadow-xl rounded-b-xl py-2 border-t-2 border-primary transition-all duration-300 ${catDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
              onMouseLeave={() => setCatDropdownOpen(false)}
            >
                <Link 
                  href={`/urunler?category=bal`}
                  className="block px-6 py-2.5 text-xs font-bold uppercase text-secondary hover:bg-primary/5 hover:text-primary transition-colors"
                  onClick={() => setCatDropdownOpen(false)}
                >
                  Doğal Ballar
                </Link>
                <Link 
                  href={`/urunler?category=propolis`}
                  className="block px-6 py-2.5 text-xs font-bold uppercase text-secondary hover:bg-primary/5 hover:text-primary transition-colors"
                  onClick={() => setCatDropdownOpen(false)}
                >
                  Propolis
                </Link>
                <Link 
                  href={`/urunler?category=ari-sutu`}
                  className="block px-6 py-2.5 text-xs font-bold uppercase text-secondary hover:bg-primary/5 hover:text-primary transition-colors"
                  onClick={() => setCatDropdownOpen(false)}
                >
                  Arı Sütü
                </Link>
                <Link 
                  href={`/urunler?category=polen-ari-ekmegi`}
                  className="block px-6 py-2.5 text-xs font-bold uppercase text-secondary hover:bg-primary/5 hover:text-primary transition-colors"
                  onClick={() => setCatDropdownOpen(false)}
                >
                  Polen & Arı Ekmeği
                </Link>
            </div>
          </div>

          <Link href="/blog" className="font-heading uppercase font-bold text-secondary hover:text-primary transition-colors text-sm tracking-wider">
            Blog
          </Link>
          <Link href="/hakkimizda" className="font-heading uppercase font-bold text-secondary hover:text-primary transition-colors text-sm tracking-wider">
            Hakkımızda
          </Link>
          <Link href="/iletisim" className="font-heading uppercase font-bold text-secondary hover:text-primary transition-colors text-sm tracking-wider">
            İletişim
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
              <span className="absolute -top-1 -right-1 bg-primary text-secondary text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">
                {favoritesCount}
              </span>
            )}
          </Link>
          
          <Link href="/sepet" className="text-secondary hover:text-primary relative group p-2">
            <div className="bg-surface group-hover:bg-primary/20 p-2 rounded-full transition-all duration-300">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-secondary text-[9px] w-5 h-5 rounded-full flex items-center justify-center font-bold border-2 border-white shadow-sm">
                {cartCount}
              </span>
            )}
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
        <nav className="md:hidden bg-white border-t border-gray-100 py-6 px-6 space-y-4 absolute top-20 left-0 right-0 h-screen overflow-y-auto shadow-2xl z-40 animate-in slide-in-from-top-10 duration-300">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-secondary hover:text-primary transition-colors py-3 border-b border-gray-50 tracking-wider">
            Ana Sayfa
          </Link>
          
          <div className="py-3 border-b border-gray-50">
            <p className="font-heading uppercase font-bold text-primary text-xs mb-3 tracking-widest">Ürünler</p>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat: any) => (
                <Link 
                  key={cat.id} 
                  href={`/urunler?category=${cat.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[11px] font-bold uppercase text-secondary hover:text-primary"
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-secondary hover:text-primary transition-colors py-3 border-b border-gray-50 tracking-wider">
            Blog
          </Link>
          <Link href="/hakkimizda" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-secondary hover:text-primary transition-colors py-3 border-b border-gray-50 tracking-wider">
            Hakkımızda
          </Link>
          <Link href="/iletisim" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-secondary hover:text-primary transition-colors py-3 border-b border-gray-50 tracking-wider">
            İletişim
          </Link>
          <Link href="/siparis-takip" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-primary transition-colors py-3 tracking-widest">
            Siparişim Nerede?
          </Link>
          
          <div className="flex space-x-6 pt-6 border-t border-gray-100">
            <Link href="/favoriler" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary hover:text-primary flex items-center space-x-3">
              <Heart className="w-6 h-6" /> <span className="font-bold text-sm uppercase">Favoriler</span>
            </Link>
            <Link href="/giris" onClick={() => setIsMobileMenuOpen(false)} className="text-secondary hover:text-primary flex items-center space-x-3">
              <User className="w-6 h-6" /> <span className="font-bold text-sm uppercase">Giriş / Kayıt</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
