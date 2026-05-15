import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kargo ve Teslimat | Arı Hayat",
  description: "Siparişlerinizin kargolama süreci, teslimat süreleri ve ücretlendirme hakkında bilgiler.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
