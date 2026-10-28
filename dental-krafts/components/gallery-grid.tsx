"use client";
import { useState } from "react";
import { BaSlider } from "./ba-slider";
import { CATS, type Case } from "@/content/results";

/** Filterable results grid — every case is a drag-to-compare slider (v3). */
export function GalleryGrid({ cases }: { cases: Case[] }) {
  const [cat, setCat] = useState<string>("All");
  const list = cat === "All" ? cases : cases.filter((c) => c.cat === cat);

  return (
    <>
      <div className="filters" role="tablist" aria-label="Filter results by treatment">
        {["All", ...CATS].map((c) => (
          <button key={c} className="chip" role="tab" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
        ))}
      </div>
      <div className="res3">
        {list.map((c) => (
          <figure key={c.file}>
            <BaSlider file={c.file} altB={`Before — ${c.caption}`} altA={`After — ${c.caption}`} />
            <figcaption>{c.cat}<span>{c.caption}</span></figcaption>
          </figure>
        ))}
      </div>
      <p className="note">Shared with patient consent. Individual results vary.</p>
    </>
  );
}
