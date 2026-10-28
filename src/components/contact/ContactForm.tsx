"use client";

import Link from "next/link";
import { startTransition, useActionState, useEffect, useRef, useState } from "react";
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
import { projectTypeOptions } from "@/config/services";
import type { ContactState } from "@/lib/contact-schema";
import { buttonClass } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { useLocationSearch } from "@/lib/use-location-search";
import { describedBy, Field } from "./Field";
import { Turnstile } from "./Turnstile";

const initial: ContactState = { status: "idle" };

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
      <div className="border border-gold/40 p-10 text-center lg:p-16" role="status">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold">
          <CheckIcon size={24} />
        </span>
        <h3 ref={successRef} tabIndex={-1} className="mt-8 text-4xl outline-none">
          Thank you{state.firstName ? `, ${state.firstName}` : ""}.
        </h3>
        <p className="mx-auto mt-5 max-w-md text-stone">
          Your message has been received. We&apos;ll be in touch shortly to talk through your vision. A confirmation is
          on its way to your inbox.
        </p>
        <p className="mt-8 text-sm text-stone">
          Need us sooner? Call{" "}
          <a href={`tel:${business.phone.tel}`} className="text-ivory underline underline-offset-4">
            {business.phone.display}
          </a>
          , available 24/7.
        </p>
      </div>
    );
  }

  const err = state.status === "error" ? (state.fieldErrors ?? {}) : {};
  const v = state.status === "error" ? (state.values ?? {}) : {};
  const textField = (name: string) => ({
    id: `contact-${name}`,
    name,
    "aria-invalid": err[name] ? true : undefined,
    "aria-describedby": describedBy(`contact-${name}`, err[name]),
  });

  return (
    <form
      action={formAction}
      onSubmit={(e) => {
        // Submit without React's automatic form reset so entries survive validation errors.
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        startTransition(() => formAction(data));
      }}
      className="space-y-10"
      aria-describedby="contact-required-note"
    >
      {state.status === "error" && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="border border-danger/50 bg-danger/10 px-5 py-4 text-sm text-ivory outline-none"
        >
          {state.message}
        </div>
      )}
      <p id="contact-required-note" className="text-xs text-stone">
        Fields marked <span className="text-gold">*</span> are required.
      </p>

      {/* Honeypot: hidden from people, tempting to bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company_website">Leave this field empty</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <input ref={startedRef} type="hidden" name="form_started" defaultValue="" />

      <div className="grid gap-10 sm:grid-cols-2">
        <Field id="contact-name" label="Full name" required error={err.name}>
          <input
            {...textField("name")}
            type="text"
            autoComplete="name"
            required
            maxLength={120}
            defaultValue={v.name}
            className="field"
          />
        </Field>
        <Field id="contact-email" label="Email" required error={err.email}>
          <input
            {...textField("email")}
            type="email"
            autoComplete="email"
            required
            maxLength={254}
            defaultValue={v.email}
            className="field"
          />
        </Field>
        <Field id="contact-phone" label="Phone" error={err.phone}>
          <input
            {...textField("phone")}
            type="tel"
            autoComplete="tel"
            maxLength={40}
            defaultValue={v.phone}
            className="field"
          />
        </Field>
        <Field id="contact-projectType" label="Project type" required error={err.projectType}>
          <select
            {...textField("projectType")}
            required
            value={project}
            onChange={(e) => setProject(e.target.value)}
            className="field"
          >
            <option value="" disabled>
              Select a project type
            </option>
            {projectTypeOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field id="contact-region" label="Region" required error={err.region}>
          <select
            {...textField("region")}
            required
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="field"
          >
            <option value="" disabled>
              Where is the property?
            </option>
            {regionOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field id="contact-town" label="Town or neighborhood" error={err.town}>
          <input
            {...textField("town")}
            type="text"
            autoComplete="address-level2"
            maxLength={120}
            defaultValue={v.town}
            className="field"
          />
        </Field>
        {region === "Other" && (
          <p role="status" className="border-l border-gold pl-5 text-sm text-stone sm:col-span-2">
            Thank you for thinking of us. We primarily build on Long Island, in New York City, and in Westchester, but
            we&apos;re happy to review your project and let you know whether we can take it on.
          </p>
        )}
        <Field id="contact-budget" label="Estimated budget" error={err.budget}>
          <select {...textField("budget")} defaultValue={v.budget ?? ""} className="field">
            <option value="">Select a range</option>
            {budgetOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field id="contact-timeline" label="Desired timeline" error={err.timeline}>
          <select {...textField("timeline")} defaultValue={v.timeline ?? ""} className="field">
            <option value="">Select a timeline</option>
            {timelineOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field id="contact-preferredDate" label="Preferred consultation date" error={err.preferredDate}>
          <input
            {...textField("preferredDate")}
            type="date"
            defaultValue={v.preferredDate}
            className="field [color-scheme:dark]"
          />
        </Field>
        <Field id="contact-preferredTime" label="Preferred time of day" error={err.preferredTime}>
          <select {...textField("preferredTime")} defaultValue={v.preferredTime ?? ""} className="field">
            <option value="">Select a time</option>
            {consultationTimeOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field id="contact-referral" label="How did you hear about us?" error={err.referral} className="sm:col-span-2">
          <select {...textField("referral")} defaultValue={v.referral ?? ""} className="field">
            <option value="">Select one</option>
            {referralOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </Field>
        <Field
          id="contact-message"
          label="Tell us about your project"
          required
          error={err.message}
          className="sm:col-span-2"
        >
          <textarea
            {...textField("message")}
            required
            minLength={10}
            maxLength={5000}
            rows={6}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="field"
          />
        </Field>
      </div>

      <fieldset className="space-y-5 border-t border-ivory/10 pt-8">
        <legend className="sr-only">Agreements and communication preferences</legend>
        <Checkbox name="agreeTerms" required error={err.agreeTerms} defaultChecked={v.agreeTerms === "on"}>
          I have read and agree to the{" "}
          <Link href="/legal/privacy" target="_blank" className="text-ivory underline underline-offset-4">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/legal/terms" target="_blank" className="text-ivory underline underline-offset-4">
            Terms of Use
          </Link>
          , and I understand that submitting this form does not create a contract or client relationship.
          <span className="text-gold" aria-hidden="true">
            {" "}
            *
          </span>
          <span className="sr-only"> (required)</span>
        </Checkbox>
        <Checkbox name="marketingEmail" defaultChecked={v.marketingEmail === "on"}>
          {consentText.marketingEmail} <span>(optional)</span>
        </Checkbox>
        <Checkbox name="marketingSms" defaultChecked={v.marketingSms === "on"}>
          {consentText.marketingSms} See our{" "}
          <Link href="/legal/privacy" target="_blank" className="text-ivory underline underline-offset-4">
            Privacy Policy
          </Link>
          . <span>(optional)</span>
        </Checkbox>
      </fieldset>

      <Turnstile />

      <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className={buttonClass("gold", "min-w-56")}>
          {pending ? "Sending…" : "Send Request"}
        </button>
        <p className="text-xs text-stone">We usually respond within one business day.</p>
      </div>
    </form>
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
  children: React.ReactNode;
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
          className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-gold)]"
        />
        <label htmlFor={id} className="text-sm leading-relaxed text-stone">
          {children}
        </label>
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 pl-8 text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  );
}
