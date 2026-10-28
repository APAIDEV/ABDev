import type { Metadata } from "next";
import { Suspense } from "react";
import { DashboardNav } from "@/components/dashboard/DashboardNav";
import { Logo } from "@/components/ui/Logo";
import { requireTeamMember } from "@/lib/auth";

export const metadata: Metadata = {
  title: { default: "Dashboard", template: "%s | AB Development Dashboard" },
  robots: { index: false, follow: false },
};

// The dashboard always waits for the signed-in user before rendering.
export const instant = false;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-[calc(100dvh-2.25rem)] bg-black">
      <Suspense fallback={<DashboardLoading />}>
        <DashboardShell>{children}</DashboardShell>
      </Suspense>
    </div>
  );
}

async function DashboardShell({ children }: { children: React.ReactNode }) {
  // Server-side gate: signed out → /login; client role → /portal; MFA pending → /login/mfa.
  const me = await requireTeamMember();
  const items = [
    { href: "/dashboard", label: "Overview" },
    { href: "/dashboard/submissions", label: "Submissions" },
    { href: "/dashboard/consultations", label: "Consultations" },
    ...(me.role === "admin" ? [{ href: "/dashboard/team", label: "Team" }] : []),
    { href: "/dashboard/security", label: "Security" },
  ];
  return (
    <div className="lg:grid lg:min-h-[calc(100dvh-2.25rem)] lg:grid-cols-[16rem_1fr]">
      <aside className="border-b border-ivory/10 bg-charcoal px-4 py-4 lg:sticky lg:top-0 lg:h-[calc(100dvh-2.25rem)] lg:border-r lg:border-b-0 lg:px-6 lg:py-8">
        <div className="mb-4 flex items-center justify-between lg:mb-10">
          <Logo height={52} />
          <span className="label text-[0.55rem] text-gold lg:hidden">{me.role}</span>
        </div>
        <DashboardNav items={items} name={me.full_name || me.email} title={me.title || me.role} />
      </aside>
      <main id="main" tabIndex={-1} className="px-5 py-10 outline-none sm:px-8 lg:px-12 lg:py-14">
        {children}
      </main>
    </div>
  );
}

function DashboardLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status">
      <p className="label text-stone">Loading dashboard…</p>
    </div>
  );
}
