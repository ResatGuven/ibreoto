"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, User, X, Menu } from 'lucide-react';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const updateCount = () => {
      const savedCart = localStorage.getItem('cart');
      const cart = savedCart ? JSON.parse(savedCart) : [];
      const count = cart.reduce((acc: number, item: any) => acc + item.qty, 0);
      setCartCount(count);
    };

    updateCount(); // Initial load
    window.addEventListener('cartUpdated', updateCount);
    window.addEventListener('storage', updateCount);
    
    return () => {
      window.removeEventListener('cartUpdated', updateCount);
      window.removeEventListener('storage', updateCount);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Hamburger Menu (Mobile) */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="md:hidden text-text-main hover:text-primary transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/images/logo.jpg" alt="ibreoto" className="h-12 md:h-16 w-auto" />
        </Link>

        {/* Navigation (Desktop) */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/" className="font-heading uppercase font-bold text-text-main hover:text-primary transition-colors">
            Ana Sayfa
          </Link>
          <Link href="/urunler" className="font-heading uppercase font-bold text-text-main hover:text-primary transition-colors">
            Ürünler
          </Link>
          <Link href="/hakkimizda" className="font-heading uppercase font-bold text-text-main hover:text-primary transition-colors">
            Hakkımızda
          </Link>
          <Link href="/blog" className="font-heading uppercase font-bold text-text-main hover:text-primary transition-colors">
            Blog
          </Link>
          <Link href="/iletisim" className="font-heading uppercase font-bold text-text-main hover:text-primary transition-colors">
            İletişim
          </Link>
          <Link href="/siparis-takip" className="font-heading uppercase font-bold text-text-main hover:text-primary transition-colors border-l border-gray-200 pl-6 ml-6">
            Siparişim Nerede?
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {searchOpen ? (
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <input type="text" placeholder="Ara..." className="p-2 outline-none text-sm w-24 md:w-40" />
              <button onClick={() => setSearchOpen(false)} className="p-2 text-gray-400 hover:text-secondary">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="text-text-main hover:text-primary">
              <Search className="w-5 h-5" />
            </button>
          )}
          
          <button className="text-text-main hover:text-primary hidden sm:block">
            <Heart className="w-5 h-5" />
          </button>
          
          <Link href="/sepet" className="text-text-main hover:text-primary relative">
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          
          <Link href="/giris" className="text-text-main hover:text-primary hidden sm:block">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white border-t border-gray-100 py-4 px-4 space-y-4 absolute top-20 left-0 right-0 shadow-lg z-40">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-text-main hover:text-primary transition-colors py-2 border-b border-gray-50">
            Ana Sayfa
          </Link>
          <Link href="/urunler" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-text-main hover:text-primary transition-colors py-2 border-b border-gray-50">
            Ürünler
          </Link>
          <Link href="/hakkimizda" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-text-main hover:text-primary transition-colors py-2 border-b border-gray-50">
            Hakkımızda
          </Link>
          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-text-main hover:text-primary transition-colors py-2 border-b border-gray-50">
            Blog
          </Link>
          <Link href="/iletisim" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-text-main hover:text-primary transition-colors py-2 border-b border-gray-50">
            İletişim
          </Link>
          <Link href="/siparis-takip" onClick={() => setIsMobileMenuOpen(false)} className="block font-heading uppercase font-bold text-text-main hover:text-primary transition-colors py-2">
            Siparişim Nerede?
          </Link>
          
          {/* Mobile Only Actions */}
          <div className="flex space-x-4 pt-2 border-t border-gray-100 sm:hidden">
            <Link href="/favoriler" onClick={() => setIsMobileMenuOpen(false)} className="text-text-main hover:text-primary flex items-center space-x-2">
              <Heart className="w-5 h-5" /> <span>Favoriler</span>
            </Link>
            <Link href="/giris" onClick={() => setIsMobileMenuOpen(false)} className="text-text-main hover:text-primary flex items-center space-x-2">
              <User className="w-5 h-5" /> <span>Giriş Yap</span>
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
