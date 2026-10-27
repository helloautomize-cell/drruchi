import Link from "next/link";
import type { Metadata } from "next";
import { Icon } from "@/components/icons";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms and Conditions | Dental Krafts Gurgaon",
  description:
    "Review Dental Krafts' Terms and Conditions for our services, appointment policies, payment details, and responsibilities. Contact us for more information.",
  alternates: { canonical: "/terms-conditions" },
};

export default function TermsConditions() {
  return (
    <>
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / Terms and Conditions</div>
        <div className="g" style={{ gridTemplateColumns: "minmax(0,1fr)" }}>
          <div>
            <span className="eyebrow"><Icon name="receipt" cls="ic ic-sm" /> Legal</span>
            <h1 className="d">Terms and <em>Conditions</em></h1>
            <p className="sub">Welcome to Dental Krafts. By using our services, you agree to these terms and conditions. If you have any questions or concerns, feel free to reach out to us.</p>
          </div>
        </div>
      </div></section>

      <section className="sp"><div className="wrap">
        <div className="prose" style={{ maxWidth: "76ch" }}>
          <h2>1. Our services</h2>
          <p>At Dental Krafts, we offer a variety of dental services, from routine check-ups to specialised treatments. Our goal is to provide care that's tailored to your needs.</p>

          <h2>2. Appointments</h2>
          <ul>
            <li><b>Booking:</b> you can book appointments via our website, by phone, or in person at our clinic.</li>
            <li><b>Cancellation:</b> if you need to cancel or reschedule, please let us know at least 24 hours in advance to avoid a cancellation fee.</li>
            <li><b>Punctuality:</b> arriving on time helps us stay on schedule and ensures you get the most out of your appointment. If you're running late, please call us.</li>
          </ul>

          <h2>3. Payment</h2>
          <ul>
            <li><b>Fees:</b> we'll let you know the cost of services before your treatment starts. We accept payments by credit/debit card, UPI and cash.</li>
            <li><b>Insurance:</b> we accept various insurance plans. Please check with us to confirm if your plan is accepted and what's covered. We'll give you an itemised bill for reimbursement.</li>
          </ul>

          <h2>4. Your responsibilities</h2>
          <ul>
            <li><b>Provide accurate information:</b> share your medical history and personal details truthfully so we can provide the best care.</li>
            <li><b>Follow instructions:</b> stick to the treatment plan and advice given by our dental team.</li>
            <li><b>Respect:</b> we ask that you treat our staff and other patients with kindness and respect.</li>
          </ul>

          <h2>5. Confidentiality</h2>
          <p>Your privacy matters to us. We handle your personal and medical information with care, as detailed in our Privacy Policy.</p>

          <h2>6. Liability</h2>
          <ul>
            <li><b>Results:</b> while we aim to provide the best care, we can't guarantee specific outcomes or results from any treatment.</li>
            <li><b>Limitations:</b> Dental Krafts isn't responsible for any indirect or unexpected damages that might arise from using our services or information provided.</li>
          </ul>

          <h2>7. Intellectual property</h2>
          <p>All content on our website, including text, images, and logos, belongs to Dental Krafts or its licensors and is protected by copyright and trademark laws. Unauthorized use of this content is prohibited.</p>

          <h2>8. Contact us</h2>
          <p>If you have any questions or need further information, please contact us:</p>
          <ul>
            <li><b>Sector 53:</b> DSP-211, 2nd Floor, South Point Mall, Golf Course Road, DLF Phase 5, Sector 53, Gurugram, Haryana 122002</li>
            <li><b>Sector 57:</b> UG-12, 1st Floor, Bestech Central Square Mall, Opp. Hong Kong Bazaar Road, Block G, Sushant Lok 2, Sector 57, Gurugram, Haryana 122011</li>
            <li><b>Phone:</b> +91 98104 48720</li>
            <li><b>Email:</b> {site.email}</li>
          </ul>
        </div>
      </div></section>
    </>
  );
}
