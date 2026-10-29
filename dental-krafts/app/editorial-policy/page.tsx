import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: { absolute: "Editorial Policy | Dental Krafts Gurgaon" },
  description:
    "How Dental Krafts writes and reviews its dental guides and articles — who writes them, who checks them, and the sources we use.",
  alternates: { canonical: "/editorial-policy" },
};

export default function EditorialPolicy() {
  return (
    <>
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Editorial Policy</div>
        <div className="g" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
          <div>
            <span className="eyebrow"><Icon name="shield-check" cls="ic ic-sm" /> Trust</span>
            <h1 className="d">Editorial <em>Policy</em></h1>
            <p className="sub">How the guides and articles on this website are written, checked and kept up to date.</p>
          </div>
        </div>
      </div></section>

      <section className="sp"><div className="wrap">
        <div className="prose" style={{ maxWidth: "76ch" }}>
          <h2>1. Who writes our content</h2>
          <p>Every guide and article on this website is written by one of our two specialists and medically reviewed by the other:</p>
          <ul>
            <li><b>Dr Ruchi Goel</b> — BDS, MDS (Prosthodontics), AIIMS New Delhi. Delhi State Dental Council registration A-7387.</li>
            <li><b>Dr Parmod Gulia</b> — BDS, MDS (Paedodontics &amp; Preventive Dentistry), PGIMER Chandigarh. Delhi State Dental Council registration A-12323.</li>
          </ul>

          <h2>2. How content is reviewed</h2>
          <ul>
            <li>Each medical article names its author and the doctor who medically reviewed it, with links to their profile pages.</li>
            <li>Clinical statements are checked against recognised sources such as national specialty guidelines and dental associations, which are cited at the end of each guide where used.</li>
            <li>Articles are re-read on a schedule and carry a "last updated" date.</li>
          </ul>

          <h2>3. What we do not publish</h2>
          <ul>
            <li>No claims of guaranteed outcomes, "100% success" or painless-everything promises.</li>
            <li>No prices or fees published as articles; treatment is always quoted after an examination, in writing.</li>
            <li>No anonymous or AI-generated content without a named doctor standing behind it.</li>
          </ul>

          <h2>4. Corrections</h2>
          <p>If you spot something that looks wrong or outdated, email <a href="mailto:kraftsdental@gmail.com">kraftsdental@gmail.com</a> and a doctor will review it.</p>
        </div>
      </div></section>
    </>
  );
}
