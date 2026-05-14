import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | ibreoto",
  description: "Araba aksesuarları, bakım rehberleri ve tuning dünyasından en güncel haberler ve uzman görüşleri.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
