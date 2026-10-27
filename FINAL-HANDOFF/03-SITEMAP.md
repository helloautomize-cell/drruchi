# Dental Krafts — Site Plan

One website for Dental Krafts, Dr Ruchi Goel and Dr Parmod Gulia. **42 pages** plus ~50 migrated blog posts. Every existing URL is kept so Google rankings carry over. Pages marked **NEW** don't exist today.

Content for every page is in `05-CONTENT/` (`homepage-copy.md`, `06a-content-core-pages.md`, `06b-content-treatments.md`). Images per section are in `04-IMAGE-MAP.md`.

> **v2 note (27 Oct 2026):** the sitemap, URLs and keywords below are unchanged and approved. Design-related notes in this file (colours, "orange" CTAs, the international band on the homepage) are superseded by `01-MASTER-PROMPT.md` and `02-STYLE-GUIDE.md`. The language switch (EN · 日本語 · 한국어) now sits in the forest header instead of the utility bar.

---

## 1. Site tree

```
Home  /
│
├── Our Dentists  /our-dentists ........................... NEW hub
│   ├── Dr Ruchi Goel  /dr-ruchi-goel ..................... flagship profile
│   └── Dr Parmod Gulia  /dr-parmod-gulia
│
├── Treatments  /treatments ............................... NEW hub
│   ├── Replace missing teeth
│   │   ├── Dental Implants  /dental-implants
│   │   ├── All-on-4 / All-on-6  /all-on-4-dental-implants ... NEW
│   │   ├── Dentures  /dentures
│   │   └── Full-Mouth Rehabilitation  /full-mouth-rehabilitation ... NEW
│   ├── Save a tooth
│   │   ├── Root Canal Treatment  /root-canal-treatment
│   │   ├── Dental Fillings  /dental-fillings
│   │   └── Dental Crowns & Bridges  /dental-crowns
│   ├── Smile design
│   │   ├── Smile Makeover  /smile-makeover
│   │   ├── Dental Veneers  /dental-veneers
│   │   ├── Teeth Whitening  /teeth-whitening
│   │   └── Cosmetic Dentistry  /cosmetic-dentistry
│   ├── Straighten teeth
│   │   ├── Braces  /teeth-braces
│   │   └── Invisalign & Clear Aligners  /invisalign
│   ├── Kids & teens
│   │   └── Pediatric Dentistry  /pediatric-dentist
│   └── Gums, surgery & urgent care
│       ├── Gum Disease  /gum-disease
│       ├── Laser Dentistry  /laser-dentistry
│       ├── Wisdom Tooth Extraction  /wisdom-tooth-extraction
│       ├── Teeth Cleaning  /teeth-cleaning
│       ├── General Dentistry & Check-ups  /general-dentistry
│       ├── Emergency Dentist  /emergency-dentist
│       └── Toothache Treatment  /toothache-treatment
│
├── Results  /gallery
├── Treatment Costs  /treatment-costs ...................... NEW
├── Patient Stories  /patient-stories ...................... NEW
│
├── Clinics
│   ├── Sector 53 · Golf Course Road  /dental-clinic-sector-53-gurgaon
│   ├── Sector 57 · Sushant Lok 2  /dental-clinic-sector-57-gurgaon
│   ├── (SEO) Golf Course Road  /best-dental-clinic-golf-course-road-gurgaon
│   └── (SEO) Gurgaon  /best-dental-clinic-gurgaon
│
├── International Patients  /medical-tourism
│   ├── 日本語  /japanese
│   └── 한국어  /korean
│
├── About Dental Krafts  /about-us
├── Blog  /blog  →  /blog/{slug} (keep all ~50 slugs)
├── Book a Visit  /contact-us
├── Privacy Policy  /privacy-policy
└── Terms  /terms-conditions
```

Two NEW treatment pages (all-on-4 and full-mouth rehab) give Dr Ruchi's highest-value work its own pages. Today it's buried inside the implants and gallery pages.

