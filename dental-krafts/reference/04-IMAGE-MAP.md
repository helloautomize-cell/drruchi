# Dental Krafts image map v2 (27 Oct 2026)

Every image on the new site, by page and section. Replaces `03-image-connection.md` and `07-image-resources.md`. All paths are under `/images/` (copy `09-ASSETS/images/` to `public/images/`). The full index of real photos, with IDs and original filenames, is `09-ASSETS/images/image-index.csv`.

**Legend:** 🟢 real photo · 🤖 AI image (mood, or doctor retouch with consent) · 🟡 stock from the current site (use only where nothing better exists) · 🔵 logo / graphic · 🎬 video

**Rules:** AI people are mood only (never captioned as patients, never next to results). Results, clinics, reviews, awards and reels are always real. The before/after files are ~400px wide: show them at 400px or less until the clinic sends originals. Sliders use the split halves in `results/split/{name}__before.webp` and `__after.webp`.

---

## A. Global

| Slot | Image | Path | Notes / alt |
|---|---|---|---|
| Header logo (forest header) | 🔵 B02 | `brand/dk-logo-reversed.svg` | alt "Dental Krafts", 40px tall desktop, 34px mobile |
| Logo on light backgrounds | 🔵 B01 | `brand/dk-logo-colour.svg` | for print, emails, JP/KR light sections |
| Footer logo | 🔵 B02 | `brand/dk-logo-reversed.svg` | |
| Favicon / app icon | 🔵 from B01 | derive tooth mark from `dk-logo-colour.svg` | 32, 180, 512 px PNG on cream |
| Open Graph default 1200×630 | 🤖 | `ai/doctors-duo.webp` | crop on the doctors, logo bottom-left |
| Press | 🔵 A11 | `awards/press-ani-logo.webp` | + "The Tribune" as text |
| Doctor avatars (concierge, chips, "who treats this") | 🤖 | `ai/dr-ruchi-portrait.webp`, `ai/dr-parmod-portrait.webp` | 40–48px circles, object-position 50% 25% |

## B. Home page (approved layouts)

