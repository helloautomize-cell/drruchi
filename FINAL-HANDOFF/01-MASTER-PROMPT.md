# MASTER PROMPT v2 (27 Oct 2026): Dental Krafts × Dr Ruchi Goel × Dr Parmod Gulia

> Paste this whole file into your coding agent (Claude Code, Cursor, Lovable, Bolt, v0). It is the **single source of truth** and replaces `02-master-prompt.md`, `02b-master-prompt-update.md`, `04-style-guide.md` and `08-visual-style-guide` from the earlier pack. Copy `09-ASSETS/images/` into the project's `public/images/` first so every path below resolves.
>
> Companion files in this folder: `02-STYLE-GUIDE.md` (design system), `03-SITEMAP.md` (42 pages, nav, keywords), `04-IMAGE-MAP.md` (every image per page and section), `05-CONTENT/` (all page copy), `06-DESIGNS/` (approved homepage and inner-page reference builds), `08-ICONS/` (icon code).

---

## 0. Role and outcome

You are a senior product designer and front-end engineer building a **specialist dental practice website** for **Dental Krafts**, Gurgaon. It is ONE website for the clinic and its two founding dentists: **Dr Ruchi Goel** (Prosthodontist and Implantologist, AIIMS New Delhi) and **Dr Parmod Gulia** (Pediatric and Preventive Dentist, PGIMER Chandigarh). Dental Krafts is the master brand. Dr Ruchi Goel gets a flagship profile page and must rank for searches of her name.

The site must feel like a **premium specialist practice in 2026, not a template clinic**: calm, credentialed, warm and honest. Primary goal: **booked visits** (form, call, WhatsApp). Secondary goals: rank locally for treatment + Gurgaon searches and for both doctors' names, and serve Japanese and Korean expat patients.

Measure of success: a nervous first-time patient in DLF Phase 5 on a mid-range Android phone understands **who will treat them, why they're qualified, what it might cost, which clinic is closer, and how to book** within 10 seconds, without scrolling past two screens.

## 1. Reference builds (match them pixel for pixel)

| What | File | Live preview |
|---|---|---|
| Homepage (approved, all 15 sections locked) | `06-DESIGNS/homepage/dental-krafts-homepage.html`, source in `06-DESIGNS/homepage/source/` (p1 = tokens and base components, p2 to p4 = sections, p5 = JS) | https://claude.ai/artifact/Fneub1FdxroqseS7UED84c |
| Inner page templates (doctor, treatment, clinic, other pages map) | `06-DESIGNS/inner-pages/dental-krafts-inner-pages.html` | https://claude.ai/artifact/Cs6PNZdg2EzhunaU7FuKva |

The homepage file still contains the unchosen A/B/C option variants (hidden) and an options rail and picks bar. **Build only the approved variant of each section** (listed in §5) and drop the rail, the picks bar and the hidden variants.

## 2. Tech requirements
- Next.js (App Router, static export / SSG) + React + TypeScript + Tailwind CSS. Framer Motion for animation (or plain CSS, as in the reference).
- Lighthouse on mobile: Performance ≥ 90, Accessibility ≥ 95, SEO 100, Best Practices ≥ 95. LCP < 2.5 s on 4G.
- Images: serve the provided `.webp` files through `next/image` with width descriptors, lazy-load below the fold, `priority`/`fetchpriority="high"` on the hero image.
- Videos: lazy, `muted playsinline loop`, poster frame, play only in viewport (IntersectionObserver). YouTube through a lite-youtube facade.
- Content in typed data files so the client can edit without touching components: `/content/doctors.ts`, `clinics.ts`, `treatments.ts`, `reviews.ts`, `results.ts`, `faqs.ts`, `prices.ts`, `site.ts` (phones, hours, socials, flags).
- Feature flags in `site.ts`: `showPrices` (default `true`), `showGoogleRating` (default `false`), `bookingEndpoint` (env `BOOKING_ENDPOINT`).
- Fully responsive from 360 px. No horizontal scroll.

## 3. Design system (summary; full spec in `02-STYLE-GUIDE.md`)

**Palette D, Blush and Forest** (approved). **No gradients and no CSS shapes or blobs as decoration.** Texture comes from real photos, AI mood photos, type and whitespace.

