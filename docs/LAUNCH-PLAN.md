# Launch plan: abdevelopment.ai

**Public launch:** Friday, December 25, 2026
**Recommended soft launch:** Tuesday, December 15 to Friday, December 18, 2026. Go live on the real domain without announcing it, test everything, and fix issues before the public date.

The site's code, design system, and all pages were built in week 1. The remaining weeks are mostly **content, accounts, review, and testing**, which leaves more buffer than the original plan.

## Timeline (planned backward from December 25)

| Week | Dates (2026) | Original milestone | Status / what's left |
| --- | --- | --- | --- |
| 1 | Oct 26 – Nov 1 | Design system, top bar, Home, About | ✅ Built. Also built early: Gallery, FAQ, Contact, auth, dashboard, legal drafts. |
| 2 | Nov 2 – Nov 8 | (Home & About polish) | Review the site on your phone and computer and send feedback. Add the real logo at `public/logo.jpeg`. Write leadership bios and quotes. |
| 3 | Nov 9 – Nov 15 | Gallery, FAQ, Contact, booking | Review all FAQ answers. Set up the Google Calendar booking page. Collect project photos and signed client releases. |
| 4 | Nov 16 – Nov 22 | (Gallery, FAQ, Contact polish) | Create Supabase and Resend accounts. Buy/confirm the domain DNS access. Send the legal pages to your attorney. |
| 5 | Nov 23 – Nov 29 | Auth, staff dashboard, legal pages | Run `npm run seed:team` and have Birti and Anjleen sign in. Turn on two-factor for Birti. (Thanksgiving is Nov 26, so plan a light week.) |
| 6 | Nov 30 – Dec 6 | (Auth & legal polish) | Get license numbers and approved insurance wording into `business.ts`. Get the attorney's comments back. |
| 7 | Dec 7 – Dec 13 | Content, photos, SEO, accessibility pass | Replace placeholder photos. Finalize copy. Set up GA4 and Search Console. Run Lighthouse and a keyboard-only test. |
| 8 | Dec 14 – Dec 20 | Testing, attorney review, DNS & Vercel | Connect the domain. **Soft launch Dec 15–18.** Work through the checklist below. Remove the DRAFT banners once the attorney signs off. |
| 9 | Dec 21 – Dec 25 | Buffer and launch | Final fixes only, no new features. **Launch Friday, Dec 25.** Announce it on Instagram @abdevelopmentny. |

## Pre-launch checklist

### Content
- [ ] Real logo uploaded (`public/logo.jpeg`), and the favicon and social preview look right when the link is shared in iMessage or WhatsApp
- [ ] Address added in `src/config/business.ts` (or a decision to keep it unlisted)
- [ ] Leadership bios and quotes written (`src/content/about.ts`)
- [ ] Portrait of Aman and Birti added (or slot hidden)
- [ ] Memorial line wording confirmed with family
- [ ] All six service descriptions reviewed (`src/config/services.ts`)
- [ ] Every FAQ answer reviewed and marked `reviewed: true`
- [ ] Testimonials: real, released reviews, or the section removed
- [ ] Spelling and grammar checked on every page

### Photos and video
- [ ] Hero image (or video) replaced
- [ ] Service images replaced
- [ ] At least 12 gallery items with real photos; no `placeholder: true` left
- [ ] Every photo has descriptive alt text
- [ ] Signed release on file for every client home, person, or name shown
- [ ] No house numbers, street signs, or security details visible in photos

### Licenses, insurance, and legal
- [ ] License numbers added for every jurisdiction where required (NYC DCWP, Nassau, Suffolk, Westchester)
- [ ] Insurance wording approved by your agent
- [ ] Attorney reviewed all six legal pages and the consent wording; DRAFT lines removed
- [ ] Equal Housing Opportunity statement inserted (Spec Home Disclaimer)
- [ ] Legal entity name confirmed (`legalName`)
- [ ] Everything in [LEGAL-LAUNCH-CHECKLIST.md](LEGAL-LAUNCH-CHECKLIST.md) signed off

### Accounts, emails, and keys
- [ ] Supabase project created, schema run, public sign-up **off**, email templates and SMTP set
- [ ] Resend domain verified; `EMAIL_FROM` uses `@abdevelopment.ai`
- [ ] All environment variables set in Vercel (Production and Preview)
- [ ] Birti (admin) and Anjleen (staff) signed in successfully; two-factor on for Birti
- [ ] Sister-company URLs added in `src/config/brands.ts` (or left as Coming Soon)

### Forms tested (on the live domain)
- [ ] Submit the contact form: notification arrives at Abdevelopsli@gmail.com and the confirmation arrives at the client's address (check spam folders)
- [ ] Submission appears in Dashboard → Submissions with consent details
- [ ] A preferred date shows under Consultations; setting a time moves it to Scheduled
- [ ] "Other" region shows the friendly note
- [ ] Validation messages appear for missing fields
- [ ] Booking calendar embed loads and a test booking lands in Google Calendar
- [ ] Password reset email works; invitation email works
- [ ] Staff account cannot open `/dashboard/team`

### DNS and analytics
- [ ] `abdevelopment.ai` and `www` both show Valid Configuration in Vercel, `www` redirects, HTTPS works
- [ ] Search Console verified and `sitemap.xml` submitted
- [ ] GA4 receives a visit only **after** clicking Accept on the cookie banner (check GA4 → Realtime)
- [ ] Google Business Profile created with matching name, phone, and website

### Mobile and accessibility
- [ ] Tested on an iPhone and an Android phone: menu, click-to-call, form, gallery lightbox, share button
- [ ] Tested on desktop Chrome, Safari, Firefox, and Edge
- [ ] Keyboard-only: Tab through every page; focus is always visible; the lightbox and menu close with Esc
- [ ] With "Reduce motion" turned on in phone settings, animations are off
- [ ] Lighthouse (Chrome DevTools → Lighthouse → Mobile) scores 90+ in all four categories on Home, About, Gallery, and Contact
