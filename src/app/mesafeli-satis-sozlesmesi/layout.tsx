import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi | ARI HAYAT",
  description: "ARI HAYAT üzerinden yapacağınız alışverişlerde geçerli olan mesafeli satış sözleşmesi.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
