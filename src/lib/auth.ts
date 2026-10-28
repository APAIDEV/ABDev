import "server-only";
import { redirect } from "next/navigation";
import { cache } from "react";
import { isSupabaseConfigured } from "@/lib/env";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

/**
 * DATA ACCESS LAYER for authentication.
 * Every dashboard page, Server Action, and Route Handler calls one of these
 * functions on the server. Hiding a button is never the only protection.
 */

export type TeamMember = Pick<Profile, "id" | "email" | "full_name" | "title" | "role">;

/** The signed-in user's verified id, or null. */
export const getUserId = cache(async (): Promise<string | null> => {
  if (!isSupabaseConfigured) return null;
  const supabase = await createClient();
  // getClaims() verifies the JWT signature; never trust getSession() alone on the server.
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) return null;
  return data.claims.sub;
});

/** Signed-in user's profile (any role), or null. */
export const getProfile = cache(async (): Promise<TeamMember | null> => {
  const id = await getUserId();
  if (!id) return null;
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("id, email, full_name, title, role").eq("id", id).single();
  return (data as TeamMember | null) ?? null;
});

/** True when the user enrolled two-factor authentication but hasn't completed it this session. */
export const needsSecondFactor = cache(async (): Promise<boolean> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  return Boolean(data && data.nextLevel === "aal2" && data.currentLevel !== "aal2");
});

/** Requires an admin or staff member; otherwise redirects. */
export async function requireTeamMember(): Promise<TeamMember> {
  if (!isSupabaseConfigured) redirect("/login?error=setup");
  const profile = await getProfile();
  if (!profile) redirect("/login");
  if (await needsSecondFactor()) redirect("/login/mfa");
  if (profile.role !== "admin" && profile.role !== "staff") redirect("/portal");
  return profile;
}

/** Requires an admin; staff are sent back to the dashboard. */
export async function requireAdmin(): Promise<TeamMember> {
  const profile = await requireTeamMember();
  if (profile.role !== "admin") redirect("/dashboard?notice=admin-only");
  return profile;
}

/** For Server Actions: returns the member or null instead of redirecting. */
export async function getAuthorizedMember(role: "team" | "admin"): Promise<TeamMember | null> {
  if (!isSupabaseConfigured) return null;
  const profile = await getProfile();
  if (!profile || (await needsSecondFactor())) return null;
  if (role === "admin") return profile.role === "admin" ? profile : null;
  return profile.role === "admin" || profile.role === "staff" ? profile : null;
}

/** Only allow redirects to our own private pages after login. */
export function safeNext(next: string | null | undefined, fallback = "/dashboard") {
  if (!next || !next.startsWith("/") || next.startsWith("//") || next.includes("\\")) return fallback;
  if (!/^\/(dashboard|portal|reset-password)(\/|\?|$)/.test(next)) return fallback;
  return next;
}
