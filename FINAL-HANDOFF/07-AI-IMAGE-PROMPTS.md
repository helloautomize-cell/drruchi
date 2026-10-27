# Dental Krafts AI image prompts (record and re-run guide)

All 16 images below are **already made** and are in `09-ASSETS/images/ai/` (webp, used by the site) and `09-ASSETS/ai-originals-png/` (full-size PNG). Keep this file to regenerate or extend the set in the same style. Live doc: https://claude.ai/artifact/WPZyvkwCvvUvQ36hxyk2AK

**Only one fix is outstanding:** `dr-parmod-at-work` has garbled text and a logo on the coat. In the same chat that made it, send: *"Same image, remove all text and logos from the coat."* Or crop the embroidery out.

## How to run
1. New chat in ChatGPT (image generation) or Gemini (image model). One chat per round so the style stays consistent.
2. Paste the shared style block and wait for "OK".
3. Paste one prompt at a time; make 3 or 4 versions and keep the best.
4. Fix details in the same chat with one change at a time ("Same image, but make the teeth slightly less white.").
5. Download the largest PNG, rename it as in the table, convert to webp (quality 82, max 1600px long side).

## Shared style block
```
You are creating images for Dental Krafts, a premium specialist dental clinic in Gurgaon, India. Every image I ask for in this chat must follow this style:

LOOK: high-end editorial photography, like a 2026 skincare or wellness brand campaign. Calm, warm, confident. Never clinical, never cheesy stock.
PALETTE: deep forest green (#1E3A30), soft blush pink (#F5E4DE), petal pink (#FBF1EE), warm cream (#FFFBF5), rose clay (#C97B6B), moss green (#4F7A5E). Use only these colours for backgrounds, fabrics and props.
LIGHT: soft natural window light from one side, gentle shadows, true-to-life skin tones, slight film grain. No harsh flash, no neon, no blue clinic light.
PEOPLE: Indian people of Gurgaon, natural and well groomed, minimal make-up. Real skin texture with pores, no plastic smoothing.
TEETH: natural, healthy and realistic. Shade A1 to A2 (warm natural white, not paper white). Correct count and shape, slight natural variation. No braces, no gaps unless asked, no extra or fused teeth.
NEVER: text, logos, watermarks, dental tools pointing at the mouth, blood, gloves on faces, gradients, glowing effects, cartoon style (except where I ask for 3D icons).

Reply only "OK" and wait for my first prompt.
```

## Round 1: hero smiles (portrait 2:3 in ChatGPT, 4:5 in Gemini)
Keep the top-left and bottom-right corners plain green: the glass cards sit there.

