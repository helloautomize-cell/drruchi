"use client";
import { useEffect, useState } from "react";
import { Icon } from "./icons";
import { clinics } from "@/content/clinics";
import { doctors } from "@/content/doctors";
import { site } from "@/content/site";

const CONCERNS = [
  ["tooth-implant", "Missing teeth"], ["tooth-root", "Tooth pain"], ["broken-tooth", "Broken tooth"],
  ["braces-teeth", "Crooked teeth"], ["sparkles", "Stained teeth"], ["first-tooth", "My child's teeth"],
  ["teeth", "Dentures"], ["x-ray", "Second opinion"], ["x-ray", "Not sure"],
] as const;

export function BookingForm({ presetClinic, presetDoctor, presetConcern }: { presetClinic?: string; presetDoctor?: string; presetConcern?: string }) {
  const [step, setStep] = useState(1);
  const [concern, setConcern] = useState(presetConcern ?? "Missing teeth");
  const [clinic, setClinic] = useState(presetClinic ?? "Either clinic");
  const [doctor, setDoctor] = useState(presetDoctor ?? "Either dentist");
  const [date, setDate] = useState("");
  const [tod, setTod] = useState("Morning");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hp, setHp] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState("");
  const [busy, setBusy] = useState(false);
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().slice(0, 10));
  }, []);

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    if (!presetConcern && q.get("concern")) setConcern(q.get("concern")!);
    else if (!presetConcern && q.get("c")) setConcern("Not sure");
    if (!presetClinic && q.get("clinic")) setClinic(q.get("clinic")!);
    if (!presetDoctor && q.get("doctor")) setDoctor(q.get("doctor")!);
  }, [presetConcern, presetClinic, presetDoctor]);

  const wa = `https://wa.me/919810448720?text=${encodeURIComponent(`Hello Dental Krafts, I'd like to book a visit for ${concern} at ${clinic}.`)}`;

  async function submit() {
    setErr("");
    if (!name.trim()) return setErr("Please enter your name.");
    if (phone.replace(/\D/g, "").length !== 10) return setErr("Please enter a 10-digit mobile number.");
    if (date && new Date(date + "T12:00").getDay() === 3) return setErr("We're closed on Wednesdays. Please pick another day.");
    if (hp) return;
    setBusy(true);
    try {
      if (site.bookingEndpoint) {
        await fetch(site.bookingEndpoint, {
          method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ name, phone, concern, clinic, doctor, date, timeOfDay: tod }),
        });
      }
      setDone(`Thanks, ${name.trim()}. We'll call you from +91 98104 48720 within working hours.`);
    } catch {
      setErr("Something went wrong — please WhatsApp or call us instead.");
    } finally { setBusy(false); }
  }

  return (
    <div className="box" id="book">
      <div className="stp">
        {["What's wrong", "Where and who", "Your details"].map((t, i) => (
          <div key={t} className={step === i + 1 ? "on" : step > i + 1 ? "dn" : ""}><i>{i + 1}</i><span>{t}</span></div>
        ))}
      </div>
      {step === 1 && (
        <div className="pane">
          <b className="d" style={{ fontSize: 24 }}>What brings you in?</b>
          <div className="opts">
            {CONCERNS.map(([ic, l]) => (
              <button key={l} className="op" aria-pressed={concern === l} onClick={() => setConcern(l)}><Icon name={ic} />{l}</button>
            ))}
          </div>
          <div className="nav2"><span style={{ color: "var(--muted)", fontSize: 14 }}>Takes about a minute</span>
            <button className="btn btn-p" onClick={() => setStep(2)}>Continue <Icon name="arrow-right" cls="ic ic-sm" /></button></div>
        </div>
      )}
      {step === 2 && (
        <div className="pane">
          <b className="d" style={{ fontSize: 24 }}>Where and with whom?</b>
          <div className="two">
            <label className="f">Clinic
              <select value={clinic} onChange={(e) => setClinic(e.target.value)}>
                <option>Either clinic</option>{clinics.map((c) => <option key={c.id}>{c.name}</option>)}
              </select></label>
            <label className="f">Dentist
              <select value={doctor} onChange={(e) => setDoctor(e.target.value)}>
                <option>Either dentist</option>{doctors.map((d) => <option key={d.id}>{d.name}</option>)}
              </select></label>
            <label className="f">Preferred date
              <input type="date" value={date} min={minDate || undefined} onChange={(e) => setDate(e.target.value)} /></label>
            <label className="f">Time of day
              <select value={tod} onChange={(e) => setTod(e.target.value)}><option>Morning</option><option>Afternoon</option><option>Evening</option></select></label>
          </div>
          <div className="nav2">
            <button className="btn btn-s" onClick={() => setStep(1)}><Icon name="arrow-left" cls="ic ic-sm" /> Back</button>
            <button className="btn btn-p" onClick={() => setStep(3)}>Continue <Icon name="arrow-right" cls="ic ic-sm" /></button>
          </div>
        </div>
      )}
      {step === 3 && !done && (
        <div className="pane">
          <b className="d" style={{ fontSize: 24 }}>How do we reach you?</b>
          <div className="two">
            <label className="f">Your name<input autoComplete="name" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} /></label>
            <label className="f">Phone number<input inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile" value={phone} onChange={(e) => setPhone(e.target.value)} /></label>
          </div>
          <label className="hp" aria-hidden="true">Leave empty<input tabIndex={-1} autoComplete="off" value={hp} onChange={(e) => setHp(e.target.value)} /></label>
          {err && <p role="alert" style={{ color: "#A33B2A", fontWeight: 600 }}>{err}</p>}
          <div className="nav2">
            <button className="btn btn-s" onClick={() => setStep(2)}><Icon name="arrow-left" cls="ic ic-sm" /> Back</button>
            <button className="btn btn-p" disabled={busy} onClick={submit}>{busy ? "Sending…" : "Request appointment"}</button>
          </div>
          <p className="consent" style={{ marginTop: 16 }}>By submitting, you agree that Dental Krafts may contact you about your enquiry. See our <a href="/privacy-policy" style={{ color: "var(--rose)" }}>Privacy Policy</a>. Prefer WhatsApp? <a href={wa} style={{ color: "var(--rose)", fontWeight: 650 }}>Chat with us</a>.</p>
        </div>
      )}
      {done && (
        <div className="pane"><div className="okmsg" role="status"><Icon name="check" /> {done}</div>
          <p className="consent" style={{ marginTop: 14 }}>In a hurry? <a href={wa} style={{ color: "var(--rose)", fontWeight: 650 }}>WhatsApp us</a> or call {clinics[0].phone} (Sector 53) / {clinics[1].phone} (Sector 57).</p>
        </div>
      )}
    </div>
  );
}
