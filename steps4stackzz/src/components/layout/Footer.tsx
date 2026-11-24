import Link from "next/link";
import { foundation, giveLink, mainNav } from "@/config/site";
import { Logo } from "@/components/ui/Logo";
import { InstagramIcon, MailIcon } from "@/components/ui/Icons";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-burgundy-deep text-blush">
      <div className="container-page grid gap-14 py-20 lg:grid-cols-12 lg:gap-10 lg:py-24">
        <div className="lg:col-span-4">
          <Logo tone="light" className="h-auto w-48" sizes="192px" />
          <p className="mt-8 max-w-xs font-serif text-2xl leading-snug text-ivory italic">{foundation.tagline}</p>
          <p className="mt-4 text-sm text-blush/75">In loving memory of {foundation.honoree}.</p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-3 lg:col-start-6">
          <p className="eyebrow mb-6">Explore</p>
          <ul className="grid gap-3 text-[0.95rem]">
            <li>
              <Link href="/" className="transition-colors hover:text-ivory">
                Home
              </Link>
            </li>
            {[...mainNav, giveLink].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-ivory">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <p className="eyebrow mb-6">Stay Connected</p>
          <p className="mb-5 text-[0.95rem] text-blush/85">Hear about upcoming events and foundation updates.</p>
          <NewsletterForm id="footer-newsletter" />
          <ul className="mt-9 grid gap-3 text-[0.95rem]">
            <li>
              <a
                href={foundation.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 transition-colors hover:text-ivory"
              >
                <InstagramIcon /> {foundation.instagram.handle}
              </a>
            </li>
            <li>
              <a
                href={foundation.amanInstagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 transition-colors hover:text-ivory"
              >
                <InstagramIcon /> {foundation.amanInstagram.handle}
                <span className="text-blush/60">· Amanpreet</span>
              </a>
            </li>
            {foundation.email && (
              <li>
                <a
                  href={`mailto:${foundation.email}`}
                  className="inline-flex items-center gap-3 transition-colors hover:text-ivory"
                >
                  <MailIcon /> {foundation.email}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="container-page flex flex-col gap-3 py-7 text-xs tracking-wide text-blush/65 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {foundation.name}
          </p>
          <p className="font-serif text-sm text-blush/80 italic">{foundation.principle.gurmukhi}</p>
          <Link href="/privacy" className="transition-colors hover:text-ivory">
            Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
}
