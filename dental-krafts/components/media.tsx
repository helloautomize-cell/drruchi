"use client";
import { useState } from "react";
import { Icon } from "./icons";

export type Reel = { file: string; title: string; who?: string; poster?: string };

/** 9:16 reel card: poster + play; click plays the mp4 inside the card. */
export function ReelCard({ reel, big }: { reel: Reel; big?: boolean }) {
  const [play, setPlay] = useState(false);
  const poster = reel.poster ?? `/images/reels/${reel.file.replace(/\.mp4$/, "")}.webp`;
  return (
    <div className="reel">
      {play ? (
        <video src={`/videos/${reel.file}`} controls autoPlay playsInline />
      ) : (
        <>
          <img src={poster} alt="" loading="lazy" />
          <button className="play" style={big ? { width: 64, height: 64, top: "50%", left: "50%", right: "auto", transform: "translate(-50%,-50%)" } : undefined}
            aria-label={`Play ${reel.title}`} onClick={() => setPlay(true)}><Icon name="play" cls="ic" /></button>
          <span className="cap"><b>{reel.title}</b><span>{reel.who ?? "Dr Ruchi Goel · 1 min"}</span></span>
        </>
      )}
    </div>
  );
}

/** Videos B: big player + playlist. */
export function ReelsPlaylist({ reels }: { reels: Reel[] }) {
  const [sel, setSel] = useState(0);
  return (
    <div className="grid">
      <div className="stage"><ReelCard reel={reels[sel]} big key={reels[sel].file} /></div>
      <div>
        <span className="eyebrow">Short answers from Dr Ruchi</span>
        <h2 className="d h2">Your questions, <em>answered in a minute.</em></h2>
        <div className="pl">
          {reels.map((r, i) => (
            <button key={r.file} aria-pressed={i === sel} onClick={() => setSel(i)}>
              <img src={r.poster ?? `/images/reels/${r.file.replace(/\.mp4$/, "")}.webp`} alt="" />
              <span><b>{r.title}</b><span>{r.who ?? "Dr Ruchi Goel · 1 min"}</span></span>
              <Icon name="play" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
