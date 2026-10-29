import type { Metadata } from "next";
import { GuideIndex } from "@/components/guide-index";

export const ensureStatic = "navigation";

export const metadata: Metadata = {
  title: { absolute: "Dental Patient Guides | Specialists | Dental Krafts" },
  description:
    "Plain-language dental guides from Dr Ruchi Goel and Dr Parmod Gulia, specialist dentists at Dental Krafts, Sector 53 and Sector 57, Gurgaon.",
  alternates: { canonical: "/guides" },
};

export default function Guides() {
  return <GuideIndex />;
}
