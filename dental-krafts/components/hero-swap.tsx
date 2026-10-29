"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const INT = 5000;

const DOCTORS = [
  {
    who: "ruchi",
    cls: "a",
    src: "/images/v5/hero-ruchi.webp",
    w: 1024,
    h: 1280,
    alt: "Dr Ruchi Goel, prosthodontist, with arms folded in the clinic",
    name: "Dr Ruchi Goel",
    role: "Prosthodontist & implantologist · AIIMS",
    btn: "Implants and smile design",
    preload: true,
  },
  {
    who: "parmod",
    cls: "b",
    src: "/images/v5/hero-parmod.webp",
    w: 1055,
    h: 1318,
    alt: "Dr Parmod Gulia, pediatric dentist, leaning on the clinic counter",
    name: "Dr Parmod Gulia",
    role: "Pediatric dentist · PGIMER",
    btn: "Children and family care",
    preload: true,
  },
] as const;

type Who = (typeof DOCTORS)[number]["who"];

/** Hero doctor stack that auto-swaps every 3s. Pause on hover/focus, swipe on
    touch, arrow keys when focused inside, and a still frame under reduced motion. */
export function HeroSwap() {
  const [front, setFront] = useState<Who>("ruchi");
  const [paused, setPaused] = useState(false);
  const [still, setStill] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const api = useRef<{ set: (w: Who) => void; hold: (on: boolean) => void }>({ set: () => {}, hold: () => {} });

  useEffect(() => {
    const rm = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (rm) setStill(true);
    let cur: Who = "ruchi";
    let hold = false;
    let vis = true;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const restart = () => {
      if (timer) clearTimeout(timer);
      if (!rm) timer = setTimeout(tick, INT);
    };
    const set = (who: Who) => { cur = who; setFront(who); restart(); };
    const other = () => set(cur === "ruchi" ? "parmod" : "ruchi");
    const tick = () => {
      if (hold || !vis || document.hidden) { timer = setTimeout(tick, 400); return; }
      other();
    };

    api.current = {
      set,
      hold: (on) => { hold = on; setPaused(on); },
    };

    const io = ref.current ? new IntersectionObserver((es) => { vis = es[0].isIntersecting; }) : null;
    if (io && ref.current) io.observe(ref.current);
    const onKey = (e: KeyboardEvent) => {
      if (!ref.current?.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") other();
    };
    document.addEventListener("keydown", onKey);
    restart();
    return () => { if (timer) clearTimeout(timer); io?.disconnect(); document.removeEventListener("keydown", onKey); };
  }, []);

  return (
    <div
      ref={ref}
      className={`dk5-duo dk5-swap rise${paused ? " paused" : ""}${still ? " still" : ""}`}
      data-front={front}
      style={{ "--rd": "260ms", "--swt": "5s" } as React.CSSProperties}
      onMouseEnter={() => api.current.hold(true)}
      onMouseLeave={() => api.current.hold(false)}
      onFocus={() => api.current.hold(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) api.current.hold(false); }}
      onTouchStart={(e) => { (ref.current as { x0?: number | null } & HTMLDivElement).x0 = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const el = ref.current as { x0?: number | null } & HTMLDivElement | null;
        if (el?.x0 == null) return;
        const dx = e.changedTouches[0].clientX - el.x0;
        el.x0 = null;
        if (Math.abs(dx) > 40) api.current.set(front === "ruchi" ? "parmod" : "ruchi");
      }}
    >
      <div className="dk5-stack">
        {DOCTORS.map((d) => (
          <figure
            key={d.who}
            className={`dk5-pc ${d.cls}`}
            onClick={() => { if (front !== d.who) api.current.set(d.who); }}
          >
            <Image src={d.src} width={d.w} height={d.h} alt={d.alt} sizes="(max-width: 768px) 78vw, 380px" preload={d.preload} fetchPriority={d.who === "ruchi" ? "high" : "auto"} />
            <figcaption><b>{d.name}</b><span>{d.role}</span></figcaption>
            <span className="dk5-tab" aria-hidden="true">{d.name}</span>
          </figure>
        ))}
        <div className="dk5-seal"><span className="n tnum" data-count>17+</span><span className="l">years of<br />experience</span></div>
      </div>
      <div className="dk5-swc" role="group" aria-label="Choose a dentist">
        {DOCTORS.map((d) => (
          <button key={d.who} type="button" aria-pressed={front === d.who} onClick={() => api.current.set(d.who)}>
            <b>{d.name}</b><span>{d.btn}</span><i key={front} />
          </button>
        ))}
      </div>
    </div>
  );
}
