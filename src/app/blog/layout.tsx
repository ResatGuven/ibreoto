import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Arı Hayat",
  description: "Arı ürünleri, sağlıklı yaşam rehberleri ve doğal şifa dünyasından en güncel bilgiler.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
