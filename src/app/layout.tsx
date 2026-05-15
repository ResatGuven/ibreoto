import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import FooterWrapper from "@/components/layout/FooterWrapper";
import MainContentWrapper from "@/components/layout/MainContentWrapper";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
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
  title: "İbreOto | Premium Araç Aksesuarları & Modifiye Ürünleri",
  description: "Aracınız için en kaliteli iç ve dış aksesuarlar, teknolojik çözümler ve bakım ürünleri. İbreOto ile aracınıza değer katın.",
  keywords: ["oto aksesuar", "araba modifiye", "araç içi kamera", "ambiyans aydınlatma", "karbon fiber kılıf", "ibreoto"],
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
        className={`${poppins.variable} ${inter.variable} antialiased bg-background text-text-main flex flex-col min-h-screen`}
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
            fbq('init', '1234567890'); // Replace with real ID if available
            fbq('track', 'PageView');
          `}
        </Script>
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
