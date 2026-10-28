import type { SpecStatus } from "@/content/gallery";

const tones: Record<SpecStatus, string> = {
  Available: "bg-gold text-black",
  "Under Contract": "bg-ivory text-black",
  Sold: "bg-black/80 text-ivory border border-ivory/40",
};

export function SpecStatusTag({ status, className = "" }: { status: SpecStatus; className?: string }) {
  return (
    <span className={`label inline-flex px-2.5 py-1 text-[0.6rem] ${tones[status]} ${className}`}>
      <span className="sr-only">Status: </span>
      {status}
    </span>
  );
}
