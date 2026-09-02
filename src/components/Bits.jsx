import { useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

// Photo avatar; falls back to the monogram until /me.jpg exists. Tilts a touch
// toward the pointer for a subtle 3D feel; still under reduced motion.
export function Avatar() {
  const [ok, setOk] = useState(true);
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, (v) => v * -40), { stiffness: 140, damping: 13 });
  const rotateY = useSpring(useTransform(px, (v) => v * 40), { stiffness: 140, damping: 13 });

  const onMove = (e) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => { px.set(0); py.set(0); };

  return (
    <motion.div
      className="avatar"
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 420 }}
    >
      {ok ? (
        <img src="/me.jpg" width="320" height="320" alt="Ștefan Dulgheru, full-length portrait" onError={() => setOk(false)} />
      ) : (
        <span aria-hidden="true">Ș</span>
      )}
    </motion.div>
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
        <p key={i}>
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
