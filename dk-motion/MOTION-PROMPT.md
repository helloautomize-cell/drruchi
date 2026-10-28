# Motion and premium upgrade (v4): prompt for your coding agent

**Date:** 28 Oct 2026
**Run it after:** `dk-upgrade/CHANGE-PROMPT.md` (the Porcelain conversion). This step adds motion and richer interactions on top. It does not change colours, copy or routes.
**Preview:** https://claude.ai/artifact/3cFaW9WSAaZqoQfi8ENsxy

> How to use: unzip `dental-krafts-motion-v4.zip` at the root of your repo. It adds a `dk-motion/` folder containing this prompt, the orange-accent step, the two motion files and the v4 reference page. Then tell your coding agent: "Do dk-motion/00-ORANGE-ACCENT.md first, then follow dk-motion/MOTION-PROMPT.md". No new images are needed; the zip from the last step already has all 66 result halves.

---

**First:** complete `dk-motion/00-ORANGE-ACCENT.md` (accent text green → orange).

You are adding the v4 motion layer to the Dental Krafts Next.js site, which already uses the v3 "Porcelain" design. **Source of truth:** `dk-motion/reference/dental-krafts-home-v4.html`. Copy its markup, data attributes and section CSS. The motion engine is in `dk-motion/dk-motion.js` and `dk-motion/dk-motion.css`. Use them as they are; don't rewrite them in another library.

## 1. Install

1. Run `npm i lenis@1.1.13`.
2. Copy `dk-motion.css` to `app/dk-motion.css` and import it in `app/layout.tsx` after the globals.
3. Copy `dk-motion.js` to `lib/dk-motion.js`. It's a plain script that sets `window.DKM`.
4. Put this in the `<head>` in `app/layout.tsx`. It turns motion on before first paint, only when the visitor allows motion, and turns it off again if the script never loads:
   ```tsx
   <script dangerouslySetInnerHTML={{__html:`(function(h){if(!matchMedia("(prefers-reduced-motion: reduce)").matches){h.classList.add("js-m");setTimeout(function(){if(!window.DKM)h.classList.remove("js-m")},3000)}})(document.documentElement)`}} />
   ```
5. Add a client component and render it once in the root layout:
   ```tsx
   'use client';
   import { useEffect } from 'react';
   import { usePathname } from 'next/navigation';
   import Lenis from 'lenis';
   export default function Motion() {
     const path = usePathname();
     useEffect(() => {
       (window as any).Lenis = Lenis;
       let live = true;
       import('@/lib/dk-motion').then(() => { if (live) (window as any).DKM.init(); });
       return () => { live = false; (window as any).DKM?.destroy(); };
     }, [path]);
     return null;
   }
   ```
6. Every hidden "before" state is scoped to `html.js-m`, so the page is complete without JavaScript and under reduced motion. Keep it that way.

## 2. Data attributes (the whole system)

| Attribute | Effect | Where the reference uses it |
|---|---|---|
| `data-split` | Headline words rise out of their own masks, 55 ms apart | Hero H1 and every section H2, plus the footer sign-off |
| `data-r` | Block fades and rises 28 px (`data-r="left"` slides in from the left) | Leads, cards, form, either-strip, promise |
| `data-r="stagger"` | Its direct children rise one after another, 75 ms apart | Proof bar, definition lists, treatment rows, steps, video list, check list, price columns, clinic cards, FAQ |
| `data-delay="ms"` | Adds delay to the above | Hero sequence: H1 120, lead 380, concierge 520, rating card 900, status chip 1100 |
| `data-unveil` | Photo frame opens from an inset rounded clip while the image settles from 1.18× | Hero photo, doctor photos, treatment preview, results slider, video player, kids photos |
| `data-par="0.07"` | Parallax on the image inside (negative values move it the other way) | Hero 0.06, doctors 0.07, kids 0.09 and −0.05 |
| `data-count` | The number counts up from zero when it appears | 5.0 and 4.9 in the proof bar, the rating card and the stories scores |
| `data-cursor="Drag"` | A round ink cursor label follows the pointer (mouse only) | Stories track ("Drag"), video player ("Play") |
| `data-carousel` | Scroll-snap carousel with mouse drag, arrows, a progress bar, a 01 / 06 counter and autoplay that pauses on hover, focus, touch and when off screen | Patient stories |
| `data-pin-x` | Desktop only: the section pins and the strip moves sideways as you scroll; the card in the centre turns to colour. On phones and under reduced motion it stays a swipe strip | Recognition |
| `data-steps` | A blue line fills across the 4 steps as you scroll, and each number lights up | How a visit works |
| `data-acc` | `<details>` open and close with a smooth height animation | FAQ |