| # | Section | Image(s) | Path | Crop / notes | Alt |
|---|---|---|---|---|---|
| 1 | Hero E photo (crossfade) | 🤖 ×3 | `ai/hero-smile-30f.webp` (default, gaps, stained, child) · `ai/hero-smile-60f.webp` (missing, chipped) · `ai/hero-smile-40m.webp` (tooth pain) | 4:5, radius 36, Ken Burns. Keep top-left and bottom-right clear for the glass cards | "A woman laughing with a warm, natural smile" (adapt per photo) |
| 1 | Hero mini results card | 🟢 BA12 | `results/split/ba-12-smile-makeover__before.webp` / `__after.webp` | 2 small squares | "Before and after a smile makeover" |
| 1 | Concierge avatar | 🤖 | `ai/dr-ruchi-portrait.webp` / `ai/dr-parmod-portrait.webp` (both for "Either") | circles | "" (name shown in text) |
| 2 | Trust strip | 🔵 A11 | `awards/press-ani-logo.webp` | greyscale 60% | "ANI" |
| 3 | Dentists C: Dr Ruchi (featured) | 🤖 | `ai/dr-ruchi-portrait.webp` | tall frame, object-position 52% 30% | "Dr Ruchi Goel, prosthodontist and implantologist" |
| 3 | Dentists C: Dr Parmod | 🤖 | `ai/dr-parmod-portrait.webp` | 4:5 | "Dr Parmod Gulia, pediatric dentist" |
| 4 | Treatments B preview, row 1 Replace missing teeth | 🤖 | `ai/treat-implants.webp` | 4:3 | "A dental implant with a ceramic crown" |
| 4 | row 2 Save a painful tooth | 🤖 | `ai/treat-rootcanal.webp` | | "A tooth model cut to show the roots" |
| 4 | row 3 Design your smile | 🤖 | `ai/treat-smile-design.webp` | | "Porcelain veneers beside a hand mirror" |
| 4 | row 4 Straighten teeth | 🤖 | `ai/treat-aligners.webp` | | "Clear aligners on their case" |
| 4 | row 5 Kids and teens | 🤖 | `ai/treat-kids.webp` | | "A child's toothbrush and a toy tooth" |
| 4 | row 6 Gums and emergencies | 🤖 | `ai/treat-gums-emergency.webp` | | "Water, floss and a soft toothbrush" |
| 5 | Results B grid (6) | 🟢 BA13, BA12, BA24, BA01, BA07, BA03 | `results/split/ba-13-smile-makeover__*`, `ba-12-smile-makeover__*`, `ba-24-full-mouth-rehabilitation__*`, `ba-01-direct-veneers__*`, `ba-07-gap-filling__*`, `ba-03-back-teeth-implant__*` | square, before then after on hover | captions in `homepage-copy.md` |
| 6 | Why B: 1 Specialists | 🟢 D07 | `doctors/dk-doctors-performing-procedure-1.webp` | 4:5 | "Both dentists treating a patient together" |
| 6 | Why B: 2 Plan and price | 🟢 C06 | `clinic/reception-lounge.webp` | | "The Dental Krafts reception" |
| 6 | Why B: 3 Hygiene | 🟢 D08 | `doctors/dk-doctors-performing-procedure-2.webp` | replace with sterilisation photo when shot | "Sterile instruments ready for treatment" |
| 6 | Why B: 4 Two clinics | 🟢 C03 | `clinic/storefront-signage-reception.webp` | | "Dental Krafts storefront and reception" |
| 7 | Dr Ruchi explains player + playlist | 🎬 reels 01, 03, 04, 06 | posters `reels/reel-0N-dr-ruchi-explains.webp` (or first frame), videos `videos/reel-0N-dr-ruchi-explains.mp4` from `videos.zip` | 9:16, re-encode ≤ 3 MB, captions | titles in copy file |
| 8 | Stories C video | 🎬 reel 07 | `videos/reel-07-patient-rekha-seth.mp4`, poster `reels/reel-07-patient-rekha-seth.webp` | 9:16 | "Rekha Seth, a Dental Krafts patient" |
| 9 | Recognition A strip (forest) | 🟢 A01, A09, A10, A04, A08, A07 | `awards/national-achievers-2025-gulshan-grover-1.webp`, `aiims-prosthodontics-celebration.webp`, `parmod-gulia-mds-degree-health-minister.webp` (crop the bottom 25% caption bar), `national-achievers-2025-mahima-chaudhry.webp`, `prime-impact-excellence-award.webp`, `clinic-celebrity-visit-king.webp` | 4:3 cards | captions in copy file |
| 10 | Kids A band (forest) | 🟢 C11, K01 | `clinic/kids-operatory-mural.webp` (crop icon overlays, left 70%), `kids/kids-real-patients-collage.webp` (≤ 360px) | | "The children's treatment room with a painted mural", "Children smiling during their visit" |
| 10 | Kids badge | 🔵 dk-icons | `#dk-kids` (replaces `3d/teddy_bear_3d`) | | |
| 12 | Clinics A: Sector 53 | 🟢 C01 | `clinic/sector-53-storefront.webp` | 3:2 | "Dental Krafts Sector 53 storefront, South Point Mall" |
| 12 | Clinics A: Sector 57 | 🟢 C02 | `clinic/sector-57-operatory.webp` | 3:2 (exterior photo still needed) | "Dental Krafts Sector 57 treatment room" |
| 12 | International strip icon | 🔵 Lucide `globe` | replaces `3d/globe_showing_asia-australia_3d` | | |
| 15 | Footer | 🔵 B02 | `brand/dk-logo-reversed.svg` | | |

Sections 11 (Costs), 13 (FAQ) and 14 (Booking) use icons only.

## C. Doctor pages

