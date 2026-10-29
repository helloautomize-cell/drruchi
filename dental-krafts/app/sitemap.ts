import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { treatments } from "@/content/treatments";
import { posts } from "@/content/posts";
import { GUIDES, GUIDE_CATEGORIES, guidesByDate } from "@/content/guides";
import { LAST_REVIEWED } from "@/lib/schema";

const STATIC = [
  "/our-dentists",
  "/dr-ruchi-goel",
  "/dr-parmod-gulia",
  "/treatments",
  "/gallery",
  "/patient-stories",
  "/dental-clinic-sector-53-gurgaon",
  "/dental-clinic-sector-57-gurgaon",
  "/best-dental-clinic-golf-course-road-gurgaon",
  "/best-dental-clinic-gurgaon",
  "/medical-tourism",
  "/about-us",
  "/blog",
  "/guides",
  "/contact-us",
  "/privacy-policy",
  "/terms-conditions",
  "/editorial-policy",
  "/medical-disclaimer",
];

const LANGS = {
  "en-IN": `${site.domain}/`,
  ja: `${site.domain}/japanese`,
  ko: `${site.domain}/korean`,
  "x-default": `${site.domain}/`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date(LAST_REVIEWED);
  return [
    {
      url: site.domain,
      lastModified: new Date(LAST_REVIEWED),
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages: LANGS },
    },
    ...["/japanese", "/korean"].map((p) => ({
      url: `${site.domain}${p}`,
      lastModified: new Date(LAST_REVIEWED),
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: LANGS },
    })),
    ...STATIC.map((p) => ({
      url: `${site.domain}${p}`,
      lastModified: new Date(LAST_REVIEWED),
      changeFrequency: "monthly" as const,
      priority: p === "/treatments" ? 0.9 : 0.8,
    })),
    ...treatments.map((t) => ({
      url: `${site.domain}/${t.slug}`,
      lastModified: new Date(LAST_REVIEWED),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${site.domain}/blog/${p.slug}`,
      lastModified: new Date(LAST_REVIEWED),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
    ...GUIDES.map((g) => ({
      url: `${site.domain}/guides/${g.slug}`,
      lastModified: new Date(g.modified),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...GUIDE_CATEGORIES.map((c) => ({
      url: `${site.domain}/guides/category/${c.slug}`,
      lastModified: new Date(guidesByDate()[0]?.modified ?? now),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
