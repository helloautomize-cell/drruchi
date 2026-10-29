# Dental Krafts — SEO / AEO / GEO audit report

Site: `drruchi-five.vercel.app` (target `https://dentalkrafts.com`) · Next.js 16.4.3, Cache Components + Partial Prefetching
Audited: production build served locally (`next build && next start`), pages fetched with `curl` (no JS), source read in `app/`, `components/`, `content/`.

## Scores

| Area | Score /10 | Notes |
|---|---|---|
| Crawling & AI-bot access | 9 | robots.txt allows all + AI bots; llms.txt/llms-full.txt/sitemap/robots all 200; real 404s |
| Technical | 6 | Title duplication bug on most pages; desc >155 chars; missing home hreflang; sitemap lastmod = build date |
| Schema | 8 | Connected @id graph, Dentist+MedicalClinic, Physician, MedicalProcedure, FAQ, Breadcrumb — gaps on /our-dentists, /gallery, contact |
| E-E-A-T | 6 | Doctors have real credential pages + schema; guides have bylines/dates/sources; **no Editorial Policy or Medical Disclaimer page**; blog posts lack dates/reviewed-by |
| Pillar linking | 4 | Only 2 guides exist; spec needs 5 supporting articles per pillar; near-orphan `best-dental-clinic-*` pages |
| FAQs | 7 | 5–6 Qs per treatment/guide, schema matches visible text; blog posts have no FAQ |
| Entities & semantics | 7 | Answer-first intros on all 21 treatments; NAP consistent; sameAs to Wikidata/MeSH not used |
| Keywords | 7 | Unique titles/H1s; 2 blog slugs contain "cost"; possible cannibalisation between `/blog` and `/guides` |
| Content humanness | 5 | New guides/readable copy good; legacy blog posts show AI tells ("game-changer", "daunting task") and banned words |
| AEO/GEO readiness | 8 | llms.txt + llms-full.txt present, AI bots allowed, answer-first copy, VideoObject/FAQ schema |

**Overall: 70 / 100**

## Checklist (evidence-based)

### Crawling and indexing

| Check | Result | Evidence |
|---|---|---|
| robots.txt exists, references sitemap, doesn't block assets | PASS | `curl /robots.txt` → `Allow: /` + `Sitemap: https://dentalkrafts.com/sitemap.xml` |
| AI bots allowed | PARTIAL | GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, CCBot present; **missing Claude-User, Perplexity-User** |
| No 403/429/challenge to bots | PASS (local) | All routes 200 to curl; verify on Vercel |
| sitemap.xml: all indexable URLs, absolute prod URLs, real lastmod | PARTIAL | All URLs absolute on apex; **lastmod = build timestamp `2026-10-29T07:20:31` for static/treatment/blog URLs** (guides use real dates) |
| llms.txt summarises site/doctors/services | PASS | `/llms.txt` + `/llms-full.txt` 200, generated from content, includes guides |
| No accidental noindex | PASS | `<meta name="robots" content="index,follow...">` on pages; noindex only on /_not-found (correct). Vercel.app noindex = external item |
| metadataBase + self-referencing canonicals | PASS | `metadataBase: https://dentalkrafts.com`; canonicals per page |
| One version only, 301/308 | PASS | `/dr-pramod-gulia`→308 `/dr-parmod-gulia`; `/treatment-costs`→308 `/treatments`; www→apex + http→https redirects in next.config.ts |
| Unknown URLs → real 404 | PASS | `/does-not-exist` → 404 with custom page |
| Title tags unique 50–60 chars | **FAIL** | `| Dental Krafts` appended twice: `<title>Dental Treatments in Gurgaon | Implants, RCT, Kids | Dental Krafts | Dental Krafts</title>` on /treatments, /dental-implants, /our-dentists, /contact-us, /dental-clinic-sector-53-gurgaon (and most other pages) |
| Meta descriptions 140–160 | PARTIAL | ~160–170 chars on home (168), /treatments (162), clinics (163) — several over 155 |
| One H1 per page, clean hierarchy | PASS | h1count=1 on all 10 sampled pages |
| Clean descriptive URLs | PARTIAL | `/blog/dental-implants-types-procedure-benefits-cost-risks`, `/blog/tooth-filling-treatment-type-cost` contain "cost" |
| Images: alt, width/height, next/image | PASS | ~76 `<img>` migrated to `next/image` with intrinsic dims + sizes |
| OG/Twitter on every page | PASS | og:image absolute, og:locale en_IN, twitter summary_large_image |
| Visible breadcrumbs on inner pages | PASS | `.crumb`/`gd-crumb` present on treatment, clinic, dr, blog, guides, about, contact |
| Core Web Vitals mobile | PASS (measured) | / P98 LCP 1.4s, /dental-implants P98 LCP 1.2s, TBT <200ms, CLS 0.005 (post-fix) |
| No broken internal links / links to redirects | PASS (spot) | `/best-dental-clinic-*` linked only once each — weak, not broken |

