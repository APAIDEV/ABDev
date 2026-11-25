"use client";

import { useEffect, useRef, useState } from "react";
import { sendPledge, startDonation } from "@/app/actions";
import { designations, presetAmounts } from "@/config/giving";
import { LockIcon } from "@/components/ui/Icons";
import { Field, FormMessage, SpamGuard, SubmitButton, SuccessPanel, a11y, useFormAction } from "./FormParts";

const tab =
  "flex-1 cursor-pointer px-4 py-3.5 text-center text-[0.74rem] font-medium tracking-[0.2em] uppercase transition-colors duration-300 has-[:checked]:bg-burgundy has-[:checked]:text-ivory has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-rose";

/**
 * Donation form. With Stripe connected (`online`), it opens Stripe's secure
 * checkout. Until then, it records a pledge so the family can follow up.
 */
export function GiveForm({ online }: { online: boolean }) {
  const { state, pending, formProps } = useFormAction(online ? startDonation : sendPledge);
  const [amount, setAmount] = useState<string>("100");
  const [frequency, setFrequency] = useState<"once" | "monthly">("once");
  const designationRef = useRef<HTMLSelectElement>(null);

  // Links such as /give?designation=Education preselect the cause.
  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get("designation");
    const match = designations.find((d) => d === wanted);
    if (match && designationRef.current) designationRef.current.value = match;
  }, []);

  if (state.status === "success") return <SuccessPanel message={state.message} />;
  const e = state.errors ?? {};

  return (
    <form {...formProps} className="relative grid gap-7">
      <SpamGuard />
      <fieldset>
        <legend className="field-label">Frequency</legend>
        <div className="mt-1 flex border border-burgundy/25">
          <label className={tab}>
            <input
              type="radio"
              name="frequency"
              value="once"
              checked={frequency === "once"}
              onChange={() => setFrequency("once")}
              className="sr-only"
            />
            One Time
          </label>
          <label className={tab}>
            <input
              type="radio"
              name="frequency"
              value="monthly"
              checked={frequency === "monthly"}
              onChange={() => setFrequency("monthly")}
              className="sr-only"
            />
            Monthly
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className="field-label">Amount</legend>
        <div className="mt-1 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
          {presetAmounts.map((a) => (
            <label
              key={a}
              className="cursor-pointer border border-line bg-white/50 py-3.5 text-center font-serif text-2xl text-burgundy transition-colors has-[:checked]:border-burgundy has-[:checked]:bg-burgundy has-[:checked]:text-ivory has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-rose"
            >
              <input
                type="radio"
                name="amount"
                value={a}
                checked={amount === String(a)}
                onChange={() => setAmount(String(a))}
                className="sr-only"
              />
              ${a}
            </label>
          ))}
          <label className="cursor-pointer border border-line bg-white/50 py-3.5 text-center text-[0.72rem] leading-[2.1rem] font-medium tracking-[0.18em] text-burgundy uppercase transition-colors has-[:checked]:border-burgundy has-[:checked]:bg-burgundy has-[:checked]:text-ivory has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-rose">
            <input
              type="radio"
              name="amount"
              value="other"
              checked={amount === "other"}
              onChange={() => setAmount("other")}
              className="sr-only"
            />
            Other
          </label>
        </div>
        {amount === "other" && (
          <div className="mt-4 max-w-xs">
            <label htmlFor="customAmount" className="sr-only">
              Amount in US dollars
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted">$</span>
              <input
                id="customAmount"
                name="customAmount"
                inputMode="decimal"
                placeholder="Amount"
                required
                autoFocus
                className="field !pl-8"
                {...a11y(state, "customAmount")}
              />
            </div>
          </div>
        )}
        {(e.customAmount || e.amount) && (
          <p id="customAmount-error" role="alert" className="mt-2 text-sm text-rose-deep">
            {e.customAmount || e.amount}
          </p>
        )}
      </fieldset>

      <Field label="Direct my gift to" name="designation" error={e.designation}>
        <select
          ref={designationRef}
          id="designation"
          name="designation"
          defaultValue={designations[0]}
          className="field"
        >
          {designations.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>
      </Field>

      <Field label="In honor or memory of" name="tribute" optional error={e.tribute}>
        <input
          id="tribute"
          name="tribute"
          className="field"
          placeholder="A name, if you wish"
          {...a11y(state, "tribute")}
        />
      </Field>

      {!online && (
        <div className="grid gap-6 sm:grid-cols-2">
          <Field label="Your name" name="name" error={e.name}>
            <input id="name" name="name" required autoComplete="name" className="field" {...a11y(state, "name")} />
          </Field>
          <Field label="Email" name="email" error={e.email}>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="field"
              {...a11y(state, "email")}
            />
          </Field>
        </div>
      )}

      <FormMessage state={state} />

      <div className="grid gap-4">
        <SubmitButton pending={pending} pendingText={online ? "Opening secure checkout…" : "Sending…"}>
          {online ? (
            <>
              <LockIcon /> Continue to Secure Checkout
            </>
          ) : (
            "Pledge My Support"
          )}
        </SubmitButton>
        <p className="text-sm text-muted">
          {online
            ? "You will complete your gift on Stripe's secure checkout page. Your card details are never seen or stored by this website. To change or cancel a monthly gift at any time, simply contact us."
            : "Online giving is being set up. Share your pledge and we will reach out personally as soon as it is ready so you can complete your gift."}
        </p>
      </div>
    </form>
  );
}
