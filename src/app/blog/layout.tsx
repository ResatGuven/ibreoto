import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | ArıHayat",
  description: "Arı ürünlerinin faydaları, sağlıklı yaşam rehberleri ve doğal beslenme dünyasından en güncel bilgiler ve uzman görüşleri.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
