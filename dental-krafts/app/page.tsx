import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { Concierge, HeroPhoto } from "@/components/concierge";
import { TreatmentsIndex } from "@/components/interactive";
import { VPlaylist, StoryVid } from "@/components/media";
import { BaShowcase } from "@/components/ba-slider";
import { BookingForm } from "@/components/booking-form";
import { QA, Eb } from "@/components/bits";
import { caseByFile } from "@/content/results";
import { homeFaqs } from "@/content/faqs";
import { clinics } from "@/content/clinics";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Dental Clinic in Gurgaon | AIIMS & PGIMER Dentists | Dental Krafts",
  description: "Implants, root canals, kids' dentistry and smile design by Dr Ruchi Goel (AIIMS) and Dr Parmod Gulia (PGIMER). Rated 5.0 on Practo. Clinics in Sector 53 & 57.",
  alternates: { canonical: "/" },
};

const HOME_CASES = [
  "ba-13-smile-makeover", "ba-12-smile-makeover", "ba-16-crowns", "ba-24-full-mouth-rehabilitation",
  "ba-01-direct-veneers", "ba-07-gap-filling", "ba-03-back-teeth-implant", "ba-14-dentures",
  "ba-18-deep-cleaning-stain-removal",
].map(caseByFile).filter((c): c is NonNullable<typeof c> => Boolean(c && c.consent !== false));

const REKHA = { file: "reel-07-patient-rekha-seth.mp4", title: "Rekha Seth's story", poster: "/images/reels/reel-07-patient-rekha-seth-sq.webp" };

const REELS = [
  { file: "reel-03-dr-ruchi-explains.mp4", title: "Are you ignoring this early sign?", poster: "/images/reels/reel-03-dr-ruchi-explains-sq.webp" },
  { file: "reel-04-dr-ruchi-explains.mp4", title: "Dental myths, busted", poster: "/images/reels/reel-04-dr-ruchi-explains-sq.webp" },
  { file: "reel-01-dr-ruchi-explains.mp4", title: "The most common dental problem in the world" },
  { file: "reel-06-dr-ruchi-explains.mp4", title: "Top 5 habits for healthy teeth" },
];

const STORIES = [
  { q: "Six years after my implant, it is no different from my other teeth, colour-wise or size-wise. Even my wife could not notice it.", name: "Subhash", sub: "Implant with bone graft · Dr Parmod Gulia" },
  { q: "Dr Ruchi explained the entire implant procedure in detail and planned the treatment very carefully. Transparent about the procedure and charges.", name: "Aditya", sub: "Dental implant · Dr Ruchi Goel" },
  { q: "My mother had a root canal and a ceramic crown here. It has been many years and she has not faced any problem at all.", name: "Anushka Singh", sub: "Family patient for 6 years" },
  { q: "He made our child feel comfortable throughout the treatment. He explained everything clearly and handled it with great care.", name: "Bijay Kumar", sub: "Child's treatment · Dr Parmod Gulia" },
  { q: "The treatment plan was explained clearly, and I always felt comfortable asking questions.", name: "Putul", sub: "Clear aligners · Dr Ruchi Goel" },
];

const AWARDS = [
  ["awards/national-achievers-2025-gulshan-grover-1.webp", "National Achievers Award 2025, presented to Dr Ruchi Goel by Gulshan Grover"],
  ["awards/aiims-prosthodontics-celebration.webp", "A token of appreciation from the HOD, Division of Prosthodontics, AIIMS New Delhi"],
  ["awards/parmod-gulia-mds-degree-health-minister.webp", "Dr Parmod Gulia receives his MDS from the Union Health Minister"],
  ["awards/national-achievers-2025-mahima-chaudhry.webp", "With Mahima Chaudhry at the National Achievers Award 2025"],
  ["awards/prime-impact-excellence-award.webp", "Business and Profession Excellence Award"],
  ["awards/clinic-celebrity-visit-king.webp", "Singer King visits Dental Krafts"],
] as const;

