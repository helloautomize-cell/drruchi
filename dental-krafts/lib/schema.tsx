import type { ReactElement } from "react";
import { site, OG_IMAGE } from "@/content/site";
import { clinics, type Clinic } from "@/content/clinics";
import { doctorById } from "@/content/doctors";
import { treatments, type Treatment } from "@/content/treatments";
import { GUIDE_CATEGORIES, GUIDE_AUTHORS, guidesByDate, type Guide, type DoctorKey } from "@/content/guides";
import type { Post } from "@/content/posts";
import type { Case } from "@/content/results";

/** Stable @id anchors so the whole graph links up across pages. */
export const ID = {
  org: `${site.domain}/#org`,
  website: `${site.domain}/#website`,
  ruchi: `${site.domain}/#dr-ruchi-goel`,
  parmod: `${site.domain}/#dr-parmod-gulia`,
  clinic53: `${site.domain}/#clinic-sector-53`,
  clinic57: `${site.domain}/#clinic-sector-57`,
};

/** Date the clinical copy was last reviewed for accuracy (site build review). */
export const LAST_REVIEWED = "2026-10-29";

const GEO: Record<Clinic["id"], { latitude: number; longitude: number }> = {
  sector53: { latitude: 28.448, longitude: 77.0991 },
  sector57: { latitude: 28.4216, longitude: 77.0904 },
};

const OPEN_DAYS = ["Monday", "Tuesday", "Thursday", "Friday", "Saturday", "Sunday"];

const hhmm = (min: number) => `${String(Math.floor(min / 60)).padStart(2, "0")}:${String(min % 60).padStart(2, "0")}`;

const abs = (p: string) => (p.startsWith("http") ? p : `${site.domain}${p}`);

const mapsUrl = (c: Clinic) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`;

/* ------------------------------ site-wide ------------------------------- */

export function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ID.org,
    name: site.name,
    url: site.domain,
    logo: abs("/images/brand/dk-logo-colour.svg"),
    image: abs(OG_IMAGE),
    email: site.email,
    sameAs: [site.instagram, site.facebook, site.youtube, site.practo, site.justdial],
  };
}

export function webSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ID.website,
    name: site.name,
    url: site.domain,
    inLanguage: "en-IN",
    publisher: { "@id": ID.org },
  };
}

/* -------------------------------- clinics ------------------------------- */

export function clinicNode(c: Clinic) {
  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalClinic"],
    "@id": c.id === "sector53" ? ID.clinic53 : ID.clinic57,
    name: `Dental Krafts — ${c.name}`,
    url: abs(c.slug),
    image: abs(c.image),
    telephone: c.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.id === "sector53"
        ? "DSP-211, 2nd Floor, South Point Mall, Golf Course Road, DLF Phase 5"
        : "UG-12, 1st Floor, Bestech Central Square Mall, Opp. Hong Kong Bazaar Road, Block G, Sushant Lok 2",
      addressLocality: c.id === "sector53" ? "Sector 53, Gurugram" : "Sector 57, Gurugram",
      addressRegion: "Haryana",
      postalCode: c.id === "sector53" ? "122002" : "122011",
      addressCountry: "IN",
    },
    geo: { "@type": "GeoCoordinates", ...GEO[c.id] },
    hasMap: mapsUrl(c),
    openingHoursSpecification: OPEN_DAYS.map((d) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: d,
      opens: hhmm(c.openMin),
      closes: hhmm(c.closeMin),
    })),
    areaServed: ["Gurgaon", "Gurugram", ...c.nearby],
    medicalSpecialty: "Dentistry",
    availableService: treatments.map((t) => ({
      "@type": "MedicalProcedure",
      name: t.name,
      url: abs(`/${t.slug}`),
    })),
    parentOrganization: { "@id": ID.org },
    sameAs: [site.practo, site.justdial, mapsUrl(c)],
    inLanguage: "en-IN",
  };
}

/* -------------------------------- doctors ------------------------------- */

export function physicianNode(id: "ruchi" | "parmod") {
  const d = doctorById(id);
  const base = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": id === "ruchi" ? ID.ruchi : ID.parmod,
    name: d.name,
    jobTitle: d.role,
    image: abs(d.portrait),
    url: abs(d.slug),
    identifier: { "@type": "PropertyValue", propertyID: "Delhi State Dental Council registration", value: d.reg },
    medicalSpecialty: id === "ruchi" ? "Prosthodontics" : "Paedodontics",
    alumniOf:
      id === "ruchi"
        ? [
            { "@type": "CollegeOrUniversity", name: "All India Institute of Medical Sciences, New Delhi" },
            { "@type": "CollegeOrUniversity", name: "D.A.V. Centenary Dental College, Yamuna Nagar" },
          ]
        : [{ "@type": "CollegeOrUniversity", name: "PGIMER Chandigarh" }],
    knowsAbout: d.treats.map((t) => t.title),
    worksFor: clinics.map((c) => ({ "@id": c.id === "sector53" ? ID.clinic53 : ID.clinic57 })),
    inLanguage: "en-IN",
  };
  if (id === "ruchi") {
    return {
      ...base,
      memberOf: [
        { "@type": "Organization", name: "Indian Dental Association" },
        { "@type": "Organization", name: "Indian Prosthodontic Society" },
      ],
      award: "National Achievers Award 2025",
      sameAs: ["https://www.practo.com/gurgaon/doctor/dr-ruchi-goel-dentist"],
    };
  }
  return {
    ...base,
    alternateName: "Pramod Gulia",
    memberOf: [
      { "@type": "Organization", name: "Indian Dental Association" },
      { "@type": "Organization", name: "Indian Society of Pedodontics & Preventive Dentistry" },
    ],
  };
}

/* ------------------------------- structures ------------------------------ */

export function faqPage(faqs: { q: string; a: string }[], lang = "en-IN") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumb(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, url], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: abs(url),
    })),
  };
}

/* ------------------------------- treatments ------------------------------ */

export function medicalProcedure(t: Treatment) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    "@id": `${site.domain}/${t.slug}#procedure`,
    name: t.name,
    alternateName: t.h1,
    description: t.sub,
    url: abs(`/${t.slug}`),
    procedureType: "https://schema.org/TherapeuticProcedure",
    bodyLocation: "Teeth, mouth and jaw",
    howPerformed: t.howText.join(" "),
    preparation: "Examination and consultation first; X-rays only if needed.",
    followup: t.aftercare.join(" "),
    status: "https://schema.org/EventScheduled",
    provider: { "@id": ID.org },
  };
}

