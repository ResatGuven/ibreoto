import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası | ARI HAYAT",
  description: "Müşteri verilerinin gizliliği ve güvenliği konusundaki politikalarımız.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
