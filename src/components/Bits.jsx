import { useState } from "react";

// Photo avatar; falls back to the monogram until /me.jpg exists.
export function Avatar() {
  const [ok, setOk] = useState(true);
  return (
    <div className="avatar">
      {ok ? (
        <img src="/me.jpg" alt="Ștefan Dulgheru, full-length portrait" onError={() => setOk(false)} />
      ) : (
        <span aria-hidden="true">Ș</span>
      )}
    </div>
  );
}

export function Arrow({ className = "arrow" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </svg>
  );
}

export function Note({ children, tip }) {
  return (
    <span className="lnk note" tabIndex={0}>
      {children}
      <span className="tip">{tip}</span>
    </span>
  );
}

export function Bio({ paragraphs }) {
  return (
    <div className="bio">
      {paragraphs.map((para, i) => (
        <p key={i} className={i === 0 ? "lead" : undefined}>
          {para.map((seg, j) => {
            if (typeof seg === "string") return <span key={j}>{seg}</span>;
            if (seg.lnk)
              return (
                <a key={j} className="lnk" href={seg.href} target="_blank" rel="noreferrer">
                  {seg.lnk}
                </a>
              );
            if (seg.note)
              return (
                <Note key={j} tip={seg.tip}>
                  {seg.note}
                </Note>
              );
            return null;
          })}
        </p>
      ))}
    </div>
  );
}
