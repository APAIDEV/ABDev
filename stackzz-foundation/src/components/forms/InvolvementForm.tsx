"use client";

import { useEffect, useState } from "react";
import { sendInvolvement } from "@/app/actions";
import { involvementTypes, serviceAreas, type InvolvementId } from "@/config/giving";
import { Checkbox, Field, FormMessage, SpamGuard, SubmitButton, SuccessPanel, a11y, useFormAction } from "./FormParts";

const ids = involvementTypes.map((t) => t.id) as string[];

export function InvolvementForm() {
  const { state, pending, formProps } = useFormAction(sendInvolvement);
  const [interest, setInterest] = useState<InvolvementId>("volunteer");

  // Links such as /get-involved#sponsorship preselect the matching option.
  useEffect(() => {
    const sync = () => {
      const hash = window.location.hash.replace("#", "");
      if (ids.includes(hash)) setInterest(hash as InvolvementId);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  if (state.status === "success") return <SuccessPanel message={state.message} />;
  const e = state.errors ?? {};
  const isOrg = interest === "partnership" || interest === "sponsorship";

  return (
    <form {...formProps} className="relative grid gap-7">
      <SpamGuard />
      <fieldset>
        <legend className="field-label">I would like to</legend>
        <div className="mt-1 grid gap-3 sm:grid-cols-2">
          {involvementTypes.map((t) => (
            <label
              key={t.id}
              className="flex cursor-pointer items-center gap-3 border border-line bg-white/50 px-4 py-3.5 transition-colors has-[:checked]:border-burgundy has-[:checked]:bg-blush/25 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-rose"
            >
              <input
                type="radio"
                name="interest"
                value={t.id}
                checked={interest === t.id}
                onChange={() => setInterest(t.id)}
                className="size-4 accent-burgundy"
              />
              <span className="font-serif text-xl text-burgundy">{t.title}</span>
            </label>
          ))}
        </div>
        {e.interest && <p className="mt-2 text-sm text-rose-deep">{e.interest}</p>}
      </fieldset>

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
        <Field label="Phone" name="phone" optional error={e.phone}>
          <input id="phone" name="phone" type="tel" autoComplete="tel" className="field" {...a11y(state, "phone")} />
        </Field>
        <Field
          label={isOrg ? "Organization or business" : "Organization"}
          name="organization"
          optional={!isOrg}
          error={e.organization}
        >
          <input
            id="organization"
            name="organization"
            autoComplete="organization"
            required={isOrg}
            className="field"
            {...a11y(state, "organization")}
          />
        </Field>
      </div>

      {!isOrg && (
        <>
          <fieldset>
            <legend className="field-label">Areas you would like to serve in</legend>
            <div className="mt-1 flex flex-wrap gap-x-7 gap-y-3">
              {serviceAreas.map((a) => (
                <label key={a} className="flex cursor-pointer items-center gap-2.5 text-[0.95rem]">
                  <input type="checkbox" name="areas" value={a} className="size-4 accent-burgundy" />
                  {a}
                </label>
              ))}
            </div>
          </fieldset>
          <Field
            label="Availability"
            name="availability"
            optional
            hint="Weekdays, weekends, evenings, or specific dates."
            error={e.availability}
          >
            <input id="availability" name="availability" className="field" {...a11y(state, "availability")} />
          </Field>
        </>
      )}

      <Field
        label={isOrg ? "Tell us what you have in mind" : "Anything you would like us to know"}
        name="message"
        optional={!isOrg}
        error={e.message}
      >
        <textarea id="message" name="message" rows={5} required={isOrg} className="field" {...a11y(state, "message")} />
      </Field>
      <Checkbox name="updates" defaultChecked>
        Keep me informed about upcoming events and service opportunities.
      </Checkbox>
      <FormMessage state={state} />
      <div>
        <SubmitButton pending={pending}>Send</SubmitButton>
      </div>
    </form>
  );
}
