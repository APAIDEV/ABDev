/** Shared shape returned by every form's server action. */
export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Record<string, string>;
};

export const initialFormState: FormState = { status: "idle" };
