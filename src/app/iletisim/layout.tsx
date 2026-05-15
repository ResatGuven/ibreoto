import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | Arı Hayat",
  description: "Arı Hayat ile iletişime geçin. Soru, görüş ve önerileriniz için buradayız.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
