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
  title: "Dentist in Sector 57, Sushant Lok 2 | Bestech Central Square | Dental Krafts",
  description:
    "Dental Krafts Sector 57, UG-12, 1st Floor, Bestech Central Square Mall, opp. Hong Kong Bazaar. Open 10 am–8:30 pm, closed Wed. Call +91 95992 52018.",
  alternates: { canonical: "/dental-clinic-sector-57-gurgaon" },
};

const c = clinics[1];

const TOP8: [string, string, string, string][] = [
  ["first-tooth", "Kids' dentistry", "₹500 consultation", "/pediatric-dentist"],
  ["tooth-root", "Root canal treatment", "from ₹6,000", "/root-canal-treatment"],
  ["tooth-implant", "Dental implants", "from ₹30,000", "/dental-implants"],
  ["tooth", "Crowns and bridges", "from ₹12,000", "/dental-crowns"],
  ["sparkles", "Teeth whitening", "from ₹10,000", "/teeth-whitening"],
  ["tooth-check", "Teeth cleaning", "quoted at visit", "/teeth-cleaning"],
  ["braces-teeth", "Braces and aligners", "quoted after exam", "/teeth-braces"],
  ["tooth-alert", "Emergency care", "call us", "/emergency-dentist"],
];

const GALLERY = [
  ["/images/clinic/sector-57-operatory.webp", "The Sector 57 treatment room"],
  ["/images/clinic/kids-operatory-mural.webp", "The children's treatment room with a painted mural"],
  ["/images/kids/kids-real-patients-collage.webp", "Children smiling during their visit"],
  ["/images/doctors/dk-doctors-performing-procedure-2.webp", "Sterile instruments ready for treatment"],
  ["/images/clinic/reception-lounge-wide.webp", "The Dental Krafts reception lounge"],
] as const;

