import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { CtaBand } from "@/components/bits";
import { clinics } from "@/content/clinics";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Best Dental Clinic in Gurgaon? How to Choose | Dental Krafts",
  description:
    "Five questions worth asking any dental clinic in Gurgaon — and how Dental Krafts answers them. AIIMS & PGIMER specialists, 5.0 on Practo, two clinics.",
  alternates: { canonical: "/best-dental-clinic-gurgaon" },
};

const QUESTIONS = [
  { icon: "user-heart", q: "Who will actually treat me?", a: "At Dental Krafts, the founders: a prosthodontist (AIIMS New Delhi) and a pediatric dentist (PGIMER Chandigarh). No juniors, no referrals out." },
  { icon: "shield-check", q: "Are they registered specialists?", a: "Yes — Delhi State Dental Council registrations A-7387 and A-12323, and both hold an MDS." },
  { icon: "receipt", q: "Will I see the plan first?", a: "Yes. A written, itemised plan before treatment, with options from simplest to ideal." },
  { icon: "star", q: "What do other patients say?", a: "5.0 on Practo across 1,000+ patient stories, and 4.9 on Justdial." },
  { icon: "clock", q: "Is it convenient?", a: "Two clinics — Sector 53 and Sector 57 — open six days a week, 10 am till 8 or 8:30 pm. Closed Wednesdays." },
];

export default function BestInGurgaon() {
  return (
    <>
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Clinics / Gurgaon</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="map-pin" cls="ic ic-sm" /> Gurgaon · Sector 53 & Sector 57</span>
            <h1 className="d">Choosing a dental clinic <em>in Gurgaon</em></h1>
            <p className="sub">Five questions worth asking any clinic — and how we answer them.</p>
            <div className="cta">
              <Link className="btn btn-w" href="/contact-us">Book a visit <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
              <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a>
            </div>
          </div>
          <div className="ph"><img src="/images/ai/doctors-duo.webp" alt="Dr Ruchi Goel and Dr Parmod Gulia" /></div>
        </div>
      </div></section>

      <section className="sp"><div className="wrap">
        <div className="head"><div><span className="eyebrow">The five questions</span><h2 className="d h2">Ask before you <em>book.</em></h2></div></div>
        <div className="cards c5">
          {QUESTIONS.map((x) => (
            <div className="cd" key={x.q}><span className="badge"><Icon name={x.icon} /></span><b>{x.q}</b><span>{x.a}</span></div>
          ))}
        </div>
      </div></section>

      <section className="sp p"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Come see for yourself</span><h2 className="d h2">Two clinics, <em>six days</em> a week.</h2></div></div>
        <div className="docs2">
          {clinics.map((c) => (
            <Link key={c.id} href={c.slug}>
              <img src={c.image} alt={c.imageAlt} loading="lazy" />
              <span><b>{c.name}</b><span>{c.shortAddress} · {c.phone}</span></span>
            </Link>
          ))}
        </div>
      </div></section>

      <section className="sp" style={{ paddingTop: 0 }}><div className="wrap">
        <CtaBand title="Judge us" em="in person." text="A consultation with a full examination. You'll see your options before anything begins." />
      </div></section>
    </>
  );
}
