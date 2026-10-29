"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";

/** Sticky jump bar for /treatments — pills with round thumbs; active group
    highlighted via IntersectionObserver while scrolling. */
export function TreatmentsJump({ groups }: { groups: { id: string; name: string; count: number; thumb: string }[] }) {
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav || !("IntersectionObserver" in window)) return;
    const links = Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[href^='#']"));
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) links.forEach((a) => a.classList.toggle("on", a.getAttribute("href") === `#${e.target.id}`));
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    document.querySelectorAll(".tr-cat").forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [groups]);
  return (
    <nav className="tr-jump" aria-label="Treatment groups" ref={navRef}>
      <div className="wrap">
        {groups.map((g) => (
          <a key={g.id} href={`#${g.id}`}>
            <Image sizes="(max-width: 768px) 100vw, 760px" src={g.thumb} width={96} height={96} alt="" loading="lazy" />
            <span>{g.name}<small>{g.count} {g.count === 1 ? "treatment" : "treatments"}</small></span>
          </a>
        ))}
      </div>
    </nav>
  );
}
