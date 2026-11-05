# Legal Launch Checklist: AB Development

**Target launch: December 25, 2026** · Site: abdevelopment.ai

This checklist lists what the owner should review with the business's **attorney** and **insurance agent** before the website goes live. It is a planning aid, **not legal advice**. Laws and agency rules change, and some items below may not apply (or other items may) depending on how the business is structured and what work it performs.

**All legal pages on the site are drafts.** Each file in `/src/content/legal/*.ts` begins with `"DRAFT: attorney review required before launch."` and contains highlighted `note` blocks and `[bracketed]` placeholders that need a decision. None of them should be published as final until the attorney has approved them.

---

## 1. Business entity & naming

- [ ] Confirm the exact legal entity name (for example, "AB Development LLC") as registered with the NYS Department of State, and enter it as `legalName` in `/src/config/business.ts`.
- [ ] If the business operates under a name that differs from the legal entity name, file an assumed name certificate (DBA) as required, and confirm the website name matches what is on file.
- [ ] Confirm the entity is in good standing and the biennial statement is current.
- [ ] Decide on a business mailing address to publish (or confirm with the attorney that omitting a street address is acceptable for privacy requests, licensing, and advertising rules). Fill in `address` in `/src/config/business.ts`.
- [ ] Consider using a business-domain email address (for example, @abdevelopment.ai) instead of a personal Gmail account for the published contact email, and update `email` in `/src/config/business.ts`.
- [ ] **"Family-Owned" badge and wording.** Confirm the claim is accurate for how the business is owned and run. Also confirm that the site's promise that clients work directly with the owner matches how projects will actually be handled.
- [ ] Optional: certifications such as NYS MWBE, NYC M/WBE, or WBENC can still help with certain public or institutional projects, even though the website no longer advertises "woman-owned." Discuss with your attorney whether to pursue them.

## 2. Contractor licensing & advertising display rules

- [ ] **New York City — DCWP Home Improvement Contractor license.** Confirm whether the license is required for the services offered in the five boroughs, obtain it, and confirm the rules for displaying the license number in advertising (website, social media, print, and vehicles).
- [ ] **Nassau County — Office of Consumer Affairs** home improvement license. Confirm license requirements and advertising/display rules.
- [ ] **Suffolk County — Department of Labor, Licensing & Consumer Affairs** home improvement license. Confirm license requirements and advertising/display rules.
- [ ] **Westchester County — Department of Consumer Protection** home improvement license. Confirm license requirements and advertising/display rules.
- [ ] Confirm whether any town, village, or city in the service area requires a separate local contractor license or registration.
- [ ] For each jurisdiction, confirm how license numbers must appear on the **website**, on **Instagram and other social media** (@abdevelopmentny), in **print**, and on **vehicles and job-site signage**.
- [ ] **NYC Department of Buildings.** Confirm required DOB registrations before filing for or performing permitted work in NYC (for example, General Contractor registration) and any related insurance requirements. Confirm whether the registration number must be displayed.
- [ ] Confirm whether new-home construction (as opposed to home improvement) requires different or additional licenses in any jurisdiction.
- [ ] Fill in each `number` in the `licenses` array in `/src/config/business.ts` once issued. (A license appears on the site only when its number is filled in.)
- [ ] Do not publish "Licensed" in any badge or text until every license required for the advertised service area is actually held.

## 3. Insurance wording

- [ ] Confirm the **"Licensed & Insured"** badge is accurate for **every** jurisdiction and service advertised. If not, change or remove it in `badges` in `/src/config/business.ts`.
- [ ] Confirm commercial **general liability** coverage, limits, and any additional-insured or per-project requirements.
- [ ] Confirm **workers' compensation** and **disability benefits** coverage (required by New York State for employers), and **Paid Family Leave** as applicable.
- [ ] Confirm commercial auto, umbrella/excess, builder's risk, and any other coverage the agent recommends.
- [ ] Confirm the insurance certificates required by NYC DOB, county licensing agencies, and municipalities, and set a process for issuing certificates to clients on request.
- [ ] Confirm with the agent the **exact wording** that may be published (for example, carrier name or coverage descriptions) and fill in the `insurance` fields in `/src/config/business.ts`, or leave `summary` empty to show only the badge.
- [ ] Confirm subcontractors are required to carry their own insurance and provide certificates.

## 4. Contract templates

