import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Builds a fluffy cumulus silhouette on a fine pixel grid: each "bump" is a
// circle in column-space (bumpy top), the shape is flat-cut at baseH (flat
// bottom), and the result is compressed into 1px-tall row rects so it still
// renders as crisp, distinct pixels — just far more of them than a
// hand-blocked grid, so the curve reads smooth without losing the pixel-art
// edge. Returns the rects plus the silhouette's own bounding box (for the
// clip-path that carries the shading bands).
function pixelCloud(w, baseH, bumps) {
  const heightAt = (x) => {
    let h = 0;
    for (const [cx, r] of bumps) {
      const dx = x - cx;
      if (Math.abs(dx) < r) h = Math.max(h, Math.round(Math.sqrt(r * r - dx * dx)));
    }
    return h;
  };
  const rows = [];
  for (let y = 0; y < baseH; y++) {
    let start = null;
    for (let x = 0; x <= w; x++) {
      const on = x < w && baseH - heightAt(x) <= y;
      if (on && start === null) start = x;
      if (!on && start !== null) { rows.push([y, start, x - start]); start = null; }
    }
  }
  return rows;
}

function CloudShape({ rects, w, h, id }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges" aria-hidden="true" width="100%">
      <defs>
        <clipPath id={id}>
          {rects.map(([y, x, rw], i) => <rect key={i} x={x} y={y} width={rw} height="1" />)}
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        <rect x="0" y="0" width={w} height={h} fill="currentColor" />
        <rect x="0" y="0" width={w} height={h * 0.5} fill="#ffffff" opacity="0.4" />
        <rect x="0" y={h * 0.78} width={w} height={h * 0.22} fill="#0b1020" opacity="0.16" />
      </g>
    </svg>
  );
}

// Fluffy pixel cumulus: three overlapping bumps on a fine grid, shaded with a
// clipped highlight crown and a darkened underside for form.
const CLOUD_RECTS = pixelCloud(56, 24, [[14, 9], [26, 12], [40, 10], [50, 7]]);
function Cloud() {
  return <CloudShape rects={CLOUD_RECTS} w={56} h={24} id="cloud-main" />;
}

// Smaller companion puff, same construction, scaled down.
const PUFF_RECTS = pixelCloud(38, 17, [[9, 6], [18, 8], [29, 6]]);
function Puff() {
  return <CloudShape rects={PUFF_RECTS} w={38} h={17} id="cloud-puff" />;
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
