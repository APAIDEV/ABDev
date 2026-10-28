import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/AuthForms";

export const metadata: Metadata = { title: "Team Login", alternates: { canonical: "/login" } };

export default function LoginPage() {
  return (
    <>
      <p className="label text-gold">Team Login</p>
      <h1 className="mt-4 text-4xl">Welcome back.</h1>
      <p className="mt-3 text-sm text-stone">For AB Development team members. Accounts are by invitation only.</p>
      <div className="mt-10">
        <LoginForm />
      </div>
    </>
  );
}
