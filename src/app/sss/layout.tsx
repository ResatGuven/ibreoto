import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | ibreoto",
  description: "Kargo, iade, ödeme yöntemleri ve ürün uyumluluğu hakkında merak ettiğiniz tüm soruların yanıtları.",
};

export default function SssLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
