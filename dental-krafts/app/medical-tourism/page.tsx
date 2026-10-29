import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { QA, Eb } from "@/components/bits";
import { Icon } from "@/components/icons";
import { clinics } from "@/content/clinics";
import { site } from "@/content/site";
import { JsonLd, ID, LAST_REVIEWED, faqPage, breadcrumb } from "@/lib/schema";

const META_TITLE = "Dental Tourism in India | Dental Care | Dental Krafts";
const META_DESC = "Visiting Delhi NCR? Get your X-rays reviewed before you travel, a written plan and specialist care from AIIMS and PGIMER-trained dentists at two clinics in Gurgaon.";

export const metadata: Metadata = {
  title: { absolute: META_TITLE },
  description: META_DESC,
  alternates: {
    canonical: "/medical-tourism",
    languages: {
      "en-IN": "/medical-tourism",
      "ja-JP": "/japanese",
      "ko-KR": "/korean",
      "x-default": "/medical-tourism",
    },
  },
};

const WA_PLAN = `https://wa.me/919810448720?text=${encodeURIComponent("Hello Dental Krafts, I'd like to plan a dental visit from abroad.")}`;
const TI = (f: string) => `/images/tourism/${f}`;

const FAQS = [
  ["Why do people choose Gurgaon for dental treatment?", "Gurgaon is part of Delhi NCR, a short drive from Delhi's international airport, and has many hotels, restaurants and services close to the clinics. At Dental Krafts you also get specialists trained at AIIMS and PGIMER and a written plan before you book travel."],
  ["How many days do I need to stay in India?", "It depends on the treatment. Crowns, veneers, whitening and root canals can often be completed within a few days to a week. Implants usually need two trips, because the bone needs several months to heal before the final crown. Your written plan gives the exact schedule."],
  ["Can I complete dental implants in a single trip?", "Usually not. The implant is placed on one trip and the final crown is fitted after healing, commonly three to six months later. In selected cases a temporary tooth can be fitted earlier. We plan the visits so your travel is kept to a minimum."],
  ["Do I need to send X-rays before I travel?", "It helps a lot. Recent X-rays or clear photos let our dentist review your case, suggest a plan and tell you how many visits to expect. We still examine you in person before any treatment starts."],
  ["What documents or visa do I need?", "Visa rules depend on your country and change over time, so check the current medical visa requirements with the Indian embassy or consulate. We can confirm your appointment dates in writing to support your plans."],
  ["Is dental treatment at Dental Krafts safe and hygienic?", "Yes. Instruments are sterilised and pouch-sealed for every patient, treatment is done under local anaesthesia, and the clinics follow standard infection-control procedures. You can see the sterilisation steps when you visit."],
  ["Which dentist will treat me?", "Dr Ruchi Goel, a prosthodontist and implantologist (MDS, AIIMS New Delhi), leads implants, crowns, veneers and smile makeovers. Dr Parmod Gulia, a pediatric dentist (MDS, PGIMER Chandigarh), treats children and root canals. They plan complex cases together."],
  ["Can I get follow-up care after I return home?", "Yes. We stay in touch by WhatsApp or email for questions, and we explain which check-ups to have with a local dentist. For some treatments, such as implants and aligners, we plan follow-up visits when you're next in India."],
  ["How do I get from the airport to the clinic?", "Both clinics are in Gurgaon, usually 20 to 40 minutes by road from Delhi's international airport depending on traffic. Taxis and ride apps are available at the airport, and we can share directions to either clinic."],
  ["Which language will the dentists speak?", "Our dentists speak English and Hindi. Information pages are available in Japanese and Korean, and you're welcome to bring a friend or interpreter to appointments."],
] as const;

