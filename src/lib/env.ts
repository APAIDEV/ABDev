/**
 * Environment variables. Set these in Vercel (Project → Settings →
 * Environment Variables) and in a local `.env.local` file. See `.env.example`.
 * Anything without NEXT_PUBLIC_ stays on the server and never reaches browsers.
 */

export const publicEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  turnstileSiteKey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "",
};

export const isSupabaseConfigured = Boolean(publicEnv.supabaseUrl && publicEnv.supabaseAnonKey);