```css
:root{
  --cream:#FFFBF5; --petal:#FBF1EE; --blush:#F5E4DE; --blush-2:#F0D9D1; --line:#EBD3CA; --soft:#E8D3CC; --white:#FFFFFF;
  --clay:#C97B6B;      /* decoration only; text on clay must be #121212 */
  --rose:#9E5243;      /* accent text, italic headline word, eyebrows, links */
  --rose-soft:#F2C6B8; /* accents on forest */
  --forest:#1E3A30; --forest-2:#27483C; /* body text, primary CTA, dark bands, footer */
  --moss:#4F7A5E; --mint:#E3ECE5; --muted:#5E5A55;
  --wa:#1F7A4D;        /* WhatsApp button */
  --display:"Fraunces",Georgia,serif; --body:"Figtree",system-ui,sans-serif;
  --r-xl:36px; --r-lg:28px; --r-md:20px; --r-sm:14px;
  --sh:0 1px 2px rgba(30,58,48,.06),0 18px 40px -22px rgba(30,58,48,.28);
  --sh-lg:0 2px 4px rgba(30,58,48,.05),0 40px 80px -40px rgba(30,58,48,.45);
}
```
- **Fonts (Google Fonts):** `Fraunces:ital,opsz,wght,SOFT@0,9..144,300..800,0..100;1,9..144,300..800,0..100` and `Figtree:wght@400..800`. Load with `next/font/google`.
- **Headlines:** Fraunces, `font-variation-settings:'SOFT' 100,'opsz' 144`, weight ~540, letter-spacing −0.025em, `text-wrap:balance`. Each headline has **one italic word** in `--rose` (`--rose-soft` on forest), weight 400.
- **Body/UI:** Figtree 400/600/700, body 16.5–18 px, line-height 1.6. Numbers use tabular figures.
- **Eyebrows:** 12.5 px, 700, uppercase, letter-spacing .16em, `--rose`.
- **Buttons:** pills. Primary = forest bg, white text. On forest sections = cream bg, forest text. Secondary = 1.5 px outline. WhatsApp = `--wa` bg, white text. The arrow sits in a small round "bic" chip inside the button.
- **Surfaces:** cream page; petal or blush alternate sections; **forest** for the hero, recognition band, kids band and footer. Glass cards = cream at 90% with 14 px backdrop blur.
- **Icons:** line icons (Lucide family, 1.75 stroke) for UI, plus the `dk-icons` set in `08-ICONS/` for badges and cards. **Never use the Fluent 3D emoji images** (`img/3d/*`) that appear in the reference; swap per `08-ICONS/README-for-coding-agent.md`.
- **Motion:** fade + 22 px rise on reveal, slow Ken Burns on hero photos, crossfades of .8 s, marquees that pause on hover. Full `prefers-reduced-motion` support.

## 4. Facts you may use (verbatim; do not invent others)

**Dental Krafts**: two clinics in Gurugram (Gurgaon), Haryana. Signage line: "Expert Dentists from AIIMS & PGI (CHD)". Consultation ₹500. Email kraftsdental@gmail.com. WhatsApp +91 98104 48720 (`https://wa.me/919810448720?text=Hello%20Dental%20Krafts%2C%20I%27d%20like%20to%20book%20a%20visit`). Instagram @dental_krafts. Facebook /DentalKraftsclinic. YouTube @dentalkrafts-expertsfromai9879.

