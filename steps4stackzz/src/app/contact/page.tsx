import type { Metadata } from "next";
import { foundation } from "@/config/site";
import { InstagramIcon, MailIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/forms/ContactForm";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Steps4Stackzz Foundation, follow us on Instagram, and join our mailing list.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="We would love to hear from you."
        lede={<p>Questions, ideas, or simply a kind word. Every message is read by our family.</p>}
      />

      <section className="section">
        <div className="container-page grid gap-16 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <h2 className="mb-10 text-4xl">Send a message.</h2>
            <ContactForm />
          </Reveal>

          <div className="grid content-start gap-12 lg:col-span-4 lg:col-start-9">
            <Reveal delay={120}>
              <p className="eyebrow mb-5">Follow Along</p>
              <a
                href={foundation.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-line bg-white/50 p-5 transition-colors hover:border-rose"
              >
                <span className="flex size-12 shrink-0 items-center justify-center bg-burgundy text-ivory">
                  <InstagramIcon />
                </span>
                <span>
                  <span className="block font-serif text-2xl text-burgundy group-hover:text-rose-deep">
                    {foundation.instagram.handle}
                  </span>
                  <span className="text-sm text-muted">Foundation news and events</span>
                </span>
              </a>
            </Reveal>

            <Reveal delay={180}>
              <p className="eyebrow mb-5">Remember Amanpreet</p>
              <a
                href={foundation.amanInstagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-line bg-white/50 p-5 transition-colors hover:border-rose"
              >
                <span className="flex size-12 shrink-0 items-center justify-center bg-rose text-white">
                  <InstagramIcon />
                </span>
                <span>
                  <span className="block font-serif text-2xl text-burgundy group-hover:text-rose-deep">
                    {foundation.amanInstagram.handle}
                  </span>
                  <span className="text-sm text-muted">His work, in his own words</span>
                </span>
              </a>
            </Reveal>

            {foundation.email && (
              <Reveal delay={220}>
                <p className="eyebrow mb-5">Email</p>
                <a
                  href={`mailto:${foundation.email}`}
                  className="inline-flex items-center gap-3 text-lg text-burgundy hover:text-rose-deep"
                >
                  <MailIcon /> {foundation.email}
                </a>
              </Reveal>
            )}

            <Reveal delay={260} className="border-t border-line pt-10">
              <p className="eyebrow mb-4">Newsletter</p>
              <h3 className="text-3xl">Stay connected.</h3>
              <p className="mt-3 mb-6 text-muted">Upcoming events and foundation updates, delivered occasionally.</p>
              <NewsletterForm tone="light" id="contact-newsletter" />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
