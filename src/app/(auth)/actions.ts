"use server";

import { redirect } from "next/navigation";
import { siteUrl } from "@/config/site";
import { getUserId, safeNext } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/env";
import { passwordProblem } from "@/lib/password";
import { rateLimit } from "@/lib/rate-limit";
import { hashValue, requestMeta } from "@/lib/request";
import { createClient } from "@/lib/supabase/server";

export type AuthState = { error?: string; message?: string };

const NOT_SET_UP = "Team login isn't set up yet. See the README section “Logins & staff accounts”.";

export async function login(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured) return { error: NOT_SET_UP };
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 254);
  const password = String(formData.get("password") ?? "").slice(0, 128);
  const next = safeNext(String(formData.get("next") ?? ""));
  if (!email || !password) return { error: "Please enter your email and password." };

  const { ipHash } = await requestMeta();
  const allowed =
    (await rateLimit(`login-ip:${ipHash}`, 10, 900)) && (await rateLimit(`login-email:${hashValue(email)}`, 5, 900));
  if (!allowed) return { error: "Too many sign-in attempts. Please wait 15 minutes and try again." };

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: "That email and password combination is incorrect." };

  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  if (aal?.nextLevel === "aal2" && aal.currentLevel !== "aal2") {
    redirect(`/login/mfa?next=${encodeURIComponent(next)}`);
  }
  redirect(next);
}

export async function requestPasswordReset(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured) return { error: NOT_SET_UP };
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase()
    .slice(0, 254);
  const generic = {
    message: "If that email belongs to a team account, a reset link is on its way. Check your inbox (and spam folder).",
  };
  if (!email.includes("@")) return { error: "Please enter a valid email address." };

  const { ipHash } = await requestMeta();
  const allowed =
    (await rateLimit(`reset-ip:${ipHash}`, 5, 3600)) && (await rateLimit(`reset-email:${hashValue(email)}`, 3, 3600));
  if (!allowed) return generic;

  const supabase = await createClient();
  await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/auth/confirm?next=/reset-password`,
  });
  return generic;
}

export async function updatePassword(_prev: AuthState, formData: FormData): Promise<AuthState> {
  if (!isSupabaseConfigured) return { error: NOT_SET_UP };
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");
  const problem = passwordProblem(password, confirm);
  if (problem) return { error: problem };

  if (!(await getUserId())) {
    return { error: "Your link has expired. Please request a new password reset link." };
  }
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return {
      error:
        error.code === "same_password"
          ? "Please choose a password different from your current one."
          : "We couldn't update your password. Please request a new link and try again.",
    };
  }
  if (formData.get("stay") === "1") return { message: "Your password has been updated." };
  redirect("/dashboard");
}

export async function signOut() {
  if (isSupabaseConfigured) {
    const supabase = await createClient();
    await supabase.auth.signOut();
  }
  redirect("/login?signedout=1");
}