| | Sector 53 · Golf Course Road | Sector 57 · Sushant Lok 2 |
|---|---|---|
| Address | DSP-211, 2nd Floor, South Point Mall, Golf Course Road, DLF Phase 5, Sector 53, Gurugram, Haryana 122002 | UG-12, 1st Floor, Bestech Central Square Mall, Opp. Hong Kong Bazaar Road, Block G, Sushant Lok 2, Sector 57, Gurugram, Haryana 122011 |
| Phone | +91 98104 48720 | +91 95992 52018 |
| Hours | Mon, Tue, Thu–Sun 10 am – 8 pm | Mon, Tue, Thu–Sun 10 am – 8:30 pm |
| Closed | Wednesday | Wednesday |
| Map | Google Maps embed, query "Dental Krafts Sector 53 Gurgaon" | query "Dental Krafts Sector 57 Gurgaon" |
| Nearby | DLF Phase 5, Sector 54, Sector 55, Sushant Lok, Nirvana Country | Sector 56, Sector 57, Sushant Lok 2, Golf Course Extension Road |
| Drive times | Golf Course Rd 5 min · Ardee City 10 · MG Road 14 · DLF Ph 3 15 · DLF Ph 2 17 · Cybercity 17 · HUDA City Centre 20 · Golf Course Ext Rd 20 | Golf Course Rd 8 min · DLF Ph 1 9 · Sector 47 9 · South City 2 10 · HUDA City Centre 12 · Golf Course Ext Rd 12 · Medanta 14 · Sector 29 14 · MG Road 15 · DLF Ph 3 15 · DLF Ph 4 15 |

**Dr Ruchi Goel**: BDS, MDS (Prosthodontics), Maxillofacial Prosthodontics and Implantology.
- AIIMS PG (MDS) Entrance Exam Topper, 2012
- MDS, AIIMS New Delhi, 2015 · BDS, D.A.V. Centenary Dental College, Yamuna Nagar, 2007
- Junior Resident, AIIMS (2012–15) · House Surgeon, PGIMER Chandigarh (2010–11) · General Dentist, Guru Gobind Singh Hospital (2008–09) · Intern, PGIMS Rohtak (2007–08)
- Delhi State Dental Council Reg. No. A-7387 · Member, Indian Dental Association; Indian Prosthodontic Society
- Treats: dental implants (single, multiple, full-arch all-on-4/6), dentures of every type, crowns and bridges, smile design, full-mouth rehabilitation, TMJ disorders, maxillofacial prosthetics, general dentistry
- Recognition: National Achievers Award 2025 · Business & Profession Excellence Award · token of appreciation from the HOD, Division of Prosthodontics, AIIMS New Delhi
- Practo: 98% from 268 patient votes · Practising since 2007 (allowed **only** on her profile and doctor card)

**Dr Parmod Gulia**: BDS, MDS (Paedodontics and Preventive Dentistry).
- MDS, PGIMER Chandigarh, 2013, **Silver Medal** · BDS, Govt Dental College, Rohtak, 2008
- Best Paper Presentation, ISPPD Conference, 2014
- Senior Research Fellow, AIIMS New Delhi (2013–14) · Junior Resident, PGIMER (2010–13) · House Surgeon, PGIMER (2009–10) · Consultant, Dantah, Safdarjung Enclave (2014–15)
- Delhi State Dental Council Reg. No. A-12323 · Member, IDA; Indian Society of Pedodontics and Preventive Dentistry
- Treats: children and teens, children with special needs, treatment under general anaesthesia when required, space maintainers, myofunctional orthodontics, fillings, root canal treatment, wisdom teeth, clear aligners, whitening, smile design
- Practo: 95% from 740 patient votes · Practising since 2008
- Spelling: always **Parmod** on the page. "Pramod Gulia" only as an SEO alias (`alternateName` in schema).

**Proof numbers** (show source and "as of Oct 2026" on every badge): Practo clinic rating **5.0 across 1,000+ patient stories** (Sector 57: 933, Sector 53: 67) · Justdial **4.9 from 1,240+ ratings** · Google: `GOOGLE_RATING_TBD`, hidden behind `showGoogleRating` until the clinic supplies it.

**Prices** (behind `showPrices`, labelled "Typical range, confirmed after your consultation"): Consultation ₹500 · Root canal (one tooth) ₹6,000–₹12,000 · Ceramic crown ₹12,000–₹20,000 · Dental implant ₹30,000–₹55,000 · All-on-4 full arch ₹1,50,000–₹4,00,000 · Tooth extraction ₹2,000–₹8,000 · Tooth-coloured filling ₹2,000–₹4,000 · Professional whitening ₹10,000–₹20,000 · Dentures from ₹5,000.

**Banned:** "painless guaranteed", "100% success", "cheapest", "gold medalist", "world's best", the unverified "10K+ satisfied customers", unqualified "Best dentist in Gurgaon" in on-page headings (allowed in `<title>`/meta only), and **any founding year for the clinic ("since 2007", "since 2015")** until the clinic confirms it. Never fabricate reviews or stats.

