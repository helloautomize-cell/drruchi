import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { Icon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { Reel5 } from "@/components/media";
import { HeroSwap } from "@/components/hero-swap";
import { VisitWaterfall } from "@/components/visit-waterfall";
import { BaShowcase } from "@/components/ba-slider";
import { BookingV5, BookLink } from "@/components/booking-form";
import { QA, Eb } from "@/components/bits";
import { caseByFile } from "@/content/results";
import { homeFaqs } from "@/content/faqs";
import { clinics } from "@/content/clinics";
import { JsonLd, clinicNode, physicianNode, faqPage, videoObject } from "@/lib/schema";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: { absolute: "Dental Clinic in Gurgaon | AIIMS & PGIMER Dentists | Dental Krafts" },
  description: "Implants, root canals, kids' dentistry and smile design by Dr Ruchi Goel (AIIMS) and Dr Parmod Gulia (PGIMER). Rated 5.0 on Practo. Clinics in Sector 53 & 57.",
  alternates: { canonical: "/", languages: { "en-IN": "/", ja: "/japanese", ko: "/korean", "x-default": "/" } },
};

const HOME_CASES = [
  "ba-13-smile-makeover", "ba-12-smile-makeover", "ba-16-crowns", "ba-24-full-mouth-rehabilitation",
  "ba-01-direct-veneers", "ba-07-gap-filling", "ba-03-back-teeth-implant", "ba-14-dentures",
  "ba-18-deep-cleaning-stain-removal",
].map(caseByFile).filter((c): c is NonNullable<typeof c> => Boolean(c && c.consent !== false));

const RUCHI = { img: "/images/ai/dr-ruchi-portrait.webp" };
const PARMOD = { img: "/images/ai/dr-parmod-portrait.webp" };

const REELS = [
  { file: "reel-03.mp4", title: "Are you ignoring this early sign?", poster: "/videos/reel-03.webp", who: "Dr Ruchi Goel · 0:43" },
  { file: "reel-05.mp4", title: "Meet Dr Parmod: dentistry for children", poster: "/videos/reel-05.webp", who: "Dr Parmod Gulia · 0:54" },
  { file: "reel-02.mp4", title: "Do your gums bleed when you brush?", poster: "/videos/reel-02.webp", who: "Dr Ruchi Goel · 0:41" },
  { file: "reel-04.mp4", title: "Dental myths, busted", poster: "/videos/reel-04.webp", who: "Dr Ruchi Goel · 1:02" },
  { file: "reel-01.mp4", title: "The most common dental problem in the world", poster: "/videos/reel-01.webp", who: "Dr Ruchi Goel · 1 min" },
  { file: "reel-06.mp4", title: "Top 5 habits for healthy teeth", poster: "/videos/reel-06.webp", who: "Dr Ruchi Goel · 1 min" },
];

const VID_STORIES = [
  { file: "reel-07.mp4", title: "Rekha Seth", poster: "/videos/reel-07.webp", who: "Her treatment · 0:28" },
  { file: "reel-08.mp4", title: "\u201CWe've been consulting him for years\u201D", poster: "/videos/reel-08.webp", who: "A family patient of Dr Parmod · 0:36" },
];

const STORIES = [
  { q: "Six years after my implant, it is no different from my other teeth, colour-wise or size-wise. Even my wife could not notice it.", name: "Subhash", sub: "Implant with bone graft · Dr Parmod Gulia" },
  { q: "Dr Ruchi explained the entire implant procedure in detail and planned the treatment very carefully. Transparent about the procedure and charges.", name: "Aditya", sub: "Dental implant · Dr Ruchi Goel" },
  { q: "My mother had a root canal and a ceramic crown here. It has been many years and she has not faced any problem at all.", name: "Anushka Singh", sub: "Family patient for 6 years" },
  { q: "He made our child feel comfortable throughout the treatment. He explained everything clearly and handled it with great care.", name: "Bijay Kumar", sub: "Child's treatment · Dr Parmod Gulia" },
  { q: "The treatment plan was explained clearly, and I always felt comfortable asking questions.", name: "Putul", sub: "Clear aligners · Dr Ruchi Goel" },
];

