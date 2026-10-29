import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { BaShowcase } from "@/components/ba-slider";
import { VPlaylist } from "@/components/media";
import { QA, Eb } from "@/components/bits";
import { doctorById } from "@/content/doctors";
import { clinics } from "@/content/clinics";
import { reviewById } from "@/content/reviews";
import { caseByFile } from "@/content/results";
import { site } from "@/content/site";
import { JsonLd, physicianNode, faqPage, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: { absolute: "Dr Ruchi Goel | Prosthodontist, AIIMS | Dental Krafts" },
  description: "Dr Ruchi Goel, BDS, MDS (AIIMS New Delhi), AIIMS MDS entrance topper. Dental implants, dentures, crowns, smile design and full-mouth rehab at Dental Krafts, Gurgaon.",
  alternates: { canonical: "/dr-ruchi-goel" },
};

const d = doctorById("ruchi");

const REELS = [
  { file: "reel-03.mp4", title: "Are you ignoring this early sign?", poster: "/images/reels/reel-03-dr-ruchi-explains-sq.webp" },
  { file: "reel-04.mp4", title: "Dental myths, busted", poster: "/images/reels/reel-04-dr-ruchi-explains-sq.webp" },
];

const CASES = ["ba-13-smile-makeover", "ba-24-full-mouth-rehabilitation", "ba-03-back-teeth-implant"]
  .map(caseByFile).filter((c): c is NonNullable<typeof c> => Boolean(c && c.consent !== false));

const LD = [
  physicianNode("ruchi"),
  faqPage(d.faqs),
  breadcrumb([["Home", "/"], ["Our dentists", "/our-dentists"], ["Dr Ruchi Goel", "/dr-ruchi-goel"]]),
];

