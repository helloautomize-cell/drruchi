export type Review = {
  id: string;
  name: string;
  initial: string;
  treatment: string;
  doctor?: "ruchi" | "parmod";
  quote: string;
  avatar?: string;
  source: "Practo" | "Justdial";
  cats?: string[];
};

export const reviews: Review[] = [
  { id: "subhash", name: "Subhash", initial: "S", treatment: "Implant with bone graft", doctor: "parmod", quote: "Six years after my implant… it is no different from my other teeth, colour-wise or size-wise. Even my wife could not notice it.", source: "Practo", cats: ["dental-implants", "all-on-4-dental-implants"] },
  { id: "dewesh", name: "Dewesh Kumar", initial: "DK", treatment: "Aligners and implants", quote: "The best part was their honesty. They only suggested what was truly needed and explained every option before treatment.", source: "Practo", cats: ["invisalign", "dental-implants"] },
  { id: "aditya", name: "Aditya", initial: "A", treatment: "Dental implant", doctor: "ruchi", quote: "Dr Ruchi explained the entire implant procedure in detail and planned the treatment very carefully… transparent about the procedure and charges.", source: "Practo", cats: ["dental-implants"] },
  { id: "gaparent", name: "A parent", initial: "P", treatment: "Pediatric treatment under GA", doctor: "parmod", quote: "Thank you for taking such care of our 6-year-old son during his dental surgery… the step-by-step approach, without ever rushing into treatment.", source: "Practo", cats: ["pediatric-dentist"] },
  { id: "anushka", name: "Anushka Singh", initial: "AS", treatment: "Family patient for six years", quote: "My mother had a root canal and a ceramic crown here. It has been many years and she has not faced any problem at all.", source: "Practo", cats: ["root-canal-treatment", "dental-crowns", "teeth-cleaning"] },
  { id: "usp", name: "Verified patient", initial: "V", treatment: "Visiting from the USA", doctor: "parmod", quote: "I came from the USA for a short period… I had two root canals and a wisdom tooth removed in a single sitting.", source: "Practo", cats: ["root-canal-treatment", "wisdom-tooth-extraction", "medical-tourism"] },
  { id: "sachid", name: "Sachid Malhotra", initial: "SM", treatment: "Post and core", doctor: "ruchi", quote: "I was very sceptical but… she explained my issue in complete detail and helped resolve it. Thorough in her job, didn't feel any pain. Her qualification truly shows in her work.", source: "Practo" },
  { id: "anshul", name: "Anshul Yadav", initial: "AY", treatment: "Zirconia crowns", doctor: "ruchi", quote: "Takes time to explain issues, benefits and drawbacks… she takes her time with the procedure, never in a hurry.", source: "Practo", cats: ["dental-crowns"] },
  { id: "kuldeep", name: "Kuldeep Kaul", initial: "KK", treatment: "Dental implant", doctor: "ruchi", quote: "Dr Ruchi took the time to listen to my concerns and thoroughly explain the treatment options.", source: "Practo", cats: ["dental-implants"] },
  { id: "dhruv", name: "Dhruv Tiwari", initial: "DT", treatment: "Fillings", doctor: "parmod", quote: "Very precise, never had any issues after visiting him for fillings. Doesn't advise RCT and other procedures unless necessary, and thoroughly examines the problem.", source: "Practo", cats: ["dental-fillings", "root-canal-treatment"] },
  { id: "bijay", name: "Bijay Kumar", initial: "BK", treatment: "Child's treatment", doctor: "parmod", quote: "He made our child feel comfortable throughout the treatment.", source: "Practo", cats: ["pediatric-dentist"] },
  { id: "wisdom", name: "Verified patient", initial: "V", treatment: "Wisdom tooth removal", doctor: "parmod", quote: "Explained clearly how to handle my discomfort and was very patient, which helped me feel comfortable despite my fear of wisdom tooth removal.", source: "Practo", cats: ["wisdom-tooth-extraction"] },
  { id: "decade", name: "Verified patient", initial: "V", treatment: "Family check-ups", doctor: "parmod", quote: "I've been seeing Dr Parmod Gulia for over a decade… My whole family goes to him for yearly check-ups.", source: "Practo", cats: ["general-dentistry", "teeth-cleaning"] },
  { id: "vijay", name: "Vijay", initial: "V", treatment: "Root canal", quote: "Painless root canal… great precision.", source: "Practo", cats: ["root-canal-treatment"] },
  { id: "khushbu", name: "Khushbu", initial: "K", treatment: "Root canal", quote: "Root canal in 30 minutes… travelled from a different city, totally worth it.", source: "Practo", cats: ["root-canal-treatment"] },
  { id: "bipin", name: "Bipin Agarwal", initial: "BA", treatment: "Root canal", quote: "Dr Ruchi was very informative and showed me pictures and X-rays to help me understand. Then Dr Parmod stepped in to perform the root canal immediately. In a couple of hours, two teeth were treated.", source: "Practo", cats: ["root-canal-treatment"] },
  { id: "rishav", name: "Rishav Kumar", initial: "RK", treatment: "Smile makeover", quote: "A wonderful experience at the Golf Course Road clinic — everything explained clearly.", source: "Practo", cats: ["smile-makeover"] },
  { id: "vrinda", name: "Vrinda Gupta", initial: "VG", treatment: "Son's root canal", doctor: "parmod", quote: "The team handled my son's treatment so patiently and gently.", avatar: "/images/reviews/vrinda-gupta.webp", source: "Practo", cats: ["pediatric-dentist", "root-canal-treatment"] },
  { id: "chandan", name: "Chandan Sharma", initial: "CS", treatment: "Dental treatment", doctor: "parmod", quote: "Professional, honest and gentle. Highly recommended.", avatar: "/images/reviews/chandan-sharma.webp", source: "Practo" },
  { id: "shirin", name: "Shirin Kujur", initial: "SK", treatment: "Dental treatment", doctor: "ruchi", quote: "Very satisfied with the care and the detailed explanations.", avatar: "/images/reviews/shirin-kujur.webp", source: "Practo" },
  { id: "sabita", name: "Sabita", initial: "S", treatment: "Dental implant", doctor: "ruchi", quote: "A smooth implant experience from consultation to final crown.", source: "Practo", cats: ["dental-implants"] },
];

export const reviewById = (id: string) => reviews.find((r) => r.id === id)!;
export const reviewsFor = (slug: string) =>
  reviews.filter((r) => r.cats?.includes(slug)).slice(0, 3);