## 5. Global layout

**Header (forest, all pages; approved "E · Forest concierge"):** reversed logo `/images/brand/dk-logo-reversed.svg` · nav: Treatments ▾ (mega-menu) · Our dentists ▾ · Results · Costs · Clinics ▾ · **Patient stories** · **EN | 日本語 | 한국어** switch · live status pill ("Open now · until 8:30 pm" / "Closed today · open Thu 10 am", computed in IST; Wednesday closed; Sector 53 closes 8 pm, Sector 57 8:30 pm) · cream **Book a visit** button. Patient stories and the language switch are missing from the reference build; add them in the same style.

**Mega-menu groups:** 1 Replace missing teeth (Dental implants · All-on-4/6 · Dentures · Full-mouth rehabilitation) · 2 Save a tooth (Root canal · Fillings · Crowns and bridges) · 3 Smile design (Smile makeover · Veneers · Whitening · Cosmetic dentistry) · 4 Straighten teeth (Braces · Invisalign and clear aligners) · 5 Kids and teens (Pediatric dentistry) · 6 Gums, surgery and urgent care (Gum disease · Laser dentistry · Wisdom teeth · Teeth cleaning · General check-ups · Emergency · Toothache). Plus "Not sure? Tell us what's wrong" → booking with concern "Not sure".

**Mobile:** logo + Book pill + menu button opening a full-screen forest sheet. **Sticky bottom bar** (as in the inner-pages reference): Call (sheet to choose clinic) · WhatsApp · Book.

**Footer A (forest columns):** reversed logo · "Specialist dental care in Gurgaon, from dentists trained at AIIMS and PGIMER." · Book a visit · columns Treatments · Clinics (both addresses, phones, email) · Dental Krafts (Our dentists, Results, Costs, Videos, FAQ, Patient stories, Blog, International: 日本語 · 한국어 · Dental tourism) · social icons · "Dr Ruchi Goel, Reg. A-7387 · Dr Parmod Gulia, Reg. A-12323 · Delhi State Dental Council" · © 2026 Dental Krafts · Privacy · Terms.

## 6. HOME PAGE: 15 approved sections, in this order

Copy for every section is in `05-CONTENT/homepage-copy.md` (extracted from the approved build; it wins over `06a` §1). Images per section are in `04-IMAGE-MAP.md` §B.

| # | Section | Approved layout | Key behaviour |
|---|---|---|---|
| 1 | Header + hero | **E · Forest concierge** | Forest band. Left: eyebrow "AIIMS New Delhi · PGIMER Chandigarh", H1 "A smile worth *showing*, planned by specialists.", lead, concierge card with 6 concern chips. Each chip changes the dentist shown (avatar + name), the price line and the booking label, and **crossfades the hero photo** (table below). Right: photo with two glass cards ("5.0 Practo · 1,000+ patient stories" and a before/after mini card BA12 linking to results). Under the hero: marquee with addresses, hours, phones, credentials |
| 2 | Trust strip | A · Credential ticker | Marquee of credential chips + press row (ANI logo, "As featured in The Tribune") |
| 3 | Meet the dentists | C · Dr Ruchi featured | Large Dr Ruchi card (portrait, 4 stat tiles: MDS AIIMS 2015 · Rank 1 AIIMS entrance 2012 · 98% Practo · 19 years in practice), smaller Dr Parmod card, "Not sure who to see?" strip with WhatsApp |
| 4 | Treatments | B · Index list + live preview | 6 rows; hovering/tapping a row swaps the preview image, title, "Usually with …" doctor chip and avatar |
| 5 | Smile results | B · Hover grid | 6 before/after cases; before shown, after on hover/tap; link "See all 33 cases" |
| 6 | Why patients stay | B · Spotlight list | 4 items; the photo swaps per item |
| 7 | Dr Ruchi explains | B · Player + playlist | Big 9:16 player + playlist of reels 01, 03, 04, 06 (titles in copy file) |
| 8 | Patient stories | C · Video + quotes | Rekha Seth video card + 2 quote cards + Practo/Justdial badges |
| 9 | Recognition | A · Photo strip on forest | 6 award photos with captions, horizontal scroll |
| 10 | Kids | A · Forest band with photos | Copy + 6 checklist items + CTA; kids-room mural + real-kids collage |
| 11 | Costs teaser | B · Tabbed price list | Tabs Most asked · Replace teeth · Save a tooth · Smile (behind `showPrices`) |
| 12 | Clinics | A · Two clinic cards | Photo, live open pill, address, phone, nearby chips, Directions + Call; international strip under them linking 日本語 · 한국어 · Dental tourism |
| 13 | FAQ | A · Sticky heading + accordion | 9 Q&As, FAQPage schema |
| 14 | Booking | B · Three steps | 1 concern chips → 2 clinic, dentist, date (no Wednesdays, no past dates), time of day → 3 name + 10-digit mobile → Request appointment. POST to `BOOKING_ENDPOINT`; also offer "Prefer WhatsApp?" with a prefilled message. Success: "Thanks, {name}. We'll call you from +91 98104 48720 within working hours." Honeypot field. Consent line linking the Privacy Policy |
| 15 | Footer | A · Forest columns | See §5 |

