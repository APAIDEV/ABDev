"use server";

import { consentText, consentVersion } from "@/config/contactForm";
import { business } from "@/config/business";
import { contactSchema, type ContactState } from "@/lib/contact-schema";
import { isEmailConfigured, sendContactEmails } from "@/lib/email";
import { rateLimit } from "@/lib/rate-limit";
import { requestMeta } from "@/lib/request";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import { verifyTurnstile } from "@/lib/turnstile";

const FIELDS = [
  "name",
  "email",
  "phone",
  "projectType",
  "region",
  "town",
  "budget",
  "timeline",
  "referral",
  "preferredDate",
  "preferredTime",
  "message",
  "agreeTerms",
  "marketingEmail",
  "marketingSms",
] as const;

const MIN_FILL_MS = 3000;

export async function submitContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const raw = Object.fromEntries(FIELDS.map((f) => [f, String(formData.get(f) ?? "")])) as Record<string, string>;
  const values = { ...raw };
  for (const k of ["agreeTerms", "marketingEmail", "marketingSms"]) if (!raw[k]) delete raw[k];

  // Spam protection 1: hidden honeypot field that people never see or fill in.
  // Spam protection 2: forms submitted faster than a person could type.
  const startedAt = Number(formData.get("form_started") ?? 0);
  const looksLikeBot =
    Boolean(formData.get("company_website")) || (startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS);
  if (looksLikeBot) return { status: "success", firstName: "" };

  const meta = await requestMeta();

  // Spam protection 3: rate limit by (hashed) IP address.
  if (!(await rateLimit(`contact:${meta.ipHash}`, 5, 600))) {
    return {
      status: "error",
      message: `You have sent several messages in a short time. Please wait a few minutes, or call us at ${business.phone.display}.`,
      values,
    };
  }

  // Spam protection 4 (optional): Cloudflare Turnstile.
  if (!(await verifyTurnstile(formData.get("cf-turnstile-response")?.toString() ?? null, meta.ip))) {
    return { status: "error", message: "Please complete the security check and try again.", values };
  }

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fieldErrors[key] ??= issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values };
  }
  const input = parsed.data;
  const consentAt = new Date().toISOString();

  let submissionId: string | null = null;
  let saved = false;
  if (isAdminConfigured()) {
    const db = createAdminClient();
    const { data, error } = await db
      .from("submissions")
      .insert({
        name: input.name,
        email: input.email,
        phone: input.phone || null,
        project_type: input.projectType,
        region: input.region,
        town: input.town || null,
        budget: input.budget,
        timeline: input.timeline,
        referral: input.referral,
        preferred_date: input.preferredDate,
        preferred_time: input.preferredTime,
        message: input.message,
        privacy_consent_at: consentAt,
        marketing_email_opt_in: Boolean(input.marketingEmail),
        marketing_sms_opt_in: Boolean(input.marketingSms),
        consent_version: consentVersion,
        ip_hash: meta.ipHash,
        user_agent: meta.userAgent,
      })
      .select("id")
      .single();

    if (error) {
      console.error("failed to save submission:", error.message);
    } else {
      saved = true;
      submissionId = data.id as string;
      const consents = [
        { consent_type: "privacy_terms", granted: true, consent_text: consentText.privacyTerms },
        {
          consent_type: "marketing_email",
          granted: Boolean(input.marketingEmail),
          consent_text: consentText.marketingEmail,
        },
        { consent_type: "marketing_sms", granted: Boolean(input.marketingSms), consent_text: consentText.marketingSms },
      ].map((c) => ({
        ...c,
        submission_id: submissionId,
        email: input.email,
        phone: input.phone || null,
        text_version: consentVersion,
        ip_hash: meta.ipHash,
        user_agent: meta.userAgent,
        created_at: consentAt,
      }));
      const { error: consentError } = await db.from("consent_records").insert(consents);
      if (consentError) console.error("failed to log consent:", consentError.message);
    }
  }

  const email = await sendContactEmails(input, submissionId);

  if (!saved && !email.ok) {
    if (!isAdminConfigured() && !isEmailConfigured() && process.env.NODE_ENV !== "production") {
      console.info("[dev] Contact form submission (Supabase and Resend not configured):", input);
    } else {
      return {
        status: "error",
        message: `Sorry, we couldn't send your message right now. Please call us at ${business.phone.display} or email ${business.email}.`,
        values,
      };
    }
  }

  return { status: "success", firstName: input.name.split(" ")[0] };
}