### Every word visible to bots

| Check | Result | Evidence |
|---|---|---|
| Content, headings, FAQs, bylines, dates, links, schema in raw HTML | PASS | curl (no JS) returns full h1, FAQ, ld+json, byline on guides; OpenStatus chip is the only post-mount render |
| No client-only content | PASS | All sections server-rendered |
| Internal links are real `<a href>` | PASS | next/link throughout |

### Schema

| Check | Result | Evidence |
|---|---|---|
| Connected @graph, stable @ids | PASS | `/#org`, `/#website`, `/#clinic-*`, `/#dr-*` ids cross-linked (worksFor, parentOrganization, provider, reviewedBy) |
| Articles: author/reviewedBy/dates/about/publisher | PARTIAL | guides: full author+reviewedBy+datePublished+dateModified+citations; **blog Article schema lacks datePublished** (no date field in posts.ts) |
| Physician schema on doctor pages | PASS | registration, alumni, specialty, alternateName("Pramod Gulia"), worksFor |
| Service/condition schema | PASS | MedicalProcedure+MedicalWebPage on all treatment pages |
| BreadcrumbList on inner pages | PASS | treatment, clinic, dr, blog, guides, ja/ko |
| FAQPage where FAQs visible, matching text | PASS | Same `f.q`/`f.a` data rendered and serialised |
| Schema = visible content, no placeholders | PASS | spot-checked; priceRange/aggregateRating removed per rules |
| Missing schema | PARTIAL | `/our-dentists` only Org+WebSite (no Physician); `/gallery` no ImageObject; `/contact-us` no LocalBusiness/ContactPoint |

### YMYL & E-E-A-T

| Check | Result | Evidence |
|---|---|---|
| Dedicated doctor profile pages, crawlable, linked from articles | PASS | /dr-ruchi-goel, /dr-parmod-gulia with photo, degree, reg A-7387/A-12323; guides link author+reviewer to them |
| Written by + Medically reviewed by + dates near top | PARTIAL | guides: yes ("Written by", "reviewed by", "Updated"); **blog posts: "By Dr X · N min" only — no dates, no reviewed-by** |
| Trust pages: About, Contact, Editorial Policy, Medical Disclaimer, Privacy, Terms | **FAIL** | /editorial-policy and /medical-disclaimer **do not exist**; About/Contact/Privacy/Terms exist and are footer-linked |
| Claims cite authoritative sources | PARTIAL | guides cite aapd.org, nhs.uk; blog posts cite nothing |
| No risky claims | **FAIL** | `content/posts.ts` slug `best-painless-dentist-gurgaon` uses "painless" ~15×; "game-changer"; reviews.ts:16 quote contains "charges" |
| "When to see a doctor" guidance | PARTIAL | emergency/toothache pages cover it; guides partially |
| Indian context / INR costs | CONFLICT | site-wide rule bans ₹/cost — audit wants INR costs; **client decision needed** |
| NAP identical across site & schema | PASS | footer shows full address+phone+hours; schema PostalAddress matches |
| First-hand clinical experience | PARTIAL | guides have doctor voice; blog posts are generic |

### Pillar and supporting content

| Check | Result | Evidence |
|---|---|---|
| Every pillar has 5 supporting articles | **FAIL** | `/guides` has **2 articles** (`child-first-dental-visit`, `dental-implant-vs-bridge`); 6 category pages exist with 0–1 articles each |
| Pillar links to supporting, supporting links back + 2 siblings | PARTIAL | guides link to each other + treatment/doctor pages; categories exist in sitemap |
| Anchor text descriptive | PASS | sampled anchors descriptive, no "click here" |
| No orphan pages (<3 clicks) | PARTIAL | `/best-dental-clinic-golf-course-road-gurgaon`, `/best-dental-clinic-gurgaon` linked only from /dental-implants (0 links on /, /treatments) |
| FAQ 4–8 per pillar/service page | PASS | 5–6 Questions per treatment/guide |
| FAQ answers 40–60 words, direct | PARTIAL | treatment FAQs ~40-60w; some guides answers shorter |
| FAQ in raw HTML matching schema | PASS | verified |

### AI/agent fingerprints