**Hero E concern table**

| Chip | Dentist shown | Price line | Hero photo |
|---|---|---|---|
| Missing teeth (selected on load) | Dr Ruchi Goel | Implants from ₹30,000 · dentures from ₹5,000 | `/images/ai/hero-smile-60f.webp` |
| Tooth pain | Either dentist | Root canal from ₹6,000 · same-day pain relief when we can | `/images/ai/hero-smile-40m.webp` |
| Chipped or broken | Dr Ruchi Goel | Ceramic crowns from ₹12,000 | `/images/ai/hero-smile-60f.webp` |
| Gaps or crooked | Either dentist | Veneers, braces or aligners, after an exam | `/images/ai/hero-smile-30f.webp` |
| Stained teeth | Either dentist | Whitening from ₹10,000 | `/images/ai/hero-smile-30f.webp` |
| My child's teeth | Dr Parmod Gulia | Consultation ₹500 · babies to teens | `/images/ai/hero-smile-30f.webp` |

The photo on first load is `hero-smile-30f` (as in the reference); every chip tap crossfades to its photo. Behaviour is in `06-DESIGNS/homepage/source/p5.html` ("hero E: concierge") and the chip markup in `p2.html`.

The old §5.13 "International patients" band is **dropped**; it lives as the strip under the clinic cards plus the header language switch and footer links.

## 7. DOCTOR PAGES (template: inner-pages reference, tab "Doctor profile")

Sections, in order: 1 Hero (forest band, text left, portrait right, credential chips, Book + WhatsApp) · 2 About + "In the clinic" photo · 3 Credentials timeline (chronological, vertical) · 4 What she/he treats (cards → treatment pages) · 5 Cases (before/after sliders, filtered by `doctor` once confirmed; hide while `doctor:'TBC'`) · 6 Videos (reels) · 7 Recognition · 8 What patients say · 9 Where to see her/him (both clinic cards; "Call to confirm which clinic Dr X is at today") · 10 FAQ + CTA band (booking preset to this doctor). Copy in `05-CONTENT/06a-content-core-pages.md` §3 and §4.

