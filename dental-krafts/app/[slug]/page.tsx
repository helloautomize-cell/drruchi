import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { BaSlider } from "@/components/ba-slider";
import { QA, CtaBand } from "@/components/bits";
import { treatments, treatmentBySlug, treatmentGroups } from "@/content/treatments";
import { doctorById } from "@/content/doctors";
import { clinics } from "@/content/clinics";
import { caseByFile } from "@/content/results";
import { reviewById } from "@/content/reviews";
import { site } from "@/content/site";
import { emLast } from "@/lib/inner";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const t = treatmentBySlug(slug);
  if (!t) return {};
  return {
    title: t.metaTitle,
    description: t.metaDesc,
    alternates: { canonical: `/${t.slug}` },
  };
}

const WHO = {
  ruchi: { label: "Usually with Dr Ruchi Goel", href: "/dr-ruchi-goel" },
  parmod: { label: "Usually with Dr Parmod Gulia", href: "/dr-parmod-gulia" },
  either: { label: "With either dentist", href: "/our-dentists" },
} as const;

export default async function TreatmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = treatmentBySlug(slug);
  if (!t) notFound();

  const group = treatmentGroups.find((g) => g.name === t.group);
  const who = WHO[t.doctor];
  const doctor = t.doctor !== "either" ? doctorById(t.doctor) : null;
  const results = t.resultFiles.map(caseByFile).filter((c) => c && c.consent !== false);
  const revs = t.reviewIds.map(reviewById).filter(Boolean).slice(0, 3);
  const stepCls = t.steps.length === 5 ? " n5" : t.steps.length === 4 ? " n4" : t.steps.length === 3 ? " n3" : "";
  const optCls = t.options.length >= 5 ? "cards c5" : t.options.length === 4 ? "cards c4" : "cards";

  const LD = [
    {
      "@context": "https://schema.org",
      "@type": "MedicalProcedure",
      name: t.name,
      alternateName: t.h1,
      description: t.sub,
      url: `${site.domain}/${t.slug}`,
      procedureType: "https://schema.org/TherapeuticProcedure",
      bodyLocation: "Teeth and mouth",
      provider: { "@type": "Dentist", name: "Dental Krafts", url: site.domain },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
        { "@type": "ListItem", position: 2, name: "Treatments", item: `${site.domain}/treatments` },
        { "@type": "ListItem", position: 3, name: t.name, item: `${site.domain}/${t.slug}` },
      ],
    },
  ];

  return (
    <>
      {/* 1 · Hero */}
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / <Link href="/treatments">Treatments</Link> / {t.name}</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name={group?.icon ?? "tooth"} cls="ic ic-sm" /> {t.eyebrow}</span>
            <h1 className="d">{emLast(t.h1)}</h1>
            <p className="sub">{t.sub}</p>
            <div className="chips">
              <Link className="chip who" href={who.href}>
                {t.doctor === "either" ? (
                  <>
                    <img src="/images/ai/dr-ruchi-portrait.webp" alt="" />
                    <img src="/images/ai/dr-parmod-portrait.webp" alt="" style={{ marginLeft: -14 }} />
                  </>
                ) : (
                  <img src={doctor!.portrait} alt="" />
                )}
                {who.label}
              </Link>
              {t.costChip && <span className="chip"><Icon name="coin-rupee" cls="ic ic-sm" /> {t.costChip}</span>}
              {t.urgent && <span className="chip"><Icon name="clock" cls="ic ic-sm" /> Same-day slots when we can</span>}
            </div>
            <div className="cta">
              <Link className="btn btn-w" href={`/contact-us?concern=${encodeURIComponent(t.name)}`}>Book a consultation <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
              <a className="btn btn-wa" href={`https://wa.me/919810448720?text=${encodeURIComponent(`Hello Dental Krafts, I'd like to ask about ${t.name.toLowerCase()}.`)}`}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a>
            </div>
          </div>
          <div className="ph">
            <img src={t.heroImage} alt={t.heroAlt} />
            {t.heroCard && <div className="glass fl f1"><span><b>{t.heroCard.b}</b><small>{t.heroCard.s}</small></span></div>}
          </div>
        </div>
      </div></section>

      {/* 2 · Is this for you */}
      {t.forYou.length > 0 && (
        <section className="sp"><div className="wrap">
          <div className="head"><div><span className="eyebrow">Is this for you?</span><h2 className="d h2">When {t.name.toLowerCase()} <em>makes sense.</em></h2></div></div>
          <div className={t.forYou.length >= 5 ? "cards c5" : "cards c4"}>
            {t.forYou.map((f) => (
              <div className="cd" key={f.title}><span className="badge"><Icon name={f.icon} /></span><b>{f.title}</b><span>{f.text}</span></div>
            ))}
          </div>
        </div></section>
      )}

      {/* 3 · How it works */}
      <section className="sp p"><div className="wrap two">
        {t.supportImage && <div className="ph"><img src={t.supportImage} alt={t.supportAlt ?? ""} loading="lazy" /></div>}
        <div>
          <span className="eyebrow">How it works</span>
          <h2 className="d h2">{emLast(t.howTitle)}</h2>
          <div className="prose">{t.howText.map((p, i) => <p key={i}>{p}</p>)}</div>
        </div>
      </div></section>

      {/* 4 · Your options */}
      {t.options.length > 0 && (
        <section className="sp"><div className="wrap">
          <div className="head"><div><span className="eyebrow">Your options</span><h2 className="d h2">Ways to <em>treat it.</em></h2></div></div>
          <div className={optCls}>
            {t.options.map((o) => <div className="cd" key={o.title}><b>{o.title}</b><span>{o.text}</span></div>)}
          </div>
        </div></section>
      )}

      {/* 5 · Step by step */}
      {t.steps.length > 0 && (
        <section className="sp b"><div className="wrap">
          <div className="head"><div><span className="eyebrow">Step by step</span><h2 className="d h2">What <em>happens</em>, and when.</h2></div></div>
          <div className={`steps${stepCls}`}>
            {t.steps.map((s) => <div key={s.title}><b>{s.title}</b><span>{s.text}</span></div>)}
          </div>
        </div></section>
      )}

      {/* 6 · Results */}
      {results.length > 0 && (
        <section className="sp"><div className="wrap">
          <div className="head"><div><span className="eyebrow">Results</span><h2 className="d h2">{t.name} cases from <em>our clinics.</em></h2></div><Link className="link" href="/gallery">All results <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
          <div className="res3">
            {results.map((c) => (
              <figure key={c!.file}>
                <BaSlider file={c!.file} />
                <figcaption>{c!.cat}<span>{c!.caption}</span></figcaption>
              </figure>
            ))}
          </div>
          <p className="note">Shared with patient consent. Individual results vary.</p>
        </div></section>
      )}

      {/* 7 · Cost + Aftercare */}
      <section className="sp p"><div className="wrap two" style={{ alignItems: "start" }}>
        <div>
          <span className="eyebrow">Cost</span>
          <h2 className="d h2">Typical <em>cost.</em></h2>
          {t.costRows && t.costRows.length > 0 ? (
            <>
              <table className="cost"><tbody>
                {t.costRows.map((r) => (
                  <tr key={r.item} className={r.total ? "t" : undefined}><td>{r.item}</td><td className="tnum">{r.range}</td></tr>
                ))}
              </tbody></table>
              <p className="note">Typical range, confirmed after your consultation. Your estimate itemises each part.</p>
            </>
          ) : (
            <p className="lead" style={{ fontSize: 16 }}>Quoted after your examination — you'll get a written, itemised estimate before anything starts. <Link className="link" href="/treatment-costs">See typical ranges <Icon name="arrow-right" cls="ic ic-sm" /></Link></p>
          )}
        </div>
        <div className="after">
          <span className="eyebrow">Aftercare</span>
          <h3 className="d" style={{ margin: "10px 0 0", fontSize: 30, color: "var(--white)" }}>Looking after it afterwards</h3>
          <ul>
            {t.aftercare.map((a) => <li key={a}><Icon name="check" />{a}</li>)}
          </ul>
        </div>
      </div></section>

      {/* 8 · Reviews */}
      {revs.length > 0 && (
        <section className="sp"><div className="wrap">
          <div className="head"><div><span className="eyebrow">What patients say</span><h2 className="d h2">In our patients' <em>own words.</em></h2></div><Link className="link" href="/patient-stories">All stories <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
          <div className="qs" style={{ "--qn": Math.max(revs.length, 1) } as React.CSSProperties}>
            {revs.map((r) => (
              <blockquote key={r.id}><p>“{r.quote}”</p><cite>{r.name}<span>{r.treatment}</span></cite></blockquote>
            ))}
          </div>
        </div></section>
      )}

      {/* 9 · FAQ + related */}
      <section className="sp"><div className="wrap fw">
        <div>
          <span className="eyebrow">FAQ</span>
          <h2 className="d h2">{emLast(`${t.name} questions.`)}</h2>
          <p className="lead">Ask us anything on WhatsApp before you book.</p>
          <div className="rel">
            <span className="chip">Related:</span>
            {t.related.map((r) => {
              const rt = treatmentBySlug(r);
              return rt ? <Link key={r} className="chip" href={`/${r}`}>{rt.name}</Link> : null;
            })}
            <Link className="chip" href="/treatment-costs">Treatment costs</Link>
            <Link className="chip" href="/gallery">Results</Link>
          </div>
        </div>
        <div>{t.faqs.map((f) => <QA key={f.q} q={f.q} a={f.a} />)}</div>
      </div></section>

      {/* 10 · Urgent call block + CTA */}
      <section className="sp" style={{ paddingTop: 0 }}><div className="wrap">
        {t.urgent && (
          <div className="band2 on-dark" style={{ marginBottom: 16 }}>
            <div>
              <h2 className="d">In pain <em>right now?</em></h2>
              <p>Call the nearest clinic. During working hours we try to see urgent cases the same day.</p>
            </div>
            <div className="cta">
              {clinics.map((c) => (
                <a key={c.id} className="btn btn-w" href={c.phoneHref}><Icon name="phone-call" cls="ic ic-sm" /> Call {c.short}</a>
              ))}
              <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> WhatsApp</a>
            </div>
          </div>
        )}
        <CtaBand
          title={`Questions about ${t.name.toLowerCase()}?`}
          em="Ask first."
          text="Book a ₹500 consultation. You'll leave with a plan and a written estimate."
        />
      </div></section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
    </>
  );
}
