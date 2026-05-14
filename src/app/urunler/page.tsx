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
    'ari-sutu': 'Arı Sütü',
    'karisim': 'Karışım',
    'besli-karisim': 'Beşli Karışım',
    'propolis': 'Propolis',
    'polen-ari-ekmegi': 'Polen & Arı Ekmeği',
    'bal': 'Bal',
    'bitkisel-yaglar': 'Bitkisel Yağlar',
    'ozel-setler': 'Özel Setler'
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
        setProducts(data.map(p => {
          let imageUrl = '/images/products/placeholder.png';
          try {
            const imgs = typeof p.images === 'string' ? JSON.parse(p.images) : p.images;
            imageUrl = Array.isArray(imgs) ? imgs[0] : imgs;
          } catch (e) {}
          return { ...p, image: imageUrl };
        }));
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
                <div key={product.id} className="group bg-white border border-surface hover:border-primary/20 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col transform hover:-translate-y-2">
                  <div className="relative w-full h-56 bg-surface/30 p-4 flex items-center justify-center overflow-hidden">
                    {/* Badges */}
                    <div className="absolute top-3 left-3 z-10 flex flex-col space-y-1.5">
                      {product.isNew && (
                        <div className="bg-amber-500 text-secondary text-[8px] font-bold px-2 py-1 rounded font-heading uppercase tracking-wider">
                          YENİ
                        </div>
                      )}
                      {product.isFreeShipping && (
                        <div className="bg-green-500 text-white text-[8px] font-bold px-2 py-1 rounded font-heading uppercase tracking-wider flex items-center">
                          <Truck className="w-2.5 h-2.5 mr-1" /> ÜCRETSİZ
                        </div>
                      )}
                    </div>

                    <Link href={`/urun/${product.slug || product.id}`} className="block w-full h-full relative">
                      {product.image ? (
                        <Image 
                          src={product.image} 
                          alt={product.name} 
                          fill
                          className="object-contain transform group-hover:scale-110 transition-transform duration-700 ease-out p-4" 
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-text-muted text-[10px] font-heading uppercase tracking-widest">[ Görsel ]</div>
                      )}
                    </Link>
                    <button 
                      onClick={() => toggleFavorite(product)}
                      className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-10 ${favorites.includes(String(product.id)) ? 'bg-primary text-secondary' : 'bg-white text-secondary hover:text-primary'}`}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(String(product.id)) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <p className="text-[9px] text-primary mb-1.5 font-heading font-bold uppercase tracking-[0.2em]">
                      {product.category?.name || 'Doğal Ürün'}
                    </p>
                    <Link href={`/urun/${product.slug || product.id}`} className="font-heading font-bold text-secondary hover:text-primary mb-3 line-clamp-2 uppercase text-sm leading-tight transition-colors tracking-tight">
                      {product.name}
                    </Link>
                    
                    <div className="mt-auto pt-4 flex items-end justify-between border-t border-surface/50">
                      <div className="flex flex-col">
                        {product.oldPrice && (
                          <span className="text-[10px] text-text-muted font-body line-through mb-0.5">₺{product.oldPrice.toLocaleString('tr-TR')}</span>
                        )}
                        <span className="font-body font-bold text-xl text-primary leading-none">
                          ₺{product.price.toLocaleString('tr-TR')}
                        </span>
                      </div>
                      <button 
                        className="bg-secondary hover:bg-primary text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-md shadow-secondary/10"
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
            <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-surface">
              <div className="w-20 h-20 bg-surface rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-text-muted" />
              </div>
              <h3 className="text-xl font-heading font-bold text-secondary uppercase mb-3 tracking-widest">Ürün Bulunamadı</h3>
              <p className="text-text-muted font-body text-sm max-w-xs mx-auto mb-8 leading-relaxed">Aradığınız kriterlere uygun şifa kaynağı bulamadık. Filtreleri sıfırlayıp tekrar deneyebilirsiniz.</p>
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
  );
}

