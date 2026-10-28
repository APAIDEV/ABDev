import Link from "next/link";
import type { Metadata } from "next";
import { SubmissionTable } from "@/components/dashboard/SubmissionTable";
import { listSubmissions } from "@/lib/dashboard-data";
import { submissionStatuses, type SubmissionStatus } from "@/lib/types";

export const metadata: Metadata = { title: "Submissions" };

export default async function SubmissionsPage({ searchParams }: PageProps<"/dashboard/submissions">) {
  const { status: raw } = await searchParams;
  const status = submissionStatuses.find((s) => s.value === raw)?.value as SubmissionStatus | undefined;
  const rows = await listSubmissions({ status, limit: 200 });

  return (
    <div className="space-y-10">
      <header>
        <p className="label text-gold">Inbox</p>
        <h1 className="mt-4 text-5xl">Submissions</h1>
        <p className="mt-3 text-stone">Every contact and consultation request from the website.</p>
      </header>
      <nav aria-label="Filter by status" className="flex flex-wrap gap-1">
        {[{ value: undefined, label: "All" }, ...submissionStatuses].map((s) => (
          <Link
            key={s.label}
            href={s.value ? `/dashboard/submissions?status=${s.value}` : "/dashboard/submissions"}
            aria-current={status === s.value ? "page" : undefined}
            className={`label px-4 py-2.5 ${status === s.value ? "bg-ivory text-black" : "text-stone hover:text-ivory"}`}
          >
            {s.label}
          </Link>
        ))}
      </nav>
      <SubmissionTable rows={rows} empty={status ? `No ${status} submissions.` : "No submissions yet."} />
      <p className="text-xs text-stone">Spam is hidden from “All”. Showing up to 200 most recent.</p>
    </div>
  );
}
