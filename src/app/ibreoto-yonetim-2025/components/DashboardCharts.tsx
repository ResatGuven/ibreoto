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
    <div className="bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 h-full">
      <h3 className="font-heading font-bold text-lg text-white mb-6 border-b border-gray-800 pb-2">Haftalık Satış Analizi</h3>
      
      <div className="flex items-end justify-between h-40 px-2 relative pt-6">
        {weeklySales.map((item, i) => {
          const barHeight = (item.sales / maxSales) * 100;
          return (
            <div key={i} className="flex flex-col items-center flex-1 mx-2 h-full justify-end">
              <div className="w-full bg-[#1F2937]/50 rounded-t-lg relative h-full flex items-end overflow-hidden">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${barHeight}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                  className="w-full bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-lg absolute bottom-0 hover:from-blue-500 hover:to-purple-500 transition-all cursor-pointer group"
                >
                  <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity bg-[#1F2937] px-2 py-1 rounded-md shadow-lg border border-gray-700">
                    ₺{item.sales}
                  </div>
                </motion.div>
              </div>
              <span className="text-xs font-medium text-gray-500 mt-2">{item.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
