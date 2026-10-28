import Link from "next/link";
import { Icon } from "./icons";
import { site } from "@/content/site";

/** Tri rule that opens every eyebrow. */
export function Tri() {
  return <span className="tri"><i /><i /><i /></span>;
}

/** Eyebrow with tri rule. `r`/`delay` opt into the motion layer's reveals. */
export function Eb({ children, r, delay }: { children: React.ReactNode; r?: boolean | "left" | "stagger"; delay?: number }) {
  return (
    <p className="eb" {...(r === undefined ? {} : { "data-r": r === true ? "" : r })} {...(delay === undefined ? {} : { "data-delay": delay })}>
      <Tri />{children}
    </p>
  );
}

/** FAQ row (details/summary accordion, 32px round +/×). */
export function QA({ q, a }: { q: string; a: string }) {
  return (
    <details className="fq"><summary>{q}<span className="pl"><Icon name="plus" cls="ic ic-sm" /></span></summary><p>{a}</p></details>
  );
}

/** Sage CTA band: eyebrow + H2 left, buttons right. */
export function CtaBand({ title, em, text, book = "Book a visit", eyebrow = "Book a visit" }: { title: string; em: string; text: string; book?: string; eyebrow?: string }) {
  return (
    <section className="cta">
      <div className="wrap">
        <div>
          <Eb>{eyebrow}</Eb>
          <h2 className="d h2" style={{ marginTop: 22 }}>{title} <em>{em}</em></h2>
          <p className="lead" style={{ marginTop: 14 }}>{text}</p>
        </div>
        <div className="row">
          <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a>
          <Link className="btn btn-p" href="/contact-us">{book} <Icon name="arrow-right" cls="ic ic-sm" /></Link>
        </div>
      </div>
    </section>
  );
}

/** Quote card (Fraunces quote + initials/avatar). */
export function QuoteCard({ q, name, sub, avatar }: { q: string; name: string; sub: string; avatar?: string }) {
  return (
    <div className="qc">
      <span className="stars"><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /><Icon name="star" cls="ic ic-sm fill" /></span>
      <p>“{q}”</p>
      <div className="who">
        {avatar ? <img src={avatar} alt="" /> : <span className="ini">{name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>}
        <span><b>{name}</b> · {sub}</span>
      </div>
    </div>
  );
}
