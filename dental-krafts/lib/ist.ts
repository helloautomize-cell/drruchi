import { clinics } from "@/content/clinics";

export type Status = { open: boolean; text: string };

const NM = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

/** IST clock. */
export function istNow(): Date {
  const d = new Date();
  return new Date(d.getTime() + (d.getTimezoneOffset() + 330) * 60000);
}

/** Global open/closed status across both clinics (the "latest close" wins). */
export function clinicStatus(at = istNow()): Status {
  const day = at.getDay(), m = at.getHours() * 60 + at.getMinutes();
  const next = () => {
    const n = (day + 1) % 7;
    return n === 3 ? "Thursday" : n === (day + 1) % 7 && day === 6 ? "tomorrow" : n === (day + 1) % 7 ? NM[n] : NM[n];
  };
  if (day === 3) return { open: false, text: "Closed Wednesdays · opens Thursday 10 am" };
  if (m < 600) return { open: false, text: "Opens today at 10 am" };
  if (m < 1200) return { open: true, text: "Open now · until 8:30 pm" };
  if (m < 1230) return { open: true, text: "Sector 57 open until 8:30 pm" };
  const n = (day + 1) % 7;
  return { open: false, text: `Opens ${n === 3 ? "Thursday" : "tomorrow"} at 10 am` };
}

/** Per-clinic status for cards. */
export function statusFor(clinicId: string, at = istNow()): Status {
  const c = clinics.find((x) => x.id === clinicId)!;
  const day = at.getDay(), m = at.getHours() * 60 + at.getMinutes();
  if (day === c.closedDay) return { open: false, text: "Closed today · open Thu 10 am" };
  if (m < c.openMin) return { open: false, text: `Opens today at 10 am` };
  if (m < c.closeMin) return { open: true, text: `Open now · until ${c.hoursLabel.split("–")[1].trim()}` };
  const n = (day + 1) % 7;
  return { open: false, text: `Opens ${n === 3 ? "Thursday" : "tomorrow"} at 10 am` };
}
