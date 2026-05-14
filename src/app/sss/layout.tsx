import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | ArıHayat",
  description: "Kargo, iade, ödeme yöntemleri ve doğal ürünlerimiz hakkında merak ettiğiniz tüm soruların yanıtları.",
};

export default function SssLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
