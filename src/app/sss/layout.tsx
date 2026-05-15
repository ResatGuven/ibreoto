import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | Arı Hayat",
  description: "Kargo, iade, ödeme yöntemleri ve arı ürünlerimiz hakkında merak ettiğiniz tüm soruların yanıtları.",
};

export default function SssLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
