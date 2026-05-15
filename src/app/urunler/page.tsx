"use client";


import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { ShoppingBag, Star, Heart, Truck } from 'lucide-react';
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
    'teknoloji': 'Teknoloji',
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
        setProducts(data.map(p => ({
          ...p,
          image: p.image || '/images/products/placeholder.png'
        })));
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    let filtered = products;
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery) || 
        p.category?.name?.toLowerCase().includes(searchQuery) ||
        p.description.toLowerCase().includes(searchQuery)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => {
        // Find category slug from category object if exists
        const catSlug = p.category?.slug || p.categoryId; 
        return selectedCategories.includes(catSlug);
      });
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
      <div className="text-[10px] uppercase tracking-widest text-text-muted mb-8 font-heading">
        <Link href="/" className="hover:text-primary transition-colors">Ana Sayfa</Link> <span className="mx-2">/</span> <span className="text-secondary font-bold">Tüm Ürünler</span>
        {searchQuery && <span className="ml-2 text-primary font-bold">/ "{searchQuery}"</span>}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-1/4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface mb-6">
            <h3 className="font-heading font-bold uppercase text-secondary mb-6 border-b border-surface pb-3 tracking-widest text-xs">Kategoriler</h3>
            <ul className="space-y-3 font-body text-text-muted text-sm">
              {Object.entries(categoryNames).map(([slug, name]) => (
                <li key={slug}>
                  <label className="flex items-center space-x-3 cursor-pointer group">
                    <div className="relative flex items-center justify-center">
                      <input 
                        type="checkbox" 
                        className="peer appearance-none w-5 h-5 border-2 border-surface rounded-md checked:bg-primary checked:border-primary transition-all cursor-pointer" 
                        checked={selectedCategories.includes(slug)}
                        onChange={() => handleCategoryChange(slug)}
                      />
                      <span className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none text-[10px]">✓</span>
                    </div>
                    <span className="group-hover:text-primary transition-colors font-medium">{name}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Price Filter */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-surface mb-6">
            <h3 className="font-heading font-bold uppercase text-secondary mb-6 border-b border-surface pb-3 tracking-widest text-xs">Fiyat Aralığı</h3>
            <div className="flex items-center space-x-2 font-body">
              <div className="relative flex-grow">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-text-muted">₺</span>
                <input 
                  type="number" 
                  placeholder="Min" 
                  className="w-full border border-surface rounded-lg p-2 pl-6 focus:outline-none focus:border-primary text-xs transition-colors bg-surface/30" 
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                />
              </div>
              <span className="text-surface-dark">-</span>
              <div className="relative flex-grow">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-text-muted">₺</span>
                <input 
                  type="number" 
                  placeholder="Max" 
                  className="w-full border border-surface rounded-lg p-2 pl-6 focus:outline-none focus:border-primary text-xs transition-colors bg-surface/30" 
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <button 
              className="w-full mt-6 bg-secondary text-white font-heading uppercase py-3 rounded-xl hover:bg-primary transition-all duration-300 text-[10px] font-bold tracking-widest transform hover:scale-[1.02] shadow-md shadow-secondary/10"
              onClick={handleApplyPrice}
            >
              Filtrele
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <h1 className="text-xl md:text-2xl font-heading font-bold uppercase tracking-tight text-secondary">
              {searchQuery ? `ARAMA SONUÇLARI (${filteredProducts.length})` : `TÜM ÜRÜNLER (${filteredProducts.length})`}
            </h1>
            <div className="relative w-full sm:w-auto">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto appearance-none border border-surface rounded-xl px-4 py-2.5 pr-10 font-heading font-bold text-[10px] uppercase tracking-widest focus:outline-none focus:border-primary bg-white cursor-pointer transition-colors shadow-sm"
              >
                <option value="recommended">Önerilen Sıralama</option>
                <option value="price-asc">En Düşük Fiyat</option>
                <option value="price-desc">En Yüksek Fiyat</option>
                <option value="newest">En Yeni Ürünler</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
                <span className="text-[8px]">▼</span>
              </div>
            </div>
          </div>

          {loading ? (
            <ProductsSkeleton />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group bg-white border border-gray-100 hover:border-primary/30 rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col transform hover:-translate-y-3 cursor-pointer relative">
                  <Link href={`/urun/${product.slug || product.id}`} className="absolute inset-0 z-0"></Link>
                  <div className="relative w-full h-64 bg-gray-50 flex items-center justify-center overflow-hidden">
                    {/* Badges */}
                    <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
                      {product.stock > 0 ? (
                        <div className="bg-secondary text-white text-[9px] font-black px-3 py-1.5 rounded-full font-heading uppercase tracking-widest shadow-lg shadow-secondary/20">
                          STOKTA VAR
                        </div>
                      ) : (
                        <div className="bg-red-500 text-white text-[9px] font-black px-3 py-1.5 rounded-full font-heading uppercase tracking-widest shadow-lg shadow-red-500/20">
                          TÜKENDİ
                        </div>
                      )}
                      {product.isNew && (
                        <div className="bg-primary text-white text-[9px] font-black px-3 py-1.5 rounded-full font-heading uppercase tracking-widest shadow-lg shadow-primary/20">
                          YENİ
                        </div>
                      )}
                    </div>

                    <div className="block w-full h-full relative p-8">
                      {product.image ? (
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill
                          unoptimized
                          className="object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-300 text-xs font-heading uppercase tracking-widest">[ Görsel ]</div>
                      )}
                    </div>
                    
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(product); }}
                      className={`absolute top-4 right-4 w-11 h-11 rounded-full flex items-center justify-center shadow-xl transition-all duration-300 z-20 ${favorites.includes(String(product.id)) ? 'bg-primary text-white' : 'bg-white text-secondary hover:text-primary'}`}
                    >
                      <Heart className={`w-5 h-5 ${favorites.includes(String(product.id)) ? 'fill-current' : ''}`} />
                    </button>

                    {/* Quick Add Button on Hover */}
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product); }}
                      className="absolute bottom-0 left-0 right-0 bg-primary text-white font-heading font-black py-4 uppercase text-xs tracking-widest translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20 flex items-center justify-center space-x-2"
                    >
                      <ShoppingBag size={16} /> <span>Sepete Ekle</span>
                    </button>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow relative z-10 pointer-events-none">
                    <div className="flex items-center space-x-1 text-primary mb-2">
                      {[...Array(5)].map((_, i) => <Star key={i} size={12} className="fill-primary" />)}
                      <span className="text-[10px] text-gray-400 font-bold ml-2">5.0</span>
                    </div>
                    
                    <p className="text-[10px] text-primary mb-2 font-heading font-black uppercase tracking-[0.2em]">
                      {product.category?.name || 'Aksesuar'}
                    </p>
                    <h2 className="font-heading font-black text-secondary group-hover:text-primary mb-4 line-clamp-2 uppercase text-base leading-tight transition-colors tracking-tight">
                      {product.name}
                    </h2>
                    
                    <div className="mt-auto pt-6 flex items-end justify-between border-t border-gray-50">
                      <div className="flex flex-col">
                        {product.oldPrice && (
                          <span className="text-xs text-gray-400 font-body line-through mb-1">₺{product.oldPrice.toLocaleString('tr-TR')}</span>
                        )}
                        <span className="font-body font-black text-2xl text-secondary leading-none">
                          ₺{parseFloat(product.price).toLocaleString('tr-TR')}
                        </span>
                      </div>
                      <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">
                        {product.category?.name || 'Premium'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-surface">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-text-muted" />
              </div>
              <h3 className="text-xl font-heading font-bold text-secondary uppercase mb-3 tracking-widest">Ürün Bulunamadı</h3>
              <p className="text-text-muted font-body text-sm max-w-xs mx-auto mb-8 leading-relaxed">Aradığınız kriterlere uygun aksesuar bulamadık. Filtreleri sıfırlayıp tekrar deneyebilirsiniz.</p>
              <button 
                onClick={() => {setSelectedCategories([]); setAppliedMin(null); setAppliedMax(null);}}
                className="bg-primary text-secondary px-8 py-3 rounded-xl font-heading font-bold uppercase text-[10px] tracking-widest hover:bg-primary-hover transition-colors shadow-lg shadow-primary/20"
              >
                Filtreleri Sıfırla
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

