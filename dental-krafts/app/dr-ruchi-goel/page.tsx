import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { BaSlider } from "@/components/ba-slider";
import { ReelCard } from "@/components/media";
import { QA, CtaBand } from "@/components/bits";
import { Reveal } from "@/components/reveal";
import { doctorById } from "@/content/doctors";
import { clinics } from "@/content/clinics";
import { reviewById } from "@/content/reviews";
import { caseByFile } from "@/content/results";
import { site } from "@/content/site";
import { emLast, ic } from "@/lib/inner";

export const metadata: Metadata = {
  title: "Dr Ruchi Goel | Prosthodontist & Implantologist, AIIMS | Gurgaon",
  description:
    "Dr Ruchi Goel, BDS, MDS (AIIMS New Delhi), AIIMS MDS entrance topper. Dental implants, dentures, crowns, smile design and full-mouth rehab at Dental Krafts, Gurgaon.",
  alternates: { canonical: "/dr-ruchi-goel" },
};

const d = doctorById("ruchi");

const REELS = [
  { file: "reel-01-dr-ruchi-explains.mp4", title: "The most common dental problem in the world" },
  { file: "reel-02-dr-ruchi-explains.mp4", title: "A minute with Dr Ruchi" },
  { file: "reel-03-dr-ruchi-explains.mp4", title: "Are you ignoring this early sign?" },
  { file: "reel-04-dr-ruchi-explains.mp4", title: "Dental myths, busted" },
  { file: "reel-06-dr-ruchi-explains.mp4", title: "Top 5 habits for healthy teeth" },
];

const CASES = [
  "ba-13-smile-makeover",
  "ba-12-smile-makeover",
  "ba-16-crowns",
  "ba-22-full-mouth-rehabilitation",
  "ba-24-full-mouth-rehabilitation",
  "ba-29-teeth-implant",
]
  .map(caseByFile)
  .filter((c) => c && c.consent !== false);

const AWARDS = [
  ["awards/national-achievers-2025-gulshan-grover-1.webp", "National Achievers Award 2025, presented to Dr Ruchi Goel by Gulshan Grover"],
  ["awards/aiims-prosthodontics-celebration.webp", "A token of appreciation from the HOD, Division of Prosthodontics, AIIMS New Delhi"],
  ["awards/national-achievers-2025-mahima-chaudhry.webp", "With Mahima Chaudhry at the National Achievers Award 2025"],
  ["awards/prime-impact-excellence-award.webp", "Business and Profession Excellence Award"],
  ["awards/clinic-celebrity-visit-king.webp", "Singer King visits Dental Krafts"],
] as const;

const PHYSICIAN_LD = {
  "@context": "https://schema.org",
  "@type": "Physician",
  name: "Dr Ruchi Goel",
  jobTitle: "Prosthodontist & Implantologist",
  image: `${site.domain}${d.portrait}`,
  url: `${site.domain}/dr-ruchi-goel`,
  identifier: "A-7387",
  medicalSpecialty: "Prosthodontics",
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "All India Institute of Medical Sciences, New Delhi" },
    { "@type": "CollegeOrUniversity", name: "D.A.V. Centenary Dental College, Yamuna Nagar" },
  ],
  memberOf: [
    { "@type": "Organization", name: "Indian Dental Association" },
    { "@type": "Organization", name: "Indian Prosthodontic Society" },
  ],
  award: "National Achievers Award 2025",
  worksFor: clinics.map((c) => ({
    "@type": "Dentist",
    name: `Dental Krafts — ${c.name}`,
    address: c.address,
    telephone: c.phone,
  })),
  sameAs: ["https://www.practo.com/gurgaon/doctor/dr-ruchi-goel-dentist"],
};

