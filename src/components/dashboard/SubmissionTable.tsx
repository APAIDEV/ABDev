import Link from "next/link";
import { formatDate, formatDateTime } from "@/lib/format";
import type { Submission } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

export function SubmissionTable({
  rows,
  empty = "No submissions yet.",
  mode = "submissions",
}: {
  rows: Submission[];
  empty?: string;
  mode?: "submissions" | "consultations";
}) {
  if (rows.length === 0)
    return <p className="border border-dashed border-ivory/15 p-8 text-center text-sm text-stone">{empty}</p>;
  return (
    <div className="overflow-x-auto border border-ivory/10">
      <table className="w-full min-w-[44rem] text-left text-sm">
        <thead className="bg-charcoal">
          <tr className="label text-stone">
            <th scope="col" className="px-4 py-3 font-medium">
              Name
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Project
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Region
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              {mode === "consultations" ? "Consultation" : "Received"}
            </th>
            <th scope="col" className="px-4 py-3 font-medium">
              Status
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-ivory/10">
          {rows.map((s) => (
            <tr key={s.id} className="transition-colors hover:bg-ivory/5">
              <td className="px-4 py-4">
                <Link
                  href={`/dashboard/submissions/${s.id}`}
                  className="text-ivory underline-offset-4 hover:text-gold hover:underline"
                >
                  {s.name}
                </Link>
                <p className="text-xs text-stone">{s.email}</p>
              </td>
              <td className="px-4 py-4 text-stone">{s.project_type}</td>
              <td className="px-4 py-4 text-stone">
                {s.region}
                {s.town ? ` · ${s.town}` : ""}
              </td>
              <td className="px-4 py-4 text-stone">
                {mode === "consultations"
                  ? s.scheduled_at
                    ? formatDateTime(s.scheduled_at)
                    : `Requested: ${formatDate(s.preferred_date)}${s.preferred_time ? ` · ${s.preferred_time}` : ""}`
                  : formatDateTime(s.created_at)}
              </td>
              <td className="px-4 py-4">
                <StatusBadge status={s.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
