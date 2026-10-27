import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { CtaBand } from "@/components/bits";
import { GalleryGrid } from "@/components/gallery-grid";
import { visibleCases } from "@/content/results";

export const metadata: Metadata = {
  title: "Before & After Dental Results | Dental Krafts Gurgaon",
  description:
    "Real before-and-after results from Dental Krafts patients — implants, crowns, dentures, full-mouth rehabilitation, veneers and whitening. Shared with consent.",
  alternates: { canonical: "/gallery" },
};

export default function Gallery() {
  return (
    <>
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Results</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="smile" cls="ic ic-sm" /> Real patients · real results</span>
            <h1 className="d">Results from <em>our own</em> chairs.</h1>
            <p className="sub">Real Dental Krafts patients, shared with their consent. Tap any case to compare before and after.</p>
            <div className="cta">
              <Link className="btn btn-w" href="/contact-us">Book a consultation <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
            </div>
          </div>
          <div className="ph">
            <img src="/images/results/split/ba-13-smile-makeover__after.webp" alt="After a smile makeover with ceramic crowns" />
          </div>
        </div>
      </div></section>

      <section className="sp"><div className="wrap">
        <GalleryGrid cases={visibleCases} />
        <p className="note" style={{ marginTop: 24 }}>Shared with patient consent. Results vary from person to person — your dentist will show you what's realistic for your teeth.</p>
      </div></section>

      <section className="sp" style={{ paddingTop: 0 }}><div className="wrap">
        <CtaBand title="Want results" em="like these?" text="Book a ₹500 consultation. We'll show you what's possible for your teeth, with a written plan and estimate." />
      </div></section>
    </>
  );
}