export default function DrRuchiGoel() {
  return (
    <>
      {/* 1 · Hero */}
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / <Link href="/our-dentists">Our dentists</Link> / Dr Ruchi Goel</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="award" cls="ic ic-sm" /> {d.eyebrow}</span>
            <h1 className="d">Dr Ruchi <em>Goel</em></h1>
            <p className="sub">{d.degree}</p>
            <div className="chips">
              {d.chips.map((c) => <span className="chip" key={c.label}><Icon name={ic(c.icon)} cls="ic ic-sm" /> {c.label}</span>)}
            </div>
            <div className="cta">
              <Link className="btn btn-w" href="/contact-us?doctor=Dr%20Ruchi%20Goel">Book with Dr Ruchi <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
              <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> Chat on WhatsApp</a>
            </div>
          </div>
          <div className="ph">
            <img src={d.portrait} alt="Dr Ruchi Goel, prosthodontist and implantologist" style={{ objectPosition: "50% 25%" }} />
            <div className="glass fl f1"><span className="big tnum">98%</span><span><b>Practo patient votes</b><small>268 patients, as of Oct 2026</small></span></div>
          </div>
        </div>
      </div></section>

      {/* 2 · About */}
      <section className="sp"><div className="wrap two">
        <div>
          <span className="eyebrow">About Dr Ruchi</span>
          <h2 className="d h2">Rebuilding smiles, one <em>careful plan</em> at a time.</h2>
          <div className="prose">
            <p>Dr Ruchi Goel is a prosthodontist: a dentist who specialises in replacing and rebuilding teeth. Her work covers dental implants, every type of denture, crowns and bridges, smile design and full-mouth rehabilitation, the complex cases where many teeth need to work together again.</p>
            <p>She topped the AIIMS MDS entrance examination in 2012 and completed her postgraduate training in prosthodontics at AIIMS New Delhi, after clinical years at PGIMER Chandigarh and PGIMS Rohtak. Her research at AIIMS on occlusal splints for patients with severe tooth wear was published in the <em>International Journal of Prosthodontics and Restorative Dentistry</em> (2023).</p>
            <p>Patients mention one thing about her most often: she explains the plan, the alternatives and the cost before anything begins, often with photos and X-rays on screen.</p>
          </div>
        </div>
        <div className="ph"><img src={d.atWork} alt="Dr Ruchi Goel holding a dental implant model" style={{ objectPosition: "50% 40%" }} loading="lazy" /></div>
      </div></section>

      {/* 3 · Credentials */}
      <section className="sp p"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Credentials</span><h2 className="d h2">Trained at India's <em>top institutes.</em></h2></div></div>
        <div className="tl">
          {d.timeline.map((t) => (
            <div key={t.year + t.text} className={t.key ? "k" : undefined}><b className="tnum">{t.year}</b><span>{t.text}</span></div>
          ))}
        </div>
        <p className="note">Registration A-7387, Delhi State Dental Council (2015).</p>
      </div></section>

      {/* 4 · What she treats */}
      <section className="sp"><div className="wrap">
        <div className="head"><div><span className="eyebrow">What Dr Ruchi treats</span><h2 className="d h2">Replacing and <em>rebuilding</em> teeth.</h2></div></div>
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
        <div className="head"><div><span className="eyebrow">Her cases</span><h2 className="d h2">Cases planned by <em>Dr Ruchi.</em></h2></div><Link className="link" href="/gallery">See all results <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
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

      {/* 6 · Videos */}
      <section className="sp"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Dr Ruchi explains</span><h2 className="d h2">Short answers, <em>straight</em> from her.</h2></div><a className="link" href={site.youtube} target="_blank" rel="noopener">More on YouTube <Icon name="arrow-up-right" cls="ic ic-sm" /></a></div>
        <div className="reels">
          {REELS.map((r) => <Reveal key={r.file}><ReelCard reel={r} /></Reveal>)}
        </div>
      </div></section>

      {/* 7 · Recognition */}
      <section className="gA sec on-dark"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Recognition</span><h2 className="d h2" style={{ color: "var(--white)" }}>Recognised by peers <em>and the profession.</em></h2></div></div>
        <div className="rail">
          {AWARDS.map(([src, cap]) => (
            <figure key={src}><div className="ph"><img src={`/images/${src}`} alt={cap} loading="lazy" /></div><figcaption>{cap}</figcaption></figure>
          ))}
        </div>
      </div></section>

      {/* 8 · Reviews */}
      <section className="sp p"><div className="wrap">
        <div className="head"><div><span className="eyebrow">What patients say</span><h2 className="d h2">"She takes her time, <em>never</em> in a hurry."</h2></div><span className="chip"><Icon name="star" cls="ic ic-sm" /> 98% on Practo · 268 votes</span></div>
        <div className="qs">
          {d.reviews.map((id) => {
            const r = reviewById(id);
            return <blockquote key={id}><p>“{r.quote}”</p><cite>{r.name}<span>{r.treatment}</span></cite></blockquote>;
          })}
        </div>
      </div></section>

      {/* 9 · Where to see her + FAQ */}
      <section className="sp"><div className="wrap fw">
        <div>
          <span className="eyebrow">Where to see Dr Ruchi</span>
          <h2 className="d h2">Both clinics, <em>on set days.</em></h2>
          <p className="lead">Call to confirm which clinic Dr Ruchi is at today.</p>
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
        <CtaBand title="Book with" em="Dr Ruchi." text="A ₹500 consultation with a full examination. You'll leave with a plan and a written estimate." book="Book with Dr Ruchi" />
      </div></section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(PHYSICIAN_LD) }} />
    </>
  );
}
