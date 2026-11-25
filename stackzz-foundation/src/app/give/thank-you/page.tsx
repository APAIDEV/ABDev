import type { Metadata } from "next";
import { foundation } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { RoofMark } from "@/components/ui/Logo";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false },
};

export default function ThankYouPage() {
  return (
    <section className="section">
      <div className="container-text text-center">
        <RoofMark className="mx-auto mb-10 w-28" />
        <p className="eyebrow mb-5">Thank You</p>
        <h1 className="text-5xl sm:text-6xl">Your gift has been received.</h1>
        <p className="mt-7 text-lg text-muted">
          Thank you for supporting Stackzz Foundation. A receipt from Stripe is on its way to your email. Your
          generosity helps carry Amanpreet&apos;s legacy forward through service to others.
        </p>
        <p className="mt-10 font-serif text-2xl text-rose-deep italic">{foundation.tagline}</p>
        <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Return Home</ButtonLink>
          <ButtonLink href="/events" variant="outline">
            Upcoming Events
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
