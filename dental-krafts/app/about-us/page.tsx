import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Dental Krafts | Specialist Dental Practice in Gurgaon",
  description:
    "Dental Krafts was founded by two specialists — Dr Ruchi Goel (AIIMS) and Dr Parmod Gulia (PGIMER). Our story, our values and two clinics in Gurgaon.",
  alternates: { canonical: "/about-us" },
};

const BELIEVE = [
  { icon: "tooth-check", title: "Explain first", text: "You should understand your mouth as well as we do." },
  { icon: "shield-check", title: "Treat only what's needed", text: "If it can wait, or doesn't need doing, we'll say so." },
  { icon: "award", title: "Specialists for specialist work", text: "Implants by a prosthodontist. Children by a pediatric dentist." },
  { icon: "sterilizer", title: "Clean, always", text: "Sterilised, pouch-sealed instruments for every patient." },
  { icon: "family", title: "Stay with you", text: "One file, one team, for years." },
];

const MILESTONES = [
  ["2007", "First dental degrees for both founders"],
  ["2012", "Dr Ruchi tops the AIIMS MDS entrance examination"],
  ["2013", "Dr Parmod's silver medal at PGIMER Chandigarh"],
  ["2014", "Best Paper, ISPPD conference"],
  ["2023", "Research on occlusal splints published (IJPRD)"],
  ["2025", "National Achievers Award"],
  ["2026", "1,000+ patient stories on Practo"],
] as const;

const AWARDS = [
  ["awards/national-achievers-2025-gulshan-grover-1.webp", "National Achievers Award 2025, presented to Dr Ruchi Goel by Gulshan Grover"],
  ["awards/parmod-gulia-mds-degree-health-minister.webp", "Dr Parmod Gulia receives his MDS from the Union Health Minister"],
  ["awards/aiims-prosthodontics-celebration.webp", "A token of appreciation from the HOD, Division of Prosthodontics, AIIMS New Delhi"],
] as const;

export default function AboutUs() {
  return (
    <>
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / About us</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="heart" cls="ic ic-sm" /> About Dental Krafts</span>
            <h1 className="d">Two residents, <em>one idea.</em></h1>
            <p className="sub">A practice where specialists see you themselves, where you see your X-rays and your options before anything begins, and where children get a children's dentist.</p>
            <div className="cta">
              <Link className="btn btn-w" href="/our-dentists">Meet the dentists <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
            </div>
          </div>
          <div className="ph"><img src="/images/ai/doctors-duo.webp" alt="Dr Ruchi Goel and Dr Parmod Gulia" /></div>
        </div>
      </div></section>

      {/* Story */}
      <section className="sp"><div className="wrap two">
        <div>
          <span className="eyebrow">Our story</span>
          <h2 className="d h2">From hospital corridors <em>to Gurgaon.</em></h2>
          <div className="prose">
            <p>Dr Ruchi Goel and Dr Parmod Gulia met as young dentists in the corridors of India's top medical institutes: PGIMER Chandigarh, PGIMS Rohtak and AIIMS New Delhi. They spent years in hospital clinics where the most complex cases came, learning from teachers who explained everything to patients before touching a tooth.</p>
            <p>They brought that way of working to Gurgaon and started Dental Krafts: a practice where specialists see you themselves, where you see your X-rays and your options before anything begins, and where children get a children's dentist.</p>
            <p>Today Dental Krafts has two clinics, on Golf Course Road and in Sushant Lok 2. More than 1,000 patients have written about us on Practo, and many families have been coming for over a decade.</p>
          </div>
        </div>
        <div className="ph"><img src="/images/clinic/reception-lounge-wide.webp" alt="The Dental Krafts reception lounge" loading="lazy" /></div>
      </div></section>

      {/* Values */}
      <section className="sp p"><div className="wrap">
        <div className="head"><div><span className="eyebrow">What we believe</span><h2 className="d h2">Five things we <em>won't</em> compromise.</h2></div></div>
        <div className="cards c5">
          {BELIEVE.map((b) => <div className="cd" key={b.title}><span className="badge"><Icon name={b.icon} /></span><b>{b.title}</b><span>{b.text}</span></div>)}
        </div>
      </div></section>

      {/* Milestones */}
      <section className="sp"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Milestones</span><h2 className="d h2">The road <em>so far.</em></h2></div></div>
        <div className="tl">
          {MILESTONES.map(([y, t]) => <div key={y}><b className="tnum">{y}</b><span>{t}</span></div>)}
        </div>
      </div></section>

      {/* Recognition */}
      <section className="sec tint-white bt"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Recognition</span><h2 className="d h2">Recognised by peers <em>and the profession.</em></h2></div></div>
        <div className="rail">
          {AWARDS.map(([src, cap]) => (
            <figure key={src}><div className="ph"><img src={`/images/${src}`} alt={cap} loading="lazy" /></div><figcaption>{cap}</figcaption></figure>
          ))}
        </div>
      </div></section>

      {/* CTA */}
      <section className="sp"><div className="wrap">
        <div className="band2">
          <div><h2 className="d">Meet the <em>dentists.</em></h2><p>Prosthodontics and pediatric dentistry, under one roof — the people who plan your treatment are the people who do it.</p></div>
          <div className="cta">
            <Link className="btn btn-w" href="/our-dentists">Meet the dentists <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
            <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a>
          </div>
        </div>
      </div></section>
    </>
  );
}
