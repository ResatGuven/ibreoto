import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bayilik ve Toptan Satış | Arı Hayat",
  description: "Arı Hayat bayisi olun, avantajlı fiyatlarla doğal arı ürünleri toptan alımına başlayın.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
