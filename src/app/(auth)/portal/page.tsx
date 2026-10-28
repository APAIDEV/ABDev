import type { Metadata } from "next";
import { signOut } from "../actions";

export const metadata: Metadata = { title: "Client Portal" };

/**
 * CLIENT PORTAL (future)
 * Accounts with the `client` role land here. The portal itself is not built
 * yet; this page reserves the route so it can be added later.
 */
export default function PortalPage() {
  return (
    <>
      <p className="label text-gold">Client Portal</p>
      <h1 className="mt-4 text-4xl">Coming soon.</h1>
      <p className="mt-3 text-sm text-stone">
        A private space for AB Development clients to follow their project is on the way. In the meantime, your project
        team is available 24/7.
      </p>
      <form action={signOut} className="mt-10">
        <button type="submit" className="label text-stone hover:text-ivory">
          Sign out
        </button>
      </form>
    </>
  );
}
