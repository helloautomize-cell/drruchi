import Link from "next/link";
import { Icon } from "./icons";
import { clinics } from "@/content/clinics";
import { site } from "@/content/site";

const TREAT_LINKS = [
  ["Dental implants", "/dental-implants"],
  ["Root canal", "/root-canal-treatment"],
  ["Crowns and bridges", "/dental-crowns"],
  ["Smile makeover", "/smile-makeover"],
  ["Kids' dentistry", "/pediatric-dentist"],
  ["All 21 treatments", "/treatments"],
];

export function SiteFooter() {
  return (
    <footer>
      <div className="wrap fg">
        <div>
          <img src="/images/brand/dk-logo-colour.svg" alt="Dental Krafts" style={{ height: 56, width: "auto" }} />
          <p style={{ color: "var(--ink-2)", fontSize: 15, maxWidth: "34ch", margin: "18px 0 20px" }}>Specialist dental care in Gurgaon, from dentists trained at AIIMS and PGIMER.</p>
          <Link className="btn btn-p btn-sm" href="/contact-us">Book a visit</Link>
          <div className="soc">
            <a href={site.instagram} aria-label="Instagram"><Icon name="instagram" cls="ic ic-sm" /></a>
            <a href={site.facebook} aria-label="Facebook"><Icon name="facebook" cls="ic ic-sm" /></a>
            <a href={site.youtube} aria-label="YouTube"><Icon name="youtube" cls="ic ic-sm" /></a>
          </div>
        </div>
        <div><h4>Treatments</h4><ul>{TREAT_LINKS.map(([l, h]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul></div>
        <div><h4>Clinics</h4><ul>
          {clinics.map((c) => (
            <li key={c.id}><Link href={c.slug}>{c.name}</Link><span className="tnum" style={{ display: "block", fontSize: 14, color: "var(--ink-2)" }}>{c.phone}</span></li>
          ))}
          <li style={{ marginTop: 8 }}><a href={`mailto:${site.email}`}>{site.email}</a></li>
        </ul></div>
        <div><h4>Dental Krafts</h4><ul>
          <li><Link href="/our-dentists">Our dentists</Link></li>
          <li><Link href="/gallery">Results</Link></li>
          <li><Link href="/#videos">Videos</Link></li>
          <li><Link href="/patient-stories">Patient stories</Link></li>
          <li><Link href="/blog">Blog</Link></li>
          <li><Link href="/about-us">About</Link></li>
          <li><Link href="/japanese" lang="ja">日本語</Link> · <Link href="/korean" lang="ko">한국어</Link></li>
        </ul></div>
      </div>
      <div className="wrap"><p className="sig" data-split aria-hidden="true">Dental <em>Krafts</em></p></div>
      <div className="wrap fb"><span>Dr Ruchi Goel, Reg. A-7387 · Dr Parmod Gulia, Reg. A-12323 · Delhi State Dental Council</span><span>© 2026 Dental Krafts · <Link href="/privacy-policy">Privacy</Link> · <Link href="/terms-conditions">Terms</Link></span></div>
    </footer>
  );
}
