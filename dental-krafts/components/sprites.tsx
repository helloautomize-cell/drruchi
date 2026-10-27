import fs from "node:fs";
import path from "node:path";

/** Reads the two sprites from /reference and inlines them once in the document. */
export function Sprites() {
  const dir = path.join(process.cwd(), "reference", "06-DESIGNS", "homepage", "source", "sprite.svg");
  const dk = path.join(process.cwd(), "reference", "08-ICONS", "dk-icons.svg");
  const sprite = fs.readFileSync(dir, "utf8");
  const dkSprite = fs.readFileSync(dk, "utf8");
  return (
    <span
      style={{ display: "none" }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: sprite + dkSprite }}
    />
  );
}
