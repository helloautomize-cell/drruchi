import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { CtaBand } from "@/components/bits";
import { reviewById } from "@/content/reviews";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Dental Treatment in India for International Patients | Dental Krafts Gurgaon",
  description:
    "Implants, smile makeovers and root canals in Gurgaon, near Delhi airport, by AIIMS & PGIMER-trained specialists. Send photos on WhatsApp for a plan and estimate.",
  alternates: { canonical: "/medical-tourism" },
};

const usp = reviewById("usp");

export default function MedicalTourism() {
  return (
    <>
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / International patients</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="globe" cls="ic ic-sm" /> International patients</span>
            <h1 className="d">Dental treatment in Gurgaon, planned around <em>your trip.</em></h1>
            <p className="sub">Specialist care from AIIMS and PGIMER-trained dentists, close to Delhi's international airport, with a written plan and estimate before you fly.</p>
            <div className="cta">
              <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> Send photos on WhatsApp</a>
              <Link className="btn btn-w" href="/contact-us">Book a visit <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
            </div>
          </div>
          <div className="ph"><img src="/images/ai/doctors-duo.webp" alt="Dr Ruchi Goel and Dr Parmod Gulia" /></div>
        </div>
      </div></section>

      {/* How it works */}
      <section className="sp"><div className="wrap">
        <div className="head"><div><span className="eyebrow">How it works</span><h2 className="d h2">Start from <em>wherever</em> you are.</h2></div></div>
        <div className="steps n5">
          <div><b>Send photos and X-rays</b><span>On WhatsApp (+91 98104 48720). Recent X-rays help us plan better.</span></div>
          <div><b>Get a provisional plan</b><span>From Dr Ruchi or Dr Parmod, with an estimate.</span></div>
          <div><b>Plan your visit</b><span>We'll suggest how many days you need and space the appointments.</span></div>
          <div><b>Treatment in Gurgaon</b><span>At our Golf Course Road or Sushant Lok 2 clinic.</span></div>
          <div><b>Follow-up</b><span>A written summary, your X-rays, and video check-ins after you go home.</span></div>
        </div>
      </div></section>

      {/* Typical time */}
      <section className="sp p"><div className="wrap two" style={{ alignItems: "start" }}>
        <div>
          <span className="eyebrow">Typical time in Gurgaon</span>
          <h2 className="d h2">How long <em>to plan</em> for.</h2>
          <table className="cost"><tbody>
            <tr><td>Root canals and crowns</td><td className="tnum">3–5 days</td></tr>
            <tr><td>Veneers / smile makeover</td><td className="tnum">7–10 days</td></tr>
            <tr><td>Dental implants</td><td className="tnum">Two trips, 3–6 months apart</td></tr>
            <tr><td>All-on-4 fixed teeth</td><td className="tnum">5–7 days, then a second trip</td></tr>
          </tbody></table>
          <p className="note">Timelines depend on your case — implants sometimes offer immediate-load options when suitable. We'll confirm on WhatsApp.</p>
        </div>
        <div>
          <span className="eyebrow">One patient's trip</span>
          <div className="qs" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
            <blockquote>
              <p>“{usp.quote}”</p>
              <cite>{usp.name}<span>{usp.treatment} · {usp.source}</span></cite>
            </blockquote>
          </div>
        </div>
      </div></section>

      {/* Why Gurgaon */}
      <section className="sp"><div className="wrap two">
        <div className="ph"><img src="/images/clinic/reception-lounge.webp" alt="The Dental Krafts reception" loading="lazy" /></div>
        <div>
          <span className="eyebrow">Why Gurgaon</span>
          <h2 className="d h2">Specialist care, <em>fraction</em> of the cost.</h2>
          <div className="prose">
            <p>Gurgaon has modern clinics and English-speaking specialists, at costs a fraction of those in the US, UK, Australia or the Gulf — with Delhi's hotels, food and sights next door.</p>
            <p>You'll get a written treatment plan and estimate you can share with your insurer, and we'll plan visits around your travel dates.</p>
          </div>
          <div className="rel">
            <Link className="chip" href="/japanese">日本語</Link>
            <Link className="chip" href="/korean">한국어</Link>
            <Link className="chip" href="/treatment-costs">Typical costs</Link>
          </div>
        </div>
      </div></section>

      <section className="sp" style={{ paddingTop: 0 }}><div className="wrap">
        <CtaBand title="Send photos" em="on WhatsApp." text="Send us your photos and X-rays. A specialist replies with a provisional plan and estimate." book="WhatsApp us" />
      </div></section>
    </>
  );
}
