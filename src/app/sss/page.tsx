"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function SSSPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openItem, setOpenItem] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await fetch('/api/faqs');
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error("Failed to load SSS data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-white font-body">
      {/* Header */}
      <div className="bg-secondary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-honey-gradient honeycomb-bg opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-heading font-bold uppercase mb-2">Sıkça Sorulan Sorular</h1>
          <p className="text-gray-300 font-body text-sm max-w-2xl mx-auto">
            Arı Hayat ürünleri hakkında merak ettiğiniz tüm soruların yanıtlarını burada bulabilirsiniz.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            <p className="text-gray-500 text-sm mt-4 font-bold uppercase tracking-wider">Sorular Yükleniyor...</p>
          </div>
        ) : (
          <div className="space-y-10">
            {categories.map((cat, catIdx) => (
              <div key={catIdx}>
                <h2 className="text-lg font-heading font-black text-secondary uppercase tracking-wider mb-4 flex items-center gap-2">
                  🐝 {cat.category}
                </h2>
                <div className="space-y-3">
                  {cat.items.map((faq: any, idx: number) => {
                    const key = `${catIdx}-${idx}`;
                    const isOpen = openItem === key;
                    return (
                      <div key={faq.id || idx} className="border border-gray-200 rounded-xl overflow-hidden hover:border-primary/30 transition-colors">
                        <button
                          onClick={() => setOpenItem(isOpen ? null : key)}
                          className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-amber-50/50 transition-colors focus:outline-none"
                        >
                          <span className="font-heading font-bold text-secondary text-sm md:text-base pr-4">{faq.question}</span>
                          {isOpen ? <ChevronUp className="text-primary flex-shrink-0" /> : <ChevronDown className="text-gray-400 flex-shrink-0" />}
                        </button>
                        {isOpen && (
                          <div className="p-5 bg-amber-50/30 border-t border-amber-100 font-body text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 p-8 bg-amber-50 rounded-2xl text-center border border-amber-200">
          <div className="text-4xl mb-3">🐝</div>
          <h3 className="font-heading font-bold text-secondary mb-3 text-lg uppercase">Aradığınız Cevabı Bulamadınız mı?</h3>
          <p className="text-gray-600 font-body text-sm mb-6">Müşteri hizmetlerimiz size yardımcı olmaktan mutluluk duyacaktır.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/iletisim" className="bg-primary text-white font-heading font-bold py-3 px-8 rounded-full hover:bg-secondary transition-colors uppercase text-sm">
              Bize Ulaşın
            </Link>
            <a href="https://wa.me/905353377251" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white font-heading font-bold py-3 px-8 rounded-full hover:bg-green-700 transition-colors uppercase text-sm">
              📱 WhatsApp Destek
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
