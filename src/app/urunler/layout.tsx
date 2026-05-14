import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tüm Ürünler | ibreoto",
  description: "Aracınız için en kaliteli iç ve dış aksesuarları keşfedin. 500'den fazla ürün çeşidi, hızlı kargo ve uygun fiyatlar.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
