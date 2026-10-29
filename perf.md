# Dental Krafts: SEO + GEO + AEO + llms.txt + 90+ performance (no UI changes)

You are working in the existing Next.js site (drruchi-five.vercel.app, deploying to dentalkrafts.com). **Do not change the visual design, layout, copy tone, colours, fonts or component structure.** Only touch metadata, structured data, routes, config, assets and performance behaviour. If a fix would change what a visitor sees, find another way or skip it and report it.

**Hard rules:** keep every existing slug (301 any removed URL, `/treatment-costs` → `/treatments`). No prices, "₹", "cost" or "cheapest" anywhere in visible text, metadata, schema, llms.txt or FAQ. Banned claims: "painless guaranteed", "100% success", "gold medalist", "10K+". Spell **Parmod** Gulia (alias "Pramod Gulia" only in `alternateName`). There are **two clinics** (Sector 53 and Sector 57): never write "one clinic". Do not invent facts: only use data already on the site or in the content files. Where a number is unverified (Google rating count, founding year), omit it.

Target: **Lighthouse 90+ on Performance, Accessibility, Best Practices and SEO, on mobile and desktop, for /, /treatments, one treatment page, /our-dentists and a clinic page.** Run Lighthouse (mobile preset and desktop preset, production build, throttled) before and after and give me a table.

## 1. Technical SEO
1. `app/layout.tsx`: `metadataBase` = `https://dentalkrafts.com`, `lang="en-IN"`, viewport, theme-color, `robots` index/follow, `max-image-preview:large`.
2. Per page `generateMetadata`: unique `<title>` (≤ 60 chars, pattern "{Primary keyword} | {Credential hook} | Dental Krafts") and description (≤ 155 chars, location + doctor + proof), self-referencing canonical, Open Graph (`og:image` 1200×630, `og:locale en_IN`), Twitter large card. Use the keywords in `FINAL-HANDOFF/03-SITEMAP.md` §3.
3. `app/sitemap.ts` (all public URLs, correct `lastModified`, `alternates.languages` for en-IN, ja, ko) and `app/robots.ts` (allow all, point to the sitemap; do not block `/_next/static`). Add `x-robots-tag: noindex` on `/privacy-policy`-style utility pages only if currently noindex.
4. `hreflang` en-IN ↔ ja ↔ ko with `x-default`. Canonical on language pages must not point to English.
5. Redirects in `next.config.js`: `/dr-pramod-gulia` → `/dr-parmod-gulia`, `/treatment-costs` → `/treatments`, trailing-slash normalisation, www → apex, http → https. No redirect chains.
6. Custom `not-found.tsx` that returns a real 404, with links to treatments and booking.
7. Headings: exactly one `<h1>` per page, no skipped levels, without changing the look (change the tag, keep the class).
8. Internal links: breadcrumbs (visible ones already exist; add `BreadcrumbList` schema), related-treatment links, and descriptive anchor text. Remove empty or "click here" links.
9. All images: meaningful `alt` (not filenames, no keyword stuffing; decorative = `alt=""`), explicit width/height.

## 2. Structured data (JSON-LD, server-rendered, one `<script>` per entity)
Build a typed helper `lib/schema.ts` and validate every page with the Rich Results Test and Schema.org validator.
- **Site-wide:** `Organization` (name, url, logo, `sameAs`: Practo, Justdial, Google Maps, Instagram/YouTube if on the site), `WebSite`.
- **Two branches:** `Dentist` + `MedicalClinic` (type array) for Sector 53 and Sector 57. Include: `@id`, address, `geo`, `telephone`, `openingHoursSpecification` (Mon, Tue, Thu, Fri, Sat, Sun; Sector 53 10:00–20:00, Sector 57 10:00–20:30; Wednesday closed), `hasMap`, `image`, `areaServed`, `availableService`, `parentOrganization`, `medicalSpecialty`. `aggregateRating` only with numbers shown on the page. **No `priceRange`, `offers` or `price`.**
- **Two people:** `Physician` for Dr Ruchi Goel (`alumniOf` AIIMS New Delhi and D.A.V. Centenary Dental College, `identifier` A-7387, `knowsAbout`, `worksFor` both clinics) and Dr Parmod Gulia (`alumniOf` PGIMER Chandigarh, `identifier` A-12323, `alternateName` "Pramod Gulia"). Cross-link by `@id`.
- **Pages:** `FAQPage` wherever an FAQ is visible (answers must match the visible text exactly), `BreadcrumbList` everywhere, `MedicalProcedure` / `MedicalWebPage` on each treatment page (with `bodyLocation`, `howPerformed`, `preparation`, `followup` from the existing copy, no cost), `VideoObject` for each reel (`thumbnailUrl`, `uploadDate`, `duration`, `contentUrl`), `CollectionPage` + `ItemList` on `/treatments`, `Article` + author on blog posts, `ImageObject` for before/after.
- Use `@id` references so the graph links up (Organization → Branches → Physicians → Procedures).

