import Link from "next/link";
import { Icon } from "./icons";
import { clinics } from "@/content/clinics";
import { site } from "@/content/site";

const TREAT_LINKS = [
  ["Dental implants", "/dental-implants"],
  ["All-on-4 / All-on-6", "/all-on-4-dental-implants"],
  ["Dentures", "/dentures"],
  ["Root canal", "/root-canal-treatment"],
  ["Crowns and bridges", "/dental-crowns"],
  ["Smile makeover", "/smile-makeover"],
  ["Kids' dentistry", "/pediatric-dentist"],
  ["All 21 treatments", "/treatments"],
];

export function SiteFooter() {
  return (
    <footer className="ftA on-dark">
      <div className="wrap">
        <div className="cols">
          <div>
            <img src="/images/brand/dk-logo-reversed.svg" alt="Dental Krafts" style={{ height: 52, width: "auto", marginBottom: 16 }} />
            <p style={{ margin: "0 0 18px", maxWidth: "34ch" }}>Specialist dental care in Gurgaon, from dentists trained at AIIMS and PGIMER.</p>
            <Link className="btn btn-w btn-sm" href="/contact-us">Book a visit</Link>
            <div className="soc" style={{ marginTop: 18 }}>
              <a href={site.instagram} aria-label="Instagram"><Icon name="heart" cls="ic ic-sm" /></a>
              <a href={site.facebook} aria-label="Facebook"><Icon name="quote" cls="ic ic-sm" /></a>
              <a href={site.youtube} aria-label="YouTube"><Icon name="youtube" cls="ic ic-sm" /></a>
            </div>
          </div>
          <div>
            <h4>Treatments</h4>
            <ul>{TREAT_LINKS.map(([l, h]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul>
          </div>
          <div>
            <h4>Clinics</h4>
            <ul>
              {clinics.map((c) => (
                <li key={c.id}><Link href={c.slug}>{c.name}</Link><span className="tnum" style={{ display: "block", fontSize: 14 }}>{c.phone}</span></li>
              ))}
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </div>
          <div>
            <h4>Dental Krafts</h4>
            <ul>
              <li><Link href="/our-dentists">Our dentists</Link></li>
              <li><Link href="/gallery">Results</Link></li>
              <li><Link href="/treatment-costs">Costs</Link></li>
              <li><Link href="/patient-stories">Patient stories</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/about-us">About</Link></li>
              <li><Link href="/medical-tourism">Dental tourism</Link></li>
              <li><Link href="/japanese">日本語</Link> · <Link href="/korean">한국어</Link></li>
            </ul>
          </div>
        </div>
        <div className="bot">
          <span>Dr Ruchi Goel, Reg. A-7387 · Dr Parmod Gulia, Reg. A-12323 · Delhi State Dental Council</span>
          <span>© 2026 Dental Krafts · <Link href="/privacy-policy">Privacy</Link> · <Link href="/terms-conditions">Terms</Link></span>
        </div>
      </div>
    </footer>
  );
}
