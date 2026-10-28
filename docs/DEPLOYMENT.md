# Deploying to Vercel and connecting abdevelopment.ai

## 1. Put the code on GitHub
The project lives in the GitHub repository `apaidev/abdev`. Every push to the main branch deploys to production. Every other branch gets its own preview link.

## 2. Create the Vercel project
1. Sign in at [vercel.com](https://vercel.com) with GitHub.
2. Click **Add New… → Project**, choose `apaidev/abdev`, and click **Import**.
3. Leave the framework as **Next.js** and keep the default build settings. `npm run build` automatically regenerates the icons from the logo first.
4. Open **Environment Variables** and add every variable from the README's [Environment variables](../README.md#7-environment-variables) section. Add each one for **Production** and **Preview**. For Preview, set `NEXT_PUBLIC_SITE_URL` to your preview domain or leave it as the production URL.
5. Click **Deploy**. In about two minutes you'll get a `*.vercel.app` link to check.

## 3. Connect the domain
1. In the Vercel project, go to **Settings → Domains**, add `abdevelopment.ai`, then add `www.abdevelopment.ai`. Set `www` to **redirect** to `abdevelopment.ai`.
2. Vercel shows the exact DNS records to create. Use the values Vercel displays, which may be newer than the ones below. At the company where you bought the `.ai` domain (for example Namecheap, GoDaddy, Porkbun, or Cloudflare), open DNS settings and create:

| Type | Name / Host | Value | TTL |
| --- | --- | --- | --- |
| `A` | `@` | `76.76.21.21` (or the IP Vercel shows, e.g. `216.198.79.1`) | Auto / 3600 |
| `CNAME` | `www` | `cname.vercel-dns.com` (or the project-specific value Vercel shows) | Auto / 3600 |

   Delete any older `A`, `AAAA`, or `CNAME` records for `@` or `www` that point elsewhere, such as a registrar parking page.
3. **Alternative:** switch the domain's nameservers to `ns1.vercel-dns.com` and `ns2.vercel-dns.com` and manage all DNS inside Vercel. That's simpler long-term, but you'll need to re-create any email records there.
4. Wait for both domains to show **Valid Configuration**. This usually takes minutes but can take up to 48 hours. Vercel issues the HTTPS certificate automatically.

## 4. Email DNS records (Resend)
In Resend, go to **Domains → abdevelopment.ai** and add each record it lists to the same DNS provider. These are typically:
- `TXT` on `send` (SPF): `v=spf1 include:amazonses.com ~all`
- `MX` on `send`: `feedback-smtp.us-east-1.amazonses.com` (priority 10)
- `TXT` on `resend._domainkey` (DKIM): a long key Resend provides
- Recommended: `TXT` on `_dmarc`: `v=DMARC1; p=none; rua=mailto:Abdevelopsli@gmail.com`

Copy the exact values from Resend. Don't type them from this list.

## 5. Google Search Console verification
Add the `TXT` record Google gives you (see [GOOGLE-TOOLS.md](GOOGLE-TOOLS.md)) to the same DNS provider.

## 6. After the domain works
- In Supabase, go to **Authentication → URL Configuration** and make sure **Site URL** is `https://abdevelopment.ai`.
- Submit the sitemap in Search Console.
- Test the contact form, invitation, and password reset on the live domain (see the pre-launch checklist in [LAUNCH-PLAN.md](LAUNCH-PLAN.md)).
- Optional: in Vercel, go to **Settings → Analytics / Speed Insights** to monitor performance. If you enable it, update the Privacy and Cookie policies.
