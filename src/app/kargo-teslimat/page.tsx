"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Clock, ShieldCheck, Package, ThermometerSnowflake, Phone } from 'lucide-react';

export default function KargoTeslimatPage() {
  const sections = [
    {
      icon: <Clock className="w-6 h-6 text-primary" />,
      title: "Teslimat Süresi",
      content: "Hafta içi saat 16:00'ya kadar verilen siparişler aynı gün kargoya teslim edilmektedir. 16:00'dan sonra veya hafta sonu ve resmi tatil günlerinde verilen siparişler, takip eden ilk iş gününde işleme alınır. Kargonuzun size ulaşma süresi bulunduğunuz bölgeye bağlı olarak 1-3 iş günü arasındadır."
    },
    {
      icon: <ThermometerSnowflake className="w-6 h-6 text-primary" />,
      title: "Arı Sütü Soğuk Zincir Teslimat",
      content: "Arı sütü ürünlerimiz canlılığını ve etkinliğini koruyabilmesi için derin dondurucuda muhafaza edilmekte ve soğuk zincir kargo ile gönderilmektedir. Özel ısı yalıtımlı ambalajlar ve buz aküleri kullanılarak soğuk zincir sürekliliği sağlanmaktadır. Teslim aldığınızda ürünü hemen buzdolabına koyunuz."
    },
    {
      icon: <Package className="w-6 h-6 text-primary" />,
      title: "Paketleme ve Güvenlik",
      content: "Bal ve diğer sıvı arı ürünlerimiz kırılma ve sızmaya karşı özel darbe emici, hava geçirmez paketlerle ambalajlanmaktadır. Tüm ürünlerimiz hijyenik koşullarda paketlenerek sevk edilir. Hasarlı veya sızmış ürün teslim etmeniz halinde bizimle iletişime geçiniz."
    },
    {
      icon: <Truck className="w-6 h-6 text-primary" />,
      title: "Kargo Ücretleri",
      content: "1.500 TL ve üzeri alışverişlerinizde kargo tamamen ÜCRETSİZDİR. Altında kalan siparişlerde kargo ücreti, ödeme sayfasında sepet tutarınıza göre otomatik olarak hesaplanacaktır. Arı sütü ürünlerinde ek soğuk zincir kargo ücreti uygulanabilir."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-primary" />,
      title: "Kargo Firması",
      content: "Siparişleriniz Türkiye'nin güvenilir kargo firmaları (Yurtiçi Kargo, MNG Kargo, Sürat Kargo) aracılığıyla gönderilmektedir. Kargonuzun takip kodunu sipariş onay e-postanızda bulabilirsiniz."
    },
  ];

  return (
    <div className="pt-32 pb-20 min-h-screen bg-background font-body">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100"
        >
          <div className="flex items-center space-x-4 mb-10">
            <Truck className="text-primary w-12 h-12" />
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary uppercase border-b-4 border-primary pb-2">Kargo ve Teslimat</h1>
          </div>

          {/* Free Shipping Badge */}
          <div className="bg-amber-50 border-2 border-primary rounded-2xl p-6 mb-10 text-center">
            <div className="text-4xl mb-2">🐝</div>
            <p className="text-secondary font-heading font-bold text-xl uppercase">1.500 TL ve Üzeri Alışverişlerde Ücretsiz Kargo!</p>
            <p className="text-gray-500 text-sm mt-1">Arı sütü ürünlerimiz soğuk zincir ile güvenle kapınıza gelir.</p>
          </div>

          <div className="space-y-8">
            {sections.map((section, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  {section.icon}
                </div>
                <div>
                  <h2 className="text-lg font-heading font-bold text-secondary uppercase mb-2">{section.title}</h2>
                  <p className="text-gray-600 text-sm leading-relaxed">{section.content}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-amber-50 rounded-2xl border border-amber-200 flex items-start gap-4">
            <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-heading font-bold text-secondary uppercase mb-1">Sorularınız için bize ulaşın</h3>
              <p className="text-gray-600 text-sm">
                Kargo ile ilgili her türlü sorunuz için WhatsApp hattımızdan veya telefonumuzdan bize ulaşabilirsiniz.
              </p>
              <div className="flex gap-4 mt-3">
                <a href="tel:+905363411984" className="text-primary font-bold text-sm hover:underline">📞 0536 341 19 84</a>
                <a href="https://wa.me/905353377251" target="_blank" rel="noopener noreferrer" className="text-green-600 font-bold text-sm hover:underline">💬 WhatsApp</a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