| Page | Section | Image | Path |
|---|---|---|---|
| /dr-ruchi-goel | Hero | 🤖 | `ai/dr-ruchi-portrait.webp` |
| | About / In the clinic | 🤖 | `ai/dr-ruchi-at-work.webp` (wide crop, keep the implant model in frame) |
| | Cases | 🟢 BA13, BA12, BA16, BA22, BA24, BA02, BA11*, BA14, BA29 | `results/split/…` (*BA11 face shot only with consent) |
| | Videos | 🎬 reels 01–06 | `videos/…`, posters `reels/…` |
| | Recognition | 🟢 A01, A02, A03, A04, A05, A08, A09 | `awards/…` |
| | Reviews | 🟢 R03 avatar | `reviews/shirin-kujur.webp`; others as initial avatars |
| | Where to see her | 🟢 C01, C02 | as homepage clinic cards |
| /dr-parmod-gulia | Hero | 🤖 | `ai/dr-parmod-portrait.webp` |
| | In the clinic | 🤖 or 🟢 | `ai/dr-parmod-at-work.webp` (crop out the garbled coat text, or use the regenerated version) or `doctors/dk-doctors-performing-procedure-1.webp` |
| | Milestone | 🟢 A10 | `awards/parmod-gulia-mds-degree-health-minister.webp` (crop caption bar) |
| | With kids | 🟢 K01, C11, D07 | `kids/…`, `clinic/kids-operatory-mural.webp`, `doctors/dk-doctors-performing-procedure-1.webp` |
| | Cases | 🟢 BA06, BA18, BA19, BA21, BA07 | ⚠ confirm doctor |
| | Reviews | 🟢 R01, R05 | `reviews/chandan-sharma.webp`, `reviews/vrinda-gupta.webp` |
| /our-dentists | Hero | 🤖 | `ai/doctors-duo.webp` |
| | Cards | 🤖 | both portraits |

## D. Treatment pages (hero + support + results)

| Page | Hero | Support | Results to show |
|---|---|---|---|
| /dental-implants | 🤖 `ai/treat-implants.webp` | 🤖 `ai/dr-ruchi-at-work.webp` · 🟡 S01 `services/implants-3d-render.webp` | BA03, BA04, BA05, BA29 |
| /all-on-4-dental-implants (NEW) | 🤖 `ai/treat-implants.webp` | 🟡 S02 `services/all-on-4-6-render.webp`, S03 | BA22, BA24, BA02 |
| /full-mouth-rehabilitation (NEW) | 🟢 BA24 after (crop) or 🤖 `ai/treat-smile-design.webp` | 🤖 `ai/dr-ruchi-at-work.webp` | BA22–BA28, BA02 |
| /dentures | 🤖 `ai/treat-dentures.webp` | 🟡 S11 `services/dentures-hands.webp` | BA11*, BA14 |
| /dental-crowns | 🤖 `ai/treat-crowns.webp` | 🟡 S06 `services/crowns-ceramic-row.webp`, 🔵 S08 chart | BA12, BA13, BA16, BA08 |
| /dental-veneers | 🤖 `ai/treat-smile-design.webp` | 🟡 S09 `services/veneer-placement.webp`, 🔵 S10 | BA01, BA15, BA19 |
| /smile-makeover | 🤖 `ai/treat-smile-design.webp` | 🔵 S10 `services/veneer-smile-styles.webp` | BA12, BA13, BA22, BA28 |
| /cosmetic-dentistry | 🤖 `ai/hero-smile-30f.webp` | 🔵 S10 | BA01, BA07, BA15 |
| /teeth-whitening | 🤖 `ai/hero-smile-30f.webp` | 🟡 S18 `services/whitening-blue-light.webp` | BA09, BA10, BA08 |
| /root-canal-treatment | 🤖 `ai/treat-rootcanal.webp` | 🔵 S14 `services/rct-steps-diagram.webp` | none yet (ask for cases/X-rays) |
| /dental-fillings | 🤖 `ai/treat-rootcanal.webp` | 🟡 S28 `services/fillings-render.webp` | BA21 |
| /teeth-cleaning | 🤖 `ai/treat-gums-emergency.webp` | 🔵 S17 `services/cleaning-types-chart.webp` | BA06, BA18, BA19 |
| /gum-disease | 🤖 `ai/treat-gums-emergency.webp` | 🟡 S19 `services/gums-bleeding-closeup.webp` | BA06 |
| /laser-dentistry | 🟡 S29 `services/laser-gums-goggles.webp` | 🟡 S30 | BA23 ⚠ confirm |
| /teeth-braces | 🤖 `ai/treat-aligners.webp` | 🟡 S22 `services/braces-closeup.webp` | BA17, BA20 ⚠ confirm ortho |
| /invisalign | 🤖 `ai/treat-aligners.webp` | 🟡 S20 `services/aligner-insert.webp` | ask for aligner cases |
| /pediatric-dentist | 🤖 `ai/dr-parmod-at-work.webp` | 🤖 `ai/treat-kids.webp` · 🟢 K01, C11, D07 | — |
| /wisdom-tooth-extraction | 🤖 `ai/treat-gums-emergency.webp` | 🟡 S34 `services/extraction-forceps.webp` | — |
| /emergency-dentist | 🤖 `ai/treat-gums-emergency.webp` | 🟢 C01 storefront (find us fast) | — |
| /toothache-treatment | 🤖 `ai/hero-smile-40m.webp` | 🟡 S32 | — |
| /general-dentistry | 🟢 D08 `doctors/dk-doctors-performing-procedure-2.webp` | 🤖 `ai/treat-gums-emergency.webp` | — |

