# What we still need from Dental Krafts

The site can be built and launched without these: each one has a placeholder or a safe default in the build. Send this list to the clinic today. Items marked **Before launch** should be answered before the site goes live.

## Before launch

| # | Item | Why | Default until answered |
|---|---|---|---|
| 1 | **Where booking requests should go**: email address, WhatsApp number, Practo, or a CRM | The form needs a destination (`BOOKING_ENDPOINT`) | Form posts to Formspree/Google Sheet set up by us, emailed to kraftsdental@gmail.com; WhatsApp fallback to +91 98104 48720 |
| 2 | **Domain and hosting access** (dentalkrafts.com DNS, current host login) | To point the domain at the new site and keep every URL working | Build on a Vercel/Netlify preview URL |
| 3 | **Price sign-off** for every range in the Costs section | Prices are published | `showPrices` on with "Typical range, confirmed after your consultation". Switch off if not approved |
| 4 | **Consent for before/after photos**, especially BA11 (the only face photo, elderly man with dentures) | Medical photos need patient consent | BA11 hidden; mouth-only cases shown with "Shared with patient consent" |
| 5 | **Doctor approval of the AI-retouched portraits** (written consent received 27 Oct 2026; final images approved?) | They are used on every page | Use as delivered |
| 6 | **Google rating and review count** for each branch | Shown next to Practo and Justdial | Hidden (`showGoogleRating=false`) |
| 7 | **Insurance and EMI wording** | FAQ and costs page mention it | "Call us to check your plan. We'll give you an itemised bill for reimbursement." EMI line hidden |
| 8 | **Privacy policy and terms** still correct? | Legal pages are migrated as they are | Current text migrated |

## Soon after launch

| # | Item | Why | Default |
|---|---|---|---|
| 9 | Each doctor's **weekly schedule** (which clinic, which days) | Patients ask "who is in today" | "Call to confirm which clinic Dr X is at today" |
| 10 | **Clinic founding year** | The site makes no founding-year claim until confirmed | No year shown ("Practising since 2007" only on Dr Ruchi's profile) |
| 11 | **Which doctor treated each result case** (BA01–BA33) | Doctor pages filter cases by doctor | Doctor caption hidden |
| 12 | **High-resolution originals** of the before/after photos | Current files are ~400px wide | Shown at 400px or less |
| 13 | Should **Dr Pushpinder Gulia** (surgical oncologist, Sector 57) appear? | Team completeness | Not shown |
| 14 | **JP/KR photo captions**: did the "academic exchange with Osaka / Tokyo Dental College / Seoul National University" really happen? | The English site labels the same photos as AIIMS events | Exchange captions removed, true captions used |
| 15 | **Sector 53 parking and lift directions** (which mall entrance, which floor/lift) | "How to find us" | Address and map only |
| 16 | **Captions (subtitles) for the 8 reels**, or permission to auto-generate them | Accessibility | Auto-generated captions, checked by us |
| 17 | Confirm **"20 minutes from IGI Airport"** for the medical tourism page | Claim on the page | Line hidden |
| 18 | Photos still missing: Sector 57 exterior, Sector 53 mall entrance, sterilisation area, team photo, aligner/scanner/laser close-ups (half-day shoot) | Replace the last stock images | Current real or stock photos per the image map |
| 19 | Confirm which branch the glass storefront photos (C03–C07) show | Correct captions on clinic pages | Captioned as Sector 53 |
| 20 | GA4 access (`G-435EXMXJGW`) and Google Business Profile access for both branches | Tracking and local SEO | Existing GA4 ID kept |
