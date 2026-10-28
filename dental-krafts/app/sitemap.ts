import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { treatments } from "@/content/treatments";
import { posts } from "@/content/posts";

const STATIC = [
  "",
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
  "/japanese",
  "/korean",
  "/about-us",
  "/blog",
  "/contact-us",
  "/privacy-policy",
  "/terms-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...STATIC.map((p) => ({
      url: `${site.domain}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
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