- **/dr-ruchi-goel**: hero `/images/ai/dr-ruchi-portrait.webp`; In the clinic `/images/ai/dr-ruchi-at-work.webp` (wide crop, keep the implant model in frame). Timeline: 2007 BDS, D.A.V. Centenary Dental College · 2007–08 Intern, PGIMS Rohtak · 2008–09 General Dentist, Guru Gobind Singh Hospital · 2010–11 House Surgeon, PGIMER Chandigarh · 2012 AIIMS MDS Entrance Topper · 2012–15 Junior Resident, AIIMS · 2015 MDS Prosthodontics, AIIMS · 2015– Dental Krafts · 2025 National Achievers Award. Reels 01–06. Reviews: Aditya, Kuldeep Kaul, Sabita, Shirin Kujur + Practo 98%. SEO title "Dr Ruchi Goel | Prosthodontist & Implantologist in Gurgaon (AIIMS) | Dental Krafts". `Physician` schema with `alumniOf` (AIIMS New Delhi, D.A.V. Centenary Dental College), `memberOf` (IDA, IPS), `award`, `identifier` A-7387, `worksFor` both clinics, `sameAs` Practo.
- **/dr-parmod-gulia**: hero `/images/ai/dr-parmod-portrait.webp`; In the clinic `/images/ai/dr-parmod-at-work.webp` (crop out the coat embroidery) or real `/images/doctors/dk-doctors-performing-procedure-1.webp`. Timeline: 2008 BDS Rohtak · 2009–10 House Surgeon PGIMER · 2010–13 Junior Resident PGIMER · 2013 MDS + Silver Medal · 2013–14 SRF AIIMS · 2014 ISPPD Best Paper · 2014–15 Consultant, Dantah · 2015– Dental Krafts. Milestone photo A10. Kids photos K01, C11, D07. Reviews: Subhash, Anushka Singh, Bijay Kumar, Chandan Sharma, Vrinda Gupta. Schema `alternateName: "Pramod Gulia"`.
- **/our-dentists**: hero `/images/ai/doctors-duo.webp`, H1 "Meet your *dentists*", both doctor cards, "How we work together" strip (complex cases planned jointly, kids → adults → implants, one file).

## 8. TREATMENT PAGE TEMPLATE (inner-pages reference, tab "Treatment page"; all 21 treatment slugs)

One `TreatmentPage` component driven by `treatments.ts`. Sections: 1 Hero (forest band, breadcrumb, H1 "{Treatment} in Gurgaon", one-line promise, "Who treats this" chip with avatar, "Typical cost" chip, CTAs, hero image right) · 2 Is this for you? (4–6 situation cards with icons) · 3 How it works (text + support image) · 4 Your options (cards) · 5 Step by step (numbered stepper with visits/timeline) · 6 Results (before/after sliders filtered by treatment) · 7 Cost table + aftercare tips · 8 Reviews filtered by treatment · 9 FAQ (FAQPage schema) + related treatments · 10 CTA band. Copy for all 21 pages in `05-CONTENT/06b-content-treatments.md`. Hero and support images per slug in `04-IMAGE-MAP.md` §D. Each page gets a unique meta title (≤ 60 chars) and description (≤ 155 chars) from 06b.

