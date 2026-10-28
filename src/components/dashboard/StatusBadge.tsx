import type { SubmissionStatus } from "@/lib/types";

const tone: Record<SubmissionStatus, string> = {
  new: "bg-gold text-black",
  contacted: "border border-gold/60 text-gold",
  scheduled: "bg-ivory text-black",
  closed: "border border-ivory/30 text-stone",
  spam: "border border-danger/50 text-danger",
};

export function StatusBadge({ status }: { status: SubmissionStatus }) {
  return <span className={`label inline-flex px-2 py-1 text-[0.58rem] ${tone[status]}`}>{status}</span>;
}
