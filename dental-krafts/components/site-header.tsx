"use client";
import { useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { OpenStatus } from "./open-status";
import { clinics } from "@/content/clinics";
import { doctors } from "@/content/doctors";
import { treatmentGroups, treatments } from "@/content/treatments";

const TGROUPS = treatmentGroups.map((g) => ({
  name: g.name,
  icon: g.icon as string,
  items: treatments.filter((t) => t.group === g.name),
}));

export function SiteHeader({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="shd">
        <div className="wrap">
          <Link href="/" aria-label="Dental Krafts home">
            <img className="logo" src="/images/brand/dk-logo-reversed.svg" alt="Dental Krafts" height={46} />
          </Link>
          <nav aria-label="Main">
            <ul>
              <li className="mn-item">
                <button type="button" className={active === "treatments" ? "on" : ""} aria-haspopup="true">Treatments <Icon name="chevron-down" /></button>
                <div className="mega" role="menu">
                  <div className="wrap">
                    <div className="cols">
                      {TGROUPS.map((g) => (
                        <div className="g" key={g.name}>
                          <b>{g.name}</b>
                          {g.items.map((t) => (
                            <Link key={t.slug} href={`/${t.slug}`}><Icon name={g.icon as string} /><span style={{display:"contents"}}><u style={{textDecoration:"none"}}>{t.name}</u><span>{t.costChip ?? ""}</span></span></Link>
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="nsure">
                      <span><b>Not sure what you need?</b> Tell us what's wrong — we'll point you to the right dentist.</span>
                      <Link className="btn btn-p btn-sm" href="/contact-us?c=not-sure">Book a ₹500 visit</Link>
                    </div>
                  </div>
                </div>
              </li>
              <li className="mn-item">
                <button type="button" className={active === "dentists" ? "on" : ""} aria-haspopup="true">Our dentists <Icon name="chevron-down" /></button>
                <div className="mega">
                  <div className="wrap">
                    <div className="mini">
                      {doctors.map((d) => (
                        <Link key={d.id} href={d.slug}>
                          <img src={d.portrait} alt="" />
                          <span><b>{d.name}</b><span>{d.role}</span></span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
              <li><Link href="/gallery" className={active === "gallery" ? "on" : ""}>Results</Link></li>
              <li><Link href="/treatment-costs" className={active === "costs" ? "on" : ""}>Costs</Link></li>
              <li className="mn-item">
                <button type="button" aria-haspopup="true">Clinics <Icon name="chevron-down" /></button>
                <div className="mega">
                  <div className="wrap">
                    <div className="mini">
                      {clinics.map((c) => (
                        <Link key={c.id} href={c.slug}>
                          <img src={c.image} alt="" />
                          <span><b>{c.name}</b><span>{c.hoursLabel} · closed Wed · {c.phone}</span></span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </li>
              <li><Link href="/patient-stories" className={active === "stories" ? "on" : ""}>Patient stories</Link></li>
            </ul>
          </nav>
          <div className="r">
            <span className="lang" aria-label="Language"><b>EN</b><Link href="/japanese">日本語</Link><Link href="/korean">한국어</Link></span>
            <span className="live-h"><OpenStatus /></span>
            <Link className="btn btn-w btn-sm" href="/contact-us">Book a visit</Link>
            <button className="menu-b" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>
              <Icon name={open ? "x" : "menu"} />
            </button>
          </div>
        </div>
      </header>
      <div className={`msheet${open ? " open" : ""}`} aria-hidden={!open}>
        <div className="top">
          <img src="/images/brand/dk-logo-reversed.svg" alt="Dental Krafts" height={40} />
          <button className="menu-b" style={{display:"grid"}} aria-label="Close menu" onClick={() => setOpen(false)}><Icon name="x" /></button>
        </div>
        <div className="body" onClick={(e) => { if ((e.target as HTMLElement).tagName === "A") setOpen(false); }}>
          <details>
            <summary>Treatments <Icon name="chevron-down" cls="ic" /></summary>
            <div className="sub">
              {TGROUPS.map((g) => (
                <span key={g.name} style={{display:"contents"}}><b>{g.name}</b>
                  {g.items.map((t) => <Link key={t.slug} href={`/${t.slug}`}>{t.name}</Link>)}
                </span>
              ))}
            </div>
          </details>
          <details>
            <summary>Our dentists <Icon name="chevron-down" cls="ic" /></summary>
            <div className="sub">
              <Link href="/our-dentists">Meet the team</Link>
              {doctors.map((d) => <Link key={d.id} href={d.slug}>{d.name} · {d.role}</Link>)}
            </div>
          </details>
          <details>
            <summary>Clinics <Icon name="chevron-down" cls="ic" /></summary>
            <div className="sub">{clinics.map((c) => <Link key={c.id} href={c.slug}>{c.name}<br/><small>{c.address}</small></Link>)}</div>
          </details>
          <Link href="/gallery">Results</Link>
          <Link href="/treatment-costs">Costs</Link>
          <Link href="/patient-stories">Patient stories</Link>
          <Link href="/treatments">All treatments</Link>
          <Link href="/blog">Blog</Link>
          <div className="langs"><b>EN</b><Link href="/japanese">日本語</Link><Link href="/korean">한국어</Link></div>
        </div>
        <div className="cta"><Link className="btn btn-w" href="/contact-us">Book a visit</Link></div>
      </div>
    </>
  );
}
