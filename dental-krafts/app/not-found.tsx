import Link from "next/link";
import { Icon } from "@/components/icons";
import { clinics } from "@/content/clinics";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <section className="ihero"><div className="wrap" style={{ paddingBlock: "clamp(40px,6vw,80px)" }}>
      <div className="band2 on-dark" style={{ background: "var(--forest-2)", boxShadow: "inset 0 0 0 1px rgba(245,228,222,.14)" }}>
        <div>
          <span className="eyebrow"><Icon name="map-route" cls="ic ic-sm" /> Page not found</span>
          <h1 className="d" style={{ color: "var(--white)", margin: "14px 0 0" }}>This page has moved, or <em>never existed.</em></h1>
          <p style={{ maxWidth: "46ch" }}>Try one of these, or call us — we're happy to help.</p>
          <div className="rel" style={{ marginTop: 20 }}>
            <Link className="chip" href="/treatments">Treatments</Link>
            <Link className="chip" href="/our-dentists">Our dentists</Link>
            <Link className="chip" href="/dental-clinic-sector-53-gurgaon">Clinic · Sector 53</Link>
            <Link className="chip" href="/dental-clinic-sector-57-gurgaon">Clinic · Sector 57</Link>
            <Link className="chip" href="/contact-us">Book a visit</Link>
          </div>
        </div>
        <div className="cta">
          {clinics.map((c) => (
            <a key={c.id} className="btn btn-w" href={c.phoneHref}><Icon name="phone-call" cls="ic ic-sm" /> Call {c.short}</a>
          ))}
          <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a>
        </div>
      </div>
    </div></section>
  );
}
