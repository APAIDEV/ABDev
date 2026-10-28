import "server-only";
import { business } from "@/config/business";

/** Server-only secrets. Importing this file from a Client Component fails the build. */
if (process.env.NODE_ENV === "production" && process.env.VERCEL_ENV === "production" && !process.env.RATE_LIMIT_SALT) {
  console.warn("RATE_LIMIT_SALT is not set. Set a long random value in Vercel → Settings → Environment Variables.");
}

export const serverEnv = {
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  resendApiKey: process.env.RESEND_API_KEY ?? "",
  /** Must be an address on a domain verified in Resend, e.g. "AB Development <hello@abdevelopment.ai>". */
  emailFrom: process.env.EMAIL_FROM ?? "AB Development <onboarding@resend.dev>",
  contactToEmail: process.env.CONTACT_TO_EMAIL || business.email,
  turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY ?? "",
  /** Random string used to hash IP addresses for rate limiting (never store raw IPs). */
  hashSalt: process.env.RATE_LIMIT_SALT || "abd-default-salt-change-me",
};
