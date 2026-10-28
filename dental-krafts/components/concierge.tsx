"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";

const CONCERNS = [
  { v: "missing", label: "missing teeth", doc: "r", price: "Implants from ₹30,000 · dentures from ₹5,000", img: "60f" },
  { v: "pain", label: "tooth pain", doc: "e", price: "Root canal from ₹6,000 · same-day relief when we can", img: "40m" },
  { v: "chip", label: "a chipped tooth", doc: "r", price: "Ceramic crowns from ₹12,000", img: "60f" },
  { v: "gaps", label: "gaps or crooked teeth", doc: "e", price: "Veneers, braces or aligners, priced after an exam", img: "30f" },
  { v: "stain", label: "stained teeth", doc: "e", price: "Whitening from ₹10,000", img: "30f" },
  { v: "kids", label: "my child's teeth", doc: "p", price: "Children's visit ₹500 · babies to teens", img: "30f" },
] as const;

const DOCS: Record<string, { imgs: string[]; who: string; btn: string }> = {
  r: { imgs: ["/images/ai/dr-ruchi-portrait.webp"], who: "You'll see Dr Ruchi Goel, AIIMS prosthodontist", btn: "Book with Dr Ruchi" },
  p: { imgs: ["/images/ai/dr-parmod-portrait.webp"], who: "You'll see Dr Parmod Gulia, pediatric dentist", btn: "Book with Dr Parmod" },
  e: { imgs: ["/images/ai/dr-ruchi-portrait.webp", "/images/ai/dr-parmod-portrait.webp"], who: "You'll see either dentist, whoever is in", btn: "Book a visit" },
};

const CLINICS = [
  { v: "either", label: "either clinic", suffix: "" },
  { v: "s53", label: "Sector 53", suffix: ", at Sector 53" },
  { v: "s57", label: "Sector 57", suffix: ", at Sector 57" },
] as const;

/** Hidden span measurer so each sentence select shrinks to its chosen option. */
let cv: HTMLSpanElement | null = null;
function fit(el: HTMLSelectElement | null) {
  if (!el) return;
  if (!cv) {
    cv = document.createElement("span");
    cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "position:absolute;visibility:hidden;white-space:pre;left:-9999px;top:0";
    document.body.appendChild(cv);
  }
  const cs = getComputedStyle(el);
  const o = el.options[el.selectedIndex];
  ["fontFamily", "fontSize", "fontStyle", "fontWeight", "fontVariationSettings", "letterSpacing"].forEach((k) => {
    // @ts-expect-error index into style
    cv!.style[k] = cs[k];
  });
  cv.textContent = o ? o.text : "";
  el.style.width = `${Math.ceil(cv.getBoundingClientRect().width + parseFloat(cs.paddingRight) + parseFloat(cs.paddingLeft) + 6)}px`;
}

export function FitSelect({ id, label, value, onChange, children }: { id: string; label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  const ref = useRef<HTMLSelectElement>(null);
  useLayoutEffect(() => {
    fit(ref.current);
  }, [value]);
  useEffect(() => {
    const all = () => document.querySelectorAll<HTMLSelectElement>(".sel select").forEach((s) => fit(s));
    (document.fonts?.ready ?? Promise.resolve()).then(all);
    window.addEventListener("resize", all);
    return () => window.removeEventListener("resize", all);
  }, []);
  return (
    <span className="sel">
      <select id={id} ref={ref} aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>{children}</select>
    </span>
  );
}

export function Concierge() {
  const [concern, setConcern] = useState("missing");
  const [clinic, setClinic] = useState("either");
  const c = CONCERNS.find((x) => x.v === concern)!;
  const d = DOCS[c.doc];
  const cl = CLINICS.find((x) => x.v === clinic)!;

  useEffect(() => {
    window.dispatchEvent(new CustomEvent("dk-hero", { detail: c.img }));
    window.dispatchEvent(new CustomEvent("dk-book", { detail: { concern: c.label, clinic: cl.label, doctor: c.doc === "r" ? "Dr Ruchi Goel" : c.doc === "p" ? "Dr Parmod Gulia" : "either dentist" } }));
  }, [c.img, c.label, c.doc, cl.label]);

  const qs = new URLSearchParams({ concern: c.label, c: cl.label, doctor: d.btn.replace("Book with ", "") });

  return (
    <div className="cc" aria-live="polite" data-r data-delay="520">
      <p className="sent">I'd like help with{" "}
        <FitSelect id="q-c" label="What brings you in" value={concern} onChange={setConcern}>
          {CONCERNS.map((x) => <option key={x.v} value={x.v}>{x.label}</option>)}
        </FitSelect>{" "}
        at{" "}
        <FitSelect id="q-l" label="Which clinic" value={clinic} onChange={setClinic}>
          {CLINICS.map((x) => <option key={x.v} value={x.v}>{x.label}</option>)}
        </FitSelect>.
      </p>
      <div className="res">
        <div className="av">{d.imgs.map((s) => <img key={s} src={s} alt="" />)}</div>
        <div><b>{d.who}{cl.suffix}</b><span>{c.price}</span></div>
        <Link className="btn btn-p" href={`/contact-us?${qs.toString()}`}>{d.btn} <Icon name="arrow-right" cls="ic ic-sm" /></Link>
      </div>
    </div>
  );
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
