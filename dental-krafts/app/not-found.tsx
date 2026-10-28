import Link from "next/link";
import { Icon } from "@/components/icons";
import { clinics } from "@/content/clinics";
import { site } from "@/content/site";

export default function NotFound() {
  return (
    <section className="sec"><div className="wrap">
      <div className="band2">
        <div>
          <p className="eb"><span className="tri"><i /><i /><i /></span>Page not found</p>
          <h1 className="d h2" style={{ margin: "14px 0 0" }}>This page has moved, or <em>never existed.</em></h1>
          <p style={{ maxWidth: "46ch" }}>Try one of these, or call us — we're happy to help.</p>
          <div className="rel chips" style={{ marginTop: 20 }}>
            <Link className="chip" href="/treatments">Treatments</Link>
            <Link className="chip" href="/our-dentists">Our dentists</Link>
            <Link className="chip" href="/dental-clinic-sector-53-gurgaon">Clinic · Sector 53</Link>
            <Link className="chip" href="/dental-clinic-sector-57-gurgaon">Clinic · Sector 57</Link>
            <Link className="chip" href="/contact-us">Book a visit</Link>
          </div>
        </div>
        <div className="cta">
          {clinics.map((c) => (
            <a key={c.id} className="btn btn-p" href={c.phoneHref}><Icon name="phone-call" cls="ic ic-sm" /> Call {c.short}</a>
          ))}
          <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a>
        </div>
      </div>
    </div></section>
  );
}
