import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { BaSlider } from "@/components/ba-slider";
import { QA, CtaBand } from "@/components/bits";
import { doctorById } from "@/content/doctors";
import { clinics } from "@/content/clinics";
import { reviewById } from "@/content/reviews";
import { caseByFile } from "@/content/results";
import { site } from "@/content/site";
import { ic } from "@/lib/inner";

export const metadata: Metadata = {
  title: "Dr Parmod Gulia | Pediatric Dentist, PGIMER | Dental Krafts Gurgaon",
  description:
    "Dr Parmod Gulia, BDS, MDS (PGIMER Chandigarh), silver medallist. Kids' dentistry, special-needs care, root canals and family dentistry in Gurgaon.",
  alternates: { canonical: "/dr-parmod-gulia" },
};

const d = doctorById("parmod");

const CASES = [
  "ba-21-chipped-tooth-repair",
  "ba-07-gap-filling",
  "ba-06-teeth-cleaning",
  "ba-18-deep-cleaning-stain-removal",
  "ba-19-stain-removal",
]
  .map(caseByFile)
  .filter((c) => c && c.consent !== false);

const REVIEW_IDS = ["vrinda", "chandan", "decade", "subhash"];

const AWARDS = [
  ["awards/parmod-gulia-mds-degree-health-minister.webp", "Dr Parmod Gulia receives his MDS from the Union Health Minister"],
  ["awards/prime-impact-excellence-award.webp", "Business and Profession Excellence Award"],
  ["awards/clinic-celebrity-visit-king.webp", "Singer King visits Dental Krafts"],
] as const;

const PHYSICIAN_LD = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr Parmod Gulia",
  alternateName: "Pramod Gulia",
  jobTitle: "Pediatric & Preventive Dentist",
  image: `${site.domain}${d.portrait}`,
  url: `${site.domain}/dr-parmod-gulia`,
  identifier: "A-12323",
  medicalSpecialty: "Pediatric Dentistry",
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "PGIMER Chandigarh" },
    { "@type": "CollegeOrUniversity", name: "Govt Dental College, Rohtak" },
  ],
  memberOf: [
    { "@type": "Organization", name: "Indian Dental Association" },
    { "@type": "Organization", name: "Indian Society of Pedodontics and Preventive Dentistry" },
  ],
  award: ["Silver Medal, MDS, PGIMER Chandigarh 2013", "Best Paper Presentation, ISPPD Conference 2014"],
  worksFor: clinics.map((c) => ({
    "@type": "Dentist",
    name: `Dental Krafts — ${c.name}`,
    address: c.address,
    telephone: c.phone,
  })),
};

