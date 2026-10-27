import Link from "next/link";
import { Icon } from "./icons";

/** FAQ row (details/summary accordion). */
export function QA({ q, a }: { q: string; a: string }) {
  return (
    <details className="qa"><summary>{q}<span className="pm"><Icon name="plus" cls="ic ic-sm" /></span></summary><p>{a}</p></details>
  );
}

/** Forest CTA band. */
export function CtaBand({ title, em, text, book = "Book a visit" }: { title: string; em: string; text: string; book?: string }) {
  return (
    <div className="band2 on-dark">
      <div><h2 className="d">{title} <em>{em}</em></h2><p>{text}</p></div>
      <div className="cta">
        <Link className="btn btn-w" href="/contact-us">{book} <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
        <a className="btn btn-wa" href="https://wa.me/919810448720"><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a>
      </div>
    </div>
  );
}

/** Quote card (Fraunces quote + initials/avatar). */
export function QuoteCard({ q, name, sub, avatar }: { q: string; name: string; sub: string; avatar?: string }) {
  return (
    <div className="qc">
      <span className="stars"><Icon name="star" cls="ic ic-sm" /><Icon name="star" cls="ic ic-sm" /><Icon name="star" cls="ic ic-sm" /><Icon name="star" cls="ic ic-sm" /><Icon name="star" cls="ic ic-sm" /></span>
      <p>“{q}”</p>
      <div className="who">
        {avatar ? <img src={avatar} alt="" /> : <span className="ini">{name.split(" ").map((w) => w[0]).slice(0, 2).join("")}</span>}
        <span><b>{name}</b> · {sub}</span>
      </div>
    </div>
  );
}
