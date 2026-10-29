import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { BaShowcase } from "@/components/ba-slider";
import { QA, Eb } from "@/components/bits";
import { Toc } from "@/components/interactive";
import { treatments, treatmentBySlug, treatmentGroups } from "@/content/treatments";
import { treatmentImages } from "@/content/treatment-images";
import { doctorById } from "@/content/doctors";
import { clinics } from "@/content/clinics";
import { caseByFile } from "@/content/results";
import { reviewById } from "@/content/reviews";
import { site } from "@/content/site";
import { JsonLd, medicalProcedure, medicalWebPage, faqPage, breadcrumb } from "@/lib/schema";
import { emLast } from "@/lib/inner";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = treatmentBySlug(slug);
  if (!t) notFound();
  return { title: t.metaTitle, description: t.metaDesc, alternates: { canonical: `/${t.slug}` } };
}

const WHO = {
  ruchi: { label: "Dr Ruchi Goel", href: "/dr-ruchi-goel", img: "/images/ai/dr-ruchi-portrait.webp" },
  parmod: { label: "Dr Parmod Gulia", href: "/dr-parmod-gulia", img: "/images/ai/dr-parmod-portrait.webp" },
  either: { label: "Either dentist", href: "/our-dentists", img: "/images/ai/doctors-duo.webp" },
} as const;

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = treatmentBySlug(slug);
  if (!t) notFound();

  const group = treatmentGroups.find((g) => g.name === t.group);
  const who = WHO[t.doctor];
  const imgs = treatmentImages[t.slug] ?? [];
  const GsImg = ({ i }: { i: number }) => imgs[i] ? (
    <figure className="gsim"><Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" decoding="async" src={imgs[i].src} width={1200} height={800} alt={imgs[i].alt} /><figcaption>{imgs[i].alt}</figcaption></figure>
  ) : null;
  const results = t.resultFiles.map(caseByFile).filter((c): c is NonNullable<typeof c> => Boolean(c && c.consent !== false));
  const revs = t.reviewIds.map(reviewById).filter(Boolean);
  const rel = t.related.map(treatmentBySlug).filter(Boolean).slice(0, 4);

  const toc: [string, string][] = [
    ...(t.forYou.length ? [["t-for", "Is this for you?"] as [string, string]] : []),
    ["t-how", "How it works"],
    ...(t.options.length ? [["t-opt", "Your options"] as [string, string]] : []),
    ...(t.steps.length ? [["t-steps", "Step by step"] as [string, string]] : []),
    ["t-plan", "Before anything starts"],
    ...(results.length ? [["t-res", "Results"] as [string, string]] : []),
    ["t-care", "Aftercare"],
    ["t-faq", "Questions"],
  ];

  const LD = [
    medicalProcedure(t),
    medicalWebPage(t),
    faqPage(t.faqs),
    breadcrumb([["Home", "/"], ["Treatments", "/treatments"], [t.name, `/${t.slug}`]]),
  ];

  return (
    <>
      {/* 1 · Hero */}
      <section className="th"><div className="wrap">
        <div>
          <nav className="crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><i>/</i><Link href="/treatments">Treatments</Link><i>/</i><span>{t.name}</span></nav>
          <Eb>{t.eyebrow}</Eb>
          <h1 className="d h1m">{emLast(t.h1)}</h1>
          <p className="sub">{t.sub}</p>
          <div className="row">
            <Link className="btn btn-p" href={`/contact-us?concern=${encodeURIComponent(t.name)}`}>Book a consultation <Icon name="arrow-right" cls="ic ic-sm" /></Link>
            <a className="btn btn-wa" href={`https://wa.me/919810448720?text=${encodeURIComponent(`Hello Dental Krafts, I'd like to ask about ${t.name.toLowerCase()}.`)}`}><Icon name="whatsapp" cls="ic ic-sm" /> Ask on WhatsApp</a>
          </div>
        </div>
        <div className="ph"><Image sizes="(max-width: 768px) 100vw, 760px" src={t.heroImage} width={1536} height={1024} alt={t.heroAlt} fetchPriority="high" /></div>
      </div></section>

      {/* 2 · Facts bar */}
      <section className="f4" aria-label="Key facts"><div className="wrap">
        <div><small>Planned by</small><Link className="who" href={who.href} style={{ textDecoration: "none", color: "inherit" }}><Image sizes="(max-width: 768px) 100vw, 760px" src={who.img} width={60} height={60} alt="" /><b>{who.label}</b></Link></div>
        <div><small>Planning</small><b>Explained first</b><span className="fine">itemised before anything starts</span></div>
        <div><small>First visit</small><b>Exam &amp; X-rays</b><span className="fine">only if they're needed</span></div>
        <div><small>{t.urgent ? "Urgent cases" : "You leave with"}</small><b>{t.urgent ? "Same-day slots" : "A written plan"}</b><span className="fine">{t.urgent ? "when we can — call first" : "options and visits, in writing"}</span></div>
      </div></section>

      {/* 3 · Guide */}
      <section className="sec"><div className="wrap gd">
        <Toc links={toc} />
        <div>
          {t.forYou.length > 0 && (
            <section className="gs" id="t-for">
              <Eb>Is this for you?</Eb>
              <h2 className="d h2">If any of these sound <em>familiar</em>.</h2>
              <ul className="fit">
                {t.forYou.map((f) => <li key={f.title}><Icon name="check" /><span><b>{f.title}.</b> {f.text}</span></li>)}
              </ul>
              <GsImg i={0} />
            </section>
          )}
          <section className="gs" id="t-how">
            <Eb>How it works</Eb>
            <h2 className="d h2">{emLast(t.howTitle)}</h2>
            {t.howText.map((p, i) => <p key={i}>{p}</p>)}
            <GsImg i={1} />
          </section>
          {t.options.length > 0 && (
            <section className="gs" id="t-opt">
              <Eb>Your options</Eb>
              <h2 className="d h2">Ways to <em>treat it</em>.</h2>
              <div className="opts">
                {t.options.map((o) => <div key={o.title}><b>{o.title}</b><span>{o.text}</span></div>)}
              </div>
              <GsImg i={2} />
            </section>
          )}
          {t.steps.length > 0 && (
            <section className="gs" id="t-steps">
              <Eb>Step by step</Eb>
              <h2 className="d h2">What happens, and <em>when</em>.</h2>
              <ol className="tline">
                {t.steps.map((s) => <li key={s.title}><div><b>{s.title}</b><span>{s.text}</span></div></li>)}
              </ol>
              <GsImg i={3} />
            </section>
          )}
          <section className="gs" id="t-plan">
            <Eb>Before anything starts</Eb>
            <h2 className="d h2">A written plan, <em>itemised</em>.</h2>
            <p>After the examination you get a written plan: your options, what each step involves and how many visits it takes — itemised part by part. You decide before anything begins, and there's no pressure to start that day.</p>
            <ul className="fit" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
              <li><Icon name="check" /><span><b>Options, simplest to ideal.</b> You'll hear the honest trade-offs of each.</span></li>
              <li><Icon name="check" /><span><b>Everything in writing.</b> Take it home, ask anything, decide when you're ready.</span></li>
              <li><Icon name="check" /><span><b>Second opinions welcome.</b> Bring your X-rays and the plan you were given.</span></li>
            </ul>
          </section>
          {results.length > 0 && (
            <section className="gs" id="t-res">
              <Eb>Results</Eb>
              <h2 className="d h2">{t.name} cases from our <em>chairs</em>.</h2>
              <p className="case-k" data-k style={{ marginTop: 0 }}>{results[0]!.cat}</p>
              <p className="case-c" data-c style={{ fontSize: 24, marginTop: 6 }}>{results[0]!.caption}</p>
              <div className="ba-sm"><BaShowcase cases={results} /></div>
              <p className="fine" style={{ marginTop: 14 }}>Shared with patient consent. Individual results vary. <Link className="tl" href="/gallery">All results</Link></p>
            </section>
          )}
          {revs.length > 0 && (
            <section className="gs">
              <blockquote className="bq">“{revs[0].quote}”<cite><b>{revs[0].name}</b> · {revs[0].treatment} · verified on Practo</cite></blockquote>
            </section>
          )}
          <section className="gs" id="t-care">
            <Eb>Aftercare</Eb>
            <h2 className="d h2">Looking after it <em>afterwards</em>.</h2>
            <div className="care">
              {t.aftercare.map((a) => {
                const m = a.match(/^([^:–—]{3,60})[:–—]\s*(.+)$/);
                return <div key={a}>{m ? <><b>{m[1]}</b><span>{m[2]}</span></> : <span>{a}</span>}</div>;
              })}
            </div>
            <GsImg i={4} />
          </section>
          <section className="gs" id="t-faq">
            <Eb>Questions</Eb>
            <h2 className="d h2">What people <em>ask</em> us.</h2>
            <div>{t.faqs.map((f) => <QA key={f.q} q={f.q} a={f.a} />)}</div>
          </section>
        </div>
      </div></section>

      {/* 4 · Related */}
      {rel.length > 0 && (
        <section className="sec tint-white bt"><div className="wrap">
          <div className="sh">
            <Eb>Related</Eb>
            <h2 className="d h2">You might also <em>read</em>.</h2>
          </div>
          <div className="rel">
            {rel.map((r) => (
              <Link key={r!.slug} href={`/${r!.slug}`}><div className="ph"><Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" src={r!.heroImage} width={1536} height={1024} alt="" /></div><b>{r!.name} <Icon name="arrow-right" cls="ic ic-sm" /></b><span>{r!.sub.slice(0, 60)}</span></Link>
            ))}
          </div>
        </div></section>
      )}

      {/* 5 · Urgent + CTA */}
      {t.urgent && (
        <section className="cta"><div className="wrap">
          <div>
            <Eb>In pain right now?</Eb>
            <h2 className="d h2" style={{ marginTop: 22 }}>Call the nearest <em>clinic</em>.</h2>
            <p className="lead" style={{ marginTop: 14 }}>During working hours we try to see urgent cases the same day.</p>
          </div>
          <div className="row">
            {clinics.map((c) => <a key={c.id} className="btn btn-p" href={c.phoneHref}><Icon name="phone-call" cls="ic ic-sm" /> Call {c.short}</a>)}
          </div>
        </div></section>
      )}
      <section className="cta"><div className="wrap">
        <div>
          <Eb>{`Questions about ${t.name.toLowerCase()}?`}</Eb>
          <h2 className="d h2" style={{ marginTop: 22 }}>Leave with a plan and a written <em>estimate</em>.</h2>
        </div>
        <div className="row"><a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a><Link className="btn btn-p" href={`/contact-us?concern=${encodeURIComponent(t.name)}`}>Book a consultation <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
      </div></section>

      <JsonLd data={LD} />
    </>
  );
}
