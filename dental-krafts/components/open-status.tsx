"use client";
import { useEffect, useState } from "react";
import { clinicStatus, statusFor, type Status } from "@/lib/ist";

export function OpenStatus({ clinicId, className = "stat-live" }: { clinicId?: string; className?: string }) {
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
