import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İptal ve İade Koşulları | Arı Hayat",
  description: "Arı Hayat ürün iade ve iptal süreçleri hakkında bilgiler.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
