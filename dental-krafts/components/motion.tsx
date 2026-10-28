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
    /* defer past hydration — init() mutates data-split headlines, pins,
       carousel state and scroll vars. Load alone can still precede
       hydration of streamed segments, so wait for an idle beat too. */
    const kick = () => {
      if (typeof requestIdleCallback === "function") requestIdleCallback(boot, { timeout: 1200 });
      else setTimeout(boot, 400);
    };
    import("@/lib/dk-motion").then(() => {
      if (document.readyState === "complete") kick();
      else window.addEventListener("load", kick, { once: true });
    });
    return () => {
      live = false;
      window.removeEventListener("load", kick);
      (window as unknown as { DKM?: { destroy: () => void } }).DKM?.destroy();
    };
  }, [path]);
  return null;
}