const STEPS = [
  { no: "1", t: "Consultation", p: "An examination with a specialist, and X-rays only if they're needed.", tag: "₹500 · about 30 minutes" },
  { no: "2", t: "Your written plan", p: "Your options, what each one costs and how many visits it takes. You decide.", tag: "Take it home, ask anything" },
  { no: "3", t: "Treatment", p: "Under local anaesthesia, with instruments sterilised and pouch-sealed for every patient.", tag: "Hospital-grade hygiene" },
  { no: "4", t: "Aftercare", p: "A follow-up check, and the same dentist next time. Many families have stayed for over a decade.", tag: "One file for the family" },
];

const COSTS: [string, string, string, string][] = [
  ["Consultation", "", "₹500", "Examination with either dentist"],
  ["Root canal", "from", "₹6,000", "One tooth, under local anaesthesia"],
  ["Ceramic crown", "from", "₹12,000", "Matched to your shade"],
  ["Tooth-coloured filling", "from", "₹2,000", "Composite, one visit"],
  ["Dental implant", "from", "₹30,000", "Per implant, crown priced separately"],
  ["Full-arch implants", "from", "₹1,50,000", "All-on-4 or All-on-6, per arch"],
  ["Dentures", "from", "₹5,000", "Complete or partial"],
  ["Teeth whitening", "from", "₹10,000", "In-clinic, one session"],
];

const KIDS = ["First visit by the first birthday", "Sealants and fluoride", "Space maintainers", "Tooth-coloured fillings and kids' crowns", "Sports mouthguards", "Children with special needs"];

const FAQ_LD = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: homeFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };

