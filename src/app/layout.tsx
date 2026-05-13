import type { Metadata } from "next";
import { Oswald, Nunito_Sans } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import FooterWrapper from "@/components/layout/FooterWrapper";
import MainContentWrapper from "@/components/layout/MainContentWrapper";

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

const nunitoSans = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "ibreoto | İbreni Yüksel, Yolunu Belirle",
  description: "Aracını Tamamla, Yola Koy. 500'den fazla orijinal araba aksesuarı, hızlı teslimat ve güvenilir alışveriş.",
  keywords: ["araba aksesuarı", "oto aksesuar", "ibreoto", "araç içi aksesuar", "araç dışı aksesuar", "tuning"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${oswald.variable} ${nunitoSans.variable} antialiased bg-background text-text-main flex flex-col min-h-screen`}
      >
        <NavbarWrapper />
        <MainContentWrapper>{children}</MainContentWrapper>
        <FooterWrapper />
      </body>
    </html>
  );
}
