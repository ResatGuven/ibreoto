import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İptal ve İade Koşulları | ARI HAYAT",
  description: "ARI HAYAT ürün iade ve iptal süreçleri hakkında bilgiler.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
