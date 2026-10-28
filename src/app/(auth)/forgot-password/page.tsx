import type { Metadata } from "next";
import { ForgotPasswordForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = { title: "Reset Your Password" };

export default function ForgotPasswordPage() {
  return (
    <>
      <p className="label text-gold">Team Login</p>
      <h1 className="mt-4 text-4xl">Reset your password.</h1>
      <p className="mt-3 text-sm text-stone">
        Enter your email and we&apos;ll send you a secure link to choose a new password.
      </p>
      <div className="mt-10">
        <ForgotPasswordForm />
      </div>
    </>
  );
}
