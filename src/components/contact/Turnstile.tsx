"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { publicEnv } from "@/lib/env";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
};

/** Optional Cloudflare Turnstile spam check. Renders nothing unless NEXT_PUBLIC_TURNSTILE_SITE_KEY is set. */
export function Turnstile() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const siteKey = publicEnv.turnstileSiteKey;

  useEffect(() => {
    const api = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
    if (!siteKey || !ref.current || !api) return;
    const id = api.render(ref.current, { sitekey: siteKey, theme: "dark", appearance: "interaction-only" });
    return () => api.remove(id);
  }, [ready, siteKey]);

  if (!siteKey) return null;
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onReady={() => setReady(true)}
      />
      <div ref={ref} className="min-h-0" />
    </>
  );
}
