import "server-only";
import { connection } from "next/server";
import { requireTeamMember } from "@/lib/auth";
import { easternToday } from "@/lib/format";
import { createClient } from "@/lib/supabase/server";
import type { Submission, SubmissionStatus } from "@/lib/types";

/**
 * Dashboard queries. Each one checks the caller's role first and then queries
 * as the signed-in user, so database Row Level Security is enforced as well.
 */

const COLUMNS =
  "id, created_at, name, email, phone, project_type, region, town, budget, timeline, referral, message, preferred_date, preferred_time, status, scheduled_at, staff_notes, privacy_consent_at, marketing_email_opt_in, marketing_sms_opt_in, consent_version";

export async function listSubmissions({ status, limit = 100 }: { status?: SubmissionStatus; limit?: number } = {}) {
  await requireTeamMember();
  const supabase = await createClient();
  let query = supabase.from("submissions").select(COLUMNS).order("created_at", { ascending: false }).limit(limit);
  if (status) query = query.eq("status", status);
  else query = query.neq("status", "spam");
  const { data } = await query;
  return (data ?? []) as Submission[];
}

export async function getSubmission(id: string) {
  await requireTeamMember();
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const supabase = await createClient();
  const { data } = await supabase.from("submissions").select(COLUMNS).eq("id", id).single();
  return (data as Submission | null) ?? null;
}

export async function getConsentRecords(submissionId: string) {
  await requireTeamMember();
  const supabase = await createClient();
  const { data } = await supabase
    .from("consent_records")
    .select("id, created_at, consent_type, granted, text_version")
    .eq("submission_id", submissionId)
    .order("created_at");
  return (data ?? []) as {
    id: string;
    created_at: string;
    consent_type: string;
    granted: boolean;
    text_version: string;
  }[];
}

/** Scheduled consultations from now on, plus requests with a preferred date that aren't scheduled yet. */
export async function listConsultations(limit = 50) {
  await requireTeamMember();
  await connection();
  const now = new Date();
  const supabase = await createClient();
  const [scheduled, requested] = await Promise.all([
    supabase
      .from("submissions")
      .select(COLUMNS)
      .gte("scheduled_at", now.toISOString())
      .order("scheduled_at")
      .limit(limit),
    supabase
      .from("submissions")
      .select(COLUMNS)
      .is("scheduled_at", null)
      .gte("preferred_date", easternToday(now))
      .in("status", ["new", "contacted"])
      .order("preferred_date")
      .limit(limit),
  ]);
  return {
    scheduled: (scheduled.data ?? []) as Submission[],
    requested: (requested.data ?? []) as Submission[],
  };
}

export async function countNewSubmissions() {
  await requireTeamMember();
  const supabase = await createClient();
  const { count } = await supabase.from("submissions").select("id", { count: "exact", head: true }).eq("status", "new");
  return count ?? 0;
}