const LD = {
  "@context": "https://schema.org",
  "@type": ["Dentist", "LocalBusiness"],
  name: "Dental Krafts — Sector 57, Sushant Lok 2",
  url: `${site.domain}${c.slug}`,
  image: `${site.domain}${c.image}`,
  telephone: c.phone,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "UG-12, 1st Floor, Bestech Central Square Mall, Opp. Hong Kong Bazaar Road, Block G, Sushant Lok 2",
    addressLocality: "Sector 57, Gurugram",
    addressRegion: "Haryana",
    postalCode: "122011",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 28.4216, longitude: 77.0904 },
  hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`,
  openingHoursSpecification: ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: d,
    opens: "10:00",
    closes: "20:30",
  })),
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5.0", reviewCount: c.practoStories },
  sameAs: [site.practo, site.justdial],
};

export default function Sector57() {
  return (
    <>
      {/* Hero */}
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Clinics / Sector 57</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="map-pin" cls="ic ic-sm" /> Bestech Central Square · Sushant Lok 2</span>
            <h1 className="d">Dental Krafts, <em>Sector 57</em></h1>
            <p className="sub">In Bestech Central Square Mall, opposite Hong Kong Bazaar. Our family clinic, with a dedicated children's treatment room.</p>
            <div className="info">
              <div><Icon name="map-pin" /><span><b>Address</b>{c.address}</span></div>
              <div><Icon name="clock" /><span><b>Hours</b>Mon, Tue, Thu–Sun · {c.hoursLabel}<br />Closed Wednesdays</span></div>
              <div><Icon name="phone-call" /><span><b>Phone</b><span className="tnum">{c.phone}</span></span></div>
              <div><Icon name="navigation" /><span><b>Status</b><OpenStatus clinicId={c.id} className="stat-live" /></span></div>
            </div>
            <div className="cta">
              <Link className="btn btn-w" href="#book">Book at Sector 57 <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
              <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a>
              <a className="btn btn-sm" style={{ background: "transparent", color: "var(--white)", boxShadow: "inset 0 0 0 1.5px rgba(255,251,245,.6)" }} href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`} target="_blank" rel="noopener"><Icon name="map-route" cls="ic ic-sm" /> Directions</a>
            </div>
          </div>
          <div className="ph">
            <img src={c.image} alt={c.imageAlt} />
            <div className="glass fl f1"><span className="big tnum">5.0</span><span><b>Practo · Sector 57</b><small>{c.practoStories} patient stories</small></span></div>
          </div>
        </div>
      </div></section>

      {/* Getting here + dentists */}
      <section className="sp"><div className="wrap two" style={{ alignItems: "start" }}>
        <div>
          <span className="eyebrow">Getting here</span>
          <h2 className="d h2">Opposite <em>Hong Kong Bazaar.</em></h2>
          <div className="prose">
            <p>Bestech Central Square is opposite Hong Kong Bazaar, near Kendriya Vihar, Sector 56. We're on the 1st floor, unit UG-12.</p>
            <p>Parking and which entrance to use: to be confirmed by the clinic.</p>
          </div>
          <div className="drive">
            {c.driveTimes.map(([from, min]) => <span className="chip" key={from}>{from} <b>{min}</b></span>)}
          </div>
          <div className="map-embed">
            <iframe title="Map to Dental Krafts Sector 57" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(c.mapQuery)}&output=embed`} />
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

      {/* A clinic built for families */}
      <section className="sp p"><div className="wrap two">
        <div>
          <span className="eyebrow">A clinic built for families</span>
          <h2 className="d h2">A room of their own <em>for the little ones.</em></h2>
          <div className="prose">
            <p>Sector 57 has twin treatment rooms, plus a children's room with its own murals and a kid-sized chair. Children get to look around and settle in before anyone picks up an instrument.</p>
            <p>Dr Parmod Gulia is a specialist pediatric dentist (MDS, PGIMER Chandigarh) — first visits, sealants, fluoride, fillings and, when it's the kindest option, treatment under general anaesthesia in a hospital setting.</p>
          </div>
          <Link className="btn btn-p" href="/contact-us?concern=My%20child's%20teeth" style={{ marginTop: 8 }}>Book your child's visit <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
        </div>
        <div className="ph"><img src="/images/clinic/kids-operatory-mural.webp" alt="The children's treatment room with a painted mural" loading="lazy" /></div>
      </div></section>

      {/* Gallery */}
      <section className="sp"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Inside the clinic</span><h2 className="d h2">Mint walls, <em>gentle</em> pace.</h2></div></div>
        <div className="gal">
          {GALLERY.map(([src, alt]) => <img key={src} src={src} alt={alt} loading="lazy" />)}
        </div>
      </div></section>

      {/* Treatments + nearby */}
      <section className="sp p"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Treatments at this clinic</span><h2 className="d h2">Every treatment, <em>under one roof.</em></h2></div><Link className="link" href="/treatments">All 21 treatments <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
        <div className="cards c4">
          {TOP8.map(([ic, name, price, href]) => (
            <Link className="cd" key={href} href={href}><span className="badge"><Icon name={ic} /></span><b>{name}</b><span>{price}</span></Link>
          ))}
        </div>
        <p className="lead" style={{ marginTop: 30, maxWidth: "none" }}>We see patients from Sectors 45, 46, 47, 50, 56, 57 and 58, Sushant Lok 2 and 3, Golf Course Extension Road, South City 2 and Malibu Towne.</p>
      </div></section>

      {/* Reviews */}
      <section className="sp"><div className="wrap">
        <div className="head"><div><span className="eyebrow">What patients say</span><h2 className="d h2">5.0 on Practo across <em>933 stories.</em></h2></div><a className="link" href={site.practo} target="_blank" rel="noopener">Read on Practo <Icon name="arrow-up-right" cls="ic ic-sm" /></a></div>
        <div className="qs">
          {["gaparent", "bijay", "decade"].map((id) => {
            const r = reviewById(id);
            return <blockquote key={id}><p>“{r.quote}”</p><cite>{r.name}<span>{r.treatment}</span></cite></blockquote>;
          })}
        </div>
      </div></section>

      {/* Booking */}
      <section className="bkB sec" id="book"><div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 28 }}><span className="eyebrow">Book at Sector 57</span><h2 className="d h2">Three <em>quick</em> steps.</h2></div>
        <BookingForm presetClinic={c.name} />
      </div></section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
    </>
  );
}