- [ ] Have the attorney prepare or review the **home improvement contract** template for compliance with NY General Business Law Article 36-A (§ 770 et seq.), including:
  - [ ] Written contract signed by both parties, with the contractor's name, address, phone number, and license number(s).
  - [ ] Description of the work, materials, and approximate start and completion dates.
  - [ ] Agreed price and **payment schedule**.
  - [ ] Notice of the owner's **3-day right to cancel** and the required form of cancellation notice.
  - [ ] **Deposit rules** (escrow account or bond, and required disclosures about how deposits are held).
  - [ ] **Change order** procedure (written and signed).
  - [ ] Any other notices required by state law and by NYC, Nassau, Suffolk, and Westchester rules.
- [ ] Have the attorney prepare or review the **new home construction** contract and **contract of sale** for spec homes, including the **housing merchant implied warranty** under NY General Business Law Article 36-B (§ 777 et seq.) and whether a compliant limited warranty will be offered in its place.
- [ ] Confirm handling of client payments as **trust funds** under NY Lien Law Article 3-A (including § 71-a for home improvement payments, if applicable) and related bookkeeping.
- [ ] Review **mechanic's lien** rights and obligations (for the business, subcontractors, and suppliers) and lien waiver procedures.
- [ ] Include **dispute resolution** terms (negotiation, mediation, arbitration, venue, attorneys' fees) and confirm they are enforceable for consumer contracts.
- [ ] Include allowances, selections deadlines, delay and force-majeure terms, permit responsibilities, site conditions, warranty terms, and insurance requirements.
- [ ] Confirm agreements with architects, engineers, and subcontractors (scope, insurance, indemnity, licensing, IP ownership).

## 5. Website legal pages

- [ ] Attorney reviews all six draft pages:
  - [ ] Privacy Policy — `/src/content/legal/privacy.ts`
  - [ ] Terms of Use — `/src/content/legal/terms.ts`
  - [ ] Project & Estimate Disclaimer — `/src/content/legal/project-disclaimer.ts`
  - [ ] Spec Home Disclaimer — `/src/content/legal/spec-home-disclaimer.ts`
  - [ ] Cookie Policy — `/src/content/legal/cookies.ts`
  - [ ] Accessibility Statement — `/src/content/legal/accessibility.ts`
- [ ] Resolve every `note` block and every `[bracketed]` placeholder (retention periods, venue county, liability cap, jury waiver, response times, review dates).
- [ ] Remove the `"DRAFT: attorney review required before launch."` line from each `intro` array (and any related DRAFT banner) once approved.
- [ ] Update `lastUpdated` in each file to the approval month.
- [ ] Confirm the consent wording on the contact/consultation form matches the policies and is stored with each submission.
- [ ] Confirm every public page links to the legal pages (footer) and the "Cookie Settings" link works.

## 6. Privacy, email & SMS marketing

- [ ] **CAN-SPAM Act.** Marketing emails must have accurate sender and subject information, identify the message as an advertisement where required, include a valid physical postal address, and include a working unsubscribe link honored within 10 business days.
- [ ] **TCPA consent wording.** Attorney approves the opt-in language for marketing texts and calls (prior express written consent, clear disclosure, not a condition of purchase, "Msg & data rates may apply," "Reply STOP to opt out, HELP for help," message frequency).
- [ ] Confirm compliance with New York telemarketing and text-messaging rules (for example, NY General Business Law § 399-z) and the National Do Not Call Registry.
- [ ] **10DLC registration.** If sending business texts from a standard local number, register the brand and campaign through the texting provider before sending.
- [ ] **NY SHIELD Act.** Adopt a written data security program (GBL § 899-bb): designate a responsible person, assess risks, train staff, oversee vendors, and securely dispose of data.
- [ ] Adopt an **incident response plan** for breach notification consistent with GBL § 899-aa.
- [ ] Execute or accept **data processing agreements** / data protection terms with Supabase, Resend, Google (Analytics, Maps, Calendar/Workspace), Vercel, and Cloudflare (if Turnstile is enabled).
- [ ] Adopt a written **data retention schedule** matching the Privacy Policy, and confirm hashed IP addresses are deleted within 24 hours.
- [ ] Enable two-factor authentication for all team accounts and all vendor dashboards.
- [ ] Confirm who handles privacy requests sent to the published email and phone number, and how they are logged.

## 7. Cookies & analytics

- [ ] Verify the cookie banner: no Google Analytics script or cookies load before **Accept**; **Reject** and **Manage** work; choices are stored in `abd_consent` for 12 months; the footer "Cookie Settings" link reopens the choices.
- [ ] Verify withdrawing consent stops Google Analytics on future page views.
- [ ] Set GA4 **data retention** (for example, 2 or 14 months) and update the Privacy Policy to match.
- [ ] Review GA4 data-collection settings: disable Google signals and ad personalization if not needed, and review granular location and device data settings.
- [ ] Decide whether Google Maps and Google Calendar embeds should load only after consent ("click to load"), and update the Cookie Policy.
- [ ] Confirm the cookie list in `/src/content/legal/cookies.ts` matches what the production site actually sets (check in browser developer tools).

## 8. Spec homes & real estate

- [ ] Identify the **broker of record** for spec home listings and confirm the listing workflow (who advertises, who negotiates, who holds deposits).
- [ ] Confirm the website's spec home pages comply with **NYS Department of State** advertising rules for real estate (19 NYCRR Part 175), including brokerage identification.
- [ ] Insert the approved **Equal Housing Opportunity** statement and confirm the EHO logo usage per HUD guidance, the NY State Human Rights Law, and NYS DOS requirements.
- [ ] Confirm the list of protected classes stated on the site under federal, NY State, NYC, and county fair housing laws.
- [ ] Draft the **affiliated-business disclosure** describing the relationship with **Selling Long Island** (sister company), and confirm whether RESPA affiliated business arrangement disclosures or NY Real Property Law § 443 agency disclosures apply.
- [ ] Confirm status tags (Available, Under Contract, Sold) are updated promptly and that pricing is reviewed before publishing.
- [ ] Confirm no listing language could be read as expressing a preference or limitation based on a protected characteristic (for example, describing ideal buyers or neighborhoods).

## 9. Testimonials, photos & endorsements

- [ ] Obtain a signed **release** before publishing any client's photos, videos, name, likeness, home, or testimonial. Use `/docs/PHOTO-TESTIMONIAL-RELEASE-FORM.md` as a starting template once the attorney approves it.
- [ ] Comply with **NY Civil Rights Law §§ 50–51** (right of publicity): written consent is required before using a living person's name, portrait, picture, or voice for advertising or trade purposes.
- [ ] Obtain the **property owner's consent** before photographing or publishing images of a home, including homes no longer owned by the original client.
- [ ] Obtain written **copyright licenses or assignments** from photographers, videographers, and renderers for all images used on the site and social media.
- [ ] Confirm rights to any architect or designer plans or renderings shown.
- [ ] **FTC Endorsement Guides and FTC rule on fake reviews and testimonials:** publish only genuine reviews from real clients; do not write, edit to change meaning, or selectively suppress reviews; disclose any material connection (discounts, payments, family or employee relationships); do not present results as typical unless they are.
- [ ] Confirm consent for images showing children, with a parent or guardian signature.
- [ ] Review photos for house numbers, street signs, license plates, security systems, and valuables before publishing.
- [ ] Replace or clearly label stock/placeholder imagery so it is not presented as AB Development's work.

## 10. Memorial content

- [ ] Obtain the **family's written consent** to use Aman's name, photos, and story on the website and social media, and confirm the exact wording with them.
- [ ] Confirm who in the family can approve future changes or ask for removal, and how removal requests will be handled.
- [ ] Confirm any photos used in the memorial content are licensed or owned.

## 11. Accessibility

- [ ] Commission or perform a **WCAG 2.2 Level AA** audit (automated tools plus manual keyboard and screen reader testing) before launch.
- [ ] Fix issues found, document known limitations, and update `/src/content/legal/accessibility.ts` (including the review date and response time).
- [ ] Confirm alt text, video captions, form labels, color contrast, focus visibility, and reduced-motion behavior on every page.
- [ ] Confirm someone monitors the accessibility contact channels and can respond within the stated time.

## 12. Trademark

- [ ] Run a USPTO trademark search (and a common-law search) for "AB Development" and the AB monogram logo, in the relevant classes (for example, construction services and real estate).
- [ ] Decide whether to file federal trademark applications for the name and logo; consider a NYS trademark registration as well.
- [ ] Use **™** with the name and logo until federal registration is granted. Use **®** only after the USPTO issues a registration.
- [ ] Confirm the footer `trademarkNotice` in `/src/config/business.ts` is accurate.
- [ ] Secure matching domains and social handles, and confirm no conflict with similarly named builders in the service area.

---

## Final sign-off

| Item | Reviewed by | Date |
| --- | --- | --- |
| Business entity & naming | | |
| Contractor licensing & advertising display | | |
| Insurance wording | | |
| Contract templates | | |
| Privacy Policy | | |
| Terms of Use | | |
| Project & Estimate Disclaimer | | |
| Spec Home Disclaimer | | |
| Cookie Policy | | |
| Accessibility Statement | | |
| Email & SMS marketing compliance | | |
| Cookies & analytics configuration | | |
| Spec homes & real estate (broker, EHO, affiliated disclosure) | | |
| Testimonials, photos & endorsements | | |
| Memorial content | | |
| Accessibility audit | | |
| Trademark | | |
| DRAFT banners removed | | |
