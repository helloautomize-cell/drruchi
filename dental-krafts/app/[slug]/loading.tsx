export default function Loading() {
  return (
    <>
      <section className="th"><div className="wrap">
        <div>
          <span className="sk" style={{ width: 200, height: 13 }} />
          <span className="sk" style={{ width: 130, height: 14, marginTop: 30 }} />
          <span className="sk" style={{ width: "92%", height: 52, marginTop: 18 }} />
          <span className="sk" style={{ width: "58%", height: 52, marginTop: 10 }} />
          <span className="sk" style={{ width: "80%", height: 18, marginTop: 28 }} />
          <span className="sk" style={{ width: "55%", height: 18, marginTop: 10 }} />
          <div className="row" style={{ marginTop: 36 }}>
            <span className="sk" style={{ width: 210, height: 50, borderRadius: 999 }} />
            <span className="sk" style={{ width: 170, height: 50, borderRadius: 999 }} />
          </div>
        </div>
        <div className="ph"><span className="sk" style={{ width: "100%", height: "100%", borderRadius: 0, animation: "none" }} /></div>
      </div></section>

      <section className="f4" aria-hidden="true"><div className="wrap">
        {[0, 1, 2, 3].map((i) => (
          <div key={i}><span className="sk" style={{ width: 90, height: 11 }} /><span className="sk" style={{ width: 140, height: 18, marginTop: 8 }} /><span className="sk" style={{ width: 170, height: 12, marginTop: 8 }} /></div>
        ))}
      </div></section>

      <section className="sec" aria-hidden="true"><div className="wrap gd">
        <div />
        <div>
          {[0, 1].map((s) => (
            <div className="gs" key={s} style={{ border: 0 }}>
              <span className="sk" style={{ width: 120, height: 14 }} />
              <span className="sk" style={{ width: "70%", height: 38, marginTop: 18 }} />
              <span className="sk" style={{ width: "100%", height: 15, marginTop: 24 }} />
              <span className="sk" style={{ width: "96%", height: 15, marginTop: 9 }} />
              <span className="sk" style={{ width: "60%", height: 15, marginTop: 9 }} />
            </div>
          ))}
        </div>
      </div></section>
    </>
  );
}
