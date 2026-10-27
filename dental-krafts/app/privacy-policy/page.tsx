import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Dental Krafts Gurgaon",
  description:
    "Learn what information Dental Krafts collects through its website and clinics, how it is used, and how to contact us about your privacy.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicy() {
  return (
    <>
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Privacy Policy</div>
        <div className="g" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
          <div>
            <span className="eyebrow"><Icon name="shield-check" cls="ic ic-sm" /> Legal</span>
            <h1 className="d">Privacy <em>Policy</em></h1>
            <p className="sub">Dental Krafts respects your privacy. This policy explains the information we collect through this website and at our clinics, why we use it, and how you can contact us about it.</p>
          </div>
        </div>
      </div></section>

      <section className="sp"><div className="wrap">
        <div className="prose" style={{ maxWidth: "76ch" }}>
          <h2>1. Information we collect</h2>
          <p>When you interact with Dental Krafts, we may collect the following types of information:</p>
          <ul>
            <li><b>Website enquiry information:</b> when you submit an appointment or contact form, we collect the name, email address, phone number, preferred date, and message that you provide.</li>
            <li><b>Clinic information:</b> this may include contact details, relevant medical or dental history, and other information needed to provide care.</li>
            <li><b>Treatment records:</b> details of your dental treatments and visits to our clinic.</li>
            <li><b>Payment information:</b> information related to your transactions and billing.</li>
          </ul>

          <h2>2. How we use your information</h2>
          <ul>
            <li><b>To provide dental services:</b> to offer you customised treatment plans and care based on your specific needs.</li>
            <li><b>To improve our services:</b> to enhance our services and ensure we meet your expectations.</li>
            <li><b>To respond to enquiries:</b> website enquiries are delivered to our practice-controlled email account so our team can contact you about your request.</li>
            <li><b>To communicate with you:</b> to provide appointment information and appropriate follow-up communication.</li>
            <li><b>To process payments:</b> to handle billing and payment transactions securely.</li>
          </ul>

          <h2>3. How we protect your information</h2>
          <p>We use reasonable administrative and technical measures intended to protect personal information from unauthorized access or disclosure. No internet transmission or storage system can be guaranteed to be completely secure.</p>
          <ul>
            <li><b>Limited access:</b> access is limited to staff and service providers who need the information for the purposes described in this policy.</li>
            <li><b>Email delivery:</b> website forms are sent through the clinic's configured email service. Please do not include sensitive medical information in a website enquiry.</li>
          </ul>

          <h2>4. Sharing your information</h2>
          <ul>
            <li><b>With your consent:</b> when you give us permission to share your information.</li>
            <li><b>With service providers:</b> with hosting, email, payment, or other providers only as needed to operate our services, subject to appropriate arrangements.</li>
            <li><b>For legal requirements:</b> if required by law or to comply with legal processes.</li>
            <li><b>For medical referrals:</b> if necessary, to provide you with specialised care or treatments.</li>
          </ul>

          <h2>5. Your rights</h2>
          <ul>
            <li><b>Access your information:</b> request a copy of the personal information we hold about you.</li>
            <li><b>Correct your information:</b> update or correct any inaccuracies in your personal information.</li>
            <li><b>Withdraw consent:</b> if you no longer wish for us to use your information for certain purposes, you can withdraw your consent.</li>
          </ul>

          <h2>6. Changes to this privacy policy</h2>
          <p>We may update this Privacy Policy to reflect changes in our practices or applicable requirements. The current version will be posted on this page.</p>

          <h2>7. Contact us</h2>
          <p>If you have any questions or concerns about this Privacy Policy or how we handle your personal information, please contact us at:</p>
          <ul>
            <li><b>Sector 53:</b> DSP-211, 2nd Floor, South Point Mall, Golf Course Road, DLF Phase 5, Sector 53, Gurugram, Haryana 122002</li>
            <li><b>Sector 57:</b> UG-12, 1st Floor, Bestech Central Square Mall, Opp. Hong Kong Bazaar Road, Block G, Sushant Lok 2, Sector 57, Gurugram, Haryana 122011</li>
            <li><b>Phone:</b> +91 98104 48720</li>
            <li><b>Email:</b> {site.email}</li>
          </ul>
          <p>Thank you for choosing Dental Krafts.</p>
        </div>
      </div></section>
    </>
  );
}
