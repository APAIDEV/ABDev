"use client";

import { useActionState } from "react";
import { inviteMember, removeMember, updateMember, type ActionState } from "@/app/dashboard/actions";
import { buttonClass } from "@/components/ui/Button";
import type { AppRole } from "@/lib/types";

export type MemberRow = {
  id: string;
  email: string;
  full_name: string;
  title: string;
  role: AppRole;
  pending: boolean;
  lastSignIn: string;
};

function Result({ state }: { state: ActionState }) {
  return (
    <p role="status" className={`text-sm ${state.error ? "text-danger" : "text-gold"}`}>
      {state.error ?? state.message}
    </p>
  );
}

export function InviteForm() {
  const [state, action, pending] = useActionState<ActionState, FormData>(inviteMember, {});
  return (
    <form action={action} className="grid gap-8 sm:grid-cols-2">
      <div>
        <label htmlFor="inv-name" className="label block text-stone">
          Full name
        </label>
        <input id="inv-name" name="fullName" required maxLength={120} className="field" />
      </div>
      <div>
        <label htmlFor="inv-title" className="label block text-stone">
          Title
        </label>
        <input
          id="inv-title"
          name="title"
          maxLength={120}
          placeholder="e.g. Project Manager"
          className="field placeholder:text-stone/50"
        />
      </div>
      <div>
        <label htmlFor="inv-email" className="label block text-stone">
          Email
        </label>
        <input id="inv-email" name="email" type="email" required className="field" />
      </div>
      <div>
        <label htmlFor="inv-role" className="label block text-stone">
          Role
        </label>
        <select id="inv-role" name="role" defaultValue="staff" className="field">
          <option value="staff">Staff: view dashboard and submissions</option>
          <option value="admin">Admin: full access, manages team</option>
        </select>
      </div>
      <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
        <button type="submit" disabled={pending} className={buttonClass("gold")}>
          {pending ? "Sending…" : "Send Invitation"}
        </button>
        <Result state={state} />
      </div>
    </form>
  );
}

export function MemberCard({ member, isSelf }: { member: MemberRow; isSelf: boolean }) {
  const [saveState, save, saving] = useActionState<ActionState, FormData>(updateMember, {});
  const [removeState, remove, removing] = useActionState<ActionState, FormData>(removeMember, {});
  const uid = member.id.slice(0, 8);
  return (
    <li className="border border-ivory/10 p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-serif text-2xl">
            {member.full_name || member.email} {isSelf && <span className="label ml-2 text-gold">You</span>}
          </p>
          <p className="text-sm text-stone">{member.email}</p>
        </div>
        <p className="label text-[0.6rem] text-stone">
          {member.pending ? "Invitation pending" : `Last sign-in: ${member.lastSignIn}`}
        </p>
      </div>
      <form action={save} className="mt-6 grid gap-6 sm:grid-cols-3">
        <input type="hidden" name="id" value={member.id} readOnly />
        <div>
          <label htmlFor={`n-${uid}`} className="label block text-stone">
            Name
          </label>
          <input id={`n-${uid}`} name="fullName" defaultValue={member.full_name} required className="field" />
        </div>
        <div>
          <label htmlFor={`t-${uid}`} className="label block text-stone">
            Title
          </label>
          <input id={`t-${uid}`} name="title" defaultValue={member.title} className="field" />
        </div>
        <div>
          <label htmlFor={`r-${uid}`} className="label block text-stone">
            Role
          </label>
          <select id={`r-${uid}`} name="role" defaultValue={member.role} className="field">
            <option value="admin">Admin</option>
            <option value="staff">Staff</option>
            <option value="client">Client (no dashboard access)</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:col-span-3">
          <button type="submit" disabled={saving} className={buttonClass("outline", "px-5! py-3!")}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
          <Result state={saveState} />
        </div>
      </form>
      {!isSelf && (
        <form
          action={remove}
          onSubmit={(e) => {
            if (!window.confirm(`Remove ${member.full_name || member.email}? Their account will be deleted.`))
              e.preventDefault();
          }}
          className="mt-4 flex flex-wrap items-center gap-4 border-t border-ivory/10 pt-4"
        >
          <input type="hidden" name="id" value={member.id} readOnly />
          <button type="submit" disabled={removing} className="label text-danger hover:underline">
            {removing ? "Removing…" : "Remove from team"}
          </button>
          <Result state={removeState} />
        </form>
      )}
    </li>
  );
}
