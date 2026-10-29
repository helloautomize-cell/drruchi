"use client";
import { useEffect, useRef } from "react";

const ICONS = [
  <svg key="search" className="on" viewBox="0 0 56 56" aria-hidden="true"><circle cx="25" cy="25" r="13" /><path d="M35 35l12 12" /></svg>,
  <svg key="plan" viewBox="0 0 56 56" aria-hidden="true"><rect x="13" y="8" width="30" height="40" rx="4" /><path d="M21 20h14M21 28h14M21 36h8" /></svg>,
  <svg key="tooth" viewBox="0 0 56 56" aria-hidden="true"><path d="M28 14c-5-5-15-3-15 7 0 8 4 10 5 18 1 6 4 8 5 4 1-5 2-8 5-8s4 3 5 8c1 4 4 2 5-4 1-8 5-10 5-18 0-10-10-12-15-7z" transform="translate(0 -2)" /></svg>,
  <svg key="heart" viewBox="0 0 56 56" aria-hidden="true"><path d="M28 44S10 34 10 22a9 9 0 0 1 18-2 9 9 0 0 1 18 2c0 12-18 22-18 22z" /></svg>,
];

/** "How a visit works" waterfall: sticky left column (icon, rolling number,
    label, progress rail) driven by whichever step sits nearest the viewport
    middle. All steps stay lit under reduced motion. */
export function VisitWaterfall({ steps }: { steps: { no: string; t: string; p: string; tag: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wf = ref.current;
    if (!wf) return;
    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const els = wf.querySelectorAll<HTMLElement>(".wf-s");
    const dots = wf.querySelectorAll<HTMLElement>(".wf-rail b");
    const icons = wf.querySelectorAll<SVGElement>(".wf-ic svg");
    const nums = wf.querySelectorAll<HTMLElement>(".wf-num span");
    const lab = wf.querySelector<HTMLElement>(".wf-lab");
    const fill = wf.querySelector<HTMLElement>(".wf-fill");
    let cur = -1;

    const act = (i: number) => {
      if (i === cur) return;
      cur = i;
      els.forEach((s, k) => { s.classList.toggle("on", k === i); s.classList.toggle("past", k < i); });
      dots.forEach((d, k) => { d.classList.toggle("on", k === i); d.classList.toggle("done", k < i); });
      icons.forEach((s, k) => s.classList.toggle("on", k === i));
      nums.forEach((n) => { n.style.transform = `translateY(-${i}00%)`; });
      if (lab) lab.textContent = els[i].getAttribute("data-label");
    };
    const prog = () => {
      const r = wf.getBoundingClientRect();
      const vh = innerHeight;
      const t = Math.max(0, Math.min(1, (vh * 0.5 - r.top) / Math.max(1, r.height)));
      if (fill) fill.style.transform = `scaleY(${t})`;
      let best = 0, bd = 1e9;
      els.forEach((s, k) => {
        const b = s.getBoundingClientRect();
        const d = Math.abs(b.top + b.height / 2 - vh * 0.5);
        if (d < bd) { bd = d; best = k; }
      });
      if (r.top > vh * 0.55) best = 0;
      act(best);
    };

    let tk = false;
    const onScroll = () => { if (tk) return; tk = true; requestAnimationFrame(() => { tk = false; prog(); }); };
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", prog);
    prog();
    if (RM) els.forEach((s) => s.classList.add("on"));
    return () => { removeEventListener("scroll", onScroll); removeEventListener("resize", prog); };
  }, []);

  return (
    <div className="wf" ref={ref}>
      <aside className="wf-l" aria-hidden="true">
        <div className="wf-sticky">
          <span className="wf-ic">{ICONS.slice(0, steps.length)}</span>
          <span className="wf-num tnum">
            {steps.map((s) => <span key={s.no}>{s.no.padStart(2, "0")}</span>)}
          </span>
          <span className="wf-lab">{steps[0]?.t}</span>
          <div className="wf-rail">
            <i className="wf-fill" />
            {steps.map((s, i) => <b key={s.no} className={i === 0 ? "on" : undefined} />)}
          </div>
        </div>
      </aside>
      <div className="wf-r">
        {steps.map((s, i) => (
          <article className={`wf-s${i === 0 ? " on" : ""}`} data-label={s.t} key={s.no}>
            <p className="k">{s.no.padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</p>
            <h3>{s.t}</h3>
            <p>{s.p}</p>
            <span className="tag">{s.tag}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
