"use client";
import { useState } from "react";
import { QuoteCard } from "./bits";
import { treatments } from "@/content/treatments";
import type { Review } from "@/content/reviews";

const tName = (slug: string) => treatments.find((t) => t.slug === slug)?.name ?? slug;

type Filter = { key: string; label: string };

/** Reviews grid filterable by treatment or dentist. */
export function StoriesFilter({ reviews }: { reviews: Review[] }) {
  const [f, setF] = useState("all");

  const slugs = [...new Set(reviews.flatMap((r) => r.cats ?? []))].filter((s) => s !== "medical-tourism");
  const filters: Filter[] = [
    { key: "all", label: "All stories" },
    { key: "ruchi", label: "Dr Ruchi Goel" },
    { key: "parmod", label: "Dr Parmod Gulia" },
    ...slugs.map((s) => ({ key: `t:${s}`, label: tName(s) })),
  ];

  const list =
    f === "all"
      ? reviews
      : f === "ruchi" || f === "parmod"
        ? reviews.filter((r) => r.doctor === f)
        : reviews.filter((r) => r.cats?.includes(f.slice(2)));

  return (
    <>
      <div className="filters" role="tablist" aria-label="Filter stories">
        {filters.map((x) => (
          <button key={x.key} className="chip" role="tab" aria-pressed={f === x.key} onClick={() => setF(x.key)}>
            {x.label}
          </button>
        ))}
      </div>
      <div className="cards">
        {list.map((r) => (
          <QuoteCard key={r.id} q={r.quote} name={r.name} sub={`${r.treatment} · ${r.source}`} avatar={r.avatar} />
        ))}
      </div>
      {list.length === 0 && <p className="note">No stories in this filter yet.</p>}
    </>
  );
}
