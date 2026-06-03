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
    <div className="p-6 bg-background min-h-screen text-text-main">
      <h1 className="text-2xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-amber-700 uppercase mb-6">Gelen Mesajlar</h1>
      
      <div className="bg-white border-gray-200 shadow-sm backdrop-blur-xl rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left font-body text-sm">
          <thead className="bg-gray-50 border-gray-200 font-heading font-bold text-text-main text-xs uppercase">
            <tr>
              <th className="p-4">Tarih</th>
              <th className="p-4">Ad Soyad</th>
              <th className="p-4">E-Posta</th>
              <th className="p-4">Konu</th>
              <th className="p-4">Mesaj</th>
              <th className="p-4 text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody className="text-text-main">
            {loading ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-500">Yükleniyor...</td>
              </tr>
            ) : messages.map((message) => (
              <tr key={message.id} className="border-t border-gray-200 hover:bg-gray-50 border-gray-200 transition-colors">
                <td className="p-4 text-text-muted">
                  {message.createdAt ? new Date(message.createdAt).toLocaleDateString('tr-TR') : '---'}
                </td>
                <td className="p-4 font-medium text-secondary">{message.name}</td>
                <td className="p-4 text-text-muted">{message.email}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                    message.subject === 'Bayilik Başvurusu' 
                      ? 'bg-primary/20 text-primary border border-primary/50' 
                      : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {message.subject || 'İletişim Mesajı'}
                  </span>
                </td>
                <td className="p-4 text-text-muted truncate max-w-xs">{message.message}</td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => setSelectedMessage(message)}
                    className="text-blue-600 hover:text-blue-800 transition-colors" 
                    title="Oku"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(message.id)} className="text-red-600 hover:text-red-800 transition-colors" title="Sil">
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border-gray-200 shadow-sm border border-gray-200 rounded-2xl p-6 max-w-lg w-full shadow-2xl transform transition-all">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-heading font-bold text-secondary uppercase">Mesaj Detayı</h2>
              <button onClick={() => setSelectedMessage(null)} className="text-gray-500 hover:text-secondary text-2xl">&times;</button>
            </div>
            <div className="space-y-3 text-sm font-body">
              <p><span className="text-gray-500">Gönderen:</span> <span className="text-secondary font-medium">{selectedMessage.name}</span></p>
              <p><span className="text-gray-500">E-Posta:</span> <span className="text-primary">{selectedMessage.email}</span></p>
              <p><span className="text-gray-500">Konu:</span> <span className="text-secondary font-medium">{selectedMessage.subject || 'İletişim Mesajı'}</span></p>
              <p><span className="text-gray-500">Tarih:</span> <span className="text-secondary">{selectedMessage.createdAt ? new Date(selectedMessage.createdAt).toLocaleString('tr-TR') : '---'}</span></p>
              
              <div className="border-t border-gray-200 pt-3 mt-3">
                <p className="text-gray-500 mb-2 font-medium">Mesaj:</p>
                <div className="text-secondary bg-gray-50 border-gray-200 p-4 rounded-lg whitespace-pre-wrap max-h-60 overflow-y-auto">
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
