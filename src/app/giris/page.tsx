"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signIn, signOut } from 'next-auth/react';
import { 
  User, Mail, Lock, LogOut, ShoppingBag, Award, 
  Copy, Check, ExternalLink, Shield, Ticket, 
  Calendar, CreditCard, ChevronDown, CheckCircle2 
} from 'lucide-react';

export default function GirisPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  
  // Unauthenticated Forms State
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Authenticated State
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [copiedCoupon, setCopiedCoupon] = useState(false);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  // Fetch orders if authenticated
  useEffect(() => {
    if (session) {
      const fetchOrders = async () => {
        try {
          const res = await fetch('/api/orders/my-orders');
          const data = await res.json();
          if (data && data.success) {
            setOrders(data.orders);
          }
        } catch (e) {
          console.error("Orders fetch failed:", e);
        } finally {
          setOrdersLoading(false);
        }
      };
      fetchOrders();
    }
  }, [session]);

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('UYE10');
    setCopiedCoupon(true);
    setTimeout(() => setCopiedCoupon(false), 2000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false
      });

      if (result?.error) {
        setError('Hatalı e-posta veya şifre.');
      } else {
        setSuccess('Giriş başarılı! Profiliniz yükleniyor...');
        setTimeout(() => {
          router.refresh();
        }, 1000);
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Kayıt sırasında bir hata oluştu.');
      } else {
        setSuccess('Kayıt başarılı! Giriş yapılıyor...');
        // Auto sign in
        setTimeout(async () => {
          await signIn('credentials', {
            email,
            password,
            redirect: false
          });
          router.refresh();
        }, 1500);
      }
    } catch (err) {
      setError('Sistem hatası. Lütfen daha sonra tekrar deneyin.');
    } finally {
      setLoading(false);
    }
  };

  // Determine membership level
  const getMemberLevel = (orderCount: number) => {
    if (orderCount >= 6) return { name: 'Altın Arıcı 🥇', color: 'from-yellow-400 to-amber-600', text: 'text-yellow-700' };
    if (orderCount >= 3) return { name: 'Gümüş Arıcı 🥈', color: 'from-gray-300 to-slate-400', text: 'text-slate-700' };
    return { name: 'Bronz Arıcı 🥉', color: 'from-orange-300 to-amber-500', text: 'text-amber-800' };
  };

  const memberLevel = getMemberLevel(orders.length);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary"></div>
        <p className="mt-4 text-secondary font-heading font-bold text-sm uppercase tracking-wider">Yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface honeycomb-bg pt-32 pb-24 font-body relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-200/20 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <AnimatePresence mode="wait">
          {session ? (
            /* ========================================================================= */
            /*                       AUTHENTICATED: PROFILE DASHBOARD                    */
            /* ========================================================================= */
            <motion.div 
              key="profile"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left Side: Member Card & Quick stats */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white rounded-3xl p-6 shadow-xl border border-amber-100/50 flex flex-col items-center text-center relative overflow-hidden">
                  <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${memberLevel.color}`} />
                  
                  {/* User Avatar Initials */}
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-amber-500 rounded-full flex items-center justify-center text-white text-3xl font-heading font-black shadow-lg mb-4">
                    {session.user?.name ? session.user.name.charAt(0).toUpperCase() : 'A'}
                  </div>

                  <h2 className="text-xl font-heading font-bold text-secondary">{session.user?.name}</h2>
                  <p className="text-xs text-text-muted mt-1">{session.user?.email}</p>

                  {/* Level Badge */}
                  <div className={`mt-4 px-4 py-1.5 rounded-full bg-gradient-to-r ${memberLevel.color} text-white font-heading font-black text-[10px] uppercase tracking-widest shadow-md`}>
                    {memberLevel.name}
                  </div>

                  <div className="w-full border-t border-gray-100 my-6 pt-6 grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <span className="text-2xl font-heading font-black text-secondary">{orders.length}</span>
                      <span className="block text-[9px] text-gray-400 font-bold uppercase mt-0.5">TOPLAM SİPARİŞ</span>
                    </div>
                    <div className="text-center border-l border-gray-100">
                      <span className="text-2xl font-heading font-black text-primary">%10</span>
                      <span className="block text-[9px] text-gray-400 font-bold uppercase mt-0.5">ÜYE İNDİRİMİ</span>
                    </div>
                  </div>

                  {/* Welcome Coupon widget */}
                  <div className="w-full bg-amber-50/50 border border-amber-100 rounded-2xl p-4 flex flex-col items-center">
                    <div className="flex items-center text-primary mb-1">
                      <Ticket className="w-4 h-4 mr-1.5" />
                      <span className="text-[10px] font-heading font-black uppercase tracking-wider">HOŞ GELDİN KUPONU</span>
                    </div>
                    <p className="text-[10px] text-amber-800 text-center mb-3">İlk alışverişinizde %10 indirim kazanın!</p>
                    <button 
                      onClick={handleCopyCoupon}
                      className="w-full bg-white hover:bg-amber-50 text-secondary border border-amber-200 py-2.5 rounded-xl text-xs font-heading font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      {copiedCoupon ? (
                        <>
                          <Check className="w-4 h-4 text-green-500" /> KOPYALANDI!
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-primary" /> KOD: UYE10
                        </>
                      )}
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="w-full space-y-3 mt-6">
                    {/* Admin Panel entry */}
                    {(session.user as any).role === 'ADMIN' && (
                      <button 
                        onClick={() => router.push('/yonetim')}
                        className="w-full bg-secondary hover:bg-secondary-hover text-white py-3 rounded-2xl text-xs font-heading font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-2 shadow-lg shadow-secondary/10"
                      >
                        <Shield className="w-4 h-4 text-primary" /> YÖNETİCİ PANELİ <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button 
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full bg-gray-50 hover:bg-red-50 text-text-muted hover:text-red-500 border border-gray-100 py-3 rounded-2xl text-xs font-heading font-black uppercase tracking-widest transition-all flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Oturumu Kapat
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Side: Order history */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-amber-100/50 min-h-[400px]">
                  <h3 className="text-xl font-heading font-bold text-secondary mb-6 uppercase flex items-center">
                    <ShoppingBag className="w-5 h-5 mr-2.5 text-primary" /> SİPARİŞ GEÇMİŞİM
                  </h3>

                  {ordersLoading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
                      <p className="mt-2 text-xs text-text-muted uppercase">Yükleniyor...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-16 px-4 space-y-4">
                      <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center text-primary mx-auto">
                        <ShoppingBag className="w-8 h-8" />
                      </div>
                      <h4 className="font-heading font-bold text-secondary text-sm">Henüz Siparişiniz Bulunmuyor</h4>
                      <p className="text-text-muted text-xs max-w-sm mx-auto leading-relaxed">
                        Arı Hayat kalitesiyle üretilmiş, laboratuvar onaylı %100 saf arı ürünlerimizi sepetinize ekleyerek ilk siparişinizi oluşturabilirsiniz.
                      </p>
                      <button 
                        onClick={() => router.push('/urunler')}
                        className="bg-primary hover:bg-primary-hover text-secondary px-6 py-3 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-colors inline-block shadow-md shadow-primary/20"
                      >
                        Ürünleri İncele
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => {
                        const isExpanded = expandedOrder === order.id;
                        return (
                          <div 
                            key={order.id} 
                            className="border border-gray-100 rounded-2xl overflow-hidden transition-all bg-surface hover:shadow-md hover:border-amber-100"
                          >
                            {/* Summary header */}
                            <div 
                              className="p-4 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                              onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                            >
                              <div className="grid grid-cols-2 md:flex md:items-center gap-4 md:space-x-8">
                                <div>
                                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">SİPARİŞ KODU</span>
                                  <span className="text-xs font-heading font-black text-secondary block mt-0.5">#{order.id.substring(0, 10)}...</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">TARİH</span>
                                  <span className="text-xs text-secondary font-semibold block mt-0.5 flex items-center">
                                    <Calendar className="w-3.5 h-3.5 text-primary mr-1" /> {new Date(order.createdAt).toLocaleDateString('tr-TR')}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">TUTAR</span>
                                  <span className="text-xs text-primary font-heading font-black block mt-0.5">₺{order.totalAmount.toLocaleString('tr-TR')}</span>
                                </div>
                                <div>
                                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">DURUM</span>
                                  <span className={`text-[9px] px-2.5 py-1 rounded-full font-heading font-black tracking-wider uppercase block mt-1 w-max ${
                                    order.status === 'DELIVERED' ? 'bg-green-50 text-green-600' :
                                    order.status === 'SHIPPED' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'
                                  }`}>
                                    {order.status === 'DELIVERED' ? 'TESLİM EDİLDİ' :
                                     order.status === 'SHIPPED' ? 'KARGODA' : 'HAZIRLANIYOR'}
                                  </span>
                                </div>
                              </div>

                              <div className="flex justify-end">
                                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isExpanded ? 'rotate-180 text-primary' : ''}`} />
                              </div>
                            </div>

                            {/* Details body */}
                            {isExpanded && (
                              <motion.div 
                                className="bg-white border-t border-gray-100 p-4 md:p-6 space-y-4"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                transition={{ duration: 0.3 }}
                              >
                                <div className="space-y-3">
                                  <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">SATIN ALINAN ÜRÜNLER</span>
                                  <div className="divide-y divide-gray-50">
                                    {order.items?.map((item: any) => (
                                      <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                                        <div className="flex items-center space-x-3">
                                          <div className="w-10 h-10 bg-surface rounded-lg p-1 flex items-center justify-center border border-gray-100 flex-shrink-0">
                                            <img src={item.product?.images ? JSON.parse(item.product.images)[0] : "/images/logo.png"} alt="" className="max-h-full max-w-full object-contain" />
                                          </div>
                                          <div>
                                            <p className="font-bold text-secondary">{item.product?.name}</p>
                                            <p className="text-[10px] text-text-muted mt-0.5">Miktar: {item.quantity} adet</p>
                                          </div>
                                        </div>
                                        <span className="font-heading font-black text-secondary">₺{(item.price * item.quantity).toLocaleString('tr-TR')}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div className="pt-4 border-t border-gray-50 flex flex-col sm:flex-row justify-between text-xs text-text-muted gap-2">
                                  <div>
                                    <span className="font-bold text-secondary">Teslimat Adresi:</span> {order.customerAddress}, {order.customerCity}
                                  </div>
                                  <div>
                                    <span className="font-bold text-secondary">Telefon:</span> {order.customerPhone}
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : (
            /* ========================================================================= */
            /*                       UNAUTHENTICATED: LOGIN / REGISTER                   */
            /* ========================================================================= */
            <motion.div 
              key="auth"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto bg-white/80 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-xl border border-amber-100/50"
            >
              {/* Brand Header */}
              <div className="flex flex-col items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-amber-500 rounded-2xl flex items-center justify-center shadow-md shadow-primary/20 mb-4 rotate-3">
                  <span className="text-secondary font-black text-3xl">🐝</span>
                </div>
                <h1 className="text-3xl font-heading font-black text-secondary mb-1 tracking-tighter uppercase italic">
                  ARI<span className="text-primary">HAYAT</span>
                </h1>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Müşteri Kapısı & Üyelik Portalı</p>
              </div>

              {/* Alert Message for Welcoming Coupon */}
              <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-6 flex items-start space-x-3 text-left">
                <Ticket className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-heading font-bold text-secondary uppercase">İLK SİPARİŞE %10 İNDİRİM!</h5>
                  <p className="text-[10px] text-amber-800 font-body mt-0.5 leading-tight">Şimdi üye olun, sepette geçerli <b>UYE10</b> hoş geldin kuponunu hemen kazanın.</p>
                </div>
              </div>

              {/* Status Notifications */}
              {error && (
                <div className="bg-red-50 text-red-600 border border-red-100 p-4 rounded-2xl text-[10px] font-heading font-black mb-6 text-center uppercase tracking-wider">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 text-green-600 border border-green-100 p-4 rounded-2xl text-[10px] font-heading font-black mb-6 text-center uppercase tracking-wider flex items-center justify-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-green-500" /> {success}
                </div>
              )}

              {/* Tabs selector */}
              <div className="flex bg-surface p-1.5 rounded-2xl mb-8 border border-gray-100">
                <button 
                  onClick={() => { setActiveTab('login'); setError(''); }}
                  className={`w-1/2 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 ${activeTab === 'login' ? 'bg-white text-secondary shadow-md' : 'text-text-muted hover:text-secondary'}`}
                >
                  Giriş Yap
                </button>
                <button 
                  onClick={() => { setActiveTab('register'); setError(''); }}
                  className={`w-1/2 py-2.5 rounded-xl font-heading font-bold text-xs uppercase tracking-wider transition-all duration-300 ${activeTab === 'register' ? 'bg-white text-secondary shadow-md' : 'text-text-muted hover:text-secondary'}`}
                >
                  Kayıt Ol
                </button>
              </div>

              {/* Forms */}
              {activeTab === 'login' ? (
                /* LOGIN FORM */
                <form onSubmit={handleLogin} className="space-y-5 text-left">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">E-POSTA ADRESİ</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ornek@email.com" 
                        className="w-full pl-11 pr-4 py-3.5 bg-surface border border-gray-200 rounded-2xl focus:border-primary outline-none transition-colors text-sm font-body" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">ŞİFRE</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full pl-11 pr-4 py-3.5 bg-surface border border-gray-200 rounded-2xl focus:border-primary outline-none transition-colors text-sm font-body" 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-primary hover:bg-primary-hover text-secondary py-4 rounded-2xl font-heading font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-primary/20 disabled:opacity-50 mt-8"
                  >
                    {loading ? 'Doğrulanıyor...' : 'GİRİŞ YAP'}
                  </button>

                  <div className="relative flex py-4 items-center">
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold uppercase tracking-wider">veya</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="w-full bg-white hover:bg-gray-50 text-secondary border border-gray-200 py-3.5 rounded-2xl font-heading font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google ile Giriş Yap
                  </button>
                </form>
              ) : (
                /* REGISTRATION FORM */
                <form onSubmit={handleRegister} className="space-y-5 text-left">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">AD SOYAD</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="text" 
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ahmet Yılmaz" 
                        className="w-full pl-11 pr-4 py-3.5 bg-surface border border-gray-200 rounded-2xl focus:border-primary outline-none transition-colors text-sm font-body" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">E-POSTA ADRESİ</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ahmet@email.com" 
                        className="w-full pl-11 pr-4 py-3.5 bg-surface border border-gray-200 rounded-2xl focus:border-primary outline-none transition-colors text-sm font-body" 
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-widest ml-1">ŞİFRE (EN AZ 6 KARAKTER)</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input 
                        type="password" 
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••" 
                        className="w-full pl-11 pr-4 py-3.5 bg-surface border border-gray-200 rounded-2xl focus:border-primary outline-none transition-colors text-sm font-body" 
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-secondary hover:bg-secondary-hover text-white py-4 rounded-2xl font-heading font-black uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-secondary/15 disabled:opacity-50 mt-8"
                  >
                    {loading ? 'Kaydediliyor...' : 'HESAP OLUŞTUR'}
                  </button>

                  <div className="relative flex py-4 items-center">
                    <div className="flex-grow border-t border-gray-100"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold uppercase tracking-wider">veya</span>
                    <div className="flex-grow border-t border-gray-100"></div>
                  </div>

                  <button 
                    type="button"
                    onClick={() => signIn('google', { callbackUrl: '/' })}
                    className="w-full bg-white hover:bg-gray-50 text-secondary border border-gray-200 py-3.5 rounded-2xl font-heading font-black text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google ile Kayıt Ol
                  </button>
                </form>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
