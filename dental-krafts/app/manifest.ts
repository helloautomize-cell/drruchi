import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dental Krafts — Dentists in Gurgaon",
    short_name: "Dental Krafts",
    description: "Specialist dental clinic in Gurgaon. Two clinics in Sector 53 and Sector 57, run by Dr Ruchi Goel (AIIMS) and Dr Parmod Gulia (PGIMER).",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF8F4",
    theme_color: "#FAF8F4",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
