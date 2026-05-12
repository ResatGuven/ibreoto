"use client";

import React, { useState, useEffect, use } from 'react';
import { ShoppingCart, Star } from 'lucide-react';

export default function KategoriPage({ params }: { params: Promise<{ slug: string }> }) {
  const [products, setProducts] = useState<any[]>([]);
  const resolvedParams = use(params);

  const categoryNames: { [key: string]: string } = {
    'ic-aksesuar': 'İç Aksesuar',
    'dis-aksesuar': 'Dış Aksesuar',
    'teknoloji': 'Teknoloji & Elektronik',
    'bakim': 'Bakım & Temizlik'
  };
  const categoryName = categoryNames[resolvedParams.slug] || resolvedParams.slug;

  const defaultProducts = [
    { id: 1, name: 'Karbon Fiber Direksiyon Kılıfı', price: '350', category: 'ic-aksesuar', image: '/images/products/steering_wheel_cover.png', description: 'Yüksek kaliteli karbon fiber görünüm.' },
    { id: 2, name: '3D Havuzlu Paspas Seti - VW Golf', price: '850', category: 'ic-aksesuar', image: '/images/products/paspas_seti.png', description: 'Tam uyumlu havuzlu paspas.' },
    { id: 3, name: 'Ortopedik Bel Destekli Koltuk Minderi', price: '450', category: 'ic-aksesuar', image: '/images/products/koltuk_minderi.png', description: 'Uzun sürüşler için konfor.' },
    { id: 4, name: 'Dört Mevsim Branda - Su Geçirmez', price: '1200', category: 'dis-aksesuar', image: '/images/products/araba_brandasi.png', description: 'Aracınızı dış etkenlerden korur.' },
    { id: 5, name: 'Muz Tipi Silecek Takımı', price: '150', category: 'dis-aksesuar', image: '/images/products/silecek_takimi.png', description: 'Sessiz ve temiz silme.' },
    { id: 6, name: 'Krom Kapı Kolu Kaplaması', price: '250', category: 'dis-aksesuar', image: '/images/products/krom_kapi_kolu.png', description: 'Şık krom görünüm.' },
    { id: 7, name: '4K Çift Kameralı Araç İçi Kamera', price: '2500', category: 'teknoloji', image: '/images/products/dash_cam.png', description: 'Ön ve arka kayıt.' },
    { id: 8, name: 'RGB Uygulama Kontrollü Ambiyans Led', price: '650', category: 'teknoloji', image: '/images/products/interior_led.png', description: 'Telefon kontrollü renkler.' },
    { id: 9, name: 'Kablosuz Şarjlı Telefon Tutucu', price: '350', category: 'teknoloji', image: '/images/products/telefon_tutucu.png', description: 'Otomatik kavrama.' },
    { id: 10, name: 'Seramik Katkılı Hızlı Cila 500ml', price: '250', category: 'bakim', image: '/images/products/seramik_cila.png', description: 'Derin parlaklık ve koruma.' },
    { id: 11, name: 'Cilalı Oto Şampuanı 1 Litre', price: '120', category: 'bakim', image: '/images/products/oto_sampuani.png', description: 'Temizler ve parlatır.' },
    { id: 12, name: 'Mikrofiber Kurulama Bezi 3\'lü', price: '80', category: 'bakim', image: '/images/products/kurulama_bezi.png', description: 'Hav bırakmaz.' },
  ];

  useEffect(() => {
    let allProducts = [];
    const savedProducts = localStorage.getItem('app_products');
    if (savedProducts) {
      const parsed = JSON.parse(savedProducts);
      // Merge with default products to get images if missing
      allProducts = parsed.map((p: any) => {
        const def = defaultProducts.find(d => d.id === p.id);
        return {
          ...p,
          image: p.image || (def ? def.image : '')
        };
      });
    } else {
      allProducts = defaultProducts;
      localStorage.setItem('app_products', JSON.stringify(defaultProducts));
    }
    const filtered = allProducts.filter((p: any) => p.category === resolvedParams.slug);
    setProducts(filtered);
  }, [resolvedParams.slug]);

  const addToCart = (product: any) => {
    const savedCart = localStorage.getItem('cart');
    let cart = savedCart ? JSON.parse(savedCart) : [];
    
    const existing = cart.find((item: any) => item.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Trigger custom event for Navbar
    window.dispatchEvent(new Event('cartUpdated'));
    
    alert(`${product.name} sepete eklendi!`);
  };

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-heading font-bold text-secondary mb-6">{categoryName}</h1>
        
        {products.length === 0 ? (
          <p className="text-text-muted font-body">Bu kategoride henüz ürün bulunmamaktadır.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
                <div className="h-48 bg-surface flex items-center justify-center text-text-muted">
                  {product.image ? <img src={product.image} alt="" className="w-full h-full object-cover" /> : <span className="text-sm font-body">Ürün Görseli</span>}
                </div>
                <div className="p-6">
                  <h2 className="font-heading font-bold text-lg text-secondary mb-2">{product.name}</h2>
                  <p className="text-text-muted text-xs mb-2 font-body">{product.description}</p>
                  <div className="flex items-center mb-2">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-text-muted ml-1">4.5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-heading font-bold text-primary text-xl">₺{product.price}</span>
                    <button 
                      className="bg-secondary hover:bg-primary text-white p-2 rounded-lg transition-colors"
                      onClick={() => addToCart(product)}
                    >
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
