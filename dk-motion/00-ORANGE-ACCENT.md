# Step 0: switch the accent text from green to orange (28 Oct 2026)

The site already uses the white Porcelain design (from `dk-upgrade/CHANGE-PROMPT.md`). This step changes one thing: accent text goes from green to orange. Do it before the motion steps in `MOTION-PROMPT.md`.

1. In the `:root` tokens, add two colours next to `--green` (keep `--green` defined, but don't use it for text any more):
   ```css
   --orange:#D4650F;      /* large display text only: 3.3:1 or more */
   --orange-ink:#B34D0C;  /* every smaller accent: 4.7:1 or more */
   ```
2. Use `--orange` for:
   - the italic word in every headline (`.d em`, the hero H1 and all H2s);
   - the big italic words in doctor-page pull quotes (`.pull p em`);
   - the footer sign-off's italic word, once you add it in the motion step.
3. Use `--orange-ink` everywhere else that currently uses `var(--green)`:
   - the hero and booking sentence dropdowns, their underline on hover and the dropdown arrow;
   - the booking text inputs and their focus underline;
   - the active treatment row title and the active video question;
   - the check icons in the kids, treatment and fit lists;
   - the active table-of-contents link, hover states on treatment and words links;
   - the career year highlight;
   - the 2px header progress line, once you add it in the motion step.
4. Change the text-selection highlight to `::selection{background:#FBE1CC;color:var(--ink)}`.
5. Leave these unchanged:
   - the WhatsApp button stays `--wa` green;
   - the live status dot and the tri rule keep the logo colours;
   - the logo orange `#EF7F2D` stays decoration only (stars, tri rule), never text.
6. Check when done: search the codebase for `var(--green)`. No text, icon or border should still use it.

The quick way: replace every `var(--green)` with `var(--orange-ink)`. Then change the three large-text cases in point 2 to `var(--orange)`.
