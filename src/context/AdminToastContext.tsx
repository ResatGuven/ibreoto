"use client";

import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Undo2, X, CheckCircle2, AlertCircle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'undo';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  onUndo?: () => void;
  duration?: number;
}

interface AdminToastContextType {
  showToast: (message: string, type: ToastType, onUndo?: () => void) => void;
}

const AdminToastContext = createContext<AdminToastContextType | undefined>(undefined);

export const AdminToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timeouts.current[id]) {
      clearTimeout(timeouts.current[id]);
      delete timeouts.current[id];
    }
  }, []);

  const showToast = useCallback((message: string, type: ToastType, onUndo?: () => void) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = type === 'undo' ? 15000 : 5000;

    setToasts((prev) => [...prev, { id, message, type, onUndo, duration }]);

    timeouts.current[id] = setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  return (
    <AdminToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-8 right-8 z-[100] flex flex-col space-y-4 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto"
            >
              <div className={`
                flex items-center space-x-4 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl
                ${toast.type === 'undo' ? 'bg-[#1F2937]/90 border-primary/30 text-white' : 
                  toast.type === 'success' ? 'bg-green-900/90 border-green-500/30 text-white' : 
                  'bg-red-900/90 border-red-500/30 text-white'}
              `}>
                <div className="flex-shrink-0">
                  {toast.type === 'undo' ? <AlertCircle className="w-5 h-5 text-primary" /> :
                   toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-green-400" /> :
                   <X className="w-5 h-5 text-red-400" />}
                </div>
                
                <div className="flex-1">
                  <p className="text-sm font-medium">{toast.message}</p>
                </div>

                {toast.type === 'undo' && toast.onUndo && (
                  <button
                    onClick={() => {
                      toast.onUndo?.();
                      removeToast(toast.id);
                    }}
                    className="flex items-center space-x-1 px-3 py-1 bg-primary hover:bg-primary-hover text-white rounded-lg text-xs font-bold transition-colors group"
                  >
                    <Undo2 className="w-3 h-3 group-hover:-rotate-45 transition-transform" />
                    <span>GERİ AL</span>
                  </button>
                )}

                <button 
                  onClick={() => removeToast(toast.id)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
              
              {/* Progress Bar for Undo */}
              {toast.type === 'undo' && (
                <motion.div 
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 15, ease: "linear" }}
                  className="h-1 bg-primary rounded-full mt-1 mx-2"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AdminToastContext.Provider>
  );
};

export const useAdminToast = () => {
  const context = useContext(AdminToastContext);
  if (!context) throw new Error('useAdminToast must be used within AdminToastProvider');
  return context;
};
