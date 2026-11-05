"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState, type ReactNode } from "react";
import { submitContact } from "@/app/(site)/contact/actions";
import { business } from "@/config/business";
import {
  budgetOptions,
  consentText,
  consultationTimeOptions,
  referralOptions,
  timelineOptions,
} from "@/config/contactForm";
import { regionOptions } from "@/config/serviceArea";
import { projectTypeOptions, projectTypes } from "@/config/services";
import type { ContactState } from "@/lib/contact-schema";
import { signatureFont } from "@/lib/fonts";
import { useLocationSearch } from "@/lib/use-location-search";
import { buttonClass } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Turnstile } from "./Turnstile";

const initial: ContactState = { status: "idle" };

/** How each region reads in the sentence "…on Long Island" / "…in Brooklyn". */
const regionPhrase: Record<string, string> = {
  "Long Island": "on Long Island",
  Brooklyn: "in Brooklyn",
  Queens: "in Queens",
  Manhattan: "in Manhattan",
  Bronx: "in the Bronx",
  "Staten Island": "on Staten Island",
  Westchester: "in Westchester",
  Other: "somewhere else",
};

const SENTENCE_FIELDS: [string, string][] = [
  ["name", "Your name"],
  ["projectType", "Project"],
  ["region", "Where"],
  ["town", "Town"],
  ["message", "Your message"],
  ["email", "Email"],
  ["phone", "Phone"],
];

