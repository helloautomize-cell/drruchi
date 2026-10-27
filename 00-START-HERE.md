# START HERE: Dental Krafts website handoff (27 Oct 2026)

Everything needed to build the new dentalkrafts.com: one combined site for Dental Krafts, Dr Ruchi Goel and Dr Parmod Gulia. The design is approved (Blush and Forest, Fraunces + Figtree, homepage hero E and 14 section picks). This folder is the only one your coding agent needs; the older files in `dental-krafts-revamp/` are kept for history.

## Live previews
| What | Link |
|---|---|
| Approved homepage | https://claude.ai/artifact/Fneub1FdxroqseS7UED84c |
| Inner page templates (doctor, treatment, clinic, other pages) | https://claude.ai/artifact/Cs6PNZdg2EzhunaU7FuKva |
| Visual style guide | https://claude.ai/artifact/3PgyB4kM9L7sZ5pgPEDbPp |
| AI image prompt pack (doc) | https://claude.ai/artifact/WPZyvkwCvvUvQ36hxyk2AK |

These links are private to your account. Use the Share menu on each page if the client or a developer needs to open them.

## What's in this folder
| File / folder | What it is | Who uses it |
|---|---|---|
| `01-MASTER-PROMPT.md` | **The build prompt.** Single source of truth: tech, design tokens, facts, header, all 15 homepage sections, doctor, treatment and other page templates, SEO, accessibility, build order | Paste into the coding agent first |
| `02-STYLE-GUIDE.md` + `02-style-guide.html` | Colours (with contrast), type scale, components, icons, photography, motion, voice | Agent + designer |
| `03-SITEMAP.md` | 42 pages + ~50 blog posts, URLs (keep every slug), navigation, keywords per page, templates, journeys, SEO, redirects | Agent |
| `04-IMAGE-MAP.md` | Every image per page and section, with path, crop and alt text; what's retired; what's still missing | Agent |
| `05-CONTENT/homepage-copy.md` | Homepage copy taken from the approved build (wins over 06a §1) | Agent |
| `05-CONTENT/06a-content-core-pages.md` | Copy for dentists, both doctor profiles, treatments hub, costs, gallery, stories, clinics, international, about, contact, legal | Agent |
| `05-CONTENT/06b-content-treatments.md` | Copy for all 21 treatment pages, with meta titles and FAQs | Agent |
| `05-CONTENT/site-content/` | Plain text of all 83 current pages (blog migration, JP/KR, legal) | Agent |
| `06-DESIGNS/homepage/` | Approved homepage HTML + `img/` + `source/` (p1 tokens, p2–p4 sections, p5 JS, sprite) | Agent copies components from it |
| `06-DESIGNS/inner-pages/` | Inner page templates HTML + images + source | Agent |
| `07-AI-IMAGE-PROMPTS.md` | All prompts used for the 16 AI images, to regenerate or extend | You |
| `08-ICONS/` | `dk-icons.svg`, `dk-icons.css`, demo page and README for the 12 icons | Agent |
| `09-ASSETS/images/` | All site images, ready for `public/images/`: real photos by type, `ai/` (16 AI webp), `reels/` (video posters), `results/split/` (before/after halves), `image-index.csv` | Agent |
| `09-ASSETS/ai-originals-png/` | Full-size PNG originals of the AI images | Keep for print/OG |
| `videos.zip` (separate download, 134 MB, in `dental-krafts-revamp/`) | 8 vertical reels (6 Dr Ruchi explainers, 2 patient stories) | Agent → `public/videos/` |
| `10-CLINIC-CHECKLIST.md` | 20 things the clinic must send or confirm, with the default the site uses until they do | Send to the clinic today |
| `11-RESEARCH-DOSSIER.md` | Verified facts with sources, conflicts found, compliance notes | Reference |

## Run it in 6 steps
1. **Send `10-CLINIC-CHECKLIST.md` to the clinic now.** Items 1–8 are needed before launch; nothing blocks the build.
2. Create the project: `npx create-next-app@latest dental-krafts --ts --tailwind --app`.
3. Copy `09-ASSETS/images/` to `public/images/`, unzip `videos.zip` (separate download) into `public/videos/`, and copy `06-DESIGNS/`, `05-CONTENT/` and `08-ICONS/` into a `/reference` folder in the repo so the agent can read them.
4. Paste `01-MASTER-PROMPT.md` into the agent with: *"Build this site. Match `/reference/06-DESIGNS/homepage/dental-krafts-homepage.html` pixel for pixel, using only the approved variant of each section. Use `/reference/05-CONTENT` for copy and `04-IMAGE-MAP.md` for images."*
5. Build in the order of master prompt §13: shell → data files → home → doctor pages → treatment template → clinics, costs, gallery, stories → JP/KR, blog, about → schema, sitemap, analytics, performance and accessibility passes.
6. Before launch: run Lighthouse on mobile (targets in §2), test at 360/768/1024/1440, test the IST open/closed logic on a Wednesday and after 8:30 pm, check every old URL returns 200 or a 301, and set `BOOKING_ENDPOINT`.

## Rules the agent must not break
- No gradients, blobs or CSS shapes as decoration. No orange, plum or blue. No 3D emoji (use `08-ICONS`).
- No clinic founding year ("since 2007") anywhere except "Practising since 2007" on Dr Ruchi's profile.
- AI people are mood images: never captioned as patients, never next to results. Clinics, results, reviews and awards stay real.
- Always "Dr Parmod Gulia" on the page ("Pramod" only as SEO alias). Never "gold medalist", "painless guaranteed", "cheapest", "100% success".
- Keep every existing URL.

## Known gaps (already handled with safe defaults)
- Google rating hidden until supplied. Booking form defaults to email + WhatsApp fallback until the clinic picks a destination.
- `dr-parmod-at-work.webp` has garbled text on the coat: crop it out or regenerate (one line in `07-AI-IMAGE-PROMPTS.md`).
- The homepage reference build still shows 3D emoji in the kids band and clinics strip, and has no "Patient stories" link or language switch in the header. The master prompt tells the agent to fix all three.
- No real Sector 57 exterior photo, no sterilisation photo, before/after files are small (~400px). See image map §H.