export default function DrRuchiGoel() {
  return (
    <>
      {/* 1 · Hero */}
      <section className="dh"><div className="wrap">
        <div>
          <nav className="crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><i>/</i><Link href="/our-dentists">Our dentists</Link><i>/</i><span>Dr Ruchi Goel</span></nav>
          <Eb>{d.eyebrow}</Eb>
          <h1 className="d h1x">Dr Ruchi <em>Goel</em></h1>
          <p className="sub">{d.degree}</p>
          <div className="facts">
            <div><b className="tnum">Rank 1</b><span>AIIMS MDS entrance examination, 2012</span></div>
            <div><b className="tnum">98%</b><span>recommend her, from 268 Practo votes</span></div>
            <div><b className="tnum">2007</b><span>practising since</span></div>
          </div>
          <div className="row" style={{ margin: 0 }}>
            <Link className="btn btn-p" href="/contact-us?doctor=Dr%20Ruchi%20Goel">Book with Dr Ruchi <Icon name="arrow-right" cls="ic ic-sm" /></Link>
            <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> Chat on WhatsApp</a>
          </div>
          <p className="note">Reg. A-7387, Delhi State Dental Council · Consults at both clinics</p>
        </div>
        <div className="portrait"><Image sizes="(max-width: 768px) 100vw, 760px" src={d.portrait} width={1055} height={1318} alt="Dr Ruchi Goel, prosthodontist and implantologist" fetchPriority="high" /></div>
      </div></section>

      {/* 2 · Pull statement */}
      <section className="pull"><div className="wrap">
        <p>What patients mention most: she explains the plan and the alternatives <em>before anything begins</em>.</p>
        <small>From Dr Ruchi's verified Practo reviews</small>
      </div></section>

      {/* 3 · About */}
      <section className="sec"><div className="wrap abx">
        <div className="ph"><Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" src={d.atWork} width={1536} height={1024} alt="Dr Ruchi Goel at work in the clinic" /></div>
        <div>
          <Eb>About Dr Ruchi</Eb>
          <h2 className="d h2" style={{ margin: "22px 0 30px" }}>Rebuilding smiles, one careful <em>plan</em> at a time.</h2>
          <div className="prose">
            <p>Dr Ruchi Goel is a prosthodontist: a dentist who specialises in replacing and rebuilding teeth. Her work covers dental implants, every type of denture, crowns and bridges, smile design and full-mouth rehabilitation, the complex cases where many teeth need to work together again.</p>
            <p>She topped the AIIMS MDS entrance examination in 2012 and completed her postgraduate training in prosthodontics at AIIMS New Delhi, after clinical years at PGIMER Chandigarh and PGIMS Rohtak. Her research at AIIMS on occlusal splints for patients with severe tooth wear was published in the <i>International Journal of Prosthodontics and Restorative Dentistry</i> (2023).</p>
            <p>Before anything begins, she walks you through the plan and the alternatives, often with your photos and X-rays on screen.</p>
          </div>
          <div className="def"><b>What is a prosthodontist?</b><p>A dentist with three more years of specialist training in replacing and restoring teeth: implants, dentures, crowns, bridges and complex rebuilding. In India it's an MDS in Prosthodontics.</p></div>
        </div>
      </div></section>

      {/* 4 · Career */}
      <section className="sec tint-white bt"><div className="wrap">
        <div className="sh">
          <Eb>Training and career</Eb>
          <h2 className="d h2">From AIIMS to your <em>chair</em>.</h2>
          <p className="lead">Memberships: Indian Dental Association · Indian Prosthodontic Society.</p>
        </div>
        <div className="cv">
          {d.timeline.map((t) => {
            const [b, ...rest] = t.text.split(" · ");
            return <div key={t.year + t.text} className={t.key ? "hi" : undefined}><span className="y tnum">{t.year}</span><b>{b}</b><span>{rest.join(" · ")}</span></div>;
          })}
        </div>
      </div></section>

      {/* 5 · What she treats */}
      <section className="sec tint-mist"><div className="wrap">
        <Eb>What Dr Ruchi treats</Eb>
        <h2 className="d h2" style={{ margin: "22px 0 40px", maxWidth: "16ch" }}>Teeth that need to work <em>again</em>.</h2>
        <ul className="words">
          {d.treats.map((t) => <li key={t.title}><Link href={t.href ?? "/treatments"}>{t.title}</Link></li>)}
        </ul>
      </div></section>

      {/* 6 · Cases */}
      <section className="sec"><div className="wrap rx">
        <div>
          <Eb>Cases planned by Dr Ruchi</Eb>
          <h2 className="d h2" style={{ margin: "22px 0 28px" }}>Her work, <em>before</em> and after.</h2>
          <p className="case-k" data-k>{CASES[0]?.cat}</p>
          <p className="case-c" data-c>{CASES[0]?.caption}</p>
          <p className="fine">Shared with patient consent. Individual results vary.</p>
        </div>
        <BaShowcase cases={CASES} />
      </div></section>

      {/* 7 · Reviews */}
      <section className="sec tint-white bt"><div className="wrap">
        <div className="sh">
          <Eb>What patients say</Eb>
          <h2 className="d h2">In their own <em>words</em>.</h2>
          <p className="lead">Verified Practo reviews, lightly trimmed.</p>
        </div>
        <div className="qg">
          {d.reviews.slice(0, 4).map((id) => {
            const r = reviewById(id);
            return <figure key={id}><blockquote>“{r.quote}”</blockquote><figcaption><b>{r.name}</b> · {r.treatment}</figcaption></figure>;
          })}
        </div>
      </div></section>

      {/* 8 · Videos */}
      <section className="sec"><div className="wrap vx">
        <VPlaylist reels={REELS} />
        <div>
          <Eb>Dr Ruchi explains</Eb>
          <h2 className="d h2" style={{ marginTop: 22 }}>One question, one <em>minute</em>.</h2>
        </div>
      </div></section>

      {/* 9 · Where + FAQ */}
      <section className="sec tint-white bt"><div className="wrap">
        <div className="sh">
          <Eb>Where to see Dr Ruchi</Eb>
          <h2 className="d h2">Both clinics, on <em>set days</em>.</h2>
          <p className="lead">Call to confirm which clinic she's at today.</p>
        </div>
        <div className="where">
          {clinics.map((c) => (
            <div key={c.id}>
              <h3 className="h3">{c.short}</h3>
              <address>{c.address}</address>
              <span><OpenStatus clinicId={c.id} className="live" /><span className="hrs2" style={{ display: "block" }}>{c.hoursLabel} · closed Wed</span></span>
              <div className="row" style={{ margin: 0 }}><a className="btn btn-s btn-sm" href={c.phoneHref}><Icon name="phone-call" cls="ic ic-sm" /> {c.phone}</a></div>
            </div>
          ))}
        </div>
      </div></section>

      <section className="sec"><div className="wrap fx">
        <div className="stick">
          <Eb>Questions</Eb>
          <h2 className="d h2" style={{ marginTop: 22 }}>Asked about Dr Ruchi's <em>work</em>.</h2>
        </div>
        <div>{d.faqs.map((f) => <QA key={f.q} q={f.q} a={f.a} />)}</div>
      </div></section>

      {/* 10 · CTA */}
      <section className="cta"><div className="wrap">
        <div>
          <Eb>Book with Dr Ruchi</Eb>
          <h2 className="d h2" style={{ marginTop: 22 }}>A consultation, and a plan in <em>writing</em>.</h2>
        </div>
        <div className="row"><a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a><Link className="btn btn-p" href="/contact-us?doctor=Dr%20Ruchi%20Goel">Book a visit <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
      </div></section>

      <JsonLd data={LD} />
    </>
  );
}
