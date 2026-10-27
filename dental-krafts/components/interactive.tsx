"use client";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { treatmentGroups } from "@/content/treatments";
import { priceTabs } from "@/content/prices";

/* ---- Treatments B: index list + live preview ---- */
const ROW_DOCTOR: Record<string, { label: string; img: string }> = {
  ruchi: { label: "Usually with Dr Ruchi Goel", img: "/images/ai/dr-ruchi-portrait.webp" },
  parmod: { label: "Usually with Dr Parmod Gulia", img: "/images/ai/dr-parmod-portrait.webp" },
  either: { label: "With either dentist", img: "/images/ai/dr-ruchi-portrait.webp" },
};

export function TreatmentsIndex() {
  const [sel, setSel] = useState(0);
  const g = treatmentGroups[sel];
  const w = ROW_DOCTOR[g.doctor];
  return (
    <div className="grid">
      <div className="list">
        {treatmentGroups.map((x, i) => (
          <Link key={x.name} href={`/treatments#${i}`} className={`row${i === sel ? " on" : ""}`}
            onMouseEnter={() => setSel(i)} onFocus={() => setSel(i)} onClick={(e) => { if (i !== sel) { e.preventDefault(); setSel(i); } }}>
            <span className="badge"><Icon name={x.icon as string} /></span>
            <span><b>{x.name}</b><span className="s">{x.desc}</span></span>
            <span className="p">{x.price}</span>
            <span className="ar"><Icon name="arrow-right" cls="ic ic-sm" /></span>
          </Link>
        ))}
      </div>
      <aside className="prev on-dark">
        <div className="ph"><img src={g.img} alt="" /></div>
        <div className="in">
          <span className="eyebrow">{g.name}</span>
          <span>{g.desc}</span>
          <div className="who"><img src={w.img} alt="" /><span>{w.label}</span></div>
          <Link className="btn btn-w btn-sm" style={{ alignSelf: "flex-start", marginTop: 8 }} href="/contact-us">Book for this</Link>
        </div>
      </aside>
    </div>
  );
}

/* ---- Why B: spotlight list ---- */
export function WhyList({ items }: { items: { icon: string; title: string; text: string; img: string }[] }) {
  const [sel, setSel] = useState(0);
  return (
    <div className="grid">
      <div className="ph"><img src={`/images/${items[sel].img}`} alt="" key={items[sel].img} /></div>
      <div>
        <span className="eyebrow">Why Dental Krafts</span>
        <h2 className="d h2">Why families stay with us <em>for years.</em></h2>
        <div className="items">
          {items.map((x, i) => (
            <button key={x.title} className="it" aria-expanded={i === sel} onClick={() => setSel(i)} onMouseEnter={() => { if (matchMedia("(hover:hover)").matches) setSel(i); }}>
              <span className="badge"><Icon name={x.icon} /></span>
              <span><b>{x.title}</b><span className="t">{x.text}</span></span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---- Costs B: tabbed price list ---- */
export function CostsTabs() {
  const [sel, setSel] = useState(0);
  const t = priceTabs[sel];
  return (
    <>
      <div className="tabs" role="tablist">
        {priceTabs.map((x, i) => <button key={x.key} className="chip" role="tab" aria-pressed={i === sel} onClick={() => setSel(i)}>{x.label}</button>)}
      </div>
      <div className="tbl">
        {t.rows.map((r) => (
          <div className="row" key={r.item + r.note}>
            <span className="badge"><Icon name={r.icon} /></span>
            <span><b>{r.item}</b><span className="s">{r.note}</span></span>
            <span className="pr"><small>{r.from || "\u00a0"}</small><b className="tnum">{r.price}</b></span>
          </div>
        ))}
      </div>
    </>
  );
}
