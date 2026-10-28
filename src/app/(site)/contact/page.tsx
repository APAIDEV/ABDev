import { activeLicenses, business, formattedAddress, hasAddress } from "@/config/business";
import { serviceArea } from "@/config/serviceArea";
import { ContactForm } from "@/components/contact/ContactForm";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ClockIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TrustBadges } from "@/components/ui/TrustBadges";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact & Book a Consultation",
  description:
    "Book a consultation with AB Development, a woman-owned custom home builder serving Long Island, New York City, and Westchester. Available 24/7 at (516) 778-0685.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="contact-title" className="bg-black pt-20 pb-16 lg:pt-32 lg:pb-20">
        <div className="container-luxe">
          <SectionHeading
            as="h1"
            id="contact-title"
            eyebrow="Contact"
            title="Let's talk about your home."
            intro="Tell us about your vision and we'll be in touch to schedule a consultation. Prefer to talk now? We're available 24/7."
          />
          <TrustBadges className="mt-10" />
        </div>
      </section>

      <section
        id="book"
        aria-labelledby="book-title"
        className="scroll-mt-28 border-t border-ivory/10 bg-black py-20 lg:py-28"
      >
        <div className="container-luxe grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7 xl:col-span-8">
            <Eyebrow>Book a Consultation</Eyebrow>
            <h2 id="book-title" className="mt-6 text-4xl lg:text-5xl">
              Request a consultation
            </h2>
            <div className="mt-12">
              <ContactForm />
            </div>
          </div>

          <aside aria-label="Contact details" className="lg:col-span-5 xl:col-span-4">
            <div className="space-y-10 border border-ivory/10 bg-charcoal p-8 lg:sticky lg:top-32 lg:p-10">
              <ContactDetail icon={<PhoneIcon size={18} />} label="Call">
                <a href={`tel:${business.phone.tel}`} className="font-serif text-3xl text-ivory hover:text-gold">
                  {business.phone.display}
                </a>
              </ContactDetail>
              <ContactDetail icon={<MailIcon size={18} />} label="Email">
                <a href={`mailto:${business.email}`} className="break-all text-ivory hover:text-gold">
                  {business.email}
                </a>
              </ContactDetail>
              <ContactDetail icon={<ClockIcon size={18} />} label="Hours">
                <p className="text-ivory">{business.hours.display}</p>
              </ContactDetail>
              <ContactDetail icon={<PinIcon size={18} />} label="Office">
                {hasAddress ? (
                  <p className="text-ivory">{formattedAddress()}</p>
                ) : (
                  <p className="text-stone">
                    {/* TODO: add the address in /src/config/business.ts */}
                    <PlaceholderTag>Address coming soon</PlaceholderTag>
                  </p>
                )}
              </ContactDetail>
              <ContactDetail icon={<InstagramIcon size={18} />} label="Instagram">
                <a href={business.instagram.url} target="_blank" rel="noopener" className="text-ivory hover:text-gold">
                  {business.instagram.handle}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </ContactDetail>
              <div className="border-t border-ivory/10 pt-8">
                <TrustBadges variant="stacked" />
                {activeLicenses.length > 0 && (
                  <ul className="mt-6 space-y-1 text-xs text-stone">
                    {activeLicenses.map((l) => (
                      <li key={l.label}>
                        {l.label}: {l.number}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section
        id="schedule"
        aria-labelledby="schedule-title"
        className="on-light scroll-mt-28 bg-ivory py-20 text-black lg:py-28"
      >
        <div className="container-luxe">
          <SectionHeading
            id="schedule-title"
            eyebrow="Online Booking"
            title="Schedule a Consultation"
            intro="Choose a time that works for you. We'll confirm by email and come prepared to talk through your project."
            light
          />
          <Reveal className="mt-12">
            {business.bookingEmbedUrl ? (
              <iframe
                src={business.bookingEmbedUrl}
                title="Book a consultation with AB Development (Google Calendar)"
                className="h-[760px] w-full border border-black/10 bg-white"
                loading="lazy"
              />
            ) : (
              <div className="flex flex-col items-center justify-center gap-6 border border-dashed border-gold-deep/50 px-6 py-20 text-center">
                <PlaceholderTag className="bg-black!">Booking calendar placeholder</PlaceholderTag>
                <p className="max-w-lg text-taupe">
                  Online scheduling is coming soon. In the meantime, send a request above or call us at{" "}
                  <a href={`tel:${business.phone.tel}`} className="text-black underline underline-offset-4">
                    {business.phone.display}
                  </a>{" "}
                  and we&apos;ll find a time together.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="map-title" className="bg-black">
        <div className="container-luxe py-16">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Eyebrow>Service Area</Eyebrow>
              <h2 id="map-title" className="mt-5 text-4xl">
                Long Island, New York City &amp; Westchester
              </h2>
            </div>
            <p className="label text-stone">{serviceArea.map((r) => r.name).join(" · ")}</p>
          </div>
        </div>
        <iframe
          src={business.mapEmbedUrl}
          title="Map of the AB Development service area: Long Island, New York City, and Westchester"
          className="block h-[28rem] w-full border-0 [filter:grayscale(1)_invert(0.9)_contrast(0.9)] lg:h-[36rem]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>
    </>
  );
}

function ContactDetail({ icon, label, children }: { icon: React.ReactNode; label: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-5">
      <span className="mt-1 text-gold">{icon}</span>
      <div>
        <p className="label text-stone">{label}</p>
        <div className="mt-2">{children}</div>
      </div>
    </div>
  );
}