Eyebrow tri rules draw in dash by dash automatically. Buttons get a gentle magnetic pull and an arrow nudge. **Header:** after 120 px of scroll it condenses into a floating white glass pill (`.pill`: rounded 999 px, blur, soft shadow, 72 px tall, logo 50 → 40 px). It slides away when you scroll down past 420 px and comes back as soon as you scroll up. A 2 px `--orange-ink` reading-progress line runs along the top, and the nav link for the section in view gets a sliding underline (scroll-spy). The live status dot pulses. None of these need attributes.

## 3. Section changes (copy from the reference)

1. **Treatments:** each row gets a 64 px thumbnail (`.tth`, shown on phones only) and an arrow that slides in beside the title on hover. On desktop the preview photo changes with a wipe upwards (`img.nx` + `.go`) instead of a fade.
2. **Results:** now 9 cases (adds `ba-16-crowns`, `ba-14-dentures` and `ba-18-deep-cleaning-stain-removal`, with captions in the reference `CASES`). It adds a `01 / 09` counter, a progress bar and arrow buttons, and the thumbnails become a scroll rail. Cases cross-fade when they change. The divider sweeps once (50 → 74 → 30 → 50) the first time the slider is on screen, so visitors see it can be dragged; it stops as soon as they touch it. Load both halves eagerly (no `loading="lazy"`).
3. **Videos:** the question list advances on its own every 7 s, with a fill line under the active question. It pauses on hover or off screen and stops for good once someone picks a question.
4. **Stories:** this replaces the single rotating quote. The header has the scores on the right. Below it is a full-bleed track holding Rekha Seth's video card and then 5 review cards (orange stars, "Verified · Practo", a serif quote, an initial, the name, treatment and dentist). Below the track are the counter, progress bar and arrows. Autoplay runs every 6.5 s.
5. **Recognition:** pinned sideways scroll on desktop, with 6 numbered cards (01 to 06), a progress bar and a "Keep scrolling" hint.
6. **Costs:** the dotted leaders draw in from the left. On hover, a row indents 10 px and its price turns `--orange-ink`.
7. **Cards:** clinic and story cards lift 4 px with the soft shadow on hover. Clinic photos zoom 4.5% and regain full colour. Doctor photos zoom slightly.
8. **Footer:** a large sign-off line, "Dental *Krafts*", in Fraunces 340 (`.sig`, `clamp(64px,14.5vw,224px)`, italic word in `--orange`), between the link columns and the registrations line. It's `aria-hidden`.

## 4. Rules

- Keep all motion under `html.js-m` and respect `prefers-reduced-motion`. Under reduced motion there's no Lenis, no autoplay, no pinning and no parallax; carousels still work with buttons and swipe.
- Use only `transform`, `translate`, `scale`, `opacity` and `clip-path` for animation. Never animate layout properties on scroll.
- Make sure every carousel works by keyboard (arrow keys on the focused track) and touch (native swipe).
- No new colours, gradients or decorative shapes. Motion is the only addition.

## 5. Done when

- [ ] The header turns into the floating pill after a short scroll, hides on the way down and returns on the way up, on desktop and phone. **Never give any other component the class `sc`:** the header's scrolled state uses it, and the story cards are `.story` for that reason (v4 preview bug, fixed 28 Oct).
- [ ] Wheel scrolling is smooth on desktop and native on phones; in-page links glide with an 84 px header offset.
- [ ] Every H2 reveals word by word; nothing stays invisible after scrolling past it.
- [ ] Stories: drag with the mouse, swipe on touch; autoplay pauses on hover and stops after interaction.
- [ ] Recognition pins at 1024 px and wider; on a 390 px phone it's a swipe strip with no horizontal page scroll.
- [ ] The results slider sweeps once, then follows the drag; all 9 cases load both halves.
- [ ] With reduced motion on, all content is visible at once and nothing moves on its own.
- [ ] There are no console errors after navigating between 3 routes and back (the motion component cleans up on each route change).
