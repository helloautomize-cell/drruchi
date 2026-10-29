import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { CtaBand } from "@/components/bits";
import { BlogFilter } from "@/components/blog-filter";
import { posts } from "@/content/posts";
import { doctorById } from "@/content/doctors";

export const metadata: Metadata = {
  title: { absolute: "Dental Blog | Questions Answered by Specialists | Dental Krafts" },
  description:
    "Plain-English dental articles written and reviewed by Dr Ruchi Goel (AIIMS) and Dr Parmod Gulia (PGIMER) — implants, kids' teeth and more.",
  alternates: { canonical: "/blog" },
};

export default function Blog() {
  const cards = posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    excerpt: p.excerpt,
    readingMin: p.readingMin,
    image: p.image,
    authorName: doctorById(p.author).name,
  }));

  return (
    <>
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Blog</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="quote" cls="ic ic-sm" /> The Dental Krafts blog</span>
            <h1 className="d">Dental questions, <em>answered.</em></h1>
            <p className="sub">Plain-English articles written and reviewed by Dr Ruchi Goel and Dr Parmod Gulia.</p>
          </div>
          <div className="ph"><Image sizes="(max-width: 768px) 100vw, 760px" src="/images/ai/treat-smile-design.webp" width={1536} height={1024} alt="Porcelain veneers beside a hand mirror" /></div>
        </div>
      </div></section>

      <section className="sp"><div className="wrap">
        <BlogFilter posts={cards} />
      </div></section>

      <section className="sp" style={{ paddingTop: 0 }}><div className="wrap">
        <CtaBand title="Rather ask" em="a dentist?" text="Book a consultation and ask your own questions — you'll leave with a written plan." />
      </div></section>
    </>
  );
}
