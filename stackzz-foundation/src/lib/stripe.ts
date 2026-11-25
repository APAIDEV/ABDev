import "server-only";

/**
 * Donations are completed on Stripe Checkout, Stripe's own secure payment page.
 * Card details never touch this website. Set STRIPE_SECRET_KEY to turn online
 * giving on; until then the Give Back page collects pledges instead.
 */
export const donationsEnabled = Boolean(process.env.STRIPE_SECRET_KEY);

export async function createDonationCheckout(opts: {
  amountCents: number;
  monthly: boolean;
  designation: string;
  tribute?: string;
  email?: string;
  siteUrl: string;
}) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error("Stripe is not configured");

  const p = new URLSearchParams();
  p.set("mode", opts.monthly ? "subscription" : "payment");
  p.set("success_url", `${opts.siteUrl}/give/thank-you?session_id={CHECKOUT_SESSION_ID}`);
  p.set("cancel_url", `${opts.siteUrl}/give#give-form`);
  p.set("line_items[0][quantity]", "1");
  p.set("line_items[0][price_data][currency]", "usd");
  p.set("line_items[0][price_data][unit_amount]", String(opts.amountCents));
  p.set(
    "line_items[0][price_data][product_data][name]",
    `${opts.monthly ? "Monthly gift" : "Gift"} to Stackzz Foundation`,
  );
  p.set("line_items[0][price_data][product_data][description]", `Designated to: ${opts.designation}`);
  if (opts.monthly) p.set("line_items[0][price_data][recurring][interval]", "month");
  else p.set("submit_type", "donate");
  if (opts.email) p.set("customer_email", opts.email);
  p.set("billing_address_collection", "auto");

  const metadata: Record<string, string> = { designation: opts.designation };
  if (opts.tribute) metadata.tribute = opts.tribute.slice(0, 450);
  for (const [k, v] of Object.entries(metadata)) {
    p.set(`metadata[${k}]`, v);
    if (opts.monthly) p.set(`subscription_data[metadata][${k}]`, v);
    else p.set(`payment_intent_data[metadata][${k}]`, v);
  }

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: p,
    cache: "no-store",
  });
  const json = (await res.json()) as { url?: string; error?: { message?: string } };
  if (!res.ok || !json.url) {
    console.error("[stripe] checkout session failed", json.error?.message);
    throw new Error("Checkout could not be started");
  }
  return json.url;
}
