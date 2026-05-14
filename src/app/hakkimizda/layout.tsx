import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakkımızda | ibreoto",
  description: "ibreoto'nun hikayesi, vizyonu ve otomotiv aksesuar sektöründeki 7 yıllık tecrübesi hakkında bilgi edinin.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
