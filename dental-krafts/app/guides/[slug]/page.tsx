import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { GuideBlocks, GuideCard, TreatmentCard, BookBand, Inline, fmtLong, gdDims } from "@/components/guides";
import { GuideToc, ShareButtons } from "@/components/guides-client";
import { GUIDES, GUIDE_CATEGORIES, GUIDE_AUTHORS, getGuide } from "@/content/guides";
import { site } from "@/content/site";
import { JsonLd, guideArticleGraph } from "@/lib/schema";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();
  return {
    title: { absolute: g.seoTitle },
    description: g.dek,
    alternates: { canonical: `/guides/${g.slug}` },
    openGraph: { images: [g.image] },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const cat = GUIDE_CATEGORIES.find((c) => c.slug === g.category)!;
  const author = GUIDE_AUTHORS[g.author];
  const rev = GUIDE_AUTHORS[g.reviewer];
  const url = `${site.domain}/guides/${g.slug}`;
  const sections = g.body.filter((b) => b.type === "h2");
  const toc = [
    ...sections.map((s) => ({ id: s.id, label: s.text })),
    { id: "takeaways", label: "Key takeaways" },
    { id: "faq", label: "Common questions" },
    { id: "sources", label: "Sources" },
  ];
  const others = GUIDES.filter((x) => x.slug !== g.slug);
  const [w, h] = gdDims(g.image);
  const [tw, th] = gdDims(g.treatment.img);

  return (
    <>
      <section className="gd-ahero"><div className="wrap">
        <nav className="gd-crumb" aria-label="Breadcrumb"><ol>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/guides">Patient guides</Link></li>
          <li><Link href={`/guides/category/${cat.slug}`}>{cat.name}</Link></li>
          <li aria-current="page">{g.title}</li>
        </ol></nav>
        <div className="gd-ahero-g">
          <div className="gd-ahero-t">
            <Link className="gd-cat" href={`/guides/category/${cat.slug}`}>{cat.name}</Link>
            <h1 className="d gd-ah1" id={`t-${g.slug}`}>{g.title}</h1>
            <p className="lead gd-dek">{g.dek}</p>
            <div className="gd-byline">
              <div className="gd-faces"><Image src={author.img} alt="" width={48} height={48} /><Image src={rev.img} alt="" width={48} height={48} /></div>
              <p>Written by <Link href={author.url}>{author.name}</Link>, {author.role}<br />Medically reviewed by <Link href={rev.url}>{rev.name}</Link></p>
            </div>
            <p className="gd-meta"><span>Updated <time dateTime={g.modified}>{fmtLong(g.modified)}</time></span><span>{g.readMins} min read</span></p>
            <details className="gd-mtoc"><summary>In this guide <Icon name="chevron-down" cls="ic ic-sm" /></summary><ol>{toc.map((l) => <li key={l.id}><a href={`#${l.id}`}>{l.label}</a></li>)}</ol></details>
          </div>
          <figure className="gd-ahero-ph"><Image src={g.image} alt={g.imageAlt} width={w} height={h} sizes="(max-width: 980px) 100vw, 46vw" priority style={{ objectPosition: g.imagePos }} /></figure>
        </div>
      </div></section>

      <article className="gd-art" aria-labelledby={`t-${g.slug}`}>
      <div className="wrap gd-body">
        <GuideToc links={toc} url={url} title={g.title} />
        <div className="gd-prose">
          <aside className="gd-quick" aria-label="Quick answer">
            <p className="gd-quick-h"><span className="tri" aria-hidden="true"><i /><i /><i /></span>Quick answer</p>
            <p><Inline text={g.quick} /></p>
          </aside>
          <GuideBlocks g={g} />
          <h2 className="gd-bh2 gd-small-h">Read next</h2>
          <ul className="gd-rel">
            {others.map((o) => <li key={o.slug}><Link href={`/guides/${o.slug}`}>{o.title}</Link></li>)}
            <li><Link href={g.treatment.href}>{g.treatment.name} at Dental Krafts</Link></li>
          </ul>
          <aside className="gd-take" id="takeaways" aria-labelledby={`tk-${g.slug}`}>
            <h2 id={`tk-${g.slug}`} className="gd-take-h">Key takeaways</h2>
            <ol>{g.takeaways.map((t, i) => <li key={i}><Inline text={t} /></li>)}</ol>
          </aside>
          <section className="gd-faq" id="faq" aria-labelledby={`fq-${g.slug}`}>
            <h2 id={`fq-${g.slug}`} className="gd-bh2">Common questions</h2>
            {g.faq.map((f, i) => (
              <details key={i}><summary><h3>{f.q}</h3><span className="gd-pl"><Icon name="plus" cls="ic ic-sm" /></span></summary><p>{f.a}</p></details>
            ))}
          </section>
          <section className="gd-src" id="sources" aria-labelledby={`sq-${g.slug}`}>
            <h2 id={`sq-${g.slug}`} className="gd-bh2 gd-small-h">Sources</h2>
            <ol>{g.sources.map((s, i) => <li key={i}><a href={s.url} rel="noopener" target="_blank">{s.title}</a> <span>· {s.site}</span></li>)}</ol>
          </section>
          <div className="gd-disc">
            <p>This guide is general information and does not replace an examination by a dentist. If you are in pain or have swelling, call either clinic.</p>
            <ShareButtons url={url} title={g.title} />
          </div>
        </div>
        <aside className="gd-rail" aria-label="Related">
          <div className="gd-rail-card gd-rail-t">
            <Image src={g.treatment.img} alt="" width={tw} height={th} sizes="(max-width: 980px) 100vw, 300px" loading="lazy" />
            <div><p className="gd-kick">Related treatment</p><p className="gd-rail-h">{g.treatment.name}</p><p className="gd-rail-x">{g.treatment.line}</p>
              <Link className="btn btn-p btn-sm" href="/contact-us">Book a consultation</Link>
              <Link className="tl" href={g.treatment.href}>About {g.treatment.name} <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
          </div>
          <div className="gd-rail-card gd-rail-a">
            <p className="gd-kick">About the author</p>
            <div className="gd-rail-ah"><Image src={author.img} alt={author.name} width={56} height={56} loading="lazy" /><div><b>{author.name}</b><small>{author.role}</small></div></div>
            <p className="gd-rail-x">{author.cred}. {author.reg}.</p>
            <Link className="tl" href={author.url}>Full profile <Icon name="arrow-right" cls="ic ic-sm" /></Link>
          </div>
        </aside>
      </div>
      </article>

      <section className="gd-keep" aria-labelledby={`kr-${g.slug}`}><div className="wrap">
        <div className="gd-keep-h"><h2 className="d gd-h2" id={`kr-${g.slug}`}>Keep <em>reading</em></h2><Link className="tl" href="/guides">All patient guides <Icon name="arrow-right" cls="ic ic-sm" /></Link></div>
        <div className="gd-keep-g">
          {others.map((o) => <GuideCard key={o.slug} g={o} sizes="(min-width:981px) 30vw, 100vw" />)}
          <TreatmentCard g={g} />
        </div>
      </div></section>

      <BookBand id={`bk-${g.slug}`} />
      <JsonLd data={guideArticleGraph(g)} />
    </>
  );
}
