"use client";

import Link from "next/link";
import { business } from "@/config/business";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main id="main" className="flex min-h-[70vh] items-center">
      <div className="container-luxe py-24 text-center">
        <p className="label text-gold">Something went wrong</p>
        <h1 className="mt-6 text-5xl font-light">We hit an unexpected snag.</h1>
        <p className="mx-auto mt-6 max-w-md text-stone">
          Please try again. If it keeps happening, call us at{" "}
          <a href={`tel:${business.phone.tel}`} className="text-ivory underline underline-offset-4">
            {business.phone.display}
          </a>
          .
        </p>
        <div className="mt-10 flex justify-center gap-6">
          <button
            type="button"
            onClick={reset}
            className="label border border-gold px-6 py-4 text-gold hover:bg-gold hover:text-black"
          >
            Try Again
          </button>
          <Link href="/" className="label px-6 py-4 text-ivory hover:text-gold">
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
