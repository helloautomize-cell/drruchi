"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "./icons";
import { FitSelect } from "./concierge";
import { site } from "@/content/site";

const DOC_OPTS = ["either dentist", "Dr Ruchi Goel", "Dr Parmod Gulia"];
const CONCERN_OPTS = ["missing teeth", "tooth pain", "a broken tooth", "crooked teeth", "stained teeth", "my child's teeth", "dentures", "a second opinion", "a check-up"];
const CLINIC_OPTS = ["either clinic", "Sector 53", "Sector 57"];

const CONCERN_MAP: Record<string, string> = {
  "missing teeth": "missing teeth", "tooth pain": "tooth pain",
  "a chipped tooth": "a broken tooth", "chipped or broken": "a broken tooth", "broken tooth": "a broken tooth",
  "gaps or crooked": "crooked teeth", "crooked teeth": "crooked teeth", "gaps or crooked teeth": "crooked teeth",
  "stained teeth": "stained teeth", "my child's teeth": "my child's teeth",
  "dentures": "dentures", "second opinion": "a second opinion", "a second opinion": "a second opinion",
  "not sure": "a check-up", "a check-up": "a check-up", "check-up": "a check-up",
};
const normConcern = (v: string | null) => (v && CONCERN_MAP[v.toLowerCase()]) || "missing teeth";
const normClinic = (v: string | null) => (v && v.includes("53") ? "Sector 53" : v && v.includes("57") ? "Sector 57" : "either clinic");
const normDoctor = (v: string | null) => (v && v.toLowerCase().includes("ruchi") ? "Dr Ruchi Goel" : v && v.toLowerCase().includes("parmod") ? "Dr Parmod Gulia" : "either dentist");

const DN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function BookingForm({ presetClinic, presetDoctor, presetConcern }: { presetClinic?: string; presetDoctor?: string; presetConcern?: string }) {
  const [name, setName] = useState("");
  const [doctor, setDoctor] = useState(() => normDoctor(presetDoctor ?? null));
  const [concern, setConcern] = useState(() => normConcern(presetConcern ?? null));
  const [clinic, setClinic] = useState(() => presetClinic ? normClinic(presetClinic) : "either clinic");
  const [day, setDay] = useState("");
  const [days, setDays] = useState<string[]>([]);
  const [phone, setPhone] = useState("");
  const [hp, setHp] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // next 12 days, skipping Wednesdays
    const t = new Date(), out: string[] = [];
    for (let k = 0; out.length < 12; k++) {
      const d = new Date(t.getFullYear(), t.getMonth(), t.getDate() + k);
      if (d.getDay() === 3) continue;
      out.push(`${k === 0 ? "today, " : k === 1 ? "tomorrow, " : ""}${DN[d.getDay()]} ${d.getDate()} ${MN[d.getMonth()]}`);
    }
    setDays(out);
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (!presetConcern && q.get("concern")) setConcern(normConcern(q.get("concern")));
    else if (!presetConcern && q.get("c") === "not-sure") setConcern("a check-up");
    if (!presetClinic && q.get("clinic")) setClinic(normClinic(q.get("clinic")));
    else if (!presetClinic && q.get("c") && q.get("c") !== "not-sure") setClinic(normClinic(q.get("c")));
    if (!presetDoctor && q.get("doctor")) setDoctor(normDoctor(q.get("doctor")));
    // concierge prefill bridge
    const onBook = (e: Event) => {
      const d = (e as CustomEvent).detail as { concern?: string; clinic?: string; doctor?: string };
      if (!presetConcern && d.concern) setConcern(normConcern(d.concern));
      if (!presetClinic && d.clinic) setClinic(normClinic(d.clinic));
      if (!presetDoctor && d.doctor) setDoctor(normDoctor(d.doctor));
    };
    window.addEventListener("dk-book", onBook);
    return () => window.removeEventListener("dk-book", onBook);
  }, [presetConcern, presetClinic, presetDoctor]);

  const sentence = `Hello Dental Krafts, my name is ${name.trim() || "…"}. I'd like to see ${doctor} about ${concern} at ${clinic}${day ? ` on ${day}` : ", on the earliest day"}.`;
  const wa = `https://wa.me/919810448720?text=${encodeURIComponent(sentence)}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (hp) return;
    if (!name.trim()) return setErr("Please enter your name.");
    if (phone.replace(/\D/g, "").length !== 10) return setErr("Please enter a 10-digit mobile number.");
    setBusy(true);
    try {
      if (site.bookingEndpoint) {
        await fetch(site.bookingEndpoint, {
          method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name: name.trim(), phone, concern, clinic, doctor, day }),
        });
      }
      setDone(`Thanks, ${name.trim()}. We'll call you from +91 98104 48720 within working hours.`);
    } catch {
      setErr("Something went wrong — please WhatsApp or call us instead.");
    } finally { setBusy(false); }
  }

  return (
    <form className="bk" onSubmit={submit} noValidate data-r>
      {!done && (
        <div>
          <p className="sent">Hello, my name is{" "}
            <input className="w" autoComplete="name" placeholder="your name" aria-label="Your name" value={name} onChange={(e) => setName(e.target.value)} />. I'd like to see{" "}
            <FitSelect id="b-doc" label="Dentist" value={doctor} onChange={setDoctor}>
              {DOC_OPTS.map((o) => <option key={o}>{o}</option>)}
            </FitSelect>{" "}
            about{" "}
            <FitSelect id="b-con" label="Concern" value={concern} onChange={setConcern}>
              {CONCERN_OPTS.map((o) => <option key={o}>{o}</option>)}
            </FitSelect>{" "}
            at{" "}
            {presetClinic ? <em style={{ color: "var(--orange-ink)", fontFamily: "var(--display)", borderBottom: "1.5px solid var(--line-2)", paddingBottom: 2 }}>{normClinic(presetClinic)}</em> : (
              <FitSelect id="b-cl" label="Clinic" value={clinic} onChange={setClinic}>
                {CLINIC_OPTS.map((o) => <option key={o}>{o}</option>)}
              </FitSelect>
            )}{" "}
            on{" "}
            <FitSelect id="b-date" label="Preferred day" value={day} onChange={setDay}>
              <option value="">the earliest day</option>
              {days.map((d) => <option key={d} value={d}>{d}</option>)}
            </FitSelect>. Please call me on{" "}
            <input className="w" inputMode="numeric" autoComplete="tel-national" placeholder="10-digit mobile" aria-label="10-digit mobile number" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value)} />.
          </p>
          <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} />
          <p className="err" role="alert" aria-live="polite">{err}</p>
          <div className="foot">
            <p>By sending this, you agree Dental Krafts may contact you about your enquiry. See our <Link href="/privacy-policy">Privacy Policy</Link>.</p>
            <div className="row" style={{ margin: 0 }}>
              <a className="btn btn-wa" href={wa} target="_blank" rel="noopener"><Icon name="whatsapp" cls="ic ic-sm" /> Send on WhatsApp</a>
              <button className="btn btn-p" type="submit" disabled={busy}>{busy ? "Sending…" : "Request appointment"} <Icon name="arrow-right" cls="ic ic-sm" /></button>
            </div>
          </div>
        </div>
      )}
      <div className={`ok${done ? " show" : ""}`} aria-live="polite">
        <p className="sent">{done || "Thank you. We'll call you within working hours."}</p>
      </div>
    </form>
  );
}