export function medicalWebPage(t: Treatment) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "@id": `${site.domain}/${t.slug}#webpage`,
    url: abs(`/${t.slug}`),
    name: t.metaTitle,
    description: t.metaDesc,
    inLanguage: "en-IN",
    about: { "@id": `${site.domain}/${t.slug}#procedure` },
    reviewedBy: { "@id": t.doctor === "parmod" ? ID.parmod : t.doctor === "ruchi" ? ID.ruchi : ID.org },
    lastReviewed: LAST_REVIEWED,
    dateModified: LAST_REVIEWED,
    isPartOf: { "@id": ID.website },
  };
}

export function treatmentsCollection() {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${site.domain}/treatments#collection`,
    url: abs("/treatments"),
    name: "Dental treatments in Gurgaon",
    description: "All dental treatments at Dental Krafts — implants, root canals, kids' dentistry, braces, whitening and more.",
    inLanguage: "en-IN",
    isPartOf: { "@id": ID.website },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: treatments.length,
      itemListElement: treatments.map((t, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: t.name,
        url: abs(`/${t.slug}`),
      })),
    },
  };
}

/* --------------------------------- media --------------------------------- */

export type ReelLike = { file: string; title: string; poster?: string; who?: string };

const DUR: Record<string, string> = {
  "reel-01.mp4": "PT60S", "reel-02.mp4": "PT41S", "reel-03.mp4": "PT43S", "reel-04.mp4": "PT62S",
  "reel-05.mp4": "PT54S", "reel-06.mp4": "PT60S", "reel-07.mp4": "PT28S", "reel-08.mp4": "PT36S",
};

export function videoObject(r: ReelLike) {
  const poster = r.poster ?? `/images/reels/${r.file.replace(/\.mp4$/, "")}.webp`;
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: r.title,
    description: `${r.title} — a short explainer video from Dental Krafts, Gurgaon.`,
    thumbnailUrl: abs(poster),
    uploadDate: LAST_REVIEWED,
    duration: DUR[r.file] ?? "PT60S",
    contentUrl: abs(`/videos/${r.file}`),
    inLanguage: "en-IN",
    publisher: { "@id": ID.org },
  };
}

export function imageObject(c: Case) {
  return {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    name: c.caption,
    caption: c.caption,
    contentUrl: abs(`/images/results/split/${c.file}__after.webp`),
    representativeOfPage: false,
    creditText: "Dental Krafts — shared with patient consent",
    creator: { "@id": ID.org },
    inLanguage: "en-IN",
  };
}

/* --------------------------------- blog ---------------------------------- */

