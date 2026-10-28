import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { OpenStatus, ClinicWeek } from "@/components/open-status";
import { BookingForm } from "@/components/booking-form";
import { Eb } from "@/components/bits";
import { clinics } from "@/content/clinics";
import { doctors } from "@/content/doctors";
import { reviewById } from "@/content/reviews";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Dentist in Sector 57, Sushant Lok 2 | Bestech Central Square | Dental Krafts",
  description: "Dental Krafts Sector 57, UG-12, 1st Floor, Bestech Central Square Mall, opp. Hong Kong Bazaar. Open 10 am–8:30 pm, closed Wed. Call +91 95992 52018.",
  alternates: { canonical: "/dental-clinic-sector-57-gurgaon" },
};

const c = clinics[1];
const QUOTE = reviewById("bijay");

const TOP8: [string, string, string][] = [
  ["Kids' dentistry", "₹500 consultation", "/pediatric-dentist"],
  ["Root canal treatment", "from ₹6,000", "/root-canal-treatment"],
  ["Dental implants", "from ₹30,000", "/dental-implants"],
  ["Crowns and bridges", "from ₹12,000", "/dental-crowns"],
  ["Teeth whitening", "from ₹10,000", "/teeth-whitening"],
  ["Teeth cleaning", "quoted at visit", "/teeth-cleaning"],
  ["Braces and aligners", "quoted after exam", "/teeth-braces"],
  ["Emergency care", "call us", "/emergency-dentist"],
];

const MOS: [string, string][] = [
  ["/images/clinic/sector-57-operatory.webp", "The Sector 57 treatment room"],
  ["/images/clinic/kids-operatory-mural-clean.webp", "The children's room with its mural"],
  ["/images/doctors/dk-doctors-performing-procedure-2.webp", "Sterile instruments ready for treatment"],
];

