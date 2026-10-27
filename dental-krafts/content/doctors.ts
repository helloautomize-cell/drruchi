export type Doctor = {
  id: "ruchi" | "parmod";
  name: string;
  slug: string;
  role: string;
  eyebrow: string;
  degree: string;
  portrait: string;
  atWork: string;
  chips: { icon: string; label: string }[];
  practo: string;
  reg: string;
  timeline: { year: string; text: string; key?: boolean }[];
  treats: { icon: string; title: string; sub: string; href?: string }[];
  reviews: string[]; // review ids
  faqs: { q: string; a: string }[];
};

export const doctors: Doctor[] = [
  {
    id: "ruchi",
    name: "Dr Ruchi Goel",
    slug: "/dr-ruchi-goel",
    role: "Prosthodontist & Implantologist",
    eyebrow: "Prosthodontist and implantologist · Dental Krafts",
    degree:
      "BDS, MDS (Prosthodontics), All India Institute of Medical Sciences, New Delhi",
    portrait: "/images/ai/dr-ruchi-portrait.webp",
    atWork: "/images/ai/dr-ruchi-at-work.webp",
    chips: [
      { icon: "i-medal", label: "AIIMS MDS entrance topper, 2012" },
      { icon: "i-shield-check", label: "Reg. A-7387, Delhi State Dental Council" },
      { icon: "i-star", label: "98% on Practo, 268 patients" },
    ],
    practo: "98% on Practo · 268 votes",
    reg: "A-7387",
    timeline: [
      { year: "2007", text: "BDS, D.A.V. Centenary Dental College, Yamuna Nagar" },
      { year: "2007–08", text: "Internship, Govt Dental College, PGIMS Rohtak" },
      { year: "2008–09", text: "General Dentist, Guru Gobind Singh Hospital" },
      { year: "2010–11", text: "House Surgeon, PGIMER Chandigarh" },
      { year: "2012", text: "First rank, AIIMS MDS entrance examination", key: true },
      { year: "2012–15", text: "Junior Resident, Prosthodontics, AIIMS New Delhi" },
      { year: "2015", text: "MDS Prosthodontics, AIIMS New Delhi", key: true },
      { year: "2015–", text: "Co-founder, Dental Krafts" },
      { year: "2023", text: "Published research on occlusal splints (IJPRD)" },
      { year: "2025", text: "National Achievers Award" },
      { year: "IDA · IPS", text: "Indian Dental Association, Indian Prosthodontic Society" },
    ],
    treats: [
      { icon: "i-tooth-implant", title: "Dental implants", sub: "Single, multiple and full-arch", href: "/dental-implants" },
      { icon: "i-teeth", title: "All-on-4 / All-on-6", sub: "A full set of fixed teeth", href: "/all-on-4-dental-implants" },
      { icon: "i-smile", title: "Dentures", sub: "Complete, partial, implant-held", href: "/dentures" },
      { icon: "i-tooth", title: "Crowns and bridges", sub: "Zirconia and ceramic", href: "/dental-crowns" },
      { icon: "i-sparkles", title: "Smile design", sub: "Veneers and makeovers", href: "/smile-makeover" },
      { icon: "i-tooth-check", title: "Full-mouth rehab", sub: "Worn teeth and bite problems", href: "/full-mouth-rehabilitation" },
      { icon: "i-user-heart", title: "TMJ disorders", sub: "Jaw joint pain and clicking" },
      { icon: "i-shield-check", title: "Maxillofacial prosthetics", sub: "After surgery or injury" },
    ],
    reviews: ["aditya", "sachid", "anshul", "kuldeep"],
    faqs: [
      { q: "What is a prosthodontist?", a: "A dentist with three more years of specialist training in replacing and restoring teeth: implants, dentures, crowns, bridges and complex rebuilding. In India it's an MDS in Prosthodontics." },
      { q: "Can I replace all my teeth with implants?", a: "Often, yes. All-on-4 or All-on-6 fixes a full set of teeth on four to six implants. Dr Ruchi will check your bone with a scan before recommending it." },
      { q: "I already wear dentures. Can they be made more secure?", a: "Yes. Two to four implants can hold a denture firmly in place, so it won't slip while you eat or speak." },
    ],
  },
  {
    id: "parmod",
    name: "Dr Parmod Gulia",
    slug: "/dr-parmod-gulia",
    role: "Pediatric & Preventive Dentist",
    eyebrow: "Pediatric and preventive dentist · Dental Krafts",
    degree: "BDS, MDS (Paedodontics & Preventive Dentistry), PGIMER Chandigarh",
    portrait: "/images/ai/dr-parmod-portrait.webp",
    atWork: "/images/doctors/dk-doctors-performing-procedure-1.webp",
    chips: [
      { icon: "i-medal", label: "Silver Medal, PGIMER 2013" },
      { icon: "i-award", label: "Senior Research Fellow, AIIMS" },
      { icon: "i-shield-check", label: "Reg. A-12323, Delhi State Dental Council" },
      { icon: "i-star", label: "95% on Practo, 740 patients" },
    ],
    practo: "95% on Practo · 740 votes",
    reg: "A-12323",
    timeline: [
      { year: "2008", text: "BDS, Govt Dental College, Rohtak" },
      { year: "2009–10", text: "House Surgeon, PGIMER Chandigarh" },
      { year: "2010–13", text: "Junior Resident, Paedodontics, PGIMER Chandigarh" },
      { year: "2013", text: "MDS Paedodontics & Preventive Dentistry, PGIMER · Silver Medal", key: true },
      { year: "2013–14", text: "Senior Research Fellow, AIIMS New Delhi" },
      { year: "2014", text: "Best Paper Presentation, ISPPD Conference", key: true },
      { year: "2014–15", text: "Consultant, Dantah, Safdarjung Enclave" },
      { year: "2015–", text: "Co-founder, Dental Krafts" },
      { year: "IDA · ISPPD", text: "Indian Dental Association, Indian Society of Pedodontics & Preventive Dentistry" },
    ],
    treats: [
      { icon: "i-first-tooth", title: "Children's check-ups", sub: "From the first birthday", href: "/pediatric-dentist" },
      { icon: "i-tooth", title: "Fillings and kids' crowns", sub: "Tooth-coloured, gentle", href: "/dental-fillings" },
      { icon: "i-shield-check", title: "Sealants and fluoride", sub: "Cavity prevention" },
      { icon: "i-teeth", title: "Space maintainers", sub: "When a milk tooth is lost early" },
      { icon: "i-retainer-teeth", title: "Myofunctional appliances", sub: "Habit-correcting" },
      { icon: "i-heart", title: "Special-needs dentistry", sub: "Patient, unhurried care" },
      { icon: "i-sterilizer", title: "Treatment under GA", sub: "In hospital, when kindest" },
      { icon: "i-tooth-root", title: "Root canals & wisdom teeth", sub: "For teens and adults", href: "/root-canal-treatment" },
      { icon: "i-braces-teeth", title: "Clear aligners", sub: "Invisalign and others", href: "/invisalign" },
      { icon: "i-sparkles", title: "Whitening", sub: "Professional, supervised", href: "/teeth-whitening" },
    ],
    reviews: ["subhash", "vrinda", "dhruv", "bijay", "chandan", "gaparent"],
    faqs: [
      { q: "When should my child first see a dentist?", a: "By their first birthday, or within six months of the first tooth. Early visits are short, friendly and mostly about prevention." },
      { q: "Why see a pediatric dentist instead of a general dentist?", a: "Children's teeth, behaviour and growth are different. A pediatric dentist has three more years of training in exactly that." },
      { q: "Do milk teeth really need fillings?", a: "Yes, usually. Milk teeth hold space for adult teeth, and an untreated cavity can cause pain, infection and crowding later." },
      { q: "What is treatment under general anaesthesia?", a: "For very young or anxious children, or children with special needs, who need a lot of treatment, it's done in a hospital operating theatre with an anaesthetist, all in one session. We'll explain the costs separately (hospital charges are set by the hospital)." },
    ],
  },
];

export const doctorById = (id: string) => doctors.find((d) => d.id === id)!;
