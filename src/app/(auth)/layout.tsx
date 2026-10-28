import Link from "next/link";
import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="main"
      tabIndex={-1}
      className="relative flex min-h-[calc(100dvh-2.25rem)] flex-col items-center justify-center px-5 py-16 outline-none"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent"
      />
      <div className="relative w-full max-w-md">
        <div className="flex justify-center">
          <Logo height={96} />
        </div>
        <div className="mt-12 border border-ivory/10 bg-charcoal/90 p-8 backdrop-blur sm:p-10">{children}</div>
        <p className="mt-8 text-center text-xs text-stone">
          <Link href="/" className="hover:text-ivory">
            ← Back to abdevelopment.ai
          </Link>
        </p>
      </div>
    </main>
  );
}
