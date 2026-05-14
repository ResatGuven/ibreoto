import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tüm Ürünler | ArıHayat",
  description: "Doğanın en saf haliyle sunulan arı sütü, propolis, ham bal ve doğal karışımları keşfedin. Üreticiden doğrudan sofranıza şifa.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
