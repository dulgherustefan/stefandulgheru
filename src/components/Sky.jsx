import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Chunky pixel cumulus: a stepped-block silhouette (like the sun) with a
// lighter crown band and a darker underside band for form. Crisp edges keep
// it reading as pixel art rather than a soft blob.
function Cloud() {
  const base = [
    [2, 7, 4], [3, 5, 7], [4, 4, 10], [5, 14, 4], [5, 3, 11],
    [6, 2, 16], [7, 1, 17], [8, 1, 17], [9, 2, 15],
  ];
  const light = [[2, 7, 3], [3, 5, 3], [4, 4, 2], [5, 3, 2], [6, 2, 2]];
  const shade = [[8, 1, 2], [8, 15, 3], [9, 2, 15]];
  return (
    <svg viewBox="0 0 20 13" shapeRendering="crispEdges" aria-hidden="true" width="100%">
      <g fill="currentColor">
        {base.map(([y, x, w], i) => <rect key={`b${i}`} x={x} y={y} width={w} height="1" />)}
      </g>
      <g fill="#ffffff" opacity="0.55">
        {light.map(([y, x, w], i) => <rect key={`l${i}`} x={x} y={y} width={w} height="1" />)}
      </g>
      <g fill="#0b1020" opacity="0.14">
        {shade.map(([y, x, w], i) => <rect key={`s${i}`} x={x} y={y} width={w} height="1" />)}
      </g>
    </svg>
  );
}

// Smaller companion puff, same pixel construction, scaled down.
function Puff() {
  const base = [
    [2, 5, 3], [3, 3, 7], [4, 2, 10], [5, 1, 12], [6, 2, 10],
  ];
  const light = [[2, 5, 2], [3, 3, 2], [4, 2, 2]];
  const shade = [[6, 2, 10]];
  return (
    <svg viewBox="0 0 14 9" shapeRendering="crispEdges" aria-hidden="true" width="100%">
      <g fill="currentColor">
        {base.map(([y, x, w], i) => <rect key={`b${i}`} x={x} y={y} width={w} height="1" />)}
      </g>
      <g fill="#ffffff" opacity="0.55">
        {light.map(([y, x, w], i) => <rect key={`l${i}`} x={x} y={y} width={w} height="1" />)}
      </g>
      <g fill="#0b1020" opacity="0.14">
        {shade.map(([y, x, w], i) => <rect key={`s${i}`} x={x} y={y} width={w} height="1" />)}
      </g>
    </svg>
  );
}

// Smooth crescent-lit moon: warm cream sphere shaded with a soft terminator,
// a few craters, and a faint rim light. Glow comes from CSS drop-shadow.
function Moon() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" width="100%">
      <defs>
        <radialGradient id="mFace" cx="36%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f6f4ec" />
          <stop offset="100%" stopColor="#e4dfd0" />
        </radialGradient>
        <radialGradient id="mShade" cx="74%" cy="72%" r="62%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#2b2a22" stopOpacity="0.18" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="14" fill="url(#mFace)" />
      <circle cx="20" cy="20" r="14" fill="url(#mShade)" />
      <g fill="#d9d3c2" opacity="0.4">
        <circle cx="15" cy="15" r="2.2" />
        <circle cx="25" cy="22" r="2.8" />
        <circle cx="18.5" cy="27" r="1.5" />
      </g>
    </svg>
  );
}

// Pixel sun: a chunky stepped disc with three warm tones and eight pixel rays.
// Crisp edges keep it reading as pixel art; the glow comes from CSS drop-shadow.
function Sun() {
  // disc body rows: [y, x, width] on a 36-grid, 2px tall each
  const body = [
    [8, 14, 8], [10, 12, 12], [12, 10, 16], [14, 8, 20], [16, 8, 20],
    [18, 8, 20], [20, 8, 20], [22, 10, 16], [24, 12, 12], [26, 14, 8],
  ];
  const light = [
    [10, 12, 6], [12, 10, 8], [14, 8, 8], [16, 8, 6],
  ];
  const shade = [
    [20, 22, 6], [22, 20, 6], [24, 18, 6], [26, 16, 6],
  ];
  const rays = [
    [16, 0, 4, 4], [16, 32, 4, 4], [0, 16, 4, 4], [32, 16, 4, 4],
    [5, 5, 4, 4], [27, 5, 4, 4], [5, 27, 4, 4], [27, 27, 4, 4],
  ];
  return (
    <svg viewBox="0 0 36 36" shapeRendering="crispEdges" aria-hidden="true" width="100%">
      <g fill="#f4901f">
        {rays.map(([x, y, w, h], i) => <rect key={`r${i}`} x={x} y={y} width={w} height={h} />)}
      </g>
      <g fill="#f6a53c">
        {body.map(([y, x, w], i) => <rect key={`b${i}`} x={x} y={y} width={w} height="2" />)}
      </g>
      <g fill="#db7a1e">
        {shade.map(([y, x, w], i) => <rect key={`s${i}`} x={x} y={y} width={w} height="2" />)}
      </g>
      <g fill="#ffd67e">
        {light.map(([y, x, w], i) => <rect key={`l${i}`} x={x} y={y} width={w} height="2" />)}
      </g>
      <rect fill="#fff2bf" x="12" y="12" width="4" height="4" />
    </svg>
  );
}

export default function Sky({ theme, onToggleTheme }) {
  const reduce = useReducedMotion();
  const isDark = theme === "dark";

  const drift = reduce
    ? {}
    : { x: [0, -14, 0], transition: { duration: 30, repeat: Infinity, ease: "easeInOut" } };
  const bob = reduce
    ? {}
    : { y: [0, -3, 0], transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } };

  return (
    <>
      <AnimatePresence>
        <motion.div
          className="sky"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* One cluster, right by the moon — it drifts as a whole so the
              clouds stay together instead of scattering across the sky. */}
          <motion.div className="cloudset" animate={drift}>
            <div className="cloud c1"><Cloud /></div>
            <motion.div className="cloud c2" animate={bob}><Puff /></motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Sibling of .sky, not a child of it — so its z-index clears .wrap. */}
      <button
        type="button"
        className={`celestial ${isDark ? "is-moon" : "is-sun"}`}
        onClick={onToggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Light mode" : "Dark mode"}
      >
        <motion.span
          key={isDark ? "moon" : "sun"}
          className="celestial-inner"
          initial={reduce ? false : { scale: 0.55, opacity: 0, rotate: -35 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {isDark ? <Moon /> : <Sun />}
        </motion.span>
      </button>
    </>
  );
}
