"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Icon } from "./icons";
import { FitSelect } from "./concierge";
import { Icon as I2 } from "./icons";
import { site } from "@/content/site";
import { clinics } from "@/content/clinics";
import { OpenStatus } from "./open-status";

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

const V5_DOC = [
  { v: "Dr Ruchi Goel", label: "Dr Ruchi", img: "/images/ai/dr-ruchi-portrait.webp" },
  { v: "Dr Parmod Gulia", label: "Dr Parmod", img: "/images/ai/dr-parmod-portrait.webp" },
  { v: "either dentist", label: "Either" },
];
const V5_CON = [
  { v: "missing teeth", label: "Missing teeth" },
  { v: "tooth pain", label: "Tooth pain" },
  { v: "a better smile", label: "A better smile" },
  { v: "braces or aligners", label: "Braces or aligners" },
  { v: "my child", label: "My child" },
  { v: "gums", label: "Gums" },
  { v: "a check-up", label: "A check-up" },
];
const V5_CLINIC = [
  { v: "Sector 53", label: "Sector 53 · Golf Course Rd" },
  { v: "Sector 57", label: "Sector 57 · Sushant Lok 2" },
  { v: "either clinic", label: "Either" },
];
const V5_TM = ["morning", "afternoon", "evening"];

/** Hero chip / treatment card / doctor button text → booking topic. */
export const TOPIC_MAP: Record<string, string> = {
  "Missing teeth": "missing teeth", "Tooth pain": "tooth pain", "A better smile": "a better smile",
  "Crooked teeth": "braces or aligners", "My child's teeth": "my child", "Bleeding gums": "gums",
  "Replace missing teeth": "missing teeth", "Save a tooth": "tooth pain", "Smile design": "a better smile",
  "Straighten teeth": "braces or aligners", "Kids and teens": "my child", "Gums and urgent care": "gums",
  "Gums, surgery and urgent care": "gums",
};

type DayPill = { label: string; sub: string; value: string };

/** Client-side booking preselection link: sets topic/dentist, then goes to #book. */
export function BookLink({ topic, doctor, href = "#book", className, children, ...rest }: {
  topic?: string; doctor?: "Dr Ruchi Goel" | "Dr Parmod Gulia"; href?: string;
  className?: string; children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children" | "onClick">) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("dk-book", { detail: { topic: topic && TOPIC_MAP[topic.trim()], doctor } }))}
      {...rest}
    >
      {children}
    </a>
  );
}

