"use client";

import { useEffect, useState } from "react";
import { buttonClass } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";

type Factor = { id: string; friendly_name?: string | null; status: string };

/** Optional two-factor authentication (authenticator app). Recommended for admins. */
export function MfaSettings() {
  const [factors, setFactors] = useState<Factor[] | null>(null);
  const [enrolling, setEnrolling] = useState<{ id: string; qr: string; secret: string } | null>(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [version, setVersion] = useState(0);
  const load = () => setVersion((v) => v + 1);

  useEffect(() => {
    let active = true;
    createClient()
      .auth.mfa.listFactors()
      .then(({ data }) => {
        if (active) setFactors((data?.all ?? []).filter((f) => f.factor_type === "totp") as Factor[]);
      });
    return () => {
      active = false;
    };
  }, [version]);

  async function start() {
    setError("");
    setMessage("");
    const supabase = createClient();
    // Clean up any unfinished setup first.
    for (const f of factors ?? []) if (f.status !== "verified") await supabase.auth.mfa.unenroll({ factorId: f.id });
    const { data, error } = await supabase.auth.mfa.enroll({
      factorType: "totp",
      friendlyName: `Authenticator ${Date.now()}`,
    });
    if (error || !data) return setError("Could not start setup. Please try again.");
    setEnrolling({ id: data.id, qr: data.totp.qr_code, secret: data.totp.secret });
  }

  async function confirm(e: React.FormEvent) {
    e.preventDefault();
    if (!enrolling) return;
    const { error } = await createClient().auth.mfa.challengeAndVerify({ factorId: enrolling.id, code: code.trim() });
    if (error) return setError("That code didn't work. Try the newest code from your app.");
    setEnrolling(null);
    setCode("");
    setMessage("Two-factor authentication is on. You'll be asked for a code each time you sign in.");
    load();
  }

  async function disable(id: string) {
    if (!window.confirm("Turn off two-factor authentication?")) return;
    const { error } = await createClient().auth.mfa.unenroll({ factorId: id });
    if (error) return setError("Could not turn it off. Sign out and back in, then try again.");
    setMessage("Two-factor authentication is off.");
    load();
  }

  const verified = factors?.filter((f) => f.status === "verified") ?? [];

  return (
    <div className="space-y-6">
      {error && (
        <p role="alert" className="text-sm text-danger">
          {error}
        </p>
      )}
      {message && (
        <p role="status" className="text-sm text-gold">
          {message}
        </p>
      )}
      {factors === null ? (
        <p className="text-sm text-stone">Checking…</p>
      ) : verified.length > 0 ? (
        <div className="flex flex-wrap items-center gap-5">
          <p className="label text-gold">On</p>
          <button
            type="button"
            onClick={() => disable(verified[0].id)}
            className={buttonClass("outline", "px-5! py-3!")}
          >
            Turn Off
          </button>
        </div>
      ) : enrolling ? (
        <form onSubmit={confirm} className="space-y-6">
          <p className="text-sm text-stone">
            Scan this code with an authenticator app (Google Authenticator, 1Password, Authy), then enter the 6-digit
            code.
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element -- data: URI from Supabase */}
          <img
            src={enrolling.qr}
            alt="QR code for your authenticator app"
            width={180}
            height={180}
            className="bg-white p-3"
          />
          <p className="text-xs break-all text-stone">
            Can&apos;t scan? Enter this key: <code className="text-ivory">{enrolling.secret}</code>
          </p>
          <div className="max-w-xs">
            <label htmlFor="mfa-enroll-code" className="label block text-stone">
              6-digit code
            </label>
            <input
              id="mfa-enroll-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              required
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              className="field font-serif text-2xl tracking-[0.4em]"
            />
          </div>
          <button type="submit" className={buttonClass("light")}>
            Confirm
          </button>
        </form>
      ) : (
        <button type="button" onClick={start} className={buttonClass("light")}>
          Set Up Two-Factor
        </button>
      )}
    </div>
  );
}
