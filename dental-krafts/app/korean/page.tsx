import Link from "next/link";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Icon } from "@/components/icons";
import { QA, CtaBand } from "@/components/bits";
import { intlPages } from "@/content/intl";
import { clinics } from "@/content/clinics";
import { site } from "@/content/site";

const noto = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });
const p = intlPages.find((x) => x.lang === "ko")!;

export const metadata: Metadata = {
  title: { absolute: p.metaTitle },
  description: p.metaDesc,
  alternates: {
    canonical: "/korean",
    languages: { "en-IN": "/", ja: "/japanese", ko: "/korean" },
  },
};

export default function Korean() {
  return (
    <div className={noto.className} lang={p.htmlLang}>
      {/* Hero */}
      <section className="ihero"><div className="wrap">
        <div className="crumb"><Link href="/">Home</Link> / 한국어</div>
        <div className="g">
          <div>
            <span className="eyebrow"><Icon name="globe" cls="ic ic-sm" /> {p.eyebrow}</span>
            <h1 className="d" style={{ fontStyle: "normal" }}>{p.h1}</h1>
            <p className="sub">{p.sub}</p>
            <div className="chips">
              {p.chips.map((c) => <span className="chip" key={c}><Icon name="check" cls="ic ic-sm" /> {c}</span>)}
            </div>
            <div className="cta">
              <Link className="btn btn-w" href="/contact-us">{p.ctaBook} <span className="bic"><Icon name="arrow-right" cls="ic ic-sm" /></span></Link>
              <a className="btn btn-wa" href={site.whatsappLink}><Icon name="whatsapp" cls="ic ic-sm" /> {p.ctaWa}</a>
            </div>
          </div>
          <div className="ph"><img src="/images/ai/doctors-duo.webp" alt="Ruchi Goel 원장과 Parmod Gulia 원장" /></div>
        </div>
      </div></section>

      {/* Sections */}
      {p.sections.map((s, i) => (
        <section className={`sp${i % 2 === 1 ? " p" : ""}`} key={s.title}><div className="wrap">
          <span className="eyebrow">{s.title}</span>
          <h2 className="d h2" style={{ fontStyle: "normal", fontFamily: "inherit" }}>{s.title}</h2>
          <div className="prose" style={{ fontFamily: "inherit" }}>
            {s.paras.map((t, j) => <p key={j} style={{ fontFamily: "inherit" }}>{t}</p>)}
          </div>
        </div></section>
      ))}

      {/* Clinics + FAQ */}
      <section className="sp b"><div className="wrap fw">
        <div>
          <span className="eyebrow">클리닉</span>
          <h2 className="d h2" style={{ fontStyle: "normal" }}>두 곳에서 진료합니다</h2>
          <p className="lead">{p.clinicsNote}</p>
          {clinics.map((c) => (
            <Link className="mini-c" key={c.id} href={c.slug}>
              <img src={c.image} alt={c.imageAlt} loading="lazy" />
              <span><b>{c.name}</b><span className="tnum">{c.phone} · {c.hoursLabel}</span></span>
            </Link>
          ))}
          <p className="note" style={{ marginTop: 14 }}>
            이메일: <a href={`mailto:${site.email}`} style={{ color: "var(--rose)", fontWeight: 600 }}>{site.email}</a>
          </p>
        </div>
        <div>
          <span className="eyebrow">자주 묻는 질문</span>
          {p.faqs.map((f) => <QA key={f.q} q={f.q} a={f.a} />)}
        </div>
      </div></section>

      <section className="sp" style={{ paddingTop: 0 }}><div className="wrap">
        <CtaBand title="상담을" em="기다리고 있습니다." text={p.sub} book={p.ctaBook} />
      </div></section>
    </div>
  );
}
