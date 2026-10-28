import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { CtaBand } from "@/components/bits";
import { treatments, treatmentGroups } from "@/content/treatments";

export const metadata: Metadata = {
  title: "Dental Treatments in Gurgaon | Implants, RCT, Kids | Dental Krafts",
  description:
    "All 21 dental treatments at Dental Krafts, Gurgaon — implants, root canals, kids' dentistry, braces, whitening and more. Specialist care, explained first.",
  alternates: { canonical: "/treatments" },
};

export default function TreatmentsHub() {
  return (
    <>
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Treatments</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="tooth" cls="ic ic-sm" /> Treatments</span>
            <h1 className="d">Every treatment, <em>explained.</em></h1>
            <p className="sub">Find your treatment by what's bothering you. Not sure? Tell us, and we'll point you to the right dentist.</p>
            <div className="cta">
              <Link className="btn btn-w" href="/contact-us?c=not-sure">Not sure — help me choose <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
            </div>
          </div>
          <div className="ph"><img src="/images/ai/treat-implants.webp" alt="A dental implant with a ceramic crown" /></div>
        </div>
      </div></section>

      <section className="sp"><div className="wrap">
        {treatmentGroups.map((g) => (
          <div className="tgrp" key={g.name} id={String(treatmentGroups.indexOf(g))}>
            <div className="gh"><b>{g.name}</b><span>{g.desc}</span></div>
            <div className="trB"><div className="list">
              {treatments.filter((t) => t.group === g.name).map((t) => (
                <Link key={t.slug} href={`/${t.slug}`} className="row">
                  <span className="badge"><Icon name={g.icon} /></span>
                  <span><b>{t.name}</b><span className="s">{t.sub}</span></span>
                  <span className="p"></span>
                  <span className="ar"><Icon name="arrow-right" cls="ic ic-sm" /></span>
                </Link>
              ))}
            </div></div>
          </div>
        ))}
      </div></section>

      <section className="sp" style={{ paddingTop: 0 }}><div className="wrap">
        <CtaBand
          title="Not sure" em="what you need?"
          text="Book a consultation. We'll examine, explain and give you options, with no pressure to start that day."
          book="Book a visit"
        />
      </div></section>
    </>
  );
}
