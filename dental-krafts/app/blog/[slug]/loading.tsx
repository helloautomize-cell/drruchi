export default function Loading() {
  return (
    <>
      <section className="ihero"><div className="wrap">
        <span className="sk" style={{ width: 180, height: 13 }} />
        <div style={{ marginTop: 30 }}>
          <span className="sk" style={{ width: 120, height: 14 }} />
          <span className="sk" style={{ width: "min(640px, 90%)", height: 48, marginTop: 20 }} />
          <span className="sk" style={{ width: "min(380px, 60%)", height: 48, marginTop: 10 }} />
          <span className="sk" style={{ width: 240, height: 15, marginTop: 26 }} />
        </div>
      </div></section>

      <section className="sp" aria-hidden="true"><div className="wrap" style={{ maxWidth: 820 }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span className="sk" key={i} style={{ width: i === 2 ? "72%" : "100%", height: 15, marginTop: i === 0 ? 0 : 12 }} />
        ))}
        <span className="sk" style={{ width: "55%", height: 30, marginTop: 40 }} />
        {[0, 1, 2, 3].map((i) => (
          <span className="sk" key={`b${i}`} style={{ width: i === 3 ? "66%" : "100%", height: 15, marginTop: 12 }} />
        ))}
      </div></section>
    </>
  );
}
