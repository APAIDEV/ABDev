"use client";

import { shareMemory } from "@/app/actions";
import { Field, FormMessage, SpamGuard, SubmitButton, SuccessPanel, a11y, useFormAction } from "./FormParts";

export function MemoryForm() {
  const { state, pending, formProps } = useFormAction(shareMemory);
  if (state.status === "success") return <SuccessPanel message={state.message} />;
  const e = state.errors ?? {};
  return (
    <form {...formProps} className="relative grid gap-6" encType="multipart/form-data">
      <SpamGuard />
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Your name" name="name" error={e.name}>
          <input id="name" name="name" required autoComplete="name" className="field" {...a11y(state, "name")} />
        </Field>
        <Field label="Email" name="email" hint="Never published." error={e.email}>
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
      <Field label="How you knew Amanpreet" name="relationship" optional error={e.relationship}>
        <input
          id="relationship"
          name="relationship"
          placeholder="Friend, family, colleague, client…"
          className="field"
          {...a11y(state, "relationship")}
        />
      </Field>
      <Field label="Your memory or story" name="memory" error={e.memory}>
        <textarea id="memory" name="memory" required rows={7} className="field" {...a11y(state, "memory")} />
      </Field>
      <Field label="Photos" name="photos" optional hint="Up to 4 original photos, 4 MB in total." error={e.photos}>
        <input
          id="photos"
          name="photos"
          type="file"
          accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
          multiple
          className="block w-full text-sm text-muted file:mr-4 file:cursor-pointer file:border-0 file:bg-blush/60 file:px-5 file:py-3 file:text-[0.72rem] file:font-medium file:tracking-[0.18em] file:text-burgundy file:uppercase hover:file:bg-blush"
          {...a11y(state, "photos")}
        />
      </Field>
      <fieldset>
        <legend className="field-label">May we share it?</legend>
        <div className="mt-1 grid gap-3">
          <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] text-muted">
            <input
              type="radio"
              name="sharing"
              value="share"
              required
              defaultChecked
              className="mt-1 size-4 accent-burgundy"
            />
            Yes, the family may share my memory and photos on this website.
          </label>
          <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] text-muted">
            <input type="radio" name="sharing" value="private" className="mt-1 size-4 accent-burgundy" />
            Please keep it private, for the family only.
          </label>
        </div>
        {e.sharing && <p className="mt-2 text-sm text-rose-deep">{e.sharing}</p>}
      </fieldset>
      <FormMessage state={state} />
      <div>
        <SubmitButton pending={pending}>Share Memory</SubmitButton>
      </div>
    </form>
  );
}