## 2. Navigation

**No separate utility bar (v2).** The forest header carries the live open/closed status and the EN · 日本語 · 한국어 switch; the marquee under the homepage hero carries both phones and addresses; inner pages show both phones in the CTA band and footer.

**Main nav (desktop):**
`Treatments ▾` · `Our Dentists ▾` · `Results` · `Costs` · `Clinics ▾` · `Patient Stories` · `EN | 日本語 | 한국어` · live status · **[Book a visit]** (cream pill on the forest header)

- *Treatments mega-menu:* six groups as in the tree, each with an icon and a one-line description, plus a "Not sure? Tell us what's wrong" link to the booking form with concern = "Not sure".
- *Our Dentists dropdown:* two cards with photo, name and specialty.
- *Clinics dropdown:* two cards with address, open status and phone.

**Mobile:** logo + "Book" pill + menu. Sticky bottom bar: **Call · WhatsApp · Book**.

**Footer:** Treatments (all 19) · Dentists · Clinics with full addresses · Patients (Costs, Results, Stories, International, Blog, FAQ) · Registrations line · Legal.

## 3. Page inventory

| # | Page | URL | Status | Job of the page | Primary keyword | Secondary | Main CTA |
|---|---|---|---|---|---|---|---|
| 1 | Home | / | Rebuild | Who, why trust, which treatment, which clinic, book | dental clinic in gurgaon | dentist near me gurgaon, ex AIIMS dentist gurgaon | Book a visit |
| 2 | Our Dentists | /our-dentists | NEW | Compare and choose doctor | best dentists in gurgaon | AIIMS dentist gurgaon | Book with either |
| 3 | Dr Ruchi Goel | /dr-ruchi-goel | Rebuild | Rank for her name, prove expertise | dr ruchi goel | prosthodontist gurgaon, implantologist gurgaon | Book with Dr Ruchi |
| 4 | Dr Parmod Gulia | /dr-parmod-gulia | Rebuild | Rank for his name (+ "pramod") | dr parmod gulia | pediatric dentist gurgaon, dr pramod gulia | Book with Dr Parmod |
| 5 | Treatments hub | /treatments | NEW | Route by problem | dental treatments in gurgaon | | Pick a treatment |
| 6 | Dental Implants | /dental-implants | Rebuild | Convert implant seekers | dental implants in gurgaon | implant cost gurgaon | Book implant consultation |
| 7 | All-on-4 / 6 | /all-on-4-dental-implants | NEW | Full-arch patients (high value) | all on 4 dental implants gurgaon | full mouth implants cost | Book full-arch assessment |
| 8 | Dentures | /dentures | Rebuild | Seniors and families of seniors | dentures in gurgaon | implant dentures | Book |
| 9 | Full-Mouth Rehabilitation | /full-mouth-rehabilitation | NEW | Complex restorative cases | full mouth rehabilitation gurgaon | | Book |
| 10 | Root Canal | /root-canal-treatment | Rebuild | Pain to booking | root canal treatment in gurgaon | rct cost gurgaon, painless root canal | Call now / Book |
| 11 | Fillings | /dental-fillings | Rebuild | | tooth filling gurgaon | | Book |
| 12 | Crowns & Bridges | /dental-crowns | Rebuild | | dental crowns gurgaon | zirconia crown cost | Book |
| 13 | Smile Makeover | /smile-makeover | Rebuild | Aspirational, weddings | smile makeover gurgaon | smile design cost | Book smile consultation |
| 14 | Veneers | /dental-veneers | Rebuild | | dental veneers gurgaon | veneers cost | Book |
| 15 | Whitening | /teeth-whitening | Rebuild | | teeth whitening gurgaon | | Book |
| 16 | Cosmetic Dentistry | /cosmetic-dentistry | Rebuild | Overview hub for cosmetic | cosmetic dentist gurgaon | | Book |
| 17 | Braces | /teeth-braces | Rebuild | Parents of teens | braces in gurgaon | | Book |
| 18 | Invisalign | /invisalign | Rebuild | Adults, professionals | invisalign gurgaon | clear aligners cost | Book |
| 19 | Pediatric | /pediatric-dentist | Rebuild | Parents | pediatric dentist gurgaon | kids dentist near me | Book child's visit |
| 20 | Gum Disease | /gum-disease | Rebuild | | gum treatment gurgaon | bleeding gums | Book |
| 21 | Laser | /laser-dentistry | Rebuild | | laser dentistry gurgaon | | Book |
| 22 | Wisdom Tooth | /wisdom-tooth-extraction | Rebuild | | wisdom tooth extraction gurgaon | | Book |
| 23 | Cleaning | /teeth-cleaning | Rebuild | Entry service, recall | teeth cleaning gurgaon | scaling and polishing | Book |
| 24 | General | /general-dentistry | Rebuild | Family check-ups | family dentist gurgaon | | Book |
| 25 | Emergency | /emergency-dentist | Rebuild | Urgent call | emergency dentist gurgaon | | **Call** (not form) |
| 26 | Toothache | /toothache-treatment | Rebuild | Urgent | toothache treatment gurgaon | | Call / WhatsApp |
| 27 | Results | /gallery | Rebuild | Proof | dental before after gurgaon | | Book |
| 28 | Costs | /treatment-costs | NEW | Remove price fear | dental treatment cost gurgaon | implant / rct / crown cost | Get my estimate |
| 29 | Patient Stories | /patient-stories | NEW | Proof | dental krafts reviews | | Book |
| 30 | Sector 53 clinic | /dental-clinic-sector-53-gurgaon | Rebuild | Local SEO + directions | dentist sector 53 gurgaon | dentist golf course road, south point mall dentist | Directions / Call |
| 31 | Sector 57 clinic | /dental-clinic-sector-57-gurgaon | Rebuild | Local SEO + directions | dentist sector 57 gurgaon | dentist sushant lok 2, bestech central square | Directions / Call |
| 32 | Golf Course Rd | /best-dental-clinic-golf-course-road-gurgaon | Rewrite | Local SEO | dentist golf course road gurgaon | | Book |
| 33 | Gurgaon | /best-dental-clinic-gurgaon | Rewrite | Head-term SEO | best dental clinic in gurgaon | | Book |
| 34 | International | /medical-tourism | Rebuild | Overseas / NRI / expat | dental tourism india | dental treatment for NRI | WhatsApp photos |
| 35 | Japanese | /japanese | Rebuild | Japanese expats | グルガオン 歯科 | | 予約 |
| 36 | Korean | /korean | Rebuild | Korean expats | 구르가온 치과 | | 예약 |
| 37 | About | /about-us | Rebuild | Story, values | about dental krafts | | Meet the dentists |
| 38 | Blog | /blog | Restyle | Education, SEO | | | Read / Book |
| 39 | Book a Visit | /contact-us | Rebuild | Convert | contact dental krafts | | Submit |
| 40 | Privacy | /privacy-policy | Keep | | | | |
| 41 | Terms | /terms-conditions | Keep | | | | |
| 42 | 404 | /404 | NEW | Recover lost visitors | | | Search / Call |

