import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { foundation, siteUrl } from "@/config/site";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { RevealObserver } from "@/components/ui/RevealObserver";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const ogImage = { url: "/og/default.jpg", width: 1200, height: 630, alt: foundation.name };

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${foundation.name} | In Loving Memory of ${foundation.honoree}`,
    template: `%s | ${foundation.name}`,
  },
  description: foundation.description,
  applicationName: foundation.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: foundation.name,
    images: [ogImage],
  },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#450b1c",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets scroll-in effects start hidden only when scripts can reveal them. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only z-[100] bg-rose px-5 py-3 text-sm text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
