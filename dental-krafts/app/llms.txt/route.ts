import { site } from "@/content/site";
import { clinics } from "@/content/clinics";
import { doctors } from "@/content/doctors";
import { treatments } from "@/content/treatments";
import { guidesByDate } from "@/content/guides";


const U = (p: string) => `${site.domain}${p}`;

function build(): string {
  const lines: string[] = [];
  lines.push("# Dental Krafts");
  lines.push("");
  lines.push(
    "> Specialist dental clinic in Gurgaon (Gurugram), India. Two clinics — Sector 53 (South Point Mall, Golf Course Road) and Sector 57 (Bestech Central Square Mall, Sushant Lok 2) — run by two specialists: Dr Ruchi Goel (prosthodontist, MDS AIIMS New Delhi) and Dr Parmod Gulia (pediatric dentist, MDS PGIMER Chandigarh). The site is in English with Japanese and Korean summaries for international patients."
  );
  lines.push("");
  lines.push("## Doctors");
  lines.push("");
  for (const d of doctors) {
    lines.push(`- [${d.name}](${U(d.slug)}) — ${d.role}. ${d.degree}. Delhi State Dental Council registration ${d.reg}.`);
  }
  lines.push(`- [Our dentists](${U("/our-dentists")}) — overview of both specialists`);
  lines.push("");
  lines.push("## Clinics");
  lines.push("");
  for (const c of clinics) {
    lines.push(`- [Dental Krafts — ${c.name}](${U(c.slug)})`);
    lines.push(`  - Address: ${c.address}`);
    lines.push(`  - Phone: ${c.phone}`);
    lines.push(`  - Hours: ${c.hoursLabel}, Monday, Tuesday, Thursday–Sunday. Closed Wednesdays.`);
    lines.push(`  - Map: https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.mapQuery)}`);
  }
  lines.push("");
  lines.push("## Treatments");
  lines.push("");
  for (const t of treatments) {
    lines.push(`- [${t.name}](${U(`/${t.slug}`)}) — ${t.sub}`);
  }
  lines.push(`- [All treatments](${U("/treatments")})`);
  lines.push("");
  lines.push("## Patient resources");
  lines.push("");
  lines.push(`- [Before and after results](${U("/gallery")}) — cases shared with patient consent`);
  lines.push(`- [Patient stories](${U("/patient-stories")}) — verified reviews from Practo and Justdial`);
  lines.push(`- [Blog](${U("/blog")}) — dental questions answered by the specialists`);
  lines.push(`- [Patient guides](${U("/guides")}) — in-depth, plain-language guides written by one specialist and medically reviewed by the other`);
  for (const g of guidesByDate()) {
    lines.push(`  - [${g.title}](${U(`/guides/${g.slug}`)}) — ${g.excerpt}`);
  }
  lines.push(`- [International patients / dental tourism](${U("/medical-tourism")})`);
  lines.push(`- [日本語](${U("/japanese")}) · [한국어](${U("/korean")}) — language summaries`);
  lines.push(`- [About Dental Krafts](${U("/about-us")})`);
  lines.push("");
  lines.push("## Contact and booking");
  lines.push("");
  lines.push(`- [Book a visit](${U("/contact-us")}) — online booking form`);
  lines.push(`- Phone: ${clinics.map((c) => `${c.phone} (${c.short})`).join(" · ")}`);
  lines.push(`- WhatsApp: ${site.whatsappLink}`);
  lines.push(`- Email: ${site.email}`);
  lines.push("");
  return lines.join("\n");
}

export async function GET() {
  return new Response(build(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
