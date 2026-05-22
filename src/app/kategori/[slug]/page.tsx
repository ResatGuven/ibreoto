import React from 'react';
import Link from 'next/link';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { prisma } from '@/lib/prisma';
import CategoryProductsList from '@/components/category/CategoryProductsList';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
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
  const categoryName = categoryNames[resolvedParams.slug] || 'Şifa Kaynağı';

  return {
    title: `${categoryName} - Arı Hayat Premium Arı Ürünleri`,
    description: `En doğal ${categoryName} ürünleri, arı sütü, propolis ve özel karışımlar Arı Hayat kalitesiyle doğrudan kovanlarımızdan kapınıza geliyor.`
  };
}

export default async function KategoriPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  const category = await prisma.category.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      products: {
        orderBy: { createdAt: 'desc' }
      }
    }
  });

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

  const categoryName = category?.name || categoryNames[resolvedParams.slug] || 'Şifa Kaynağı';
  const rawProducts = category?.products || [];

  // Parse images JSON string array for display
  const products = rawProducts.map(p => {
    let image = '/images/products/placeholder.png';
    try {
      const parsed = JSON.parse(p.images);
      if (Array.isArray(parsed) && parsed.length > 0) {
        image = parsed[0];
      }
    } catch (e) {
      if (typeof p.images === 'string' && p.images.startsWith('http')) {
        image = p.images;
      }
    }
    return {
      ...p,
      image
    };
  });

  return (
    <div className="pt-24 min-h-screen bg-surface/30">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <Link href="/urunler" className="inline-flex items-center text-text-muted hover:text-primary font-heading font-bold uppercase text-[10px] tracking-widest mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> TÜM ÜRÜNLER
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-surface pb-8">
            <div>
              <p className="text-primary font-heading font-bold uppercase tracking-[0.3em] text-[10px] mb-2">Kategori</p>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-secondary uppercase tracking-tight">{categoryName}</h1>
            </div>
            <div className="text-text-muted font-body text-sm">
              <span className="text-secondary font-bold">{products.length}</span> Ürün Bulundu
            </div>
          </div>
        </div>
        
        {products.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-surface">
            <ShoppingCart className="w-16 h-16 text-gray-200 mx-auto mb-6" />
            <h2 className="text-2xl font-heading font-bold text-secondary uppercase mb-4 tracking-widest">Henüz Ürün Bulunmuyor</h2>
            <p className="text-text-muted font-body text-sm mb-8 max-w-md mx-auto">Bu kategorideki şifa kaynaklarımızı kovanımıza eklemek için sabırsızlanıyoruz. Lütfen daha sonra tekrar kontrol edin.</p>
            <Link href="/urunler" className="bg-primary text-secondary px-10 py-4 rounded-2xl font-heading font-bold uppercase text-xs tracking-widest hover:bg-primary-hover transition-all shadow-lg shadow-primary/20">
              Diğer Ürünleri Keşfet
            </Link>
          </div>
        ) : (
          <CategoryProductsList products={products} />
        )}
      </div>
    </div>
  );
}
