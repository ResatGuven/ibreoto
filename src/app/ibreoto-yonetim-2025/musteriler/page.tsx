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
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-heading font-bold text-secondary uppercase mb-6">Müşteri Yönetimi</h1>
      
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-surface font-heading font-bold text-secondary text-xs uppercase">
            <tr>
              <th className="p-4">Ad Soyad</th>
              <th className="p-4">E-Posta</th>
              <th className="p-4">Telefon</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((cust) => (
              <tr key={cust.id} className="border-t border-gray-100 hover:bg-surface/50 transition-colors">
                <td className="p-4 font-medium text-secondary flex items-center">
                  <User className="w-4 h-4 mr-2 text-gray-400" />
                  {cust.name}
                </td>
                <td className="p-4 text-text-muted">{cust.email}</td>
                <td className="p-4 text-text-muted">{cust.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
