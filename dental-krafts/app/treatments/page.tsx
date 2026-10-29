import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { TreatmentsJump } from "@/components/treatments-jump";
import { treatmentBySlug } from "@/content/treatments";
import { site } from "@/content/site";
import { JsonLd, treatmentsCollection, breadcrumb } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Dental Treatments in Gurgaon | Implants, RCT, Kids | Dental Krafts",
  description:
    "All 21 dental treatments at Dental Krafts, Gurgaon — implants, root canals, kids' dentistry, braces, whitening and more. Specialist care, explained first.",
  alternates: { canonical: "/treatments" },
};

const TI = (f: string) => `/images/treatments/${f}.webp`;

const GROUPS: { id: string; name: string; desc: string; feature: string; who: string; cards: [string, string][] }[] = [
  {
    id: "missing", name: "Replace missing teeth",
    desc: "Implants, full-arch teeth and dentures that look and chew like your own.",
    feature: "types-of-dental-implants", who: "Dr Ruchi Goel",
    cards: [
      ["dental-implants", "dental-implants"],
      ["all-on-4-dental-implants", "fixed-bridge-supported-by-4-8"],
      ["dentures", "dentures"],
      ["full-mouth-rehabilitation", "advantages-of-all-on-four"],
    ],
  },
  {
    id: "save", name: "Save a tooth",
    desc: "Root canals, fillings and crowns to keep your natural tooth.",
    feature: "rct_causes-of-root-canal", who: "either dentist",
    cards: [
      ["root-canal-treatment", "rool-canal-treatment"],
      ["dental-fillings", "dental-fillings"],
      ["dental-crowns", "dental-crowns"],
    ],
  },
  {
    id: "smile", name: "Smile design",
    desc: "Veneers, whitening and makeovers planned around your face, not a template.",
    feature: "cosmetic-dentist-banner", who: "Dr Ruchi Goel",
    cards: [
      ["smile-makeover", "smile-makeover-banner"],
      ["dental-veneers", "dental-veneers"],
      ["teeth-whitening", "in-office-vs-at-home-teeth"],
      ["cosmetic-dentistry", "cosmetic-dentistry"],
    ],
  },
  {
    id: "straight", name: "Straighten teeth",
    desc: "Braces or near-invisible aligners, for teens and adults.",
    feature: "best-invisible-aligners", who: "either dentist",
    cards: [
      ["teeth-braces", "teeth-braces-banner"],
      ["invisalign", "what-problems-can-invisalign"],
    ],
  },
  {
    id: "kids", name: "Kids and teens",
    desc: "First visits, sealants, fluoride and gentle fillings with a specialist.",
    feature: "doctors-together-new", who: "Dr Parmod Gulia",
    cards: [
      ["pediatric-dentist", "paediatric-dentist-banner"],
    ],
  },
  {
    id: "gums", name: "Gums, surgery and urgent care",
    desc: "Bleeding gums, wisdom teeth, sudden pain. Same-day slots when we can.",
    feature: "contact-us", who: "either dentist",
    cards: [
      ["gum-disease", "gum-disease-treatment"],
      ["laser-dentistry", "teeth-whitening-banner"],
      ["wisdom-tooth-extraction", "post-care-tips"],
      ["teeth-cleaning", "teeth-cleaning"],
      ["general-dentistry", "why-is-dental-implant"],
      ["emergency-dentist", "rct_painless-root-canal"],
      ["toothache-treatment", "why-do-teeth-get"],
    ],
  },
];

const JUMP = GROUPS.map((g) => ({ id: g.id, name: g.name, count: g.cards.length, thumb: TI(g.feature) }));

