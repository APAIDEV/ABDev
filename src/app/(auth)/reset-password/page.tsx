import type { Metadata } from "next";
import { NewPasswordForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = { title: "Choose a New Password" };

export default function ResetPasswordPage() {
  return (
    <>
      <p className="label text-gold">Team Login</p>
      <h1 className="mt-4 text-4xl">Choose a password.</h1>
      <p className="mt-3 text-sm text-stone">
        Welcome to the AB Development team area. Set a new password to finish signing in.
      </p>
      <div className="mt-10">
        <NewPasswordForm />
      </div>
    </>
  );
}
