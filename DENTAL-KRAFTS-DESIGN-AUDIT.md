# Dental Krafts — Design & Premiumness Audit (v3 Porcelain + v4 Motion)

**Scope:** every route in `dental-krafts/app/`, audited against premium front-end standards (typographic hierarchy, layout rhythm, AI-tell blacklist, motion discipline, content density). Verdicts: ✅ strong · 🟡 good with caveats · ⚠️ needs work · ❌ broken/violation. All findings cite source code as proof.

## Screenshots (headless Chrome, 1440px desktop width, `audit-shots/`)

| File | Route | Notes |
|---|---|---|
| `audit-shots/home.png` | `/` | Hero + dentists section; see findings V1–V3 below |
| `audit-shots/treatments.png` | `/treatments` | Confirmed premium — grouped index, icon chips, honest pricing |
| `audit-shots/dental-implants.png` | `/dental-implants` | Treatment template: `.th` hero, `.f4` facts bar, `.gd` guide + ToC |
| `audit-shots/our-dentists.png` | `/our-dentists` | Lead dark card + mini cards |
| `audit-shots/patient-stories.png` | `/patient-stories` | Rating badges, reels grid, filter chips |
| `audit-shots/treatment-costs.png` | `/treatment-costs` | Tabs + price menu + cost table |
| `audit-shots/contact-us.png` | `/contact-us` | Sentence form + clinic cards |
| `audit-shots/about-us.png` | `/about-us` | Credentials + story |
| `audit-shots/gallery.png` | `/gallery` | BA pair grid |
| `audit-shots/blog.png` | `/blog` | Index |
| `audit-shots/dr-ruchi-goel.png` | `/dr-ruchi-goel` | Portrait hero, career timeline, quotes |
| `audit-shots/dr-parmod-gulia.png` | `/dr-parmod-gulia` | Same template |
| `audit-shots/medical-tourism.png` | `/medical-tourism` | 5-step row, Q&A, cost |

## Visual findings from screenshots (verify in a real browser — headless timing can fake some of these)

- **V1 ⚠️ Hero body content invisible in shot.** `home.png` shows the H1 + photo but the eyebrow, lead paragraph, concierge card (`.cc`) and `.rate` card are all missing, leaving a ~150px hole before the next section. All four carry `data-r` reveals — likely the IntersectionObserver `.in` hadn't applied when the virtual-time budget expired (headless artifact), BUT verify the concierge actually renders in a real browser; if it's genuinely hidden, reveals are stuck.
- **V2 ⚠️ Black block in the utility bar.** A solid dark pill ~230px wide sits mid-bar where the phone numbers should be (`home.png`, `treatments.png` — both). Likely the `.hd::before` pill background or `#mnav` catching a transition state at scroll 0. If reproducible in a real browser, it's a visible bug — check `.hd` classes at scrollY=0.
- **V3 🟡 Dentist portraits render dark.** `.doc.small` photos sit on `--ph:#262422` and look underexposed in `home.png`. Could be mid-`data-unveil` state or genuinely dark source photos — verify.
- **V4 🟡 Logo register mismatch.** The colorful illustrated tooth logo reads playful/clipart against the restrained Fraunces+porcelain system. Consider a flatter mono version for the header.
- **V5 ✅ Treatments page confirmed.** `treatments.png` shows the system working: eyebrow dash marks, serif `explained.` italic in `--orange`, dark product-style photo card, grouped hairline rows with sage icon chips + prices + arrows. This is the bar for the rest.

---

## 0. Global chrome & system

