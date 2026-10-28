import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { CtaBand } from "@/components/bits";
import { clinics } from "@/content/clinics";
import { reviewById } from "@/content/reviews";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Dentist on Golf Course Road, Gurgaon | Dental Krafts Sector 53",
  description:
    "Dental Krafts Sector 53 is inside South Point Mall on Golf Course Road. Specialist care from AIIMS & PGIMER-trained dentists. Open 10 am–8 pm, closed Wed.",
  alternates: { canonical: "/best-dental-clinic-golf-course-road-gurgaon" },
};

const c = clinics[0];

const TOP6: [string, string, string, string][] = [
  ["tooth-implant", "Dental implants", "Dr Ruchi", "/dental-implants"],
  ["tooth-root", "Root canal treatment", "Either dentist", "/root-canal-treatment"],
  ["tooth", "Crowns and bridges", "Dr Ruchi", "/dental-crowns"],
  ["first-tooth", "Kids' dentistry", "Dr Parmod", "/pediatric-dentist"],
  ["sparkles", "Smile design & whitening", "Dr Ruchi", "/smile-makeover"],
  ["tooth-alert", "Emergency care", "Call us", "/emergency-dentist"],
];

const rishav = reviewById("rishav");

export default function GolfCourseRoad() {
  return (
    <>
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Clinics / Golf Course Road</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="map-pin" cls="ic ic-sm" /> Golf Course Road · Sector 53</span>
            <h1 className="d">Your dentist on <em>Golf Course Road</em></h1>
            <p className="sub">Dental Krafts Sector 53 is inside South Point Mall, right on Golf Course Road, with specialist care from AIIMS and PGIMER-trained dentists.</p>
            <div className="cta">
              <Link className="btn btn-w" href="/contact-us?clinic=Sector%2053%20%C2%B7%20Golf%20Course%20Road">Book a visit <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
              <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a>
              <a className="btn btn-s btn-sm" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`} target="_blank" rel="noopener"><Icon name="map-route" cls="ic ic-sm" /> Directions</a>
            </div>
          </div>
          <div className="ph">
            <img src="/images/clinic/storefront-signage-wide.webp" alt="Dental Krafts storefront inside South Point Mall, Golf Course Road" />
            <div className="glass fl f1"><span className="big tnum">5.0</span><span><b>Practo · Sector 53</b><small>{c.practoStories} patient stories</small></span></div>
          </div>
        </div>
      </div></section>

      <section className="sp"><div className="wrap two" style={{ alignItems: "start" }}>
        <div>
          <span className="eyebrow">The clinic</span>
          <h2 className="d h2">Five minutes off <em>the main road.</em></h2>
          <div className="prose">
            <p>Dental Krafts Sector 53 sits on the 2nd floor of South Point Mall, DLF Phase 5 — a landmark on Golf Course Road with lifts and parking. The founders treat you themselves: Dr Ruchi Goel, a prosthodontist trained at AIIMS New Delhi, and Dr Parmod Gulia, a pediatric dentist and PGIMER silver medallist.</p>
            <p>It's open Monday to Sunday, 10 am to 8 pm, closed Wednesdays — rated 5.0 on Practo. You'll see a written plan before any treatment starts.</p>
          </div>
          <div className="drive">
            {c.driveTimes.map(([from, min]) => <span className="chip" key={from}>{from} <b>{min}</b></span>)}
          </div>
          <p className="note"><OpenStatus clinicId={c.id} className="stat-live" /></p>
          <Link className="link" href="/dental-clinic-sector-53-gurgaon">Full Sector 53 clinic page — photos, hours, map <Icon name="arrow-right" cls="ic ic-sm" /></Link>
        </div>
        <div>
          <span className="eyebrow">Most-searched treatments here</span>
          <div className="cards" style={{ gridTemplateColumns: "minmax(0,1fr)", marginTop: 20 }}>
            {TOP6.map(([ic, name, who, href]) => (
              <Link className="cd" key={href} href={href} style={{ flexDirection: "row", alignItems: "center", gap: 14, padding: 14 }}>
                <span className="badge"><Icon name={ic} /></span><b style={{ fontSize: 17 }}>{name}</b><span style={{ marginLeft: "auto", whiteSpace: "nowrap" }}>{who}</span>
              </Link>
            ))}
          </div>
        </div>
      </div></section>

      <section className="sp p"><div className="wrap">
        <div className="qs" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
          <blockquote>
            <p>“{rishav.quote}”</p>
            <cite>{rishav.name}<span>{rishav.treatment} · {rishav.source}</span></cite>
          </blockquote>
        </div>
      </div></section>

      <section className="sp" style={{ paddingTop: 0 }}><div className="wrap">
        <CtaBand title="Minutes from" em="Golf Course Road." text="Book a consultation at the Sector 53 clinic. You'll leave with a written plan." book="Book at Sector 53" />
      </div></section>
    </>
  );
}
