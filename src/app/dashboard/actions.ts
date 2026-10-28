"use server";

import { refresh } from "next/cache";
import { z } from "zod";
import { siteUrl } from "@/config/site";
import { getAuthorizedMember } from "@/lib/auth";
import { easternLocalToIso } from "@/lib/format";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type ActionState = { error?: string; message?: string };

const DENIED = { error: "You don't have permission to do that." };

// ------------------------------------------------------------ Submissions --
const submissionUpdate = z.object({
  id: z.uuid(),
  status: z.enum(["new", "contacted", "scheduled", "closed", "spam"]),
  scheduledAt: z.string().max(20),
  notes: z.string().max(5000),
});

/** Staff and admins can update status, consultation time, and internal notes. */
export async function updateSubmission(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const me = await getAuthorizedMember("team");
  if (!me) return DENIED;
  const parsed = submissionUpdate.safeParse({
    id: formData.get("id"),
    status: formData.get("status"),
    scheduledAt: String(formData.get("scheduledAt") ?? ""),
    notes: String(formData.get("notes") ?? ""),
  });
  if (!parsed.success) return { error: "Please check the values and try again." };
  const { id, status, scheduledAt, notes } = parsed.data;
  const scheduled = scheduledAt ? easternLocalToIso(scheduledAt) : null;
  if (scheduledAt && !scheduled) return { error: "Please enter a valid consultation date and time." };

  // Uses the signed-in user's session, so database security rules apply too.
  const supabase = await createClient();
  const { error } = await supabase
    .from("submissions")
    .update({
      status: scheduled && status === "new" ? "scheduled" : status,
      scheduled_at: scheduled,
      staff_notes: notes.trim(),
    })
    .eq("id", id);
  if (error) return { error: "Could not save changes. Please try again." };
  refresh();
  return { message: "Saved." };
}

// ------------------------------------------------------------------ Team ---
const inviteSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter a name.").max(120),
  title: z.string().trim().max(120),
  email: z.email("Please enter a valid email address.").max(254),
  role: z.enum(["admin", "staff"]),
});

/** Admin only: invite a new team member by email. */
export async function inviteMember(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const me = await getAuthorizedMember("admin");
  if (!me) return DENIED;
  if (!isAdminConfigured()) return { error: "SUPABASE_SERVICE_ROLE_KEY is not set. See the README." };

  const parsed = inviteSchema.safeParse({
    fullName: formData.get("fullName"),
    title: formData.get("title") ?? "",
    email: String(formData.get("email") ?? "")
      .trim()
      .toLowerCase(),
    role: formData.get("role"),
  });
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Please check the form." };
  const { fullName, title, email, role } = parsed.data;

  const admin = createAdminClient();
  const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName, title },
    redirectTo: `${siteUrl}/auth/confirm?next=/reset-password`,
  });
  if (error || !data.user) {
    return {
      error: error?.message?.toLowerCase().includes("already")
        ? "Someone with that email already has an account. Change their role below instead."
        : "The invitation could not be sent. Please try again.",
    };
  }
  const { error: profileError } = await admin
    .from("profiles")
    .upsert({ id: data.user.id, email, full_name: fullName, title, role });
  if (profileError) return { error: "Invitation sent, but the role could not be saved. Set it below." };

  refresh();
  return { message: `Invitation sent to ${email}.` };
}

async function adminCount(admin: ReturnType<typeof createAdminClient>) {
  const { count } = await admin.from("profiles").select("id", { count: "exact", head: true }).eq("role", "admin");
  return count ?? 0;
}

const memberUpdate = z.object({
  id: z.uuid(),
  fullName: z.string().trim().min(1).max(120),
  title: z.string().trim().max(120),
  role: z.enum(["admin", "staff", "client"]),
});

/** Admin only: change a member's name, title, or role. */
export async function updateMember(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const me = await getAuthorizedMember("admin");
  if (!me) return DENIED;
  if (!isAdminConfigured()) return { error: "SUPABASE_SERVICE_ROLE_KEY is not set." };
  const parsed = memberUpdate.safeParse({
    id: formData.get("id"),
    fullName: formData.get("fullName"),
    title: formData.get("title") ?? "",
    role: formData.get("role"),
  });
  if (!parsed.success) return { error: "Please check the values and try again." };
  const { id, fullName, title, role } = parsed.data;

  const admin = createAdminClient();
  if (role !== "admin") {
    const { data: current } = await admin.from("profiles").select("role").eq("id", id).single();
    if (current?.role === "admin" && (await adminCount(admin)) <= 1) {
      return { error: "There must always be at least one admin." };
    }
  }
  const { error } = await admin.from("profiles").update({ full_name: fullName, title, role }).eq("id", id);
  if (error) return { error: "Could not save changes." };
  refresh();
  return { message: "Saved." };
}

/** Admin only: remove a member's account entirely. */
export async function removeMember(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const me = await getAuthorizedMember("admin");
  if (!me) return DENIED;
  if (!isAdminConfigured()) return { error: "SUPABASE_SERVICE_ROLE_KEY is not set." };
  const id = z.uuid().safeParse(formData.get("id"));
  if (!id.success) return { error: "Unknown team member." };
  if (id.data === me.id) return { error: "You can't remove your own account." };

  const admin = createAdminClient();
  const { data: target } = await admin.from("profiles").select("role").eq("id", id.data).single();
  if (target?.role === "admin" && (await adminCount(admin)) <= 1) {
    return { error: "There must always be at least one admin." };
  }
  const { error } = await admin.auth.admin.deleteUser(id.data);
  if (error) return { error: "Could not remove this member." };
  refresh();
  return { message: "Team member removed." };
}
