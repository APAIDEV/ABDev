/**
 * Cookie consent storage (client side). The visitor's choice is stored in a
 * first-party cookie, `abd_consent`, for 12 months. Google Analytics only
 * loads when `analytics` is true.
 */

export type Consent = { v: 1; analytics: boolean; ts: string };

export const CONSENT_COOKIE = "abd_consent";
const MAX_AGE = 60 * 60 * 24 * 365;
const EVENT = "abd:consent-change";
export const OPEN_SETTINGS_EVENT = "abd:open-cookie-settings";

let cached: { raw: string | undefined; value: Consent | null } = { raw: undefined, value: null };

export function readConsent(): Consent | null {
  if (typeof document === "undefined") return null;
  const raw = document.cookie
    .split("; ")
    .find((c) => c.startsWith(`${CONSENT_COOKIE}=`))
    ?.slice(CONSENT_COOKIE.length + 1);
  if (raw === cached.raw) return cached.value;
  let value: Consent | null = null;
  try {
    const parsed = raw ? JSON.parse(decodeURIComponent(raw)) : null;
    if (parsed && parsed.v === 1 && typeof parsed.analytics === "boolean") value = parsed;
  } catch {
    value = null;
  }
  cached = { raw, value };
  return value;
}

export function writeConsent(analytics: boolean) {
  const value: Consent = { v: 1, analytics, ts: new Date().toISOString() };
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify(value))}; Max-Age=${MAX_AGE}; Path=/; SameSite=Lax${secure}`;
  if (!analytics) clearAnalyticsCookies();
  window.dispatchEvent(new Event(EVENT));
}

export function subscribeConsent(callback: () => void) {
  window.addEventListener(EVENT, callback);
  return () => window.removeEventListener(EVENT, callback);
}

/** Removes Google Analytics cookies after consent is withdrawn. */
function clearAnalyticsCookies() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (gaId) (window as unknown as Record<string, boolean>)[`ga-disable-${gaId}`] = true;
  const host = location.hostname;
  const domains = ["", host, `.${host}`, `.${host.split(".").slice(-2).join(".")}`];
  for (const name of document.cookie.split("; ").map((c) => c.split("=")[0])) {
    if (name === "_ga" || name.startsWith("_ga_") || name === "_gid") {
      for (const d of domains) {
        document.cookie = `${name}=; Max-Age=0; Path=/${d ? `; Domain=${d}` : ""}`;
      }
    }
  }
}
