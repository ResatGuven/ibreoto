"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function DashboardCharts() {
  // Simüle edilmiş haftalık satış verileri
  const weeklySales = [
    { day: 'Pzt', sales: 1200 },
    { day: 'Sal', sales: 2100 },
    { day: 'Çar', sales: 800 },
    { day: 'Per', sales: 1600 },
    { day: 'Cum', sales: 2500 },
    { day: 'Cmt', sales: 1900 },
    { day: 'Paz', sales: 3000 },
  ];

  const maxSales = Math.max(...weeklySales.map(s => s.sales));

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/5 p-10 h-full shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -mr-32 -mt-32 opacity-50 group-hover:bg-primary/10 transition-colors" />
      
      <div className="flex justify-between items-center mb-10 relative z-10">
        <h3 className="font-heading font-black text-xl text-white uppercase tracking-tighter italic">Haftalık Performans</h3>
        <span className="text-[10px] font-heading font-black text-gray-500 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/5">Son 7 Gün Analizi</span>
      </div>
      
      <div className="flex items-end justify-between h-56 px-2 relative pt-6 z-10">
        {weeklySales.map((item, i) => {
          const barHeight = (item.sales / maxSales) * 100;
          return (
            <div key={i} className="flex flex-col items-center flex-1 mx-3 h-full justify-end group/bar">
              <div className="w-full bg-white/5 rounded-2xl relative h-full flex items-end overflow-hidden border border-white/5 hover:border-primary/30 transition-colors">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${barHeight}%` }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full bg-gradient-to-t from-primary to-primary-hover rounded-t-lg absolute bottom-0 shadow-[0_0_20px_rgba(233,69,96,0.3)]"
                >
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-[10px] font-heading font-black text-white opacity-0 group-hover/bar:opacity-100 transition-all duration-300 bg-secondary px-3 py-1.5 rounded-lg shadow-2xl border border-white/10 whitespace-nowrap">
                    ₺{item.sales.toLocaleString('tr-TR')}
                  </div>
                </motion.div>
              </div>
              <span className="text-[10px] font-heading font-black text-gray-500 mt-4 uppercase tracking-widest">{item.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
