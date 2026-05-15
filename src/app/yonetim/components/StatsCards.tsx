"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Users, TrendingUp, HelpCircle } from 'lucide-react';

// İkon haritası
const iconMap: { [key: string]: any } = {
  DollarSign,
  ShoppingCart,
  Users,
  TrendingUp,
};

interface Stat {
  label: string;
  value: string;
  icon: string;
  color: string;
  trend: string;
}

interface StatsCardsProps {
  stats: Stat[];
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
      {stats.map((stat, i) => {
        const Icon = iconMap[stat.icon] || HelpCircle;
        const colorClass = stat.label.includes('Gelir') ? 'from-green-500/20 to-green-500/5 text-green-500 border-green-500/20' : 
                          stat.label.includes('Sipariş') ? 'from-red-500/20 to-red-500/5 text-red-500 border-red-500/20' : 
                          stat.label.includes('Müşteri') ? 'from-blue-500/20 to-blue-500/5 text-blue-500 border-blue-500/20' : 
                          'from-orange-500/20 to-orange-500/5 text-orange-500 border-orange-500/20';
        
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`bg-white/5 backdrop-blur-xl rounded-[2rem] border p-8 flex flex-col justify-between relative overflow-hidden group shadow-2xl shadow-black/20 ${colorClass.split(' ').pop()}`}
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${colorClass.split(' ').slice(0, 2).join(' ')} rounded-full blur-[40px] -mr-10 -mt-10 opacity-50`} />
            
            <div className="flex items-center justify-between mb-6 relative z-10">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 shadow-lg`}>
                <Icon size={20} className={colorClass.split(' ')[2]} />
              </div>
              <div className="bg-white/5 px-3 py-1 rounded-full border border-white/5">
                <span className={`text-[10px] font-heading font-black uppercase tracking-widest ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.trend}
                </span>
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-[10px] font-heading font-black text-gray-500 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <h3 className="text-3xl font-heading font-black text-white tracking-tighter italic">{stat.value}</h3>
            </div>
            
            <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden relative z-10">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full bg-gradient-to-r ${stat.label.includes('Gelir') ? 'from-green-500 to-green-300' : 'from-primary to-primary-hover'} rounded-full`}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
