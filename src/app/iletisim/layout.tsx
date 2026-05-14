import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | ibreoto",
  description: "Bizimle iletişime geçin. Maslak Oto Sanayi'deki adresimiz, telefon numaramız ve destek formumuzla her an yanınızdayız.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
