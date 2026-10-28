import Link from "next/link";
import { faqs } from "@/content/faq";
import { FinalCta } from "@/components/home/FinalCta";
import { Accordion } from "@/components/ui/Accordion";
import { PlaceholderTag } from "@/components/ui/PlaceholderTag";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { JsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about building a custom home with AB Development: timelines, budgets, permits, financing, dormers, spec homes, and where we build on Long Island, in NYC, and Westchester.",
  path: "/faq",
});

export default function FaqPage() {
  const reviewed = faqs.filter((f) => f.reviewed);
  return (
    <>
      <section aria-labelledby="faq-title" className="on-light bg-ivory py-20 text-black lg:py-32">
        <div className="container-luxe grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-36">
              <SectionHeading as="h1" id="faq-title" eyebrow="Questions" title="Frequently Asked Questions" light />
              <p className="mt-8 text-sm leading-relaxed text-taupe">
                Permit and timeline requirements vary by municipality, including the NYC Department of Buildings, the
                towns and villages of Nassau and Suffolk counties, and Westchester&apos;s towns, cities, and villages.
                Every answer here is general information; see our{" "}
                <Link href="/legal/project-disclaimer" className="text-black underline underline-offset-4">
                  Project &amp; Estimate Disclaimer
                </Link>
                .
              </p>
              <p className="mt-6 text-sm text-taupe">
                Still have a question?{" "}
                <Link href="/contact" className="text-black underline underline-offset-4">
                  Contact us
                </Link>{" "}
                any time.
              </p>
            </div>
          </div>
          <div className="lg:col-span-8">
            <Accordion
              light
              headingLevel="h2"
              items={faqs.map((f) => ({
                id: f.id,
                title: f.question,
                badge: !f.reviewed ? (
                  <PlaceholderTag className="mb-4 bg-black! text-gold-soft">Draft answer</PlaceholderTag>
                ) : null,
                content: (
                  <div className="space-y-4 text-base leading-relaxed text-taupe">
                    {f.answer.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                  </div>
                ),
              }))}
            />
          </div>
        </div>
      </section>
      <FinalCta title="Let's talk about your project." button="Book a Consultation" />
      {/* Only answers marked `reviewed: true` are published to search engines. */}
      {reviewed.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: reviewed.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer.join(" ") },
            })),
          }}
        />
      )}
    </>
  );
}
