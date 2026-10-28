# AB Development: abdevelopment.ai

**Your Dream, Our Build.** The website for AB Development, a woman-owned custom home builder serving Long Island, New York City, and Westchester.

Target public launch: **Friday, December 25, 2026**, with a soft launch December 15 to 18. See [docs/LAUNCH-PLAN.md](docs/LAUNCH-PLAN.md).

---

## Contents

1. [How the site is built](#1-how-the-site-is-built)
2. [Run it on your computer](#2-run-it-on-your-computer)
3. [Where everything lives](#3-where-everything-lives)
4. [Editing content](#4-editing-content)
5. [Photos, videos, and the logo](#5-photos-videos-and-the-logo)
6. [Sister-company links (top bar)](#6-sister-company-links-top-bar)
7. [Environment variables](#7-environment-variables)
8. [Supabase: database and team logins](#8-supabase-database-and-team-logins)
9. [Logins and staff accounts](#9-logins-and-staff-accounts)
10. [Contact form and email (Resend)](#10-contact-form-and-email-resend)
11. [Online booking, Google Analytics, Maps, and Search Console](#11-online-booking-google-analytics-maps-and-search-console)
12. [Deploying to Vercel and connecting abdevelopment.ai](#12-deploying-to-vercel-and-connecting-abdevelopmentai)
13. [Memorial content](#13-memorial-content)
14. [Legal, releases, and licensing](#14-legal-releases-and-licensing)
15. [Security](#15-security)
16. [Commands reference](#16-commands-reference)

---

## 1. How the site is built

| Piece | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16** (App Router, TypeScript) + **Tailwind CSS 4** | Public pages are pre-built as static HTML, so they load fast and score well in search. The same app also handles the form, logins, and dashboard securely on the server, all on Vercel. |
| Database & logins | **Supabase** (Postgres + Auth) | One service covers both the database for form submissions and the team logins, with database-level security rules, invite-only accounts, password reset, and optional two-factor authentication. Clerk handles logins only, so it would need a second service for the data. |
| Email | **Resend** | Simple API, good deliverability, and it works with the Supabase login emails over SMTP. |
| Hosting | **Vercel** | Built for Next.js, automatic HTTPS, and preview links for every change. |

Design system: true black, warm white, charcoal, and a soft muted gold. Headlines use Cormorant Garamond and body text uses Montserrat. All colors are CSS variables in [`src/app/globals.css`](src/app/globals.css).

## 2. Run it on your computer

You need [Node.js](https://nodejs.org) 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # then fill in values (all optional for a first look)
npm run dev                  # open http://localhost:3000
```

The site runs without any keys. Until Supabase and Resend are set up, form submissions are printed in the terminal instead of being saved or emailed, and Team Login shows a "not set up yet" message.

## 3. Where everything lives

Every piece of text, photo path, and setting is in a plain data file. You never need to touch page code to change content.

| What | File |
| --- | --- |
| Business name, phone, email, hours, address, Instagram, licenses, insurance, map, booking link | [`src/config/business.ts`](src/config/business.ts) |
| Sister-company links (top bar + footer) | [`src/config/brands.ts`](src/config/brands.ts) |
| Service area (Long Island, NYC, Westchester) | [`src/config/serviceArea.ts`](src/config/serviceArea.ts) |
| The six services | [`src/config/services.ts`](src/config/services.ts) |
| Contact form dropdowns and consent wording | [`src/config/contactForm.ts`](src/config/contactForm.ts) |
| Navigation menu | [`src/config/site.ts`](src/config/site.ts) |
| Home page copy | [`src/content/home.ts`](src/content/home.ts) |
| About page: story, memorial line, leadership, values | [`src/content/about.ts`](src/content/about.ts) |
| Gallery items | [`src/content/gallery.ts`](src/content/gallery.ts) |
| FAQ | [`src/content/faq.ts`](src/content/faq.ts) |
| Testimonials | [`src/content/testimonials.ts`](src/content/testimonials.ts) |
| Legal pages | [`src/content/legal/`](src/content/legal/) |

## 4. Editing content

Open the file, change the text between the quotation marks, save, and push to GitHub. Vercel redeploys automatically in about a minute. You can edit files directly on github.com: open a file, click the pencil icon, then **Commit changes**.

Tips:
- Keep the quotation marks and commas. If a sentence contains a double quote, use a single quote instead, or ask your developer.
- **FAQ:** every answer is marked as a draft. After you approve an answer, set `reviewed: true` on it. That removes its "Draft answer" tag and lets search engines show it.
- **Testimonials:** replace the placeholder slots with real reviews only after the client signs a release (see [section 14](#14-legal-releases-and-licensing)), then set `placeholder: false`.
- **Leadership bios and quotes** are placeholders in [`src/content/about.ts`](src/content/about.ts).
- **Legal pages:** text is in [`src/content/legal/`](src/content/legal/). `{{email}}`, `{{phone}}`, and similar tokens fill in automatically from `business.ts`. Remove the `"DRAFT: attorney review required before launch."` line from each file's `intro` only after your attorney approves it.

## 5. Photos, videos, and the logo

All placeholders are elegant line drawings labeled **PLACEHOLDER**, so nothing temporary can be mistaken for a real project.

**Gallery photo:** put the image in `public/images/gallery/`, for example `public/images/gallery/oyster-bay-kitchen.jpg`. In [`src/content/gallery.ts`](src/content/gallery.ts), copy an item, give it a unique `slug` (this becomes its share link, `abdevelopment.ai/gallery/<slug>`), set `src` to `"/images/gallery/oyster-bay-kitchen.jpg"`, write a description of the photo in `alt`, pick a `category`, and remove `placeholder: true`. JPG or WebP about 2400px wide is ideal. The site automatically serves resized AVIF/WebP versions.

**Gallery video:** put the `.mp4` in `public/videos/`, set `media: "video"`, `src: "/videos/your-file.mp4"`, and `poster` to a still image. Keep videos under about 20 MB. For longer films, host on YouTube, Vimeo, or Vercel Blob and ask your developer to link them.

**Spec homes:** set `category: "spec-homes"` and optionally `specStatus: "Available" | "Under Contract" | "Sold"`. Each spec home gets an **Inquire** button. Add `listingUrl` later to link to a Selling Long Island listing.

**Hero, services, and story images:** change `image.src` in [`src/content/home.ts`](src/content/home.ts) and [`src/config/services.ts`](src/config/services.ts). An optional hero background video can go in `hero.video`.

**Portrait of Aman and Birti:** add the photo to `public/images/about/` and set `portrait.src` in [`src/content/about.ts`](src/content/about.ts).

**Leadership photos:** Birti's and Anjleen's photos are in `public/images/team/`. Replace those files, or change `photo.src`.

**Logo:** replace `public/logo.jpeg` with the real logo (white linework on black). On the next build, the site automatically generates the trimmed header logo, the favicon and app icons (from the AB monogram), and the 1200×630 social preview image. To preview locally, run `npm run brand`. The current file is a stand-in.

## 6. Sister-company links (top bar)

Edit [`src/config/brands.ts`](src/config/brands.ts). While a `url` is empty (`""`), the name shows as non-clickable with a "Coming Soon" tooltip. Paste the full address, for example `"https://sellinglongisland.com"`, and it becomes a live link that opens in a new tab, in both the top bar and the footer.

## 7. Environment variables

Set these in **Vercel → Project → Settings → Environment Variables** (Production and Preview), and in `.env.local` for local work. See [`.env.example`](.env.example).

| Variable | Required | What it is |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes | `https://abdevelopment.ai` (locally `http://localhost:3000`) |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase → Project Settings → API → Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase → API → `anon` / publishable key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Supabase → API → `service_role` / secret key. **Server only: never share it.** |
| `RESEND_API_KEY` | Yes | Resend → API Keys |
| `EMAIL_FROM` | Yes | e.g. `AB Development <hello@abdevelopment.ai>` (domain must be verified in Resend) |
| `CONTACT_TO_EMAIL` | No | Where inquiries go. Defaults to Abdevelopsli@gmail.com |
| `RATE_LIMIT_SALT` | Yes | Any long random string (`openssl rand -hex 32`) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics 4 ID, `G-XXXXXXX` |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` / `TURNSTILE_SECRET_KEY` | No | Cloudflare Turnstile spam check |

After changing variables in Vercel, redeploy: **Deployments → … → Redeploy**.

## 8. Supabase: database and team logins

1. Create a free project at [supabase.com](https://supabase.com). Choose the **East US** region.
2. **Create the tables:** go to **SQL Editor → New query**, paste the contents of [`supabase/migrations/0001_initial_schema.sql`](supabase/migrations/0001_initial_schema.sql), and click **Run**.
3. **Turn off public sign-up:** go to **Authentication → Sign In / Providers**, and under **Email**, turn **off** "Allow new users to sign up". Invitations still work.
4. **URLs:** go to **Authentication → URL Configuration**. Set **Site URL** to `https://abdevelopment.ai`. Under **Redirect URLs**, add `https://abdevelopment.ai/**`, `http://localhost:3000/**`, and your Vercel preview domain, e.g. `https://*-yourteam.vercel.app/**`.
5. **Email templates:** go to **Authentication → Email Templates** and change each link as follows:
   - **Invite user:** `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=invite&next=/reset-password`
   - **Reset password:** `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/reset-password`

   You can also restyle the email text.
6. **Send login emails through Resend:** Supabase's built-in email is limited to a few messages per hour. Go to **Project Settings → Authentication → SMTP Settings**, enable custom SMTP, and enter host `smtp.resend.com`, port `465`, username `resend`, password = your Resend API key, sender `hello@abdevelopment.ai`.
7. **Two-factor (optional):** authenticator-app (TOTP) MFA is on by default in Supabase. Each person turns it on for themselves under **Dashboard → Security**.
8. Copy the three keys into Vercel (see [section 7](#7-environment-variables)).

## 9. Logins and staff accounts

**Roles**
- `admin`: everything, including the **Team** page (invite and remove people, change roles).
- `staff`: can sign in and view the dashboard, submissions, and consultations, and update a submission's status and notes. Cannot manage users or roles.
- `client`: reserved for a future client portal. It has no dashboard access and lands on a "coming soon" page.

Every dashboard page and action checks the person's session and role **on the server**, and the database's own security rules check them again. Hiding a button is never the only protection.

**Create the first admin (Birti) and Anjleen's account**
1. Finish [section 8](#8-supabase-database-and-team-logins) and put the keys in `.env.local`.
2. Open [`scripts/seed-team.mjs`](scripts/seed-team.mjs) and replace the two placeholder emails, or set `SEED_OWNER_EMAIL` and `SEED_MD_EMAIL` in `.env.local`.
3. Run `npm run seed:team`. Birti is invited as **admin (Owner)** and Anjleen as **staff (Managing Director)**.
4. Each of them clicks the link in the invitation email, chooses a password, and is taken to the dashboard.

*No terminal?* In Supabase, go to **Authentication → Users → Invite user** and invite Birti. Then go to **SQL Editor** and run:
`update public.profiles set role = 'admin', full_name = 'Birti Kaur', title = 'Owner' where email = 'birti@…';`

**Add an employee:** sign in as an admin, go to **Dashboard → Team → Invite a team member**, and enter their name, title, email, and role. They receive an email to set their password.
**Change a role or title:** edit it on the Team page and click **Save Changes**. The site always keeps at least one admin.
**Remove someone:** on the Team page, click **Remove from team**. Their account is deleted immediately.
**Forgot password:** use the link on the login page.
**Sign-in protection:** after repeated sign-in attempts, login is paused for 15 minutes for that email and that network.

Team Login is linked discreetly in the top bar, the mobile menu, and the footer: `abdevelopment.ai/login`.

## 10. Contact form and email (Resend)

When someone submits the Contact / Book form:
1. It is checked for spam. There is a hidden honeypot field, a too-fast-to-be-human check, a limit of 5 submissions per 10 minutes per network, and optionally Cloudflare Turnstile.
2. Every field is validated and cleaned on the server.
3. The submission is saved to the database. The visitor's consent to the Privacy Policy and Terms, plus any opt-in to marketing emails or texts, is logged with a timestamp and the exact wording they saw.
4. A notification is emailed to **Abdevelopsli@gmail.com**, with reply-to set to the client, and the client gets a branded confirmation email.
5. The submission appears in **Dashboard → Submissions**. If they chose a preferred date, it also appears under **Consultations**. Staff can set the confirmed consultation time, status, and internal notes.

**Resend setup**
1. Sign up at [resend.com](https://resend.com), ideally with Abdevelopsli@gmail.com.
2. Go to **Domains → Add domain → `abdevelopment.ai`** and add the DNS records it shows (SPF, DKIM, and the MX record for the `send` subdomain) wherever your DNS is managed (see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)). Wait for **Verified**.
3. Go to **API Keys → Create**, then set `RESEND_API_KEY` and `EMAIL_FROM="AB Development <hello@abdevelopment.ai>"` in Vercel.

Until the domain is verified, Resend only delivers to your own account email, so client confirmation emails won't arrive.

If you change any consent wording in [`src/config/contactForm.ts`](src/config/contactForm.ts), also change `consentVersion` so the records show which wording each person agreed to.

## 11. Online booking, Google Analytics, Maps, and Search Console

Step-by-step instructions are in **[docs/GOOGLE-TOOLS.md](docs/GOOGLE-TOOLS.md)**. In short:
- **Booking:** create a Google Calendar appointment schedule, copy its embed URL, and paste it into `bookingEmbedUrl` in [`src/config/business.ts`](src/config/business.ts).
- **Analytics:** create a GA4 property and set `NEXT_PUBLIC_GA_MEASUREMENT_ID`. It loads only after a visitor accepts analytics cookies.
- **Map:** already embedded and centered on the whole service area. Change it with `mapEmbedUrl`.
- **Search Console:** verify `abdevelopment.ai` and submit `https://abdevelopment.ai/sitemap.xml`.

## 12. Deploying to Vercel and connecting abdevelopment.ai

Full walkthrough with DNS records: **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**. Short version: import the GitHub repo in Vercel, add the environment variables, deploy, then add `abdevelopment.ai` and `www.abdevelopment.ai` under **Settings → Domains** and create the DNS records Vercel shows.

## 13. Memorial content

Aman's story and the "In Loving Memory of Aman" line live in [`src/content/about.ts`](src/content/about.ts):
- **Edit the memorial line:** change `memorial.text`.
- **Remove the memorial line:** set `memorial.show` to `false`.
- **Edit the story:** each paragraph is one string in `story.paragraphs`. The large pull-quote is `story.pullQuote`, and `pullQuoteAfterParagraph` controls where it appears.
- The home page teaser in [`src/content/home.ts`](src/content/home.ts) (`storyTeaser`) mentions the story without naming Aman. Edit it there if needed.
- Aman is intentionally not listed as a staff member.

## 14. Legal, releases, and licensing

- **All six legal pages are drafts.** Each shows "DRAFT: attorney review required before launch." Work through [docs/LEGAL-LAUNCH-CHECKLIST.md](docs/LEGAL-LAUNCH-CHECKLIST.md) with your attorney and insurance agent.
- **Photo and testimonial releases:** before publishing any client's photos, home, name, or review, get a signed release. A template is in [docs/PHOTO-TESTIMONIAL-RELEASE-FORM.md](docs/PHOTO-TESTIMONIAL-RELEASE-FORM.md). Record the date in the testimonial's `releaseSignedOn` field.
- **Contractor licenses:** add license numbers in the `licenses` list in [`src/config/business.ts`](src/config/business.ts) for NYC DCWP, Nassau, Suffolk, and Westchester. Each appears in the footer and on the Contact page once its number is filled in. Confirm each jurisdiction's advertising rules first; many require the number on all advertising, including websites.
- **Insurance:** fill `insurance.summary` only with wording your agent approves.
- **Trademark:** the footer uses a ™-style notice. Switch to ® only after federal registration.
- **Spec homes:** the Equal Housing Opportunity statement is a placeholder in the Spec Home Disclaimer.

## 15. Security

- HTTPS only, with HSTS (preload-ready), a strict Content Security Policy, `X-Frame-Options: DENY`, `nosniff`, a strict referrer policy, and a locked-down permissions policy. All are set in [`next.config.ts`](next.config.ts). If you add a new third-party embed, add its domain to the CSP there.
- Rate limiting on the contact form, login, and password reset. It is shared across servers through the database, and IP addresses are stored only as salted one-way hashes that are deleted within about a day.
- All input is validated and sanitized on the server. Emails escape all user text.
- Secrets (service-role key, Resend key) are server-only. Variables without `NEXT_PUBLIC_` never reach browsers.
- Database Row Level Security: anonymous visitors have no direct table access. Staff can change only status, scheduling, and notes on submissions. Consent records are read-only.
- Private pages (`/dashboard`, `/login`, …) are excluded from search engines.

## 16. Commands reference

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the site locally at http://localhost:3000 |
| `npm run build` | Production build (also regenerates logo-based icons) |
| `npm run check` | Typecheck + lint + formatting check |
| `npm run format` | Auto-format all code |
| `npm run brand` | Regenerate favicon, icons, header logo, and social image from `public/logo.jpeg` |
| `npm run placeholders` | Regenerate the placeholder illustrations |
| `npm run seed:team` | Invite Birti (admin) and Anjleen (staff) |
