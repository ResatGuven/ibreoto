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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, i) => {
        const Icon = iconMap[stat.icon] || HelpCircle;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: '0 10px 30px -10px rgba(59, 130, 246, 0.2)' }}
            className="bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 p-6 flex items-center cursor-pointer transition-all duration-300"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-4 bg-gradient-to-br ${stat.color} shadow-lg shadow-blue-500/10`}>
              <Icon size={24} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
              <p className="text-xs text-green-400 font-medium mt-1 flex items-center">
                <span className="mr-1">↑</span> {stat.trend}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
