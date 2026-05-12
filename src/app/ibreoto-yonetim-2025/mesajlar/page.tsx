"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Eye } from 'lucide-react';

export default function AdminMesajlarPage() {
  const [messages, setMessages] = useState<any[]>([]);

  const defaultMessages = [
    { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@test.com', message: 'Ürünleriniz hakkında bilgi almak istiyorum.', date: '11.05.2026' },
    { id: 2, name: 'Mehmet Demir', email: 'mehmet@test.com', message: 'Kargom ne zaman ulaşır?', date: '10.05.2026' },
  ];

  useEffect(() => {
    const savedMessages = localStorage.getItem('app_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages(defaultMessages);
      localStorage.setItem('app_messages', JSON.stringify(defaultMessages));
    }
  }, []);

  const handleDelete = (id: number) => {
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
    localStorage.setItem('app_messages', JSON.stringify(updated));
  };

  return (
    <div className="p-6 bg-background min-h-screen">
      <h1 className="text-2xl font-heading font-bold text-secondary uppercase mb-6">Gelen Mesajlar</h1>
      
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
        <table className="w-full text-left font-body text-sm">
          <thead className="bg-surface font-heading font-bold text-secondary text-xs uppercase">
            <tr>
              <th className="p-4">Tarih</th>
              <th className="p-4">Ad Soyad</th>
              <th className="p-4">E-Posta</th>
              <th className="p-4">Mesaj</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id} className="border-t border-gray-100 hover:bg-surface/50 transition-colors">
                <td className="p-4 text-text-muted">{message.date}</td>
                <td className="p-4 font-medium text-secondary">{message.name}</td>
                <td className="p-4 text-text-muted">{message.email}</td>
                <td className="p-4 text-text-muted truncate max-w-xs">{message.message}</td>
                <td className="p-4 text-right space-x-2">
                  <button className="text-secondary hover:text-primary transition-colors" title="Oku">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(message.id)} className="text-red-500 hover:text-red-700 transition-colors" title="Sil">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
