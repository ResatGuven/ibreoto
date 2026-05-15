"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "Siparişim ne zaman kargoya verilir?",
    answer: "Hafta içi saat 16:00'a kadar verdiğiniz siparişler genellikle aynı gün kargoya teslim edilmektedir. Hafta sonu ve resmi tatillerde verilen siparişler ise takip eden ilk iş gününde işleme alınır."
  },
  {
    question: "Arı sütü ve propolis nasıl saklanmalıdır?",
    answer: "Arı sütü mutlaka buzdolabında saklanmalıdır. Propolis ürünleri ise oda sıcaklığında, doğrudan güneş ışığı görmeyen serin bir yerde muhafaza edilebilir."
  },
  {
    question: "İade süreci nasıl işler?",
    answer: "Ürünü teslim aldığınız tarihten itibaren 14 gün içerisinde orijinal ambalajı bozulmamış ve kullanılmamış olarak iade edebilirsiniz. Gıda ürünlerinde ambalaj açıldıktan sonra hijyen kuralları gereği iade kabul edilememektedir."
  },
  {
    question: "Ödeme seçenekleriniz nelerdir?",
    answer: "Web sitemiz üzerinden kredi kartı, banka kartı ve havale/EFT yöntemleri ile güvenli ödeme yapabilirsiniz. Kredi kartlarına taksit imkanımız bulunmaktadır."
  },
  {
    question: "Ürünleriniz doğal mı?",
    answer: "Evet, tüm Arı Hayat ürünleri %100 doğal ve katkısızdır. Arıcılık faaliyetlerimizde kimyasal ilaçlama yapılmamakta, ürünlerimiz en saf haliyle sunulmaktadır."
  }
];

export default function SSSPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pt-20 min-h-screen bg-white font-body">
      {/* Header */}
      <div className="bg-secondary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-heading font-bold uppercase mb-2">Sıkça Sorulan Sorular</h1>
          <p className="text-gray-300 font-body text-sm max-w-2xl mx-auto">
            Merak ettiğiniz tüm soruların yanıtlarını burada bulabilirsiniz.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <Link href="/" className="text-text-muted hover:text-primary transition-colors flex items-center font-body text-sm mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> Ana Sayfaya Dön
        </Link>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors focus:outline-none"
              >
                <span className="font-heading font-bold text-secondary uppercase text-sm md:text-base">
                  {faq.question}
                </span>
                {openIndex === index ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-gray-400" />}
              </button>
              {openIndex === index && (
                <div className="p-5 bg-gray-50 border-t border-gray-100 font-body text-text-muted text-sm md:text-base leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-surface rounded-2xl text-center">
          <h3 className="font-heading font-bold text-secondary mb-4">Aradığınız cevabı bulamadınız mı?</h3>
          <p className="text-text-muted font-body text-sm mb-6">Müşteri hizmetlerimiz size yardımcı olmaktan mutluluk duyacaktır.</p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/iletisim" className="bg-primary text-white font-heading font-bold py-3 px-8 rounded-lg hover:bg-secondary transition-colors uppercase text-sm">
              Bize Ulaşın
            </Link>
            <a href="https://wa.me/905353377251" target="_blank" rel="noopener noreferrer" className="bg-green-600 text-white font-heading font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition-colors uppercase text-sm">
              WhatsApp Destek
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
