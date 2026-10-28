import type { Metadata } from "next";
import { MfaChallenge } from "@/components/auth/MfaChallenge";
import { signOut } from "../../actions";

export const metadata: Metadata = { title: "Two-Factor Verification" };

export default function MfaPage() {
  return (
    <>
      <p className="label text-gold">Two-Factor Verification</p>
      <h1 className="mt-4 text-4xl">One more step.</h1>
      <p className="mt-3 text-sm text-stone">Enter the code from your authenticator app.</p>
      <div className="mt-10">
        <MfaChallenge />
      </div>
      <form action={signOut} className="mt-6 text-center">
        <button type="submit" className="text-sm text-stone hover:text-ivory">
          Use a different account
        </button>
      </form>
    </>
  );
}
