import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { ReelCard } from "@/components/media";
import { CtaBand } from "@/components/bits";
import { StoriesFilter } from "@/components/stories-filter";
import { reviews } from "@/content/reviews";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Patient Reviews | Dental Krafts Gurgaon | 5.0 on Practo",
  description:
    "1,000+ patient stories on Practo, rated 5.0. Real reviews of implants, root canals, kids' dentistry and more at Dental Krafts, Gurgaon.",
  alternates: { canonical: "/patient-stories" },
};

const YT = [
  { id: "AUyywhtjBjo", title: "Patient testimonial" },
  { id: "boqpk0vKBAo", title: "Happy patient testimonial" },
  { id: "CDK7IF63PZQ", title: "Best dental implant in Gurgaon" },
];

export default function PatientStories() {
  return (
    <>
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Patient stories</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="star" cls="ic ic-sm" /> Patient stories</span>
            <h1 className="d">In our patients' <em>own words.</em></h1>
            <p className="sub">1,000+ patient stories on Practo, rated 5.0. Here are some of them, unedited except for length.</p>
            <div className="cta">
              <Link className="btn btn-w" href="/contact-us">Book a visit <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
              <a className="btn btn-wa" href={site.practo} target="_blank" rel="noopener"><Icon name="star" cls="ic ic-sm" /> Read on Practo</a>
            </div>
          </div>
          <div className="ph"><img src="/images/reels/reel-07-patient-rekha-seth.webp" alt="Rekha Seth, a Dental Krafts patient" /></div>
        </div>
      </div></section>

      {/* Badges */}
      <section className="sC sec" style={{ paddingTop: 48 }}><div className="wrap">
        <div className="rate" style={{ maxWidth: 640 }}>
          <div><b className="tnum">5.0</b><span>Practo · 1,000+ patient stories</span></div>
          <div><b className="tnum">4.9</b><span>Justdial · 1,240+ ratings</span></div>
        </div>
      </div></section>

      {/* Videos */}
      <section className="sp p"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Video stories</span><h2 className="d h2">Watch them <em>say it.</em></h2></div><a className="link" href={site.youtube} target="_blank" rel="noopener">Our YouTube <Icon name="arrow-up-right" cls="ic ic-sm" /></a></div>
        <div className="reels">
          <ReelCard reel={{ file: "reel-07-patient-rekha-seth.mp4", title: "Rekha Seth on her treatment", who: "Video story · 1 min" }} />
          <ReelCard reel={{ file: "reel-08-patient-testimonial-male.mp4", title: "A patient shares his experience", who: "Video story · 1 min" }} />
          {YT.map((y) => (
            <a className="reel" key={y.id} href={`https://www.youtube.com/watch?v=${y.id}`} target="_blank" rel="noopener">
              <img src={`https://i.ytimg.com/vi/${y.id}/hqdefault.jpg`} alt="" loading="lazy" />
              <span className="play"><Icon name="play" cls="ic" /></span>
              <span className="cap"><b>{y.title}</b><span>YouTube</span></span>
            </a>
          ))}
        </div>
      </div></section>

      {/* All reviews */}
      <section className="sp"><div className="wrap">
        <div className="head"><div><span className="eyebrow">Every story we could verify</span><h2 className="d h2">Filter by treatment <em>or dentist.</em></h2></div></div>
        <StoriesFilter reviews={reviews} />
        <div className="rel" style={{ marginTop: 26 }}>
          <span className="chip">More reviews:</span>
          <a className="chip" href={site.practo} target="_blank" rel="noopener">Practo <Icon name="arrow-up-right" cls="ic ic-sm" /></a>
          <a className="chip" href={site.justdial} target="_blank" rel="noopener">Justdial <Icon name="arrow-up-right" cls="ic ic-sm" /></a>
        </div>
      </div></section>

      {/* Closing */}
      <section className="sp" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="band2" style={{ marginBottom: 16 }}>
          <div>
            <h2 className="d">Had a visit <em>with us?</em></h2>
            <p>Share your story on Practo or Google — it helps other patients choose.</p>
          </div>
          <div className="cta">
            <a className="btn btn-w" href={site.practo} target="_blank" rel="noopener">Review on Practo <Icon name="arrow-up-right" cls="ic ic-sm" /></a>
          </div>
        </div>
        <CtaBand title="Ready to be" em="the next story?" text="Book a ₹500 consultation. You'll leave with a plan and a written estimate." />
      </div></section>
    </>
  );
}
