# Dental Krafts: homepage v5 + remove all prices (one-go prompt)

Paste this whole file to the coding agent. Unzip `dental-krafts-v5.zip` into the repo root first, so `public/images/v5/`, `public/images/treatments/` and `public/videos/` exist.

The visual reference is `dk-v5/reference/dental-krafts-home-v5.html` (with `v5.css` and `page5.js`). Open it in a browser and match it section by section. Port the markup into the existing Next.js components; do not paste it as one raw HTML blob.

Keep the current palette (porcelain white, ink, ORANGE accent text #D4650F / #B34D0C), the Fraunces + Figtree type, the header, footer and dk-motion.js layer. Banned claims still apply: no "painless guaranteed", "cheapest", "gold medalist", "100% success", "10K+".

---

## 1. Remove prices from the whole website

1. Delete the homepage "Costs" section.
2. `/treatment-costs` (or whatever the costs page is called): delete the page and add a permanent redirect to `/treatments` in `next.config.js` (`redirects()`, `permanent: true`).
3. Remove every price table, "starting from", "₹", "Rs", "EMI from", "per tooth" and "consultation fee" string on all treatment pages, blog posts, FAQ answers, metadata (title, description, OG) and the visible text of the booking flow.
4. Nav and footer: replace the "Costs" link with "Videos" (links to `/#videos`).
5. FAQ: replace any cost question with "Will I know what my treatment involves before it starts?" Answer: "Yes. After the exam the dentist explains the options, the number of visits and what each step involves, and you decide before anything starts."
6. JSON-LD: a `priceRange` field may stay in the LocalBusiness schema (it is not visible). Remove any `offers`/`price` entries.
7. Check: `grep -rn "₹\|Rs\.\|INR\|price\|cost" app components content` must return only the JSON-LD `priceRange` and code identifiers.

---

## 2. Homepage v5, section by section

Order: Header, Hero, Proof bar, Dentists, Treatments, Results, Inside the clinic, Visit, Stories, Videos, Recognition, FAQ, Booking, Clinics, Footer.

### 2.1 Hero (fixes "left side too heavy" and "17+ years not visible")
- Grid `.86fr 1.14fr`. Left column holds only: small eyebrow, H1 `clamp(44px,5.2vw,80px)`, one short paragraph, two buttons, and the "What brings you in?" chip row. No stat blocks, no long lists on the left.
- Right column `.duo`: two equal 4:5 portrait cards, Dr Ruchi Goel and Dr Parmod Gulia, name + one-line role under each. The second card is offset `translateY(56px)`.
- A round seal (142px) overlapping the cards reads "17+ years of experience" in orange. This is the main 17+ placement.
- Images: `/images/v5/hero-ruchi.webp`, `/images/v5/hero-parmod.webp` (both 819x1024). Use `object-fit:cover; object-position:center 20%` so faces are not cut.
- Phone: chips scroll horizontally, the two cards sit side by side at 50% each, seal smaller (104px).
- Chips preselect the booking form topic (see 2.10).

### 2.2 Proof bar
Four facts in one row: **17+** years · **AIIMS & PGIMER** trained · **5.0** Google rating · **2** clinics in Gurugram. Under it a thin "As seen in" press row (ANI logo). 17+ appears here a second time on purpose.

### 2.3 Dentists (fixes "show both doctors equally", like niramayclinics.com)
- Heading: "Two specialists, *one* clinic." (one in orange italic)
- Two identical columns `.duo2 > .doc5`. Each: 3:2 photo, role tag, name, credentials line, 3-line bio, a small `dl` (Speciality / Trained at / Sees), and two buttons ("Book with Dr Ruchi" / "Book with Dr Parmod" + "Full profile").
- Photos: `/images/v5/doc-ruchi-clinic.webp`, `/images/v5/doc-parmod-clinic.webp` (the real clinic photos, 1128x748).
- Below both, a full-width sage strip `.together` with `/images/v5/doctors-together.webp` and the line "**Not sure who to see?** Book with either. If you need the other specialist, they'll join you in the same visit." plus an "Ask on WhatsApp" button.
- Same width, same text length, same button weight. Neither doctor is ranked above the other.

### 2.4 Treatments (no prices)
- Six image cards `.tc` in 3 columns (horizontal scroll rail on phone): Replace missing teeth, Save a tooth, Smile design, Straighten teeth, Kids and teens, Gums and urgent care.
- Card images, aspect 4:3, `object-fit:cover; object-position:center`: `t-implants`, `t-rootcanal`, `t-smile`, `t-aligners` from `/images/v5/`, and the existing `ai/treat-kids`, `ai/treat-gums-emergency`.
- Each card: title, one line, "Explore" link. No ₹, no "from".

### 2.5 Results
Keep the existing before/after slider. Images must use `object-fit:cover` with a fixed 4:3 frame, never `scale()` or zoom transforms (fixes "images too zoomed").

### 2.6 Inside the clinic (new, after Results)
`.mos` 4-column mosaic of 7 REAL photos: a reception-lounge-wide, b sector-53-storefront, c sector-57-operatory, d dk-doctors-performing-procedure-wide, e kids-operatory-mural-clean, f storefront-signage-reception, g storefront-signage-wide (caption "Specialists trained at AIIMS and PGIMER"). Do not use the procedure photo twice. Tiles a, d and g span 2 columns. Phone: 2 columns.

### 2.7 Visit
H2 "A clear plan, *before* we start." Tag "About 30 minutes". Remove any fee text.

### 2.8 Stories
Replace the old video card with two 9:16 video stories: `/videos/reel-07.mp4` (Rekha) and `/videos/reel-08.mp4` (family patient of Dr Parmod), with their `.webp` posters.

### 2.9 Videos, "Short answers from Dr Ruchi" (fixes the cut video)
The reels are recorded vertical (1080x1920, phone). Show them vertical, never in a 16:9 box.
- Heading ABOVE the rail, not under the player.
- Horizontal scroll rail `.crs.reels` of `.reel` cards, each `aspect-ratio:9/16`, width `clamp(220px,19vw,262px)`, `object-fit:cover`.
- `<video preload="none" playsinline poster="/videos/reel-0N.webp">`. A play button with the question as caption.
- One video plays at a time; controls appear on play; videos pause when scrolled off screen. Logic is in `page5.js` (videos block).
- Files: `/videos/reel-01.mp4` … `reel-06.mp4` (compressed to 540x960, about 1 MB each). Note: `reel-02` is only 40 s because the source file in videos.zip was damaged. Re-export it from the original if you have it.

### 2.10 Booking (fixes "looks bad", the giant native date list)
- Two columns: left side panel (reception photo, two call rows "Sector 53" / "Sector 57" with tap-to-call, hours line), right form.
- Form `.frm`: name, mobile, then pill radio groups instead of `<select>`: Dentist (two avatars + "Either"), Topic, Day, Time (Morning / Afternoon / Evening), Clinic.
- **Day pills are generated in JS**: "Earliest we can" + the next 8 open days, skipping Wednesday (clinic closed), as a horizontal scroll row. No native date picker.
- Buttons: "Request a call back" (validates name + 10-digit mobile, shows a success state) and "Send on WhatsApp" (opens `wa.me/919810448720` with a prefilled message).
- Hero chips, treatment cards and doctor buttons preselect topic and dentist.
- Layout fixes that matter: `.frm,.bk5 .side{min-width:0}` and below 1080px `grid-template-columns:minmax(0,1fr)`, otherwise the form overflows on phones.

---

## 3. Treatment pages: use the live site's images (fixes "you missed all these images")

All images from the live treatment pages are in `public/images/treatments/`. Use them inside each page's sections (banner, "what is it", signs, procedure, aftercare, why us), not only one hero image per page. Frame them `aspect-ratio:4/3` or `3/2` with `object-fit:cover`, never zoomed.

| Page | Images |
|---|---|
| Root canal | rct_root-canal-treatment-banner, rct_root-canal-treatment-gurgaon, rct_signs-you-need-a-root, rct_causes-of-root-canal, rct_the-root-canal-treatment-procedure, rct_painless-root-canal (use the alt "Comfortable root canal", not "painless"), rct_points-to-keep, rool-canal-treatment |
| Dental implants | dental-implants-banner, dental-implants-gurgaon, types-of-dental-implants, why-is-dental-implant, are-you-eligible, advantages-of-all-on-four, fixed-bridge-supported-by-4-8, replace-missing-teeth, dental-implants |
| Crowns | dental-crowns-banner, dental-crowns-in-gurgaon, types-of-dental-crowns, need-a-dental-crown, comprehensive-dental-crown, process-of-placing-a-permanent, post-care-tips, dental-crowns |
| Smile makeover / cosmetic | smile-makeover-banner, smile-makeover-in-gurgaon, cosmetic-dentist-banner, cosmetic-dentist-in-gurgaon, real-need, cosmetic-dentistry, dental-veneers |
| Aligners / Invisalign | invisalign-banner, what-problems-can-invisalign, invisalign-or-toothache, best-invisible-aligners |
| Braces | teeth-braces-banner, teeth-braces-in-gurgaon, why-choose-our-braces |
| Whitening | teeth-whitening-banner, teeth-whitening-in-gurgaon, teeth-whitening-options, in-office-vs-at-home-teeth, why-do-teeth-get |
| Kids | kids-dentist-banner, kids-dentist-in-gurgaon, paediatric-dentist-banner, expert-in-pediatric |
| Other | dental-fillings, dentures, gum-disease-treatment, teeth-cleaning, why-dental-krafts, connect-with-dental-krafts, contact-us |

The live site's "cost of smile makeover" image is left out on purpose.

---

## 4. Things that broke before. Check them again

- **Class name collisions.** Do not reuse these global class names for new elements: `.ph`, `.cta`, `.rel`, `.sc`, `.in`, `.on`, `.hrs`, `.cl`. In the v5 reference, booking uses `.bhrs` and `.bcall` for that reason. Prefer CSS modules or a `dk5-` prefix.
- **Hydration error #418.** Any open/closed status based on the time must render after mount (`useEffect`), never on the server.
- Videos: `preload="none"` only. Do not autoplay with sound.
- No horizontal page scroll at 390px.

## 5. Done when
- [ ] No ₹ or price text anywhere on the site; `/treatment-costs` redirects to `/treatments`.
- [ ] Hero left column is light; the 17+ seal is visible on desktop and phone.
- [ ] Both doctors have identical cards in the hero and in "Meet your dentists".
- [ ] Reels play vertical, full frame, heading above.
- [ ] Booking uses pills (no native date list) and works on a 390px phone.
- [ ] Each treatment page uses the images in section 3.
- [ ] Console has no errors; Lighthouse images are not zoomed or stretched.
