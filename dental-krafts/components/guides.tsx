import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { Icon } from "./icons";
import { Eb } from "./bits";
import { GUIDE_AUTHORS, GUIDE_CATEGORIES, type Guide } from "@/content/guides";
import { clinics } from "@/content/clinics";
import { site } from "@/content/site";

/** Intrinsic sizes of the webp files in /public/images (avoids layout shift). */
const DIMS: Record<string, [number, number]> = {
  "/images/guides/child-first-dental-visit.webp": [1400, 1050],
  "/images/guides/dental-implant-vs-bridge.webp": [1400, 1050],
  "/images/guides/implant-options-diagram.webp": [1000, 1074],
  "/images/guides/kids-operatory.webp": [370, 430],
  "/images/guides/t-dental-implants.webp": [574, 400],
  "/images/guides/t-kids.webp": [900, 320],
  "/images/doctors/dr-ruchi-goel.webp": [320, 320],
  "/images/doctors/dr-parmod-gulia.webp": [320, 320],
};
export const gdDims = (src: string): [number, number] => DIMS[src] ?? [1400, 1050];

const MONTHS_L = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTHS_S = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** Deterministic ISO -> display dates (no Date.now / locale parsing). */
export const fmtLong = (iso: string) => { const [y, m, d] = iso.split("-").map(Number); return `${d} ${MONTHS_L[m - 1]} ${y}`; };
export const fmtShort = (iso: string) => { const [y, m, d] = iso.split("-").map(Number); return `${d} ${MONTHS_S[m - 1]} ${y}`; };

export const catName = (slug: string) => GUIDE_CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;

/** Tiny inline markup renderer: **bold** and [label](/path). No markdown library. */
export function Inline({ text }: { text: string }) {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let m: RegExpExecArray | null, last = 0, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1] !== undefined) out.push(<strong key={i++}>{m[1]}</strong>);
    else if (m[3].startsWith("/")) out.push(<Link key={i++} href={m[3]}>{m[2]}</Link>);
    else out.push(<a key={i++} href={m[3]} rel="noopener" target="_blank">{m[2]}</a>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}

/** Guide card — whole card clickable through the title link. `feat` = large image-left layout. */
export function GuideCard({ g, feat = false, hidden = false, h: H = "h3", sizes }: {
  g: Guide; feat?: boolean; hidden?: boolean; h?: "h2" | "h3"; sizes: string;
}) {
  const a = GUIDE_AUTHORS[g.author];
  const [w, ht] = gdDims(g.image);
  const q = `${g.title} ${g.excerpt} ${catName(g.category)}`.toLowerCase();
  return (
    <article className={`gd-card${feat ? " gd-feat" : ""}`} data-cat={g.category} data-q={q} hidden={hidden || undefined}>
      <Link className="gd-card-ph" href={`/guides/${g.slug}`} tabIndex={-1} aria-hidden="true">
        <Image src={g.image} width={w} height={ht} alt={g.imageAlt} sizes={sizes} style={{ objectPosition: g.imagePos }} loading={feat ? "eager" : "lazy"} />
      </Link>
      <div className="gd-card-bd">
        <p className="gd-kick">{feat && <span className="gd-new">New</span>}{catName(g.category)}</p>
        <H className="gd-card-t"><Link href={`/guides/${g.slug}`}>{g.title}</Link></H>
        <p className="gd-card-x">{g.excerpt}</p>
        <div className="gd-by">
          <Image src={a.img} alt="" width={36} height={36} loading="lazy" />
          <span><b>{a.name}</b><small>Reviewed {fmtShort(g.modified)} · {g.readMins} min read</small></span>
        </div>
      </div>
    </article>
  );
}

/** Related-treatment card used in the keep-reading band. */
export function TreatmentCard({ g }: { g: Guide }) {
  const [w, ht] = gdDims(g.treatment.img);
  return (
    <article className="gd-card gd-tcard">
      <Link className="gd-card-ph" href={g.treatment.href} tabIndex={-1} aria-hidden="true">
        <Image src={g.treatment.img} width={w} height={ht} alt="" sizes="(min-width:981px) 30vw, 100vw" loading="lazy" />
      </Link>
      <div className="gd-card-bd">
        <p className="gd-kick">Related treatment</p>
        <h3 className="gd-card-t"><Link href={g.treatment.href}>{g.treatment.name}</Link></h3>
        <p className="gd-card-x">{g.treatment.line}</p>
      </div>
    </article>
  );
}

