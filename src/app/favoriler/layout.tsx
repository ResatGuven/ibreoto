import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorilerim | ArıHayat",
  description: "Beğendiğiniz ve daha sonra satın almak için kaydettiğiniz ürünler listesi.",
};

export default function FavoritesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
