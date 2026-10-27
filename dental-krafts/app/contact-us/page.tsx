import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { BookingForm } from "@/components/booking-form";
import { clinics } from "@/content/clinics";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a Visit | Dental Krafts Gurgaon | Sector 53 & 57",
  description:
    "Book a ₹500 consultation at Dental Krafts, Gurgaon. Clinics in Sector 53 (South Point Mall) and Sector 57 (Bestech Central Square). Call or WhatsApp.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactUs() {
  return (
    <>
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Book a visit</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="calendar-check" cls="ic ic-sm" /> Book a visit</span>
            <h1 className="d">Book a <em>visit</em></h1>
            <p className="sub">Choose a clinic and a time that suits you. We'll call to confirm. For pain or swelling, call the nearest clinic instead of filling the form.</p>
            <div className="chips">
              {clinics.map((c) => (
                <a className="chip" key={c.id} href={c.phoneHref}><Icon name="phone-call" cls="ic ic-sm" /> {c.short}: {c.phone}</a>
              ))}
              <a className="chip" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp us</a>
            </div>
          </div>
          <div className="ph"><img src="/images/clinic/reception-lounge-wide.webp" alt="The Dental Krafts reception lounge" /></div>
        </div>
      </div></section>

      {/* Booking form */}
      <section className="bkB sec"><div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 28 }}><span className="eyebrow">The form</span><h2 className="d h2">Three <em>quick</em> steps.</h2></div>
        <BookingForm />
      </div></section>

      {/* Clinic cards */}
      <section className="clA sec" style={{ background: "var(--blush)" }}><div className="wrap">
        <div className="head"><div><span className="eyebrow">Or visit us</span><h2 className="d h2">Two clinics. <em>Pick the closer one.</em></h2></div></div>
        <div className="grid">
          {clinics.map((c) => (
            <article className="cl" key={c.id}>
              <div className="ph"><img src={c.image} alt={c.imageAlt} loading="lazy" /><span className="glass st"><OpenStatus clinicId={c.id} className="stat-live" /></span></div>
              <div className="in">
                <h3 className="d">{c.name}</h3>
                <div className="ad"><Icon name="map-pin" /><span>{c.address}</span></div>
                <div className="ad"><Icon name="phone-call" /><span className="tnum">{c.phone}</span></div>
                <div className="ad"><Icon name="clock" /><span>{c.hoursLabel} · closed Wednesdays</span></div>
                <div className="near">{c.nearby.map((n) => <span key={n}>{n}</span>)}</div>
                <div className="acts">
                  <a className="btn btn-p btn-sm" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`} target="_blank" rel="noopener"><Icon name="navigation" cls="ic ic-sm" /> Directions</a>
                  <a className="btn btn-s btn-sm" href={c.phoneHref}><Icon name="phone-call" cls="ic ic-sm" /> Call {c.short}</a>
                  <Link className="btn btn-s btn-sm" href={c.slug}><Icon name="arrow-right" cls="ic ic-sm" /> Clinic page</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div></section>

      {/* Email + hours */}
      <section className="sp"><div className="wrap two" style={{ alignItems: "start" }}>
        <div>
          <span className="eyebrow">Other ways to reach us</span>
          <h2 className="d h2">Email, WhatsApp <em>or a call.</em></h2>
          <div className="prose">
            <p>Email us at <a href={`mailto:${site.email}`}>{site.email}</a> — please don't include sensitive medical details in an email or form.</p>
            <p>For pain or swelling, call the nearest clinic. During working hours we try to see urgent cases the same day.</p>
          </div>
        </div>
        <div>
          <table className="cost"><tbody>
            <tr><td>Sector 53 · Golf Course Road</td><td className="tnum">10 am – 8 pm</td></tr>
            <tr><td>Sector 57 · Sushant Lok 2</td><td className="tnum">10 am – 8:30 pm</td></tr>
            <tr className="t"><td>Wednesdays</td><td>Both clinics closed</td></tr>
          </tbody></table>
          <p className="note">Saturday and Sunday we're open as usual.</p>
        </div>
      </div></section>
    </>
  );
}
