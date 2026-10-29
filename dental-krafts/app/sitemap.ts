import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { treatments } from "@/content/treatments";
import { posts } from "@/content/posts";

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
  "/contact-us",
  "/privacy-policy",
  "/terms-conditions",
];

const LANGS = {
  "en-IN": `${site.domain}/`,
  ja: `${site.domain}/japanese`,
  ko: `${site.domain}/korean`,
  "x-default": `${site.domain}/`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    {
      url: site.domain,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 1,
      alternates: { languages: LANGS },
    },
    ...["/japanese", "/korean"].map((p) => ({
      url: `${site.domain}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: { languages: LANGS },
    })),
    ...STATIC.map((p) => ({
      url: `${site.domain}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "/treatments" ? 0.9 : 0.8,
    })),
    ...treatments.map((t) => ({
      url: `${site.domain}/${t.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...posts.map((p) => ({
      url: `${site.domain}/blog/${p.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
