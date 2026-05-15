import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | Arı Hayat",
  description: "Arı Hayat kişisel verilerin korunması kanunu hakkında bilgilendirme.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
