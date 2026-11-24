# Steps4Stackzz Foundation

**Honoring His Life By Cherishing Ours.** The website for Steps4Stackzz Foundation, established in loving memory of Amanpreet Singh.

This is a self-contained Next.js app inside the AB Development repository. It has its own dependencies and deploys as its own Vercel project. Nothing here affects abdevelopment.ai.

## Pages

| Page | Address | Content file |
| --- | --- | --- |
| Home | `/` | `src/app/page.tsx` (copy), `src/content/photos.ts` (portrait) |
| His Legacy | `/legacy` | `src/content/legacy.ts`, `src/content/photos.ts`, `src/content/memories.ts` |
| Our Mission | `/mission` | `src/content/pillars.ts` |
| Events | `/events`, `/events/<slug>` | `src/content/events.ts` |
| Give Back | `/give` | `src/config/giving.ts`, `src/content/pillars.ts` |
| Get Involved | `/get-involved` | `src/config/giving.ts` (`involvementTypes`) |
| Our Impact | `/impact` | `src/content/impact.ts` |
| Contact Us | `/contact` | `src/config/site.ts` |
| Privacy | `/privacy` | `src/app/privacy/page.tsx` |

Foundation-wide details (name, tagline, Instagram accounts, public email, tax status) are in `src/config/site.ts`.

Every content file starts with a comment explaining how to edit it. Change the text between the quotation marks, commit, and Vercel redeploys in about a minute.

## Run it locally

You need Node.js 20.9 or newer.

```bash
cd steps4stackzz
npm install
cp .env.example .env.local   # optional for a first look
npm run dev                  # http://localhost:3000
```

Without any keys, every form works and submissions are printed in the terminal instead of emailed.

## Photographs of Amanpreet

Only original photographs are used: no AI enhancement, reconstruction, filters, or retouching. The site never alters colors or faces; it only resizes and compresses for fast loading.

1. Put the original file in `public/images/amanpreet/`.
2. In `src/content/photos.ts`, set `src` (e.g. `"/images/amanpreet/portrait.jpg"`) and describe the photo in `alt`.
3. If the framing cuts off his face, set `position`, e.g. `"50% 20%"`.

Slots: `homePortrait` (home page), `legacyPortrait` (His Legacy), and `gallery` (any number). Until a photo is added, a quiet "Photograph to come" frame is shown.

## Events

Edit `src/content/events.ts`. Events move from Upcoming to Past automatically after their date (pages refresh hourly). Registration closes automatically at the start time.

- **Memorial Walk:** Wednesday, November 25, 2026, 3:30 PM, Wantagh Park. Add a `meetingPoint` once it is decided.
- **May 25, 2027:** time and location are "to be announced". It is titled "Spring Gathering" as a placeholder; rename it when the event is set, fill in `start` with a time, remove `timeTbd`, add the `location`, and change `registration` to `"open"`.
- **After an event:** add a few paragraphs to `recap` and photos to `photos` (files go in `public/images/events/`).

## Memories

Memories shared on the His Legacy page are emailed privately, with any attached photos. Nothing is published automatically. When the family wants to show one (and the writer chose "Yes, the family may share"), add it to `src/content/memories.ts`.

## Impact

`src/content/impact.ts` holds the four measures (meals distributed, educational opportunities funded, religious institutions supported, community projects completed). Each shows "To be recorded" until you enter a real number. Add completed milestones to `milestones`. Record only work that has actually happened.

Completed work and fundraising goals for each pillar live in `src/content/pillars.ts` (`completed`, `goal`). Fundraising campaigns live in `src/config/giving.ts` (`campaigns`).

## Giving and Stripe

The Give Back page supports one-time and monthly gifts, preset or custom amounts, designated causes (Education, Faith, Community, Memorial Walk and events, or where needed most), and gifts in honor or memory of someone.

- **Until Stripe is connected**, the form collects pledges and emails them to you so you can follow up personally.
- **To open online giving**, create the foundation's Stripe account, then set `STRIPE_SECRET_KEY` in Vercel and redeploy. Donors are sent to Stripe Checkout, Stripe's own secure page; card details never touch this site. Stripe emails the receipt. Designation and tribute are saved on each payment in Stripe (metadata).
- Monthly donors cancel by contacting you; cancel their subscription in the Stripe dashboard.

**Tax status:** the site never says gifts are tax deductible and never mentions registered nonprofit status. Once your status is officially confirmed, set `taxStatus.confirmed` to `true` in `src/config/site.ts` and paste the exact wording approved by your accountant or attorney into `taxStatus.statement`. Before soliciting donations, confirm with them whether the foundation must register with the New York State Attorney General's Charities Bureau.

## Email (Resend)

1. Create an account at resend.com and verify the foundation's domain.
2. In Vercel, set `RESEND_API_KEY`, `EMAIL_FROM` (e.g. `Steps4Stackzz Foundation <hello@your-domain.org>`), and `CONTACT_TO_EMAIL` (the inbox that receives submissions).
3. Optional newsletter list: create a segment in Resend and set `RESEND_NEWSLETTER_SEGMENT_ID`. Signups (and anyone who ticks "send me updates") are added to it, and you can send broadcasts from Resend.

Each form sends a notification to `CONTACT_TO_EMAIL` (reply-to set to the person) and a short confirmation to the person.

Spam protection: hidden honeypot field, a too-fast-to-be-human check, and a per-connection rate limit.

## Deploying to Vercel

1. In Vercel, **Add New → Project**, import this repository.
2. Set **Root Directory** to `steps4stackzz`. Framework: Next.js.
3. Add the environment variables above, plus `NEXT_PUBLIC_SITE_URL` (your domain, e.g. `https://steps4stackzz.org`).
4. Deploy, then add your domain under **Settings → Domains**.

## Logo

The official logo is stored unchanged in `brand-source/logo-original.png`. Before each build, `scripts/generate-brand-assets.mjs` removes its background and creates the light and dark versions, the roof mark, the favicon, and the social sharing image. It never redraws the artwork. To update the logo, replace that file and rebuild (or run `npm run brand`).

## Design

Colors are defined once in `src/app/globals.css`: deep burgundy `#450B1C`, dusty rose `#C87989`, soft blush `#EBC4CA`, warm ivory `#FFF5E9`. Headlines use Cormorant Garamond, body text uses DM Sans.

## Before launch

- [ ] Add original photographs of Amanpreet (`src/content/photos.ts`).
- [ ] Family review of the His Legacy text (`src/content/legacy.ts`) and pillar descriptions (`src/content/pillars.ts`).
- [ ] Set up Resend and the receiving inbox, then send a test through each form.
- [ ] Add a public email in `src/config/site.ts` if you want one shown.
- [ ] Rename the May 25, 2027 event once it is planned.
- [ ] Connect Stripe when the foundation's account is ready.
- [ ] Review the privacy page.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build (also regenerates logo files) |
| `npm run check` | Typecheck, lint, and formatting check |
| `npm run format` | Format all code |
| `npm run brand` | Regenerate logo files and icons |