| File | Shown for | Prompt |
|---|---|---|
| `hero-smile-30f` | Default, stained teeth, gaps or crooked, child | Close-up portrait of an Indian woman in her early 30s, laughing naturally with a wide, genuine smile that shows her upper teeth. Head turned slightly to the left, eyes softly closed in laughter. Framed from the eyes down to the collarbone, with the smile slightly right of centre. Soft cream linen top. Plain, seamless deep forest green (#1E3A30) studio background. Soft window light from the left. Shot on an 85mm lens at f/2.8, shallow depth of field, editorial skincare-campaign feel. |
| `hero-smile-60f` | Missing teeth, chipped or broken | Close-up portrait of an Indian woman in her early 60s with silver-streaked hair in a low bun, smiling warmly and confidently to show a full, natural set of upper teeth. Small gold stud earrings, blush pink (#F5E4DE) cotton saree border at the shoulder. Framed from the eyes down to the shoulders, with the smile slightly right of centre. Plain, seamless deep forest green (#1E3A30) background. Soft window light from the left, gentle laugh lines, real skin texture. 85mm lens, f/2.8, editorial portrait. |
| `hero-smile-40m` | Tooth pain | Close-up portrait of an Indian man in his early 40s with a neatly trimmed beard, smiling with relief and showing his upper teeth. Relaxed, looking just past the camera. Moss green (#4F7A5E) linen shirt, top button open. Framed from the eyes down to the chest, with the smile slightly right of centre. Plain, seamless deep forest green (#1E3A30) background. Soft window light from the left. 85mm lens, f/2.8, calm editorial mood. |
| `hero-smile-kid` (optional, not made) | My child's teeth | Close-up of an Indian girl of about 7 sitting on her mother's lap, both laughing. The girl shows her teeth, with one baby tooth missing at the front. Mother partly out of frame. Petal pink (#FBF1EE) cotton clothes, deep forest green (#1E3A30) background, soft window light. Same framing and lens as above. |

## Round 2: treatment still-lifes (landscape 3:2 in ChatGPT, 4:3 in Gemini)
Start each prompt with: *"Overhead or 45-degree still-life on a blush pink (#F5E4DE) linen surface, soft window light from the left, one sprig of dried eucalyptus as the only decoration,"* then add:

| File | Used for | Prompt ending |
|---|---|---|
| `treat-implants` | Implants | a single titanium dental implant with a white ceramic crown on top, standing upright on a small forest green (#1E3A30) stone plinth. Macro detail of the screw thread, shallow depth of field. |
| `treat-rootcanal` | Root canals, fillings | a realistic, anatomically correct molar model cut in half to show the roots, on a cream ceramic dish. Beside it, a small glass jar of white composite filling material. |
| `treat-smile-design` | Veneers, whitening, makeovers | a row of six thin porcelain veneer shells in natural shades arranged in a gentle arc, next to a round brass hand mirror reflecting soft light. |
| `treat-aligners` | Braces, aligners | a pair of clear aligner trays resting on top of an open, matte forest green (#1E3A30) aligner case. One tray catches the light at its edge. |
| `treat-kids` | Children | a small child's toothbrush with soft bristles, a tiny rose clay (#C97B6B) cup and a knitted toy tooth with a smiling face, arranged playfully. |
| `treat-gums-emergency` | Gums, wisdom teeth, urgent care | a glass of water, a folded cream cotton towel and a white ceramic tray holding dental floss and a soft toothbrush. Calm and reassuring, nothing medical or sharp. |
| `treat-crowns` | Crowns page | three ceramic dental crowns in natural tooth shades lined up on a forest green (#1E3A30) velvet strip, with a dental shade guide fanned out behind them. |
| `treat-dentures` | Dentures page | a realistic full upper and lower denture set with natural pink gums, resting in an open cream linen-lined box like a piece of jewellery. |

## Round 3: icons
Done in code instead of images: see `08-ICONS/`.

## Round 4: doctor portraits (from real photos, with consent; portrait 2:3 or 4:5, duo landscape)
Upload the real photo, then start with: *"Use the uploaded photo as the exact reference for this person. Keep their face, features, skin tone, hairline, age and expression identical. Do not beautify, slim or change their identity. Only change the lighting, background and styling as described:"*

| File | Upload | Change |
|---|---|---|
| `dr-ruchi-portrait` | `doctors/dr-ruchi-goel-portrait.webp` | Editorial portrait from the chest up, a gentle confident smile, a crisp white doctor's coat over a blush (#F5E4DE) top. Plain deep forest green (#1E3A30) background, soft window light from the left. 85mm lens, f/2.8. |
| `dr-parmod-portrait` | `doctors/dr-parmod-gulia-portrait.webp` | Same framing and light as Dr Ruchi's portrait: a friendly smile, a white doctor's coat over a moss green (#4F7A5E) shirt, a plain deep forest green background. |
| `doctors-duo` | `doctors/dk-doctors-duo-clinic-clean.webp` | Both doctors standing side by side in a calm, modern clinic with warm cream walls and a deep forest green accent wall behind them, soft daylight, relaxed smiles, white coats. Keep both faces exact. |
| `dr-ruchi-at-work` | `doctors/dr-ruchi-goel-portrait.webp` | Dr Ruchi at a cream desk holding a ceramic implant crown model and looking at it, half profile, with a soft-focus forest green wall behind. |
| `dr-parmod-at-work` | `doctors/dr-parmod-gulia-portrait.webp` | Dr Parmod kneeling at child height and holding a large soft tooth model, smiling at someone just out of frame (no child visible), in a bright blush and cream kids' room. |

## Check before you use any new image
Teeth (count, no fused teeth, warm white) · gums and lips natural · eyes, ears and earrings symmetrical · hands with five fingers · no text or logos anywhere · background close to the hex, no gradient · dental objects look real · person looks like someone from Gurgaon · doctor faces identical to the real photo at 100%.

## What stays real (never AI)
Clinics inside and out · before/after results · patient reviews, avatars and video stories · awards and press.
