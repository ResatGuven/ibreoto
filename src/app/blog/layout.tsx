import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | İbreOto",
  description: "Araç aksesuarları, bakım rehberleri ve otomobil dünyasından en güncel bilgiler.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