## 4. Page templates (6)

| Template | Used by | Section order |
|---|---|---|
| **Home** | / | Hero + concern chips → Credentials band → Meet dentists → Treatment finder → Results → Why patients stay → Dr Ruchi explains (video) → Patient stories → Recognition → Kids band → Clinics → Costs teaser → International → FAQ → Booking → Footer |
| **Doctor** | 2 pages | Hero → About → Credentials timeline → What they treat → Their cases → Video → Recognition → Reviews → Where to see them → FAQ → Booking (doctor preset) |
| **Treatment** | 21 pages | Hero (who treats + cost chip) → Is this for you? → Your options → Step by step → Results → Cost → Aftercare → Reviews → FAQ → Related + CTA |
| **Clinic** | 4 pages | Hero photo + live hours → Doctors here → Treatments here → Getting here (map, drive times, parking, landmark) → Photo gallery → Reviews → Nearby areas → Booking (clinic preset) |
| **Listing** | Treatments hub, Results, Stories, Blog | Hero → Filters → Grid → CTA band |
| **Utility** | Costs, Contact, International, About, JP, KR, Legal, 404 | Custom per page |

## 5. User journeys the site is built around

| Visitor | Arrives from | Path | Must see |
|---|---|---|---|
| **Nervous adult in pain** ("toothache gurgaon") | Google, mobile | Toothache page → Call nearest clinic | Big call button with the clinic named, open now, "same day where possible" |
| **Implant shopper** (comparing 3 clinics) | Google "implant cost gurgaon" | Implants → Costs → Dr Ruchi → Results → Book | AIIMS prosthodontist, price range, real implant results, written plan promise |
| **Parent** ("kids dentist near me") | Google Maps, Practo | Pediatric → Dr Parmod → Book | Pediatric specialist (MDS), kids room photo, special-needs and GA option, real parent reviews |
| **Senior / family of senior** | Word of mouth, name search | Home → Dentures → Book (often by call) | Large text, BA11 denture face result, phone number |
| **Name search** ("dr ruchi goel") | Google | Dr Ruchi page → Book | Credentials, photo, registration number, reviews, clinic schedule |
| **Japanese/Korean expat** | Colleague referral, Google in JP/KR | /japanese → WhatsApp | Native-language page, estimates for insurance, Golf Course Road location |
| **NRI / overseas** | Google "dental treatment india cost" | Medical tourism → WhatsApp photos | How it works remotely, timeline, the US patient's 2 RCTs + wisdom tooth in one sitting |
| **Second-opinion seeker** | Google, review sites | Home concern chip "Second opinion" → Contact | "We'll tell you if you don't need treatment" |

