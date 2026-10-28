"use client";
import { useEffect, useState } from "react";
import { clinicStatus, statusFor, type Status } from "@/lib/ist";
import { clinics } from "@/content/clinics";

export function OpenStatus({ clinicId, className = "live" }: { clinicId?: string; className?: string }) {
  const [s, setS] = useState<Status | null>(null);
  useEffect(() => {
    const update = () => setS(clinicId ? statusFor(clinicId) : clinicStatus());
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, [clinicId]);
  return (
    <span className={`${className}${s && !s.open ? " off" : ""}`}>
      {s && (<><i /><span>{s.text}</span></>)}
    </span>
  );
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

/** 7-day hours list for the clinic info card, with today in bold. */
export function ClinicWeek({ clinicId }: { clinicId: string }) {
  const [today, setToday] = useState(-1);
  useEffect(() => { setToday(new Date().getDay()); }, []);
  const c = clinics.find((x) => x.id === clinicId) ?? clinics[0];
  return (
    <dl className="wk">
      {[1, 2, 3, 4, 5, 6, 0].map((d) => (
        <div key={d} style={{ display: "contents" }}>
          <dt className={d === today ? "today" : undefined}>{DAYS[d]}{d === today ? " · today" : ""}</dt>
          <dd className={d === today ? "today" : undefined}>{d === c.closedDay ? "Closed" : c.hoursLabel}</dd>
        </div>
      ))}
    </dl>
  );
}
