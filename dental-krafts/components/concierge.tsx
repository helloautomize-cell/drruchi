"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { OpenStatus } from "./open-status";

const CONCERNS = [
  { label: "Missing teeth", icon: "tooth-implant", img: "60f", doc: "r", price: "Implants from ₹30,000 · dentures from ₹5,000" },
  { label: "Tooth pain", icon: "tooth-alert", img: "40m", doc: "b", price: "Root canal from ₹6,000 · same-day pain relief when we can" },
  { label: "Chipped or broken", icon: "broken-tooth", img: "60f", doc: "r", price: "Ceramic crowns from ₹12,000" },
  { label: "Gaps or crooked", icon: "braces-teeth", img: "30f", doc: "b", price: "Veneers, braces or aligners, after an exam" },
  { label: "Stained teeth", icon: "sparkles", img: "30f", doc: "b", price: "Whitening from ₹10,000" },
  { label: "My child's teeth", icon: "first-tooth", img: "30f", doc: "p", price: "Consultation ₹500 · babies to teens" },
] as const;

const DOCS: Record<string, { imgs: string[]; who: string; btn: string }> = {
  r: { imgs: ["/images/ai/dr-ruchi-portrait.webp"], who: "You'll see Dr Ruchi Goel", btn: "Book with Dr Ruchi" },
  p: { imgs: ["/images/ai/dr-parmod-portrait.webp"], who: "You'll see Dr Parmod Gulia", btn: "Book with Dr Parmod" },
  b: { imgs: ["/images/ai/dr-ruchi-portrait.webp", "/images/ai/dr-parmod-portrait.webp"], who: "Either of our specialists", btn: "Book a visit" },
};

export function Concierge() {
  const [sel, setSel] = useState(0);
  const c = CONCERNS[sel];
  const d = DOCS[c.doc];
  return (
    <div className="cc rise d4">
      <div className="t">What brings you in? <span><OpenStatus /></span></div>
      <div className="ch" role="group" aria-label="Choose your concern">
        {CONCERNS.map((x, i) => (
          <button key={x.label} aria-pressed={i === sel} onClick={() => setSel(i)}>
            <Icon name={x.icon} cls="ic ic-sm" />{x.label}
          </button>
        ))}
      </div>
      <div className="res">
        <span className="who">{d.imgs.map((s) => <img key={s} src={s} alt="" />)}</span>
        <span style={{ minWidth: 0 }}><b>{d.who}</b><span className="s">{c.price}</span></span>
        <Link className="btn btn-p btn-sm" href={`/contact-us?concern=${encodeURIComponent(c.label)}`}>{d.btn} <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
      </div>
      <HeroImg img={c.img} />
    </div>
  );
}

/** Renders nothing visible — exposes the current photo key to HeroPhoto via context-free bridge. */
function HeroImg({ img }: { img: string }) {
  // dispatched to HeroPhoto via DOM event keeps the two halves decoupled
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("dk-hero", { detail: img }));
  }, [img]);
  return null;
}

export function HeroPhoto() {
  const [imgs, setImgs] = useState<{ cur: string; prev?: string }>({ cur: "30f" });
  useEffect(() => {
    const onHero = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setImgs((s) => (s.cur === detail ? s : { cur: detail, prev: s.cur }));
    };
    window.addEventListener("dk-hero", onHero);
    return () => window.removeEventListener("dk-hero", onHero);
  }, []);
  return (
    <>
      {["30f", "60f", "40m"].map((k) => (
        <img key={k} src={`/images/ai/hero-smile-${k}.webp`} alt={k === "30f" ? "A woman laughing with a warm, natural smile" : ""}
          className={k === imgs.cur ? "on" : ""} loading={k === "30f" ? "eager" : "lazy"} fetchPriority={k === "30f" ? "high" : "low"} />
      ))}
    </>
  );
}
