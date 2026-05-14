"use client";

import React from 'react';

export const ProductsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="bg-white border border-surface rounded-lg overflow-hidden shadow-sm animate-pulse">
          <div className="w-full h-48 bg-gray-100"></div>
          <div className="p-4 space-y-3">
            <div className="h-3 bg-gray-100 rounded w-1/3"></div>
            <div className="h-4 bg-gray-100 rounded w-full"></div>
            <div className="h-4 bg-gray-100 rounded w-2/3"></div>
            <div className="flex justify-between items-center pt-4">
              <div className="h-6 bg-gray-100 rounded w-1/3"></div>
              <div className="h-10 w-10 bg-gray-100 rounded-full"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
