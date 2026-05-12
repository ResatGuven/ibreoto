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
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 h-full">
      <h3 className="font-heading font-bold text-lg text-secondary mb-6 border-b border-gray-100 pb-2">Haftalık Satış Analizi</h3>
      
      <div className="flex items-end justify-between h-40 px-2 relative pt-6">
        {weeklySales.map((item, i) => {
          const barHeight = (item.sales / maxSales) * 100;
          return (
            <div key={i} className="flex flex-col items-center flex-1 mx-2 h-full justify-end">
              <div className="w-full bg-gray-50 rounded-t-lg relative h-full flex items-end">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${barHeight}%` }}
                  transition={{ duration: 1, delay: i * 0.1, ease: 'easeOut' }}
                  className="w-full bg-primary rounded-t-lg absolute bottom-0 hover:bg-primary-hover transition-colors cursor-pointer group"
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-secondary opacity-0 group-hover:opacity-100 transition-opacity bg-white px-1 rounded shadow-sm border">
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
