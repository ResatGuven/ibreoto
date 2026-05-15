import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sipariş Takibi | Arı Hayat",
  description: "Sipariş numaranız ile kargonuzun durumunu ve konumunu anlık olarak sorgulayın.",
};

export default function TrackingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
