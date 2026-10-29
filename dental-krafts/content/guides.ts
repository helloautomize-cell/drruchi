// Patient guides content. Generated from the design preview (25-blog-page).
// Add a guide by appending to GUIDES. Inline markup in text: **bold** and [label](/path).

export type GuideBlock =
  | { type: "lead" | "p" | "callout"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "ul" | "ol"; items: string[] }
  | { type: "figure"; src: string; alt: string; caption: string }
  | { type: "table"; caption: string; cols: string[]; rows: string[][] };

export type DoctorKey = "ruchi" | "parmod";

export type Guide = {
  slug: string; category: string; title: string; seoTitle: string; dek: string; excerpt: string;
  author: DoctorKey; reviewer: DoctorKey; published: string; modified: string; readMins: number; wordCount: number;
  image: string; imageAlt: string; imagePos: string;
  about: { type: string; name: string; sameAs: string[] };
  treatment: { name: string; href: string; img: string; line: string };
  quick: string; body: GuideBlock[]; takeaways: string[];
  faq: { q: string; a: string }[]; sources: { title: string; url: string; site: string }[];
};

export const SITE = "https://dentalkrafts.com";

export const GUIDE_CATEGORIES = [
  {
    "slug": "implants-and-missing-teeth",
    "name": "Implants and missing teeth"
  },
  {
    "slug": "root-canal-and-saving-teeth",
    "name": "Root canal and saving teeth"
  },
  {
    "slug": "smile-design",
    "name": "Smile design"
  },
  {
    "slug": "braces-and-aligners",
    "name": "Braces and aligners"
  },
  {
    "slug": "kids-teeth",
    "name": "Kids' teeth"
  },
  {
    "slug": "gums-and-everyday-care",
    "name": "Gums and everyday care"
  }
] as const;

export const GUIDE_AUTHORS = {
  "ruchi": {
    "id": "dr-ruchi-goel",
    "name": "Dr Ruchi Goel",
    "short": "Dr Ruchi",
    "role": "Prosthodontist and implantologist",
    "cred": "BDS, MDS Prosthodontics (AIIMS New Delhi)",
    "reg": "Reg. A-7387, Delhi State Dental Council",
    "img": "/images/doctors/dr-ruchi-goel.webp",
    "url": "/dr-ruchi-goel",
    "bio": "Restores and replaces teeth: implants, crowns, bridges, dentures and full-mouth rehabilitation. AIIMS MDS entrance topper, 2012.",
    "alumni": [
      "All India Institute of Medical Sciences, New Delhi",
      "DAV Centenary Dental College, Yamuna Nagar"
    ]
  },
  "parmod": {
    "id": "dr-parmod-gulia",
    "name": "Dr Parmod Gulia",
    "short": "Dr Parmod",
    "role": "Pediatric and preventive dentist",
    "cred": "BDS, MDS Pedodontics (PGIMER Chandigarh)",
    "reg": "Reg. A-12323, Delhi State Dental Council",
    "img": "/images/doctors/dr-parmod-gulia.webp",
    "url": "/dr-parmod-gulia",
    "bio": "Treats children and teenagers, from a baby's first check-up to braces. PGIMER silver medallist and ISPPD best paper award, 2014.",
    "alumni": [
      "Post Graduate Institute of Medical Education and Research, Chandigarh",
      "Government Dental College, Rohtak"
    ]
  }
} as const;

