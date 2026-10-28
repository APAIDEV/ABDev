export type AppRole = "admin" | "staff" | "client";

export type Profile = {
  id: string;
  email: string;
  full_name: string;
  title: string;
  role: AppRole;
  created_at: string;
};

export type SubmissionStatus = "new" | "contacted" | "scheduled" | "closed" | "spam";

export const submissionStatuses: { value: SubmissionStatus; label: string }[] = [
  { value: "new", label: "New" },
  { value: "contacted", label: "Contacted" },
  { value: "scheduled", label: "Scheduled" },
  { value: "closed", label: "Closed" },
  { value: "spam", label: "Spam" },
];

export type Submission = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  project_type: string;
  region: string;
  town: string | null;
  budget: string | null;
  timeline: string | null;
  referral: string | null;
  message: string;
  preferred_date: string | null;
  preferred_time: string | null;
  status: SubmissionStatus;
  scheduled_at: string | null;
  staff_notes: string;
  privacy_consent_at: string;
  marketing_email_opt_in: boolean;
  marketing_sms_opt_in: boolean;
  consent_version: string;
};