export function articleNode(p: Post) {
  const doc = doctorById(p.author);
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: p.title,
    description: p.excerpt,
    image: abs(p.image),
    author: { "@id": p.author === "parmod" ? ID.parmod : ID.ruchi, "@type": "Physician", name: doc.name, url: abs(doc.slug) },
    reviewedBy: { "@id": p.author === "parmod" ? ID.ruchi : ID.parmod },
    publisher: { "@id": ID.org },
    mainEntityOfPage: abs(`/blog/${p.slug}`),
    inLanguage: "en-IN",
    dateModified: LAST_REVIEWED,
  };
}

/* --------------------------------- guides -------------------------------- */

/** Person node for guide author/reviewer — links to the site-wide physician @ids. */
function guidePerson(id: DoctorKey) {
  const a = GUIDE_AUTHORS[id];
  return {
    "@type": "Person",
    "@id": id === "ruchi" ? ID.ruchi : ID.parmod,
    name: a.name,
    jobTitle: a.role,
    url: abs(a.url),
    image: abs(a.img),
    alumniOf: a.alumni.map((n) => ({ "@type": "CollegeOrUniversity", name: n })),
    worksFor: clinics.map((c) => ({ "@id": c.id === "sector53" ? ID.clinic53 : ID.clinic57 })),
  };
}

const guideListItems = (list: Guide[]) =>
  list.map((g, i) => ({ "@type": "ListItem", position: i + 1, url: abs(`/guides/${g.slug}`), name: g.title }));

/** /guides — CollectionPage + ItemList + BreadcrumbList, one @graph. */
export function guidesIndexGraph() {
  const url = abs("/guides");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: "Patient guides from Dental Krafts",
        description: "Plain-language dental guides written by Dr Ruchi Goel and Dr Parmod Gulia, specialist dentists in Gurgaon.",
        isPartOf: { "@id": ID.website },
        about: { "@id": ID.org },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#list` },
        inLanguage: "en-IN",
      },
      { "@type": "ItemList", "@id": `${url}#list`, itemListElement: guideListItems(guidesByDate()) },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
          { "@type": "ListItem", position: 2, name: "Patient guides", item: url },
        ],
      },
    ],
  };
}

/** /guides/category/[category] — same shape as the index, filtered list. */
export function guideCategoryGraph(catSlug: string) {
  const cat = GUIDE_CATEGORIES.find((c) => c.slug === catSlug);
  const url = abs(`/guides/category/${catSlug}`);
  const list = guidesByDate().filter((g) => g.category === catSlug);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: `${cat?.name ?? "Guides"} — patient guides from Dental Krafts`,
        description: `Plain-language dental guides on ${(cat?.name ?? "dental care").toLowerCase()}, written and reviewed by the specialists at Dental Krafts, Gurgaon.`,
        isPartOf: { "@id": ID.website },
        about: { "@id": ID.org },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        mainEntity: { "@id": `${url}#list` },
        inLanguage: "en-IN",
      },
      { "@type": "ItemList", "@id": `${url}#list`, itemListElement: guideListItems(list) },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
          { "@type": "ListItem", position: 2, name: "Patient guides", item: abs("/guides") },
          { "@type": "ListItem", position: 3, name: cat?.name ?? catSlug, item: url },
        ],
      },
    ],
  };
}

/** /guides/[slug] — WebPage + MedicalWebPage/BlogPosting + BreadcrumbList + FAQPage. */
export function guideArticleGraph(g: Guide) {
  const url = abs(`/guides/${g.slug}`);
  const cat = GUIDE_CATEGORIES.find((c) => c.slug === g.category);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: g.title,
        description: g.dek,
        isPartOf: { "@id": ID.website },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: abs(g.image),
        inLanguage: "en-IN",
      },
      {
        "@type": ["MedicalWebPage", "BlogPosting"],
        "@id": `${url}#article`,
        headline: g.title,
        name: g.title,
        description: g.dek,
        url,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        image: abs(g.image),
        datePublished: g.published,
        dateModified: g.modified,
        lastReviewed: g.modified,
        articleSection: cat?.name,
        wordCount: g.wordCount,
        about: { "@type": g.about.type, name: g.about.name, sameAs: g.about.sameAs },
        audience: { "@type": "PeopleAudience", audienceType: "Patient" },
        author: guidePerson(g.author),
        reviewedBy: guidePerson(g.reviewer),
        publisher: { "@id": ID.org },
        isPartOf: { "@id": ID.website },
        inLanguage: "en-IN",
        citation: g.sources.map((s) => s.url),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
          { "@type": "ListItem", position: 2, name: "Patient guides", item: abs("/guides") },
          { "@type": "ListItem", position: 3, name: cat?.name ?? g.category, item: abs(`/guides/category/${g.category}`) },
          { "@type": "ListItem", position: 4, name: g.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: "en-IN",
        mainEntity: g.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

/* ------------------------------- rendering ------------------------------- */

export function JsonLd({ data }: { data: object | object[] }): ReactElement {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
