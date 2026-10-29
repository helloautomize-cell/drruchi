"use client";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";
import { OpenStatus } from "./open-status";
import { clinics } from "@/content/clinics";
import { site } from "@/content/site";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const track = (event: string, params?: Record<string, unknown>) => {
  try {
    window.gtag?.("event", event, params);
  } catch {
    /* analytics must never break the UI */
  }
};

/** Desktop-only floating WhatsApp + Call dock. The mobile counterpart is the
    .mbar (StickyBar) — CSS keeps them mutually exclusive at the 1024px line. */
export function DesktopDock() {
  const [show, setShow] = useState(false);
  const [card, setCard] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  /* same trigger as the mobile bar: once the hero has scrolled out of view */
  useEffect(() => {
    const hero = document.querySelector<HTMLElement>("main > section:first-of-type");
    const onS = () => {
      const bottom = hero ? hero.getBoundingClientRect().bottom : -1;
      setShow(bottom < 0 || (!hero && window.scrollY > 520));
    };
    onS();
    addEventListener("scroll", onS, { passive: true });
    return () => removeEventListener("scroll", onS);
  }, []);

  /* call card: close on outside click or Esc */
  useEffect(() => {
    if (!card) return;
    const down = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setCard(false);
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCard(false);
    };
    addEventListener("pointerdown", down);
    addEventListener("keydown", key);
    return () => {
      removeEventListener("pointerdown", down);
      removeEventListener("keydown", key);
    };
  }, [card]);

  return (
    <div ref={ref} className={`dkd${show ? " show" : ""}`}>
      {card && (
        <div className="dkd-card" id="dkd-call" role="dialog" aria-label="Call Dental Krafts">
          {clinics.map((c) => (
            <a
              key={c.id}
              className="dkd-row"
              href={c.phoneHref}
              onClick={() => track("call_click", { clinic: c.short })}
            >
              <span className="dkd-rn">{c.name}</span>
              <span className="dkd-rp">{c.phone}</span>
              <span className="dkd-rm">
                <OpenStatus clinicId={c.id} className="live" />
                <span>{c.hoursLabel}</span>
              </span>
            </a>
          ))}
          <p className="dkd-note">Closed on Wednesdays.</p>
        </div>
      )}
      <div className="dkd-item">
        <span className="dkd-tip" id="dkd-tip-wa" role="tooltip">
          Chat on WhatsApp
        </span>
        <a
          className="dkd-b wa"
          href={site.whatsappLink}
          target="_blank"
          rel="noopener"
          aria-label="Chat on WhatsApp"
          aria-describedby="dkd-tip-wa"
          onClick={() => track("whatsapp_click")}
        >
          <svg className="ic fill" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.134.372-.342.521-.521.149-.174.198-.298.297-.497.1-.199.05-.372-.05-.521-.099-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.172-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>
      </div>
      <div className="dkd-item">
        <span className="dkd-tip" id="dkd-tip-call" role="tooltip">
          Call us
        </span>
        <button
          type="button"
          className="dkd-b call"
          aria-label="Call Dental Krafts"
          aria-describedby="dkd-tip-call"
          aria-expanded={card}
          aria-controls="dkd-call"
          onClick={() => setCard((v) => !v)}
        >
          <Icon name="phone-call" cls="ic" />
        </button>
      </div>
    </div>
  );
}
