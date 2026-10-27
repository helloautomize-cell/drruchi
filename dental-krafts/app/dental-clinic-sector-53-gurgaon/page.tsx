import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { BookingForm } from "@/components/booking-form";
import { clinics } from "@/content/clinics";
import { doctors } from "@/content/doctors";
import { reviewById } from "@/content/reviews";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Dentist in Sector 53, Golf Course Road | South Point Mall | Dental Krafts",
  description:
    "Dental Krafts Sector 53, DSP-211, 2nd Floor, South Point Mall, Golf Course Road. AIIMS & PGIMER dentists. Open 10 am–8 pm, closed Wed. Call +91 98104 48720.",
  alternates: { canonical: "/dental-clinic-sector-53-gurgaon" },
};

const c = clinics[0];

const TOP8: [string, string, string, string][] = [
  ["tooth-implant", "Dental implants", "from ₹30,000", "/dental-implants"],
  ["tooth-root", "Root canal treatment", "from ₹6,000", "/root-canal-treatment"],
  ["tooth", "Crowns and bridges", "from ₹12,000", "/dental-crowns"],
  ["first-tooth", "Kids' dentistry", "₹500 consultation", "/pediatric-dentist"],
  ["sparkles", "Teeth whitening", "from ₹10,000", "/teeth-whitening"],
  ["teeth", "Dentures", "from ₹5,000", "/dentures"],
  ["tooth-check", "Teeth cleaning", "quoted at visit", "/teeth-cleaning"],
  ["tooth-alert", "Emergency care", "call us", "/emergency-dentist"],
];

const GALLERY = [
  ["/images/clinic/reception-lounge-wide.webp", "The Dental Krafts reception lounge"],
  ["/images/clinic/storefront-signage-reception.webp", "Dental Krafts storefront and reception"],
  ["/images/clinic/reception-lounge.webp", "Reception with the logo wall"],
  ["/images/doctors/dk-doctors-performing-procedure-1.webp", "Both dentists during a procedure"],
  ["/images/clinic/storefront-night-signage.webp", "Clinic signage at night"],
] as const;

