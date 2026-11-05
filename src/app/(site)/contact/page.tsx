import { activeLicenses, business, formattedAddress, hasAddress } from "@/config/business";
import { serviceArea } from "@/config/serviceArea";
import { ContactForm } from "@/components/contact/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { Reveal } from "@/components/ui/Reveal";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { signatureFont } from "@/lib/fonts";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Book a Consultation",
  description:
    "Talk directly with the owner of AB Development, a family-owned builder of custom homes and new development on Long Island, in New York City, and Westchester. Available 24/7 at (516) 778-0685.",
  path: "/contact",
});

export default function ContactPage() {
  const { owner } = business;
  return (
    <>
      {/* ------------------------------------------------- A personal note */}
      <section aria-labelledby="contact-title" className="bg-black pt-20 pb-24 lg:pt-32 lg:pb-32">
        <div className="container-luxe grid gap-16 lg:grid-cols-12 lg:gap-20">
          <Reveal className="lg:col-span-7">
            <h1 id="contact-title" className="text-[clamp(3rem,7vw,6.5rem)] leading-[0.98]">
              Let&apos;s talk about your home.
            </h1>
            <div className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed text-ivory/80">
              <p>
                Every home we build starts with a conversation, and that conversation is with me. No sales team, no
                hand-offs. Just an honest talk about what you want to build and how we can get you there.
              </p>
              <p>Call me any time, or write a note below and I&apos;ll get back to you personally.</p>
            </div>
            <div className="mt-10">
              <p className={`${signatureFont.className} text-6xl leading-none text-ivory`} aria-hidden="true">
                {owner.firstName}
              </p>
              <p className="label mt-3 text-stone">
                {owner.name}, {owner.title}
              </p>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5 lg:pt-4">
            <aside aria-label="Contact details" className="divide-y divide-ivory/15 border-y border-ivory/15">
              <div className="py-8">
                <p className="label text-stone">Call me directly</p>
                <a
                  href={`tel:${business.phone.tel}`}
                  className="mt-3 block font-serif text-[clamp(2.25rem,4vw,3.25rem)] font-light text-ivory transition-colors hover:text-gold"
                >
                  {business.phone.display}
                </a>
                <p className="mt-1 text-sm text-stone">{business.hours.display}</p>
              </div>
              <div className="py-8">
                <p className="label text-stone">Email</p>
                <a
                  href={`mailto:${business.email}`}
                  className="mt-3 block text-xl break-all text-ivory transition-colors hover:text-gold"
                >
                  {business.email}
                </a>
              </div>
              <div className="grid grid-cols-2 gap-6 py-8">
                <div>
                  <p className="label text-stone">Instagram</p>
                  <a
                    href={business.instagram.url}
                    target="_blank"
                    rel="noopener"
                    className="mt-3 block text-ivory transition-colors hover:text-gold"
                  >
                    {business.instagram.handle}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
                <div>
                  <p className="label text-stone">Office</p>
                  {hasAddress ? (
                    <p className="mt-3 text-ivory">{formattedAddress()}</p>
                  ) : (
                    // TODO: add the address in /src/config/business.ts
                    <PlaceholderTag className="mt-3">Address coming soon</PlaceholderTag>
                  )}
                </div>
              </div>
              <div className="py-6">
                <TrustBadges className="text-[0.65rem]" />
                {activeLicenses.length > 0 && (
                  <ul className="mt-4 space-y-1 text-xs text-stone">
                    {activeLicenses.map((l) => (
                      <li key={l.label}>
                        {l.label}: {l.number}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* --------------------------------------------------- Write a note */}
      <section
        id="book"
        aria-labelledby="book-title"
        className="on-light scroll-mt-28 bg-ivory py-24 text-black lg:py-36"
      >
        <div className="container-luxe">
          <div className="mx-auto max-w-4xl">
            <Eyebrow tone="taupe">Book a Consultation</Eyebrow>
            <h2 id="book-title" className="mt-5 text-[clamp(2.5rem,5vw,4rem)]">
              Write to {owner.firstName}
            </h2>
            <p className="mt-4 max-w-xl text-lg text-taupe">
              Fill in the blanks. It takes about a minute, and it comes straight to me.
            </p>
            <div className="mt-14 bg-white/60 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] ring-1 ring-black/5 sm:p-12 lg:p-16">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- Pick a time */}
      <section id="schedule" aria-labelledby="schedule-title" className="scroll-mt-28 bg-black py-24 lg:py-32">
        <div className="container-luxe">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <Reveal className="lg:col-span-7">
              <h2 id="schedule-title" className="text-[clamp(2.5rem,5vw,4rem)]">
                Prefer to pick a time?
              </h2>
            </Reveal>
            <Reveal delay={120} className="lg:col-span-5">
              <p className="text-lg text-stone">
                Choose a time that works for you, and we&apos;ll meet by phone, video, or at the property.
              </p>
            </Reveal>
          </div>
          <Reveal className="mt-12">
            {business.bookingEmbedUrl ? (
              <iframe
                src={business.bookingEmbedUrl}
                title="Book a consultation with AB Development (Google Calendar)"
                className="h-[760px] w-full border-0 bg-white"
                loading="lazy"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-5 border border-ivory/15 px-6 py-20 text-center">
                <PlaceholderTag>Booking calendar placeholder</PlaceholderTag>
                <p className="max-w-lg text-stone">
                  Online scheduling is coming soon. Until then, write a note above or call{" "}
                  <a href={`tel:${business.phone.tel}`} className="text-ivory underline underline-offset-4">
                    {business.phone.display}
                  </a>{" "}
                  and we&apos;ll find a time together.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Map */}
      <section aria-labelledby="map-title" className="border-t border-ivory/10 bg-black">
        <div className="container-luxe flex flex-col gap-4 py-14 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="map-title" className="text-4xl">
            Where we build
          </h2>
          <p className="label text-stone">{serviceArea.map((r) => r.name).join(" · ")}</p>
        </div>
        <iframe
          src={business.mapEmbedUrl}
          title="Map of the AB Development service area: Long Island, New York City, and Westchester"
          className="block h-[28rem] w-full border-0 [filter:grayscale(1)_invert(0.9)_contrast(0.9)] lg:h-[34rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}
