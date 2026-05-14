// Güncellendi
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { ProductsSkeleton } from '@/components/ui/ProductsSkeleton';

export default function UrunlerPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-1/4 h-64 bg-gray-50 rounded-lg animate-pulse"></aside>
          <div className="w-full md:w-3/4">
            <ProductsSkeleton />
          </div>
        </div>
      </div>
    }>
      <UrunlerContent />
    </Suspense>
  );
}

function UrunlerContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const searchQuery = searchParams.get('search')?.toLowerCase() || '';

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [appliedMin, setAppliedMin] = useState<number | null>(null);
  const [appliedMax, setAppliedMax] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState('recommended');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>([]);

  const categoryNames: { [key: string]: string } = {
    'ic-aksesuar': 'İç Aksesuar',
    'dis-aksesuar': 'Dış Aksesuar',
    'teknoloji': 'Teknoloji & Elektronik',
    'bakim': 'Bakım & Temizlik'
  };

  useEffect(() => {
    const savedFavs = localStorage.getItem('favorites');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs).map((p: any) => String(p.id)));
    }
  }, []);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    fetchProducts();
  }, [categoryParam]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setTimeout(() => setLoading(false), 500); // Yumuşak geçiş için
    }
  };

  useEffect(() => {
    let filtered = products;
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery) || 
        p.category.toLowerCase().includes(searchQuery) ||
        (categoryNames[p.category]?.toLowerCase().includes(searchQuery))
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    
    // Price filter
    if (appliedMin !== null) {
      filtered = filtered.filter(p => parseFloat(p.price) >= appliedMin);
    }
    if (appliedMax !== null) {
      filtered = filtered.filter(p => parseFloat(p.price) <= appliedMax);
    }

    // Sort products
    let sorted = [...filtered];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    } else if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime());
    }
    
    setFilteredProducts(sorted);
  }, [selectedCategories, products, appliedMin, appliedMax, searchQuery, sortBy]);

  const handleCategoryChange = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      setSelectedCategories(selectedCategories.filter(c => c !== slug));
    } else {
      setSelectedCategories([...selectedCategories, slug]);
    }
  };

  const handleApplyPrice = () => {
    setAppliedMin(minPrice ? parseFloat(minPrice) : null);
    setAppliedMax(maxPrice ? parseFloat(maxPrice) : null);
  };

  const toggleFavorite = (product: any) => {
    const savedFavs = localStorage.getItem('favorites');
    let favs = savedFavs ? JSON.parse(savedFavs) : [];
    const isFav = favs.find((p: any) => String(p.id) === String(product.id));
    
    if (isFav) {
      favs = favs.filter((p: any) => String(p.id) !== String(product.id));
      setFavorites(favorites.filter(id => id !== String(product.id)));
    } else {
      favs.push(product);
      setFavorites([...favorites, String(product.id)]);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favs));
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const addToCart = (product: any) => {
    const savedCart = localStorage.getItem('cart');
    let cart = savedCart ? JSON.parse(savedCart) : [];
    
    const existing = cart.find((item: any) => String(item.id) === String(product.id));
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1, price: `₺${product.price}` });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert(`${product.name} sepete eklendi!`);
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      {/* Breadcrumb */}
      <div className="text-sm text-text-muted mb-8 font-body">
        <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link> &gt; <span>Tüm Ürünler</span>
        {searchQuery && <span className="ml-2 text-primary font-bold">/ "{searchQuery}" arama sonuçları</span>}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-surface mb-6">
            <h3 className="font-heading font-bold uppercase text-secondary mb-4 border-b pb-2 tracking-tight">Kategoriler</h3>
            <ul className="space-y-2 font-body text-text-muted text-sm">
              {Object.entries(categoryNames).map(([slug, name]) => (
                <li key={slug}>
                  <label className="flex items-center space-x-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      className="accent-primary" 
                      checked={selectedCategories.includes(slug)}
                      onChange={() => handleCategoryChange(slug)}
                    /> 
                    <span className="group-hover:text-primary transition-colors">{name}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Price Filter */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-surface mb-6">
            <h3 className="font-heading font-bold uppercase text-secondary mb-4 border-b pb-2 tracking-tight">Fiyat Aralığı</h3>
            <div className="flex items-center space-x-2 font-body">
              <input 
                type="number" 
                placeholder="Min" 
                className="w-full border border-surface rounded p-2 focus:outline-none focus:border-primary text-sm transition-colors" 
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
              />
              <span>-</span>
              <input 
                type="number" 
                placeholder="Max" 
                className="w-full border border-surface rounded p-2 focus:outline-none focus:border-primary text-sm transition-colors" 
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
              />
            </div>
            <button 
              className="w-full mt-4 bg-secondary text-white font-heading uppercase py-2 rounded hover:bg-primary transition-all duration-300 text-sm font-bold tracking-wider transform hover:scale-[1.02]"
              onClick={handleApplyPrice}
            >
              Uygula
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-heading font-bold uppercase tracking-tight">
              {searchQuery ? `Arama Sonuçları (${filteredProducts.length})` : 'Tüm Ürünler'}
            </h1>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-surface rounded p-2 font-body text-sm focus:outline-none focus:border-primary bg-white cursor-pointer transition-colors"
            >
              <option value="recommended">Önerilen Sıralama</option>
              <option value="price-asc">En Düşük Fiyat</option>
              <option value="price-desc">En Yüksek Fiyat</option>
              <option value="newest">En Yeni Ürünler</option>
            </select>
          </div>

          {loading ? (
            <ProductsSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group bg-white border border-surface hover:border-primary/30 rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col transform hover:-translate-y-1">
                  <div className="relative w-full h-48 bg-surface p-4 flex items-center justify-center overflow-hidden">
                    <Link href={`/urun/${product.id}`} className="block w-full h-full relative">
                      {product.image ? (
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill
                          className="object-contain transform group-hover:scale-110 transition-transform duration-700" 
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-text-muted text-xs font-body">[ Görsel ]</div>
                      )}
                    </Link>
                    <button 
                      onClick={() => toggleFavorite(product)}
                      className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300 z-10 ${favorites.includes(String(product.id)) ? 'bg-primary text-white' : 'bg-white text-secondary hover:text-primary'}`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(String(product.id)) ? 'fill-current' : ''}`} />
                    </button>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none"></div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <p className="text-[10px] text-primary mb-1 font-heading font-bold uppercase tracking-widest">{categoryNames[product.category] || product.category}</p>
                    <Link href={`/urun/${product.id}`} className="font-heading font-bold text-secondary hover:text-primary mb-2 line-clamp-2 uppercase text-sm leading-tight transition-colors">
                      {product.name}
                    </Link>
                    <div className="mt-auto pt-4 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-text-muted font-body line-through">₺{(parseFloat(product.price) * 1.2).toFixed(0)}</span>
                        <span className="font-body font-extrabold text-lg text-primary">
                          ₺{product.price}
                        </span>
                      </div>
                      <button 
                        className="bg-secondary hover:bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:rotate-90 shadow-md hover:shadow-primary/20"
                        onClick={() => addToCart(product)}
                        title="Sepete Ekle"
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
              <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-heading font-bold text-secondary uppercase mb-2">Ürün Bulunamadı</h3>
              <p className="text-text-muted font-body text-sm max-w-xs mx-auto">Seçili kriterlere veya aramanıza uygun ürün bulamadık. Lütfen filtreleri kontrol edin.</p>
              <button 
                onClick={() => {setSelectedCategories([]); setAppliedMin(null); setAppliedMax(null);}}
                className="mt-6 text-primary font-heading font-bold uppercase text-xs hover:underline"
              >
                Tüm Filtreleri Temizle
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

