import Link from "next/link";
import Image from "next/image";
import { Icon } from "./icons";
import { Eb } from "./bits";
import { GuideBrowser } from "./guides-client";
import { GuideCard, AskCard, BookBand, WA_ASK } from "./guides";
import { GUIDE_CATEGORIES, GUIDE_AUTHORS, guidesByDate, type Guide, type DoctorKey } from "@/content/guides";
import { JsonLd, guidesIndexGraph, guideCategoryGraph } from "@/lib/schema";

/**
 * The /guides list view — also used by /guides/category/[category] with
 * `catSlug` set (server-side filtered to that category, client can widen).
 */
export function GuideIndex({ catSlug }: { catSlug?: string }) {
  const sorted = guidesByDate();
  const cat = catSlug ? GUIDE_CATEGORIES.find((c) => c.slug === catSlug) : undefined;
  const count = (s: string) => sorted.filter((g) => g.category === s).length;
  // All + only categories that currently have a guide; on a category page the
  // page's own category is kept even at 0 so the active filter is visible.
  const pills = GUIDE_CATEGORIES
    .map((c) => ({ slug: c.slug, name: c.name, count: count(c.slug) }))
    .filter((p) => p.count > 0 || p.slug === catSlug);
  const [feat, ...rest] = sorted;
  const visible = cat ? count(cat.slug) : sorted.length;
  const hide = (g: Guide) => (cat ? g.category !== cat.slug : false);
  const byDoctor: Record<DoctorKey, number> = { ruchi: 0, parmod: 0 };
  sorted.forEach((g) => { byDoctor[g.author]++; });

  return (
    <>
      <section className="gd-ihero"><div className="wrap">
        <nav className="gd-crumb" aria-label="Breadcrumb"><ol>
          <li><Link href="/">Home</Link></li>
          {cat && <li><Link href="/guides">Patient guides</Link></li>}
          <li aria-current="page">{cat ? cat.name : "Patient guides"}</li>
        </ol></nav>
        <div className="gd-ihero-g">
          <div>
            <Eb>Patient guides{cat ? ` · ${cat.name}` : ""}</Eb>
            <h1 className="d gd-ih1">{cat ? <>{cat.name}, <em>answered clearly.</em></> : <>Dental questions, <em>answered clearly.</em></>}</h1>
          </div>
          <div className="gd-ihero-r">
            <p className="lead">Plain-language guides from our two specialists. Each one is written by one dentist and checked by the other before it goes live.</p>
            <ul className="gd-promise">
              <li><Icon name="shield-check" cls="ic ic-sm" />Written and reviewed by named specialists</li>
              <li><Icon name="check" cls="ic ic-sm" />Sources linked at the end of every guide</li>
            </ul>
          </div>
        </div>
      </div></section>

      <GuideBrowser pills={pills} total={sorted.length} initialCat={cat?.slug ?? "all"}>
        {feat && <GuideCard g={feat} feat h="h2" hidden={hide(feat)} sizes="(min-width:981px) 58vw, 100vw" />}
        <div className="gd-grid">
          {rest.map((g) => <GuideCard key={g.slug} g={g} hidden={hide(g)} sizes="(min-width:981px) 30vw, 100vw" />)}
          <AskCard hidden={!!cat} />
        </div>
        <p className="gd-empty" hidden={visible > 0}>No guides on this topic yet. <a href={WA_ASK} rel="noopener" target="_blank">Ask us on WhatsApp</a> and we may write one.</p>
      </GuideBrowser>

      <section className="gd-writers"><div className="wrap">
        <div className="gd-writers-h"><Eb>Who writes these guides</Eb><h2 className="d gd-h2">Two specialists, <em>side by side.</em></h2></div>
        <div className="gd-wr-g">
          {(["ruchi", "parmod"] as const).map((k) => {
            const a = GUIDE_AUTHORS[k];
            return (
              <div className="gd-wr" key={k}>
                <Image src={a.img} alt={a.name} width={88} height={88} loading="lazy" />
                <div>
                  <p className="gd-wr-role">{a.role}</p>
                  <h3 className="h3">{a.name}</h3>
                  <p className="gd-wr-cred">{a.cred}</p>
                  <p className="gd-wr-bio">{a.bio}</p>
                  <Link className="tl" href={a.url}>{byDoctor[k]} {byDoctor[k] === 1 ? "guide" : "guides"} · About {a.short} <Icon name="arrow-right" cls="ic ic-sm" /></Link>
                </div>
              </div>
            );
          })}
        </div>
        <p className="gd-policy">How we write: one specialist drafts each guide and the other reviews it. We link the sources we rely on, update guides when advice changes, and never use a guide to promise results.</p>
      </div></section>

      <BookBand id={cat ? `bk-${cat.slug}` : "bk-guides"} />
      <JsonLd data={cat ? guideCategoryGraph(cat.slug) : guidesIndexGraph()} />
    </>
  );
}
