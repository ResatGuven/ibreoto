// Güncellendi
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ShoppingBag, Star } from 'lucide-react';

export default function UrunlerPage() {
  return (
    <Suspense fallback={<div className="pt-40 pb-20 text-center text-gray-500 font-body">Ürünler Yükleniyor...</div>}>
      <UrunlerContent />
    </Suspense>
  );
}

function UrunlerContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [appliedMin, setAppliedMin] = useState<number | null>(null);
  const [appliedMax, setAppliedMax] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const categoryNames: { [key: string]: string } = {
    'ic-aksesuar': 'İç Aksesuar',
    'dis-aksesuar': 'Dış Aksesuar',
    'teknoloji': 'Teknoloji & Elektronik',
    'bakim': 'Bakım & Temizlik'
  };

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
    fetchProducts();
  }, [categoryParam]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
        setFilteredProducts(data);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = products;
    
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
    
    setFilteredProducts(filtered);
  }, [selectedCategories, products, appliedMin, appliedMax]);

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
        <Link href="/" className="hover:text-primary">Ana Sayfa</Link> &gt; <span>Tüm Ürünler</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-1/4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-surface mb-6">
            <h3 className="font-heading font-bold uppercase text-secondary mb-4 border-b pb-2">Kategoriler</h3>
            <ul className="space-y-2 font-body text-text-muted text-sm">
              {Object.entries(categoryNames).map(([slug, name]) => (
                <li key={slug}>
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="accent-primary" 
                      checked={selectedCategories.includes(slug)}
                      onChange={() => handleCategoryChange(slug)}
                    /> 
                    <span>{name}</span>
                  </label>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Price Filter */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-surface mb-6">
            <h3 className="font-heading font-bold uppercase text-secondary mb-4 border-b pb-2">Fiyat Aralığı</h3>
            <div className="flex items-center space-x-2 font-body">
              <input 
                type="number" 
                placeholder="Min" 
                className="w-full border border-surface rounded p-2 focus:outline-none focus:border-primary text-sm" 
                value={minPrice}
                onChange={e => setMinPrice(e.target.value)}
              />
              <span>-</span>
              <input 
                type="number" 
                placeholder="Max" 
                className="w-full border border-surface rounded p-2 focus:outline-none focus:border-primary text-sm" 
                value={maxPrice}
                onChange={e => setMaxPrice(e.target.value)}
              />
            </div>
            <button 
              className="w-full mt-4 bg-secondary text-white font-heading uppercase py-2 rounded hover:bg-primary transition-colors text-sm font-bold"
              onClick={handleApplyPrice}
            >
              Uygula
            </button>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-heading font-bold uppercase">Tüm Ürünler</h1>
            <select className="border border-surface rounded p-2 font-body text-sm focus:outline-none focus:border-primary">
              <option>Önerilen Sıralama</option>
              <option>En Düşük Fiyat</option>
              <option>En Yüksek Fiyat</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-3 text-center py-12 text-gray-500">Ürünler yükleniyor...</div>
            ) : filteredProducts.map((product) => (
              <div key={product.id} className="group bg-white border border-surface hover:border-primary rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col">
                <Link href={`/urun/${product.id}`} className="block relative w-full h-48 bg-surface p-4 flex items-center justify-center overflow-hidden">
                  {product.image ? (
                    <img src={product.image} alt={product.name} className="object-contain max-h-full transform group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="text-text-muted text-xs font-body">[ Görsel ]</div>
                  )}
                </Link>
                <div className="p-4 flex flex-col flex-grow">
                  <p className="text-xs text-text-muted mb-1 font-body uppercase">{categoryNames[product.category] || product.category}</p>
                  <Link href={`/urun/${product.id}`} className="font-heading font-bold text-text-main hover:text-primary mb-2 line-clamp-2 uppercase text-sm">
                    {product.name}
                  </Link>
                  <div className="mt-auto pt-4 flex items-center justify-between">
                    <span className="font-body font-bold text-lg text-primary">
                      ₺{product.price}
                    </span>
                    <button 
                      className="bg-surface hover:bg-primary text-text-main hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors font-bold text-lg"
                      onClick={() => addToCart(product)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {!loading && filteredProducts.length === 0 && (
            <p className="text-text-muted text-center py-12 font-body">Seçili kriterlere uygun ürün bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
}