## 9. OTHER PAGES (inner-pages reference, tabs "Clinic page" and "Other pages")
- **Clinic pages** (/dental-clinic-sector-53-gurgaon, /dental-clinic-sector-57-gurgaon, /best-dental-clinic-golf-course-road-gurgaon, /best-dental-clinic-gurgaon): forest hero with photo, info block (address, phone, hours, live status), drive-time chips, map (static image first, iframe on click), doctors here, gallery, treatments offered, nearby-areas paragraph, `Dentist` + `LocalBusiness` schema for that branch.
- **/treatments**: hub with the 6 groups (reuse Treatments B rows as a full list with cards).
- **/treatment-costs**: full price table grouped by category (reuse Costs B tabs, all rows), "what's included / what changes the price", EMI line ⚠, CTA. `Offer` schema with price ranges.
- **/gallery**: filterable grid of all 33 cases BA01–BA33 (reuse Results B cards), slider in a lightbox, consent note. Filters: Implants · Crowns and bridges · Dentures · Full-mouth · Veneers and gaps · Whitening and cleaning.
- **/patient-stories**: aggregate badges, video testimonials (reels 07–08 + YouTube AUyywhtjBjo, boqpk0vKBAo, CDK7IF63PZQ), text reviews filterable by treatment and doctor (reuse Stories C cards), links to Practo and Justdial.
- **/medical-tourism**: how it works (WhatsApp photos/X-rays → estimate → plan the trip → treatment → follow-up), sample timelines, doctors, results.
- **/japanese, /korean**: full single-page localised versions (Noto Sans JP/KR as fallback after Figtree, `lang`, `hreflang`), existing translated copy from `05-CONTENT/site-content/japanese.txt` and `korean.txt`. **Remove the "academic exchange with Osaka / Tokyo Dental College / Seoul National University" captions**; use the true English captions.
- **/about-us**: story, values (explain first, treat only what's needed, hygiene, continuity), team, recognition. Hero `/images/ai/doctors-duo.webp`. No founding year.
- **/blog** + **/blog/[slug]**: card grid with category filters; post template with reading time, author box (doctor + credentials), "Medically reviewed by", TOC, in-article booking CTA, related treatments. Migrate all ~50 posts from `05-CONTENT/site-content/blog_*.txt`, keeping slugs.
- **/contact-us**: both clinic cards, the 3-step booking form, email, WhatsApp, hours table.
- **/privacy-policy, /terms-conditions**: migrate from `site-content/`.

## 10. Images: rules
- Paths: everything under `/images/` (see `04-IMAGE-MAP.md`). AI images are in `/images/ai/`.
- **AI images are mood only.** Never caption AI people as patients and never place them next to results.
- **Doctor images** (`dr-ruchi-portrait`, `dr-parmod-portrait`, `doctors-duo`, `dr-ruchi-at-work`, `dr-parmod-at-work`) are AI-retouched from the doctors' real photos, with their written consent (27 Oct 2026). They replace D03, D05 and D06 everywhere.
- **Always real:** clinics, before/after results, reviews and avatars, awards and press, reels.
- Retire: all orange-dot collage images, `pattern_shape_1.png`, `hn1/hn2/hn3.webp`, stock "doctor" faces, and the `img/3d/*` Fluent emoji.

## 11. SEO, schema and tracking
- Keep **every existing slug** (SEO equity). 301 `/dr-pramod-gulia` → `/dr-parmod-gulia`; 301 any removed URL to its closest match.
- `<title>` pattern: "{Primary keyword} | {Credential hook} | Dental Krafts". Meta descriptions with location + doctor + proof. Keywords per page in `03-SITEMAP.md` §3.
- JSON-LD: `Organization`; two `Dentist`/`MedicalClinic` (per branch, address, geo, phone, `openingHoursSpecification` Mon/Tue/Thu/Fri/Sat/Sun, `priceRange` "₹₹", `aggregateRating` only with verified numbers); two `Physician`; `FAQPage`; `BreadcrumbList`; `MedicalProcedure` on treatment pages; `VideoObject` for reels; `Review` only for reviews shown in full with names.
- `hreflang` en-IN ↔ ja ↔ ko. XML sitemap + robots. Canonicals. Open Graph image `/images/ai/doctors-duo.webp` (1200×630 crop) and Twitter cards.
- GA4 `G-435EXMXJGW` events: `book_submit`, `call_click` (with clinic), `whatsapp_click`, `direction_click`, `concern_chip_click`, `video_play`, `ba_slider_drag`, `price_view`.

## 12. Accessibility and quality gates
- WCAG 2.2 AA. Coloured text uses `--rose` or `--forest` on light, `--rose-soft` or cream on forest. Never white text on clay. Visible focus rings (`2px solid var(--rose)`, offset 3px). Skip link. Landmarks. Labels and `aria-live` errors on forms.
- Before/after sliders: keyboard ←/→ 5%, `role="slider"`, `aria-valuenow`, alt text per half.
- Videos: captions (VTT) and a pause control; never autoplay with sound. Marquees pause on hover and stop under reduced motion.
- Test at 360, 768, 1024, 1440. Test hours logic for Wednesday and after-hours in IST.

## 13. Build order
1. Tokens, fonts, layout shell (header, mega-menu, mobile sheet, sticky bar, footer).
2. Content data files from §4, the copy files and the image map.
3. Home, all 15 sections.
4. Doctor pages → treatment template → 21 treatment pages.
5. Clinics, costs, gallery, stories, contact, treatments hub.
6. JP/KR, blog migration, medical tourism, about, legal.
7. Schema, sitemap, analytics, performance pass, accessibility pass.

## 14. Open items (render as TODO placeholders, never fake data)
`GOOGLE_RATING_TBD` · per-case `doctor` attribution · each doctor's weekly clinic schedule · clinic founding year · whether Dr Pushpinder Gulia (surgical oncologist, Sector 57) appears · insurance/EMI wording · price sign-off · JP/KR academic exchange captions · high-resolution before/after originals · BA11 face-photo consent · booking destination for `BOOKING_ENDPOINT` · captions for reels. Full list for the clinic: `10-CLINIC-CHECKLIST.md`.
