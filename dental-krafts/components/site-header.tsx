"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";
import { OpenStatus } from "./open-status";
import { clinics } from "@/content/clinics";

const NAV_I18N: Record<string, [string, string][]> = {
  ja: [["治療内容", "/treatments"], ["歯科医師", "/our-dentists"], ["症例", "/gallery"], ["デンタルツーリズム", "/medical-tourism"], ["医院案内", "/contact-us"], ["患者の声", "/patient-stories"]],
  ko: [["치료", "/treatments"], ["치과의사", "/our-dentists"], ["결과", "/gallery"], ["치과 관광", "/medical-tourism"], ["클리닉", "/contact-us"], ["환자 후기", "/patient-stories"]],
};
const BOOK_I18N: Record<string, string> = { ja: "予約する", ko: "예약하기" };

const NAV: [string, string][] = [
  ["Treatments", "/treatments"],
  ["Our dentists", "/our-dentists"],
  ["Results", "/gallery"],
  ["Dental tourism", "/medical-tourism"],
  ["Clinics", "/#clinics"],
  ["Patient stories", "/patient-stories"],
];

export function SiteHeader({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  const [sc, setSc] = useState(false);
  const path = usePathname() ?? "";
  const lang = path.startsWith("/korean") ? "ko" : path.startsWith("/japanese") ? "ja" : "en";
  const nav = NAV_I18N[lang] ?? NAV;
  const book = BOOK_I18N[lang] ?? "Book a visit";
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
          {nav.map(([l, h]) => <Link key={l} href={h}>{l}</Link>)}
        </nav>
        <Link className="btn btn-p btn-sm" href="/contact-us">{book}</Link>
        <button className="menu" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mnav" onClick={() => setOpen(!open)}>
          <Icon name={open ? "x" : "menu"} cls="ic" />
        </button>
        <nav className="mnav" id="mnav" aria-label="Menu" hidden={!open} onClick={(e) => { if ((e.target as HTMLElement).tagName === "A") setOpen(false); }}>
          {nav.map(([l, h]) => <Link key={l} href={h}>{l}</Link>)}
          <Link className="btn btn-p" href="/contact-us">{book}</Link>
        </nav>
      </div></header>
    </>
  );
}
