import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bayilik ve Toptan Satış | İbreOto",
  description: "İbreOto bayisi olun, avantajlı fiyatlarla toptan araç aksesuar ürünleri alımına başlayın.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
