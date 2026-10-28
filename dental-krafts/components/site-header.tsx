"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { OpenStatus } from "./open-status";
import { clinics } from "@/content/clinics";

const NAV: [string, string][] = [
  ["Treatments", "/treatments"],
  ["Our dentists", "/our-dentists"],
  ["Results", "/gallery"],
  ["Videos", "/#videos"],
  ["Clinics", "/#clinics"],
  ["Patient stories", "/patient-stories"],
];

export function SiteHeader({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const [sc, setSc] = useState(false);
  useEffect(() => {
    const onS = () => setSc(window.scrollY > 10);
    onS();
    addEventListener("scroll", onS, { passive: true });
    return () => removeEventListener("scroll", onS);
  }, []);
  return (
    <>
      <div className="util"><div className="wrap">
        <OpenStatus className="live" />
        <span className="phs">
          {clinics.map((c) => <span key={c.id}><b>{c.short}</b> · <a href={c.phoneHref}>{c.phone}</a></span>)}
        </span>
        <nav className="lang" aria-label="Language"><a href="/" aria-current="true">EN</a><Link href="/japanese" lang="ja">日本語</Link><Link href="/korean" lang="ko">한국어</Link></nav>
      </div></div>
      <header className={`hd${sc ? " sc" : ""}`}><div className="wrap">
        <Link className="logo" href="/" aria-label="Dental Krafts home"><img src="/images/brand/dk-logo-colour.svg" alt="Dental Krafts" width={116} height={50} /></Link>
        <nav className="nav" aria-label="Main">
          {NAV.map(([l, h]) => <Link key={l} href={h}>{l}</Link>)}
        </nav>
        <Link className="btn btn-p btn-sm" href="/contact-us">Book a visit</Link>
        <button className="menu" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
          <Icon name={open ? "x" : "menu"} cls="ic" />
        </button>
        <nav className="mnav" id="mnav" aria-label="Menu" hidden={!open} onClick={(e) => { if ((e.target as HTMLElement).tagName === "A") setOpen(false); }}>
          {NAV.map(([l, h]) => <Link key={l} href={h}>{l}</Link>)}
          <Link className="btn btn-p" href="/contact-us">Book a visit</Link>
        </nav>
      </div></header>
    </>
  );
}
