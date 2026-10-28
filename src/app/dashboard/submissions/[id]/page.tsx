import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { SubmissionUpdateForm } from "@/components/dashboard/SubmissionUpdateForm";
import { getConsentRecords, getSubmission } from "@/lib/dashboard-data";
import { formatDate, formatDateTime, isoToEasternLocal } from "@/lib/format";

export const metadata: Metadata = { title: "Submission" };

export default async function SubmissionDetail({ params }: PageProps<"/dashboard/submissions/[id]">) {
  const { id } = await params;
  const s = await getSubmission(id);
  if (!s) notFound();
  const consents = await getConsentRecords(s.id);

  const rows: [string, React.ReactNode][] = [
    [
      "Email",
      <a key="e" href={`mailto:${s.email}`} className="text-ivory underline underline-offset-4">
        {s.email}
      </a>,
    ],
    [
      "Phone",
      s.phone ? (
        <a key="p" href={`tel:${s.phone}`} className="text-ivory underline underline-offset-4">
          {s.phone}
        </a>
      ) : (
        "—"
      ),
    ],
    ["Project type", s.project_type],
    ["Region", s.region],
    ["Town", s.town ?? "—"],
    ["Budget", s.budget ?? "—"],
    ["Timeline", s.timeline ?? "—"],
    [
      "Preferred consultation",
      s.preferred_date ? `${formatDate(s.preferred_date)}${s.preferred_time ? ` · ${s.preferred_time}` : ""}` : "—",
    ],
    ["Heard about us", s.referral ?? "—"],
    ["Received", formatDateTime(s.created_at)],
  ];

  return (
    <div className="space-y-12">
      <Link href="/dashboard/submissions" className="label text-stone hover:text-ivory">
        ← All submissions
      </Link>
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label text-gold">{s.project_type}</p>
          <h1 className="mt-4 text-5xl">{s.name}</h1>
        </div>
        <StatusBadge status={s.status} />
      </header>

      <div className="grid gap-12 xl:grid-cols-12">
        <div className="space-y-10 xl:col-span-7">
          <dl className="grid gap-x-8 gap-y-5 border-y border-ivory/10 py-8 sm:grid-cols-2">
            {rows.map(([label, value]) => (
              <div key={label}>
                <dt className="label text-stone">{label}</dt>
                <dd className="mt-1.5 text-ivory">{value}</dd>
              </div>
            ))}
          </dl>
          <section aria-labelledby="msg-title">
            <h2 id="msg-title" className="label text-stone">
              Message
            </h2>
            <p className="mt-3 leading-relaxed whitespace-pre-wrap text-ivory">{s.message}</p>
          </section>
          <section aria-labelledby="consent-title" className="border border-ivory/10 p-6">
            <h2 id="consent-title" className="label text-gold">
              Consent record
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-stone">
              <li>Privacy Policy &amp; Terms accepted: {formatDateTime(s.privacy_consent_at)}</li>
              <li>Marketing emails: {s.marketing_email_opt_in ? "Opted in" : "Not opted in"}</li>
              <li>Marketing texts: {s.marketing_sms_opt_in ? "Opted in" : "Not opted in"}</li>
              <li>Consent wording version: {s.consent_version}</li>
              {consents.length > 0 && <li>{consents.length} consent entries logged in the audit table.</li>}
            </ul>
          </section>
        </div>
        <section aria-labelledby="manage-title" className="border border-ivory/10 bg-charcoal p-8 xl:col-span-5">
          <h2 id="manage-title" className="text-3xl">
            Follow-up
          </h2>
          <div className="mt-8">
            <SubmissionUpdateForm
              id={s.id}
              status={s.status}
              scheduledLocal={isoToEasternLocal(s.scheduled_at)}
              notes={s.staff_notes}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
