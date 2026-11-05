import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { business } from "@/config/business";
import { siteUrl } from "@/config/site";
import { BrandBar } from "@/components/layout/BrandBar";
import { CookieConsent } from "@/components/consent/CookieConsent";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { defaultOgImage } from "@/lib/seo";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | Custom Home Builder on Long Island, NYC & Westchester`,
    template: `%s | ${business.name}`,
  },
  description: `${business.name} is ${business.description.replace(/^A /, "a ")}`,
  applicationName: business.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: business.name,
    images: [defaultOgImage],
  },
  twitter: { card: "summary_large_image", images: [defaultOgImage.url] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jost.variable}`}>
      <body className="min-h-dvh bg-black text-ivory">
        <a
          href="#main"
          className="label sr-only z-[100] bg-gold px-5 py-3 text-black focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <BrandBar />
        {children}
        <CookieConsent />
        <RevealObserver />
      </body>
    </html>
  );
}