const AWARDS = [
  ["awards/prime-impact-excellence-award.webp", "Prime Impact Brand, Business and Profession Excellence Award"],
  ["awards/aiims-prosthodontics-hod.webp", "The HOD, Prosthodontics, AIIMS New Delhi, presents a token of appreciation at the celebration event"],
  ["awards/parmod-gulia-mds-health-minister.webp", "Dr Parmod Gulia receives his Master's degree from the Health Minister of India"],
  ["awards/national-achievers-2025-gulshan-grover-1.webp", "Honoured at the National Achievers Award 2025 by Gulshan Grover"],
  ["awards/national-achievers-2025-backdrop.webp", "National Achievers Award 2025"],
  ["awards/national-achievers-2025-gulshan-grover-2.webp", "On stage at the National Achievers Award 2025, Delhi"],
  ["awards/with-singer-king.webp", "With the singer King at Dental Krafts"],
  ["awards/with-jj-communication.webp", "With JJ Communication"],
  ["awards/national-achievers-2025-mahima-chaudhry.webp", "Honoured at the National Achievers Award 2025 by Mahima Chaudhry"],
  ["awards/national-achievers-2025-vindu-dara-singh.webp", "With Vindu Dara Singh at the National Achievers Award 2025"],
] as const;

const STEPS = [
  { no: "1", t: "Consultation", p: "An examination with a specialist, and X-rays only if they're needed.", tag: "About 30 minutes" },
  { no: "2", t: "Your written plan", p: "Your options, what each involves and how many visits it takes, in writing. You decide.", tag: "Take it home, ask anything" },
  { no: "3", t: "Treatment", p: "Under local anaesthesia, with instruments sterilised and pouch-sealed for every patient.", tag: "Hospital-grade hygiene" },
  { no: "4", t: "Aftercare", p: "A follow-up check, and the same dentist next time. Many families have stayed for over a decade.", tag: "One file for the family" },
];



const TCARDS: { t: string; p: string; img: string; alt: string; who: "ruchi" | "parmod" | "either"; whoLabel: string }[] = [
  { t: "Replace missing teeth", p: "Implants, dentures and full-arch fixed teeth that look and chew like your own.", img: "/images/v5/t-implants.webp", alt: "A dental implant with its crown", who: "ruchi", whoLabel: "Usually with Dr Ruchi" },
  { t: "Save a tooth", p: "Root canals, fillings and crowns that keep your natural tooth working.", img: "/images/v5/t-rootcanal.webp", alt: "A dentist showing a tooth model", who: "either", whoLabel: "With either dentist" },
  { t: "Smile design", p: "Veneers, whitening and makeovers, previewed and planned around your face.", img: "/images/v5/t-smile.webp", alt: "A bright, natural smile", who: "ruchi", whoLabel: "Usually with Dr Ruchi" },
  { t: "Straighten teeth", p: "Braces or near-invisible clear aligners, for teens and adults.", img: "/images/v5/t-aligners.webp", alt: "Clear aligners being fitted", who: "either", whoLabel: "With either dentist" },
  { t: "Kids and teens", p: "First visits, sealants, fluoride and gentle fillings with a specialist.", img: "/images/ai/treat-kids.webp", alt: "A child's toothbrush and a knitted toy tooth", who: "parmod", whoLabel: "With Dr Parmod" },
  { t: "Gums and urgent care", p: "Bleeding gums, wisdom teeth, sudden pain. Same-day slots when we can.", img: "/images/ai/treat-gums-emergency.webp", alt: "A dentist checking a patient's gums", who: "either", whoLabel: "With either dentist" },
];

