"use client";

import Link from "next/link";
import Script from "next/script";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { OPEN_SETTINGS_EVENT, readConsent, subscribeConsent, writeConsent } from "@/lib/consent";
import { buttonClass } from "@/components/ui/Button";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/**
 * Cookie banner (Accept / Reject / Manage) plus the Google Analytics loader.
 * Google Analytics is never requested until the visitor accepts analytics cookies.
 */
export function CookieConsent() {
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [manageOpen, setManageOpen] = useState(false);
  const [analyticsChoice, setAnalyticsChoice] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const open = () => {
      setAnalyticsChoice(readConsent()?.analytics ?? false);
      setManageOpen(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, open);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, open);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (manageOpen && !dialog.open) dialog.showModal();
    if (!manageOpen && dialog.open) dialog.close();
  }, [manageOpen]);

  const save = (analytics: boolean) => {
    writeConsent(analytics);
    setManageOpen(false);
  };

  const showBanner = hydrated && !consent && !manageOpen;

  return (
    <>
      {GA_ID && consent?.analytics && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window['ga-disable-${GA_ID}']=false;window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
          </Script>
        </>
      )}

      {showBanner && (
        <section
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[60] border-t border-ivory/15 bg-charcoal/98 text-ivory shadow-[0_-20px_60px_rgba(0,0,0,0.5)] backdrop-blur"
        >
          <div className="container-luxe flex flex-col gap-5 py-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="max-w-2xl text-sm text-stone">
              We use essential cookies to run this site and, with your permission, analytics cookies to understand how
              it is used. See our{" "}
              <Link href="/legal/cookies" className="text-ivory underline underline-offset-4 hover:text-gold">
                Cookie Policy
              </Link>
              .
            </p>
            <div className="flex flex-wrap gap-3">
              <button type="button" className={buttonClass("outline", "px-5! py-3!")} onClick={() => save(false)}>
                Reject
              </button>
              <button
                type="button"
                className={buttonClass("text", "py-3!")}
                onClick={() => {
                  setAnalyticsChoice(false);
                  setManageOpen(true);
                }}
              >
                Manage
              </button>
              <button type="button" className={buttonClass("light", "px-5! py-3!")} onClick={() => save(true)}>
                Accept
              </button>
            </div>
          </div>
        </section>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="cookie-settings-title"
        onClose={() => setManageOpen(false)}
        className="m-auto w-[min(92vw,34rem)] border border-ivory/15 bg-charcoal p-0 text-ivory"
      >
        <div className="p-8">
          <h2 id="cookie-settings-title" className="text-3xl">
            Cookie Settings
          </h2>
          <p className="mt-3 text-sm text-stone">Choose which cookies we may use. You can change this at any time.</p>
          <ul className="mt-8 divide-y divide-ivory/10 border-y border-ivory/10">
            <li className="flex items-start justify-between gap-6 py-5">
              <div>
                <p className="label text-ivory">Strictly Necessary</p>
                <p className="mt-2 text-sm text-stone">
                  Required for the site to work, including your cookie choice and team sign-in.
                </p>
              </div>
              <span className="label shrink-0 text-gold">Always on</span>
            </li>
            <li className="flex items-start justify-between gap-6 py-5">
              <div>
                <label htmlFor="consent-analytics" className="label text-ivory">
                  Analytics
                </label>
                <p id="consent-analytics-desc" className="mt-2 text-sm text-stone">
                  Google Analytics helps us understand which pages are useful. Off unless you turn it on.
                </p>
              </div>
              <input
                id="consent-analytics"
                type="checkbox"
                role="switch"
                aria-describedby="consent-analytics-desc"
                checked={analyticsChoice}
                onChange={(e) => setAnalyticsChoice(e.target.checked)}
                className="mt-1 h-5 w-5 shrink-0 accent-[var(--color-gold)]"
              />
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap justify-end gap-3">
            <button type="button" className={buttonClass("outline", "px-5! py-3!")} onClick={() => save(false)}>
              Reject All
            </button>
            <button type="button" className={buttonClass("light", "px-5! py-3!")} onClick={() => save(analyticsChoice)}>
              Save Choices
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
