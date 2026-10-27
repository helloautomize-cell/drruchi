import Link from "next/link";
import type { Metadata } from "next";
import { Icon, DkIcon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { Concierge, HeroPhoto } from "@/components/concierge";
import { Reveal } from "@/components/reveal";
import { TreatmentsIndex, WhyList, CostsTabs } from "@/components/interactive";
import { ReelsPlaylist, ReelCard } from "@/components/media";
import { BookingForm } from "@/components/booking-form";
import { QA, QuoteCard } from "@/components/bits";
import { homeCases } from "@/content/results";
import { homeFaqs } from "@/content/faqs";
import { clinics } from "@/content/clinics";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Dental Clinic in Gurgaon | AIIMS & PGIMER Dentists | Dental Krafts",
  description: "Implants, root canals, kids' dentistry and smile design by Dr Ruchi Goel (AIIMS) and Dr Parmod Gulia (PGIMER). Rated 5.0 on Practo. Clinics in Sector 53 & 57.",
  alternates: { canonical: "/" },
};

const TICKER = [
  ["award", "AIIMS MDS entrance topper", "2012 · Dr Ruchi Goel"],
  ["award", "MDS, AIIMS New Delhi", "Prosthodontics"],
  ["medal", "MDS, PGIMER Chandigarh", "Pedodontics · silver medal"],
  ["award", "Senior Research Fellow", "AIIMS · Dr Parmod Gulia"],
  ["trophy", "ISPPD best paper", "2014"],
  ["shield-check", "Registered", "Delhi State Dental Council"],
  ["star", "5.0 on Practo", "1,000+ patient stories"],
] as const;

const BAND = [
  ["map-pin", "Sector 53 · Golf Course Road"], ["map-pin", "Sector 57 · Sushant Lok 2"],
  ["clock", "10 am – 8:30 pm · closed Wednesdays"], ["phone-call", "98104 48720 · 95992 52018"],
  ["award", "MDS, AIIMS New Delhi"], ["medal", "MDS, PGIMER Chandigarh · silver medal"],
  ["shield-check", "Delhi State Dental Council"],
] as const;

const REELS = [
  { file: "reel-01-dr-ruchi-explains.mp4", title: "The most common dental problem in the world" },
  { file: "reel-03-dr-ruchi-explains.mp4", title: "Are you ignoring this early sign?" },
  { file: "reel-04-dr-ruchi-explains.mp4", title: "Dental myths, busted" },
  { file: "reel-06-dr-ruchi-explains.mp4", title: "Top 5 habits for healthy teeth" },
];

const AWARDS = [
  ["awards/national-achievers-2025-gulshan-grover-1.webp", "National Achievers Award 2025, presented to Dr Ruchi Goel by Gulshan Grover"],
  ["awards/aiims-prosthodontics-celebration.webp", "A token of appreciation from the HOD, Division of Prosthodontics, AIIMS New Delhi"],
  ["awards/parmod-gulia-mds-degree-health-minister.webp", "Dr Parmod Gulia receives his MDS from the Union Health Minister"],
  ["awards/national-achievers-2025-mahima-chaudhry.webp", "With Mahima Chaudhry at the National Achievers Award 2025"],
  ["awards/prime-impact-excellence-award.webp", "Business and Profession Excellence Award"],
  ["awards/clinic-celebrity-visit-king.webp", "Singer King visits Dental Krafts"],
] as const;

const WHY = [
  { icon: "award", title: "Specialists, not generalists", text: "A prosthodontist and a pediatric dentist under one roof, both trained at AIIMS and PGIMER.", img: "doctors/dk-doctors-performing-procedure-1.webp" },
  { icon: "receipt", title: "The plan and the price, before we start", text: "Your X-rays, your options and what each one costs. Second opinions are welcome.", img: "clinic/reception-lounge.webp" },
  { icon: "sterilizer", title: "Hospital-grade hygiene", text: "Instruments sterilised and pouch-sealed for every patient. Single-use items used once.", img: "doctors/dk-doctors-performing-procedure-2.webp" },
  { icon: "clock", title: "Two clinics, six days a week", text: "Golf Course Road and Sushant Lok 2, 10 am until 8 or 8:30 pm. Closed Wednesdays.", img: "clinic/storefront-signage-reception.webp" },
];

const FAQ_LD = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: homeFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

