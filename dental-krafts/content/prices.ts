export type PriceRow = { icon: string; item: string; note: string; from: string; price: string };

export const priceTabs: { key: string; label: string; rows: PriceRow[] }[] = [
  {
    key: "all",
    label: "Most asked",
    rows: [
      { icon: "user-heart", item: "Consultation and examination", note: "With either dentist", from: "", price: "₹500" },
      { icon: "tooth-root", item: "Root canal treatment", note: "Under local anaesthesia", from: "from", price: "₹6,000" },
      { icon: "tooth", item: "Ceramic crown", note: "Matched to your shade", from: "from", price: "₹12,000" },
      { icon: "tooth-implant", item: "Dental implant", note: "Per implant, crown extra", from: "from", price: "₹30,000" },
    ],
  },
  {
    key: "rep",
    label: "Replace teeth",
    rows: [
      { icon: "tooth-implant", item: "Dental implant", note: "Per implant, crown extra", from: "from", price: "₹30,000" },
      { icon: "teeth", item: "Complete dentures", note: "Full set", from: "from", price: "₹5,000" },
      { icon: "tooth", item: "Ceramic crown or bridge unit", note: "Per tooth", from: "from", price: "₹12,000" },
    ],
  },
  {
    key: "save",
    label: "Save a tooth",
    rows: [
      { icon: "tooth-root", item: "Root canal treatment", note: "Under local anaesthesia", from: "from", price: "₹6,000" },
      { icon: "tooth-check", item: "Tooth-coloured filling", note: "Priced after the exam", from: "", price: "after exam" },
      { icon: "tooth", item: "Ceramic crown", note: "After a root canal", from: "from", price: "₹12,000" },
    ],
  },
  {
    key: "smile",
    label: "Smile",
    rows: [
      { icon: "sparkles", item: "Teeth whitening", note: "In-clinic", from: "from", price: "₹10,000" },
      { icon: "smile", item: "Veneers", note: "Priced after the exam", from: "", price: "after exam" },
      { icon: "braces-teeth", item: "Braces or aligners", note: "Priced after the exam", from: "", price: "after exam" },
    ],
  },
];

export const fullPrices: { item: string; range: string; why: string }[] = [
  { item: "Consultation & examination", range: "₹500", why: "—" },
  { item: "X-ray (per film) / OPG / CBCT scan", range: "Charged separately, explained first", why: "Which scan your case needs" },
  { item: "Teeth cleaning (scaling & polishing)", range: "Quoted at consultation", why: "Amount of tartar, gum condition" },
  { item: "Tooth-coloured filling", range: "₹2,000 – ₹4,000", why: "Size and position of the cavity" },
  { item: "Root canal treatment (one tooth)", range: "₹6,000 – ₹12,000", why: "Front tooth or molar, number of canals, re-treatment" },
  { item: "Ceramic / zirconia crown", range: "₹12,000 – ₹20,000", why: "Material, front or back tooth" },
  { item: "Tooth extraction", range: "₹2,000 – ₹8,000", why: "Simple or surgical, wisdom tooth position" },
  { item: "Dental implant (implant + crown)", range: "₹30,000 – ₹55,000", why: "Implant system, crown material, bone grafting" },
  { item: "All-on-4 full arch", range: "₹1,50,000 – ₹4,00,000 per jaw", why: "Number of implants, fixed teeth material" },
  { item: "Dentures", range: "from ₹5,000", why: "Complete or partial, material, implant support" },
  { item: "Professional whitening", range: "₹10,000 – ₹20,000", why: "In-clinic or take-home" },
  { item: "Veneers, braces, aligners", range: "Quoted after examination", why: "Number of teeth, system" },
];
