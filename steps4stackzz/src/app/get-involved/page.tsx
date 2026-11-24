import type { Metadata } from "next";
import { involvementTypes } from "@/config/giving";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { InvolvementForm } from "@/components/forms/InvolvementForm";

export const metadata: Metadata = {
  title: "Get Involved",
  description:
    "Volunteer, join a Sewa initiative, or partner with Steps4Stackzz Foundation as an organization or sponsor.",
};

export default function GetInvolvedPage() {
  return (
    <>
      <PageHero
        eyebrow="Get Involved"
        title="Sewa begins with showing up."
        lede={
          <p>
            Whether you can give an afternoon, a skill, or the support of an organization, there is a place for you in
            this work.
          </p>
        }
      />

      <section className="section">
        <div className="container-page">
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {involvementTypes.map((t, i) => (
              <Reveal key={t.id} delay={i * 100} className="flex flex-col bg-ivory p-8 sm:p-9">
                <span className="font-serif text-2xl text-rose">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-4 text-3xl">{t.title}</h2>
                <p className="mt-4 flex-1 text-[0.97rem] text-muted">{t.text}</p>
                <a
                  href={`#${t.id}`}
                  className="mt-6 inline-flex items-center gap-2 text-[0.78rem] font-medium tracking-[0.2em] text-burgundy uppercase hover:text-rose-deep"
                >
                  Start here <span aria-hidden="true">↓</span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="form" className="section relative bg-parchment">
        {/* Links like /get-involved#sponsorship land here and preselect that option in the form. */}
        {involvementTypes.map((t) => (
          <span key={t.id} id={t.id} aria-hidden="true" className="absolute top-0" />
        ))}
        <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <p className="eyebrow mb-5">Join Us</p>
            <h2 className="text-4xl sm:text-5xl">Tell us how you would like to serve.</h2>
            <p className="mt-6 text-lg text-muted">
              Share a little about yourself and we will be in touch personally. There is no commitment until we have
              talked.
            </p>
            <blockquote className="mt-10 border-l-2 border-rose pl-5 font-serif text-2xl leading-snug text-burgundy italic">
              Recognize the privilege of being able to serve others.
            </blockquote>
          </Reveal>
          <Reveal className="lg:col-span-7 lg:col-start-6" delay={120}>
            <div className="border border-blush bg-ivory p-7 sm:p-10">
              <InvolvementForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
