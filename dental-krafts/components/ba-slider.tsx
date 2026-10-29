"use client";
import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Icon } from "./icons";

export type BaCase = { file: string; cat: string; caption: string };

/** Before/after drag slider (v3): clip-path reveal on a native range input. */
export function BaSlider({ file, altB = "Before treatment", altA = "After treatment", ratio }: { file: string; altB?: string; altA?: string; ratio?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="ba" ref={ref} role="group" aria-label="Before and after comparison" style={ratio ? { aspectRatio: ratio } : undefined}>
      <Image sizes="(max-width: 768px) 100vw, 760px" src={`/images/results/split/${file}__before.webp`} width={1600} height={800} alt={altB} loading="lazy" />
      <Image sizes="(max-width: 768px) 100vw, 760px" className="af" src={`/images/results/split/${file}__after.webp`} width={1600} height={800} alt={altA} loading="lazy" />
      <span className="hd2" /><span className="kn"><span style={{ display: "flex" }}><Icon name="arrow-left" cls="ic ic-sm" /><Icon name="arrow-right" cls="ic ic-sm" /></span></span>
      <span className="lb l">Before</span><span className="lb r">After</span>
      <input type="range" min={0} max={100} defaultValue={50}
        aria-label="Drag to compare before and after"
        onInput={(e) => ref.current?.style.setProperty("--x", `${(e.target as HTMLInputElement).value}%`)} />
    </div>
  );
}

const pad = (n: number) => String(n).padStart(2, "0");

/** v4 showcase: cross-fading slider with counter, progress bar, arrows and a thumb rail.
    The divider sweeps once the first time it scrolls into view; the labels live in
    [data-k]/[data-c] elements inside the nearest .rx or .gs scope. */
export function BaShowcase({ cases }: { cases: BaCase[] }) {
  const box = useRef<HTMLDivElement>(null);
  const ba = useRef<HTMLDivElement>(null);
  const rng = useRef<HTMLInputElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [sel, setSel] = useState(0);
  const [sw, setSw] = useState(false);
  const touched = useRef(false);

  const setX = (v: number | string) => ba.current?.style.setProperty("--x", `${v}%`);
  const reset = () => { if (rng.current) rng.current.value = "50"; setX(50); };

  function applyLabels(c: BaCase) {
    const scope = box.current?.closest(".rx, .gs") ?? box.current?.parentElement;
    const k = scope?.querySelector("[data-k]"), cap = scope?.querySelector("[data-c]");
    if (k) k.textContent = c.cat;
    if (cap) cap.textContent = c.caption;
  }

  function show(i: number, first = false) {
    const idx = (i + cases.length) % cases.length;
    const c = cases[idx];
    if (first || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setSel(idx); applyLabels(c); reset();
    } else {
      setSw(true);
      setTimeout(() => { setSel(idx); applyLabels(c); reset(); setSw(false); }, 300);
    }
    const b = rail.current?.children[idx] as HTMLElement | undefined;
    if (b && rail.current && !first) rail.current.scrollTo({ left: Math.max(0, b.offsetLeft - rail.current.clientWidth / 2 + b.offsetWidth / 2), behavior: "smooth" });
  }

  /* one-time hint: the divider sweeps 50 → 74 → 30 → 50 so visitors see it can be dragged */
  useEffect(() => {
    if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ba.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      io.disconnect();
      const t = setTimeout(() => {
        if (touched.current) return;
        const K = [50, 74, 30, 50];
        let t0: number | null = null;
        const f = (ts: number) => {
          if (touched.current) return;
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / 2200, 1);
          const seg = Math.min(Math.floor(p * 3), 2);
          const lp = p * 3 - seg;
          const e = 0.5 - Math.cos(Math.PI * lp) / 2;
          const v = K[seg] + (K[seg + 1] - K[seg]) * (p === 1 ? 1 : e);
          setX(v.toFixed(2));
          if (rng.current) rng.current.value = String(v);
          if (p < 1) requestAnimationFrame(f);
        };
        requestAnimationFrame(f);
      }, 900);
      return () => clearTimeout(t);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const c = cases[sel];
  return (
    <div ref={box}>
      <div className={`ba${sw ? " sw" : ""}`} ref={ba} data-unveil>
        <Image sizes="(max-width: 768px) 100vw, 760px" src={`/images/results/split/${c.file}__before.webp`} width={1600} height={800} alt="Before treatment" />
        <Image sizes="(max-width: 768px) 100vw, 760px" className="af" src={`/images/results/split/${c.file}__after.webp`} width={1600} height={800} alt="After treatment" />
        <span className="hd2" /><span className="kn"><span style={{ display: "flex" }}><Icon name="arrow-left" cls="ic ic-sm" /><Icon name="arrow-right" cls="ic ic-sm" /></span></span>
        <span className="lb l">Before</span><span className="lb r">After</span>
        <input ref={rng} type="range" min={0} max={100} defaultValue={50}
          aria-label="Drag to compare before and after"
          onInput={(e) => { touched.current = true; setX(e.currentTarget.value); }} />
      </div>
      <div className="rctl">
        <span className="ctr">{pad(sel + 1)} <span>/ {pad(cases.length)}</span></span>
        <span className="bar" style={{ "--p": ((sel + 1) / cases.length).toFixed(3) } as CSSProperties}><i /></span>
        <div className="qnav">
          <button type="button" aria-label="Previous case" onClick={() => { touched.current = true; show(sel - 1); }}><Icon name="arrow-left" cls="ic" /></button>
          <button type="button" aria-label="Next case" onClick={() => { touched.current = true; show(sel + 1); }}><Icon name="arrow-right" cls="ic" /></button>
        </div>
      </div>
      <div className="thumbs" ref={rail}>
        {cases.map((x, i) => (
          <button key={x.file} type="button" aria-label={x.caption} aria-pressed={i === sel} onClick={() => { touched.current = true; show(i); }}>
            <Image sizes="(max-width: 768px) 100vw, 760px" src={`/images/results/split/${x.file}__after.webp`} width={1600} height={800} alt="" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
