"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MessageSquare, Send, Heart, Share2, ShieldCheck, Truck, Clock, CheckCircle2, Ticket } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useCartStore } from '@/store/useCartStore';
import { useToast } from '@/context/ToastContext';

export default function ProductDetailClient({ product, slug, relatedProducts }: { product: any, slug: string, relatedProducts?: any[] }) {
  const { data: session } = useSession();
  const [qty, setQty] = useState(1);
  const [comments, setComments] = useState<any[]>(product.reviews || []);
  const [newComment, setNewComment] = useState({ rating: 5, text: '' });
  const [activeTab, setActiveTab] = useState('description');
  const [viewersCount, setViewersCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addToCartStore = useCartStore((state) => state.addToCart);
  const toggleFavoriteStore = useCartStore((state) => state.toggleFavorite);
  const isFavorite = useCartStore((state) => state.isFavorite(product.id));
  const { showToast } = useToast();

  useEffect(() => {
    // Random social proof
    setViewersCount(Math.floor(Math.random() * 20) + 5);
    setCartCount(Math.floor(Math.random() * 10) + 3);
  }, []);

  const addToCart = () => {
    addToCartStore(product, qty);
    
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

    showToast(`${product.name} sepete eklendi!`, 'success');
  };

  const toggleFavorite = () => {
    toggleFavoriteStore(product);
    if (isFavorite) {
      showToast('Ürün favorilerinizden kaldırıldı.', 'info');
    } else {
      showToast('Ürün favorilerinize eklendi!', 'success');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Link panoya kopyalandı!', 'success');
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      showToast("Yorum yapabilmek için giriş yapmalısınız.", "error");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rating: newComment.rating,
          comment: newComment.text,
          productId: product.id
        })
      });

      const data = await res.json();
      if (res.ok) {
        setComments([{
          id: data.review.id,
          userName: data.review.user?.name || 'Anonim',
          rating: data.review.rating,
          comment: data.review.comment,
          date: new Date(data.review.createdAt).toLocaleDateString('tr-TR')
        }, ...comments]);
        setNewComment({ rating: 5, text: '' });
        showToast("Yorumunuz başarıyla eklendi!", "success");
      } else {
        showToast(data.error || "Bir hata oluştu.", "error");
      }
    } catch (e) {
      showToast("Bir hata oluştu.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppLink = () => {
    const text = `Merhaba, bu ürün hakkında bilgi almak istiyorum: ${product.name} - https://arihayat.com/urun/${slug}`;
    return `https://wa.me/905353377251?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24 pb-24 md:pb-8">
      {/* Breadcrumb */}
      <div className="text-sm text-text-muted mb-8 font-body">
        <Link href="/" className="hover:text-primary">Ana Sayfa</Link> &gt;{' '}
        <Link href="/urunler" className="hover:text-primary">Tüm Ürünler</Link> &gt;{' '}
        <span className="text-text-main font-bold">{product.name}</span>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-surface p-4 md:p-10 mb-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="relative aspect-square bg-surface rounded-lg mb-4 flex items-center justify-center p-4 overflow-hidden border border-gray-100">
              <div className="absolute top-4 left-4 flex flex-col space-y-2 z-10">
                {product.isNew && (
                  <div className="bg-amber-500 text-secondary text-[10px] font-bold px-3 py-1 rounded-full font-heading uppercase">
                    YENİ
                  </div>
                )}
                {product.isFreeShipping && (
                  <div className="bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full font-heading uppercase flex items-center">
                    <Truck className="w-3 h-3 mr-1" /> ÜCRETSİZ KARGO
                  </div>
                )}
              </div>
              <Image src={product.images[0]} alt={product.name} fill unoptimized className="object-contain transition-transform hover:scale-110 duration-500 p-4" />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img: string, idx: number) => (
                <div key={idx} className={`w-20 h-20 bg-surface rounded-md border-2 p-1 flex-shrink-0 flex items-center justify-center relative ${idx === 0 ? 'border-primary' : 'border-transparent hover:border-gray-200'}`}>
                  <Image src={img} alt={`${product.name}-${idx}`} fill unoptimized className="object-contain p-1" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="w-full lg:w-1/2">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex text-amber-500">
                {'★'.repeat(5)}
              </div>
              <span className="text-xs text-text-muted font-body">({comments.length} Değerlendirme)</span>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded font-bold uppercase">100% Doğal</span>
            </div>
            
            <h1 className="text-2xl md:text-4xl font-heading font-bold text-secondary mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="bg-amber-50/50 rounded-xl p-4 mb-6 border border-amber-100/50 space-y-3">
              <div className="flex items-baseline space-x-3">
                <span className="text-3xl md:text-4xl font-heading font-bold text-primary">
                  {session ? (product.price * 0.9).toLocaleString('tr-TR') : product.price.toLocaleString('tr-TR')} TL
                </span>
                {(product.oldPrice || session) && (
                  <span className="text-lg font-heading text-text-muted line-through">
                    {session ? product.price.toLocaleString('tr-TR') : (product.oldPrice ? product.oldPrice.toLocaleString('tr-TR') : '')} TL
                  </span>
                )}
              </div>

              {session ? (
                <div className="flex flex-col space-y-1.5 pt-1.5 border-t border-amber-200/30">
                  <div className="flex items-center text-[10px] text-amber-800 font-black uppercase tracking-wider">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                    🐝 Üyemize Özel %10 Ek İndirim Uygulandı!
                  </div>
                  <div className="flex items-center text-[10px] text-gray-500 font-medium">
                    <Ticket className="w-3.5 h-3.5 mr-1 text-primary" />
                    Ödeme ekranında <span className="font-bold text-secondary mx-1">UYE10</span> kuponunu kullanabilirsiniz.
                  </div>
                </div>
              ) : (
                <div className="flex flex-col space-y-1.5 pt-1.5 border-t border-amber-200/30">
                  <div className="flex items-center text-[10px] text-amber-800 font-black uppercase tracking-wider">
                    🎁 Üyelerimize Özel Ekstra %10 İndirim!
                  </div>
                  <Link href="/giris" className="text-[10px] text-primary font-bold hover:underline flex items-center">
                    Giriş yapın veya ücretsiz üye olun &gt;
                  </Link>
                </div>
              )}

              <div className="flex items-center text-[10px] text-gray-400 font-medium pt-1">
                <Clock className="w-3 h-3 mr-1" /> Bu fiyat sınırlı bir süre için geçerlidir.
              </div>
            </div>

            {/* Social Proof */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center text-[11px] text-gray-600 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mr-1.5" />
                Bu ürünü şu an <span className="text-secondary font-bold mx-1">{viewersCount}</span> kişi inceliyor.
              </div>
              <div className="flex items-center text-[11px] text-gray-600 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500 mr-1.5" />
                Son 24 saatte <span className="text-secondary font-bold mx-1">{cartCount}</span> kişi sepetine ekledi.
              </div>
            </div>

            <div className="mb-8 space-y-4">
              <h4 className="font-heading font-bold uppercase text-secondary text-sm">Öne Çıkan Özellikler</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature: string, idx: number) => (
                  <div key={idx} className="flex items-center text-sm text-text-muted font-body">
                    <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                      <span className="text-[10px]">✓</span>
                    </span> 
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-3">
                <div className="w-32 flex items-center border-2 border-surface rounded-lg overflow-hidden bg-white">
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
                  className="flex-grow h-14 text-lg shadow-lg shadow-primary/30 font-heading font-bold uppercase text-secondary"
                  onClick={addToCart}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'STOKTA YOK' : 'SEPETE EKLE'}
                </Button>
              </div>
              
              <div className="flex space-x-3">
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex-grow h-12 flex items-center justify-center border-2 border-green-500 text-green-600 rounded-lg font-heading font-bold text-xs uppercase hover:bg-green-50 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp'tan Sor
                </a>
                <button 
                  onClick={toggleFavorite}
                  className={`w-12 h-12 flex items-center justify-center border-2 rounded-lg transition-colors ${isFavorite ? 'border-primary text-primary bg-primary/5' : 'border-surface text-gray-400 hover:border-primary hover:text-primary'}`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                <button 
                  onClick={handleShare}
                  className="w-12 h-12 flex items-center justify-center border-2 border-surface rounded-lg hover:border-primary hover:text-primary transition-colors text-gray-400"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-primary mb-2">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase">Analizli</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-primary mb-2">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase">Hızlı Kargo</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-primary mb-2">
                  <Heart className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase">%100 Saf</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center text-primary mb-2">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase">Taze Hasat</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-surface p-6 md:p-10 mb-8">
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
          <div className="font-body text-text-muted leading-relaxed prose prose-amber max-w-none">
            <div dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br />') }} />
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="font-body">
            {/* Review Form & List remains largely the same but with ARI HAYAT theme */}
            <div className="bg-surface p-6 rounded-xl mb-8">
              <h3 className="font-heading font-bold text-secondary uppercase mb-4 text-sm">Deneyiminizi Paylaşın</h3>
              {session ? (
                <form onSubmit={handleCommentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-text-muted mb-1 text-xs uppercase">Puan</label>
                      <select value={newComment.rating} onChange={e => setNewComment({...newComment, rating: parseInt(e.target.value)})} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary outline-none transition-all text-sm">
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
                    <textarea value={newComment.text} onChange={e => setNewComment({...newComment, text: e.target.value})} rows={3} className="w-full p-3 border border-gray-200 rounded-lg focus:border-primary outline-none transition-all text-sm" required></textarea>
                  </div>
                  <button type="submit" disabled={isSubmitting} className="bg-secondary hover:bg-secondary-hover text-white px-6 py-3 rounded-lg font-heading font-bold text-xs uppercase transition-colors flex items-center disabled:opacity-50">
                    <Send className="w-3 h-3 mr-2" /> {isSubmitting ? 'Gönderiliyor...' : 'Değerlendir'}
                  </button>
                </form>
              ) : (
                <div className="bg-white p-6 border border-gray-100 rounded-lg text-center">
                  <p className="text-text-muted text-sm mb-4">Ürünlerimizi değerlendirmek ve diğer müşterilerimize deneyimlerinizi aktarmak için lütfen giriş yapın.</p>
                  <Link href="/giris" className="inline-block bg-primary text-secondary font-heading font-bold text-xs uppercase px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors">
                    Giriş Yap / Üye Ol
                  </Link>
                </div>
              )}
            </div>

            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-100 pb-6 last:border-0">
                  <div className="flex justify-between items-center mb-2">
                    <div className="font-bold text-secondary text-sm">{comment.userName}</div>
                    <div className="text-xs text-text-muted">{comment.date}</div>
                  </div>
                  <div className="flex text-amber-500 text-[10px] mb-2">
                    {'★'.repeat(comment.rating)}{'☆'.repeat(5 - comment.rating)}
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed italic">"{comment.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Cross-Sell Carousel */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-heading font-bold text-secondary mb-6 uppercase border-b border-gray-100 pb-3">
            Bunu Alanlar Şunları Da İnceledi
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map(rp => (
              <Link href={`/urun/${rp.slug}`} key={rp.id} className="bg-white rounded-xl shadow-sm border border-surface p-4 hover:border-primary transition-colors flex flex-col group h-full">
                <div className="relative aspect-square bg-surface rounded-lg mb-4 flex items-center justify-center p-2 overflow-hidden">
                  <Image src={rp.images[0]} alt={rp.name} fill unoptimized className="object-contain transition-transform group-hover:scale-110 duration-500 p-2" />
                </div>
                <div className="flex flex-col flex-grow">
                  <h3 className="font-bold text-secondary text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">{rp.name}</h3>
                  <div className="mt-auto">
                    <div className="flex items-baseline space-x-2">
                      <span className="text-lg font-heading font-bold text-primary">{rp.price.toLocaleString('tr-TR')} TL</span>
                      {rp.oldPrice && (
                        <span className="text-xs font-heading text-text-muted line-through">{rp.oldPrice.toLocaleString('tr-TR')} TL</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Mobile Buy Button */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50 flex items-center space-x-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <div className="flex-shrink-0 flex items-center space-x-2">
          <span className="text-xl font-heading font-bold text-primary">
            {product.price.toLocaleString('tr-TR')} TL
          </span>
        </div>
        <Button 
          className="flex-grow h-12 text-sm font-heading font-bold uppercase text-secondary"
          onClick={addToCart}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? 'STOKTA YOK' : 'SEPETE EKLE'}
        </Button>
      </div>
    </div>
  );
}
