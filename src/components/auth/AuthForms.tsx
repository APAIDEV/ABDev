"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login, requestPasswordReset, updatePassword, type AuthState } from "@/app/(auth)/actions";
import { buttonClass } from "@/components/ui/Button";
import { PASSWORD_MIN } from "@/lib/password";
import { useLocationSearch } from "@/lib/use-location-search";

const errorMessages: Record<string, string> = {
  link: "That link is invalid or has expired. Please request a new one.",
  setup: "Team login isn't set up yet. See the README section “Logins & staff accounts”.",
};

function Notice({ state }: { state: AuthState }) {
  if (state.error)
    return (
      <p role="alert" className="border border-danger/50 bg-danger/10 px-4 py-3 text-sm text-ivory">
        {state.error}
      </p>
    );
  if (state.message)
    return (
      <p role="status" className="border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ivory">
        {state.message}
      </p>
    );
  return null;
}

export function LoginForm() {
  const [state, action, pending] = useActionState(login, {});
  const query = useLocationSearch();
  const urlError = query?.get("error");
  const initialNotice: AuthState = urlError
    ? { error: errorMessages[urlError] ?? errorMessages.link }
    : query?.get("signedout")
      ? { message: "You have been signed out." }
      : {};

  return (
    <form action={action} className="space-y-8">
      <Notice state={state.error || state.message ? state : initialNotice} />
      <input type="hidden" name="next" value={query?.get("next") ?? ""} readOnly />
      <div>
        <label htmlFor="login-email" className="label block text-stone">
          Email
        </label>
        <input id="login-email" name="email" type="email" autoComplete="username" required className="field" />
      </div>
      <div>
        <div className="flex items-baseline justify-between">
          <label htmlFor="login-password" className="label block text-stone">
            Password
          </label>
          <Link
            href="/forgot-password"
            className="text-xs text-stone underline-offset-4 hover:text-ivory hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <input
          id="login-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="field"
        />
      </div>
      <button type="submit" disabled={pending} className={buttonClass("light", "w-full")}>
        {pending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  );
}

export function ForgotPasswordForm() {
  const [state, action, pending] = useActionState(requestPasswordReset, {});
  return (
    <form action={action} className="space-y-8">
      <Notice state={state} />
      <div>
        <label htmlFor="forgot-email" className="label block text-stone">
          Email
        </label>
        <input id="forgot-email" name="email" type="email" autoComplete="email" required className="field" />
      </div>
      <button type="submit" disabled={pending} className={buttonClass("light", "w-full")}>
        {pending ? "Sending…" : "Send Reset Link"}
      </button>
      <p className="text-center text-sm">
        <Link href="/login" className="text-stone hover:text-ivory">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}

export function NewPasswordForm({
  stay = false,
  submitLabel = "Save Password",
}: {
  stay?: boolean;
  submitLabel?: string;
}) {
  const [state, action, pending] = useActionState(updatePassword, {});
  return (
    <form action={action} className="space-y-8">
      <Notice state={state} />
      {stay && <input type="hidden" name="stay" value="1" />}
      <div>
        <label htmlFor="new-password" className="label block text-stone">
          New password
        </label>
        <input
          id="new-password"
          name="password"
          type="password"
          autoComplete="new-password"
          minLength={PASSWORD_MIN}
          required
          aria-describedby="new-password-hint"
          className="field"
        />
        <p id="new-password-hint" className="mt-2 text-xs text-stone">
          At least {PASSWORD_MIN} characters, including a letter and a number.
        </p>
      </div>
      <div>
        <label htmlFor="confirm-password" className="label block text-stone">
          Confirm new password
        </label>
        <input
          id="confirm-password"
          name="confirm"
          type="password"
          autoComplete="new-password"
          required
          className="field"
        />
      </div>
      <button type="submit" disabled={pending} className={buttonClass("light", "w-full")}>
        {pending ? "Saving…" : submitLabel}
      </button>
    </form>
  );
}
