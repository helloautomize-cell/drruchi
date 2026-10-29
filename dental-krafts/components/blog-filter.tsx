"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { postCategories } from "@/content/posts";

export type BlogCard = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readingMin: number;
  image: string;
  authorName: string;
};

/** Blog card grid with category chips. */
export function BlogFilter({ posts }: { posts: BlogCard[] }) {
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? posts : posts.filter((p) => p.category === cat);
  return (
    <>
      <div className="filters" role="tablist" aria-label="Filter articles by topic">
        {["All", ...postCategories].map((c) => (
          <button key={c} className="chip" role="tab" aria-pressed={cat === c} onClick={() => setCat(c)}>
            {c}
          </button>
        ))}
      </div>
      <div className="blgrid">
        {list.map((p) => (
          <Link className="blc" key={p.slug} href={`/blog/${p.slug}`}>
            <div className="ph"><Image sizes="(max-width: 768px) 100vw, 760px" src={p.image} width={1536} height={1024} alt="" loading="lazy" /></div>
            <div className="in">
              <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--rose)" }}>{p.category}</span>
              <b>{p.title}</b>
              <span>{p.excerpt}…</span>
              <span className="meta">{p.authorName} · {p.readingMin} min read</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
