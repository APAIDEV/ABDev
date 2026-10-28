import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { safeNext } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";

/**
 * Landing point for links in Supabase emails (team invitations and password
 * resets). Verifies the one-time token, signs the user in, then forwards them.
 * See README → "Supabase email templates" for the link format.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const tokenHash = url.searchParams.get("token_hash");
  const type = url.searchParams.get("type") as EmailOtpType | null;
  const code = url.searchParams.get("code");
  const fallback = type === "invite" || type === "recovery" ? "/reset-password" : "/dashboard";
  const next = safeNext(url.searchParams.get("next"), fallback);
  const fail = NextResponse.redirect(new URL("/login?error=link", url.origin));

  if (!isSupabaseConfigured) return fail;
  const supabase = await createClient();

  if (tokenHash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) return NextResponse.redirect(new URL(next, url.origin));
  } else if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, url.origin));
  }
  return fail;
}
