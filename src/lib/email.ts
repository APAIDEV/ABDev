import "server-only";
import { Resend } from "resend";
import { business } from "@/config/business";
import { siteUrl } from "@/config/site";
import { serverEnv } from "@/lib/server-env";
import type { ContactInput } from "@/lib/contact-schema";

const escape = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

function layout(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f8f8f6;font-family:Helvetica,Arial,sans-serif;color:#161615">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8f8f6;padding:32px 12px"><tr><td align="center">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e6e2da">
<tr><td style="background:#000;padding:28px;text-align:center"><img src="${siteUrl}/brand/logo.jpg" alt="AB Development" height="72" style="height:72px"></td></tr>
<tr><td style="padding:36px 36px 12px"><h1 style="margin:0;font-family:Georgia,serif;font-weight:400;font-size:28px">${escape(title)}</h1></td></tr>
<tr><td style="padding:12px 36px 36px;font-size:15px;line-height:1.6">${body}</td></tr>
<tr><td style="padding:20px 36px;border-top:1px solid #e6e2da;font-size:12px;color:#5e5a54">${escape(business.name)} · ${escape(business.phone.display)} · ${escape(business.email)}<br>${escape(business.description)}</td></tr>
</table></td></tr></table></body></html>`;
}

const row = (label: string, value: string | null | undefined) =>
  value
    ? `<tr><td style="padding:6px 12px 6px 0;color:#5e5a54;white-space:nowrap;vertical-align:top">${escape(label)}</td><td style="padding:6px 0">${escape(value).replace(/\n/g, "<br>")}</td></tr>`
    : "";

export const isEmailConfigured = () => Boolean(serverEnv.resendApiKey);

/** Sends the new-inquiry notification to the business and a confirmation to the client. */
export async function sendContactEmails(input: ContactInput, submissionId: string | null) {
  if (!isEmailConfigured()) return { ok: false as const, reason: "not-configured" };
  const resend = new Resend(serverEnv.resendApiKey);

  const details = `<table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px">
${row("Name", input.name)}${row("Email", input.email)}${row("Phone", input.phone)}${row("Project type", input.projectType)}
${row("Region", input.region)}${row("Town", input.town)}${row("Budget", input.budget)}${row("Timeline", input.timeline)}
${row("Preferred consultation", [input.preferredDate, input.preferredTime].filter(Boolean).join(" · "))}
${row("Heard about us", input.referral)}${row("Marketing emails", input.marketingEmail ? "Opted in" : "No")}
${row("Marketing texts", input.marketingSms ? "Opted in" : "No")}${row("Message", input.message)}</table>`;

  const dashboardLink = submissionId
    ? `<p style="margin-top:24px"><a href="${siteUrl}/dashboard/submissions/${submissionId}" style="color:#7a5f33">View in the team dashboard</a></p>`
    : "";

  const notification = resend.emails.send({
    from: serverEnv.emailFrom,
    to: serverEnv.contactToEmail,
    replyTo: input.email,
    subject: `New inquiry: ${input.projectType} · ${input.region}${input.town ? ` (${input.town})` : ""} · ${input.name}`,
    html: layout("New website inquiry", `${details}${dashboardLink}`),
  });

  const firstName = input.name.split(" ")[0];
  const autoReply = resend.emails.send({
    from: serverEnv.emailFrom,
    to: input.email,
    replyTo: business.email,
    subject: `Thank you for contacting ${business.name}`,
    html: layout(
      `Thank you, ${firstName}.`,
      `<p>We have received your inquiry about <strong>${escape(input.projectType.toLowerCase())}</strong> and will be in touch shortly to talk through your vision.</p>
<p>If your project is time-sensitive, call us any time at <a href="tel:${business.phone.tel}" style="color:#7a5f33">${escape(business.phone.display)}</a>. We are available 24/7.</p>
<p style="margin-top:28px;font-family:Georgia,serif;font-size:18px">${escape(business.tagline)}</p>
<p style="font-size:12px;color:#5e5a54;margin-top:28px">You are receiving this one-time confirmation because this address was entered on our contact form. This is not a marketing email. Submitting the form does not create a contract or client relationship.</p>`,
    ),
  });

  const [n, a] = await Promise.allSettled([notification, autoReply]);
  const ok = n.status === "fulfilled" && !n.value.error;
  if (!ok) console.error("contact notification email failed:", n.status === "fulfilled" ? n.value.error : n.reason);
  if (a.status === "rejected" || a.value.error)
    console.error("contact auto-reply failed:", a.status === "fulfilled" ? a.value.error : a.reason);
  return { ok };
}
