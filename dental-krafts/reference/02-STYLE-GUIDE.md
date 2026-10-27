# Dental Krafts style guide v2: Blush and Forest (approved 27 Oct 2026)

Replaces `04-style-guide.md` and `08-visual-style-guide` (the old plum, orange and Smile Arc system). Visual version: `02-style-guide.html` (live: see START HERE). Every value below is what the approved homepage uses (`06-DESIGNS/homepage/source/p1.html`).

**Concept:** "AIIMS-grade precision, family-clinic warmth", told like a 2026 wellness brand. Calm cream pages, deep forest bands, blush warmth, one italic rose word per headline, and real photography doing the decorating. **No gradients, no blobs, no CSS shapes as decoration.**

---

## 1. Colour

| Token | Hex | Role |
|---|---|---|
| `--cream` | #FFFBF5 | Page background, text and buttons on forest |
| `--petal` | #FBF1EE | Alternate section, chips, soft cards |
| `--blush` | #F5E4DE | Alternate section, light buttons, image mats |
| `--blush-2` | #F0D9D1 | Hover on blush |
| `--line` | #EBD3CA | Hairlines, card borders (inset 1px) |
| `--soft` | #E8D3CC | Lead text on forest |
| `--white` | #FFFFFF | Cards |
| `--clay` | #C97B6B | **Decoration only** (dots, small marks). Text on clay must be #121212 |
| `--rose` | #9E5243 | Eyebrows, the italic headline word, links, focus ring |
| `--rose-soft` | #F2C6B8 | Eyebrows and italic word on forest |
| `--forest` | #1E3A30 | Body text, primary button, hero, recognition, kids band, footer |
| `--forest-2` | #27483C | Cards and hovers on forest |
| `--moss` | #4F7A5E | Check icons, "open now" dot, secondary accents |
| `--mint` | #E3ECE5 | Small success fills only |
| `--muted` | #5E5A55 | Secondary text on light |
| WhatsApp | #1F7A4D | WhatsApp button only |

**Contrast (checked, WCAG AA needs 4.5 for body text):** forest on cream 11.96 · rose on cream 5.44 · rose on blush 4.55 · muted on cream 6.64 · rose-soft on forest 7.95 · soft on forest 8.58 · white on WhatsApp green 5.32 · #121212 on clay 5.82. **White on clay is 3.22 and fails: never do it.** Moss on cream is 4.76, so use it for icons and large text only.

**Section rhythm (homepage):** forest hero → cream → petal → cream → blush … with forest bands at Recognition, Kids and Footer. Never put two forest bands next to each other.

## 2. Typography

| Use | Font | Size | Weight / settings |
|---|---|---|---|
| Hero H1 | Fraunces | clamp(44px, 5.6vw, 86px), line-height .97 | ~540, `'SOFT' 100,'opsz' 144`, letter-spacing −0.025em |
| H2 | Fraunces | clamp(34px, 4.4vw, 58px), line-height 1.02 | same |
| H3 | Fraunces | clamp(22px, 2vw, 27px), line-height 1.15 | same |
| Italic word | Fraunces italic | inherit | 400, `--rose` (or `--rose-soft` on forest) |
| Lead | Figtree | 18px, max 58ch | 400, `--muted` (`--soft` on forest) |
| Body | Figtree | 16.5–17px, line-height 1.6 | 400 |
| Eyebrow | Figtree | 12.5px, uppercase, letter-spacing .16em | 700, `--rose` |
| Buttons | Figtree | 15.5px (14.5 small) | 650 |
| Numbers | Figtree | any | `font-variant-numeric: tabular-nums` |

Google Fonts URL: `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght,SOFT@0,9..144,300..800,0..100;1,9..144,300..800,0..100&family=Figtree:wght@400..800&display=swap`. JP/KR pages add Noto Sans JP / Noto Sans KR after Figtree.

**Headline rule:** exactly one italic word per headline, the emotional word: "A smile worth *showing*", "Results from our own *chairs*", "Two clinics. Pick the *closer* one." Use `text-wrap: balance`.

## 3. Layout and spacing
- Max width 1240px, side padding 20px (respect safe-area insets).
- Section padding `clamp(64px, 8vw, 112px)` top and bottom.
- Radii: 36 (hero photo, big panels) · 28 (cards) · 20 (glass cards, images in cards) · 14 (inputs, small tiles) · 999 (pills).
- Shadows: `--sh` for cards that float, `--sh-lg` for the hero photo and modals. Most cards use only an inset 1px `--line` border.
- Grid: 12 columns on desktop, stacking to 1 column under 760px. Hero is 7/5 (text/photo).

## 4. Components

