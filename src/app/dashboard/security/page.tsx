import type { Metadata } from "next";
import { NewPasswordForm } from "@/components/auth/AuthForms";
import { MfaSettings } from "@/components/dashboard/MfaSettings";
import { requireTeamMember } from "@/lib/auth";

export const metadata: Metadata = { title: "Security" };

export default async function SecurityPage() {
  const me = await requireTeamMember();
  return (
    <div className="max-w-2xl space-y-14">
      <header>
        <p className="label text-gold">Account</p>
        <h1 className="mt-4 text-5xl">Security</h1>
        <p className="mt-3 text-stone">Signed in as {me.email}.</p>
      </header>
      <section aria-labelledby="mfa-title" className="border border-ivory/10 bg-charcoal p-8">
        <h2 id="mfa-title" className="text-3xl">
          Two-factor authentication
        </h2>
        <p className="mt-2 mb-8 text-sm text-stone">
          {me.role === "admin"
            ? "Strongly recommended for admin accounts: a code from your phone is required in addition to your password."
            : "Optional: require a code from your phone in addition to your password."}
        </p>
        <MfaSettings />
      </section>
      <section aria-labelledby="pw-title" className="border border-ivory/10 bg-charcoal p-8">
        <h2 id="pw-title" className="text-3xl">
          Change password
        </h2>
        <div className="mt-8">
          <NewPasswordForm stay submitLabel="Update Password" />
        </div>
      </section>
    </div>
  );
}
