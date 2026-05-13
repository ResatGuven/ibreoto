// Güncellendi
"use client";

import React, { useState, useEffect } from 'react';
import { Mail, Trash2, Eye } from 'lucide-react';

export default function AdminMesajlarPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);

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
    <div className="p-6 bg-[#0B0F19] min-h-screen text-gray-100">
      <h1 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700 uppercase mb-6">Gelen Mesajlar</h1>
      
      <div className="bg-[#111827]/60 backdrop-blur-xl rounded-2xl border border-gray-800 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left font-body text-sm">
          <thead className="bg-[#1F2937] font-heading font-bold text-gray-300 text-xs uppercase">
            <tr>
              <th className="p-4">Tarih</th>
              <th className="p-4">Ad Soyad</th>
              <th className="p-4">E-Posta</th>
              <th className="p-4">Konu</th>
              <th className="p-4">Mesaj</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="text-gray-300">
            {loading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">Yükleniyor...</td>
              </tr>
            ) : messages.map((message) => (
              <tr key={message.id} className="border-t border-gray-800 hover:bg-[#1F2937]/50 transition-colors">
                <td className="p-4 text-gray-400">
                  {message.createdAt ? new Date(message.createdAt).toLocaleDateString('tr-TR') : '---'}
                </td>
                <td className="p-4 font-medium text-white">{message.name}</td>
                <td className="p-4 text-gray-400">{message.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                    message.subject === 'Bayilik Başvurusu' 
                      ? 'bg-red-900/50 text-red-300 border border-red-700' 
                      : 'bg-blue-900/50 text-blue-300 border border-blue-700'
                  }`}>
                    {message.subject || 'İletişim Mesajı'}
                  </span>
                </td>
                <td className="p-4 text-gray-400 truncate max-w-xs">{message.message}</td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => setSelectedMessage(message)}
                    className="text-blue-400 hover:text-blue-300 transition-colors" 
                    title="Oku"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(message.id)} className="text-red-400 hover:text-red-300 transition-colors" title="Sil">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {!loading && messages.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">Henüz mesaj yok.</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-heading font-bold text-white uppercase">Mesaj Detayı</h2>
              <button onClick={() => setSelectedMessage(null)} className="text-gray-500 hover:text-white text-2xl">&times;</button>
            </div>
            <div className="space-y-3 text-sm font-body">
              <p><span className="text-gray-500">Gönderen:</span> <span className="text-white font-medium">{selectedMessage.name}</span></p>
              <p><span className="text-gray-500">E-Posta:</span> <span className="text-red-400">{selectedMessage.email}</span></p>
              <p><span className="text-gray-500">Konu:</span> <span className="text-white font-medium">{selectedMessage.subject || 'İletişim Mesajı'}</span></p>
              <p><span className="text-gray-500">Tarih:</span> <span className="text-white">{selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString('tr-TR') : '---'}</span></p>
              
              <div className="border-t border-gray-800 pt-3 mt-3">
                <p className="text-gray-500 mb-2 font-medium">Mesaj:</p>
                <div className="text-white bg-[#1F2937] p-4 rounded-lg whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {selectedMessage.message}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