export default function TreatmentsHub() {
  const total = GROUPS.reduce((n, g) => n + g.cards.length, 0);
  return (
    <>
      <div className="wrap">
        <p className="crumb"><Link href="/">Home</Link> / Treatments</p>
        <header className="tr-hero">
          <div>
            <p className="eb"><span className="tri"><i /><i /><i /></span>Treatments</p>
            <h1 className="d">Every treatment, <em>explained.</em></h1>
            <p className="lead">Find your treatment by what's bothering you. Not sure? Tell us, and we'll point you to the right dentist.</p>
            <div className="tr-btns">
              <Link className="btn btn-p" href="/contact-us?concern=not-sure">Help me choose <Icon name="arrow-right" cls="ic ic-sm" /></Link>
              <a className="btn btn-s" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" />Ask on WhatsApp</a>
            </div>
            <div className="tr-facts">
              <div><b className="tnum">{total + 2}</b><span>treatments</span></div>
              <div><b className="tnum">2</b><span>specialists</span></div>
              <div><b className="tnum">2</b><span>clinics in Gurugram</span></div>
            </div>
          </div>
          <div className="tr-collage">
            <figure><Image sizes="(max-width: 768px) 100vw, 760px" src={TI("expert-in-pediatric")} width={1600} height={900} alt="Dr Parmod Gulia and Dr Ruchi Goel" fetchPriority="high" /><figcaption>Dr Parmod &amp; Dr Ruchi</figcaption></figure>
            <figure><Image sizes="(max-width: 768px) 100vw, 760px" src={TI("dental-implants-banner")} width={1600} height={900} alt="Dental implant model" /><figcaption>Implants</figcaption></figure>
            <figure><Image sizes="(max-width: 768px) 100vw, 760px" src={TI("smile-makeover-banner")} width={1600} height={900} alt="A bright smile after treatment" /><figcaption>Smile design</figcaption></figure>
          </div>
        </header>
      </div>

      <TreatmentsJump groups={JUMP} />

      {GROUPS.map((g, i) => {
        const gCls = g.cards.length === 1 ? " tr-g1" : g.cards.length === 2 ? " tr-g2" : g.cards.length === 3 ? " tr-g3" : "";
        return (
          <section className={`tr-cat${i % 2 ? " tr-alt" : ""}`} id={g.id} key={g.id}>
            <div className="wrap">
              <div className="tr-ch" data-r>
                <figure><Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" decoding="async" src={TI(g.feature)} width={1600} height={900} alt={`${g.name} at Dental Krafts`} /></figure>
                <div>
                  <p className="tr-no">{String(i + 1).padStart(2, "0")} / {String(GROUPS.length).padStart(2, "0")}</p>
                  <h2 className="d">{g.name}</h2>
                  <p className="lead">{g.desc}</p>
                  <p className="tr-who">Led by <b>{g.who}</b></p>
                </div>
              </div>
              <div className={`tr-grid${gCls}`} data-r="stagger">
                {g.cards.map(([slug, img]) => {
                  const t = treatmentBySlug(slug);
                  if (!t) return null;
                  return (
                    <Link className="tr-tk" key={slug} href={`/${slug}`}>
                      <span className="tr-ph2"><Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" decoding="async" src={TI(img)} width={1600} height={900} alt={`${t.name} at Dental Krafts`} /></span>
                      <span className="tr-tx">
                        <b className="tr-t3">{t.name}</b>
                        <span>{t.sub}</span>
                        <em>Read more <i>→</i></em>
                      </span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}

      <JsonLd data={[treatmentsCollection(), breadcrumb([["Home", "/"], ["Treatments", "/treatments"]])]} />
      <section className="tr-help"><div className="wrap">
        <div className="tr-hb" data-r>
          <div>
            <h2 className="d">Not sure what you <em>need?</em></h2>
            <p>Book a consultation. We'll examine, explain and give you options, with no pressure to start that day.</p>
          </div>
          <div className="tr-btns">
            <Link className="btn btn-p" href="/contact-us">Book a visit</Link>
            <a className="btn btn-s" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" />WhatsApp</a>
          </div>
        </div>
      </div></section>
    </>
  );
}
