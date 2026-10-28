"use client";
import { useEffect, useRef } from "react";
import { Icon } from "./icons";
import { site } from "@/content/site";

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