| Check | Result | Evidence |
|---|---|---|
| ChatGPT/Claude tells | FAIL (blog) | `content/posts.ts`: "game-changer" (L264), "daunting task", "In conclusion"-style closers; 16 hits on banned-phrase scan; guides/treatments clean |
| Placeholder/dev artefacts | PASS | no lorem/TODO/console.log/Create-Next-App metadata |
| Hydration/build warnings | **FAIL** | dev log: hydration mismatch `className="eb" vs "eb in"` on /root-canal-treatment (dk-motion adds `.in` pre-hydration); `/guides/[slug]` instant-shell error (`await params` without ensureStatic/Suspense) |
| Identical meta descriptions across pages | PASS | all unique |

### Extra checks

| Check | Result | Evidence |
|---|---|---|
| html lang="en-IN", favicon, manifest | PASS (lang/favicon) | `<html lang="en-IN">`, /icon.png 200; **no /manifest** |
| HTTPS, no mixed content | PASS | all asset URLs relative/https |
| Service/location pages unique | PASS | two clinic pages have distinct copy, NAP, maps |
| sameAs to Wikipedia/Wikidata/MeSH | FAIL | not used anywhere (P3) |
| PAA / "X vs Y" coverage | PARTIAL | `dental-implant-vs-bridge` exists; cost questions deliberately banned |
| Reading level grade 7–9 | PASS | short sentences, plain language |
| No self-review schema / fake testimonials | PASS | aggregateRating removed; reviews labelled with source |
| Sponsored/affiliate rel attributes | PASS | no affiliate links; citations plain |
| manifest.webmanifest | FAIL | absent |

## Issues

| ID | Pri | Finding | Evidence | Fix |
|---|---|---|---|---|
| A-01 | P0 | Title template doubles "| Dental Krafts" — served titles exceed 60 chars and look broken to Google | `<title>Dental Treatments in Gurgaon \| Implants, RCT, Kids \| Dental Krafts \| Dental Krafts</title>` (fetch of /treatments, /dental-implants, /our-dentists, /contact-us, clinic pages) | In each page's metadata either drop the suffix from source titles or set `title: { absolute: t.metaTitle }` (treatment pages feed `t.metaTitle` which already contains the suffix) |
| A-02 | P1 | Only 2 guides; pillar clusters empty | sitemap lists `/guides/child-first-dental-visit`, `/guides/dental-implant-vs-bridge`; `GUIDE_CATEGORIES` has 6 slugs | Write 5 supporting articles per pillar before launching /guides publicly; unpublish empty category pages until filled |
| A-03 | P1 | Banned/risky terms in blog corpus | posts.ts L245–272 "painless" ~15× (slug best-painless-dentist-gurgaon), L962–970 "fees/charges", L659/L1909 slugs contain "cost", L264 "game-changer", L1118 "an Root Canal" | Rewrite/retire offending posts; rename cost-slugs and add 301s in next.config.ts; fix grammar |
| A-04 | P1 | No Editorial Policy or Medical Disclaimer page | no route exists; footer lacks both | Create both pages, link in footer trust row |
| A-05 | P1 | Hydration mismatch from motion engine | dev log on /root-canal-treatment: `<p className="eb" +client / -server "eb in">` | Have dk-motion add `.in` only after hydration (start observers in `requestIdleCallback` post-mount — verify) or apply reveal via `data-*` attribute React doesn't diff |
| A-06 | P1 | Home emits no hreflang | `curl /` → zero `hreflang` links (ja/ko pages have them) | Add `alternates.languages: { en-IN, ja, ko, x-default }` to home metadata |
| A-07 | P1 | Meta descriptions >155 chars | home ~168, /treatments ~162, clinics ~163 | Trim to ≤155 keeping location+doctor+proof |
| A-08 | P1 | Blog posts lack visible dates & reviewed-by; Article schema lacks datePublished | `curl /blog/bad-breath-remedies` shows "By Dr Parmod Gulia · 4 min read", no date; schema has dateModified only | Add `published`/`updated` fields to posts.ts, render them, emit in Article schema |
| A-09 | P1 | guides/[slug] + guides/category/[category] lack `ensureStatic` | dev log: "params accessed outside Suspense" instant-shell error; build lists them ◐ | Add `export const ensureStatic = "navigation"` to both route files |
| A-10 | P2 | /our-dentists emits no Physician schema | served HTML has only Organization+WebSite | Emit both physicianNode() entries |
| A-11 | P2 | /gallery emits no ImageObject schema | served HTML has only Organization+WebSite | Emit imageObject() per visible case |
| A-12 | P2 | /contact-us emits no ContactPoint/LocalBusiness | only Organization+WebSite | Emit clinicNode() pair or ContactPage+ContactPoint |
| A-13 | P2 | sitemap lastmod = build timestamp | `lastmod>2026-10-29T07:20:31` | Track real modified dates per content file (or per-route constant) |
| A-14 | P2 | best-dental-clinic-* near-orphans | 0 inbound links on /, /treatments; 1 on /dental-implants | Link from footer or clinic pages |
| A-15 | P2 | robots missing Claude-User, Perplexity-User | robots.ts AI_BOTS list | Add both |
| A-16 | P2 | OG image not 1200×630 | /images/ai/doctors-duo.webp is 1536×1024 | Export a 1200×630 OG variant |
| A-17 | P2 | AI tells in blog corpus | "game-changer", "daunting task", filler closers | Edit or retire weakest posts |
| A-18 | P3 | No manifest.webmanifest | not in build output | Add app/manifest.ts |
| A-19 | P3 | /guides title thin ("Patient guides \| Dental Krafts", 30 chars) | served title | Lengthen to 50–60 chars |
| A-20 | P3 | No Wikidata/Wikipedia sameAs | absent | Add for doctors/clinic where profiles exist |
| A-21 | P3 | x-robots noindex on vercel.app deploy | can't verify locally | Set in Vercel project (client/hosting item) |