/**
 * The contact form, written as a short personal note to the owner.
 * Every blank has a proper (visually hidden) label for screen readers.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initial);
  const restored = state.status === "error" ? (state.values ?? {}) : {};
  const [region, setRegion] = useState(restored.region ?? "");
  // `null` means "not touched yet", so a pre-filled value from the link can show through.
  const [projectInput, setProject] = useState<string | null>(restored.projectType ?? null);
  const [messageInput, setMessage] = useState<string | null>(restored.message ?? null);
  const startedRef = useRef<HTMLInputElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const owner = business.owner.firstName;

  // Pre-fill from links such as /contact?project=Dormer or ?home=The%20Linden
  const query = useLocationSearch();
  const linkedProject = query?.get("project") ?? "";
  const linkedHome = query?.get("home")?.slice(0, 100);
  const project =
    projectInput ?? ((projectTypeOptions as readonly string[]).includes(linkedProject) ? linkedProject : "");
  const message = messageInput ?? (linkedHome ? `I'm interested in ${linkedHome}. ` : "");

  useEffect(() => {
    if (startedRef.current) startedRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "error") errorRef.current?.focus();
  }, [state]);

  if (state.status === "success") {
    return (
      <div role="status" className="py-10 text-center">
        <h3 ref={successRef} tabIndex={-1} className="text-[clamp(2.5rem,5vw,4rem)] outline-none">
          Thank you{state.firstName ? `, ${state.firstName}` : ""}.
        </h3>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-taupe">
          Your note is on its way to me, and a copy is headed to your inbox. I&apos;ll be in touch personally soon.
        </p>
        <p className={`${signatureFont.className} mt-8 text-5xl text-black`} aria-hidden="true">
          {owner}
        </p>
        <p className="mt-10 text-sm text-taupe">
          Rather talk now? Call{" "}
          <a href={`tel:${business.phone.tel}`} className="text-black underline underline-offset-4">
            {business.phone.display}
          </a>{" "}
          any time.
        </p>
      </div>
    );
  }

  const err = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const v = restored;
  const field = (name: string) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": err[name] ? true : undefined,
    "aria-describedby": err[name] ? `contact-${name}-error` : undefined,
  });
  const sentenceErrors = SENTENCE_FIELDS.filter(([name]) => err[name]);

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        // Submit without React's automatic form reset so entries survive validation errors.
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => formAction(data));
      }}
    >
      {state.status === "error" && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="mb-10 border-l-2 border-danger-deep bg-danger-deep/5 px-5 py-4 text-base text-black outline-none"
        >
          {state.message}
        </div>
      )}

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedRef} type="hidden" name="form_started" defaultValue="" />

      <div className="font-serif text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[2] font-light text-black">
        <p>Hi {owner},</p>
        <p className="mt-2">
          My name is <SrLabel htmlFor="contact-name">Your full name (required)</SrLabel>
          <input
            {...field("name")}
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            defaultValue={v.name}
            placeholder="your name"
            className="field-inline min-w-[9ch]"
          />
          , and I&apos;m thinking about <SrLabel htmlFor="contact-projectType">Type of project (required)</SrLabel>
          <select
            {...field("projectType")}
            required
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="field-inline"
          >
            <option value="" disabled>
              a type of project
            </option>
            {projectTypes.map((o) => (
              <option key={o.value} value={o.value}>
                {o.phrase}
              </option>
            ))}
          </select>{" "}
          <SrLabel htmlFor="contact-region">Where the property is (required)</SrLabel>
          <select
            {...field("region")}
            required
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="field-inline"
          >
            <option value="" disabled>
              somewhere
            </option>
            {regionOptions.map((o) => (
              <option key={o} value={o}>
                {regionPhrase[o] ?? o}
              </option>
            ))}
          </select>
          , near <SrLabel htmlFor="contact-town">Town or neighborhood (optional)</SrLabel>
          <input
            {...field("town")}
            type="text"
            autoComplete="address-level2"
            maxLength={120}
            defaultValue={v.town}
            placeholder="town (optional)"
            className="field-inline min-w-[8ch]"
          />
          .
        </p>
      </div>

      {region === "Other" && (
        <p role="status" className="mt-4 max-w-xl border-l border-gold-deep pl-5 text-base text-taupe">
          Thank you for thinking of us. We mainly build on Long Island, in New York City, and in Westchester, but
          I&apos;m happy to look at your project and let you know if we can take it on.
        </p>
      )}

      <div className="mt-8">
        <label
          htmlFor="contact-message"
          className="font-serif text-[clamp(1.5rem,2.6vw,2.125rem)] font-light text-black"
        >
          Here&apos;s what I have in mind:
        </label>
        <textarea
          {...field("message")}
          required
          minLength={10}
          maxLength={5000}
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="The home, the property, the timing, anything that matters to you…"
          className="lined-paper mt-2 block w-full resize-y bg-transparent text-lg text-black placeholder:text-taupe placeholder:italic focus:outline-none"
        />
      </div>

      <p className="mt-8 font-serif text-[clamp(1.5rem,2.6vw,2.125rem)] leading-[2] font-light text-black">
        You can reach me at <SrLabel htmlFor="contact-email">Email (required)</SrLabel>
        <input
          {...field("email")}
          type="email"
          autoComplete="email"
          required
          maxLength={254}
          defaultValue={v.email}
          placeholder="email"
          className="field-inline min-w-[10ch]"
        />{" "}
        or <SrLabel htmlFor="contact-phone">Phone (optional)</SrLabel>
        <input
          {...field("phone")}
          type="tel"
          autoComplete="tel"
          maxLength={40}
          defaultValue={v.phone}
          placeholder="phone (optional)"
          className="field-inline min-w-[10ch]"
        />
        .
      </p>

      {sentenceErrors.length > 0 && (
        <ul className="mt-6 space-y-1 text-sm text-danger-deep">
          {sentenceErrors.map(([name, label]) => (
            <li key={name} id={`contact-${name}-error`}>
              {label}: {err[name]}
            </li>
          ))}
        </ul>
      )}

      <details
        className="group mt-12 border-y border-black/15"
        open={Boolean(v.budget || v.timeline || v.preferredDate)}
      >
        <summary className="label flex cursor-pointer list-none items-center justify-between py-5 text-black [&::-webkit-details-marker]:hidden">
          A few optional details
          <span aria-hidden="true" className="text-lg transition-transform duration-300 group-open:rotate-45">
            +
          </span>
        </summary>
        <div className="grid gap-8 pt-2 pb-8 sm:grid-cols-2">
          <DetailSelect
            name="budget"
            label="Estimated budget"
            options={budgetOptions}
            value={v.budget}
            error={err.budget}
          />
          <DetailSelect
            name="timeline"
            label="Ideal timeline"
            options={timelineOptions}
            value={v.timeline}
            error={err.timeline}
          />
          <div>
            <label htmlFor="contact-preferredDate" className="label block text-taupe">
              Preferred day to meet
            </label>
            <input
              {...field("preferredDate")}
              type="date"
              defaultValue={v.preferredDate}
              className="field text-black [color-scheme:light]"
            />
            {err.preferredDate && (
              <p id="contact-preferredDate-error" className="mt-2 text-sm text-danger-deep">
                {err.preferredDate}
              </p>
            )}
          </div>
          <DetailSelect
            name="preferredTime"
            label="Best time of day"
            options={consultationTimeOptions}
            value={v.preferredTime}
            error={err.preferredTime}
          />
          <DetailSelect
            name="referral"
            label="How did you hear about us?"
            options={referralOptions}
            value={v.referral}
            error={err.referral}
            className="sm:col-span-2"
          />
        </div>
      </details>

      <fieldset className="mt-10 space-y-5">
        <legend className="sr-only">Agreements and communication preferences</legend>
        <Checkbox name="agreeTerms" required error={err.agreeTerms} defaultChecked={v.agreeTerms === "on"}>
          I have read and agree to the{" "}
          <Link href="/legal/privacy" target="_blank" className="text-black underline underline-offset-4">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/legal/terms" target="_blank" className="text-black underline underline-offset-4">
            Terms of Use
          </Link>
          , and I understand that submitting this form does not create a contract or client relationship.
          <span className="sr-only"> (required)</span>
        </Checkbox>
        <Checkbox name="marketingEmail" defaultChecked={v.marketingEmail === "on"}>
          {consentText.marketingEmail} <span>(optional)</span>
        </Checkbox>
        <Checkbox name="marketingSms" defaultChecked={v.marketingSms === "on"}>
          {consentText.marketingSms} See our{" "}
          <Link href="/legal/privacy" target="_blank" className="text-black underline underline-offset-4">
            Privacy Policy
          </Link>
          . <span>(optional)</span>
        </Checkbox>
      </fieldset>

      <Turnstile />

      <div className="mt-12">
        <button type="submit" disabled={pending} className={buttonClass("dark", "group min-w-60")}>
          {pending ? "Sending…" : `Send to ${owner}`}
          {!pending && (
            <ArrowRightIcon size={16} className="transition-transform duration-500 group-hover:translate-x-1" />
          )}
        </button>
      </div>
    </form>
  );
}

function SrLabel({ htmlFor, children }: { htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="sr-only">
      {children}
    </label>
  );
}

function DetailSelect({
  name,
  label,
  options,
  value,
  error,
  className = "",
}: {
  name: string;
  label: string;
  options: readonly string[];
  value?: string;
  error?: string;
  className?: string;
}) {
  const id = `contact-${name}`;
  return (
    <div className={className}>
      <label htmlFor={id} className="label block text-taupe">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={value ?? ""}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className="field text-black"
      >
        <option value="">Select one</option>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-danger-deep">
          {error}
        </p>
      )}
    </div>
  );
}

function Checkbox({
  name,
  required,
  error,
  defaultChecked,
  children,
}: {
  name: string;
  required?: boolean;
  error?: string;
  defaultChecked?: boolean;
  children: ReactNode;
}) {
  const id = `contact-${name}`;
  return (
    <div>
      <div className="flex items-start gap-4">
        <input
          id={id}
          name={name}
          type="checkbox"
          required={required}
          defaultChecked={defaultChecked}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className="mt-1 h-4 w-4 shrink-0 accent-black"
        />
        <label htmlFor={id} className="text-sm leading-relaxed text-taupe">
          {children}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 pl-8 text-sm text-danger-deep">
          {error}
        </p>
      )}
    </div>
  );
}
