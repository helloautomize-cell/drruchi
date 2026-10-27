"use client";
import { useRef } from "react";
import { Icon } from "./icons";

/** Before/after slider. ~400px sources, so show small. Keyboard ←/→ via range. */
export function BaSlider({ file, altB = "Before", altA = "After", ratio }: { file: string; altB?: string; altA?: string; ratio?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div className="ba" ref={ref} role="group" aria-label="Before and after comparison" style={ratio ? { aspectRatio: ratio } : undefined}>
      <img src={`/images/results/split/${file}__before.webp`} alt={altB} loading="lazy" />
      <img className="af" src={`/images/results/split/${file}__after.webp`} alt={altA} loading="lazy" />
      <span className="tg l">Before</span><span className="tg r">After</span>
      <span className="kn"><i><Icon name="arrow-left" cls="ic ic-sm" /><Icon name="arrow-right" cls="ic ic-sm" /></i></span>
      <input
        type="range" min={0} max={100} defaultValue={50}
        role="slider" aria-label="Drag to compare before and after"
        onInput={(e) => ref.current?.style.setProperty("--x", `${(e.target as HTMLInputElement).value}%`)}
      />
    </div>
  );
}
