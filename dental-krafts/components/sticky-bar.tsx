"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { clinics } from "@/content/clinics";
import { site } from "@/content/site";

/** Mobile action bar — hidden until the first section (hero) scrolls out of view. */
export function StickyBar() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("main > section:first-of-type");
    const onS = () => {
      const bottom = hero ? hero.getBoundingClientRect().bottom : -1;
      setShow(bottom < 0 || (!hero && window.scrollY > 520));
    };
    onS();
    addEventListener("scroll", onS, { passive: true });
    return () => removeEventListener("scroll", onS);
  }, []);
  return (
    <nav className={`mbar${show ? " show" : ""}`} aria-label="Quick actions">
      <a className="btn btn-s" href={clinics[0].phoneHref}><Icon name="phone-call" cls="ic ic-sm" /> Call</a>
      <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a>
      <Link className="btn btn-p" href="/contact-us">Book a visit</Link>
    </nav>
  );
}
