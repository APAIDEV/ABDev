import "server-only";
import { Resend } from "resend";
import { foundation } from "@/config/site";
import { escapeHtml } from "./escape";

/**
 * Email is sent with Resend (resend.com). Until RESEND_API_KEY and EMAIL_FROM
 * are set, submissions are printed to the server log instead, so the site
 * works for previews without any keys.
 */
const apiKey = process.env.RESEND_API_KEY;
const from = process.env.EMAIL_FROM;
const teamInbox = process.env.CONTACT_TO_EMAIL || foundation.email;

const resend = apiKey ? new Resend(apiKey) : null;

export const emailConfigured = Boolean(resend && from && teamInbox);

type Row = [label: string, value: string | undefined | null];

function layout(title: string, inner: string) {
  return `<!doctype html><html><body style="margin:0;background:#fff5e9;font-family:Helvetica,Arial,sans-serif;color:#3a1420">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border:1px solid #ebc4ca">
<tr><td style="background:#450b1c;padding:22px 28px;color:#fff5e9;font-family:Georgia,serif;font-size:20px;letter-spacing:.5px">${escapeHtml(foundation.name)}</td></tr>
<tr><td style="padding:28px">
<h1 style="margin:0 0 18px;font-family:Georgia,serif;font-weight:normal;font-size:24px;color:#450b1c">${escapeHtml(title)}</h1>
${inner}
</td></tr>
<tr><td style="padding:18px 28px;border-top:1px solid #f1dde0;font-size:12px;color:#6e4e56">${escapeHtml(foundation.tagline)}</td></tr>
</table></td></tr></table></body></html>`;
}

function rowsHtml(rows: Row[]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6">${rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px 8px 0;vertical-align:top;color:#6e4e56;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(String(v))}</td></tr>`,
    )
    .join("")}</table>`;
}

/** Sends a submission to the foundation's inbox. */
export async function notifyTeam(opts: {
  subject: string;
  title: string;
  rows: Row[];
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
}) {
  const text = opts.rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n");
  if (!emailConfigured || !resend) {
    console.info(
      `[form] ${opts.subject}\n${text}${opts.attachments?.length ? `\n(${opts.attachments.length} photo(s) attached)` : ""}`,
    );
    return true;
  }
  const { error } = await resend.emails.send({
    from: from!,
    to: teamInbox,
    subject: opts.subject,
    replyTo: opts.replyTo,
    html: layout(opts.title, rowsHtml(opts.rows)),
    text,
    attachments: opts.attachments,
  });
  if (error) {
    console.error("[email] team notification failed", error);
    return false;
  }
  return true;
}

/** A short, warm confirmation to the person who wrote in. Failures are logged, never shown. */
export async function confirmToSender(opts: { to: string; subject: string; title: string; paragraphs: string[] }) {
  if (!emailConfigured || !resend) return;
  const inner = opts.paragraphs
    .map((p) => `<p style="margin:0 0 14px;font-size:15px;line-height:1.7">${escapeHtml(p)}</p>`)
    .join("");
  const { error } = await resend.emails.send({
    from: from!,
    to: opts.to,
    subject: opts.subject,
    html: layout(opts.title, inner),
    text: opts.paragraphs.join("\n\n"),
  });
  if (error) console.error("[email] confirmation failed", error);
}

/** Adds an email address to the newsletter list in Resend (if a segment is configured). */
export async function addToNewsletter(email: string, firstName?: string) {
  const segmentId = process.env.RESEND_NEWSLETTER_SEGMENT_ID;
  if (!resend || !segmentId) return;
  const { error } = await resend.contacts.create({
    email,
    firstName: firstName || undefined,
    unsubscribed: false,
    segments: [{ id: segmentId }],
  });
  if (error && !/already exists/i.test(error.message)) console.error("[email] newsletter signup failed", error);
}
