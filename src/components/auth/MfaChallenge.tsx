"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonClass } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

/** Second step of sign-in for team members who turned on two-factor authentication. */
export function MfaChallenge() {
  const router = useRouter();
  const [factorId, setFactorId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const next = () => {
    const n = new URLSearchParams(window.location.search).get("next") ?? "";
    return /^\/(dashboard|portal)(\/|\?|$)/.test(n) ? n : "/dashboard";
  };

  useEffect(() => {
    createClient()
      .auth.mfa.listFactors()
      .then(({ data, error }) => {
        if (error) return router.replace("/login");
        const totp = data?.totp?.[0];
        if (!totp) return router.replace(next());
        setFactorId(totp.id);
      });
  }, [router]);

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    if (!factorId) return;
    setPending(true);
    setError("");
    const { error } = await createClient().auth.mfa.challengeAndVerify({ factorId, code: code.trim() });
    setPending(false);
    if (error) {
      setError("That code didn't work. Check your authenticator app and try again.");
      return;
    }
    router.replace(next());
    router.refresh();
  }

  return (
    <form onSubmit={verify} className="space-y-8">
      {error && (
        <p role="alert" className="border border-danger/50 bg-danger/10 px-4 py-3 text-sm text-ivory">
          {error}
        </p>
      )}
      <div>
        <label htmlFor="mfa-code" className="label block text-stone">
          6-digit code
        </label>
        <input
          id="mfa-code"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="[0-9]{6}"
          maxLength={6}
          required
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
          className="field text-center font-serif text-3xl tracking-[0.5em]"
        />
      </div>
      <button type="submit" disabled={pending || !factorId} className={buttonClass("gold", "w-full")}>
        {pending ? "Verifying…" : "Verify"}
      </button>
    </form>
  );
}
