"use client";

import React from 'react';
import { User } from 'lucide-react';

export default function AdminMusterilerPage() {
  const customers = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@gmail.com', phone: '0555 111 22 33' },
    { id: 2, name: 'Mehmet Demir', email: 'mehmet@gmail.com', phone: '0555 222 33 44' },
    { id: 3, name: 'Ayşe Kaya', email: 'ayse@gmail.com', phone: '0555 333 44 55' },
  ];

  return (
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100">
      <h1 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 uppercase mb-6">Müşteri Yönetimi</h1>
      
      <div className="bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden shadow-lg">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-[#1F2937] font-heading font-bold text-gray-300 text-xs uppercase">
            <tr>
              <th className="p-4">Ad Soyad</th>
              <th className="p-4">E-Posta</th>
              <th className="p-4">Telefon</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {customers.map((cust) => (
              <tr key={cust.id} className="border-t border-gray-800 hover:bg-[#1F2937]/50 transition-colors">
                <td className="p-4 font-medium text-white flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-500" />
                  {cust.name}
                </td>
                <td className="p-4 text-gray-400">{cust.email}</td>
                <td className="p-4 text-gray-400">{cust.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
