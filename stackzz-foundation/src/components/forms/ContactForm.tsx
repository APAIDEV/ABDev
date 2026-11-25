"use client";

import { sendContact } from "@/app/actions";
import { contactTopics } from "@/config/giving";
import { Checkbox, Field, FormMessage, SpamGuard, SubmitButton, SuccessPanel, a11y, useFormAction } from "./FormParts";

export function ContactForm() {
  const { state, pending, formProps } = useFormAction(sendContact);
  if (state.status === "success") return <SuccessPanel message={state.message} />;
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
      </div>
      <Field label="Topic" name="topic" error={e.topic}>
        <select id="topic" name="topic" required defaultValue="" className="field" {...a11y(state, "topic")}>
          <option value="" disabled>
            Choose a topic
          </option>
          {contactTopics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </Field>
      <Field label="Message" name="message" error={e.message}>
        <textarea id="message" name="message" required rows={6} className="field" {...a11y(state, "message")} />
      </Field>
      <Checkbox name="updates">Send me occasional updates about upcoming events and foundation news.</Checkbox>
      <FormMessage state={state} />
      <div>
        <SubmitButton pending={pending}>Send Message</SubmitButton>
      </div>
    </form>
  );
}
