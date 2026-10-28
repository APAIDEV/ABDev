import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Logo } from "@/components/ui/Logo";
import { businessJsonLd, JsonLd } from "@/lib/seo";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header logo={<Logo height={56} className="h-11! w-auto! lg:h-14!" />} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <JsonLd data={businessJsonLd()} />
    </>
  );
}