const WA_ASK = "https://wa.me/919810448720?text=I%20have%20a%20question%20for%20the%20dentists";

/** Peach "Ask the dentists" card that spans two grid columns. */
export function AskCard({ hidden = false }: { hidden?: boolean }) {
  return (
    <aside className="gd-ask" hidden={hidden || undefined}>
      <Eb>Ask the dentists</Eb>
      <p className="gd-ask-t">Can’t find your question?</p>
      <p>Send it on WhatsApp. If many patients ask the same thing, it becomes our next guide.</p>
      <a className="btn btn-s btn-sm" href={WA_ASK} rel="noopener" target="_blank"><Icon name="whatsapp" cls="ic ic-sm" /> Ask on WhatsApp</a>
    </aside>
  );
}

export { WA_ASK };

/** Peach booking band — Book a visit, WhatsApp, both clinic numbers with hours. */
export function BookBand({ id }: { id: string }) {
  return (
    <section className="gd-book" aria-labelledby={id}><div className="wrap"><div className="gd-book-in">
      <div>
        <Eb>Book a visit</Eb>
        <h2 className="d gd-h2" id={id}>Questions about <em>your</em> teeth?</h2>
        <p className="lead">Call either clinic, message us on WhatsApp, or send a request and we will call you back to find a time.</p>
      </div>
      <div className="gd-book-act">
        <Link className="btn btn-p" href="/contact-us">Book a visit <Icon name="arrow-right" cls="ic ic-sm" /></Link>
        <a className="btn btn-wa" href={site.whatsappLink} rel="noopener" target="_blank"><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp us</a>
        <dl className="gd-book-cl">
          {clinics.map((c) => (
            <div key={c.id}><dt>{c.name}</dt><dd><a href={c.phoneHref} className="tnum">{c.phone}</a><span>{c.hoursLabel}</span></dd></div>
          ))}
        </dl>
        <p className="gd-fine">Both clinics are closed on Wednesdays.</p>
      </div>
    </div></div></section>
  );
}

/** Renders a guide's body blocks (lead, p, h2, lists, callout, figure, table). */
export function GuideBlocks({ g }: { g: Guide }) {
  return (
    <>
      {g.body.map((b, i) => {
        switch (b.type) {
          case "lead": return <p key={i} className="gd-intro"><Inline text={b.text} /></p>;
          case "p": return <p key={i}><Inline text={b.text} /></p>;
          case "callout": return <aside key={i} className="gd-callout" role="note"><p><Inline text={b.text} /></p></aside>;
          case "h2": return <h2 key={i} id={b.id} className="gd-bh2">{b.text}</h2>;
          case "ul": return <ul key={i} className="gd-ul">{b.items.map((li, j) => <li key={j}><Inline text={li} /></li>)}</ul>;
          case "ol": return <ol key={i} className="gd-ol">{b.items.map((li, j) => <li key={j}><Inline text={li} /></li>)}</ol>;
          case "figure": {
            const [w, ht] = gdDims(b.src);
            return <figure key={i} className="gd-fig"><Image src={b.src} width={w} height={ht} alt={b.alt} sizes="(max-width: 1180px) 100vw, 700px" loading="lazy" /><figcaption>{b.caption}</figcaption></figure>;
          }
          case "table": return (
            <figure key={i} className="gd-table">
              <div className="gd-tw">
                <table>
                  <caption>{b.caption}</caption>
                  <thead><tr>{b.cols.map((c, ci) => c ? <th key={ci} scope="col">{c}</th> : <td key={ci} />)}</tr></thead>
                  <tbody>{b.rows.map((r, ri) => <tr key={ri}><th scope="row"><Inline text={r[0]} /></th>{r.slice(1).map((cell, ci) => <td key={ci}><Inline text={cell} /></td>)}</tr>)}</tbody>
                </table>
              </div>
              <ul className="gd-tstack">
                {b.rows.map((r, ri) => (
                  <li key={ri}><b><Inline text={r[0]} /></b><dl>{b.cols.slice(1).map((c, ci) => <div key={ci}><dt>{c}</dt><dd><Inline text={r[ci + 1]} /></dd></div>)}</dl></li>
                ))}
              </ul>
            </figure>
          );
          default: return null;
        }
      })}
    </>
  );
}