## 6. Conversion system
- **Three ways to book on every page:** form, call (clinic-specific), WhatsApp (prefilled with page + concern).
- **Pre-filled forms:** the treatment, doctor and clinic pages each preset their own field.
- **Urgent pages** (emergency, toothache) put Call above the form.
- **Exit points to proof:** every treatment page links to its results and to Practo.
- **Tracking:** GA4 events listed in master prompt §9. Add call-tracking numbers later if they want attribution per page.

## 7. Internal linking rules
- Every treatment page links to the doctor who leads it, 2–3 related treatments, the costs page and the results filter.
- The doctor pages link to every treatment they lead.
- Each blog post links to 1–2 treatment pages and the author's profile.
- Clinic pages link to both doctors and the top 6 treatments.
- Home links to every hub.

## 8. SEO structure
- **Titles:** `{Treatment} in Gurgaon | {Proof hook} | Dental Krafts` (≤60 chars).
- **Schema:** Organization, 2× Dentist (branches), 2× Physician, MedicalProcedure, FAQPage, BreadcrumbList, VideoObject, Review.
- **hreflang:** en-IN / ja / ko.
- **Keep** all 83 sitemap URLs and add the 4 NEW URLs to the sitemap.
- **Redirects:** `/dr-pramod-gulia` → `/dr-parmod-gulia`; `/gallery/` → `/gallery`; `/our-doctors` → `/our-dentists`.
- **Google Business Profiles:** align both GBP names, categories, hours and photos with the site (the current names are keyword-stuffed: "Dental Krafts – Best Ex AIIMS Dentist, Dental Clinic Near Me, Sector 53 Gurgaon", which breaks Google's naming guidelines and risks suspension). Recommend renaming to "Dental Krafts – Sector 53, Golf Course Road".