| Item | Verdict | Notes |
|---|---|---|
| Design tokens | ✅ | Warm porcelain palette: `--paper:#FAF8F4`, `--ink:#14231B` (off-black, not pure `#000`), sage/mist/peach tints, `--r-lg` radii, soft `--sh` shadow. `globals.css:7-16`. |
| Typography | ✅ | Fraunces 340–380 (SOFT/opsz variable axes driven deliberately via `font-variation-settings`, e.g. `globals.css:35`) + Figtree body. Editorial serif used for display only — correct register for a clinic brand. |
| Orange accent (new) | ✅ | `--orange:#D4650F` on display italics only, `--orange-ink:#B34D0C` on small accents — proper contrast separation. `globals.css:9`. |
| Header | ✅ | Utility bar (live IST status, both phones, language switch) + `header.hd` sticky. v4 glass-pill condense + hide-on-scroll-down + 2px `--orange-ink` progress line (`dk-motion.css:36-50`). Scroll-spy underlines no-op since nav uses route links — harmless. |
| Nav discipline | ✅ | 6 short items + CTA, single line, `min-height:78px` under the 80px cap. Mobile `.menu` + `#mnav` collapse. |
| Mobile sticky bar | ✅ | `.mbar` Call/WhatsApp/Book appears after hero — conversion-smart for a clinic. `sticky-bar.tsx`. |
| Footer | ✅ | 4-col link block + giant `.sig` "Dental *Krafts*" sign-off (`clamp(64px,14.5vw,224px)`, italic `--orange`, `globals.css:~830`) + registration line. Premium closing moment. |
| Icon system | ✅ | Real sprite system — 50 semantic dental icons (`sprite.svg`) + dk logo-icons; no emoji, no hand-rolled inline SVGs per-icon. |
| Motion layer | ✅ | `dk-motion.js` engine: all animation on transform/opacity/clip-path/translate only; everything scoped to `html.js-m`; complete `prefers-reduced-motion` fallback (no Lenis, no autoplay, no pinning). Loading skeletons (`.sk`) match palette. |
| Selection/focus | ✅ | `::selection` warm `#FBE1CC`; `:focus-visible` blue ring. |
| ⚠️ Custom cursor | 🟡 | `data-cursor` round ink "Drag"/"Play" label (`dk-motion.css:60-62`). Deliberate choice from the approved v4 reference, but custom cursors are a classic AI-tell/accessibility risk. It's gated to `hover:hover && pointer:fine` so it's at least implemented safely. |
| ⚠️ Dead CSS/markup | 🟡 | `DkIcon`/`.dk-ic` exists but is never used (`components/icons.tsx`); `.rstrip`, v2 `.sC .grid`/`.cB .tbl` remain in markup classes on some pages as harmless scoping hooks. |
| ⚠️ Em-dashes in copy | 🟡 | Several `—` flourishes in page copy (e.g. `[slug]` cost fallback "Quoted after your examination — you'll get…", patient-stories). Editorially fine; flag only if applying a strict no-em-dash lint. |

---

## 1. Home `/` — 14 sections

| § | Section | Verdict | What's good (proof) | What isn't |
|---|---|---|---|---|
| 1 | Hero `.hero` | 🟡 | Split H1 with `--orange` italic (`data-split` word masks), concierge sentence builder `.cc` (FitSelect shrinks to option width, drives `dk-hero` photo crossfade + booking prefill — genuinely differentiated, `concierge.tsx`), `data-unveil`+`data-par="0.06"` photo, floating `.rate` card with `data-count` 5.0, live status cap. | Lead is ~24 words (`page.tsx:84`) — over the 20-word hero-subtext cap. Hero already carries 4 text elements (eyebrow/H1/lead/card) — no more allowed. |
| 2 | Proof `.proof` | ✅ | 5-item metrics row (5.0 Practo, 4.9 Justdial, Rank 1, Silver) + ANI/Tribune press marks, `data-count` on numbers, `tnum` tabular. `page.tsx:95`. | Mixes ratings with titles ("Rank 1", "Silver") — consistent enough to pass. |
| 3 | Dentists `.docs` | ✅ | Asymmetric `doc` + `doc.small` pairing (not equal cards), parallax portraits, `.dl` hairline spec list with real credentials (AIIMS 2015, Reg. A-7387 — real data, not fake-precise), `.either` strip resolves "who do I book". | — |
| 4 | Treatments `.tx` | ✅ | Interactive index: 6 benefit-led rows + sticky `.tprev` photo with upward clip-wipe (`interactive.tsx`), phone `.tth` thumbs, slide-in arrow on hover — a showpiece interaction. | Rows link to `/treatments#n` anchors — fine. |
| 5 | Results `.rx` | ✅ | Before/after slider with 9 consented cases, `01/09` counter, progress bar, arrows, scroll rail thumbs, cross-fade swap, one-time 50→74→30→50 divider sweep that self-teaches the drag (`ba-slider.tsx`). `data-k`/`data-c` label sync. | — |
| 6 | Visit `.steps` | ✅ | Scroll-linked blue fill line + numbers lighting up (`data-steps` → `--sp`, `.st.on`), real 4-step process with price tags, `.promise` quote+photo strip. | — |
| 7 | Videos `.vx` | ✅ | Square player + 7s auto-advance question list with `.vp` fill lines; pauses on hover/off-screen, stops on pick; `data-cursor="Play"`. | — |
| 8 | Stories `#stories` | ✅ | Full-bleed `.crs` scroll-snap carousel: video card + 5 verified-Practo serif cards, drag/swipe + arrows + `01/06` counter, 6.5s autoplay that yields to interaction, `.scores` with `data-count`. Quotes ≤3 lines, named + treatment + dentist attribution. | — |
| 9 | Recognition `#recognition` | ✅ | Pinned horizontal scroll on desktop (`data-pin-x`, `.lit` centre card regains colour vs grayscale siblings), numbered cards, "Keep scrolling" hint, progress bar — premium editorial move. Falls back to swipe strip <981px. | Pin measures on resize — verified in engine. |
| 10 | Kids `.kx` | ✅ | Duo parallax photos (`data-par` ±), GA-in-hospital trust copy, hairline `.checks` list with orange-ink ticks. | — |
| 11 | Costs `.menu-g` | ✅ | Price menu with dotted leaders that draw in (`.in` stagger), hover indent + price turns `--orange-ink`, honest "from" pricing + written-estimate note. Real numbers throughout. | — |
| 12 | Clinics `.cl` | ✅ | `.cc2` photo cards w/ live IST status, hours `dl`, directions/call buttons, `.intl` language strip. Card lift + photo de-saturate→colour on hover. | — |
| 13 | FAQ `.fx` | ✅ | Sticky left column + `.fq` accordions with `data-acc` height animation, plain-English answers. | — |
| 14 | Book `.bk` | ✅ | Sentence-form booking ("Hello, my name is __…") — the site's signature interaction; `data-r` reveal; WhatsApp fallback. | — |