| Component | Spec |
|---|---|
| **Primary button** | Pill, min-height 52px, padding 0 24px, forest bg, white text, 650. Arrow in a 30px round `bic` chip (white 14% on forest) at the end. Hover lifts 1px |
| **Secondary button** | White bg, forest text, inset 1.5px forest outline |
| **Light button** | Blush bg, forest text |
| **On-forest button** | Cream bg, forest text, `bic` chip forest |
| **WhatsApp button** | #1F7A4D bg, white text, WhatsApp glyph |
| **Small button** | min-height 42px, padding 0 18px, 14.5px |
| **Chip** | Pill, 8px 14px, petal bg, inset 1px line, 14px 600. Selected = forest bg, white text. On forest = forest-2 bg, cream text |
| **Card** | White, radius 28, inset 1px line. Petal variant without border |
| **Glass card** | Cream at 90%, `backdrop-filter: blur(14px) saturate(1.2)`, radius 20, `--sh`. Used over the hero photo |
| **Concierge card (hero E)** | Glass on forest: "What brings you in?" + live open pill, 6 concern chips with line icons, result row (doctor avatar(s), "You'll see Dr …", price line), full-width booking button whose label names the doctor |
| **Live status pill** | Moss dot + "Open now · until 8:30 pm"; grey dot + "Closed today · open Thu 10 am". Computed in Asia/Kolkata time |
| **Marquee** | One line, 40–60 s loop, pause on hover, static under reduced motion. Items split by small clay dots |
| **Doctor card (featured)** | Portrait in a 36-radius frame, eyebrow role, Fraunces name, 2-line sentence, 4 stat tiles (big number + small label), primary + text link |
| **Treatment index row** | Number, Fraunces title, small sub, "from ₹" at the right; active row = forest text + rose arrow. Preview panel swaps image, title, doctor chip |
| **Before/after card** | Square, radius 20, before image with after image fading in on hover/focus, chip with category, 1-line caption. Lightbox slider in gallery: draggable divider, white round handle, "Before"/"After" chips, keyboard ←/→ 5% |
| **Spotlight list (Why)** | Numbered items; the open one shows its paragraph and swaps the big photo |
| **Video player + playlist** | 9:16 player at left (radius 28), list of reels with thumb, title and "Dr Ruchi Goel · 1 min" |
| **Quote card** | Fraunces quote, initial avatar circle (petal), name · treatment, "Verified on Practo" |
| **Rating badge** | Big number (Fraunces), platform, count, "as of Oct 2026", links to the live profile |
| **Clinic card** | Photo 3:2, live pill, Fraunces clinic name, address, phone, nearby chips, Directions + Call buttons |
| **Price list** | Tabs (chips), rows with icon badge, item + note, "from" small + price (tabular) |
| **FAQ accordion** | Sticky heading column at left; rows with + / − toggle; one open at a time |
| **Three-step booking** | Step header 1-2-3, step 1 chips, step 2 selects + date (no Wednesdays, no past dates) + time-of-day chips, step 3 name + 10-digit mobile, primary submit. Success panel with moss check |
| **Sticky mobile bar** | Fixed bottom, 64px, cream with top hairline: Call · WhatsApp · Book (forest). Hidden ≥ 1024px |
| **Inputs** | Label above, 52px tall, radius 14, inset 1px line, focus 2px rose ring |

## 5. Icons
- UI: Lucide-style line icons, 1.75 stroke, 22px (18 small, 28 large), `currentColor`.
- Badges and feature cards: the **dk-icons** set (`08-ICONS/`): blush tile with rose line art, or forest/cream variants. 12 icons: tooth, implant, toothbrush, smile, shield, medal, award, trophy, star, receipt, clock, kids.
- **Do not use** the Fluent 3D emoji images (`img/3d/*`) still visible in the reference build. Mapping is in `08-ICONS/README-for-coding-agent.md`. For the globe in the clinics strip, use the Lucide `globe` line icon.

## 6. Photography
- **Real first** for anything that is proof: doctors (AI-retouched with consent is fine), clinics, results, reviews, awards, reels.
- **AI mood images** (`/images/ai/`) for the hero smiles and treatment still-lifes. Same family: forest or blush backgrounds, soft window light from the left, warm skin, film grain. Never captioned as patients and never next to results.
- Real photos: light, warm grade, no teal-orange. Doctors cropped chest-up in cards. Results keep the Dental Krafts watermark.
- No stock "doctor" faces. No overlays or tints on photos (the old plum overlay is dropped).

## 7. Motion
- Reveal: opacity 0 → 1 with a 22px rise, ~600ms, `cubic-bezier(.2,.7,.2,1)`, once, at 15% visibility; 60ms stagger in grids.
- Hero photo: slow Ken Burns (scale 1 → 1.06 over ~18 s); crossfade .8 s when a concern changes.
- Hover: 180–200ms. Buttons lift 1px.
- `prefers-reduced-motion`: no Ken Burns, no marquee motion, no reveals.

## 8. Voice and tone
- **Calm specialist, not salesperson.** "Here's what's happening with your tooth, here are your options, here's what each costs."
- Lead with the patient's worry, then the plan.
- Real credentials over adjectives: "AIIMS-trained prosthodontist", not "world-class expert".
- Honesty is the brand: "We'll tell you if you *don't* need treatment."
- Indian English (colour, centre, anaesthesia), ₹ with Indian grouping (₹1,50,000), 12-hour times ("10 am – 8:30 pm").
- Always **Dental Krafts** and **Dr Parmod Gulia**; no full stop after "Dr".
- Banned: "painless guaranteed", "best in the world", "cheapest", "100% success", "gold medalist", unqualified "best dentist" in headings, and any clinic founding year.

**Microcopy:** Primary CTA "Book a visit" · "Book with Dr Ruchi" · "Chat on WhatsApp" · "Open now · until 8:30 pm" / "Closed Wednesdays. Open tomorrow 10 am" · Form success "Thanks, {name}. We'll call you from +91 98104 48720 within working hours." · Empty filter "No cases in this category yet. Ask us for more examples at your visit."

## 9. Do and don't

| Do | Don't |
|---|---|
| Use forest for every primary action | Use orange, plum or blue anywhere |
| One italic rose word per headline | Italic on several words, or underline arcs |
| Real photos and AI mood photos as the decoration | Gradients, blobs, circles or wave dividers |
| Show each rating with source, count and date | Show "5 stars" with no source |
| Label which phone belongs to which clinic | Two unlabelled numbers |
| Keep result watermarks | Crop watermarks off |
| Use dk-icons or line icons | Use 3D emoji or clip-art icons |
