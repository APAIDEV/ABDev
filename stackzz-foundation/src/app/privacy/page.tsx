import type { Metadata } from "next";
import { foundation } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Stackzz Foundation handles the information you share through this website.",
};

/**
 * Plain-language privacy notice. Have it reviewed before launch if the
 * foundation collects information beyond what is described here.
 */
export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container-text">
        <p className="eyebrow mb-5">Privacy</p>
        <h1 className="text-5xl sm:text-6xl">Your information, handled with care.</h1>
        <div className="prose-foundation mt-10 text-lg text-muted [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:text-3xl">
          <p>
            This notice explains what {foundation.name} collects through this website and how it is used. We keep it
            simple: we only ask for what we need, and we never sell or rent your information.
          </p>
          <h2>What we collect</h2>
          <p>
            When you send a message, register for an event, offer to volunteer, share a memory, make a pledge, or join
            our mailing list, we receive the details you enter in that form, such as your name, email address, and
            message. Photos you choose to attach to a memory are sent to the family privately.
          </p>
          <h2>How we use it</h2>
          <p>
            We use your information only to respond to you, to organize the events you register for, to follow up on the
            support you offer, and, if you ask us to, to send occasional updates about events and the foundation&apos;s
            work. You can unsubscribe from updates at any time.
          </p>
          <h2>Memories and photos</h2>
          <p>
            Memories and photos are read by the family first. They are only published on this website if you gave
            permission when you shared them, and you can ask us to remove them at any time.
          </p>
          <h2>Donations</h2>
          <p>
            Online gifts are completed on Stripe&apos;s secure checkout. Your card details are handled by Stripe and are
            never seen or stored by this website.
          </p>
          <h2>Services we rely on</h2>
          <p>
            This website is hosted by Vercel. Form submissions are delivered by email through Resend, and payments are
            processed by Stripe. Each handles information under its own privacy and security practices.
          </p>
          <h2>Questions or requests</h2>
          <p>
            To ask what information we hold about you, or to have it corrected or deleted, please reach out through our
            contact page{foundation.email ? ` or at ${foundation.email}` : ""}.
          </p>
        </div>
      </div>
    </section>
  );
}
