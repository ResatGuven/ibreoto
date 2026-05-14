import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bayilik ve Toptan Satış | ibreoto",
  description: "ibreoto bayisi olun, avantajlı fiyatlarla toptan otomotiv aksesuarı alımına başlayın.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