const PILLARS = [
  { img: "doctors-together.webp", alt: "Dr Parmod Gulia and Dr Ruchi Goel together", t: "Two specialists", p: "A prosthodontist and implantologist (AIIMS) and a pediatric dentist (PGIMER) who plan complex cases together." },
  { img: "dental-implants-gurgaon.webp", alt: "Dental implant model", t: "A written plan first", p: "You see the treatment, the number of visits and the timeline in writing before you book flights." },
  { img: "sector-57-operatory.webp", alt: "Treatment room at Dental Krafts Sector 57", t: "Clean, modern clinics", p: "Instruments are sterilised and pouch-sealed for every patient, in two clinics on Golf Course Road and in Sushant Lok 2." },
  { img: "national-achievers-2025-gulshan-grover-1.webp", alt: "Dr Ruchi Goel receiving the National Achievers Award 2025", t: "Recognised by peers", p: "Awards and recognition from AIIMS, PGIMER and national events, and 1,000+ patient stories on Practo." },
] as const;

const JOURNEY = [
  { n: "01", t: "Send your records", p: "Share recent X-rays or photos of your teeth on WhatsApp or email. Our dentist reviews them before you travel.", tag: "Remote review" },
  { n: "02", t: "Get your written plan", p: "You receive the recommended treatment, the number of visits, how long you need to stay and the dates we can offer.", tag: "In writing" },
  { n: "03", t: "Arrive and be treated", p: "We examine you, confirm the plan and carry out the treatment, with your appointments arranged around your stay.", tag: "At either clinic" },
  { n: "04", t: "Aftercare at home", p: "You leave with clear instructions and your records, and we stay in touch for follow-up questions.", tag: "Stay in touch" },
] as const;

const VISITOR_TREATMENTS = [
  { href: "/dental-implants", img: "replace-missing-teeth.webp", alt: "Dental implant treatment", t: "Dental implants", p: "Usually two trips: placement, then the final crown after the bone has healed." },
  { href: "/dental-crowns", img: "comprehensive-dental-crown.webp", alt: "Dental crown treatment", t: "Crowns and bridges", p: "Often completed within a few days to a week in one stay." },
  { href: "/smile-makeover", img: "smile-makeover-banner.webp", alt: "Smile makeover result", t: "Smile makeover and veneers", p: "Designed and previewed first, then fitted in one stay in many cases." },
  { href: "/root-canal-treatment", img: "rct_root-canal-treatment-gurgaon.webp", alt: "Root canal treatment", t: "Root canal treatment", p: "Usually one or two visits, then a crown to protect the tooth." },
  { href: "/teeth-whitening", img: "teeth-whitening-banner.webp", alt: "Teeth whitening", t: "Teeth whitening", p: "Done in one visit and easily combined with a check-up and cleaning." },
  { href: "/invisalign", img: "invisalign-banner.webp", alt: "Clear aligners", t: "Clear aligners", p: "Planned here, with periodic reviews that we can arrange around your travel." },
] as const;

const TRUST = [
  { img: "aiims-prosthodontics-hod.webp", alt: "Prosthodontics event at AIIMS New Delhi" },
  { img: "parmod-gulia-mds-health-minister.webp", alt: "Dr Parmod Gulia receiving his MDS degree" },
  { img: "dk-doctors-performing-procedure-wide.webp", alt: "Dr Ruchi Goel and Dr Parmod Gulia treating a patient together" },
] as const;

const CLINIC_IMGS: Record<string, { img: string; alt: string }> = {
  sector53: { img: "storefront-signage-wide.webp", alt: "Dental Krafts clinic at South Point Mall" },
  sector57: { img: "sector-57-operatory.webp", alt: "Treatment room at Dental Krafts Sector 57" },
};

const LD = [
  faqPage(FAQS.map(([q, a]) => ({ q, a }))),
  breadcrumb([["Home", "/"], ["Dental tourism", "/medical-tourism"]]),
  {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${site.domain}/medical-tourism#webpage`,
    url: `${site.domain}/medical-tourism`,
    name: META_TITLE,
    description: META_DESC,
    inLanguage: "en-IN",
    about: { "@id": ID.org },
    reviewedBy: { "@id": ID.org },
    lastReviewed: LAST_REVIEWED,
    dateModified: LAST_REVIEWED,
    isPartOf: { "@id": ID.website },
  },
];

