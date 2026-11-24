"use client";

import { subscribe } from "@/app/actions";
import { SpamGuard, useFormAction } from "./FormParts";

/** Compact mailing list signup used in the footer, Events and Contact pages. */
export function NewsletterForm({ tone = "dark", id = "newsletter" }: { tone?: "dark" | "light"; id?: string }) {
  const { state, pending, formProps } = useFormAction(subscribe);
  const onDark = tone === "dark";

  if (state.status === "success") {
    return (
      <p role="status" className={`font-serif text-xl ${onDark ? "text-ivory" : "text-burgundy"}`}>
        {state.message}
      </p>
    );
  }

  const error = state.errors?.email ?? (state.status === "error" ? state.message : undefined);
  return (
    <form {...formProps} className="relative">
      <SpamGuard />
      <label htmlFor={`${id}-email`} className="sr-only">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Email address"
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          className={
            onDark
              ? "min-w-0 flex-1 border border-ivory/25 bg-transparent px-4 py-3.5 text-ivory placeholder:text-blush/60 focus:border-blush focus:outline-none"
              : "field flex-1"
          }
        />
        <button
          type="submit"
          disabled={pending}
          className={`shrink-0 px-6 py-3.5 text-[0.74rem] font-medium tracking-[0.2em] uppercase transition-colors duration-500 disabled:opacity-70 ${
            onDark ? "bg-ivory text-burgundy hover:bg-blush" : "bg-burgundy text-ivory hover:bg-burgundy-deep"
          }`}
        >
          {pending ? "Joining…" : "Stay Connected"}
        </button>
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className={`mt-2 text-sm ${onDark ? "text-blush" : "text-rose-deep"}`}>
          {error}
        </p>
      )}
    </form>
  );
}