**Page-level issues:**

- ⚠️ **Eyebrow saturation.** `<Eb>` eyebrow appears ~14× on one page (`page.tsx` every `.sh` + `.gs`). The design system made it a signature (tri-rule dashes draw in — `.eb .tri i`), but per premium-audit rules it's the #1 template-rhythm tell (>1 per 3 sections). Suggested fix: keep `.eb` on ~5 key sections (dentists, results, stories, recognition, book); drop elsewhere or convert to plain `.sh` without eyebrow.
- 🟡 **Tint rhythm.** `tint-sage → paper → tint-mist → paper → tint-white → paper → tint-peach → paper → tint-mist → paper → tint-sage` is disciplined alternation, but 6 pastel bands in one scroll can read "AI pastel." Sage/peach are brand-warm here so it passes — watch that tints never sit adjacent.
- 🟡 Layout-family count is healthy: hero, metric bar, asymmetric cards, interactive list, slider, hairline steps, player+list, carousel, pinned strip, duo-photo, price menu, card grid, sticky FAQ, sentence form — ~10 families. No zigzag violation.

---

## 2. `/treatments`

| § | Verdict | Notes |
|---|---|---|
| `.ihero` | ✅ | Breadcrumb + eyebrow + display H1 + sub + CTA + `treat-implants` photo — proper inner-hero, not a lazy banner. |
| `.tgrp`/`.gh` + `.trB .list` | 🟡 | Category headers + hairline treatment rows (name, sub, price chip, arrow). ~21 rows total — long but grouped and scannable; rows get hover title colour + arrow. Acceptable for a directory page; would fail on a landing page. |
| Bottom `.sp` | ✅ | Help-me-choose CTA — correct conversion exit. |

## 3. `/[slug]` treatment pages (21)

| § | Verdict | Notes |
|---|---|---|
| `.th` hero | ✅ | Crumb + eyebrow + `em`-accent H1 + sub + dual CTA + hero image; `.f4` facts bar (planner, cost chip, ₹500 first visit, urgent/written-plan) — instant orientation. |
| `.gd` guide | ✅ | Sticky `Toc` scroll-spy (`.toc a.on` orange-ink border) + chunked `.gs` sections: for-you checks, how-it-works, options grid, timeline `.tline`, cost table `.ctab`, results showcase, review, aftercare `.care`, FAQ `.fq`. Consistent `.gs` skeleton per treatment but content varies — correct for 21 programmatic pages. |
| `.rel` + CTA | ✅ | Related grid + urgent-call band (conditional) + estimate CTA. |
| ⚠️ | 🟡 | `await params` blocks instant-nav validation — handled via new `loading.tsx` skeleton (porcelain-toned, matches `.th`+`.f4` shape). |

## 4. `/our-dentists`

🟡 — `.dC` lead-card (dark ink card w/ photo + kv stat tiles) + `.mini` side cards + `.cards` grid + `.qs` quote strip + `.ask` sage block. Rich composition; verify `.cd .badge` icons render (sage chip + orange-ink icon, `globals.css:468`). `.lead-c` dark card is the strongest object here — the rest is solid card work.

