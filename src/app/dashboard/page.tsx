import Link from "next/link";
import { SubmissionTable } from "@/components/dashboard/SubmissionTable";
import { requireTeamMember } from "@/lib/auth";
import { countNewSubmissions, listConsultations, listSubmissions } from "@/lib/dashboard-data";

export default async function DashboardHome({ searchParams }: PageProps<"/dashboard">) {
  const me = await requireTeamMember();
  const { notice } = await searchParams;
  const [recent, newCount, consultations] = await Promise.all([
    listSubmissions({ limit: 5 }),
    countNewSubmissions(),
    listConsultations(5),
  ]);
  const firstName = (me.full_name || me.email).split(" ")[0];

  return (
    <div className="space-y-14">
      {notice === "admin-only" && (
        <p role="status" className="border border-gold/40 bg-gold/10 px-4 py-3 text-sm">
          That page is available to admins only.
        </p>
      )}
      <header>
        <p className="label text-gold">{me.title || (me.role === "admin" ? "Admin" : "Staff")}</p>
        <h1 className="mt-4 text-5xl">Welcome, {firstName}.</h1>
        <p className="mt-3 text-stone">Here&apos;s what&apos;s happening across AB Development.</p>
      </header>

      <ul className="grid gap-px bg-ivory/10 sm:grid-cols-3">
        <Stat label="New inquiries" value={newCount} href="/dashboard/submissions?status=new" />
        <Stat label="Scheduled consultations" value={consultations.scheduled.length} href="/dashboard/consultations" />
        <Stat label="Requested consultations" value={consultations.requested.length} href="/dashboard/consultations" />
      </ul>

      <section aria-labelledby="recent-title">
        <div className="flex items-baseline justify-between">
          <h2 id="recent-title" className="text-3xl">
            Recent submissions
          </h2>
          <Link href="/dashboard/submissions" className="label text-stone hover:text-gold">
            View all
          </Link>
        </div>
        <div className="mt-6">
          <SubmissionTable
            rows={recent}
            empty="No contact submissions yet. New inquiries from the website will appear here."
          />
        </div>
      </section>

      <section aria-labelledby="upcoming-title">
        <div className="flex items-baseline justify-between">
          <h2 id="upcoming-title" className="text-3xl">
            Upcoming consultations
          </h2>
          <Link href="/dashboard/consultations" className="label text-stone hover:text-gold">
            View all
          </Link>
        </div>
        <div className="mt-6">
          <SubmissionTable
            mode="consultations"
            rows={[...consultations.scheduled, ...consultations.requested].slice(0, 5)}
            empty="No upcoming consultations. Set a consultation time on any submission to see it here."
          />
        </div>
      </section>

      <section aria-labelledby="portal-title" className="border border-dashed border-gold/40 p-8">
        <p className="label text-gold">Coming soon</p>
        <h2 id="portal-title" className="mt-3 text-3xl">
          Client Portal
        </h2>
        <p className="mt-3 max-w-2xl text-sm text-stone">
          A private space where clients can follow their build, view selections and documents, and message the team.
          Client accounts (the <code>client</code> role) are already supported and will be connected here.
        </p>
      </section>
    </div>
  );
}

function Stat({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <li className="bg-black">
      <Link href={href} className="block p-8 transition-colors hover:bg-charcoal">
        <p className="font-serif text-6xl font-light text-ivory">{value}</p>
        <p className="label mt-3 text-stone">{label}</p>
      </Link>
    </li>
  );
}