## Page-by-page table (representative)

| URL | Type | Cluster | Primary keyword | Byline | Dates | FAQ | Schema | Links in/out | AI-likeness |
|---|---|---|---|---|---|---|---|---|---|
| / | home | — | dental clinic in gurgaon | n/a | n/a | 5 | Org,WebSite,2×Clinic,2×Physician,FAQ,8×Video | nav+body | ~25 |
| /treatments | hub | pillar | dental treatments gurgaon | n/a | n/a | — | CollectionPage+ItemList,Breadcrumb | 21 treatment links | 20 |
| /dental-implants … (21) | service | pillar body | {treatment} gurgaon | "Led by" link | schema lastReviewed | 6 | MedicalProcedure,MedicalWebPage,FAQ,Breadcrumb | related 4 | ~35 |
| /guides | hub | pillar hub | dental guides | n/a | n/a | — | CollectionPage,ItemList,Breadcrumb | 2 | 20 |
| /guides/child-first-dental-visit | article | kids | child first dental visit | yes+reviewer | yes | 5 | WebPage,MedicalWebPage,BlogPosting,Breadcrumb,FAQ | sib+pillar+dr | ~40 |
| /guides/dental-implant-vs-bridge | article | implants | implant vs bridge | yes+reviewer | yes | 5 | same | sib+pillar+dr | ~40 |
| /blog/* (43) | article | mixed | various | author name only | none | none | Article(no datePublished),Breadcrumb | related | 55–75 |
| /dr-ruchi-goel | profile | entity | prosthodontist gurgaon | self | — | faqs | Physician,FAQ,Breadcrumb | both clinics | 30 |
| /dr-parmod-gulia | profile | entity | pediatric dentist gurgaon | self | — | faqs | Physician,FAQ,Breadcrumb | both clinics | 30 |
| /dental-clinic-sector-*-gurgaon | location | local | dentist sector 53/57 | n/a | — | — | Dentist+MedicalClinic,Breadcrumb | doctors | 25 |
| /our-dentists | hub | entity | dentists gurgaon | n/a | — | — | Org only (gap) | both drs | 20 |
| /contact-us | utility | — | book dentist gurgaon | n/a | — | — | Org only (gap) | clinics | 15 |
| /japanese, /korean | language | intl | — | — | — | yes | FAQ,Breadcrumb | clinics | n/a |

Worst sentences (posts.ts): "Choosing the right dentist can be a daunting task, especially when you're concerned about pain during treatments." · "Sedation dentistry … can be a game-changer." · "Dentistry doesn't have to be painful." (claim) · "The idea of undergoing dental procedures without discomfort has become a reality." · "an Root Canal Treatment specialist" (grammar).

## Cluster table

| Pillar | Supporting articles | Status |
|---|---|---|
| Kids' dentistry (/guides/category/kids-teeth) | child-first-dental-visit | 1/5 — missing 4 |
| Implants (/guides/category/implants-and-missing-teeth) | dental-implant-vs-bridge | 1/5 — missing 4 |
| 4 other categories | — | 0/5 |

## Needs from client (P3)

1. Editorial policy + medical disclaimer approval/copy sign-off.
2. Founding year + verified Google review counts (currently omitted per rules).
3. GBP claim/verify both clinics; ensure NAP matches site.
4. Decide whether `drruchi-five.vercel.app` should be noindexed (x-robots-tag via platform).
5. Which legacy blog posts to keep/retire — several are thin/AI-flavoured and contain banned terms ("painless", "cost").
6. Policy on INR cost content — audit checklist wants it, hard site rule bans it; recommend keeping the ban unless the client writes approved cost ranges.
