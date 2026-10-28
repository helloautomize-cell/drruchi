import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { CostsTabs } from "@/components/interactive";
import { CtaBand } from "@/components/bits";
import { fullPrices } from "@/content/prices";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Dental Treatment Costs in Gurgaon (2026) | Dental Krafts",
  description:
    "Typical costs for implants, root canals, crowns, fillings, whitening and dentures at Dental Krafts, Gurgaon. Written estimate after your consultation.",
  alternates: { canonical: "/treatment-costs" },
};

const OFFER_LD = {
  "@context": "https://schema.org",
  "@type": "Offer",
  name: "Dental consultation and treatments",
  url: `${site.domain}/treatment-costs`,
  priceCurrency: "INR",
  seller: { "@type": "Dentist", name: "Dental Krafts" },
};

export default function TreatmentCosts() {
  return (
    <>
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Treatment costs</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="coin-rupee" cls="ic ic-sm" /> Costs</span>
            <h1 className="d">What will it <em>cost?</em></h1>
            <p className="sub">Nobody likes a surprise bill. Here are our typical ranges. After your examination you'll get a written estimate for your own teeth, item by item, before any treatment starts.</p>
            <div className="cta">
              <Link className="btn btn-w" href="/contact-us">Get my estimate <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
            </div>
          </div>
          <div className="ph"><img src="/images/ai/treat-crowns.webp" alt="Ceramic dental crowns" /></div>
        </div>
      </div></section>

      <section className="cB sec"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Most asked</span><h2 className="d h2">The prices people <em>ask about first.</em></h2></div></div>
        {site.showPrices ? (
          <>
            <CostsTabs />
            <p style={{ margin: "16px 0 0", fontSize: 14, color: "var(--muted)" }}>Typical ranges, confirmed after your consultation. Your exact estimate comes after the examination and any X-rays.</p>
          </>
        ) : (
          <p className="note">Prices are shared at your consultation — call us for a range today.</p>
        )}
      </div></section>

      {site.showPrices && (
        <section className="sp p"><div className="wrap">
          <div className="head"><div><span className="eyebrow">The full list</span><h2 className="d h2">Every treatment, <em>typical range.</em></h2></div></div>
          <table className="cost">
            <thead><tr><td style={{ fontWeight: 700 }}>Treatment</td><td style={{ fontWeight: 700 }}>Typical range</td><td style={{ fontWeight: 700 }}>What changes the price</td></tr></thead>
            <tbody>
              {fullPrices.map((r) => (
                <tr key={r.item}><td>{r.item}</td><td className="tnum">{r.range}</td><td style={{ textAlign: "right", fontWeight: 400, whiteSpace: "normal" }}>{r.why}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="note">Ranges reflect our published prices. Your estimate may differ once we've examined you — we'll explain why, item by item.</p>
        </div></section>
      )}

      <section className="sp"><div className="wrap">
        <div className="head"><div><span className="eyebrow">How estimates work</span><h2 className="d h2">You'll always know <em>before</em> we start.</h2></div></div>
        <div className="steps n3">
          <div><b>Examination</b><span>Your dentist examines you and takes X-rays only if needed.</span></div>
          <div><b>Options with costs</b><span>You get options, from simplest to ideal, with the cost of each.</span></div>
          <div><b>You decide</b><span>There's no pressure to start that day.</span></div>
        </div>
      </div></section>

      <section className="sp b"><div className="wrap two">
        <div>
          <span className="eyebrow">Paying</span>
          <h2 className="d h2">Simple ways <em>to pay.</em></h2>
          <div className="prose">
            <p>Cash, UPI and cards are accepted at both clinics.</p>
            <p>Many insurance plans are accepted. Call us to check yours, and we'll give you an itemised bill for reimbursement.</p>
          </div>
        </div>
        <div className="after">
          <span className="eyebrow">Good to know</span>
          <h3 className="d" style={{ margin: "10px 0 0", fontSize: 30 }}>No pressure, ever</h3>
          <ul>
            <li><Icon name="check" />Your estimate is written down and itemised.</li>
            <li><Icon name="check" />Second opinions are welcome — bring your X-rays.</li>
            <li><Icon name="check" />If treatment can wait, we'll say so.</li>
          </ul>
        </div>
      </div></section>

      <section className="sp" style={{ paddingTop: 0 }}><div className="wrap">
        <CtaBand title="Get my" em="estimate." text="A ₹500 consultation with an examination. You'll leave with a plan and a written estimate for your teeth." book="Get my estimate" />
      </div></section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(OFFER_LD) }} />
    </>
  );
}
