# Dental Krafts icons: instructions for the coding agent

Use these instead of the Fluent 3D emoji images (`img/3d/*.webp`) on every page.

1. Paste the contents of `dk-icons.svg` once, right after `<body>`, on every page (or in the shared layout).
2. Add `dk-icons.css` to the global stylesheet.
3. Write an icon like this: `<span class="dk-ic"><svg aria-hidden="true"><use href="#dk-tooth"/></svg></span>`
4. Variants: add `dk-ic--forest` on light sections that need contrast, `dk-ic--cream` on forest sections, and `dk-ic--lg` or `dk-ic--sm` for size.
5. Use only the palette: blush #F5E4DE, rose ink #9E5243, forest #1E3A30, rose soft #F2C6B8, cream #FFFBF5, moss #4F7A5E. No gradients.

| Icon id | Use for |
| --- | --- |
| dk-tooth | general dentistry, check-ups |
| dk-implant | implants, missing teeth |
| dk-toothbrush | cleaning, hygiene |
| dk-smile | smile design, veneers, whitening |
| dk-shield | sterilisation, safety, registration |
| dk-medal | Dr Parmod Gulia's PGIMER silver medal |
| dk-award | MDS degrees, AIIMS credentials |
| dk-trophy | awards and recognition |
| dk-star | ratings |
| dk-receipt | prices, costs |
| dk-clock | hours, timelines |
| dk-kids | children's dentistry |

Mapping from old to new: tooth_3d → dk-tooth · toothbrush_3d → dk-toothbrush · sparkles_3d / gem_stone_3d → dk-smile · shield_3d → dk-shield · sports_medal_3d → dk-medal · graduation_cap_3d → dk-award · trophy_3d → dk-trophy · glowing_star_3d / star_3d → dk-star · receipt_3d → dk-receipt · alarm_clock_3d / spiral_calendar_3d → dk-clock · teddy_bear_3d / baby_3d → dk-kids.

Open `icons-demo.html` to see them all. The icon shapes come from Iconoven and Lucide (MIT licence).
