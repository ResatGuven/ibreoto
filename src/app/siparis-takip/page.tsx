"use client";

import React, { useState } from 'react';
import { Search, Package, Truck, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function SiparisTakipPage() {
  const [orderId, setOrderId] = useState('');
  const [orderResult, setOrderResult] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearched(true);
    
    const savedOrders = localStorage.getItem('app_orders');
    if (savedOrders) {
      const orders = JSON.parse(savedOrders);
      const order = orders.find((o: any) => String(o.id).includes(orderId) || o.id === parseInt(orderId));
      setOrderResult(order || null);
    } else {
      setOrderResult(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Beklemede': return <Package className="w-8 h-8 text-yellow-500" />;
      case 'Kargoya Verildi': return <Truck className="w-8 h-8 text-blue-500" />;
      case 'Tamamlandı': return <CheckCircle2 className="w-8 h-8 text-green-500" />;
      default: return <AlertCircle className="w-8 h-8 text-gray-500" />;
    }
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-surface">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="mb-8">
          <Link href="/" className="text-text-muted hover:text-primary transition-colors flex items-center font-body text-xs mb-2">
            <ArrowLeft className="w-3 h-3 mr-1" /> ANA SAYFAYA DÖN
          </Link>
          <h1 className="text-3xl font-heading font-bold text-secondary uppercase border-b-2 border-primary pb-2 inline-block">SİPARİŞ TAKİBİ</h1>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-heading font-bold text-secondary mb-4 uppercase">SİPARİŞ NUMARASI İLE SORGULA</h2>
          <p className="text-text-muted font-body text-sm mb-6">
            Sipariş numaranızı girerek kargonuzun durumunu anlık olarak takip edebilirsiniz.
          </p>
          <form onSubmit={handleSearch} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Örn: 1715600000" 
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 p-3 border border-gray-200 rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all font-body text-sm"
              required
            />
            <button type="submit" className="bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-xl font-heading font-bold uppercase transition-all flex items-center shadow-lg shadow-primary/20">
              <Search className="w-4 h-4 mr-2" /> SORGULA
            </button>
          </form>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8">
          <h2 className="text-lg font-heading font-bold text-secondary mb-4 uppercase">KARGO TAKİP NO İLE SORGULA</h2>
          <p className="text-text-muted font-body text-sm mb-6">
            Elinizde kargo takip numarası varsa, aşağıdaki butonlardan ilgili kargo firmasının sitesine giderek sorgulama yapabilirsiniz.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <a href="https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-all font-heading font-bold text-xs uppercase">
              Yurtiçi Kargo
            </a>
            <a href="https://www.mngkargo.com.tr/gonderitakip" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-all font-heading font-bold text-xs uppercase">
              MNG Kargo
            </a>
            <a href="https://www.araskargo.com.tr/tr/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 border border-gray-200 rounded-xl hover:border-primary hover:text-primary transition-all font-heading font-bold text-xs uppercase">
              Aras Kargo
            </a>
          </div>
        </div>

        {searched && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {orderResult ? (
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-surface rounded-2xl">
                      {getStatusIcon(orderResult.status)}
                    </div>
                    <div>
                      <span className="text-xs font-heading font-bold text-text-muted uppercase">Sipariş Durumu</span>
                      <h2 className="text-xl font-heading font-bold text-secondary uppercase">{orderResult.status}</h2>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-heading font-bold text-text-muted uppercase">Sipariş No</span>
                    <p className="text-lg font-heading font-bold text-primary">#{orderResult.id}</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-xs font-heading font-bold text-text-muted uppercase block mb-1">Müşteri</span>
                      <p className="font-body text-sm text-secondary font-medium">{orderResult.customer}</p>
                    </div>
                    <div>
                      <span className="text-xs font-heading font-bold text-text-muted uppercase block mb-1">Tarih</span>
                      <p className="font-body text-sm text-secondary font-medium">{orderResult.date}</p>
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-heading font-bold text-text-muted uppercase block mb-1">Kargo Takip No</span>
                    <div className="bg-surface p-3 rounded-xl border border-dashed border-gray-300">
                      <p className="font-heading font-bold text-secondary mb-2">
                        {orderResult.cargoNo || 'Kargo takip numarası henüz girilmemiş.'}
                      </p>
                      {orderResult.cargoNo && (
                        <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                          <a href={`https://www.yurticikargo.com/tr/online-servisler/gonderi-sorgula?code=${orderResult.cargoNo}`} target="_blank" rel="noopener noreferrer" className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded hover:border-primary hover:text-primary transition-colors uppercase font-bold">Yurtiçi Takip</a>
                          <a href={`https://www.mngkargo.com.tr/gonderitakip/${orderResult.cargoNo}`} target="_blank" rel="noopener noreferrer" className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded hover:border-primary hover:text-primary transition-colors uppercase font-bold">MNG Takip</a>
                          <a href={`https://www.araskargo.com.tr/tr/index.aspx?search=${orderResult.cargoNo}`} target="_blank" rel="noopener noreferrer" className="text-[10px] bg-white border border-gray-200 px-2 py-1 rounded hover:border-primary hover:text-primary transition-colors uppercase font-bold">Aras Takip</a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-heading font-bold text-text-muted uppercase block mb-3">Sipariş İçeriği</span>
                    <div className="space-y-3">
                      {orderResult.items?.map((item: any, idx: number) => (
                        <div key={idx} className="flex justify-between items-center text-sm font-body border-b border-gray-50 pb-2">
                          <span className="text-secondary">{item.name} <span className="text-text-muted">x{item.qty}</span></span>
                          <span className="font-heading font-bold text-secondary">{item.price}</span>
                        </div>
                      ))}
                      <div className="flex justify-between items-center pt-2">
                        <span className="font-heading font-bold text-secondary uppercase">TOPLAM</span>
                        <span className="text-xl font-heading font-bold text-red-500">{orderResult.total}</span>
                      </div>
                    </div>
                  </div>

                  {orderResult.status === 'Beklemede' && (
                    <div className="pt-6 border-t border-gray-100">
                      <div className="bg-yellow-50 p-4 rounded-xl border border-yellow-100 mb-4">
                        <p className="text-xs text-yellow-800 font-body leading-relaxed">
                          <strong>Not:</strong> Siparişiniz henüz kargoya verilmediği için iptal edilebilir durumdadır. İptal talebinizi iletmek için aşağıdaki butonu kullanabilirsiniz.
                        </p>
                      </div>
                      <a 
                        href={`https://wa.me/905061578963?text=${encodeURIComponent(`Merhaba, #${orderResult.id} nolu siparişimi iptal etmek istiyorum.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-heading font-bold uppercase text-xs tracking-widest transition-all flex items-center justify-center shadow-lg shadow-red-200"
                      >
                        SİPARİŞİ İPTAL ET
                      </a>
                    </div>
                  )}

                  {orderResult.status === 'Tamamlandı' && (
                    <div className="pt-6 border-t border-gray-100">
                      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
                        <p className="text-xs text-blue-800 font-body leading-relaxed">
                          <strong>İade Bilgisi:</strong> Ürünü teslim aldıktan sonra 14 gün içerisinde iade etme hakkınız bulunmaktadır. İade süreci için lütfen aşağıdaki butondan talep oluşturun.
                        </p>
                      </div>
                      <a 
                        href={`https://wa.me/905061578963?text=${encodeURIComponent(`Merhaba, #${orderResult.id} nolu siparişim için iade talebi oluşturmak istiyorum.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-heading font-bold uppercase text-xs tracking-widest transition-all flex items-center justify-center shadow-lg shadow-blue-200"
                      >
                        İADE TALEBİ OLUŞTUR
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-red-50 p-8 rounded-2xl border border-red-100 text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-heading font-bold text-red-700 uppercase mb-2">SİPARİŞ BULUNAMADI</h3>
                <p className="text-red-600 font-body text-sm">
                  Girdiğiniz sipariş numarası ile eşleşen bir kayıt bulunamadı. Lütfen numarayı kontrol edip tekrar deneyiniz.
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 bg-secondary text-white p-8 rounded-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-heading font-bold mb-2 uppercase">Yardıma mı ihtiyacınız var?</h3>
            <p className="text-white/70 font-body text-sm mb-6">
              Siparişinizle ilgili bir sorun mu yaşıyorsunuz? Destek ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://wa.me/905061578963" className="bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-lg font-heading font-bold text-xs uppercase transition-all flex items-center justify-center">
                WHATSAPP DESTEK
              </a>
              <Link href="/iletisim" className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-heading font-bold text-xs uppercase transition-all border border-white/20 flex items-center justify-center">
                İLETİŞİM FORMU
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
        </div>
      </div>
    </div>
  );
}
