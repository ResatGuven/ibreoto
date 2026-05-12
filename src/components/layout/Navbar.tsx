"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, User, X } from 'lucide-react';

export default function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

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
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img src="/images/logo.jpg" alt="ibreoto" className="h-16 w-auto" />
        </Link>

        {/* Navigation */}
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
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {searchOpen ? (
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
              <input type="text" placeholder="Ara..." className="p-2 outline-none text-sm w-40" />
              <button onClick={() => setSearchOpen(false)} className="p-2 text-gray-400 hover:text-secondary">
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="text-text-main hover:text-primary">
              <Search className="w-5 h-5" />
            </button>
          )}
          
          <button className="text-text-main hover:text-primary">
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
          
          <Link href="/giris" className="text-text-main hover:text-primary">
            <User className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </header>
  );
}
