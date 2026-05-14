import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | ARI HAYAT",
  description: "ARI HAYAT'ın hikayesi, vizyonu ve doğal arı ürünleri üretimindeki tecrübesi hakkında bilgi edinin.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
