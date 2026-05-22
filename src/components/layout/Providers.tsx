"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { ToastProvider } from "@/context/ToastContext";

export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useCartStore.getState().initialize();
  }, []);

  return (
    <SessionProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </SessionProvider>
  );
}
