"use client";

import { startTransition, useActionState, useEffect, useRef, type FormEvent, type ReactNode } from "react";
import { initialFormState, type FormState } from "@/lib/forms";

/**
 * Wires a form to a server action. Submitting through onSubmit (rather than
 * letting React reset the form) keeps what the visitor typed if there is an
 * error. The plain `action` still works before the page has fully loaded.
 */
export function useFormAction(fn: (state: FormState, fd: FormData) => Promise<FormState>) {
  const [state, action, pending] = useActionState(fn, initialFormState);
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    startTransition(() => action(fd));
  };
  return { state, pending, formProps: { action, onSubmit } };
}

/** Hidden spam traps: a honeypot field and the time the form was opened. */
export function SpamGuard() {
  const started = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (started.current) started.current.value = String(Date.now());
  }, []);
  return (
    <>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Leave this empty
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input ref={started} type="hidden" name="started" defaultValue="" />
    </>
  );
}

export function Field({
  label,
  name,
  error,
  optional,
  hint,
  children,
  className = "",
}: {
  label: string;
  name: string;
  error?: string;
  optional?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="field-label">
        {label}
        {optional && <span className="ml-2 tracking-normal normal-case opacity-70">(optional)</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-2 text-sm text-muted">{hint}</p>}
      {error && (
        <p id={`${name}-error`} className="mt-2 text-sm text-rose-deep" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

/** Props that connect an input to its error message for screen readers. */
export function a11y(state: FormState, name: string) {
  const error = state.errors?.[name];
  return error ? { "aria-invalid": true as const, "aria-describedby": `${name}-error` } : {};
}

export function FormMessage({ state }: { state: FormState }) {
  if (state.status !== "error" || !state.message) return null;
  return (
    <p role="alert" className="border-l-2 border-rose-deep bg-blush/30 px-4 py-3 text-sm text-ink">
      {state.message}
    </p>
  );
}

export function SuccessPanel({
  title = "Thank you.",
  message,
  children,
}: {
  title?: string;
  message?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  return (
    <div
      ref={ref}
      tabIndex={-1}
      role="status"
      className="border border-blush bg-white/60 px-7 py-10 text-center outline-none sm:px-10"
    >
      <p className="font-serif text-3xl text-burgundy">{title}</p>
      {message && <p className="mx-auto mt-4 max-w-md text-muted">{message}</p>}
      {children}
    </div>
  );
}

export function Checkbox({
  name,
  children,
  defaultChecked,
}: {
  name: string;
  children: ReactNode;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] text-muted">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className="mt-1 size-4 shrink-0 accent-burgundy"
      />
      <span>{children}</span>
    </label>
  );
}

export function SubmitButton({
  pending,
  children,
  pendingText = "Sending…",
}: {
  pending: boolean;
  children: ReactNode;
  pendingText?: string;
}) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2.5 bg-burgundy px-8 py-4 text-[0.78rem] font-medium tracking-[0.2em] text-ivory uppercase transition-colors duration-500 hover:bg-burgundy-deep disabled:cursor-wait disabled:opacity-70 sm:w-auto"
    >
      {pending ? pendingText : children}
    </button>
  );
}
