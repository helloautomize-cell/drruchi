import Link from "next/link";
import { Icon } from "./icons";
import { clinics } from "@/content/clinics";
import { site } from "@/content/site";

export function StickyBar() {
  return (
    <nav className="mbar" aria-label="Quick actions">
      <a className="btn btn-s" href={clinics[0].phoneHref}><Icon name="phone-call" cls="ic ic-sm" /> Call</a>
      <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a>
      <Link className="btn btn-p" href="/contact-us"><Icon name="calendar-check" cls="ic ic-sm" /> Book a visit</Link>
    </nav>
  );
}