export default function Home() {
  return (
    <>
      {/* 1 · Hero */}
      <section className="hero"><div className="wrap">
        <div>
          <Eb r>AIIMS New Delhi · PGIMER Chandigarh</Eb>
          <h1 className="d" data-split data-delay="120">A smile worth <em>showing</em>, planned by specialists.</h1>
          <p className="lead" data-r data-delay="380">Two specialist dentists, two clinics in Gurgaon, and one habit our patients mention most: we explain the plan and the price before anything begins.</p>
          <Concierge />
        </div>
        <div className="hph">
          <div className="ph" data-unveil data-par="0.06"><HeroPhoto /></div>
          <span className="cap" data-r data-delay="1100"><OpenStatus className="live" /></span>
          <div className="rate" data-r="left" data-delay="900"><span className="n tnum" data-count>5.0</span><div><span className="stars" aria-label="5 out of 5"><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /></span><small>Practo · 1,000+ patient stories</small></div></div>
        </div>
      </div></section>

      {/* 2 · Proof */}
      <section className="proof" aria-label="Credentials and ratings"><div className="wrap" data-r="stagger">
        <div className="pf"><span className="n tnum" data-count>5.0</span><span>Practo, from 1,000+ patient stories</span></div>
        <div className="pf"><span className="n tnum" data-count>4.9</span><span>Justdial, from 1,240+ ratings</span></div>
        <div className="pf"><span className="n tnum">Rank 1</span><span>Dr Ruchi Goel, AIIMS MDS entrance 2012</span></div>
        <div className="pf"><span className="n">Silver</span><span>Dr Parmod Gulia, MDS medal, PGIMER</span></div>
        <div className="press">As featured in <img loading="lazy" src="/images/awards/press-ani-logo.webp" alt="ANI" /><span className="tb">The Tribune</span></div>
      </div></section>

      {/* 3 · Dentists */}
      <section className="sec" id="dentists"><div className="wrap">
        <div className="sh">
          <Eb>Meet your dentists</Eb>
          <h2 className="d h2" data-split>Two specialists. One file for your <em>whole</em> family.</h2>
          <p className="lead" data-r data-delay="180">Dr Ruchi plans implants, dentures and full-mouth work. Dr Parmod cares for children, teens and their parents. Both consult at both clinics.</p>
        </div>
        <div className="docs">
          <article className="doc">
            <div className="ph" data-unveil data-par="0.07"><img loading="lazy" src="/images/ai/dr-ruchi-portrait.webp" alt="Dr Ruchi Goel, prosthodontist and implantologist" /></div>
            <div>
              <p className="role">Founder · Prosthodontist and implantologist</p>
              <h3 className="d">Dr Ruchi Goel</h3>
              <p className="bio">Implants, dentures, crowns and full-mouth rehabilitation, planned end to end. You'll see every step and every cost before anything begins.</p>
              <dl className="dl" data-r="stagger">
                <div><dt>Training</dt><dd>MDS Prosthodontics, AIIMS New Delhi, 2015</dd></div>
                <div><dt>Distinction</dt><dd>Topper, AIIMS MDS entrance exam, 2012</dd></div>
                <div><dt>Patients say</dt><dd className="tnum">98% recommend, 268 Practo votes</dd></div>
                <div><dt>Registration</dt><dd>Delhi State Dental Council, A-7387</dd></div>
              </dl>
              <div className="row"><Link className="btn btn-p" href="/contact-us?doctor=Dr%20Ruchi%20Goel">Book with Dr Ruchi</Link><Link className="tl" href="/dr-ruchi-goel">Full profile <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
            </div>
          </article>
          <article className="doc small">
            <div className="ph" data-unveil data-par="0.07"><img loading="lazy" src="/images/ai/dr-parmod-portrait.webp" alt="Dr Parmod Gulia, pediatric and preventive dentist" /></div>
            <div>
              <p className="role">Pediatric and preventive dentist</p>
              <h3 className="d">Dr Parmod Gulia</h3>
              <p className="bio">Calm, unhurried care for babies, children, teens and children with special needs, and root canals for their parents.</p>
              <dl className="dl" data-r="stagger">
                <div><dt>Training</dt><dd>MDS, PGIMER Chandigarh, silver medal</dd></div>
                <div><dt>Patients say</dt><dd className="tnum">95% recommend, 740 Practo votes</dd></div>
                <div><dt>Registration</dt><dd>Delhi State Dental Council, A-12323</dd></div>
              </dl>
              <div className="row"><Link className="tl" href="/dr-parmod-gulia">Meet Dr Parmod <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
            </div>
          </article>
        </div>
        <div className="either" data-r><p><b>Not sure who to see?</b> Book with either. They plan complex cases together, often in the same visit.</p><a className="btn btn-wa btn-sm" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> Ask on WhatsApp</a></div>
      </div></section>

      {/* 4 · Treatments */}
      <section className="sec tint-sage" id="treatments"><div className="wrap">
        <div className="sh">
          <Eb>Treatments</Eb>
          <h2 className="d h2" data-split>What would you like to <em>fix</em>?</h2>
          <Link className="tl" href="/treatments" style={{ justifySelf: "end" }}>All 21 treatments <Icon name="arrow-right" cls="ic ic-sm" /></Link>
        </div>
        <TreatmentsIndex />
      </div></section>

      {/* 5 · Results */}
      <section className="sec" id="results"><div className="wrap rx">
        <div>
          <Eb>Real patients, real results</Eb>
          <h2 className="d h2" data-split style={{ margin: "22px 0 28px" }}>Results from our own <em>chairs</em>.</h2>
          <p className="case-k" data-k>{HOME_CASES[0]?.cat}</p>
          <p className="case-c" data-c>{HOME_CASES[0]?.caption}</p>
          <p className="fine">Shared with patient consent. Individual results vary.</p>
          <div className="row"><Link className="tl" href="/gallery">See all 33 cases <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
        </div>
        <BaShowcase cases={HOME_CASES} />
      </div></section>

      {/* 6 · How a visit works */}
      <section className="sec tint-mist" id="visit"><div className="wrap">
        <div className="sh">
          <Eb>How a visit works</Eb>
          <h2 className="d h2" data-split>The plan and the price, <em>before</em> we start.</h2>
          <p className="lead" data-r data-delay="180">Four steps, the same for a filling or a full set of implants. Second opinions are welcome at step one.</p>
        </div>
        <div className="steps" data-steps data-r="stagger">
          {STEPS.map((s) => <div className="st" key={s.no}><span className="no tnum">{s.no}</span><h3 className="h3">{s.t}</h3><p>{s.p}</p><span className="tag tnum">{s.tag}</span></div>)}
        </div>
        <div className="promise" data-r>
          <img loading="lazy" src="/images/clinic/reception-lounge.webp" alt="The Dental Krafts reception" />
          <blockquote>“They only suggested what was truly needed and explained every option before treatment.”<cite>Dewesh Kumar, aligners and implants · Verified on Practo</cite></blockquote>
        </div>
      </div></section>

      {/* 7 · Videos */}
      <section className="sec" id="videos"><div className="wrap vx">
        <VPlaylist reels={REELS} />
        <div>
          <Eb>Short answers from Dr Ruchi</Eb>
          <h2 className="d h2" data-split style={{ marginTop: 22 }}>Your questions, answered in a <em>minute</em>.</h2>
        </div>
      </div></section>

      {/* 8 · Stories */}
      <section className="sec tint-white" id="stories">
        <div className="wrap"><div className="sh">
          <Eb>Patient stories</Eb>
          <h2 className="d h2" data-split>In their own <em>words</em>.</h2>
          <div className="scores tnum" data-r="stagger">
            <div><span className="n" data-count>5.0</span><small>Practo · 1,000+ patient stories · Oct 2026</small></div>
            <div><span className="n" data-count>4.9</span><small>Justdial · 1,240+ ratings · Oct 2026</small></div>
          </div>
        </div></div>
        <div className="crs" data-carousel data-autoplay="6500" role="region" aria-roledescription="carousel" aria-label="Patient stories">
          <div className="track" data-track data-cursor="Drag" tabIndex={0} data-r="stagger">
            <StoryVid reel={REKHA} />
            {STORIES.map((s) => (
              <article className="story" key={s.name}>
                <div className="top"><span className="stars" aria-label="5 out of 5"><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /></span><span className="vf">Verified · Practo</span></div>
                <blockquote>“{s.q}”</blockquote>
                <div className="by"><span className="ini" aria-hidden="true">{s.name[0]}</span><span><b>{s.name}</b><small>{s.sub}</small></span></div>
              </article>
            ))}
          </div>
          <div className="wrap ctl">
            <span className="ctr" data-counter>01 <span>/ 06</span></span>
            <span className="bar" data-progress><i /></span>
            <div className="qnav">
              <button type="button" data-prev aria-label="Previous story"><Icon name="arrow-left" cls="ic" /></button>
              <button type="button" data-next aria-label="Next story"><Icon name="arrow-right" cls="ic" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* 9 · Recognition */}
      <section className="sec" id="recognition" data-pin-x>
        <div className="pin">
          <div className="wrap"><div className="sh">
            <Eb>Recognition</Eb>
            <h2 className="d h2" data-split>Recognised by peers and the <em>profession</em>.</h2>
            <p className="lead" data-r data-delay="180">Moments from AIIMS, PGIMER and the award nights since.</p>
          </div></div>
          <div className="rtrack" data-pin-track tabIndex={0} aria-label="Award photos" data-r="stagger">
            {AWARDS.map(([src, cap], i) => (
              <figure className="rc" key={src} style={{ margin: 0 }}><div className="ph"><img loading="lazy" src={`/images/${src}`} alt={cap} /></div><span className="no">{String(i + 1).padStart(2, "0")}</span><p>{cap}</p></figure>
            ))}
          </div>
          <div className="wrap rec-ctl"><span className="bar" data-progress><i /></span><span className="hint">Keep scrolling</span></div>
        </div>
      </section>

      {/* 10 · Kids */}
      <section className="sec tint-peach" id="kids"><div className="wrap kx">
        <div className="kimg">
          <div className="a" data-unveil data-par="0.09"><img loading="lazy" src="/images/ai/treat-kids.webp" alt="A child's toothbrush and a knitted toy tooth" style={{ objectPosition: "40% 50%" }} /></div>
          <div className="b" data-unveil data-par="-0.05" data-delay="150"><img loading="lazy" src="/images/clinic/kids-operatory-mural-clean.webp" alt="The children's treatment room with a painted mural" style={{ objectPosition: "30% 50%" }} /></div>
        </div>
        <div>
          <Eb>For children</Eb>
          <h2 className="d h2" data-split style={{ marginTop: 22 }}>Their first dentist should be a <em>children's</em> dentist.</h2>
          <p className="lead" data-r data-delay="180" style={{ marginTop: 22 }}>Dr Parmod Gulia trained in pediatric and preventive dentistry at PGIMER Chandigarh. When it's the kindest option, treatment can be done under general anaesthesia in a hospital setting.</p>
          <ul className="checks" data-r="stagger">
            {KIDS.map((k) => <li key={k}><Icon name="check" cls="ic ic-sm" />{k}</li>)}
          </ul>
          <Link className="btn btn-p" href="/contact-us?concern=My%20child%27s%20teeth">Book your child's visit <Icon name="arrow-right" cls="ic ic-sm" /></Link>
        </div>
      </div></section>

      {/* 11 · Costs */}
      <section className="sec" id="costs"><div className="wrap">
        <div className="sh c">
          <Eb>Costs</Eb>
          <h2 className="d h2" data-split>Know the cost <em>before</em> you sit in the chair.</h2>
          <p className="lead" data-r data-delay="180">Typical starting prices. Your exact estimate comes after the examination and any X-rays, in writing.</p>
        </div>
        <div className="menu-g tnum">
          {[COSTS.slice(0, 4), COSTS.slice(4)].map((col, i) => (
            <div key={i} data-r="stagger" {...(i === 1 ? { "data-delay": "120" } : {})}>
              {col.map(([item, from, price, note]) => (
                <div className="mi" key={item}><b>{item}</b><span className="dots" /><span className="p">{from && <small>{from}</small>}{price}</span><span className="s">{note}</span></div>
              ))}
            </div>
          ))}
        </div>
        <div className="cnote" data-r><p className="fine">Typical ranges, confirmed after your consultation.</p><Link className="tl" href="/treatment-costs">All treatment costs <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
      </div></section>

      {/* 12 · Clinics */}
      <section className="sec tint-mist" id="clinics"><div className="wrap">
        <div className="sh c">
          <Eb>Clinics</Eb>
          <h2 className="d h2" data-split>Two clinics. Pick the <em>closer</em> one.</h2>
          <p className="lead" data-r data-delay="180">Both dentists consult at both clinics on set days. Call to check who's in today.</p>
        </div>
        <div className="cl" data-r="stagger">
          {clinics.map((c) => (
            <article className="cc2" key={c.id}>
              <div className="ph"><img loading="lazy" src={c.image} alt={c.imageAlt} /></div>
              <div className="bd">
                <OpenStatus clinicId={c.id} className="live" />
                <h3 className="h3">{c.name}</h3>
                <address>{c.address}</address>
                <dl className="hrs"><dt>Mon, Tue, Thu–Sun</dt><dd>{c.hoursLabel}</dd><dt>Wednesday</dt><dd>Closed</dd></dl>
                <p className="near" style={{ margin: 0 }}>Near {c.nearby.join(", ")}</p>
                <div className="row" style={{ marginTop: 6 }}>
                  <a className="btn btn-p btn-sm" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`} target="_blank" rel="noopener"><Icon name="map-pin" cls="ic ic-sm" /> Directions</a>
                  <a className="btn btn-s btn-sm" href={c.phoneHref}><Icon name="phone-call" cls="ic ic-sm" /> {c.phone}</a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="intl" data-r><p><b>Visiting or working in Gurgaon?</b> Japanese, Korean and international patients get a written plan and estimate for their insurer.</p>
          <div className="row" style={{ margin: 0 }}><Link className="btn btn-s btn-sm" href="/japanese" lang="ja">日本語</Link><Link className="btn btn-s btn-sm" href="/korean" lang="ko">한국어</Link><Link className="tl" href="/medical-tourism">Dental tourism</Link></div>
        </div>
      </div></section>

      {/* 13 · FAQ */}
      <section className="sec" id="faq"><div className="wrap fx">
        <div className="stick">
          <Eb>Questions</Eb>
          <h2 className="d h2" data-split style={{ margin: "22px 0" }}>Good questions, plain <em>answers</em>.</h2>
          <p className="lead" data-r data-delay="180">Can't find yours? Ask us on WhatsApp and we'll reply within working hours.</p>
          <div className="row"><a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> Ask on WhatsApp</a></div>
        </div>
        <div data-acc data-r="stagger">{homeFaqs.map((f) => <QA key={f.q} q={f.q} a={f.a} />)}</div>
      </div></section>

      {/* 14 · Book */}
      <section className="sec tint-sage" id="book"><div className="wrap">
        <div className="sh">
          <Eb>Book a visit</Eb>
          <h2 className="d h2" data-split>Tell us in one <em>sentence</em>.</h2>
          <p className="lead" data-r data-delay="180">We'll call you back within working hours to confirm a time. Prefer to talk? Call {clinics[0].phone}.</p>
        </div>
        <BookingForm />
      </div></section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />
    </>
  );
}
