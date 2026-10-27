export type Clinic = {
  id: "sector53" | "sector57";
  name: string;
  short: string;
  slug: string;
  address: string;
  shortAddress: string;
  phone: string;
  phoneHref: string;
  /** minutes from midnight, IST */
  openMin: number;
  closeMin: number;
  hoursLabel: string;
  closedDay: number; // 3 = Wednesday
  mapQuery: string;
  nearby: string[];
  driveTimes: [string, string][];
  image: string;
  imageAlt: string;
  practoStories: number;
};

export const clinics: Clinic[] = [
  {
    id: "sector53",
    name: "Sector 53 · Golf Course Road",
    short: "Sector 53",
    slug: "/dental-clinic-sector-53-gurgaon",
    address:
      "DSP-211, 2nd Floor, South Point Mall, Golf Course Road, DLF Phase 5, Sector 53, Gurugram, Haryana 122002",
    shortAddress: "South Point Mall, 2nd Floor · 10 am – 8 pm · closed Wednesdays",
    phone: "+91 98104 48720",
    phoneHref: "tel:+919810448720",
    openMin: 600,
    closeMin: 1200,
    hoursLabel: "10 am – 8 pm",
    closedDay: 3,
    mapQuery: "Dental Krafts Sector 53 Gurgaon",
    nearby: ["DLF Phase 5", "Sectors 54 and 55", "Sushant Lok", "Nirvana Country"],
    driveTimes: [
      ["Golf Course Rd", "5 min"],
      ["Ardee City", "10"],
      ["MG Road", "14"],
      ["DLF Phase 3", "15"],
      ["DLF Phase 2", "17"],
      ["Cyber City", "17"],
      ["HUDA City Centre", "20"],
      ["Golf Course Ext Rd", "20"],
    ],
    image: "/images/clinic/sector-53-storefront.webp",
    imageAlt: "Dental Krafts Sector 53 storefront, South Point Mall",
    practoStories: 67,
  },
  {
    id: "sector57",
    name: "Sector 57 · Sushant Lok 2",
    short: "Sector 57",
    slug: "/dental-clinic-sector-57-gurgaon",
    address:
      "UG-12, 1st Floor, Bestech Central Square Mall, Opp. Hong Kong Bazaar Road, Block G, Sushant Lok 2, Sector 57, Gurugram, Haryana 122011",
    shortAddress:
      "Bestech Central Square, 1st Floor · 10 am – 8:30 pm · closed Wednesdays",
    phone: "+91 95992 52018",
    phoneHref: "tel:+919599252018",
    openMin: 600,
    closeMin: 1230,
    hoursLabel: "10 am – 8:30 pm",
    closedDay: 3,
    mapQuery: "Dental Krafts Sector 57 Gurgaon",
    nearby: ["Sectors 56 and 57", "Sushant Lok 2", "Golf Course Extension Road"],
    driveTimes: [
      ["Golf Course Rd", "8 min"],
      ["DLF Phase 1", "9"],
      ["Sector 47", "9"],
      ["South City 2", "10"],
      ["HUDA City Centre", "12"],
      ["Golf Course Ext Rd", "12"],
      ["Medanta", "14"],
      ["Sector 29", "14"],
      ["MG Road", "15"],
      ["DLF Phase 3", "15"],
      ["DLF Phase 4", "15"],
    ],
    image: "/images/clinic/sector-57-operatory.webp",
    imageAlt: "Dental Krafts Sector 57 treatment room",
    practoStories: 933,
  },
];

/** Latest closing across clinics, for the header pill. */
export const LATEST_CLOSE = Math.max(...clinics.map((c) => c.closeMin));
