import { site } from "@/content/site";
import { clinics } from "@/content/clinics";
import { doctors } from "@/content/doctors";
import { treatments } from "@/content/treatments";
import { homeFaqs } from "@/content/faqs";
import { guidesByDate } from "@/content/guides";


const U = (p: string) => `${site.domain}${p}`;

function build(): string {
  const L: string[] = [];
  L.push("# Dental Krafts — full site index");
  L.push("");
  L.push(
    "> Specialist dental clinic in Gurgaon (Gurugram), India. Two clinics — Sector 53 (South Point Mall, Golf Course Road) and Sector 57 (Bestech Central Square Mall, Sushant Lok 2) — run by two specialists: Dr Ruchi Goel (prosthodontist, MDS AIIMS New Delhi) and Dr Parmod Gulia (pediatric dentist, MDS PGIMER Chandigarh). The site is in English with Japanese and Korean summaries for international patients."
  );
  L.push("");

  L.push("## Doctors");
  L.push("");
  for (const d of doctors) {
    L.push(`### ${d.name} — ${d.role}`);
    L.push(`URL: ${U(d.slug)}`);
    L.push(`${d.degree}. Delhi State Dental Council registration ${d.reg}. Practising since ${d.timeline[0].year}.`);
    L.push("");
    L.push("Career timeline:");
    for (const t of d.timeline) L.push(`- ${t.year}: ${t.text}`);
    L.push("");
    L.push("Treats:");
    for (const t of d.treats) L.push(`- ${t.title} — ${t.sub}`);
    L.push("");
    L.push("FAQ:");
    for (const f of d.faqs) L.push(`- Q: ${f.q}\n  A: ${f.a}`);
    L.push("");
  }

  L.push("## Clinics");
  L.push("");
  for (const c of clinics) {
    L.push(`### Dental Krafts — ${c.name}`);
    L.push(`URL: ${U(c.slug)}`);
    L.push(`Address: ${c.address}`);
    L.push(`Phone: ${c.phone}`);
    L.push(`Hours: ${c.hoursLabel}, Monday, Tuesday, Thursday–Sunday. Closed Wednesdays.`);
    L.push(`Map: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`);
    L.push(`Areas nearby: ${c.nearby.join(", ")}`);
    L.push(`Drive times: ${c.driveTimes.map(([f, m]) => `${f} ${m}`).join("; ")}`);
    L.push("");
  }

  L.push("## Treatments");
  L.push("");
  for (const t of treatments) {
    L.push(`### ${t.name} (${t.group})`);
    L.push(`URL: ${U(`/${t.slug}`)}`);
    L.push(`${t.sub} ${t.heroCard ? `${t.heroCard.b} — ${t.heroCard.s}.` : ""}`);
    L.push(`Treating dentist: ${t.doctor === "either" ? "either dentist" : t.doctor === "ruchi" ? "Dr Ruchi Goel" : "Dr Parmod Gulia"}.`);
    L.push("");
    L.push(t.howTitle);
    for (const p of t.howText) L.push(p);
    L.push("");
    if (t.options.length) {
      L.push("Options:");
      for (const o of t.options) L.push(`- ${o.title}: ${o.text}`);
      L.push("");
    }
    if (t.steps.length) {
      L.push("Steps:");
      t.steps.forEach((s, i) => L.push(`${i + 1}. ${s.title} — ${s.text}`));
      L.push("");
    }
    if (t.aftercare.length) {
      L.push("Aftercare:");
      for (const a of t.aftercare) L.push(`- ${a}`);
      L.push("");
    }
    if (t.faqs.length) {
      L.push("FAQ:");
      for (const f of t.faqs) L.push(`- Q: ${f.q}\n  A: ${f.a}`);
      L.push("");
    }
  }

  L.push("## General FAQ");
  L.push("");
  for (const f of homeFaqs) L.push(`- Q: ${f.q}\n  A: ${f.a}`);
  L.push("");

  L.push("## Patient resources");
  L.push("");
  L.push(`- [Before and after results](${U("/gallery")})`);
  L.push(`- [Patient stories](${U("/patient-stories")})`);
  L.push(`- [Blog](${U("/blog")})`);
  L.push(`- [Patient guides](${U("/guides")})`);
  for (const g of guidesByDate()) L.push(`  - [${g.title}](${U(`/guides/${g.slug}`)}) — ${g.excerpt}`);
  L.push(`- [International patients](${U("/medical-tourism")})`);
  L.push(`- [日本語](${U("/japanese")}) · [한국어](${U("/korean")})`);
  L.push(`- [About Dental Krafts](${U("/about-us")})`);
  L.push("");

  L.push("## Contact and booking");
  L.push("");
  L.push(`- Book a visit: ${U("/contact-us")}`);
  L.push(`- Phone: ${clinics.map((c) => `${c.phone} (${c.short})`).join(" · ")}`);
  L.push(`- WhatsApp: ${site.whatsappLink}`);
  L.push(`- Email: ${site.email}`);
  L.push("");
  return L.join("\n");
}

export async function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
