"use client";
import { useCallback, useEffect, useState } from "react";
import { Icon } from "./icons";
import { BaSlider } from "./ba-slider";
import { CATS, type Case } from "@/content/results";

const BTN: React.CSSProperties = {
  textAlign: "left",
  background: "none",
  border: 0,
  padding: 0,
  cursor: "pointer",
  font: "inherit",
  color: "inherit",
};

/** Filterable results grid with a before/after lightbox. */
export function GalleryGrid({ cases }: { cases: Case[] }) {
  const [cat, setCat] = useState<string>("All");
  const [sel, setSel] = useState<number | null>(null);
  const list = cat === "All" ? cases : cases.filter((c) => c.cat === cat);

  const prev = useCallback(
    () => setSel((s) => (s === null ? s : (s - 1 + list.length) % list.length)),
    [list.length]
  );
  const next = useCallback(
    () => setSel((s) => (s === null ? s : (s + 1) % list.length)),
    [list.length]
  );

  useEffect(() => {
    if (sel === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSel(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [sel, next, prev]);

  const cur = sel !== null ? list[sel] : null;

  return (
    <>
      <div className="filters" role="tablist" aria-label="Filter results by treatment">
        {["All", ...CATS].map((c) => (
          <button
            key={c}
            className="chip"
            role="tab"
            aria-pressed={cat === c}
            onClick={() => {
              setCat(c);
              setSel(null);
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="rB">
        <div className="grid">
          {list.map((c, i) => (
            <button className="case" key={c.file} onClick={() => setSel(i)} style={BTN}>
              <div className="ba">
                <img src={`/images/results/split/${c.file}__before.webp`} alt={`Before — ${c.caption}`} loading="lazy" />
                <img className="af" src={`/images/results/split/${c.file}__after.webp`} alt={`After — ${c.caption}`} loading="lazy" />
              </div>
              <div className="tg2"><span className="chip">{c.cat}</span><span>Hover to see after</span></div>
              <b>{c.caption}</b>
            </button>
          ))}
        </div>
      </div>
      <div
        className={`lb${sel !== null ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Before and after viewer"
        onClick={(e) => {
          if (e.target === e.currentTarget) setSel(null);
        }}
      >
        <button className="x" aria-label="Close" onClick={() => setSel(null)}>
          <Icon name="x" />
        </button>
        {cur && (
          <div className="box">
            <BaSlider file={cur.file} altB={`Before — ${cur.caption}`} altA={`After — ${cur.caption}`} ratio="4/3" />
            <div className="cap">
              <span>
                <b>{cur.caption}</b>
                <span style={{ display: "block", color: "var(--muted)", fontSize: 13 }}>
                  {cur.cat} · Shared with patient consent
                </span>
              </span>
              <span className="nav">
                <button className="btn btn-s btn-sm" onClick={prev}>
                  <Icon name="arrow-left" cls="ic ic-sm" /> Prev
                </button>
                <button className="btn btn-s btn-sm" onClick={next}>
                  Next <Icon name="arrow-right" cls="ic ic-sm" />
                </button>
              </span>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
