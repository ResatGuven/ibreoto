import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | İbreOto",
  description: "Kargo, iade, ödeme yöntemleri ve araç aksesuar ürünlerimiz hakkında merak ettiğiniz tüm soruların yanıtları.",
};

export default function SssLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
