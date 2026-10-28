"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** Boots the dk-motion engine on each route; cleans up on route change. */
export function Motion() {
  const path = usePathname();
  useEffect(() => {
    (window as unknown as { Lenis: typeof Lenis }).Lenis = Lenis;
    let live = true;
    const boot = () => {
      if (live) (window as unknown as { DKM: { init: () => void } }).DKM.init();
    };
    import("@/lib/dk-motion").then(() => {
      /* defer past hydration — init() mutates data-split headlines and would
         otherwise race React and trigger hydration mismatches */
      if (document.readyState === "complete") boot();
      else window.addEventListener("load", boot, { once: true });
    });
    return () => {
      live = false;
      window.removeEventListener("load", boot);
      (window as unknown as { DKM?: { destroy: () => void } }).DKM?.destroy();
    };
  }, [path]);
  return null;
}