const LD = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "LocalBusiness"],
  name: "Dental Krafts — Sector 57, Sushant Lok 2",
  url: `${site.domain}${c.slug}`,
  image: `${site.domain}${c.image}`,
  telephone: c.phone,
  priceRange: "₹₹",
  address: { "@type": "PostalAddress", streetAddress: "UG-12, 1st Floor, Bestech Central Square Mall, Opp. Hong Kong Bazaar Road, Block G, Sushant Lok 2", addressLocality: "Sector 57, Gurugram", addressRegion: "Haryana", postalCode: "122011", addressCountry: "IN" },
  geo: { "@type": "GeoCoordinates", latitude: 28.4216, longitude: 77.0904 },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`,
  openingHoursSpecification: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: d, opens: "10:00", closes: "20:30" })),
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: c.practoStories },
  sameAs: [site.practo, site.justdial],
};

export default function Sector57() {
  return (
    <>
      {/* 1 · Hero + info card */}
      <section className="ch"><div className="wrap top">
        <div>
          <nav className="crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><i>/</i><span>Clinics</span><i>/</i><span>Sector 57</span></nav>
          <Eb>Bestech Central Square · Sushant Lok 2</Eb>
          <h1 className="d h1m">Dental Krafts, <em>Sector 57</em></h1>
          <p className="sub">In Bestech Central Square Mall, opposite Hong Kong Bazaar. Our family clinic, with a dedicated children's treatment room.</p>
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
        <figure className="ph"><img src={MOS[0][0]} alt={MOS[0][1]} fetchPriority="high" /><figcaption>{MOS[0][1]}</figcaption></figure>
        {MOS.slice(1).map(([src, alt]) => <figure className="ph" key={src}><img loading="lazy" src={src} alt={alt} /><figcaption>{alt}</figcaption></figure>)}
      </div></section>

      {/* 2 · Getting here + drive times */}
      <section className="sec"><div className="wrap gx">
        <div>
          <Eb>Getting here</Eb>
          <h2 className="d h2" style={{ margin: "22px 0 18px" }}>Opposite <em>Hong Kong</em> Bazaar.</h2>
          <div className="prose">
            <p>Bestech Central Square is opposite Hong Kong Bazaar, near Kendriya Vihar, Sector 56. We're on the 1st floor, unit UG-12.</p>
            <p>Parking and which entrance to use: to be confirmed by the clinic.</p>
          </div>
        </div>
        <div className="drive">
          {c.driveTimes.map(([from, min]) => {
            const m = min.match(/^(\d+)\s*min/);
            return <div key={from}><span>{from}</span><b>{m ? m[1] : min}<small>min</small></b></div>;
          })}
        </div>
      </div></section>

      {/* 3 · Kids' room */}
      <section className="sec tint-peach"><div className="wrap gx">
        <div>
          <Eb>A clinic built for families</Eb>
          <h2 className="d h2" style={{ margin: "22px 0 18px" }}>A room of their own for the little <em>ones</em>.</h2>
          <div className="prose">
            <p>Sector 57 has twin treatment rooms, plus a children's room with its own murals and a kid-sized chair. Children get to look around and settle in before anyone picks up an instrument.</p>
            <p>Dr Parmod Gulia is a specialist pediatric dentist (MDS, PGIMER Chandigarh) — first visits, sealants, fluoride, fillings and, when it's the kindest option, treatment under general anaesthesia in a hospital setting.</p>
          </div>
          <Link className="btn btn-p" href="/contact-us?concern=My%20child%27s%20teeth" style={{ marginTop: 8 }}>Book your child's visit <Icon name="arrow-right" cls="ic ic-sm" /></Link>
        </div>
        <div className="ph" style={{ borderRadius: "var(--r-lg)", overflow: "hidden", aspectRatio: "4/3", background: "#262422" }}>
          <img loading="lazy" src="/images/clinic/kids-operatory-mural-clean.webp" alt="The children's treatment room with a painted mural" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div></section>

      {/* 4 · Your dentists */}
      <section className="sec tint-mist"><div className="wrap">
        <div className="sh">
          <Eb>Your dentists here</Eb>
          <h2 className="d h2">Both specialists consult <em>here</em>.</h2>
          <p className="lead">Call to check who is in today.</p>
        </div>
        <div className="dm">
          {doctors.map((doc) => (
            <Link key={doc.id} href={doc.slug}>
              <img loading="lazy" src={doc.portrait} alt={doc.name} />
              <span><small>{doc.role}</small><b>{doc.name}</b><span>{doc.slug.includes("ruchi") ? "MDS Prosthodontics, AIIMS New Delhi" : "MDS, PGIMER Chandigarh, silver medal"}</span></span>
            </Link>
          ))}
        </div>
      </div></section>

      {/* 5 · Treatments */}
      <section className="sec"><div className="wrap">
        <div className="sh">
          <Eb>Treatments at this clinic</Eb>
          <h2 className="d h2">Every treatment, under one <em>roof</em>.</h2>
          <Link className="tl" href="/treatments" style={{ justifySelf: "end" }}>All 21 treatments <Icon name="arrow-right" cls="ic ic-sm" /></Link>
        </div>
        <div className="tg2 tnum">
          {TOP8.map(([name, price, href]) => <Link key={href} href={href}><b>{name}</b><span>{price}</span></Link>)}
        </div>
      </div></section>

      {/* 6 · Areas + quote */}
      <section className="sec tint-white bt"><div className="wrap gx">
        <p className="areas">We see patients from <span>Sectors 45, 46, 47, 50, 56, 57 and 58, Sushant Lok 2 and 3, Golf Course Extension Road, South City 2 and Malibu Towne.</span></p>
        <blockquote className="bq">“{QUOTE.quote}”<cite><b>{QUOTE.name}</b> · {QUOTE.treatment} · verified on Practo</cite></blockquote>
      </div></section>

      {/* 7 · Booking */}
      <section className="sec tint-sage" id="book"><div className="wrap">
        <div className="sh">
          <Eb>Book at Sector 57</Eb>
          <h2 className="d h2">Tell us in one <em>sentence</em>.</h2>
          <p className="lead">We'll call you back within working hours to confirm a time.</p>
        </div>
        <BookingForm presetClinic={c.name} />
      </div></section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
    </>
  );
}