const MOSAIC: { cls: string; src: string; alt: string; cap: string }[] = [
  { cls: "a", src: "/images/clinic/clinic-kids-colourful.webp", alt: "A colourful treatment room at Dental Krafts", cap: "Inside the clinic" },
  { cls: "b", src: "/images/clinic/clinic-kids-cheerful.webp", alt: "The children's treatment room with a painted mural", cap: "The children's room" },
  { cls: "c", src: "/images/clinic/clinic-mint.webp", alt: "A mint-green treatment room at Dental Krafts", cap: "Treatment room" },
  { cls: "d", src: "/images/clinic/clinic-mallfront.webp", alt: "Dental Krafts storefront at South Point Mall", cap: "South Point Mall, Golf Course Road" },
  { cls: "e", src: "/images/clinic/clinic-reception-2.webp", alt: "The Dental Krafts reception lounge", cap: "Reception" },
  { cls: "f", src: "/images/clinic/reception-modern.webp", alt: "The Dental Krafts front desk", cap: "Front desk" },
  { cls: "g", src: "/images/clinic/clinic-reception-gold.webp", alt: "The gold-accented Dental Krafts reception", cap: "Reception, Sector 53" },
];

const HOME_LD = [
  faqPage(homeFaqs),
  ...clinics.map(clinicNode),
  physicianNode("ruchi"),
  physicianNode("parmod"),
  ...REELS.map(videoObject),
  ...VID_STORIES.map(videoObject),
];