export default function DrParmodGulia() {
  return (
    <>
      {/* 1 · Hero */}
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / <Link href="/our-dentists">Our dentists</Link> / Dr Parmod Gulia</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="award" cls="ic ic-sm" /> {d.eyebrow}</span>
            <h1 className="d">Dr Parmod <em>Gulia</em></h1>
            <p className="sub">{d.degree}</p>
            <div className="chips">
              {d.chips.map((c) => <span className="chip" key={c.label}><Icon name={ic(c.icon)} cls="ic ic-sm" /> {c.label}</span>)}
            </div>
            <div className="cta">
              <Link className="btn btn-w" href="/contact-us?doctor=Dr%20Parmod%20Gulia">Book with Dr Parmod <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
              <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> Chat on WhatsApp</a>
            </div>
          </div>
          <div className="ph">
            <img src={d.portrait} alt="Dr Parmod Gulia, pediatric dentist" style={{ objectPosition: "50% 25%" }} />
            <div className="glass fl f1"><span className="big tnum">95%</span><span><b>Practo patient votes</b><small>740 patients</small></span></div>
          </div>
        </div>
      </div></section>

      {/* 2 · About */}
      <section className="sp"><div className="wrap two">
        <div>
          <span className="eyebrow">About Dr Parmod</span>
          <h2 className="d h2">The dentist families keep <em>coming back</em> to.</h2>
          <div className="prose">
            <p>Dr Parmod Gulia is a specialist in pediatric and preventive dentistry. He treats children from their first tooth through their teens, including children with special needs, and when it's the kindest option, he treats children under general anaesthesia so that a lot of work can be done safely in one visit.</p>
            <p>He also looks after adults, with deep experience in root canal treatment, fillings and wisdom teeth. Many of his patients are whole families who have stayed with him for six, eight or more than ten years.</p>
            <p>He trained at PGIMER Chandigarh, where he was awarded the silver medal for his MDS, and worked as a Senior Research Fellow at AIIMS New Delhi. His paper won Best Paper at the Indian Society of Pedodontics and Preventive Dentistry conference in 2014.</p>
          </div>
        </div>
        <div className="ph"><img src="/images/ai/dr-parmod-at-work.webp" alt="Dr Parmod Gulia in the clinic" style={{ objectPosition: "50% 35%" }} loading="lazy" /></div>
      </div></section>

      {/* 3 · Credentials */}
      <section className="sp p"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Credentials</span><h2 className="d h2">A <em>specialist</em> in children's dentistry.</h2></div></div>
        <div className="tl">
          {d.timeline.map((t) => (
            <div key={t.year + t.text} className={t.key ? "k" : undefined}><b className="tnum">{t.year}</b><span>{t.text}</span></div>
          ))}
        </div>
        <p className="note">Registration A-12323, Delhi State Dental Council (2015).</p>
      </div></section>

      {/* 4 · What he treats */}
      <section className="sp"><div className="wrap">
        <div className="head"><div><span className="eyebrow">What Dr Parmod treats</span><h2 className="d h2">Children, teens <em>and</em> grown-ups.</h2></div></div>
        <div className="cards c4">
          {d.treats.map((t) =>
            t.href ? (
              <Link className="cd" key={t.title} href={t.href}><span className="badge"><Icon name={ic(t.icon)} /></span><b>{t.title}</b><span>{t.sub}</span></Link>
            ) : (
              <div className="cd" key={t.title}><span className="badge"><Icon name={ic(t.icon)} /></span><b>{t.title}</b><span>{t.sub}</span></div>
            )
          )}
        </div>
      </div></section>

      {/* 5 · Cases */}
      <section className="sp b"><div className="wrap">
        <div className="head"><div><span className="eyebrow">His cases</span><h2 className="d h2">Gentle work, <em>natural</em> results.</h2></div><Link className="link" href="/gallery">See all results <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
        <div className="res3">
          {CASES.map((c) => (
            <figure key={c!.file}>
              <BaSlider file={c!.file} />
              <figcaption>{c!.cat}<span>{c!.caption}</span></figcaption>
            </figure>
          ))}
        </div>
        <p className="note">Shared with patient consent. Individual results vary.</p>
      </div></section>

      {/* 6 · With children */}
      <section className="sp"><div className="wrap two">
        <div className="ph"><img src="/images/clinic/kids-operatory-mural.webp" alt="The children's treatment room with a painted mural" loading="lazy" /></div>
        <div>
          <span className="eyebrow">Working with children</span>
          <h2 className="d h2">First visits that <em>don't</em> feel like visits.</h2>
          <div className="prose">
            <p>A child's first experience at the dentist shapes how they feel about it for years. The Sector 57 clinic has a children's treatment room of its own, and Dr Parmod's appointments are unhurried — children look around, ask questions, and only then sit in the chair.</p>
            <p>For very young or anxious children, or children with special needs who need a lot of treatment, it can be done under general anaesthesia in a hospital setting — all in one safe session.</p>
          </div>
        </div>
      </div>
      <div className="wrap" style={{ marginTop: 14 }}>
        <div className="gal" style={{ gridTemplateRows: "200px 200px", marginTop: 0 }}>
          <img src="/images/kids/kids-real-patients-collage.webp" alt="Children smiling during their visit" loading="lazy" />
          <img src="/images/awards/parmod-gulia-mds-degree-health-minister.webp" alt="Dr Parmod Gulia receives his MDS from the Union Health Minister" loading="lazy" />
          <img src="/images/doctors/dk-doctors-performing-procedure-1.webp" alt="Both dentists treating a patient together" loading="lazy" />
        </div>
      </div></section>

      {/* 7 · Recognition */}
      <section className="gA sec on-dark"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Recognition</span><h2 className="d h2" style={{ color: "var(--white)" }}>Medals, papers <em>and milestones.</em></h2></div></div>
        <div className="rail">
          {AWARDS.map(([src, cap]) => (
            <figure key={src}><div className="ph"><img src={`/images/${src}`} alt={cap} loading="lazy" /></div><figcaption>{cap}</figcaption></figure>
          ))}
        </div>
      </div></section>

      {/* 8 · Reviews */}
      <section className="sp p"><div className="wrap">
        <div className="head"><div><span className="eyebrow">What patients say</span><h2 className="d h2">"My whole family goes <em>to him."</em></h2></div><span className="chip"><Icon name="star" cls="ic ic-sm" /> 95% on Practo · 740 votes</span></div>
        <div className="qs">
          {REVIEW_IDS.map((id) => {
            const r = reviewById(id);
            return (
              <blockquote key={id}>
                <p>“{r.quote}”</p>
                {r.avatar ? (
                  <span className="who"><img src={r.avatar} alt="" loading="lazy" /><cite>{r.name}<span>{r.treatment}</span></cite></span>
                ) : (
                  <cite>{r.name}<span>{r.treatment}</span></cite>
                )}
              </blockquote>
            );
          })}
        </div>
      </div></section>

      {/* 9 · Where to see him + FAQ */}
      <section className="sp"><div className="wrap fw">
        <div>
          <span className="eyebrow">Where to see Dr Parmod</span>
          <h2 className="d h2">Both clinics, <em>on set days.</em></h2>
          <p className="lead">Call to confirm which clinic Dr Parmod is at today.</p>
          {clinics.map((c) => (
            <Link className="mini-c" key={c.id} href={c.slug}>
              <img src={c.image} alt={c.imageAlt} loading="lazy" />
              <span><b>{c.name}</b><span className="tnum">{c.phone} · {c.hoursLabel}</span></span>
            </Link>
          ))}
        </div>
        <div>{d.faqs.map((f) => <QA key={f.q} q={f.q} a={f.a} />)}</div>
      </div></section>

      {/* 10 · CTA */}
      <section className="sp" style={{ paddingTop: 0 }}><div className="wrap">
        <CtaBand title="Book with" em="Dr Parmod." text="A ₹500 consultation for your child — or for you. No pressure to start treatment that day." book="Book with Dr Parmod" />
      </div></section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PHYSICIAN_LD) }} />
    </>
  );
}
