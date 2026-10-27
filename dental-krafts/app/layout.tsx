import type { Metadata, Viewport } from "next";
import { Fraunces, Figtree } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Sprites } from "@/components/sprites";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StickyBar } from "@/components/sticky-bar";
import { site, OG_IMAGE } from "@/content/site";

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
  openGraph: { images: [OG_IMAGE], siteName: "Dental Krafts", locale: "en_IN" },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#1E3A30" };

const ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Dental Krafts",
  url: site.domain,
  logo: `${site.domain}/images/brand/dk-logo-colour.svg`,
  email: site.email,
  sameAs: [site.instagram, site.facebook, site.youtube, site.practo],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fraunces.variable} ${figtree.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Sprites />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <StickyBar />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG) }} />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
        <Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.gaId}');`}</Script>
      </body>
    </html>
  );
}
