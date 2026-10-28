import type { Metadata } from "next";
import { SubmissionTable } from "@/components/dashboard/SubmissionTable";
import { listConsultations } from "@/lib/dashboard-data";

export const metadata: Metadata = { title: "Consultations" };

export default async function ConsultationsPage() {
  const { scheduled, requested } = await listConsultations();
  return (
    <div className="space-y-14">
      <header>
        <p className="label text-gold">Calendar</p>
        <h1 className="mt-4 text-5xl">Consultations</h1>
        <p className="mt-3 max-w-2xl text-stone">
          Requests from the website form, and consultations your team has scheduled. Appointments booked directly
          through Google Calendar appear in that calendar.
        </p>
      </header>
      <section aria-labelledby="scheduled-title">
        <h2 id="scheduled-title" className="text-3xl">
          Scheduled
        </h2>
        <div className="mt-6">
          <SubmissionTable
            mode="consultations"
            rows={scheduled}
            empty="Nothing scheduled yet. Open a submission to set a consultation time."
          />
        </div>
      </section>
      <section aria-labelledby="requested-title">
        <h2 id="requested-title" className="text-3xl">
          Requested, not yet scheduled
        </h2>
        <div className="mt-6">
          <SubmissionTable mode="consultations" rows={requested} empty="No open consultation requests." />
        </div>
      </section>
    </div>
  );
}
