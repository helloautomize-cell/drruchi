import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuideIndex } from "@/components/guide-index";
import { GUIDE_CATEGORIES } from "@/content/guides";

export const ensureStatic = "navigation";

export function generateStaticParams() {
  return GUIDE_CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category } = await params;
  const cat = GUIDE_CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();
  return {
    title: { absolute: `${cat.name} | Patient Guides | Dental Krafts` },
    description: `Plain-language dental guides on ${cat.name.toLowerCase()}, written and reviewed by the specialists at Dental Krafts, Gurgaon.`,
    alternates: { canonical: `/guides/category/${cat.slug}` },
  };
}

export default async function GuideCategory({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  if (!GUIDE_CATEGORIES.some((c) => c.slug === category)) notFound();
  return <GuideIndex catSlug={category} />;
}
