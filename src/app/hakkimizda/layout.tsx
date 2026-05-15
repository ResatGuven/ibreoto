import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hakk覺m覺zda | 彀reOto",
  description: "彀reOto'覺n hikayesi, vizyonu ve do��al ar覺 羹r羹nleri 羹retimindeki tecr羹besi hakk覺nda bilgi edinin.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
