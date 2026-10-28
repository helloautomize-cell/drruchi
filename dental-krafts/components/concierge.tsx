"use client";
import { useEffect, useLayoutEffect, useRef } from "react";

/** Hidden span measurer so each sentence select shrinks to its chosen option. */
let cv: HTMLSpanElement | null = null;
function fit(el: HTMLSelectElement | null) {
  if (!el) return;
  if (!cv) {
    cv = document.createElement("span");
    cv.setAttribute("aria-hidden", "true");
    cv.style.cssText = "position:absolute;visibility:hidden;white-space:pre;left:-9999px;top:0";
    document.body.appendChild(cv);
  }
  const cs = getComputedStyle(el);
  const o = el.options[el.selectedIndex];
  ["fontFamily", "fontSize", "fontStyle", "fontWeight", "fontVariationSettings", "letterSpacing"].forEach((k) => {
    // @ts-expect-error index into style
    cv!.style[k] = cs[k];
  });
  cv.textContent = o ? o.text : "";
  el.style.width = `${Math.ceil(cv.getBoundingClientRect().width + parseFloat(cs.paddingRight) + parseFloat(cs.paddingLeft) + 6)}px`;
}

export function FitSelect({ id, label, value, onChange, children }: { id: string; label: string; value: string; onChange: (v: string) => void; children: React.ReactNode }) {
  const ref = useRef<HTMLSelectElement>(null);
  useLayoutEffect(() => {
    fit(ref.current);
  }, [value]);
  useEffect(() => {
    const all = () => document.querySelectorAll<HTMLSelectElement>(".sel select").forEach((s) => fit(s));
    (document.fonts?.ready ?? Promise.resolve()).then(all);
    window.addEventListener("resize", all);
    return () => window.removeEventListener("resize", all);
  }, []);
  return (
    <span className="sel">
      <select id={id} ref={ref} aria-label={label} value={value} onChange={(e) => onChange(e.target.value)}>{children}</select>
    </span>
  );
}
