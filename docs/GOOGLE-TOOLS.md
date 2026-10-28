# Google tools setup

## Google Calendar appointment scheduling (online booking)
Appointment schedules work with a regular Google account. Some extras, like multiple booking pages, payments, and automatic reminders, need Google Workspace or a Google One premium plan.

1. Go to [calendar.google.com](https://calendar.google.com) and sign in with the account that should receive bookings (e.g. Abdevelopsli@gmail.com).
2. Click **Create → Appointment schedule**.
3. Title: **Consultation with AB Development**. Set the duration (e.g. 45 minutes), your weekly availability, buffer time, maximum bookings per day, and how far ahead people can book.
4. Under **Booking form**, keep name, email, and phone, and add a question like "Property town and project type".
5. Click **Save**.
6. Open the schedule and click **Share**. Under **Website embed**, choose **Inline schedule**, and copy the code.
7. From the copied code, take only the address inside `src="…"`. It looks like `https://calendar.google.com/calendar/appointments/schedules/AcZssZ…?gv=true`.
8. Paste it into `bookingEmbedUrl` in [`src/config/business.ts`](../src/config/business.ts) and commit. The Contact page's "Schedule a Consultation" section now shows your live calendar.

Bookings go straight to Google Calendar. To track them in the dashboard too, staff can set the consultation time on the matching submission.

## Google Analytics 4
1. Go to [analytics.google.com](https://analytics.google.com) and click **Admin → Create → Property**. Name it **AB Development**, set the time zone to New York, and the currency to USD.
2. Choose the **Web** platform, enter `https://abdevelopment.ai`, and name the stream **Website**.
3. Copy the **Measurement ID** (`G-XXXXXXXXXX`).
4. In Vercel, add the environment variable `NEXT_PUBLIC_GA_MEASUREMENT_ID` with that ID, then redeploy.
5. Recommended: go to **Admin → Data Settings → Data Retention** and choose 14 months, matching the Privacy Policy draft. Also go to **Admin → Data collection** and leave Google Signals off unless your attorney approves it.

Analytics loads only after a visitor clicks **Accept**, or turns on Analytics under **Manage**. Visitors can change their choice any time with **Cookie Settings** in the footer.

## Google Maps embed
The Contact page map needs no API key. It's centered at latitude 40.86, longitude −73.35, zoom 8, which shows Westchester, all five boroughs, and Long Island out to Montauk. To change it, edit `mapEmbedUrl` in [`src/config/business.ts`](../src/config/business.ts).

## Google Search Console (getting found on Google)
1. Go to [search.google.com/search-console](https://search.google.com/search-console) and click **Add property**.
2. Choose **Domain**, enter `abdevelopment.ai`, and click **Continue**.
3. Google shows a `TXT` record (`google-site-verification=…`). Add it in your DNS provider (see [DEPLOYMENT.md](DEPLOYMENT.md)): Type `TXT`, Name `@`, Value as shown. Click **Verify**. Retry after an hour if it doesn't verify right away.
4. In the left menu, go to **Sitemaps**, enter `sitemap.xml`, and click **Submit**. The full URL is `https://abdevelopment.ai/sitemap.xml`.
5. Use **URL Inspection → Request indexing** for the Home, About, Gallery, and Contact pages after launch.

## Strongly recommended: Google Business Profile
For local search ("custom home builder near me"), create a free profile at [business.google.com](https://business.google.com) as a **service-area business**. Hide the street address if you don't serve clients at an office, and list Nassau County, Suffolk County, the five boroughs, and Westchester County as service areas. Use the same name, phone, and website as the site, and link `@abdevelopmentny`.
