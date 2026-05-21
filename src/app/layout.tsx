import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import FooterWrapper from "@/components/layout/FooterWrapper";
import MainContentWrapper from "@/components/layout/MainContentWrapper";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import AsmrWidget from "@/components/layout/AsmrWidget";
import { Providers } from "@/components/layout/Providers";
import { CookieBanner } from "@/components/layout/CookieBanner";
import Script from "next/script";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Arı Hayat | %100 Doğal Arı Ürünleri, Bal, Propolis & Arı Sütü",
  description: "Sofranız için en kaliteli ve doğal ballar, bağışıklık güçlendirici propolis, taze arı sütü ve polen ürünleri. Arı Hayat ile doğadan gelen şifayı keşfedin.",
  keywords: ["doğal bal", "propolis", "arı sütü", "polen", "kestane balı", "arı ekmeği", "arı hayat", "organik bal"],
  manifest: "/manifest.json",
};

import prisma from "@/lib/prisma";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let settings = null;
  try {
    settings = await prisma.siteSettings.findUnique({
      where: { id: 'current' }
    });
  } catch (error) {
    console.error("Failed to load site settings in RootLayout:", error);
  }

  const gaId = settings?.googleAnalyticsId;
  const pixelId = settings?.facebookPixelId;

  return (
    <html lang="tr">
      <body
        className={`${poppins.variable} ${inter.variable} antialiased bg-background text-text-main flex flex-col min-h-screen`}
      >
        {/* GA4 */}
        {gaId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}

        {/* Meta Pixel */}
        {pixelId && (
          <Script id="fb-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${pixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        <Providers>
          <NavbarWrapper />
          <MainContentWrapper>{children}</MainContentWrapper>
          <FooterWrapper />
          <WhatsAppButton />
          <AsmrWidget />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