/** v5 booking: side panel + pill-radio form. Day pills are generated in JS (skips Wednesdays). */
export function BookingV5() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hp, setHp] = useState("");
  const [doctor, setDoctor] = useState("either dentist");
  const [topic, setTopic] = useState("a check-up");
  const [clinic, setClinic] = useState("either clinic");
  const [day, setDay] = useState("the earliest day");
  const [tm, setTm] = useState("morning");
  const [days, setDays] = useState<DayPill[]>([]);
  const [err, setErr] = useState("");
  const [done, setDone] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    /* "Earliest we can" + next 8 open days, skipping Wednesday (clinic closed). */
    const now = new Date();
    const out: DayPill[] = [];
    for (let k = now.getHours() >= 19 ? 1 : 0; out.length < 8; k++) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() + k);
      if (d.getDay() === 3) continue;
      out.push({
        label: k === 0 ? "Today" : k === 1 ? "Tomorrow" : DN[d.getDay()],
        sub: `${d.getDate()} ${MN[d.getMonth()]}`,
        value: `${k === 0 ? "today, " : k === 1 ? "tomorrow, " : ""}${DN[d.getDay()]} ${d.getDate()} ${MN[d.getMonth()]}`,
      });
    }
    setDays(out);
  }, []);

  useEffect(() => {
    const onBook = (e: Event) => {
      const d = (e as CustomEvent).detail as { topic?: string; doctor?: string };
      if (d.topic && V5_CON.some((o) => o.v === d.topic)) {
        setTopic(d.topic);
        if (d.topic === "my child") setDoctor("Dr Parmod Gulia");
        else if (d.topic === "missing teeth" || d.topic === "a better smile") setDoctor("Dr Ruchi Goel");
      }
      if (d.doctor && V5_DOC.some((o) => o.v === d.doctor)) setDoctor(d.doctor);
    };
    window.addEventListener("dk-book", onBook);
    return () => window.removeEventListener("dk-book", onBook);
  }, []);

  const msg = `Hello Dental Krafts, my name is ${name.trim() || "…"}. I'd like to see ${doctor} about ${topic} at ${clinic}, on ${day} (${tm}).`;
  const wa = `https://wa.me/919810448720?text=${encodeURIComponent(msg)}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (hp) return;
    const p = phone.replace(/\D/g, "");
    if (!name.trim()) return setErr("Please enter your name.");
    if (p.length !== 10) return setErr("Please enter a 10-digit mobile number.");
    setBusy(true);
    try {
      if (site.bookingEndpoint) {
        await fetch(site.bookingEndpoint, {
          method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name: name.trim(), phone: p, topic, clinic, doctor, day, time: tm }),
        });
      }
      setDone(`Thanks, ${name.trim()}. We'll call you on ${p.replace(/(\d{5})(\d{5})/, "$1 $2")} within working hours to confirm ${day} with ${doctor}.`);
    } catch {
      setErr("Something went wrong — please WhatsApp or call us instead.");
    } finally { setBusy(false); }
  }

  const seg = (name: string, opts: { v: string; label: string; img?: string }[], val: string, set: (v: string) => void, cls = "") => (
    <div className={`dk5-seg${cls}`} role="radiogroup">
      {opts.map((o) => (
        <label key={o.v}>
          <input type="radio" name={name} value={o.v} checked={val === o.v} onChange={() => set(o.v)} />
          <span>{o.img && <Image sizes="(max-width: 768px) 100vw, 760px" src={o.img} width={60} height={60} alt="" />}{o.label}</span>
        </label>
      ))}
    </div>
  );

  return (
    <div className="dk5-bk" data-r>
      <aside className="dk5-side">
        <figure><Image sizes="(max-width: 768px) 100vw, 760px" loading="lazy" decoding="async" src="/images/clinic/reception-modern.webp" width={1200} height={1499} alt="The Dental Krafts reception" /></figure>
        <div className="dk5-inf">
          <p className="k">Prefer to talk?</p>
          {clinics.map((c) => (
            <a className="dk5-bcall" key={c.id} href={c.phoneHref}>
              <span><b>{c.short}</b><small>{c.shortAddress.split("·")[0].trim()}</small></span>
              <span className="tnum">{c.phone}</span>
            </a>
          ))}
          <p className="dk5-bhrs"><OpenStatus className="live" /><small>10 am to 8 pm (Sector 57 until 8:30) · closed Wednesdays</small></p>
        </div>
      </aside>
      <form className="dk5-frm" onSubmit={submit} noValidate>
        {!done && (
          <div>
            <p className="eb"><span className="tri"><i /><i /><i /></span>Book a visit</p>
            <h2 className="d h2">Book in under a <em>minute</em>.</h2>
            <p className="dk5-sub">Pick what suits you. We'll call you back within working hours to confirm a time.</p>
            <div className="dk5-two">
              <label className="dk5-fld"><span>Your name</span><input autoComplete="name" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} /></label>
              <label className="dk5-fld"><span>Mobile number</span><span className="dk5-pre"><i>+91</i><input inputMode="numeric" autoComplete="tel-national" maxLength={11} placeholder="10-digit mobile" value={phone} onChange={(e) => setPhone(e.target.value)} /></span></label>
            </div>
            <fieldset><legend>Who would you like to see?</legend>{seg("doc", V5_DOC, doctor, setDoctor, " dk5-who")}</fieldset>
            <fieldset><legend>What is it about?</legend>{seg("con", V5_CON, topic, setTopic)}</fieldset>
            <fieldset><legend>Which clinic?</legend>{seg("cl", V5_CLINIC, clinic, setClinic)}</fieldset>
            <fieldset><legend>When suits you?</legend>
              <div className="dk5-seg dk5-days" role="radiogroup">
                <label><input type="radio" name="day" value="the earliest day" checked={day === "the earliest day"} onChange={() => setDay("the earliest day")} /><span>Earliest<small>we can</small></span></label>
                {days.map((d) => (
                  <label key={d.value}><input type="radio" name="day" value={d.value} checked={day === d.value} onChange={() => setDay(d.value)} /><span>{d.label}<small>{d.sub}</small></span></label>
                ))}
              </div>
              {seg("tm", V5_TM.map((t) => ({ v: t, label: t[0].toUpperCase() + t.slice(1) })), tm, setTm, " dk5-tm")}
            </fieldset>
            <input className="hp" tabIndex={-1} autoComplete="off" aria-hidden="true" value={hp} onChange={(e) => setHp(e.target.value)} />
            <div className="dk5-go">
              <p className="fine">By sending this, you agree Dental Krafts may contact you about your enquiry. See our <Link href="/privacy-policy">Privacy Policy</Link>.</p>
              <p className="err" role="alert">{err}</p>
              <div className="dk5-bt">
                <a className="btn btn-wa" href={wa} target="_blank" rel="noopener"><I2 name="whatsapp" cls="ic ic-sm" />Send on WhatsApp</a>
                <button className="btn btn-p" type="submit" disabled={busy}>{busy ? "Sending…" : "Request a call back"} <I2 name="arrow-right" cls="ic ic-sm" /></button>
              </div>
            </div>
          </div>
        )}
        <div className={`dk5-ok${done ? " show" : ""}`} role="status" aria-live="polite">
          <span className="tick"><I2 name="check" cls="ic" /></span>
          <h3 className="d">Request received.</h3>
          <p>{done}</p>
        </div>
      </form>
    </div>
  );
}

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
