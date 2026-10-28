"use client";

import { useActionState } from "react";
import { updateSubmission, type ActionState } from "@/app/dashboard/actions";
import { buttonClass } from "@/components/ui/Button";
import { submissionStatuses, type SubmissionStatus } from "@/lib/types";

export function SubmissionUpdateForm({
  id,
  status,
  scheduledLocal,
  notes,
}: {
  id: string;
  status: SubmissionStatus;
  scheduledLocal: string;
  notes: string;
}) {
  const [state, action, pending] = useActionState<ActionState, FormData>(updateSubmission, {});
  return (
    <form action={action} className="space-y-8">
      <input type="hidden" name="id" value={id} readOnly />
      <div>
        <label htmlFor="sub-status" className="label block text-stone">
          Status
        </label>
        <select id="sub-status" name="status" defaultValue={status} className="field">
          {submissionStatuses.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="sub-scheduled" className="label block text-stone">
          Consultation (Eastern Time)
        </label>
        <input
          id="sub-scheduled"
          name="scheduledAt"
          type="datetime-local"
          defaultValue={scheduledLocal}
          className="field [color-scheme:dark]"
        />
      </div>
      <div>
        <label htmlFor="sub-notes" className="label block text-stone">
          Internal notes
        </label>
        <textarea id="sub-notes" name="notes" rows={5} maxLength={5000} defaultValue={notes} className="field" />
        <p className="mt-2 text-xs text-stone">Visible to the team only.</p>
      </div>
      <div className="flex items-center gap-5">
        <button type="submit" disabled={pending} className={buttonClass("gold")}>
          {pending ? "Saving…" : "Save"}
        </button>
        <p role="status" className={`text-sm ${state.error ? "text-danger" : "text-gold"}`}>
          {state.error ?? state.message}
        </p>
      </div>
    </form>
  );
}
