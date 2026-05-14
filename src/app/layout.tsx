import type { Metadata } from "next";
import { Oswald, Nunito_Sans } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import FooterWrapper from "@/components/layout/FooterWrapper";
import MainContentWrapper from "@/components/layout/MainContentWrapper";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { Providers } from "@/components/layout/Providers";
import { CookieBanner } from "@/components/layout/CookieBanner";
import Script from "next/script";

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
  title: "ArıHayat | %100 Doğal Bal, Propolis ve Arı Ürünleri",
  description: "Doğanın kalbinden, ısıl işlem görmemiş %100 doğal ham bal, propolis ve arı sütü. Üreticiden kapınıza taze ve sağlıklı arı ürünleri.",
  keywords: ["doğal bal", "propolis", "arı sütü", "polen", "ham bal", "sağlıklı beslenme", "arı hayat"],
  manifest: "/manifest.json",
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
        {/* GA4 */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>

        {/* Meta Pixel */}
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
            fbq('init', '1234567890');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img height="1" width="1" style={{ display: 'none' }} src="https://www.facebook.com/tr?id=1234567890&ev=PageView&noscript=1" alt="fb-pixel" />
        </noscript>

        <Providers>
          <NavbarWrapper />
          <MainContentWrapper>{children}</MainContentWrapper>
          <FooterWrapper />
          <WhatsAppButton />
          <CookieBanner />
        </Providers>
      </body>
    </html>
  );
}
