import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | ARI HAYAT",
  description: "Bizimle iletişime geçin. Bursa Osmangazi'deki adresimiz, telefon numaramız ve destek formumuzla her an yanınızdayız.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
