import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İptal ve İade Koşulları | ibreoto",
  description: "ibreoto'dan aldığınız ürünlerin iptal, iade ve değişim süreçleri hakkında bilgiler.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