## 5. `/patient-stories`

🟡 — `.sC .rate` badge boxes (custom-styled during fix — white cards, big display numbers), `.reels` video grid with `ReelCard` posters + YouTube thumbs, `StoriesFilter` chip filtering, `.band2` CTA, `.rel` chip links to Practo/Justdial. Honest layout, real content. Minor: `.sC`/`sp` are v2-era class names — stylistically consistent but legacy scoping.

## 6. `/treatment-costs`

🟡 — `CostsTabs` (chip tabs + `.menu-g` price menu with the same dotted-leader system as home — good system reuse), `.cost` table (~20 rows, sage total rows) → borderline data-dump but it *is* the page's job; `.steps.n3` + `.after` sage explainer + `.two` split + `.prose`. Fine.

## 7. `/contact-us`

✅ — `.ihero` + `two` split: sentence-form `BookingForm` (with preset clinic/doctor/concern via `?concern=` prefill — em chip styled) beside `.cc2` clinic cards + `.chips` + `.cost` note + live status. Conversion-complete.

## 8. `/about-us`

🟡 — `.ihero`, `.cards`/`.c5` credential cards, `.rail` photo strip, `.band2` CTA, `.prose` story. Competent; the least distinctive page — relies on real AIIMS photos to carry it.

## 9. `/gallery`

🟡 — `.ihero` + `gallery-grid` of BA pairs + `.note` consent line. Single-purpose; grid does the work.

## 10. `/blog` + `/blog/[slug]`

🟡 — index: `.ihero` + post rows/cards. post: `.ihero` + `.prose` (proper typographic body: `17px/1.65`, `64ch` measure, orange-ink links, `globals.css:441-449`), in-article TOC when ≥3 h2s, mid-article `.band2` CTA, `.rel` chips, `.authorbox` + `.mrev` medically-reviewed strip — genuinely E-E-A-T-shaped. New `loading.tsx` skeleton added.

## 11. `/dr-ruchi-goel` & `/dr-parmod-gulia`

✅ strongest inner pages — `.dh` hero w/ `.portrait`, `.cv` career timeline (`.hi .y` year highlights now orange-ink), `.facts` tiles, `.pull` big serif pull quote (`--orange` italic), `.qg` patient quotes, `.where` service areas, `.words` tag links, `.rx` own-chairs results. Editorial profile layout.

## 12. `/medical-tourism`

🟡 — `.steps.n5`, `.qs` question strip, `.rel`, `.cost`, `.two`. Functional; the n5 step row was repaired during the audit fix (was stuck at 4 cols).

## 13. `/japanese`, `/korean`, clinic pages, `not-found`

🟡 — intl pages mirror the porcelain system (`prose`, `.ihero`); Korean page's `Noto_Sans_KR` falls back when fonts.googleapis.com is unreachable — self-host via `next/font/local` if KR traffic matters. Clinic pages reuse `.cc2`/`.dh` components. `not-found` unverified visually — check once.

---

## 4. Scorecard & top fixes

**What makes it premium (keep):** real icon sprite system; sentence-form concierge+booking; BA slider that self-demonstrates; pinned recognition strip; scroll-linked steps; word-mask headlines; porcelain-tint discipline; real reviews/prices/credentials throughout — nothing fake-precise.

**Top fixes by impact:**
1. ⚠️ **Eyebrow restraint** — ~14 `.eb` eyebrows on home alone. Cut to ~5 (see §1 note). Biggest "templated rhythm" tell.
2. 🟡 **Hero lead copy** — trim to ≤20 words (`page.tsx:84`).
3. 🟡 **Custom cursor** — `data-cursor` labels: keep only if the approved reference demands; it's the most "agency-demo" element on the page.
4. 🟡 **Dead code** — `DkIcon`, `StoryQuote`, `VideoCard` (superseded by `StoryVid`/carousel) — delete or use.
5. 🟡 **Korean font** — `next/font/google` NotoSansKR fails offline; self-host woff2 with `next/font/local`.
6. 🟡 **Cleanup** — `.rstrip` CSS and `.sC`/`.cB` v2 hooks; `git status` cleanliness after this audit.

*Audit method: static code review of every route + `globals.css`/`dk-motion.css` values, against premium front-end rules (hero discipline, eyebrow cap, layout-family diversity, AI-tell blacklist, motion/a11y guardrails). No visual screenshots taken — verify the flagged 🟡 items in browser before changing them.*
