/**
 * SEED THE FIRST TEAM ACCOUNTS
 * ----------------------------------------------------------------------------
 * Invites Birti (admin) and Anjleen (staff) and sets their roles.
 * Each person receives an email with a link to choose their password.
 *
 * 1. Fill in the two emails below (or set SEED_OWNER_EMAIL / SEED_MD_EMAIL).
 * 2. Make sure .env.local has NEXT_PUBLIC_SUPABASE_URL,
 *    SUPABASE_SERVICE_ROLE_KEY, and NEXT_PUBLIC_SITE_URL.
 * 3. Run:  npm run seed:team
 *
 * Safe to run more than once: existing accounts just get their role updated.
 */
import { createClient } from "@supabase/supabase-js";

const TEAM = [
  {
    email: process.env.SEED_OWNER_EMAIL || "birti@example.com", // TODO: Birti's email
    full_name: "Birti Kaur",
    title: "Owner",
    role: "admin",
  },
  {
    email: process.env.SEED_MD_EMAIL || "anjleen@example.com", // TODO: Anjleen's email
    full_name: "Anjleen Kaur",
    title: "Managing Director",
    role: "staff",
  },
];

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://abdevelopment.ai").replace(/\/$/, "");

if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them to .env.local first.");
  process.exit(1);
}
if (TEAM.some((m) => m.email.endsWith("@example.com"))) {
  console.error("Replace the placeholder emails in scripts/seed-team.mjs (or set SEED_OWNER_EMAIL and SEED_MD_EMAIL).");
  process.exit(1);
}

const admin = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

const { data: existing, error: listError } = await admin.auth.admin.listUsers({ perPage: 1000 });
if (listError) {
  console.error("Could not reach Supabase:", listError.message);
  process.exit(1);
}

for (const member of TEAM) {
  const email = member.email.trim().toLowerCase();
  let user = existing.users.find((u) => u.email?.toLowerCase() === email);

  if (!user) {
    const { data, error } = await admin.auth.admin.inviteUserByEmail(email, {
      data: { full_name: member.full_name, title: member.title },
      redirectTo: `${siteUrl}/auth/confirm?next=/reset-password`,
    });
    if (error) {
      console.error(`✗ Could not invite ${email}: ${error.message}`);
      continue;
    }
    user = data.user;
    console.log(`✓ Invitation emailed to ${email}`);
  } else {
    console.log(`• ${email} already has an account`);
  }

  const { error } = await admin
    .from("profiles")
    .upsert({ id: user.id, email, full_name: member.full_name, title: member.title, role: member.role });
  if (error) console.error(`✗ Could not set role for ${email}: ${error.message}`);
  else console.log(`✓ ${member.full_name} → ${member.role}`);
}
