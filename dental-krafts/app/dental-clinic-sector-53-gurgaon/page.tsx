import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { OpenStatus, ClinicWeek } from "@/components/open-status";
import { BookingForm } from "@/components/booking-form";
import { Eb } from "@/components/bits";
import { clinics } from "@/content/clinics";
import { doctors } from "@/content/doctors";
import { reviewById } from "@/content/reviews";
import { site } from "@/content/site";
import { JsonLd, clinicNode, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Dentist in Sector 53, Golf Course Road | Dental Krafts",
  description: "Dental Krafts Sector 53, DSP-211, 2nd Floor, South Point Mall, Golf Course Road. AIIMS & PGIMER dentists. Open 10 am–8 pm, closed Wed. Call +91 98104 48720.",
  alternates: { canonical: "/dental-clinic-sector-53-gurgaon" },
};

const c = clinics[0];
const QUOTE = reviewById("rishav");

const TOP8: [string, string, string][] = [
  ["Dental implants", "Dr Ruchi", "/dental-implants"],
  ["Root canal treatment", "Either dentist", "/root-canal-treatment"],
  ["Crowns and bridges", "Dr Ruchi", "/dental-crowns"],
  ["Kids' dentistry", "Dr Parmod", "/pediatric-dentist"],
  ["Teeth whitening", "Either dentist", "/teeth-whitening"],
  ["Dentures", "Dr Ruchi", "/dentures"],
  ["Teeth cleaning", "Either dentist", "/teeth-cleaning"],
  ["Emergency care", "Call us", "/emergency-dentist"],
];

const MOS: [string, string][] = [
  ["/images/clinic/reception-lounge-wide.webp", "The reception lounge"],
  ["/images/clinic/storefront-signage-wide.webp", "Storefront at South Point Mall"],
  ["/images/doctors/dk-doctors-performing-procedure-1.webp", "Both dentists during a procedure"],
];

const LD = [
  clinicNode(c),
  breadcrumb([["Home", "/"], ["Clinics", "/contact-us"], ["Sector 53", c.slug]]),
];

export default function Sector53() {
  return (
    <>
      {/* 1 · Hero + info card */}
      <section className="ch"><div className="wrap top">
        <div>
          <nav className="crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><i>/</i><span>Clinics</span><i>/</i><span>Sector 53</span></nav>
          <Eb>South Point Mall · DLF Phase 5</Eb>
          <h1 className="d h1m">Dental Krafts, <em>Sector 53</em></h1>
          <p className="sub">On the 2nd floor of South Point Mall, DLF Phase 5. Specialist dental care, five minutes off Golf Course Road.</p>
        </div>
        <aside className="info">
          <OpenStatus clinicId={c.id} className="live" />
          <address>{c.address}</address>
          <ClinicWeek clinicId={c.id} />
          <div className="row" style={{ margin: 0 }}>
            <a className="btn btn-p btn-sm" href={c.phoneHref}><Icon name="phone-call" cls="ic ic-sm" /> Call {c.phone}</a>
            <a className="btn btn-s btn-sm" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`} target="_blank" rel="noopener"><Icon name="map-pin" cls="ic ic-sm" /> Directions</a>
          </div>
        </aside>
      </div>
      <div className="wrap mos" aria-label="Clinic photos">
        <figure className="ph"><Image sizes="(max-width: 768px) 100vw, 760px" src={MOS[0][0]} width={1400} height={900} alt={MOS[0][1]} fetchPriority="high" /><figcaption>{MOS[0][1]}</figcaption></figure>
        {MOS.slice(1).map(([src, alt]) => <figure className="ph" key={src}><Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" src={src} width={1200} height={800} alt={alt} /><figcaption>{alt}</figcaption></figure>)}
      </div></section>

      {/* 2 · Getting here + drive times */}
      <section className="sec"><div className="wrap gx">
        <div>
          <Eb>Getting here</Eb>
          <h2 className="d h2" style={{ margin: "22px 0 18px" }}>Take the lift to the <em>2nd</em> floor.</h2>
          <div className="prose">
            <p>South Point Mall is on Golf Course Road in DLF Phase 5, Sector 53. Take the lift to the 2nd floor — we're at DSP-211, above the main entrance.</p>
            <p>Parking and which gate to use: to be confirmed by the clinic.</p>
          </div>
        </div>
        <div className="drive">
          {c.driveTimes.map(([from, min]) => {
            const m = min.match(/^(\d+)\s*min/);
            return <div key={from}><span>{from}</span><b>{m ? m[1] : min}<small>min</small></b></div>;
          })}
        </div>
      </div></section>

      {/* 3 · Your dentists */}
      <section className="sec tint-mist bt"><div className="wrap">
        <div className="sh">
          <Eb>Your dentists here</Eb>
          <h2 className="d h2">Both specialists consult <em>here</em>.</h2>
          <p className="lead">Call to check who is in today.</p>
        </div>
        <div className="dm">
          {doctors.map((doc) => (
            <Link key={doc.id} href={doc.slug}>
              <Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" src={doc.portrait} width={1055} height={1318} alt={doc.name} />
              <span><small>{doc.role}</small><b>{doc.name}</b><span>{doc.slug.includes("ruchi") ? "MDS Prosthodontics, AIIMS New Delhi" : "MDS, PGIMER Chandigarh, silver medal"}</span></span>
            </Link>
          ))}
        </div>
      </div></section>

      {/* 4 · Treatments */}
      <section className="sec"><div className="wrap">
        <div className="sh">
          <Eb>Treatments at this clinic</Eb>
          <h2 className="d h2">Every treatment, under one <em>roof</em>.</h2>
          <Link className="tl" href="/treatments" style={{ justifySelf: "end" }}>All 21 treatments <Icon name="arrow-right" cls="ic ic-sm" /></Link>
        </div>
        <div className="tg2 tnum">
          {TOP8.map(([name, who, href]) => <Link key={href} href={href}><b>{name}</b><span>{who}</span></Link>)}
        </div>
      </div></section>

      {/* 5 · Areas + quote */}
      <section className="sec tint-white bt"><div className="wrap gx">
        <p className="areas">We see patients from <span>DLF Phase 5, Sectors 42, 43, 53, 54 and 55, Sushant Lok 1, Nirvana Country, Ardee City and the Golf Course Road residences.</span></p>
        <blockquote className="bq">“{QUOTE.quote}”<cite><b>{QUOTE.name}</b> · {QUOTE.treatment} · verified on Practo</cite></blockquote>
      </div></section>

      {/* 6 · Booking */}
      <section className="sec tint-sage" id="book"><div className="wrap">
        <div className="sh">
          <Eb>Book at Sector 53</Eb>
          <h2 className="d h2">Tell us in one <em>sentence</em>.</h2>
          <p className="lead">We'll call you back within working hours to confirm a time.</p>
        </div>
        <BookingForm presetClinic={c.name} />
      </div></section>

      <JsonLd data={LD} />
    </>
  );
}
