"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Icon } from "./icons";

export type GuidePill = { slug: string; name: string; count: number };

/**
 * Filter bar + the card list it controls. All cards are server-rendered inside
 * `children`; filtering/search only toggles the `hidden` attribute on the DOM,
 * so every guide stays in the HTML for crawlers and no-JS users.
 */
export function GuideBrowser({ pills, total, initialCat = "all", children }: {
  pills: GuidePill[]; total: number; initialCat?: string; children: ReactNode;
}) {
  const [cat, setCat] = useState(initialCat);
  const [term, setTerm] = useState("");
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const t = term.toLowerCase().trim();
    let n = 0;
    root.querySelectorAll<HTMLElement>(".gd-card").forEach((c) => {
      const ok = (cat === "all" || c.dataset.cat === cat) && (!t || (c.dataset.q ?? "").includes(t));
      c.hidden = !ok;
      if (ok) n++;
    });
    const ask = root.querySelector<HTMLElement>(".gd-ask");
    if (ask) ask.hidden = cat !== "all" || t !== "";
    const feat = root.querySelector<HTMLElement>(".gd-feat");
    if (feat) feat.style.marginBottom = feat.hidden ? "0px" : "";
    const empty = root.querySelector<HTMLElement>(".gd-empty");
    if (empty) empty.hidden = n > 0;
  }, [cat, term]);

  return (
    <>
      <div className="gd-tools"><div className="wrap">
        <div className="gd-pills" role="group" aria-label="Filter by topic">
          <button type="button" className="gd-pill" aria-pressed={cat === "all"} onClick={() => setCat("all")}>All <span>{total}</span></button>
          {pills.map((p) => (
            <button key={p.slug} type="button" className="gd-pill" aria-pressed={cat === p.slug} onClick={() => setCat(p.slug)}>{p.name} <span>{p.count}</span></button>
          ))}
        </div>
        <label className="gd-search"><Icon name="search" cls="ic ic-sm" /><span className="gd-sr">Search guides</span><input type="search" placeholder="Search guides" autoComplete="off" value={term} onChange={(e) => setTerm(e.target.value)} /></label>
      </div></div>
      <section className="gd-list" aria-label="All guides"><div className="wrap" ref={list}>{children}</div></section>
    </>
  );
}

/** Copy-to-clipboard button with a small toast. `label` renders visible text. */
export function CopyBtn({ text, className, label }: { text: string; className: string; label?: string }) {
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const copy = async () => {
    try { await navigator.clipboard.writeText(text); } catch { /* clipboard unavailable */ }
    setShow(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 1800);
  };
  return (
    <>
      <button type="button" className={className} onClick={copy} aria-label={label ? undefined : "Copy link"}>
        <svg className="ic ic-sm" aria-hidden="true" viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" /><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" /></svg>
        {label}
      </button>
      <span className={`gd-toast${show ? " show" : ""}`} role="status" aria-live="polite">{show ? "Link copied" : ""}</span>
    </>
  );
}

/** WhatsApp + copy-link share row. `compact` = round icon buttons (sidebar). */
export function ShareButtons({ url, title, compact = false }: { url: string; title: string; compact?: boolean }) {
  const wa = `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`;
  if (compact) {
    return (
      <div className="gd-share"><p className="gd-toc-h">Share</p>
        <a className="gd-sbtn" href={wa} rel="noopener" target="_blank" aria-label="Share on WhatsApp"><Icon name="whatsapp" cls="ic ic-sm" /></a>
        <CopyBtn className="gd-sbtn" text={url} />
      </div>
    );
  }
  return (
    <div className="gd-share gd-share-in"><span>Share this guide</span>
      <a className="btn btn-s btn-sm" href={wa} rel="noopener" target="_blank"><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a>
      <CopyBtn className="btn btn-s btn-sm" text={url} label="Copy link" />
    </div>
  );
}

/** Sticky left table of contents with scroll-spy + share buttons. */
export function GuideToc({ links, url, title }: { links: { id: string; label: string }[]; url: string; title: string }) {
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = nav.current;
    if (!el) return;
    const as = Array.from(el.querySelectorAll<HTMLAnchorElement>("a[href^='#']"));
    const heads = as.map((a) => document.getElementById(a.getAttribute("href")!.slice(1)));
    const spy = () => {
      let cur = 0;
      heads.forEach((h, i) => { if (h && h.getBoundingClientRect().top < 160) cur = i; });
      as.forEach((a, i) => a.classList.toggle("on", i === cur));
    };
    spy();
    addEventListener("scroll", spy, { passive: true });
    return () => removeEventListener("scroll", spy);
  }, [links]);
  return (
    <nav className="gd-toc" aria-label="In this guide" ref={nav}>
      <p className="gd-toc-h">In this guide</p>
      <ol>{links.map((l) => <li key={l.id}><a href={`#${l.id}`}>{l.label}</a></li>)}</ol>
      <ShareButtons url={url} title={title} compact />
    </nav>
  );
}
