import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mesafeli Satış Sözleşmesi | Arı Hayat",
  description: "Arı Hayat mesafeli satış sözleşmesi ve kullanıcı hakları.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
