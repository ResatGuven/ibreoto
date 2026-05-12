"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Eye } from 'lucide-react';

export default function AdminMesajlarPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/messages');
      const data = await res.json();
      if (Array.isArray(data)) {
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu mesajı silmek istediğinize emin misiniz?')) return;
    
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchMessages();
      } else {
        alert('Failed to delete message');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
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
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">Yükleniyor...</td>
              </tr>
            ) : messages.map((message) => (
              <tr key={message.id} className="border-t border-gray-100 hover:bg-surface/50 transition-colors">
                <td className="p-4 text-text-muted">
                  {message.createdAt ? new Date(message.createdAt).toLocaleDateString('tr-TR') : '---'}
                </td>
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
            {!loading && messages.length === 0 && (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">Henüz mesaj yok.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
