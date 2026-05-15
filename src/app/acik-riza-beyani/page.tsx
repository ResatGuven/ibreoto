"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function AcikRizaBeyaniPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-gray-100 border border-gray-100"
        >
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-secondary mb-8 uppercase border-b-4 border-primary pb-4 inline-block">Açık Rıza Beyanı</h1>
          
          <div className="prose prose-amber max-w-none font-body text-text-muted leading-relaxed space-y-6">
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, Arı Hayat tarafından sunulan ürün ve hizmetlerden faydalanmam ve şirket ile olan ilişkim kapsamında;
            </p>
            
            <p>
              Kişisel verilerimin; şirket tarafından sunulan ürün ve hizmetlerin beğeni, kullanım alışkanlıklarım ve ihtiyaçlarıma göre özelleştirilerek bana önerilmesi, pazarlama faaliyetlerinin yürütülmesi, kampanya, çekiliş, indirim ve benzeri bildirimlerin tarafıma iletilmesi amaçlarıyla işlenmesine;
            </p>

            <p>
              Bu amaçlarla şirket&apos;in iş ortaklarına, tedarikçilerine ve kanunen yetkili kamu kurumlarına aktarılmasına; özgür irademle açık rıza verdiğimi kabul ve beyan ederim.
            </p>

            <p>
              Bu rızamı dilediğim zaman geri alma hakkına sahip olduğumu bildiğimi beyan ederim.
            </p>

            <p className="mt-12 text-sm italic">
              Son Güncellenme Tarihi: {new Date().toLocaleDateString('tr-TR')}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
