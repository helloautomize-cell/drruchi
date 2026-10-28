export type Case = {
  file: string; // results/split/{file}__before.webp
  cat: string;
  caption: string;
  doctor?: "ruchi" | "parmod" | "TBC";
  consent?: boolean; // false = hide (BA11 face photo)
};

export const CATS = [
  "Implants",
  "Crowns and bridges",
  "Dentures",
  "Full-mouth",
  "Veneers and gaps",
  "Whitening and cleaning",
  "Repairs",
] as const;

export const cases: Case[] = [
  { file: "ba-01-direct-veneers", cat: "Veneers and gaps", caption: "Gaps between front teeth closed with direct composite veneers, with no drilling of healthy tooth.", doctor: "TBC" },
  { file: "ba-02-full-mouth-rehabilitation", cat: "Full-mouth", caption: "Worn teeth rebuilt as part of a full-mouth rehabilitation.", doctor: "TBC" },
  { file: "ba-03-back-teeth-implant", cat: "Implants", caption: "A missing back tooth replaced with an implant crown.", doctor: "TBC" },
  { file: "ba-04-back-implant-teeth", cat: "Implants", caption: "Missing back teeth replaced with implants.", doctor: "TBC" },
  { file: "ba-05-back-teeth-implant", cat: "Implants", caption: "A missing back tooth replaced with an implant.", doctor: "TBC" },
  { file: "ba-06-teeth-cleaning", cat: "Whitening and cleaning", caption: "Heavy tartar and stains removed by professional cleaning.", doctor: "TBC" },
  { file: "ba-07-gap-filling", cat: "Veneers and gaps", caption: "A front-tooth gap closed in a single visit.", doctor: "TBC" },
  { file: "ba-08-teeth-whitening", cat: "Whitening and cleaning", caption: "In-clinic whitening, several shades brighter.", doctor: "TBC" },
  { file: "ba-09-teeth-whitening", cat: "Whitening and cleaning", caption: "Stained teeth brightened with in-clinic whitening.", doctor: "TBC" },
  { file: "ba-10-teeth-whitening", cat: "Whitening and cleaning", caption: "Tea and coffee stains lifted with professional whitening.", doctor: "TBC" },
  { file: "ba-11-complete-dentures-face", cat: "Dentures", caption: "Complete dentures for a patient with no teeth.", doctor: "TBC", consent: false },
  { file: "ba-12-smile-makeover", cat: "Crowns and bridges", caption: "Broken front teeth restored to a natural shape and shade.", doctor: "TBC" },
  { file: "ba-13-smile-makeover", cat: "Crowns and bridges", caption: "Badly decayed upper front teeth rebuilt with ceramic crowns.", doctor: "TBC" },
  { file: "ba-14-dentures", cat: "Dentures", caption: "A full set of missing teeth replaced with a complete denture.", doctor: "TBC" },
  { file: "ba-15-front-caps", cat: "Crowns and bridges", caption: "Front teeth capped to close gaps.", doctor: "TBC" },
  { file: "ba-16-crowns", cat: "Crowns", caption: "Worn, uneven front teeth rebuilt with matched ceramic crowns.", doctor: "TBC" },
  { file: "ba-17-fixed-teeth", cat: "Veneers and gaps", caption: "Crooked front teeth aligned for an even smile.", doctor: "TBC" },
  { file: "ba-18-deep-cleaning-stain-removal", cat: "Cleaning", caption: "Heavy tartar and stains removed with a deep clean.", doctor: "TBC" },
  { file: "ba-19-stain-removal", cat: "Whitening and cleaning", caption: "Stained teeth restored to a natural shade.", doctor: "TBC" },
  { file: "ba-20-fixed-teeth-clinic", cat: "Veneers and gaps", caption: "Uneven teeth corrected for a natural smile.", doctor: "TBC" },
  { file: "ba-21-chipped-tooth-repair", cat: "Repairs", caption: "Chipped front tooth repaired with a tooth-coloured filling.", doctor: "TBC" },
  { file: "ba-22-full-mouth-rehabilitation", cat: "Full-mouth", caption: "Worn and broken teeth rebuilt as part of a full-mouth rehabilitation.", doctor: "TBC" },
  { file: "ba-23-full-mouth-rehabilitation", cat: "Full-mouth", caption: "A collapsed bite restored with crowns and implants.", doctor: "TBC" },
  { file: "ba-24-full-mouth-rehabilitation", cat: "Full-mouth", caption: "Worn and decayed teeth restored as part of a full-mouth rehabilitation.", doctor: "TBC" },
  { file: "ba-25-full-mouth-rehabilitation", cat: "Full-mouth", caption: "Missing and damaged teeth rebuilt together.", doctor: "TBC" },
  { file: "ba-26-full-mouth-rehabilitation", cat: "Full-mouth", caption: "Years of wear reversed with a planned rehabilitation.", doctor: "TBC" },
  { file: "ba-27-full-mouth-rehabilitation", cat: "Full-mouth", caption: "Broken-down teeth restored to full function.", doctor: "TBC" },
  { file: "ba-28-full-mouth-rehabilitation", cat: "Full-mouth", caption: "A complete smile rebuilt, tooth by tooth.", doctor: "TBC" },
  { file: "ba-29-teeth-implant", cat: "Implants", caption: "A single implant restores a missing tooth.", doctor: "TBC" },
  { file: "ba-30-dental", cat: "Repairs", caption: "Damaged front teeth repaired to a natural finish.", doctor: "TBC" },
  { file: "ba-31-dental", cat: "Repairs", caption: "Worn edges rebuilt with tooth-coloured materials.", doctor: "TBC" },
  { file: "ba-32-dental", cat: "Repairs", caption: "Chipped teeth restored in one visit.", doctor: "TBC" },
  { file: "ba-33-dental", cat: "Repairs", caption: "Uneven front teeth evened out.", doctor: "TBC" },
];

export const visibleCases = cases.filter((c) => c.consent !== false);
export const casesByCat = (cat: string) => visibleCases.filter((c) => c.cat === cat);
export const caseByFile = (f: string) => cases.find((c) => c.file === f);
export const homeCases = ["ba-13-smile-makeover","ba-12-smile-makeover","ba-24-full-mouth-rehabilitation","ba-01-direct-veneers","ba-07-gap-filling","ba-03-back-teeth-implant"].map(caseByFile) as Case[];
