import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | Arı Hayat",
  description: "Müşteri verilerinin gizliliğive güvenliği konusundaki politikalarımız.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