export default function MedicalTourism() {
  return (
    <>
      {/* 1 · Hero */}
      <section className="mt-hero"><div className="wrap">
        <p className="crumb"><Link href="/">Home</Link> / Dental tourism</p>
        <div className="mt-g">
          <div>
            <Eb>Dental tourism in India</Eb>
            <h1 className="d">Plan your dental care in India, <em>before you travel.</em></h1>
            <p className="lead" data-r data-delay="120">Visiting Gurgaon, near Delhi's international airport? Dr Ruchi Goel and Dr Parmod Gulia, both trained at AIIMS and PGIMER, review your X-rays first, give you a written plan and schedule your visit so your time here is well used.</p>
            <div className="row" data-r data-delay="220">
              <a className="btn btn-wa" href={WA_PLAN}><Icon name="whatsapp" cls="ic ic-sm" /> Send my X-rays on WhatsApp</a>
              <a className="btn btn-s" href="#journey">How it works</a>
            </div>
            <p className="mt-langs">Read this page in <Link href="/japanese">日本語</Link><Link href="/korean">한국어</Link></p>
            <div className="mt-facts">
              <div><b className="tnum">17+</b><span>years of experience</span></div>
              <div><b className="tnum">2</b><span>clinics in Gurgaon</span></div>
              <div><b className="tnum">5.0</b><span>on Practo</span></div>
            </div>
          </div>
          <div className="mt-collage" data-r data-delay="160">
            <figure><Image src={TI("hero-ruchi.webp")} width={1024} height={1280} alt="Dr Ruchi Goel at Dental Krafts, Gurgaon" fetchPriority="high" /><figcaption>Dr Ruchi Goel</figcaption></figure>
            <figure><Image src={TI("reception-lounge-wide.webp")} width={1400} height={930} alt="Reception at the Dental Krafts clinic in Sector 53" loading="lazy" /><figcaption>Sector 53 reception</figcaption></figure>
            <figure><Image src={TI("hero-parmod.webp")} width={1055} height={1318} alt="Dr Parmod Gulia at Dental Krafts, Gurgaon" loading="lazy" /><figcaption>Dr Parmod Gulia</figcaption></figure>
          </div>
        </div>
      </div></section>

      {/* 2 · Why visitors choose us */}
      <section className="sec tint-white"><div className="wrap">
        <div className="sh">
          <Eb>Why visitors choose us</Eb>
          <h2 className="d h2" data-split>Specialist care, <em>clearly planned.</em></h2>
          <p className="lead" data-r data-delay="140">Dental tourism works best when the planning is done before the flight. That's the part we put the most care into.</p>
        </div>
        <div className="mt-pil" data-r="stagger">
          {PILLARS.map((c) => (
            <article className="mt-pc" key={c.t}>
              <div className="im"><Image src={TI(c.img)} width={1200} height={900} alt={c.alt} loading="lazy" /></div>
              <div className="t"><h3>{c.t}</h3><p>{c.p}</p></div>
            </article>
          ))}
        </div>
      </div></section>

      {/* 3 · Four-step journey */}
      <section className="sec" id="journey"><div className="wrap">
        <div className="sh">
          <Eb>Your journey</Eb>
          <h2 className="d h2" data-split>Four steps, <em>from home</em> to home.</h2>
        </div>
        <div className="mt-jr" data-r="stagger">
          {JOURNEY.map((s) => (
            <div key={s.n}><span className="n tnum">{s.n}</span><h3>{s.t}</h3><p>{s.p}</p><span className="tag">{s.tag}</span></div>
          ))}
        </div>
      </div></section>

      {/* 4 · Treatments visitors choose */}
      <section className="sec tint-mist"><div className="wrap">
        <div className="sh">
          <Eb>Treatments</Eb>
          <h2 className="d h2" data-split>What visitors <em>come to us for.</em></h2>
          <p className="lead" data-r data-delay="140">How long you need to stay depends on the treatment and on your mouth. This is a guide. Your written plan gives the real timeline.</p>
        </div>
        <div className="mt-pil mt-pil3" data-r="stagger">
          {VISITOR_TREATMENTS.map((c) => (
            <Link className="mt-pc" href={c.href} key={c.t}>
              <div className="im"><Image src={TI(c.img)} width={1200} height={900} alt={c.alt} loading="lazy" /></div>
              <div className="t"><h3>{c.t} <Icon name="arrow-right" cls="ic ic-sm" /></h3><p>{c.p}</p></div>
            </Link>
          ))}
        </div>
      </div></section>

      {/* 5 · Two clinics */}
      <section className="sec"><div className="wrap">
        <div className="sh">
          <Eb>Where we are</Eb>
          <h2 className="d h2" data-split>Two clinics, <em>both in Gurgaon.</em></h2>
          <p className="lead" data-r data-delay="140">Gurgaon is part of Delhi NCR, a short drive from Delhi's international airport (usually 20 to 40 minutes, depending on traffic), with many hotels close to both clinics.</p>
        </div>
        <div className="mt-cl2" data-r="stagger">
          {clinics.map((c) => (
            <article className="mt-cc" key={c.id}>
              <div className="im"><Image src={TI(CLINIC_IMGS[c.id].img)} width={1400} height={800} alt={CLINIC_IMGS[c.id].alt} loading="lazy" /></div>
              <div className="b">
                <h3>{c.name}</h3>
                <p>{c.address}</p>
                <p>Open {c.hoursLabel}, closed Wednesdays</p>
                <div className="row">
                  <a className="btn btn-p btn-sm" href={c.phoneHref}><Icon name="phone-call" cls="ic ic-sm" /> {c.phone}</a>
                  <Link className="btn btn-s btn-sm" href={c.slug}>Clinic details</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div></section>

      {/* 6 · Trust */}
      <section className="sec tint-white"><div className="wrap">
        <div className="sh">
          <Eb>Trust</Eb>
          <h2 className="d h2" data-split>Trained at <em>AIIMS and PGIMER.</em></h2>
          <p className="lead" data-r data-delay="140">Dr Ruchi Goel completed her MDS in Prosthodontics at AIIMS New Delhi. Dr Parmod Gulia completed his MDS in Pedodontics at PGIMER Chandigarh with a silver medal.</p>
        </div>
        <div className="mt-aw" data-r="stagger">
          {TRUST.map((f) => (
            <figure key={f.img}><Image src={TI(f.img)} width={1200} height={900} alt={f.alt} loading="lazy" /></figure>
          ))}
        </div>
      </div></section>

      {/* 7 · FAQ */}
      <section className="sec" id="faq"><div className="wrap">
        <div className="sh">
          <Eb>Questions</Eb>
          <h2 className="d h2" data-split>Planning a visit? <em>Start here.</em></h2>
        </div>
        <div className="mt-faq" data-acc>
          {FAQS.map(([q, a]) => <QA key={q} q={q} a={a} />)}
        </div>
      </div></section>

      {/* 8 · CTA */}
      <section className="sec" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="mt-cta" data-r>
          <div>
            <h2 className="d h2">Ready to <em>plan your visit?</em></h2>
            <p>Send your X-rays or photos and tell us what you'd like to fix. We'll reply with what we recommend and the dates we can offer.</p>
            <div className="row" style={{ marginTop: 24 }}>
              <a className="btn btn-wa" href={WA_PLAN}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp us</a>
              <Link className="btn btn-s" href="/contact-us">Book a consultation</Link>
            </div>
          </div>
          <ul>
            <li>A review of your records before you travel</li>
            <li>A written plan with the number of visits and the timeline</li>
            <li>Appointment dates confirmed in writing</li>
            <li>Specialists at two clinics in Gurgaon</li>
          </ul>
        </div>
      </div></section>

      <JsonLd data={LD} />
    </>
  );
}
