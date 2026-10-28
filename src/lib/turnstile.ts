import "server-only";
import { serverEnv } from "@/lib/server-env";

/** Verifies a Cloudflare Turnstile token. Always passes when Turnstile is not configured. */
export async function verifyTurnstile(token: string | null, ip: string) {
  if (!serverEnv.turnstileSecretKey) return true;
  if (!token) return false;
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret: serverEnv.turnstileSecretKey, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}