## E. Clinic and location pages

| Page | Hero | Gallery |
|---|---|---|
| /dental-clinic-sector-53-gurgaon | 🟢 C03 `clinic/storefront-signage-reception.webp` | C01, C06, C07, C10 |
| /dental-clinic-sector-57-gurgaon | 🟢 C02 `clinic/sector-57-operatory.webp` | C11, D07, D09 (exterior photo needed) |
| /best-dental-clinic-golf-course-road-gurgaon | 🟢 C04 `clinic/storefront-signage-wide.webp` | C01, C06 |
| /best-dental-clinic-gurgaon | 🤖 `ai/doctors-duo.webp` | C01, C02, C06 |

⚠ C03–C07 all show the same glass storefront. Confirm with the clinic which branch it is (the C01 caption says Sector 53).

## F. Other pages

| Page | Images |
|---|---|
| /treatments | the six 🤖 `ai/treat-*.webp` group images |
| /treatment-costs | icons only (dk-receipt, dk-tooth, dk-implant) + 🤖 `ai/treat-crowns.webp` header |
| /gallery | 🟢 all BA01–BA33 (`results/split/…`) |
| /patient-stories | 🎬 reels 07, 08 + YouTube AUyywhtjBjo, boqpk0vKBAo, CDK7IF63PZQ; 🟢 R01–R05 avatars |
| /medical-tourism | 🤖 `ai/doctors-duo.webp` hero; 🟢 C06; results BA13, BA22 |
| /japanese, /korean | same as home; **remove the "academic exchange" captions** on A09, A10, A06 |
| /about-us | 🤖 `ai/doctors-duo.webp`; 🟢 C06, C07, recognition photos |
| /contact-us | 🟢 C01, C02 clinic cards |
| /blog | 🤖 treatment images by category; author avatars from the doctor portraits |

## G. Retire (do not use)
- All orange-dot collage images (`*-in-gurgaon.webp`), `pattern_shape_1.png`, `hn1/hn2/hn3.webp`.
- Stock "doctor" faces (including the male doctor in reel 05's first frame as a still).
- `img/3d/*` Fluent 3D emoji (replaced by dk-icons).
- The old doctor photos D01, D02 (baked-in "Google 5.0 / 10K+" badges), D03, D05, D06 (replaced by the AI retouches).
- `img/hero/*` Unsplash smiles from the options build (replaced by the AI hero smiles).

## H. Still missing (ask the clinic or book a half-day shoot)

| # | Shot | For |
|---|---|---|
| 1 | Sector 57 storefront exterior and Bestech mall approach | Sector 57 card and page |
| 2 | Sector 53 South Point Mall entrance and lift lobby | Sector 53 "how to find us" |
| 3 | Sterilisation area: autoclave, sealed pouches | Why B item 3 (hygiene) |
| 4 | Aligner trays, intraoral scanner, laser unit (macro) | Invisalign, laser pages |
| 5 | Team photo with assistants | About |
| 6 | 10–15 new before/after sets at full resolution, same framing, consent signed | Gallery, treatment pages |
| 7 | Root canal cases or X-rays | Root canal page results |
