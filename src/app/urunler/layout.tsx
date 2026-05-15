import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tüm Ürünler | Arı Hayat",
  description: "Sofranız için %100 doğal bal, arı sütü ve propolis ürünleri.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
