"use client";

import { registerForEvent } from "@/app/actions";
import { Checkbox, Field, FormMessage, SpamGuard, SubmitButton, SuccessPanel, a11y, useFormAction } from "./FormParts";

export function RegistrationForm({ slug, note }: { slug: string; note?: string }) {
  const { state, pending, formProps } = useFormAction(registerForEvent.bind(null, slug));
  if (state.status === "success") {
    return (
      <SuccessPanel title="You are registered." message={state.message}>
        {note && <p className="mt-5 font-serif text-xl text-rose-deep italic">{note}</p>}
      </SuccessPanel>
    );
  }
  const e = state.errors ?? {};
  return (
    <form {...formProps} className="relative grid gap-6">
      <SpamGuard />
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
        <Field label="Number attending" name="guests" hint="Including yourself." error={e.guests}>
          <input
            id="guests"
            name="guests"
            type="number"
            inputMode="numeric"
            min={1}
            max={30}
            defaultValue={1}
            required
            className="field"
            {...a11y(state, "guests")}
          />
        </Field>
      </div>
      <Field
        label="A note for us"
        name="message"
        optional
        hint="Share who you are walking with or in memory of, if you wish."
        error={e.message}
      >
        <textarea id="message" name="message" rows={3} className="field !min-h-24" {...a11y(state, "message")} />
      </Field>
      <Checkbox name="updates" defaultChecked>
        Send me updates about future events and foundation news.
      </Checkbox>
      <FormMessage state={state} />
      <div>
        <SubmitButton pending={pending}>Register</SubmitButton>
      </div>
    </form>
  );
}
