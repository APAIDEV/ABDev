import type { Metadata } from "next";
import { InviteForm, MemberCard, type MemberRow } from "@/components/dashboard/TeamManager";
import { requireAdmin } from "@/lib/auth";
import { formatDateTime } from "@/lib/format";
import { createAdminClient, isAdminConfigured } from "@/lib/supabase/admin";
import type { Profile } from "@/lib/types";

export const metadata: Metadata = { title: "Team" };

/** Admin only. Staff who open this URL are redirected server-side. */
export default async function TeamPage() {
  const me = await requireAdmin();

  if (!isAdminConfigured()) {
    return (
      <div>
        <h1 className="text-5xl">Team</h1>
        <p className="mt-6 text-stone">Set SUPABASE_SERVICE_ROLE_KEY to manage team members. See the README.</p>
      </div>
    );
  }

  const admin = createAdminClient();
  const [{ data: profiles }, { data: users }] = await Promise.all([
    admin.from("profiles").select("id, email, full_name, title, role, created_at").order("created_at"),
    admin.auth.admin.listUsers({ perPage: 200 }),
  ]);
  const byId = new Map((users?.users ?? []).map((u) => [u.id, u]));
  const members: MemberRow[] = ((profiles ?? []) as Profile[]).map((p) => {
    const u = byId.get(p.id);
    return {
      id: p.id,
      email: p.email,
      full_name: p.full_name,
      title: p.title,
      role: p.role,
      pending: !u?.last_sign_in_at,
      lastSignIn: formatDateTime(u?.last_sign_in_at),
    };
  });
  const team = members.filter((m) => m.role !== "client");
  const clients = members.filter((m) => m.role === "client");

  return (
    <div className="space-y-14">
      <header>
        <p className="label text-gold">Admin</p>
        <h1 className="mt-4 text-5xl">Team</h1>
        <p className="mt-3 max-w-2xl text-stone">
          Invite employees, change roles, or remove access. Public sign-up is disabled: only people invited here can
          create an account.
        </p>
      </header>

      <section aria-labelledby="invite-title" className="border border-ivory/10 bg-charcoal p-8">
        <h2 id="invite-title" className="text-3xl">
          Invite a team member
        </h2>
        <p className="mt-2 text-sm text-stone">They&apos;ll receive an email to set their password.</p>
        <div className="mt-8">
          <InviteForm />
        </div>
      </section>

      <section aria-labelledby="members-title">
        <h2 id="members-title" className="text-3xl">
          Members ({team.length})
        </h2>
        <ul className="mt-6 space-y-4">
          {team.map((m) => (
            <MemberCard key={m.id} member={m} isSelf={m.id === me.id} />
          ))}
        </ul>
      </section>

      {clients.length > 0 && (
        <section aria-labelledby="clients-title">
          <h2 id="clients-title" className="text-3xl">
            Accounts without dashboard access ({clients.length})
          </h2>
          <p className="mt-2 text-sm text-stone">Reserved for the future client portal.</p>
          <ul className="mt-6 space-y-4">
            {clients.map((m) => (
              <MemberCard key={m.id} member={m} isSelf={m.id === me.id} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