export default function Home() {
  return (
    <>
      {/* 1 · Hero */}
      <section className="dk5-hero" aria-label="Dental Krafts">
        <div className="wrap dk5-g">
          <div>
            <Eb r>AIIMS New Delhi · PGIMER Chandigarh</Eb>
            <h1 className="d" data-split data-delay="120">Specialist dentists for your whole <em>family</em>.</h1>
            <p className="lead rise" style={{ "--rd": "380ms" } as CSSProperties}>Dr Ruchi Goel and Dr Parmod Gulia see every patient themselves, at two clinics in Gurgaon.</p>
            <div className="dk5-acts rise" style={{ "--rd": "520ms" } as CSSProperties}>
              <BookLink className="btn btn-p">Book a visit <Icon name="arrow-right" cls="ic ic-sm" /></BookLink>
              <a className="btn btn-s" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" />WhatsApp us</a>
            </div>
            <p className="dk5-rt rise" style={{ "--rd": "640ms" } as CSSProperties}>
              <span className="stars" role="img" aria-label="5 out of 5"><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /></span>
              <b className="tnum">5.0</b> on Practo · 1,000+ patient stories
            </p>
          </div>
          <HeroSwap />
        </div>
      </section>

      {/* 2 · Proof bar */}
      <section className="dk5-proof" aria-label="Credentials and ratings">
        <div className="wrap dk5-pg" data-r="stagger">
          <div><span className="n tnum" data-count>17+</span><span className="k">years of experience</span><small>Dr Ruchi since 2007, Dr Parmod since 2008</small></div>
          <div><span className="n">AIIMS <em>&amp;</em> PGIMER</span><span className="k">where they trained</span><small>MDS, Rank 1 AIIMS entrance · silver medal PGIMER</small></div>
          <div><span className="n tnum" data-count>5.0</span><span className="k">on Practo</span><small>1,000+ patient stories · 4.9 on Justdial</small></div>
          <div><span className="n tnum">2</span><span className="k">clinics in Gurgaon</span><small>Sector 53 Golf Course Road · Sector 57 Sushant Lok 2</small></div>
        </div>
        <div className="wrap dk5-press"><span>As featured in</span><Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" decoding="async" src="/images/awards/press-ani-logo.webp" width={400} height={227} alt="ANI" /><b>The Tribune</b></div>
      </section>

      {/* 3 · Dentists */}
      <section className="sec" id="dentists"><div className="wrap">
        <div className="sh c">
          <Eb>Meet your dentists</Eb>
          <h2 className="d h2" data-split>Two specialists, <em>side by side.</em></h2>
          <p className="lead" data-r data-delay="180">They work side by side at both clinics. Whichever of them you see, they plan complex cases together, so your family keeps one file.</p>
        </div>
        <div className="dk5-docs">
          <article className="dk5-doc" data-r>
            <figure className="ph" data-unveil><Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" decoding="async" src="/images/v5/doc-ruchi-clinic.webp" width={1536} height={1024} alt="Dr Ruchi Goel at the Dental Krafts clinic" /></figure>
            <p className="role">Prosthodontist &amp; implantologist</p>
            <h3 className="d nm">Dr Ruchi Goel</h3>
            <p className="cred">BDS · MDS Prosthodontics, AIIMS New Delhi</p>
            <p className="bio">Replaces and rebuilds teeth: implants, dentures, crowns and full-mouth rehabilitation, planned end to end and explained step by step.</p>
            <dl>
              <div><dt>Distinction</dt><dd>Rank 1, AIIMS MDS entrance exam, 2012</dd></div>
              <div><dt>Practising since</dt><dd>2007</dd></div>
              <div><dt>Patients say</dt><dd>98% recommend · 268 Practo votes</dd></div>
              <div><dt>Registration</dt><dd>Delhi State Dental Council, A-7387</dd></div>
            </dl>
            <div className="dk5-acts">
              <BookLink className="btn btn-p btn-sm" doctor="Dr Ruchi Goel">Book with Dr Ruchi</BookLink>
              <Link className="tl" href="/dr-ruchi-goel">Full profile <Icon name="arrow-right" cls="ic ic-sm" /></Link>
            </div>
          </article>
          <article className="dk5-doc" data-r>
            <figure className="ph" data-unveil><Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" decoding="async" src="/images/v5/doc-parmod-clinic.webp" width={1536} height={1024} alt="Dr Parmod Gulia at the Dental Krafts clinic" /></figure>
            <p className="role">Pediatric &amp; preventive dentist</p>
            <h3 className="d nm">Dr Parmod Gulia</h3>
            <p className="cred">BDS · MDS Pedodontics, PGIMER Chandigarh</p>
            <p className="bio">Calm, unhurried care for babies, children, teens and children with special needs, plus root canals and check-ups for their parents.</p>
            <dl>
              <div><dt>Distinction</dt><dd>Silver medal, MDS, PGIMER Chandigarh</dd></div>
              <div><dt>Practising since</dt><dd>2008</dd></div>
              <div><dt>Patients say</dt><dd>95% recommend · 740 Practo votes</dd></div>
              <div><dt>Registration</dt><dd>Delhi State Dental Council, A-12323</dd></div>
            </dl>
            <div className="dk5-acts">
              <BookLink className="btn btn-p btn-sm" doctor="Dr Parmod Gulia">Book with Dr Parmod</BookLink>
              <Link className="tl" href="/dr-parmod-gulia">Full profile <Icon name="arrow-right" cls="ic ic-sm" /></Link>
            </div>
          </article>
        </div>
        <div className="dk5-together" data-r>
          <Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" decoding="async" src="/images/v5/doctors-together-new.webp" width={800} height={533} alt="Dr Parmod Gulia and Dr Ruchi Goel at Dental Krafts" />
          <p><b>Not sure who to see?</b> Book with either. If you need the other specialist, they'll join you in the same visit.</p>
          <a className="btn btn-wa btn-sm" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" />Ask on WhatsApp</a>
        </div>
      </div></section>

      {/* 4 · Treatments */}
      <section className="sec tint-sage" id="treatments"><div className="wrap">
        <div className="sh">
          <Eb>Treatments</Eb>
          <h2 className="d h2" data-split>What would you like to <em>fix</em>?</h2>
          <Link className="tl" href="/treatments" style={{ justifySelf: "end", alignSelf: "end" }}>All 21 treatments <Icon name="arrow-right" cls="ic ic-sm" /></Link>
        </div>
        <div className="dk5-tgrid" data-r="stagger">
          {TCARDS.map((c) => (
            <BookLink key={c.t} className="dk5-tc" topic={c.t}>
              <span className="ph"><Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" decoding="async" src={c.img} width={1200} height={900} alt={c.alt} /></span>
              <span className="bd">
                <span className="h3">{c.t} <Icon name="arrow-right" cls="ic ic-sm" /></span>
                <span className="p">{c.p}</span>
                <span className="dk5-who">
                  <span className="dk5-av">
                    {c.who !== "parmod" && <Image sizes="(max-width: 768px) 100vw, 760px" src={RUCHI.img} width={88} height={88} alt="" />}
                    {c.who !== "ruchi" && <Image sizes="(max-width: 768px) 100vw, 760px" src={PARMOD.img} width={88} height={88} alt="" />}
                  </span>
                  {c.whoLabel}
                </span>
              </span>
            </BookLink>
          ))}
        </div>
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

      {/* 6 · Inside the clinic */}
      <section className="sec" id="inside"><div className="wrap">
        <div className="sh">
          <Eb>Inside Dental Krafts</Eb>
          <h2 className="d h2" data-split>Two clinics you'll be glad to <em>walk into</em>.</h2>
          <p className="lead" data-r data-delay="180">Bright rooms, a children's room with its own mural, and instruments sterilised and sealed for every patient. Both clinics are in malls with lifts and parking.</p>
        </div>
        <div className="dk5-mos" data-r="stagger">
          {MOSAIC.map((m) => (
            <figure className={`m ${m.cls}`} key={m.cls} data-par="0.04"><Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" decoding="async" src={m.src} width={1400} height={930} alt={m.alt} /><figcaption>{m.cap}</figcaption></figure>
          ))}
        </div>
      </div></section>

      {/* 7 · How a visit works */}
      <section className="sec tint-mist" id="visit"><div className="wrap">
        <div className="sh">
          <Eb>How a visit works</Eb>
          <h2 className="d h2" data-split>A clear plan, <em>before</em> we start.</h2>
          <p className="lead" data-r data-delay="180">Four steps, the same for a filling or a full set of implants. Second opinions are welcome at step one.</p>
        </div>
        <VisitWaterfall steps={STEPS} />
        <div className="promise" data-r>
          <Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" src="/images/clinic/reception-lounge.webp" width={1128} height={758} alt="The Dental Krafts reception" />
          <blockquote>“They only suggested what was truly needed and explained every option before treatment.”<cite>Dewesh Kumar, aligners and implants · Verified on Practo</cite></blockquote>
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
        <div className="crs mrq" role="region" aria-roledescription="marquee" aria-label="Patient stories">
          <div className="mrq-track">
            <div className="mrq-half" data-r="stagger">
              {STORIES.map((s) => (
                <article className="story" key={s.name}>
                  <div className="top"><span className="stars" role="img" aria-label="5 out of 5"><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /></span><span className="vf">Verified · Practo</span></div>
                  <blockquote>“{s.q}”</blockquote>
                  <div className="by"><span className="ini" aria-hidden="true">{s.name[0]}</span><span><b>{s.name}</b><small>{s.sub}</small></span></div>
                </article>
              ))}
            </div>
            <div className="mrq-half" aria-hidden="true">
              {STORIES.map((s) => (
                <article className="story" key={"d" + s.name}>
                  <div className="top"><span className="stars" role="img" aria-label="5 out of 5"><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /></span><span className="vf">Verified · Practo</span></div>
                  <blockquote>“{s.q}”</blockquote>
                  <div className="by"><span className="ini" aria-hidden="true">{s.name[0]}</span><span><b>{s.name}</b><small>{s.sub}</small></span></div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9 · Videos */}
      <section className="sec" id="videos">
        <div className="wrap"><div className="sh">
          <Eb>Short answers from Dr Ruchi</Eb>
          <h2 className="d h2" data-split>Your questions, answered in a <em>minute</em>.</h2>
          <p className="lead" data-r data-delay="180">Filmed in our clinics, the way you'd watch them on your phone. Tap one to play with sound.</p>
        </div></div>
        <div className="crs dk5-reels" data-carousel data-nodrag role="region" aria-roledescription="carousel" aria-label="Short videos from the dentists">
          <div className="track" data-track data-cursor="Play" data-cursor-tone="play" tabIndex={0} data-r="stagger">
            {REELS.map((r) => <Reel5 key={r.file} reel={r} />)}
          </div>
          <div className="wrap ctl">
            <span className="ctr" data-counter>01 <span>/ 06</span></span>
            <span className="bar" data-progress><i /></span>
            <div className="qnav">
              <button type="button" data-prev aria-label="Previous video"><Icon name="arrow-left" cls="ic" /></button>
              <button type="button" data-next aria-label="Next video"><Icon name="arrow-right" cls="ic" /></button>
            </div>
          </div>
        </div>
      </section>

      {/* 10 · Recognition */}
      <section className="sec" id="recognition" data-pin-x>
        <div className="pin">
          <div className="wrap"><div className="sh">
            <Eb>Recognition</Eb>
            <h2 className="d h2" data-split>Recognised by peers and the <em>profession</em>.</h2>
            <p className="lead" data-r data-delay="180">Ten moments from AIIMS, PGIMER and the award nights since.</p>
          </div></div>
          <div className="rtrack" data-pin-track tabIndex={0} aria-label="Award photos" data-r="stagger">
            {AWARDS.map(([src, cap], i) => (
              <figure className="rc" key={src} style={{ margin: 0 }}><div className="ph"><Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" src={`/images/${src}`} width={1200} height={800} alt={cap} /></div><span className="no">{String(i + 1).padStart(2, "0")}</span><p>{cap}</p></figure>
            ))}
          </div>
          <div className="wrap rec-ctl"><span className="bar" data-progress><i /></span><span className="hint">Keep scrolling</span></div>
        </div>
      </section>

      {/* 11 · FAQ */}
      <section className="sec" id="faq"><div className="wrap fx">
        <div className="stick">
          <Eb>Questions</Eb>
          <h2 className="d h2" data-split style={{ margin: "22px 0" }}>Good questions, plain <em>answers</em>.</h2>
          <p className="lead" data-r data-delay="180">Can't find yours? Ask us on WhatsApp and we'll reply within working hours.</p>
          <div className="row"><a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> Ask on WhatsApp</a></div>
        </div>
        <div data-acc data-r="stagger">{homeFaqs.map((f) => <QA key={f.q} q={f.q} a={f.a} />)}</div>
      </div></section>

      {/* 12 · Booking */}
      <section className="sec tint-sage" id="book"><div className="wrap">
        <BookingV5 />
      </div></section>

      {/* 13 · Clinics */}
      <section className="sec tint-mist" id="clinics"><div className="wrap">
        <div className="sh c">
          <Eb>Clinics</Eb>
          <h2 className="d h2" data-split>Two clinics. Pick the <em>closer</em> one.</h2>
          <p className="lead" data-r data-delay="180">Both dentists consult at both clinics on set days. Call to check who's in today.</p>
        </div>
        <div className="cl" data-r="stagger">
          {clinics.map((c) => (
            <article className="cc2" key={c.id}>
              <div className="ph"><Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" src={c.image} width={1400} height={1200} alt={c.imageAlt} /></div>
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
        <div className="intl" data-r><p><b>Visiting or working in Gurgaon?</b> Japanese, Korean and international patients get a written plan for their insurer.</p>
          <div className="row" style={{ margin: 0 }}><Link className="btn btn-s btn-sm" href="/japanese" lang="ja">日本語</Link><Link className="btn btn-s btn-sm" href="/korean" lang="ko">한국어</Link><Link className="tl" href="/medical-tourism">Dental tourism</Link></div>
        </div>
      </div></section>

      <JsonLd data={HOME_LD} />
    </>
  );
}
