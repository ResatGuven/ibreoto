import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tüm Ürünler | İbreOto",
  description: "Aracınız için premium aksesuar ve modifiye çözümleri.",
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
