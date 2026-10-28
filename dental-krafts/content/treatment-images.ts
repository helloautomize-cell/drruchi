/** Live-site images per treatment page, used inside sections (not only the hero).
    First entry = banner if present. Rendered framed 3:2 with object-fit:cover. */
const T = (f: string, alt: string) => ({ src: `/images/treatments/${f}.webp`, alt });

export const treatmentImages: Record<string, { src: string; alt: string }[]> = {
  "root-canal-treatment": [
    T("rct_root-canal-treatment-banner", "Root canal treatment at Dental Krafts, Gurgaon"),
    T("rct_root-canal-treatment-gurgaon", "Root canal treatment in Gurgaon"),
    T("rct_signs-you-need-a-root", "Signs you may need a root canal"),
    T("rct_causes-of-root-canal", "What causes the need for a root canal"),
    T("rct_the-root-canal-treatment-procedure", "The root canal treatment procedure"),
    T("rct_painless-root-canal", "Comfortable root canal treatment"),
    T("rct_points-to-keep", "Points to keep in mind after a root canal"),
    T("rool-canal-treatment", "Root canal treatment"),
  ],
  "dental-implants": [
    T("dental-implants-banner", "Dental implants at Dental Krafts, Gurgaon"),
    T("dental-implants-gurgaon", "Dental implants in Gurgaon"),
    T("types-of-dental-implants", "Types of dental implants"),
    T("why-is-dental-implant", "Why a dental implant replaces a missing tooth best"),
    T("are-you-eligible", "Checking if you are eligible for dental implants"),
    T("dental-implants", "A dental implant and crown"),
  ],
  "all-on-4-dental-implants": [
    T("advantages-of-all-on-four", "Advantages of All-on-4 fixed teeth"),
    T("fixed-bridge-supported-by-4-8", "A fixed bridge supported by implants"),
    T("replace-missing-teeth", "Replacing missing teeth with a full arch"),
    T("dental-implants", "A dental implant and crown"),
  ],
  dentures: [
    T("dentures", "Complete and partial dentures"),
    T("replace-missing-teeth", "Replacing missing teeth"),
  ],
  "dental-crowns": [
    T("dental-crowns-banner", "Dental crowns at Dental Krafts, Gurgaon"),
    T("dental-crowns-in-gurgaon", "Dental crowns in Gurgaon"),
    T("types-of-dental-crowns", "Types of dental crowns"),
    T("need-a-dental-crown", "When you need a dental crown"),
    T("comprehensive-dental-crown", "A comprehensive dental crown plan"),
    T("process-of-placing-a-permanent", "The process of placing a permanent crown"),
    T("post-care-tips", "Care tips after a crown is fitted"),
    T("dental-crowns", "Ceramic dental crowns"),
  ],
  "smile-makeover": [
    T("smile-makeover-banner", "Smile makeover at Dental Krafts, Gurgaon"),
    T("smile-makeover-in-gurgaon", "Smile makeover in Gurgaon"),
    T("real-need", "Planning what your smile really needs"),
  ],
  "cosmetic-dentistry": [
    T("cosmetic-dentist-banner", "Cosmetic dentistry at Dental Krafts, Gurgaon"),
    T("cosmetic-dentist-in-gurgaon", "A cosmetic dentist in Gurgaon"),
    T("cosmetic-dentistry", "Cosmetic dentistry treatments"),
  ],
  "dental-veneers": [
    T("dental-veneers", "Porcelain dental veneers"),
    T("cosmetic-dentistry", "Cosmetic dentistry treatments"),
  ],
  invisalign: [
    T("invisalign-banner", "Invisalign clear aligners at Dental Krafts"),
    T("what-problems-can-invisalign", "The problems clear aligners can fix"),
    T("invisalign-or-toothache", "Clear aligners versus leaving crooked teeth"),
    T("best-invisible-aligners", "Invisible aligners for teens and adults"),
  ],
  "teeth-braces": [
    T("teeth-braces-banner", "Teeth braces at Dental Krafts, Gurgaon"),
    T("teeth-braces-in-gurgaon", "Teeth braces in Gurgaon"),
    T("why-choose-our-braces", "Why choose braces at Dental Krafts"),
  ],
  "teeth-whitening": [
    T("teeth-whitening-banner", "Teeth whitening at Dental Krafts, Gurgaon"),
    T("teeth-whitening-in-gurgaon", "Teeth whitening in Gurgaon"),
    T("teeth-whitening-options", "Professional teeth whitening options"),
    T("in-office-vs-at-home-teeth", "In-office versus at-home whitening"),
    T("why-do-teeth-get", "Why teeth get stained"),
  ],
  "pediatric-dentist": [
    T("kids-dentist-banner", "A kids' dentist at Dental Krafts, Gurgaon"),
    T("kids-dentist-in-gurgaon", "A kids' dentist in Gurgaon"),
    T("paediatric-dentist-banner", "A specialist paediatric dentist"),
    T("expert-in-pediatric", "An expert in pediatric dentistry"),
  ],
  "dental-fillings": [
    T("dental-fillings", "Tooth-coloured dental fillings"),
  ],
  "gum-disease": [
    T("gum-disease-treatment", "Gum disease treatment"),
  ],
  "teeth-cleaning": [
    T("teeth-cleaning", "Professional teeth cleaning"),
  ],
  "general-dentistry": [
    T("why-dental-krafts", "Why families choose Dental Krafts"),
    T("connect-with-dental-krafts", "Connect with Dental Krafts"),
  ],
};
