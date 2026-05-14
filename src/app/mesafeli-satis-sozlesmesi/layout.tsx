import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi | ibreoto",
  description: "ibreoto üzerinden yapacağınız alışverişlerde geçerli olan mesafeli satış sözleşmesi hükümleri.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
