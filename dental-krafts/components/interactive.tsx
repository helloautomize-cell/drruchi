"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { treatmentGroups } from "@/content/treatments";
import { priceTabs } from "@/content/prices";
import { site } from "@/content/site";

/* ---- Treatments: hairline list + sticky photo preview (v3 .tx) ---- */
const ROW_WHO: Record<string, string> = {
  ruchi: "Dr Ruchi Goel",
  parmod: "Dr Parmod Gulia",
  either: "Either dentist",
};
const ROW_WHO_LABEL: Record<string, string> = {
  ruchi: "Usually with Dr Ruchi Goel",
  parmod: "With Dr Parmod Gulia",
  either: "With either dentist",
};

export function TreatmentsIndex() {
  const [sel, setSel] = useState(0);
  const g = treatmentGroups[sel];
  const [base, setBase] = useState<string>(g.img);
  const [nx, setNx] = useState<string | null>(null);

  /* the incoming photo wipes up over the settled one (v4); under reduced motion it just swaps */
  useEffect(() => {
    if (g.img === base) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setBase(g.img);
    else setNx(g.img);
  }, [g.img, base]);

  useEffect(() => {
    if (!nx) return;
    const el = document.querySelector<HTMLImageElement>(".tprev .ph img.nx");
    if (!el) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add("go")));
    return () => cancelAnimationFrame(raf);
  }, [nx]);

  return (
    <div className="tx">
      <div className="tlist" data-r="stagger">
        {treatmentGroups.map((x, i) => (
          <Link key={x.name} href={`/treatments#${i}`} className={`tr${i === sel ? " on" : ""}`}
            onMouseEnter={() => setSel(i)} onFocus={() => setSel(i)}>
            <span className="tth"><img src={x.img} alt="" loading="lazy" /></span>
            <div><h3 className="h3">{x.name}<Icon name="arrow-right" cls="ic" /></h3><p>{x.desc}</p></div>
            <span className="who">{ROW_WHO[x.doctor] ?? "Either dentist"}</span>
            <span className="pr tnum"><small>from</small>{x.price}</span>
          </Link>
        ))}
      </div>
      <div className="tprev" aria-hidden="true">
        <div className="ph" data-unveil>
          <img src={base} alt="" />
          {nx && <img className="nx" src={nx} alt="" onTransitionEnd={(e) => { if (e.propertyName === "clip-path") { setBase(nx); setNx(null); } }} />}
        </div>
        <div className="meta"><span>{ROW_WHO_LABEL[g.doctor] ?? "With either dentist"}</span><Link className="tl" href="/contact-us">Book for this</Link></div>
      </div>
    </div>
  );
}

/* ---- Costs: tabbed price menu (v3 .menu-g / .mi) ---- */
export function CostsTabs() {
  const [sel, setSel] = useState(0);
  const t = priceTabs[sel];
  return (
    <>
      <div className="filters" role="tablist" style={{ justifyContent: "center" }}>
        {priceTabs.map((x, i) => <button key={x.key} className="chip" role="tab" aria-pressed={i === sel} onClick={() => setSel(i)}>{x.label}</button>)}
      </div>
      <div className="menu-g tnum" style={{ marginTop: 8 }}>
        <div>
          {t.rows.map((r) => (
            <div className="mi" key={r.item + r.note}>
              <b>{r.item}</b><span className="dots" /><span className="p">{r.from && <small>{r.from}</small>}{r.price}</span>
              <span className="s">{r.note}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ---- Sticky on-this-page nav with scroll spy (treatment guide) ---- */
export function Toc({ links }: { links: [string, string][] }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = ref.current;
    if (!nav || !("IntersectionObserver" in window)) return;
    const as = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[href^='#']"));
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) as.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === `#${e.target.id}`));
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    as.forEach((a) => {
      const t = document.getElementById(a.getAttribute("href")!.slice(1));
      if (t) io.observe(t);
    });
    return () => io.disconnect();
  }, [links]);
  return (
    <nav className="toc" aria-label="On this page" ref={ref}>
      <p>On this page</p>
      {links.map(([id, l]) => <a key={id} href={`#${id}`}>{l}</a>)}
      <a className="btn btn-wa btn-sm" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> Ask a question</a>
    </nav>
  );
}
