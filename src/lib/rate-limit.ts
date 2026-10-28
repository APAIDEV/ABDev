import "server-only";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";

const memory = new Map<string, { count: number; start: number }>();

/**
 * Fixed-window rate limiter. Uses the database (shared across all server
 * instances) when Supabase is configured; otherwise an in-memory fallback
 * suitable for local development.
 *
 * Returns true when the request is allowed.
 */
export async function rateLimit(key: string, limit: number, windowSeconds: number): Promise<boolean> {
  if (isAdminConfigured()) {
    const { data, error } = await createAdminClient().rpc("check_rate_limit", {
      p_key: key,
      p_limit: limit,
      p_window_seconds: windowSeconds,
    });
    if (!error) return data === true;
    console.error("rate limit check failed, using in-memory fallback:", error.message);
  }

  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || now - entry.start > windowSeconds * 1000) {
    memory.set(key, { count: 1, start: now });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}
