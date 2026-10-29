import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { OpenStatus } from "@/components/open-status";
import { BaShowcase } from "@/components/ba-slider";
import { QA, Eb } from "@/components/bits";
import { doctorById } from "@/content/doctors";
import { clinics } from "@/content/clinics";
import { reviewById } from "@/content/reviews";
import { caseByFile } from "@/content/results";
import { site } from "@/content/site";
import { JsonLd, physicianNode, faqPage, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Dr Parmod Gulia | Pediatric Dentist, PGIMER | Gurgaon",
  description: "Dr Parmod Gulia, BDS, MDS (Paedodontics & Preventive Dentistry), PGIMER Chandigarh, silver medal. Children's dentistry and root canals at Dental Krafts, Gurgaon.",
  alternates: { canonical: "/dr-parmod-gulia" },
};

const d = doctorById("parmod");

const CASES = ["ba-11-complete-dentures-face", "ba-12-smile-makeover", "ba-13-smile-makeover"]
  .map(caseByFile).filter((c): c is NonNullable<typeof c> => Boolean(c && c.consent !== false));

const LD = [
  physicianNode("parmod"),
  faqPage(d.faqs),
  breadcrumb([["Home", "/"], ["Our dentists", "/our-dentists"], ["Dr Parmod Gulia", "/dr-parmod-gulia"]]),
];

export default function DrParmodGulia() {
  return (
    <>
      {/* 1 · Hero */}
      <section className="dh"><div className="wrap">
        <div>
          <nav className="crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><i>/</i><Link href="/our-dentists">Our dentists</Link><i>/</i><span>Dr Parmod Gulia</span></nav>
          <Eb>{d.eyebrow}</Eb>
          <h1 className="d h1x">Dr Parmod <em>Gulia</em></h1>
          <p className="sub">{d.degree}</p>
          <div className="facts">
            <div><b className="tnum">Silver</b><span>MDS medal, PGIMER Chandigarh</span></div>
            <div><b className="tnum">95%</b><span>recommend him, from 740 Practo votes</span></div>
            <div><b className="tnum">2008</b><span>practising since</span></div>
          </div>
          <div className="row" style={{ margin: 0 }}>
            <Link className="btn btn-p" href="/contact-us?doctor=Dr%20Parmod%20Gulia">Book with Dr Parmod <Icon name="arrow-right" cls="ic ic-sm" /></Link>
            <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> Chat on WhatsApp</a>
          </div>
          <p className="note">Reg. A-12323, Delhi State Dental Council · Consults at both clinics</p>
        </div>
        <div className="portrait"><Image sizes="(max-width: 768px) 100vw, 760px" src={d.portrait} width={1055} height={1318} alt="Dr Parmod Gulia, pediatric and preventive dentist" fetchPriority="high" /></div>
      </div></section>

      {/* 2 · Pull statement */}
      <section className="pull"><div className="wrap">
        <p>Parents mention the same thing: he takes his <em>time</em>, never rushes a child, and explains everything first.</p>
        <small>From Dr Parmod's verified Practo reviews</small>
      </div></section>

      {/* 3 · About */}
      <section className="sec"><div className="wrap abx">
        <div className="ph"><Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" src={d.atWork} width={1536} height={1024} alt="Dr Parmod Gulia at work in the clinic" /></div>
        <div>
          <Eb>About Dr Parmod</Eb>
          <h2 className="d h2" style={{ margin: "22px 0 30px" }}>Calm, careful dentistry for <em>children</em> — and their parents.</h2>
          <div className="prose">
            <p>Dr Parmod Gulia is a pediatric and preventive dentist: a specialist in dental care for babies, children, teens and children with special needs. He trained at PGIMER Chandigarh, where his MDS earned a silver medal.</p>
            <p>His visits are deliberately unhurried — first appointments are about getting a child comfortable in the chair, not rushing into treatment. When it is the kindest option, treatment can be done under general anaesthesia in a hospital setting.</p>
            <p>He also does root canal treatments and restorative work for parents, so the whole family can often be seen in a single visit.</p>
          </div>
          <div className="def"><b>What is a pediatric dentist?</b><p>A dentist with three more years of specialist training in treating children: behaviour guidance, early cavities, dental injuries and care under sedation or general anaesthesia when needed. In India it's an MDS in Paedodontics.</p></div>
        </div>
      </div></section>

      {/* 4 · Career */}
      <section className="sec tint-white bt"><div className="wrap">
        <div className="sh">
          <Eb>Training and career</Eb>
          <h2 className="d h2">From PGIMER to your <em>chair</em>.</h2>
        </div>
        <div className="cv">
          {d.timeline.map((t) => {
            const [b, ...rest] = t.text.split(" · ");
            return <div key={t.year + t.text} className={t.key ? "hi" : undefined}><span className="y tnum">{t.year}</span><b>{b}</b><span>{rest.join(" · ")}</span></div>;
          })}
        </div>
      </div></section>

      {/* 5 · What he treats */}
      <section className="sec tint-mist"><div className="wrap">
        <Eb>What Dr Parmod treats</Eb>
        <h2 className="d h2" style={{ margin: "22px 0 40px", maxWidth: "16ch" }}>Small teeth, and the teeth around <em>them</em>.</h2>
        <ul className="words">
          {d.treats.map((t) => <li key={t.title}><Link href={t.href ?? "/treatments"}>{t.title}</Link></li>)}
        </ul>
      </div></section>

      {/* 6 · Cases */}
      {CASES.length > 0 && (
        <section className="sec"><div className="wrap rx">
          <div>
            <Eb>Cases at our clinics</Eb>
            <h2 className="d h2" style={{ margin: "22px 0 28px" }}>Real work, <em>before</em> and after.</h2>
            <p className="case-k" data-k>{CASES[0]?.cat}</p>
            <p className="case-c" data-c>{CASES[0]?.caption}</p>
            <p className="fine">Shared with patient consent. Individual results vary.</p>
          </div>
          <BaShowcase cases={CASES} />
        </div></section>
      )}

      {/* 7 · Reviews */}
      <section className="sec tint-white bt"><div className="wrap">
        <div className="sh">
          <Eb>What parents say</Eb>
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

      {/* 8 · Where + FAQ */}
      <section className="sec"><div className="wrap">
        <div className="sh">
          <Eb>Where to see Dr Parmod</Eb>
          <h2 className="d h2">Both clinics, on <em>set days</em>.</h2>
          <p className="lead">Call to confirm which clinic he's at today.</p>
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

      <section className="sec tint-white bt"><div className="wrap fx">
        <div className="stick">
          <Eb>Questions</Eb>
          <h2 className="d h2" style={{ marginTop: 22 }}>Asked about <em>children's</em> dentistry.</h2>
        </div>
        <div>{d.faqs.map((f) => <QA key={f.q} q={f.q} a={f.a} />)}</div>
      </div></section>

      {/* 9 · CTA */}
      <section className="cta"><div className="wrap">
        <div>
          <Eb>Book with Dr Parmod</Eb>
          <h2 className="d h2" style={{ marginTop: 22 }}>A first visit, and a plan for your <em>child</em>.</h2>
        </div>
        <div className="row"><a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a><Link className="btn btn-p" href="/contact-us?doctor=Dr%20Parmod%20Gulia">Book a visit <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
      </div></section>

      <JsonLd data={LD} />
    </>
  );
}
