"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icons";

export type Reel = { file: string; title: string; who?: string; poster?: string };
const posterOf = (r: Reel) => r.poster ?? `/images/reels/${r.file.replace(/\.mp4$/, "")}.webp`;

/** 9:16 reel card: poster + play pill; click plays the mp4 inside the card. */
export function ReelCard({ reel }: { reel: Reel }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="reel">
      {play ? (
        <video src={`/videos/${reel.file}`} controls autoPlay playsInline />
      ) : (
        <>
          <Image sizes="(max-width: 768px) 100vw, 760px" src={posterOf(reel)} width={540} height={960} alt="" loading="lazy" />
          <button className="play" aria-label={`Play ${reel.title}`} onClick={() => setPlay(true)}><span><Icon name="play" cls="ic" /></span></button>
          <span className="cap2"><b>{reel.title}</b><span>{reel.who ?? "Dr Ruchi Goel · 1 min"}</span></span>
        </>
      )}
    </div>
  );
}

/** v4 square video player + auto-advancing question list (.vx).
    The fill line under the active question runs 7 s, pauses on hover or off screen,
    and stops for good once the visitor picks a question. */
export function VPlaylist({ reels }: { reels: Reel[] }) {
  const [sel, setSel] = useState(0);
  const [shown, setShown] = useState(0);
  const [play, setPlay] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const stopped = useRef(false);
  const hover = useRef(false);
  const visible = useRef(false);
  const anim = useRef<Animation | null>(null);

  /* cross-fade the poster when the question changes */
  useEffect(() => {
    if (shown === sel) return;
    const img = imgRef.current;
    if (!img || matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(sel); return; }
    img.style.opacity = "0";
    const t = setTimeout(() => {
      setShown(sel);
      const n = imgRef.current;
      if (n) (n.decode ? n.decode() : Promise.resolve()).catch(() => {}).then(() => { n.style.opacity = "1"; });
    }, 300);
    return () => clearTimeout(t);
  }, [sel, shown]);

  /* auto-advance: animate the active button's .vp line, then move on */
  useEffect(() => {
    if (stopped.current || play) return;
    const bar = listRef.current?.querySelectorAll<HTMLElement>(".vp")[sel];
    if (!bar) return;
    const a = bar.animate(
      [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }],
      { duration: 7000, easing: "linear" }
    );
    if (!visible.current || hover.current) a.pause();
    a.onfinish = () => {
      const next = (sel + 1) % reels.length;
      setSel(next);
    };
    anim.current = a;
    return () => { a.cancel(); anim.current = null; };
  }, [sel, play, reels.length]);

  /* pause off screen / on hover */
  useEffect(() => {
    stopped.current = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sec = listRef.current?.closest("section");
    if (!sec) return;
    const io = new IntersectionObserver((es) => {
      visible.current = es[0].isIntersecting;
      const a = anim.current;
      if (!a || stopped.current) return;
      if (visible.current && !hover.current) a.play(); else a.pause();
    }, { threshold: 0.4 });
    io.observe(sec);
    const enter = () => { hover.current = true; anim.current?.pause(); };
    const leave = () => { hover.current = false; if (visible.current && !stopped.current) anim.current?.play(); };
    sec.addEventListener("pointerenter", enter);
    sec.addEventListener("pointerleave", leave);
    return () => { io.disconnect(); sec.removeEventListener("pointerenter", enter); sec.removeEventListener("pointerleave", leave); };
  }, []);

  const pick = (i: number) => { stopped.current = true; anim.current?.cancel(); setSel(i); setPlay(false); };
  const r = reels[shown];
  return (
    <>
      <div className="vplayer" style={{ position: "relative" }} data-unveil data-cursor="Play">
        {play ? (
          <video src={`/videos/${reels[sel].file}`} controls autoPlay playsInline />
        ) : (
          <button type="button" aria-label={`Play ${reels[sel].title}`} onClick={() => { stopped.current = true; anim.current?.cancel(); setPlay(true); }} style={{ position: "absolute", inset: 0, border: 0, padding: 0, background: "none", cursor: "pointer", width: "100%" }}>
            <Image sizes="(max-width: 768px) 100vw, 760px" ref={imgRef} src={posterOf(r)} width={540} height={960} alt={r.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <span className="play"><span><Icon name="play" cls="ic" /></span><span style={{ all: "unset" }}>Watch · 1 min</span></span>
          </button>
        )}
      </div>
      <div className="vlist" ref={listRef} data-r="stagger">
        {reels.map((x, i) => (
          <button key={x.file} type="button" aria-pressed={i === sel} onClick={() => pick(i)}>
            <span><b>{x.title}</b><small>{x.who ?? "Dr Ruchi Goel"}</small></span>
            <span className="t">1 min</span>
            <i className="vp" aria-hidden="true" />
          </button>
        ))}
      </div>
    </>
  );
}

/** v3 big serif quote with prev/next (.sx). */
export function StoryQuote({ stories }: { stories: { q: string; name: string; sub: string }[] }) {
  const [i, setI] = useState(0);
  const [fade, setFade] = useState(true);
  const go = (d: number) => {
    setFade(false);
    setTimeout(() => { setI((x) => (x + d + stories.length) % stories.length); setFade(true); }, 250);
  };
  const s = stories[i];
  return (
    <>
      <p className="quote" style={{ opacity: fade ? 1 : 0 }}>“{s.q}”</p>
      <div className="qby">
        <span><b>{s.name}</b> · <span>{s.sub}</span></span>
        <div className="qnav">
          <button type="button" aria-label="Previous story" onClick={() => go(-1)}><Icon name="arrow-left" cls="ic" /></button>
          <button type="button" aria-label="Next story" onClick={() => go(1)}><Icon name="arrow-right" cls="ic" /></button>
        </div>
      </div>
    </>
  );
}

