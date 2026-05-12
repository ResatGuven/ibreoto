"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  icon: LucideIcon;
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
        const Icon = stat.icon;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center cursor-pointer transition-all"
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mr-4 ${stat.color}`}>
              <Icon size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
              <p className="text-xs text-green-600 font-medium mt-1 flex items-center">
                <span className="mr-1">↑</span> {stat.trend}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
