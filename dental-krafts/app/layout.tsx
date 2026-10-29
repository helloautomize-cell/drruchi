import type { Metadata, Viewport } from "next";
import { Fraunces, Figtree } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./dk-motion.css";
import { Sprites } from "@/components/sprites";
import { Motion } from "@/components/motion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StickyBar } from "@/components/sticky-bar";
import { site, OG_IMAGE } from "@/content/site";
import { JsonLd, organization, webSite } from "@/lib/schema";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});
const figtree = Figtree({ subsets: ["latin"], variable: "--font-figtree", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Dental Clinic in Gurgaon | AIIMS & PGIMER Dentists | Dental Krafts",
    template: "%s | Dental Krafts",
  },
  description:
    "Implants, root canals, kids' dentistry and smile design by Dr Ruchi Goel (AIIMS) and Dr Parmod Gulia (PGIMER). Rated 5.0 on Practo. Clinics in Sector 53 & 57.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  openGraph: { images: [OG_IMAGE], siteName: "Dental Krafts", locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#FAF8F4" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" data-scroll-behavior="smooth" suppressHydrationWarning className={`${fraunces.variable} ${figtree.variable}`}>
      <body>
        <Script id="dk-motion-flag" strategy="beforeInteractive">{`(function(h){if(!matchMedia("(prefers-reduced-motion: reduce)").matches){h.classList.add("js-m");setTimeout(function(){if(!window.DKM)h.classList.remove("js-m")},3000)}})(document.documentElement)`}</Script>
        <a className="skip" href="#main">Skip to content</a>
        <Motion />
        <Sprites />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <StickyBar />
        <JsonLd data={[organization(), webSite()]} />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="lazyOnload" />
        <Script id="ga4" strategy="lazyOnload">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.gaId}');`}</Script>
      </body>
    </html>
  );
}