export const GUIDES: Guide[] = [
  {
    "slug": "child-first-dental-visit",
    "category": "kids-teeth",
    "title": "When Should Your Child First See a Dentist?",
    "seoTitle": "When Should Your Child First See a Dentist? | Dental Krafts Gurgaon",
    "dek": "By the first birthday, or once the first tooth shows. A pediatric dentist explains why the visit is so early and what actually happens in the chair.",
    "excerpt": "By the first birthday, or once the first tooth shows. Here is why the visit is so early, and what actually happens.",
    "author": "parmod",
    "reviewer": "ruchi",
    "published": "2026-10-29",
    "modified": "2026-10-29",
    "readMins": 6,
    "image": "/images/guides/child-first-dental-visit.webp",
    "imageAlt": "Young girl smiling in the dental chair while a pediatric dentist checks her teeth",
    "imagePos": "40% 60%",
    "about": {
      "type": "MedicalProcedure",
      "name": "Pediatric dental examination",
      "sameAs": [
        "https://en.wikipedia.org/wiki/Pediatric_dentistry"
      ]
    },
    "treatment": {
      "name": "Kids' dentistry",
      "href": "/pediatric-dentist",
      "img": "/images/guides/t-kids.webp",
      "line": "Gentle check-ups, fluoride care, fillings and habit advice for babies, children and teens."
    },
    "quick": "Pediatric dental bodies, including the American Academy of Pediatric Dentistry, advise a first dental visit when the first tooth appears and no later than the first birthday. The visit is short and gentle. The dentist checks the teeth and gums, looks for early signs of decay and shows you how to clean your baby's teeth at home. Starting early makes check-ups feel normal, and it catches problems while they are still small.",
    "body": [
      {
        "type": "lead",
        "text": "Most parents we meet expected the first dental visit to happen around age three, or when something starts to hurt. By then, decay may already have had two years to start. Baby teeth have thin enamel, and a cavity can spread through it quickly."
      },
      {
        "type": "h2",
        "id": "why-so-early",
        "text": "Why so early?"
      },
      {
        "type": "p",
        "text": "Tooth decay is one of the most common long-term conditions in children, and it often starts quietly. Early decay looks like a chalky white line near the gums, which is easy to miss at home. A dentist can spot it while it can still be reversed with fluoride and better habits."
      },
      {
        "type": "p",
        "text": "The first visit also gives you a plan. We talk about feeding, teething, thumb-sucking and what to expect as more teeth come in. And your child learns that the dental chair is a calm place, long before they ever need a filling."
      },
      {
        "type": "h2",
        "id": "what-happens",
        "text": "What happens at the first visit?"
      },
      {
        "type": "p",
        "text": "For babies and toddlers, the visit usually takes 20 to 30 minutes and involves no drilling. A typical visit looks like this:"
      },
      {
        "type": "ol",
        "items": [
          "**A short chat.** We ask about feeding, bottles at night, medicines and any family history of decay.",
          "**A knee-to-knee check.** Your child lies back on your lap facing the dentist, so they can see you the whole time.",
          "**A look at teeth, gums and bite.** We check for white spots, early cavities, and how the teeth and jaws are developing.",
          "**Cleaning and fluoride if needed.** A gentle wipe or brush, and a fluoride varnish if the teeth would benefit from it.",
          "**A home plan.** We show you how to brush your child's teeth and how much toothpaste to use, and agree when to come back."
        ]
      },
      {
        "type": "figure",
        "src": "/images/guides/kids-operatory.webp",
        "caption": "A children's treatment room at Dental Krafts, painted so the first visit feels like play.",
        "alt": "Children's dental treatment room with a colourful wall mural"
      },
      {
        "type": "h2",
        "id": "by-age",
        "text": "What we check, by age"
      },
      {
        "type": "table",
        "caption": "What a pediatric dentist checks at each early stage",
        "cols": [
          "Age",
          "What we check",
          "What you can do at home"
        ],
        "rows": [
          [
            "6 to 12 months",
            "First teeth, gums, teething, feeding habits",
            "Wipe gums and new teeth twice a day; a rice-grain smear of fluoride toothpaste once teeth appear"
          ],
          [
            "1 to 3 years",
            "Early white spots, bottle and night-feeding effects, bite",
            "Brush twice a day; avoid sending your child to bed with milk or juice in a bottle"
          ],
          [
            "3 to 6 years",
            "Cavities between teeth, habits such as thumb-sucking, spacing for adult teeth",
            "Use a pea-sized amount of fluoride toothpaste; help with brushing until about age seven"
          ]
        ]
      },
      {
        "type": "h2",
        "id": "prepare",
        "text": "How to prepare your child"
      },
      {
        "type": "ul",
        "items": [
          "Book a morning slot, when young children are usually rested and calmer.",
          "Keep the words simple and positive: \"The dentist is going to count your teeth.\" Avoid words like \"hurt\" or \"injection\".",
          "Read a picture book about visiting the dentist, or play a counting-teeth game at home.",
          "Bring a favourite toy, and stay close. Your calm is the most reassuring thing in the room."
        ]
      },
      {
        "type": "h2",
        "id": "book-sooner",
        "text": "Signs to book sooner"
      },
      {
        "type": "p",
        "text": "Don't wait for the routine visit if you notice any of these:"
      },
      {
        "type": "ul",
        "items": [
          "White, brown or black spots on the teeth, especially near the gums",
          "Swelling of the gums or face, or a small pimple-like bump on the gum",
          "Pain, crying while eating, or refusing food on one side",
          "A fall or knock that chips, loosens or darkens a tooth"
        ]
      },
      {
        "type": "callout",
        "text": "A knocked-out **adult** tooth is an emergency. Hold it by the crown, keep it moist in milk, and call either clinic straight away. Baby teeth are not put back, but your child should still be seen the same day."
      },
      {
        "type": "h2",
        "id": "home-care",
        "text": "Caring for baby teeth at home"
      },
      {
        "type": "p",
        "text": "Baby teeth hold space for the adult teeth and help your child chew and speak clearly, so they are worth protecting. Brush twice a day, last thing at night and one other time. Under three, use a smear of fluoride toothpaste the size of a grain of rice; from three to six, a pea-sized amount. Keep sugary drinks and snacks to mealtimes, and give only water between meals and at night."
      },
      {
        "type": "h2",
        "id": "for-you",
        "text": "What this means for you"
      },
      {
        "type": "p",
        "text": "If your child has a tooth, or is close to their first birthday, it is a good time to book. Our [kids' dentistry](/pediatric-dentist) page explains what we offer. [Dr Parmod Gulia](/dr-parmod-gulia) sees children at both clinics, Sector 53 and Sector 57."
      }
    ],
    "takeaways": [
      "Book the first dental visit when the first tooth appears, and no later than the first birthday.",
      "The first visit is short and gentle: a knee-to-knee check, a home plan, and fluoride if needed.",
      "Use a rice-grain smear of fluoride toothpaste under three, and a pea-sized amount from three to six.",
      "White or brown spots, swelling, pain or a knock to a tooth mean you should book sooner."
    ],
    "faq": [
      {
        "q": "Are baby teeth important if they fall out anyway?",
        "a": "Yes. Baby teeth hold the space for adult teeth, help with chewing and speech, and some stay until around age twelve. Decay in baby teeth can cause pain and infection, and it can affect the adult teeth developing underneath."
      },
      {
        "q": "Should I use fluoride toothpaste for my baby?",
        "a": "Most dental guidance, including the NHS and the American Academy of Pediatric Dentistry, recommends fluoride toothpaste from the first tooth. Use a smear the size of a grain of rice under age three and a pea-sized amount from three to six."
      },
      {
        "q": "My child is scared of the dentist. What can I do?",
        "a": "Keep the visit short and positive, use simple words, and stay close. A pediatric dentist is trained to work at a child's pace. If your child is anxious, tell us when you book and we will plan the visit around them."
      },
      {
        "q": "How often should my child see a dentist after the first visit?",
        "a": "Many children are seen about every six months. The dentist may suggest more frequent visits if your child is at higher risk of decay, or fewer if their teeth are very healthy."
      },
      {
        "q": "What if my child already has a cavity?",
        "a": "Small cavities in baby teeth can often be treated simply, sometimes without drilling. The sooner a cavity is seen, the more options there are, so book a check-up rather than waiting for pain."
      }
    ],
    "sources": [
      {
        "title": "American Academy of Pediatric Dentistry. Policy on the dental home.",
        "url": "https://www.aapd.org/research/oral-health-policies--recommendations/dental-home/",
        "site": "aapd.org"
      },
      {
        "title": "American Academy of Pediatric Dentistry. Parent FAQ.",
        "url": "https://www.aapd.org/resources/parent/faq/",
        "site": "aapd.org"
      },
      {
        "title": "NHS. Taking care of children's teeth.",
        "url": "https://www.nhs.uk/live-well/healthy-teeth-and-gums/taking-care-of-childrens-teeth/",
        "site": "nhs.uk"
      }
    ],
    "wordCount": 1147
  },
  {
    "slug": "dental-implant-vs-bridge",
    "category": "implants-and-missing-teeth",
    "title": "Dental Implant or Bridge: Which Is Right for a Missing Tooth?",
    "seoTitle": "Dental Implant vs Bridge: Which Is Right for You? | Dental Krafts Gurgaon",
    "dek": "An implant replaces the root as well as the tooth. A bridge borrows support from the teeth on either side. Here is how a prosthodontist weighs the two.",
    "excerpt": "An implant replaces the root as well as the tooth; a bridge leans on its neighbours. How a prosthodontist decides.",
    "author": "ruchi",
    "reviewer": "parmod",
    "published": "2026-10-27",
    "modified": "2026-10-27",
    "readMins": 7,
    "image": "/images/guides/dental-implant-vs-bridge.webp",
    "imageAlt": "Model of a lower jaw showing a dental implant beside natural teeth, with a ceramic crown in front",
    "imagePos": "55% 55%",
    "about": {
      "type": "MedicalProcedure",
      "name": "Dental implant",
      "sameAs": [
        "https://en.wikipedia.org/wiki/Dental_implant",
        "https://en.wikipedia.org/wiki/Bridge_(dentistry)"
      ]
    },
    "treatment": {
      "name": "Dental implants",
      "href": "/dental-implants",
      "img": "/images/guides/t-dental-implants.webp",
      "line": "Single implants, implant bridges and All-on-4, planned and placed by a prosthodontist."
    },
    "quick": "A dental implant is a small titanium post placed in the jawbone that holds a crown, so it stands on its own and leaves the neighbouring teeth untouched. A bridge fills the gap with a false tooth fixed to crowns on the teeth either side, which means those teeth are trimmed. Implants need enough healthy bone and a few months to heal. A bridge is usually finished in two or three visits. The right choice depends on your bone, your gums, the neighbouring teeth and your general health.",
    "body": [
      {
        "type": "lead",
        "text": "When a tooth is lost, the two options most people hear about are an implant and a bridge. Both are fixed, so you don't take them out at night, and both can look natural. They work in very different ways, though, and that difference matters more than which one sounds more modern."
      },
      {
        "type": "h2",
        "id": "what-is-implant",
        "text": "What is a dental implant?"
      },
      {
        "type": "p",
        "text": "An implant replaces the root of the tooth. A small titanium screw is placed into the jawbone under local anaesthesia. Over the next few months the bone grows tightly around it, a process called osseointegration. A crown is then fixed on top, made to match your other teeth."
      },
      {
        "type": "p",
        "text": "Because it is anchored in bone, an implant does not rely on any other tooth. It also puts chewing forces back into the jaw, which helps the bone in that area stay in shape."
      },
      {
        "type": "h2",
        "id": "what-is-bridge",
        "text": "What is a dental bridge?"
      },
      {
        "type": "p",
        "text": "A bridge spans the gap. The teeth on either side are shaped and fitted with crowns, and a false tooth is joined between them as one piece. It is cemented in place and usually takes two or three visits."
      },
      {
        "type": "p",
        "text": "A bridge is a well-proven treatment and a good fit in the right mouth. The trade-off is that healthy enamel is removed from the supporting teeth, and those teeth now carry the load of three."
      },
      {
        "type": "h2",
        "id": "at-a-glance",
        "text": "Implant vs bridge at a glance"
      },
      {
        "type": "table",
        "caption": "Dental implant compared with a dental bridge",
        "cols": [
          "",
          "Dental implant",
          "Dental bridge"
        ],
        "rows": [
          [
            "Replaces the root?",
            "Yes, a titanium post in the bone",
            "No, the false tooth sits on the gum"
          ],
          [
            "Neighbouring teeth",
            "Left untouched",
            "Trimmed and crowned to hold the bridge"
          ],
          [
            "Treatment time",
            "Usually 3 to 6 months, including healing",
            "Usually 2 to 3 visits over a few weeks"
          ],
          [
            "Surgery",
            "A minor procedure under local anaesthesia",
            "No surgery"
          ],
          [
            "Cleaning",
            "Brush and floss like a natural tooth",
            "Needs a floss threader or interdental brush under the false tooth"
          ],
          [
            "Bone in the gap",
            "Helps keep it",
            "Can slowly shrink over time"
          ]
        ]
      },
      {
        "type": "figure",
        "src": "/images/guides/implant-options-diagram.webp",
        "caption": "Implants can hold a single crown, a bridge, or a full arch of teeth.",
        "alt": "Diagram showing implant-supported crowns, bridges and full-arch options"
      },
      {
        "type": "h2",
        "id": "implant-better",
        "text": "When an implant usually makes more sense"
      },
      {
        "type": "ul",
        "items": [
          "The teeth next to the gap are healthy and have no large fillings or crowns.",
          "You have enough bone, or can have a small graft to build it up.",
          "Your gums are healthy and you don't smoke, or are willing to stop around treatment.",
          "You want the longest-term option and can allow a few months for healing."
        ]
      },
      {
        "type": "h2",
        "id": "bridge-better",
        "text": "When a bridge can be the better choice"
      },
      {
        "type": "ul",
        "items": [
          "The neighbouring teeth already need crowns, so shaping them is not a loss.",
          "There is not enough bone, and you would prefer to avoid grafting.",
          "A medical condition or medicine makes minor surgery unsuitable for now.",
          "You need the gap filled quickly, for example before an event."
        ]
      },
      {
        "type": "h2",
        "id": "leave-the-gap",
        "text": "What if you leave the gap?"
      },
      {
        "type": "p",
        "text": "A gap is more than a cosmetic problem. Over months and years, the teeth beside it can tip into the space, and the opposite tooth can drift out of its socket. That changes your bite and makes food trap more easily. The bone where the root used to be also slowly shrinks, which can make an implant harder to place later."
      },
      {
        "type": "h2",
        "id": "how-we-decide",
        "text": "How we decide at Dental Krafts"
      },
      {
        "type": "p",
        "text": "We start with an examination and X-rays, and a 3D scan where bone needs to be measured precisely. We check the health of your gums and the neighbouring teeth, and talk through your medical history. Then we lay out each option, how long it takes and how to care for it, so you can decide with the full picture."
      },
      {
        "type": "h2",
        "id": "for-you",
        "text": "What this means for you"
      },
      {
        "type": "p",
        "text": "If the teeth around your gap are healthy, an implant is often the better long-term choice. If they already need crowns, a bridge can do two jobs at once. Our [dental implants](/dental-implants) and [crowns and bridges](/dental-crowns) pages explain each treatment. [Dr Ruchi Goel](/dr-ruchi-goel) plans implant and bridge work at both clinics, Sector 53 and Sector 57."
      }
    ],
    "takeaways": [
      "An implant replaces the root and stands alone; a bridge is held by crowns on the neighbouring teeth.",
      "Implants protect the jawbone and leave healthy teeth untouched, but need enough bone and a few months to heal.",
      "A bridge is faster and avoids surgery, and suits gaps where the neighbouring teeth already need crowns.",
      "Leaving a gap lets teeth drift and bone shrink, so it is worth deciding sooner rather than later."
    ],
    "faq": [
      {
        "q": "Is a dental implant better than a bridge?",
        "a": "Neither is better for everyone. An implant is often preferred when the neighbouring teeth are healthy and there is enough bone. A bridge can be the better choice when those teeth already need crowns or when surgery is not suitable."
      },
      {
        "q": "Does getting a dental implant hurt?",
        "a": "The implant is placed under local anaesthesia, so you should feel pressure but not pain. Most people describe a few days of soreness afterwards, similar to having a tooth removed, which is usually managed with ordinary painkillers."
      },
      {
        "q": "How long does a dental bridge last?",
        "a": "Many bridges last ten years or longer with good cleaning and regular check-ups. The supporting teeth can still get decay or gum disease, so cleaning under the bridge every day matters."
      },
      {
        "q": "Can I get an implant if I have diabetes or smoke?",
        "a": "Often, yes. Well-controlled diabetes does not usually rule out implants. Smoking raises the risk of the implant not healing into the bone, so we usually advise stopping around treatment. Your dentist will assess your own situation."
      },
      {
        "q": "What if I don't have enough bone for an implant?",
        "a": "A bone graft can often rebuild the area before or during implant placement. If grafting is not right for you, a bridge or another option may suit you better."
      }
    ],
    "sources": [
      {
        "title": "American Dental Association, MouthHealthy. Dental implants.",
        "url": "https://www.mouthhealthy.org/all-topics-a-z/implants",
        "site": "mouthhealthy.org"
      },
      {
        "title": "American Dental Association, MouthHealthy. Bridges.",
        "url": "https://www.mouthhealthy.org/all-topics-a-z/bridges",
        "site": "mouthhealthy.org"
      },
      {
        "title": "Cleveland Clinic. Dental implants.",
        "url": "https://my.clevelandclinic.org/health/treatments/10903-dental-implants",
        "site": "clevelandclinic.org"
      },
      {
        "title": "Cleveland Clinic. Dental bridges.",
        "url": "https://my.clevelandclinic.org/health/treatments/10921-dental-bridges",
        "site": "clevelandclinic.org"
      }
    ],
    "wordCount": 1103
  }
];

export const getGuide = (slug: string) => GUIDES.find((g) => g.slug === slug);
export const guidesByDate = () => [...GUIDES].sort((a, b) => b.published.localeCompare(a.published));
