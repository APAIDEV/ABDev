import "server-only";
import { headers } from "next/headers";

/**
 * Light protection against repeated automated submissions. It counts requests
 * per network address within each server instance. Combined with the hidden
 * honeypot field and the timing check, this stops most spam.
 */
const hits = new Map<string, number[]>();

export async function isRateLimited(bucket: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "").split(",")[0].trim() || h.get("x-real-ip") || "unknown";
  const key = `${bucket}:${ip}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t > windowMs)) hits.delete(k);
  }
  return recent.length > limit;
}

/** True when the hidden honeypot was filled in or the form was sent impossibly fast. */
export function looksAutomated(formData: FormData) {
  if (String(formData.get("website") ?? "").trim() !== "") return true;
  const started = Number(formData.get("started") ?? 0);
  if (started && Date.now() - started < 2500) return true;
  return false;
}