## 3. GEO (generative engines) and AEO (answer engines)
1. **`/llms.txt`** (static route): a concise Markdown index of the site: one-paragraph summary (who, where, two clinics, two specialists, languages), then sections for Doctors, Clinics (full NAP + hours), Treatments (name, one-line description, URL), Patient resources, Contact and booking. Absolute URLs, no prices, no marketing superlatives.
2. **`/llms-full.txt`**: the same, plus the full plain-text content of the doctor, clinic and treatment pages (generated at build time from the content files, so it never goes stale).
3. **`/ai.txt`-style allowances in `robots.txt`:** explicitly allow `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Claude-SearchBot`, `Google-Extended`, `Applebot-Extended`, `CCBot`. (Ask me before adding any `Disallow`.)
4. **Answer-first content, no UI change:** for every treatment page, make sure the first paragraph under the H1 directly answers "what is it, who is it for, who treats it, how many visits" in 40–60 words (use the existing copy; do not add new claims). Question-style H2/H3s that already exist stay as-is; mark them up with `FAQPage`.
5. **Entity consistency:** the same business name, address, phone and hours (NAP) in the footer, clinic pages, schema, llms.txt and Google Business Profile. Add a `/about-us` "facts" block as plain HTML (hidden only visually if the design already hides it; do not add new visible UI): founded/years of experience (17+ years only), doctors, qualifications, memberships, clinic addresses.
6. **Citations for E-E-A-T:** every doctor and treatment page shows the reviewer/author (the treating dentist) and a "last reviewed" date in the markup (`dateModified`, `reviewedBy`); render the date visibly only where a date already appears.
7. Add `lang`/`inLanguage` for the Japanese and Korean pages and make sure they have their own metadata and FAQ schema.
8. Local: embed Google Maps only on click (see performance), `sameAs` to the GBP listings, `hasMap` URLs, and consistent "Gurugram"/"Gurgaon" usage as in the sitemap keywords.

## 4. Performance: 90+ mobile and desktop
Measure first. Fix in this order and stop when all four categories are 90+.
1. **Images:** use `next/image` everywhere with correct `sizes`, `priority` only on the LCP image (the hero doctor portrait), `loading="lazy"` for everything else, AVIF/WebP, no image wider than 2× its display size (the current gallery and treatment photos are up to 3930 px wide; resize them at build time), `fetchpriority="high"` on the LCP image, and `decoding="async"`.
2. **Video:** the 9:16 reels use `preload="none"` with a poster; never autoplay; load the `<video>` source only when the card enters the viewport or is tapped. Serve the 540×960 compressed files.
3. **Fonts:** `next/font` for Fraunces and Figtree (self-hosted, `display: swap`, only the weights and axes in use, `preload` the two above-the-fold files). Remove any Google Fonts `<link>`.
4. **JavaScript:** dynamic-import below-the-fold sections, the results slider, the booking form, the motion layer (`dk-motion.js`) and Lenis after first paint (`requestIdleCallback`). Remove unused dependencies. Keep client components small; prefer server components. Check the bundle with `@next/bundle-analyzer` and give me the before/after.
5. **Third parties:** GA4 (`G-435EXMXJGW`) via `next/script strategy="afterInteractive"` (or `lazyOnload`), and Google Maps / embeds loaded only on click with a static image placeholder. No chat widgets above the fold.
6. **Layout shift (CLS < 0.05):** explicit `width`/`height` or `aspect-ratio` on every image, video and the sticky header; reserve space for the live open/closed chip; render the time-based status after mount (this also fixes hydration error #418).
7. **LCP < 2.5 s, INP < 200 ms, TBT < 200 ms:** preload the hero image, avoid render-blocking CSS (inline critical CSS, defer the rest), no layout-thrashing scroll handlers (use `IntersectionObserver` and passive listeners; throttle with `requestAnimationFrame`), respect `prefers-reduced-motion`.
8. **Caching and delivery:** `Cache-Control: public, max-age=31536000, immutable` for hashed static assets and `/images`/`/videos`; enable compression; use `next/image` CDN; add `Link: <...>; rel=preload` only for the LCP image and the two fonts.
9. **Accessibility (target 95+):** contrast per the style guide (orange text only at display size, `--orange-ink #B34D0C` for small text), visible focus rings, skip link, labelled form fields with `aria-live` errors, `button` vs `a` correctness, `alt` text, landmark roles, tap targets ≥ 44 px, and `role="slider"` + keyboard support on the before/after slider.
10. **Best Practices:** security headers in `next.config.js` (`X-Content-Type-Options`, `Referrer-Policy: strict-origin-when-cross-origin`, `X-Frame-Options`/CSP `frame-ancestors`, `Permissions-Policy`), no console errors, no deprecated APIs, HTTPS-only assets, correct image aspect ratios.

## 5. Tracking and QA
- Keep the GA4 events: `book_submit`, `call_click` (with clinic), `whatsapp_click`, `direction_click`, `concern_chip_click`, `video_play`, `ba_slider_drag`. Remove `price_view`.
- Verify: Lighthouse table (before/after, mobile and desktop, 5 URLs), Search Console-ready sitemap, Rich Results Test for FAQ, Dentist, Physician, Breadcrumb, VideoObject; `curl -I` for redirects; `view-source` of `/` shows the JSON-LD and the H1 server-rendered; `/llms.txt`, `/llms-full.txt`, `/robots.txt`, `/sitemap.xml` return 200.
- Visual regression: take before/after screenshots at 390 and 1440 px of /, /treatments and one treatment page. There must be **no visible difference**; report anything that changed.

## 6. Deliverable
A short changelog by file, the Lighthouse table, the list of anything you skipped (and why), and a checklist of items I must do outside the code: claim and verify Google Business Profile for both clinics (same NAP as the site), submit the sitemap in Search Console and Bing Webmaster Tools, and ask the clinic for any unverified facts (founding year, Google review count).
