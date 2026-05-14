import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bayilik ve Toptan Satış | ArıHayat",
  description: "ArıHayat bayisi olun, avantajlı fiyatlarla toptan doğal arı ürünleri alımına başlayın.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
