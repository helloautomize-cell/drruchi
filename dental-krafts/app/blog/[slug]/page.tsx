import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Icon } from "@/components/icons";
import { posts, postBySlug } from "@/content/posts";
import { doctorById } from "@/content/doctors";
import { treatments } from "@/content/treatments";
import { site } from "@/content/site";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) return {};
  const desc = p.excerpt.replace(/[“”]/g, '"').slice(0, 155);
  return {
    title: p.title,
    description: desc,
    alternates: { canonical: `/blog/${p.slug}` },
  };
}

const RELATED: Record<string, string[]> = {
  "Implants and dentures": ["dental-implants", "all-on-4-dental-implants", "dentures"],
  "Root canals and fillings": ["root-canal-treatment", "dental-fillings", "dental-crowns"],
  "Kids' teeth": ["pediatric-dentist"],
  Cosmetic: ["smile-makeover", "dental-veneers", "teeth-whitening"],
  "Gums and cleaning": ["gum-disease", "teeth-cleaning"],
  "Everyday care": ["general-dentistry", "teeth-cleaning"],
};

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) notFound();

  const doc = doctorById(p.author);
  const headings = p.body.filter((l) => l.startsWith("## ")).map((l) => l.slice(3));
  const related = (RELATED[p.category] ?? [])
    .map((s) => treatments.find((t) => t.slug === s))
    .filter(Boolean);

  const LD = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: p.title,
      description: p.excerpt,
      image: `${site.domain}${p.image}`,
      author: { "@type": "Physician", name: doc.name, url: `${site.domain}${doc.slug}` },
      publisher: { "@type": "Organization", name: "Dental Krafts", url: site.domain },
      mainEntityOfPage: `${site.domain}/blog/${p.slug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.domain },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${site.domain}/blog` },
        { "@type": "ListItem", position: 3, name: p.title, item: `${site.domain}/blog/${p.slug}` },
      ],
    },
  ];

  return (
    <>
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / <Link href="/blog">Blog</Link> / {p.category}</div>
        <div className="g" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
          <div>
            <span className="eyebrow"><Icon name="quote" cls="ic ic-sm" /> {p.category}</span>
            <h1 className="d" style={{ fontSize: "clamp(34px,4.4vw,60px)", maxWidth: "20ch" }}>{p.title}</h1>
            <p className="sub" style={{ marginBottom: 0 }}>By {doc.name} · {p.readingMin} min read</p>
          </div>
        </div>
      </div></section>

      <section className="sp"><div className="wrap" style={{ maxWidth: 820 }}>
        {headings.length >= 3 && (
          <nav className="toc" aria-label="Contents">
            <b>In this article</b>
            {headings.map((h, i) => <a key={i} href={`#s${i}`}>{h}</a>)}
          </nav>
        )}
        <div className="prose">
          {p.body.map((l, i) => {
            if (l.startsWith("## ")) {
              const idx = headings.indexOf(l.slice(3));
              return <h2 key={i} id={`s${idx}`}>{l.slice(3)}</h2>;
            }
            return <p key={i}>{l}</p>;
          })}
        </div>

        {/* Mid-article CTA */}
        <div className="band2" style={{ margin: "34px 0" }}>
          <div>
            <h2 className="d" style={{ fontSize: "clamp(26px,3vw,40px)" }}>Rather ask <em>a dentist?</em></h2>
            <p>A consultation answers your own questions, with a written plan.</p>
          </div>
          <div className="cta"><Link className="btn btn-w" href="/contact-us">Book a visit <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link></div>
        </div>

        {related.length > 0 && (
          <div className="rel">
            <span className="chip">Related treatments:</span>
            {related.map((t) => <Link key={t!.slug} className="chip" href={`/${t!.slug}`}>{t!.name}</Link>)}
            <Link className="chip" href="/treatments">All treatments</Link>
          </div>
        )}

        <div className="authorbox">
          <img src={doc.portrait} alt={doc.name} />
          <span>
            <b>{doc.name}</b>
            <span>{doc.degree}</span>
            <Link className="link" href={doc.slug} style={{ marginTop: 6 }}>Full profile <Icon name="arrow-right" cls="ic ic-sm" /></Link>
          </span>
        </div>
        <p className="mrev"><Icon name="shield-check" cls="ic" /> Medically reviewed by {doc.name}, {doc.degree.split(",")[1]?.trim() ?? doc.role}.</p>
      </div></section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(LD) }} />
    </>
  );
}
