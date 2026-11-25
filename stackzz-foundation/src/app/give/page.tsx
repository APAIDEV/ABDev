import type { Metadata } from "next";
import { campaigns } from "@/config/giving";
import { foundation } from "@/config/site";
import { pillars } from "@/content/pillars";
import { donationsEnabled } from "@/lib/stripe";
import { ArrowLink, ButtonLink } from "@/components/ui/Button";
import { LockIcon } from "@/components/ui/Icons";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GiveForm } from "@/components/forms/GiveForm";

export const metadata: Metadata = {
  title: "Give Back",
  description:
    "Support Stackzz Foundation with a one-time or monthly gift, direct it to education, faith, or community, or become a sponsor.",
};

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

export default function GivePage() {
  return (
    <>
      <PageHero
        eyebrow="Give Back"
        title="Give with gratitude."
        lede={
          <p>
            Every gift carries Amanpreet&apos;s commitment to serving others into the lives of students, families, and
            communities. Thank you for being part of it.
          </p>
        }
      />

      {/* Donation form */}
      <section className="section">
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-5">Make a Gift</p>
            <h2 className="text-4xl sm:text-5xl">Choose how you would like to give.</h2>
            <p className="mt-6 text-lg text-muted">
              Give once or every month, and direct your gift to the cause closest to your heart. You may also give in
              honor or in memory of someone you love.
            </p>
            <div className="mt-8 flex items-start gap-3 border-l-2 border-rose pl-4 text-[0.95rem] text-muted">
              <LockIcon className="mt-1 size-4 shrink-0 text-rose-deep" />
              <p>
                {donationsEnabled
                  ? "Gifts are processed on Stripe's encrypted checkout. Card details never touch this website."
                  : "When online giving opens, gifts will be processed on Stripe's encrypted checkout. Card details will never touch this website."}
              </p>
            </div>
          </Reveal>
          <Reveal id="give-form" className="scroll-mt-28 lg:col-span-7 lg:col-start-6" delay={120}>
            <div className="border border-blush bg-white/55 p-7 sm:p-10">
              {!donationsEnabled && (
                <p className="mb-8 bg-blush/35 px-5 py-4 text-[0.95rem] text-ink">
                  <span className="font-medium text-burgundy">Online giving opens soon.</span> In the meantime, you can
                  pledge your support below and we will follow up with you personally.
                </p>
              )}
              <GiveForm online={donationsEnabled} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* How contributions help */}
      <section className="section bg-parchment">
        <div className="container-page">
          <SectionHeading
            eyebrow="Where Your Gift Goes"
            title="How your contribution supports our mission."
            intro="Every gift is directed to the work you choose. Gifts given where they are needed most support whichever pillar has the greatest need at the time."
          />
          <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <Reveal key={p.id} delay={i * 100} className="flex flex-col bg-parchment p-8 sm:p-9">
                <span className="font-serif text-2xl text-rose">{p.numeral}</span>
                <h3 className="mt-4 text-3xl">{p.title}</h3>
                <ul className="mt-5 grid flex-1 gap-2.5 text-[0.95rem] text-muted">
                  {p.giftSupports.map((g) => (
                    <li key={g} className="flex gap-3">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-rose" />
                      {g}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <ArrowLink href={`/give?designation=${encodeURIComponent(p.title)}#give-form`}>
                    Give to {p.title}
                  </ArrowLink>
                </div>
              </Reveal>
            ))}
            <Reveal delay={300} className="flex flex-col bg-parchment p-8 sm:p-9">
              <span className="font-serif text-2xl text-rose">IV</span>
              <h3 className="mt-4 text-3xl">Memorial Walk</h3>
              <ul className="mt-5 grid flex-1 gap-2.5 text-[0.95rem] text-muted">
                {[
                  "The annual Steps for Stackzz Memorial Walk",
                  "Community gatherings and events",
                  "Food drives and service days",
                ].map((g) => (
                  <li key={g} className="flex gap-3">
                    <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rotate-45 bg-rose" />
                    {g}
                  </li>
                ))}
              </ul>
              <div className="mt-7">
                <ArrowLink href={`/give?designation=${encodeURIComponent("Memorial Walk and events")}#give-form`}>
                  Give to events
                </ArrowLink>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Campaigns */}
      <section className="section">
        <div className="container-page">
          <SectionHeading eyebrow="Fundraising Campaigns" title="Projects you can rally behind." />
          {campaigns.length ? (
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {campaigns.map((c, i) => (
                <Reveal key={c.title} delay={(i % 2) * 120} className="border border-blush bg-white/55 p-8 sm:p-10">
                  <p className="eyebrow mb-3">{c.designation}</p>
                  <h3 className="text-3xl">{c.title}</h3>
                  <p className="mt-3 text-muted">{c.text}</p>
                  <p className="mt-6 font-serif text-3xl text-burgundy">
                    {money(c.raised)} <span className="font-sans text-base text-muted">raised of {money(c.goal)}</span>
                  </p>
                  <div
                    className="mt-3 h-1.5 bg-blush/60"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={c.goal}
                    aria-valuenow={c.raised}
                    aria-label={`${c.title} progress`}
                  >
                    <div
                      className="h-full bg-burgundy"
                      style={{ width: `${Math.min(100, (c.raised / c.goal) * 100)}%` }}
                    />
                  </div>
                  <div className="mt-7">
                    <ArrowLink href={`/give?designation=${encodeURIComponent(c.designation)}#give-form`}>
                      Support this campaign
                    </ArrowLink>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="mt-8 max-w-2xl text-lg text-muted">
              When we launch a campaign for a specific project, it will appear here with its goal and progress, so you
              can see exactly what your support makes possible.
            </Reveal>
          )}
        </div>
      </section>

      {/* Sponsorships and other ways */}
      <section className="section bg-parchment">
        <div className="container-page grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-14">
          <Reveal className="border-t border-burgundy/25 pt-8">
            <h3 className="text-3xl">Sponsorships</h3>
            <p className="mt-4 text-muted">
              Individuals, families, and businesses can sponsor the Memorial Walk or a specific initiative. We would be
              glad to talk with you about what that could look like.
            </p>
            <div className="mt-6">
              <ArrowLink href="/get-involved#sponsorship">Sponsorship inquiry</ArrowLink>
            </div>
          </Reveal>
          <Reveal className="border-t border-burgundy/25 pt-8" delay={120}>
            <h3 className="text-3xl">Gifts in Kind</h3>
            <p className="mt-4 text-muted">
              School supplies, food for drives, and other donated goods can make a direct difference. Reach out before
              dropping anything off so we can plan together.
            </p>
            <div className="mt-6">
              <ArrowLink href="/contact">Contact us</ArrowLink>
            </div>
          </Reveal>
          <Reveal className="border-t border-burgundy/25 pt-8" delay={240}>
            <h3 className="text-3xl">Your Time</h3>
            <p className="mt-4 text-muted">
              Sewa is not measured in dollars. Volunteering at an event or food drive is one of the most meaningful
              gifts you can give.
            </p>
            <div className="mt-6">
              <ArrowLink href="/get-involved#volunteer">Volunteer with us</ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Transparency */}
      <section className="section">
        <div className="container-text text-center">
          <Reveal>
            <p className="eyebrow mb-5">Our Commitment</p>
            <h2 className="text-4xl sm:text-5xl">Every gift, accounted for.</h2>
            <p className="mt-6 text-lg text-muted">
              As our work begins, we will record what your support makes possible on our Impact page, with real results
              rather than estimates.
            </p>
            <div className="mt-8">
              <ButtonLink href="/impact" variant="outline">
                Our Impact
              </ButtonLink>
            </div>
            <p className="mx-auto mt-14 max-w-xl border-t border-line pt-8 text-sm leading-relaxed text-muted">
              {foundation.taxStatus.confirmed && foundation.taxStatus.statement
                ? foundation.taxStatus.statement
                : foundation.taxStatus.pendingNote}
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