export default function Home() {
  return (
    <>
      {/* 1 · Hero E — forest concierge */}
      <section className="xE on-dark">
        <div className="wrap stage">
          <div className="l">
            <span className="eyebrow rise"><Icon name="award" cls="ic ic-sm" /> AIIMS New Delhi · PGIMER Chandigarh</span>
            <h1 className="d rise d2">A smile worth <em>showing</em>, planned by specialists.</h1>
            <p className="lead rise d3">Tell us what's bothering you. We'll tell you who you'll see, where prices start, and when we can see you.</p>
            <Concierge />
          </div>
          <div className="r">
            <div className="ph">
              <HeroPhoto />
              <div className="glass fl f1"><b className="tnum">5.0</b><span><span className="stars"><Icon name="star" cls="ic ic-sm" /><Icon name="star" cls="ic ic-sm" /><Icon name="star" cls="ic ic-sm" /><Icon name="star" cls="ic ic-sm" /><Icon name="star" cls="ic ic-sm" /></span><small>Practo · 1,000+ patient stories</small></span></div>
              <Link className="glass fl f2" href="/gallery"><span className="mini"><img src="/images/results/split/ba-12-smile-makeover__before.webp" alt="" /><img src="/images/results/split/ba-12-smile-makeover__after.webp" alt="" /></span><span><b>Real smile makeovers</b><span>Before and after, from our clinics</span></span><span className="arw2"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
            </div>
          </div>
        </div>
        <div className="band"><div className="mq" aria-hidden="true">
          {[0, 1].map((n) => <span key={n} style={{ display: "contents" }}>{BAND.map(([ic, t]) => <span key={t}><Icon name={ic} />{t}</span>)}</span>)}
        </div></div>
      </section>

      {/* 2 · Trust A — credential ticker */}
      <section className="tA">
        <div className="mq" aria-label="Credentials">
          {[0, 1].map((n) => <span key={n} style={{ display: "contents" }}>{TICKER.map(([ic, b, s]) => (
            <span className="it" key={b}><span className="badge"><Icon name={ic} /></span><span>{b}<small>{s}</small></span></span>
          ))}</span>)}
        </div>
        <div className="press"><span>As featured in</span><img src="/images/awards/press-ani-logo.webp" alt="ANI" /><span className="trib">The Tribune</span></div>
      </section>

      {/* 3 · Doctors C */}
      <section className="dC sec"><div className="wrap">
        <Reveal><div className="head"><div><span className="eyebrow">Meet your dentists</span><h2 className="d h2">Led by an AIIMS <em>prosthodontist.</em></h2></div><p className="lead" style={{ maxWidth: 420 }}>Dr Ruchi plans every complex case. Dr Parmod cares for children and families. Both consult at both clinics.</p></div></Reveal>
        <div className="grid">
          <Reveal><article className="lead-c on-dark">
            <div className="ph"><img src="/images/ai/dr-ruchi-portrait.webp" alt="Dr Ruchi Goel, prosthodontist and implantologist" style={{ objectPosition: "52% 30%" }} loading="lazy" /></div>
            <div className="t">
              <span className="eyebrow">Founder · Prosthodontist</span><h3 className="d">Dr Ruchi Goel</h3>
              <p>Implants, dentures, crowns and full-mouth rehabilitation, planned end to end. You'll see every step and every cost before anything begins.</p>
              <div className="kv"><div><b>MDS, AIIMS</b>New Delhi, 2015</div><div><b>Rank 1</b>AIIMS entrance 2012</div><div><b>98%</b>Practo, 268 votes</div><div><b>19 years</b>in practice</div></div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: "auto" }}>
                <Link className="btn btn-w" href="/contact-us?doctor=Dr Ruchi Goel">Book with Dr Ruchi</Link>
                <Link className="link" href="/dr-ruchi-goel">Full profile <Icon name="arrow-right" cls="ic ic-sm" /></Link>
              </div>
            </div>
          </article></Reveal>
          <div className="side">
            <Reveal delay={60}><article className="mini">
              <div className="ph"><img src="/images/ai/dr-parmod-portrait.webp" alt="Dr Parmod Gulia" loading="lazy" /></div>
              <div className="t"><span className="eyebrow">Pediatric dentist</span><h3 className="d">Dr Parmod Gulia</h3><span>MDS PGIMER Chandigarh, silver medal. Children, teens and whole families.</span>
                <Link className="link" href="/dr-parmod-gulia" style={{ alignSelf: "flex-start", marginTop: 6 }}>Meet Dr Parmod <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
            </article></Reveal>
            <Reveal delay={120}><div className="ask"><div className="avs"><img src="/images/ai/dr-ruchi-portrait.webp" alt="" /><img src="/images/ai/dr-parmod-portrait.webp" alt="" /></div><b>Not sure who to see?</b><span style={{ color: "var(--muted)", fontSize: "14.5px" }}>Book with either. They plan complex cases together, often in the same visit.</span><a className="btn btn-wa btn-sm" href={site.whatsappLink} style={{ alignSelf: "flex-start" }}><Icon name="whatsapp" cls="ic ic-sm" /> Ask on WhatsApp</a></div></Reveal>
          </div>
        </div>
      </div></section>

      {/* 4 · Treatments B */}
      <section className="trB sec"><div className="wrap">
        <Reveal><div className="head"><div><span className="eyebrow">Treatments</span><h2 className="d h2">What would you like <em>to fix?</em></h2></div><Link className="link" href="/treatments">All 21 treatments <Icon name="arrow-right" cls="ic ic-sm" /></Link></div></Reveal>
        <TreatmentsIndex />
      </div></section>

      {/* 5 · Results B — hover grid */}
      <section className="rB sec" style={{ background: "var(--petal)" }}><div className="wrap">
        <Reveal><div className="head"><div><span className="eyebrow">Real patients · real results</span><h2 className="d h2">Results from <em>our own</em> chairs.</h2><p className="lead">Hover or tap a case to see the after photo. Shared with patient consent.</p></div><Link className="link" href="/gallery">See all 33 cases <Icon name="arrow-right" cls="ic ic-sm" /></Link></div></Reveal>
        <div className="grid">
          {homeCases.map((c) => (
            <div className="case" tabIndex={0} key={c.file}>
              <div className="ba">
                <img src={`/images/results/split/${c.file}__before.webp`} alt="Before" loading="lazy" />
                <img className="af" src={`/images/results/split/${c.file}__after.webp`} alt="After" loading="lazy" />
              </div>
              <div className="tg2"><span className="chip">{c.cat}</span><span>Hover to see after</span></div>
              <b>{c.caption}</b>
            </div>
          ))}
        </div>
      </div></section>

      {/* 6 · Why B */}
      <section className="wB sec"><div className="wrap"><WhyList items={WHY} /></div></section>

      {/* 7 · Videos B */}
      <section className="vB sec" style={{ background: "var(--petal)" }}><div className="wrap"><ReelsPlaylist reels={REELS} /></div></section>

      {/* 8 · Stories C */}
      <section className="sC sec"><div className="wrap">
        <Reveal><div className="head"><div><span className="eyebrow">Patient stories</span><h2 className="d h2">In our patients' <em>own words.</em></h2></div></div></Reveal>
        <div className="grid">
          <ReelCard reel={{ file: "reel-07-patient-rekha-seth.mp4", title: "Rekha Seth on her treatment", who: "Video story · 1 min" }} />
          <div className="stack">
            <QuoteCard q="Dr Ruchi explained the entire implant procedure in detail and planned the treatment very carefully… transparent about the procedure and charges." name="Aditya" sub="dental implant" />
            <QuoteCard q="Thank you for taking such care of our 6-year-old son… without ever rushing into treatment." name="Parent" sub="pediatric treatment" />
            <div className="rate"><div><b className="tnum">5.0</b><span>Practo · 1,000+ patient stories</span></div><div><b className="tnum">4.9</b><span>Justdial · 1,240+ ratings</span></div></div>
          </div>
        </div>
      </div></section>

      {/* 9 · Recognition A */}
      <section className="gA sec on-dark"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Recognition</span><h2 className="d h2" style={{ color: "var(--white)" }}>Recognised by peers <em>and the profession.</em></h2></div></div>
        <div className="rail">
          {AWARDS.map(([src, cap]) => (
            <figure key={src}><div className="ph"><img src={`/images/${src}`} alt="" loading="lazy" /></div><figcaption>{cap}</figcaption></figure>
          ))}
        </div>
      </div></section>

      {/* 10 · Kids A */}
      <section className="kA sec"><div className="wrap"><div className="band on-dark">
        <DkIcon name="kids" />
        <div>
          <span className="eyebrow">For children</span>
          <h2 className="d h2" style={{ color: "var(--white)" }}>Their first dentist should be <em>a children's dentist.</em></h2>
          <p className="lead">Dr Parmod Gulia trained in pediatric and preventive dentistry at PGIMER Chandigarh. He sees babies, children, teens and children with special needs, and when it's the kindest option, treatment can be done under general anaesthesia in a hospital setting.</p>
          <ul>
            {[["first-tooth", "First visit by the first birthday"], ["shield-check", "Sealants and fluoride"], ["tooth", "Space maintainers"], ["tooth-check", "Tooth-coloured fillings and kids' crowns"], ["heart", "Sports mouthguards"], ["child", "Children with special needs"]].map(([ic, t]) => <li key={t}><Icon name={ic} />{t}</li>)}
          </ul>
          <Link className="btn btn-w" href="/contact-us?concern=My child's teeth">Book your child's visit <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
        </div>
        <div className="pics">
          <div className="ph"><img src="/images/clinic/kids-operatory-mural.webp" alt="The children's treatment room with a painted mural" loading="lazy" /></div>
          <div className="ph"><img src="/images/kids/kids-real-patients-collage.webp" alt="Children smiling during their visit" loading="lazy" /></div>
        </div>
      </div></div></section>

      {/* 11 · Costs B */}
      <section className="cB sec"><div className="wrap">
        <Reveal><div className="head"><div><span className="eyebrow">Costs</span><h2 className="d h2">Know the cost <em>before</em> you sit in the chair.</h2></div><Link className="link" href="/treatment-costs">All treatment costs <Icon name="arrow-right" cls="ic ic-sm" /></Link></div></Reveal>
        <CostsTabs />
        <p style={{ margin: "16px 0 0", fontSize: 14, color: "var(--muted)" }}>Typical ranges, confirmed after your consultation. Your exact estimate comes after the examination and any X-rays.</p>
      </div></section>

      {/* 12 · Clinics A */}
      <section className="clA sec" style={{ background: "var(--blush)" }}><div className="wrap">
        <Reveal><div className="head"><div><span className="eyebrow">Clinics</span><h2 className="d h2">Two clinics. <em>Pick the closer one.</em></h2></div></div></Reveal>
        <div className="grid">
          {clinics.map((c) => (
            <article className="cl" key={c.id}>
              <div className="ph"><img src={c.image} alt={c.imageAlt} loading="lazy" /><span className="glass st"><OpenStatus clinicId={c.id} className="stat-live" /></span></div>
              <div className="in">
                <h3 className="d">{c.name}</h3>
                <div className="ad"><Icon name="map-pin" /><span>{c.address}</span></div>
                <div className="ad"><Icon name="phone-call" /><span className="tnum">{c.phone}</span></div>
                <div className="near">{c.nearby.map((n) => <span key={n}>{n}</span>)}</div>
                <div className="acts">
                  <a className="btn btn-p btn-sm" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`} target="_blank" rel="noopener"><Icon name="navigation" cls="ic ic-sm" /> Directions</a>
                  <a className="btn btn-s btn-sm" href={c.phoneHref}><Icon name="phone-call" cls="ic ic-sm" /> Call {c.short}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="intl on-dark"><p><Icon name="globe" /><span><b>Visiting or working in Gurgaon?</b><br />Japanese, Korean and international patients get a written plan and estimate for their insurer.</span></p><span style={{ display: "flex", gap: 8, flexWrap: "wrap" }}><Link className="chip" href="/japanese">日本語</Link><Link className="chip" href="/korean">한국어</Link><Link className="btn btn-w btn-sm" href="/medical-tourism">Dental tourism</Link></span></div>
      </div></section>

      {/* 13 · FAQ A */}
      <section className="fA sec" style={{ background: "var(--petal)" }}><div className="wrap grid">
        <div className="stick"><span className="eyebrow">Questions</span><h2 className="d h2">Good questions, <em>plain answers.</em></h2><p className="lead">Can't find yours? Ask us on WhatsApp and we'll reply within working hours.</p><div style={{ marginTop: 22 }}><a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> Ask on WhatsApp</a></div></div>
        <div>{homeFaqs.map((f) => <QA key={f.q} q={f.q} a={f.a} />)}</div>
      </div></section>

      {/* 14 · Booking B */}
      <section className="bkB sec"><div className="wrap">
        <div style={{ textAlign: "center", marginBottom: 28 }}><span className="eyebrow">Book a visit</span><h2 className="d h2">Three <em>quick</em> steps.</h2></div>
        <BookingForm />
      </div></section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
    </>
  );
}