const LD = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "LocalBusiness"],
  name: "Dental Krafts — Sector 53, Golf Course Road",
  url: `${site.domain}${c.slug}`,
  image: `${site.domain}${c.image}`,
  telephone: c.phone,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "DSP-211, 2nd Floor, South Point Mall, Golf Course Road, DLF Phase 5",
    addressLocality: "Sector 53, Gurugram",
    addressRegion: "Haryana",
    postalCode: "122002",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 28.448, longitude: 77.0991 },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`,
  openingHoursSpecification: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: d,
    opens: "10:00",
    closes: "20:00",
  })),
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: c.practoStories },
  sameAs: [site.practo, site.justdial],
};

export default function Sector53() {
  return (
    <>
      {/* Hero */}
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Clinics / Sector 53</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="map-pin" cls="ic ic-sm" /> South Point Mall · DLF Phase 5</span>
            <h1 className="d">Dental Krafts, <em>Sector 53</em></h1>
            <p className="sub">On the 2nd floor of South Point Mall, DLF Phase 5. Specialist dental care, five minutes off Golf Course Road.</p>
            <div className="info">
              <div><Icon name="map-pin" /><span><b>Address</b>{c.address}</span></div>
              <div><Icon name="clock" /><span><b>Hours</b>Mon, Tue, Thu–Sun · {c.hoursLabel}<br />Closed Wednesdays</span></div>
              <div><Icon name="phone-call" /><span><b>Phone</b><span className="tnum">{c.phone}</span></span></div>
              <div><Icon name="navigation" /><span><b>Status</b><OpenStatus clinicId={c.id} className="stat-live" /></span></div>
            </div>
            <div className="cta">
              <Link className="btn btn-w" href="#book">Book at Sector 53 <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
              <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a>
              <a className="btn btn-sm" style={{ background: "transparent", color: "var(--white)", boxShadow: "inset 0 0 0 1.5px rgba(255,251,245,.6)" }} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`} target="_blank" rel="noopener"><Icon name="map-route" cls="ic ic-sm" /> Directions</a>
            </div>
          </div>
          <div className="ph">
            <img src="/images/clinic/storefront-signage-reception.webp" alt="Dental Krafts Sector 53 storefront, South Point Mall" />
            <div className="glass fl f1"><span className="big tnum">5.0</span><span><b>Practo · Sector 53</b><small>{c.practoStories} patient stories</small></span></div>
          </div>
        </div>
      </div></section>

      {/* Getting here + dentists */}
      <section className="sp"><div className="wrap two" style={{ alignItems: "start" }}>
        <div>
          <span className="eyebrow">Getting here</span>
          <h2 className="d h2">Take the lift to the <em>2nd floor.</em></h2>
          <div className="prose">
            <p>South Point Mall is on Golf Course Road in DLF Phase 5, Sector 53. Take the lift to the 2nd floor — we're at DSP-211.</p>
            <p>Parking and which gate to use: to be confirmed by the clinic.</p>
          </div>
          <div className="drive">
            {c.driveTimes.map(([from, min]) => <span className="chip" key={from}>{from} <b>{min}</b></span>)}
          </div>
          <div className="map-embed">
            <iframe title="Map to Dental Krafts Sector 53" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&output=embed`} />
          </div>
        </div>
        <div>
          <span className="eyebrow">Your dentists here</span>
          <h2 className="d h2">Both specialists <em>consult here.</em></h2>
          <div className="docs2">
            {doctors.map((doc) => (
              <Link key={doc.id} href={doc.slug}>
                <img src={doc.portrait} alt={doc.name} loading="lazy" />
                <span><b>{doc.name}</b><span>{doc.role}</span></span>
              </Link>
            ))}
          </div>
          <p className="note">Call to check who is in today.</p>
        </div>
      </div></section>

      {/* Gallery */}
      <section className="sp p"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Inside the clinic</span><h2 className="d h2">Calm, clean and <em>easy to find.</em></h2></div></div>
        <div className="gal">
          {GALLERY.map(([src, alt]) => <img key={src} src={src} alt={alt} loading="lazy" />)}
        </div>
      </div></section>

      {/* Treatments + nearby */}
      <section className="sp"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Treatments at this clinic</span><h2 className="d h2">Every treatment, <em>under one roof.</em></h2></div><Link className="link" href="/treatments">All 21 treatments <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
        <div className="cards c4">
          {TOP8.map(([ic, name, price, href]) => (
            <Link className="cd" key={href} href={href}><span className="badge"><Icon name={ic} /></span><b>{name}</b><span>{price}</span></Link>
          ))}
        </div>
        <p className="lead" style={{ marginTop: 30, maxWidth: "none" }}>We see patients from DLF Phase 5, Sectors 42, 43, 53, 54 and 55, Sushant Lok 1, Nirvana Country, Ardee City and the Golf Course Road residences.</p>
      </div></section>

      {/* Reviews */}
      <section className="sp p"><div className="wrap">
        <div className="head"><div><span className="eyebrow">What patients say</span><h2 className="d h2">5.0 on Practo, <em>from this clinic.</em></h2></div><a className="link" href={site.practo} target="_blank" rel="noopener">Read on Practo <Icon name="arrow-up-right" cls="ic ic-sm" /></a></div>
        <div className="qs">
          {["rishav", "anushka", "dewesh"].map((id) => {
            const r = reviewById(id);
            return <blockquote key={id}><p>“{r.quote}”</p><cite>{r.name}<span>{r.treatment}</span></cite></blockquote>;
          })}
        </div>
      </div></section>

      {/* Booking */}
      <section className="bkB sec" id="book"><div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 28 }}><span className="eyebrow">Book at Sector 53</span><h2 className="d h2">Three <em>quick</em> steps.</h2></div>
        <BookingForm presetClinic={c.name} />
      </div></section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
    </>
  );
}