/** Shared: pause every v5 reel except the one just played. */
function pauseOthers(except?: HTMLVideoElement | null) {
  document.querySelectorAll<HTMLVideoElement>(".dk5-reel video,.dk5-svid video").forEach((v) => {
    if (v !== except && !v.paused) v.pause();
  });
}

/** v5 reel card (9:16) — poster+button until clicked, then a real <video controls autoPlay>.
    One at a time; pauses when the card leaves the viewport. */
export function Reel5({ reel }: { reel: Reel }) {
  const [play, setPlay] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLElement>(null);

  /* native listener — a poster click must work even if React's synthetic
     events are detached after a hydration recovery */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const h = () => setPlay((p) => { if (!p) pauseOthers(); return true; });
    el.addEventListener("click", h);
    return () => el.removeEventListener("click", h);
  }, []);

  useEffect(() => {
    if (!play) return;
    vidRef.current?.play().catch(() => {});
    const el = wrapRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (!e.isIntersecting && vidRef.current && !vidRef.current.paused) vidRef.current.pause(); });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [play]);

  return (
    <article className={`dk5-reel${play ? " on" : ""}`} ref={wrapRef}
      role={play ? undefined : "button"} tabIndex={play ? undefined : 0}
      onKeyDown={play ? undefined : (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pauseOthers(); setPlay(true); } }}
      aria-label={play ? undefined : `Play: ${reel.title}`}>
      {play ? (
        <video ref={vidRef} src={`/videos/${reel.file}`} controls autoPlay playsInline poster={posterOf(reel)}
          onPlay={(e) => pauseOthers(e.currentTarget)} onEnded={() => setPlay(false)} />
      ) : (
        <>
          <Image sizes="(max-width: 768px) 100vw, 760px" src={posterOf(reel)} width={540} height={960} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <span className="dk5-rp" aria-hidden="true">
            <span className="pb"><Icon name="play" cls="ic" /></span>
            <span className="dk5-rtx"><b>{reel.title}</b><small>{reel.who ?? "Dr Ruchi Goel · 1 min"}</small></span>
          </span>
        </>
      )}
    </article>
  );
}

/** v5 9:16 video story card for the stories carousel — same play behaviour as Reel5. */
export function StoryVid5({ reel }: { reel: Reel }) {
  const [play, setPlay] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const h = () => setPlay((p) => { if (!p) pauseOthers(); return true; });
    el.addEventListener("click", h);
    return () => el.removeEventListener("click", h);
  }, []);

  useEffect(() => {
    if (!play) return;
    vidRef.current?.play().catch(() => {});
    const el = wrapRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (!e.isIntersecting && vidRef.current && !vidRef.current.paused) vidRef.current.pause(); });
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, [play]);

  return (
    <article className={`dk5-svid${play ? " on" : ""}`} ref={wrapRef}
      role={play ? undefined : "button"} tabIndex={play ? undefined : 0}
      onKeyDown={play ? undefined : (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pauseOthers(); setPlay(true); } }}
      aria-label={play ? `Video: ${reel.title}` : `Play ${reel.title}`}>
      {play ? (
        <video ref={vidRef} src={`/videos/${reel.file}`} controls autoPlay playsInline poster={posterOf(reel)}
          onPlay={(e) => pauseOthers(e.currentTarget)} onEnded={() => setPlay(false)} />
      ) : (
        <>
          <Image sizes="(max-width: 768px) 100vw, 760px" src={posterOf(reel)} width={540} height={960} alt="" loading="lazy" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <span className="tag2">Video story</span>
          <span className="dk5-rp" aria-hidden="true">
            <span className="pb"><Icon name="play" cls="ic" /></span>
            <span className="dk5-rtx"><b>{reel.title}</b><small>{reel.who ?? "Patient story"}</small></span>
          </span>
        </>
      )}
    </article>
  );
}

/** v4 video story card (.story.vid) — poster + tag + play pill inside the stories carousel. */
export function StoryVid({ reel }: { reel: Reel }) {
  const [play, setPlay] = useState(false);
  return (
    <article className="story vid" aria-label={`Video: ${reel.title}`}>
      {play ? (
        <video src={`/videos/${reel.file}`} controls autoPlay playsInline />
      ) : (
        <button type="button" aria-label={`Play ${reel.title}`} onClick={() => setPlay(true)} style={{ position: "absolute", inset: 0, border: 0, padding: 0, background: "none", cursor: "pointer", width: "100%" }}>
          <Image sizes="(max-width: 768px) 100vw, 760px" src={posterOf(reel)} width={540} height={960} alt={reel.title} loading="lazy" />
          <span className="tag2">Video story</span>
          <span className="play"><span><Icon name="play" cls="ic" /></span>{reel.title} · 1 min</span>
        </button>
      )}
    </article>
  );
}

/** v3 patient video card (.vcard) — square-ish poster that plays inline. */
export function VideoCard({ reel }: { reel: Reel }) {
  const [play, setPlay] = useState(false);
  return (
    <div className="vcard">
      {play ? (
        <video src={`/videos/${reel.file}`} controls autoPlay playsInline />
      ) : (
        <button type="button" aria-label={`Play ${reel.title}`} onClick={() => setPlay(true)} style={{ position: "absolute", inset: 0, border: 0, padding: 0, background: "none", cursor: "pointer", width: "100%" }}>
          <Image sizes="(max-width: 768px) 100vw, 760px" src={posterOf(reel)} width={540} height={960} alt={reel.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <span className="play"><span><Icon name="play" cls="ic" /></span>{reel.title} · 1 min</span>
        </button>
      )}
    </div>
  );
}
