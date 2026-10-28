import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ButtonLink } from "@/components/ui/Button";
import { Logo } from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <>
      <Header logo={<Logo height={56} className="h-11! w-auto! lg:h-14!" />} />
      <main id="main" tabIndex={-1} className="flex min-h-[60vh] items-center outline-none">
        <div className="container-luxe py-28 text-center">
          <p className="label text-gold">404</p>
          <h1 className="mt-6 text-5xl font-light italic lg:text-7xl">This room hasn&apos;t been built yet.</h1>
          <p className="mx-auto mt-6 max-w-md text-stone">
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <ButtonLink href="/">Return Home</ButtonLink>
            <ButtonLink href="/contact" variant="outline">
              Contact Us
            </ButtonLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
