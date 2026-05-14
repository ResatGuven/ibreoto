"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MessageSquare, Send, Heart, Share2 } from 'lucide-react';

export default function ProductDetailClient({ product, slug }: { product: any, slug: string }) {
  const [qty, setQty] = useState(1);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState({ name: '', rating: 5, text: '' });
  const [activeTab, setActiveTab] = useState('description');
  const [isFavorite, setIsFavorite] = useState(false);

  const defaultComments = [
    { id: 1, productId: slug, name: 'Ahmet Y.', rating: 5, text: 'Ürün harika, tam oturdu. Kalitesi beklediğimden çok daha iyi.', date: '10.05.2026' },
    { id: 2, productId: slug, name: 'Mehmet K.', rating: 4, text: 'Güzel ürün ama kargo biraz yavaş geldi.', date: '08.05.2026' },
  ];

  useEffect(() => {
    // Comments logic
    const savedComments = localStorage.getItem('app_reviews');
    if (savedComments) {
      const parsed = JSON.parse(savedComments);
      const filtered = parsed.filter((c: any) => c.productId === slug);
      setComments(filtered.length > 0 ? filtered : defaultComments);
    } else {
      setComments(defaultComments);
    }

    // Favorites logic
    const savedFavs = localStorage.getItem('favorites');
    if (savedFavs) {
      const favs = JSON.parse(savedFavs);
      setIsFavorite(favs.some((p: any) => String(p.id) === String(product.id)));
    }
  }, [slug, product.id]);

  const addToCart = () => {
    const savedCart = localStorage.getItem('cart');
    let cart = savedCart ? JSON.parse(savedCart) : [];
    
    const existing = cart.find((item: any) => String(item.id) === String(product.id));
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...product, qty: qty, price: `₺${product.price}` });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));

    // Analytics Events
    if (typeof window !== 'undefined') {
      // GA4
      (window as any).gtag('event', 'add_to_cart', {
        currency: 'TRY',
        value: product.price * qty,
        items: [{
          item_id: product.id,
          item_name: product.name,
          price: product.price,
          quantity: qty
        }]
      });
      // Meta Pixel
      (window as any).fbq('track', 'AddToCart', {
        content_ids: [product.id],
        content_type: 'product',
        value: product.price * qty,
        currency: 'TRY'
      });
    }

    alert(`${product.name} sepete eklendi!`);
  };

  const toggleFavorite = () => {
    const savedFavs = localStorage.getItem('favorites');
    let favs = savedFavs ? JSON.parse(savedFavs) : [];
    const index = favs.findIndex((p: any) => String(p.id) === String(product.id));
    
    if (index > -1) {
      favs.splice(index, 1);
      setIsFavorite(false);
    } else {
      favs.push(product);
      setIsFavorite(true);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favs));
    window.dispatchEvent(new Event('favoritesUpdated'));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link kopyalandı!');
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const comment = {
      id: Date.now(),
      productId: slug,
      name: newComment.name,
      rating: newComment.rating,
      text: newComment.text,
      date: new Date().toLocaleDateString('tr-TR')
    };

    const savedComments = localStorage.getItem('app_reviews');
    const allComments = savedComments ? JSON.parse(savedComments) : [];
    allComments.unshift(comment);
    localStorage.setItem('app_reviews', JSON.stringify(allComments));

    setComments([comment, ...comments]);
    setNewComment({ name: '', rating: 5, text: '' });
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      {/* Breadcrumb */}
      <div className="text-sm text-text-muted mb-8 font-body">
        <Link href="/" className="hover:text-primary">Ana Sayfa</Link> &gt;{' '}
        <Link href="/urunler" className="hover:text-primary">Tüm Ürünler</Link> &gt;{' '}
        <span className="text-text-main font-bold">{product.name}</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-surface p-6 md:p-10 mb-12">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Gallery */}
          <div className="w-full md:w-1/2">
            <div className="relative aspect-square bg-surface rounded-lg mb-4 flex items-center justify-center p-8 overflow-hidden">
              <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded font-heading uppercase z-10">
                ÇOK SATAN
              </div>
              <img src={product.images[0]} alt={product.name} className="max-h-full object-contain" />
            </div>
            <div className="flex space-x-4">
              {product.images.map((img: string, idx: number) => (
                <div key={idx} className={`w-24 h-24 bg-surface rounded-md border-2 p-2 flex items-center justify-center ${idx === 0 ? 'border-primary' : 'border-transparent'}`}>
                  <img src={img} alt={`${product.name}-${idx}`} className="max-h-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-heading font-bold uppercase text-secondary mb-2">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4 mb-6">
              <div className="flex text-yellow-400">
                {'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}
              </div>
              <span className="text-sm text-text-muted font-body">({comments.length} Değerlendirme)</span>
              {product.stock > 0 ? (
                <span className={`text-sm font-bold font-body px-2 py-1 rounded ${product.stock < 5 ? 'text-red-600 bg-red-50 animate-pulse' : 'text-green-600 bg-green-50'}`}>
                  {product.stock < 5 ? `Son ${product.stock} Ürün!` : 'Stokta Var'}
                </span>
              ) : (
                <span className="text-sm text-gray-500 font-bold font-body bg-gray-100 px-2 py-1 rounded">
                  Stokta Yok
                </span>
              )}
            </div>

            <div className="mb-6 border-b border-surface pb-6">
              <div className="flex items-end space-x-4">
                <span className="text-4xl font-heading font-bold text-primary">
                  {product.price.toLocaleString('tr-TR')} TL
                </span>
                {product.oldPrice && (
                  <span className="text-xl font-heading text-text-muted line-through mb-1">
                    {product.oldPrice.toLocaleString('tr-TR')} TL
                  </span>
                )}
              </div>
            </div>

            <p className="font-body text-text-muted leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="mb-8">
              <h4 className="font-heading font-bold uppercase text-secondary mb-3">Özellikler</h4>
              <ul className="space-y-2">
                {product.features.map((feature: string, idx: number) => (
                  <li key={idx} className="flex items-center text-text-muted font-body">
                    <span className="text-primary mr-2">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <div className="w-24 flex items-center border border-surface rounded-md overflow-hidden">
                <button 
                  className="w-1/3 h-full text-center hover:bg-surface text-lg font-bold"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                >-</button>
                <div className="w-1/3 h-full flex items-center justify-center font-bold font-body">{qty}</div>
                <button 
                  className="w-1/3 h-full text-center hover:bg-surface text-lg font-bold"
                  onClick={() => setQty(qty + 1)}
                >+</button>
              </div>
              <Button 
                className="flex-grow text-lg shadow-lg shadow-primary/30 font-heading font-bold uppercase"
                onClick={addToCart}
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? 'STOKTA YOK' : 'SEPETE EKLE'}
              </Button>
              <button 
                onClick={toggleFavorite}
                className={`w-14 h-14 flex items-center justify-center border-2 rounded-md transition-colors text-2xl ${isFavorite ? 'border-primary text-primary bg-primary/5' : 'border-surface text-gray-400 hover:border-primary hover:text-primary'}`}
              >
                <Heart className={`w-6 h-6 ${isFavorite ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={handleShare}
                className="w-14 h-14 flex items-center justify-center border-2 border-surface rounded-md hover:border-primary hover:text-primary transition-colors text-gray-400"
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details & Reviews Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-surface p-6 md:p-10">
        <div className="flex border-b border-surface mb-6 space-x-8">
          <button 
            onClick={() => setActiveTab('description')}
            className={`font-heading font-bold uppercase pb-4 transition-colors ${activeTab === 'description' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-secondary'}`}
          >
            Ürün Açıklaması
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`font-heading font-bold uppercase pb-4 transition-colors ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary' : 'text-text-muted hover:text-secondary'}`}
          >
            Yorumlar ({comments.length})
          </button>
        </div>

        {activeTab === 'description' && (
          <div className="font-body text-text-muted leading-relaxed max-w-3xl">
            <p>
              İbreoto'nun en çok satan ürünlerinden olan bu premium aksesuar, aracınızın değerini artırır ve sürüş konforunuzu maksimize eder. Yüksek kalite standartlarında üretilmiş olup, uzun yıllar deforme olmadan kullanabilirsiniz.
              <br /><br />
              Kutu içeriğinde gerekli tüm montaj aparatları ve kurulum kılavuzu bulunmaktadır.
            </p>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="font-body">
            <div className="bg-surface p-6 rounded-xl mb-8">
              <h3 className="font-heading font-bold text-secondary uppercase mb-4 text-sm">Yorum Yap</h3>
              <form onSubmit={handleCommentSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-text-muted mb-1 text-xs uppercase">Adınız</label>
                    <input type="text" value={newComment.name} onChange={e => setNewComment({...newComment, name: e.target.value})} className="w-full p-2 border border-gray-200 rounded focus:border-primary outline-none transition-all text-sm" required />
                  </div>
                  <div>
                    <label className="block text-text-muted mb-1 text-xs uppercase">Puan</label>
                    <select value={newComment.rating} onChange={e => setNewComment({...newComment, rating: parseInt(e.target.value)})} className="w-full p-2 border border-gray-200 rounded focus:border-primary outline-none transition-all text-sm">
                      <option value="5">5 Yıldız</option>
                      <option value="4">4 Yıldız</option>
                      <option value="3">3 Yıldız</option>
                      <option value="2">2 Yıldız</option>
                      <option value="1">1 Yıldız</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-text-muted mb-1 text-xs uppercase">Yorumunuz</label>
                  <textarea value={newComment.text} onChange={e => setNewComment({...newComment, text: e.target.value})} rows={3} className="w-full p-2 border border-gray-200 rounded focus:border-primary outline-none transition-all text-sm" required></textarea>
                </div>
                <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded font-heading font-bold text-xs uppercase transition-colors flex items-center">
                  <Send className="w-3 h-3 mr-1" /> Gönder
                </button>
              </form>
            </div>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-100 pb-6">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold text-secondary text-sm">{comment.name}</div>
                    <div className="text-xs text-text-muted">{comment.date}</div>
                  </div>
                  <div className="text-yellow-400 text-xs mb-2">
                    {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">{comment.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
