import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: { absolute: "Medical Disclaimer | Dental Krafts Gurgaon" },
  description:
    "The content on the Dental Krafts website is general information, not personal medical advice. Please see a dentist for your own condition.",
  alternates: { canonical: "/medical-disclaimer" },
};

export default function MedicalDisclaimer() {
  return (
    <>
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Medical Disclaimer</div>
        <div className="g" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
          <div>
            <span className="eyebrow"><Icon name="shield-check" cls="ic ic-sm" /> Legal</span>
            <h1 className="d">Medical <em>Disclaimer</em></h1>
            <p className="sub">The information on this website is general in nature. It is not a substitute for an examination or personal advice from a dentist.</p>
          </div>
        </div>
      </div></section>

      <section className="sp"><div className="wrap">
        <div className="prose" style={{ maxWidth: "76ch" }}>
          <h2>1. General information only</h2>
          <p>The articles, guides and pages on this website are written by qualified dentists and are intended to explain dental topics in plain language. They are not a diagnosis, treatment plan or personal recommendation for your situation.</p>

          <h2>2. See a dentist for your own condition</h2>
          <p>Teeth, gums and jaws differ from person to person. What is right for one patient may be wrong for another. Please book a consultation so a dentist can examine you before any decision about treatment.</p>

          <h2>3. Emergencies</h2>
          <p>If you have severe pain, facial swelling, uncontrolled bleeding or an injury to the teeth or jaw, do not wait for a website reply — call one of our clinics or seek urgent medical care.</p>

          <h2>4. External links</h2>
          <p>Where we link to outside sources (professional associations, health services), those sites are responsible for their own content. A link does not mean we endorse every statement on them.</p>

          <h2>5. Contact</h2>
          <p>Questions about this disclaimer: <a href="mailto:kraftsdental@gmail.com">kraftsdental@gmail.com</a>.</p>
        </div>
      </div></section>
    </>
  );
}
