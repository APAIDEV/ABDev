import Link from "next/link";
import { brands } from "@/config/brands";
import { activeLicenses, business, formattedAddress, hasAddress } from "@/config/business";
import { bookHref, legalNav, mainNav } from "@/config/site";
import { serviceArea } from "@/config/serviceArea";
import { CookieSettingsButton } from "@/components/consent/CookieSettingsButton";
import { InstagramIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { CurrentYear } from "./CurrentYear";

export function Footer() {
  return (
    <footer className="border-t border-ivory/10 bg-black text-ivory">
      <div className="container-luxe py-16 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo height={84} />
            <p className="mt-8 font-serif text-2xl text-ivory">{business.tagline}</p>
            <p className="mt-4 max-w-sm text-sm text-stone">{business.description}</p>
            <TrustBadges variant="stacked" className="mt-8" />
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="label text-gold">Explore</h2>
              <ul className="mt-6 space-y-3 text-sm">
                {mainNav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-stone transition-colors hover:text-ivory">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href={bookHref} className="text-stone transition-colors hover:text-ivory">
                    Book a Consultation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="label text-gold">Contact</h2>
              <ul className="mt-6 space-y-4 text-sm">
                <li>
                  <a
                    href={`tel:${business.phone.tel}`}
                    className="inline-flex items-center gap-3 text-ivory hover:text-gold"
                  >
                    <PhoneIcon size={15} className="text-gold" />
                    {business.phone.display}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${business.email}`}
                    className="inline-flex items-center gap-3 break-all text-ivory hover:text-gold"
                  >
                    <MailIcon size={15} className="shrink-0 text-gold" />
                    {business.email}
                  </a>
                </li>
                <li>
                  <a
                    href={business.instagram.url}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center gap-3 text-ivory hover:text-gold"
                  >
                    <InstagramIcon size={15} className="text-gold" />
                    {business.instagram.handle}
                    <span className="sr-only"> on Instagram (opens in a new tab)</span>
                  </a>
                </li>
                {hasAddress && <li className="text-stone">{formattedAddress()}</li>}
                <li className="text-stone">{business.hours.display}</li>
              </ul>
            </div>

            <div>
              <h2 className="label text-gold">Where We Build</h2>
              <ul className="mt-6 space-y-3 text-sm text-stone">
                {serviceArea.map((r) => (
                  <li key={r.id}>{r.name}</li>
                ))}
              </ul>
              <h2 className="label mt-10 text-gold">The AB Family</h2>
              <ul className="mt-6 space-y-3 text-sm">
                {brands.map((brand) => (
                  <li key={brand.name}>
                    {brand.current ? (
                      <span className="text-ivory">{brand.name}</span>
                    ) : brand.url ? (
                      <a href={brand.url} target="_blank" rel="noopener" className="text-stone hover:text-ivory">
                        {brand.name}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="text-stone/80">
                        {brand.name}
                        <span className="label mt-1 block text-[0.55rem] text-gold/80">Coming Soon</span>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {activeLicenses.length > 0 && (
          <div className="mt-14 border-t border-ivory/10 pt-8">
            <h2 className="label text-gold">Licenses</h2>
            <ul className="mt-4 grid gap-2 text-xs text-stone sm:grid-cols-2 lg:grid-cols-4">
              {activeLicenses.map((l) => (
                <li key={l.label}>
                  {l.label}: <span className="text-ivory">{l.number}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {business.insurance.summary && <p className="mt-4 text-xs text-stone">{business.insurance.summary}</p>}

        <div className="mt-14 flex flex-col gap-6 border-t border-ivory/10 pt-8 text-xs text-stone lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <p>
              © <CurrentYear /> {business.name}. All rights reserved.
            </p>
            <p>{business.trademarkNotice}</p>
          </div>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-ivory">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookieSettingsButton className="hover:text-ivory" />
              </li>
              <li>
                <Link href="/login" className="hover:text-ivory">
                  Team Login
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
