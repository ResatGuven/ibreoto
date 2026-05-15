import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "KVKK Aydınlatma Metni | �breOto",
  description: "Kişisel verilerinizin korunması ve işlenmesi hakkında detaylı aydınlatma metni.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
