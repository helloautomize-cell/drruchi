import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { CtaBand } from "@/components/bits";
import { Reveal } from "@/components/reveal";
import { doctors } from "@/content/doctors";
import { reviewById } from "@/content/reviews";

export const metadata: Metadata = {
  title: "Our Dentists | AIIMS & PGIMER Specialists | Dental Krafts Gurgaon",
  description:
    "Meet Dr Ruchi Goel, prosthodontist and implantologist (AIIMS), and Dr Parmod Gulia, pediatric dentist (PGIMER, silver medal). Book at Sector 53 or 57.",
  alternates: { canonical: "/our-dentists" },
};

const TOGETHER = [
  { icon: "first-tooth", title: "Children's care, prevention, root canals and fillings", text: "Dr Parmod Gulia — a specialist pediatric dentist (MDS, PGIMER Chandigarh)." },
  { icon: "tooth-implant", title: "Missing teeth, implants, dentures, crowns, smile design", text: "Dr Ruchi Goel — a prosthodontist (MDS, AIIMS New Delhi) who also leads full-mouth rehabilitation." },
  { icon: "family", title: "Complex cases, planned together", text: "Both doctors review your X-rays and plan together, so you get one treatment plan and one file — nobody refers you elsewhere." },
];

const bipin = reviewById("bipin");

export default function OurDentists() {
  return (
    <>
      {/* Hero */}
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Our dentists</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="family" cls="ic ic-sm" /> Our dentists</span>
            <h1 className="d">Meet your <em>dentists</em></h1>
            <p className="sub">Dental Krafts was started by two specialists who trained at India's top medical institutes and wanted a practice where the person who plans your treatment is the person who does it.</p>
            <div className="cta">
              <Link className="btn btn-w" href="/contact-us">Book with either dentist <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
            </div>
          </div>
          <div className="ph"><img src="/images/ai/doctors-duo.webp" alt="Dr Ruchi Goel and Dr Parmod Gulia" /></div>
        </div>
      </div></section>

      {/* Doctor cards */}
      <section className="dC sec"><div className="wrap">
        <Reveal><div className="head"><div><span className="eyebrow">Two specialists, one roof</span><h2 className="d h2">Led by an AIIMS <em>prosthodontist.</em></h2></div></div></Reveal>
        <div className="grid">
          <Reveal><article className="lead-c on-dark">
            <div className="ph"><img src="/images/ai/dr-ruchi-portrait.webp" alt="Dr Ruchi Goel, prosthodontist and implantologist" style={{ objectPosition: "52% 30%" }} loading="lazy" /></div>
            <div className="t">
              <span className="eyebrow">Founder · Prosthodontist</span><h3 className="d">Dr Ruchi Goel</h3>
              <p>Implants, dentures, crowns and full-mouth rehabilitation, planned end to end. You'll see every step and every cost before anything begins.</p>
              <div className="kv"><div><b>MDS, AIIMS</b>New Delhi, 2015</div><div><b>Rank 1</b>AIIMS entrance 2012</div><div><b>98%</b>Practo, 268 votes</div><div><b>19 years</b>in practice</div></div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "auto" }}>
                <Link className="btn btn-w" href="/contact-us?doctor=Dr%20Ruchi%20Goel">Book with Dr Ruchi</Link>
                <Link className="link" href="/dr-ruchi-goel">Full profile <Icon name="arrow-right" cls="ic ic-sm" /></Link>
              </div>
            </div>
          </article></Reveal>
          <div className="side">
            <Reveal delay={60}><article className="mini">
              <div className="ph"><img src="/images/ai/dr-parmod-portrait.webp" alt="Dr Parmod Gulia, pediatric dentist" loading="lazy" /></div>
              <div className="t"><span className="eyebrow">Pediatric dentist</span><h3 className="d">Dr Parmod Gulia</h3><span>MDS PGIMER Chandigarh, silver medal. Children, teens and whole families.</span>
                <Link className="link" href="/dr-parmod-gulia" style={{ alignSelf: "flex-start", marginTop: 6 }}>Meet Dr Parmod <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
            </article></Reveal>
            <Reveal delay={120}><div className="ask"><div className="avs"><img src="/images/ai/dr-ruchi-portrait.webp" alt="" /><img src="/images/ai/dr-parmod-portrait.webp" alt="" /></div><b>Not sure who to see?</b><span style={{ color: "var(--muted)", fontSize: "14.5px" }}>Book with either. They plan complex cases together, often in the same visit.</span><Link className="btn btn-w btn-sm" href="/contact-us" style={{ alignSelf: "flex-start" }}>Book a ₹500 visit</Link></div></Reveal>
          </div>
        </div>
      </div></section>

      {/* How we work together */}
      <section className="sp p"><div className="wrap">
        <div className="head"><div><span className="eyebrow">How we work together</span><h2 className="d h2">One plan, one file, <em>one team.</em></h2></div></div>
        <div className="cards">
          {TOGETHER.map((t) => (
            <div className="cd" key={t.title}><span className="badge"><Icon name={t.icon} /></span><b>{t.title}</b><span>{t.text}</span></div>
          ))}
        </div>
        <div className="qs" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
          <blockquote>
            <p>“{bipin.quote}”</p>
            <cite>{bipin.name}<span>{bipin.treatment} · {bipin.source}</span></cite>
          </blockquote>
        </div>
      </div></section>

      {/* CTA */}
      <section className="sp" style={{ paddingTop: 0 }}><div className="wrap">
        <CtaBand title="Book with" em="either dentist." text="A ₹500 consultation with a full examination. You'll leave with a plan and a written estimate." />
      </div></section>
    </>
  );
}
