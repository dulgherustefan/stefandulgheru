import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Fluffy multi-lobe cumulus: base tone (theme --cloud) with a soft top-left
// highlight and a bottom shadow rim for form, following pixel-cloud practice.
function Cloud() {
  return (
    <svg viewBox="0 0 20 13" shapeRendering="crispEdges" aria-hidden="true" width="100%">
      <g fill="currentColor">
        <rect x="7" y="2" width="4" height="1" />
        <rect x="5" y="3" width="7" height="1" />
        <rect x="4" y="4" width="10" height="1" />
        <rect x="14" y="5" width="4" height="1" />
        <rect x="3" y="5" width="11" height="1" />
        <rect x="2" y="6" width="16" height="1" />
        <rect x="1" y="7" width="17" height="1" />
        <rect x="1" y="8" width="17" height="1" />
        <rect x="2" y="9" width="15" height="1" />
      </g>
      <g fill="#ffffff" opacity="0.5">
        <rect x="7" y="2" width="3" height="1" />
        <rect x="5" y="3" width="3" height="1" />
        <rect x="4" y="4" width="2" height="1" />
        <rect x="3" y="5" width="2" height="1" />
        <rect x="2" y="6" width="2" height="1" />
      </g>
      <g fill="#000000" opacity="0.14">
        <rect x="2" y="9" width="15" height="1" />
        <rect x="1" y="8" width="2" height="1" />
        <rect x="15" y="8" width="3" height="1" />
      </g>
    </svg>
  );
}

// Smaller, rounder puff.
function Puff() {
  return (
    <svg viewBox="0 0 14 9" shapeRendering="crispEdges" aria-hidden="true" width="100%">
      <g fill="currentColor">
        <rect x="5" y="2" width="3" height="1" />
        <rect x="3" y="3" width="7" height="1" />
        <rect x="2" y="4" width="10" height="1" />
        <rect x="1" y="5" width="12" height="1" />
        <rect x="2" y="6" width="10" height="1" />
      </g>
      <g fill="#ffffff" opacity="0.5">
        <rect x="5" y="2" width="2" height="1" />
        <rect x="3" y="3" width="2" height="1" />
        <rect x="2" y="4" width="2" height="1" />
      </g>
      <g fill="#000000" opacity="0.14">
        <rect x="2" y="6" width="10" height="1" />
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
        <radialGradient id="mFace" cx="38%" cy="34%" r="72%">
          <stop offset="0%" stopColor="#fdfbf0" />
          <stop offset="55%" stopColor="#efe9d6" />
          <stop offset="100%" stopColor="#d8cdb2" />
        </radialGradient>
        <radialGradient id="mShade" cx="72%" cy="70%" r="60%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#3a3320" stopOpacity="0.28" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="14" fill="url(#mFace)" />
      <circle cx="20" cy="20" r="14" fill="url(#mShade)" />
      <g fill="#cdbf9f" opacity="0.55">
        <circle cx="15" cy="15" r="2.4" />
        <circle cx="25" cy="22" r="3.1" />
        <circle cx="18.5" cy="27" r="1.7" />
        <circle cx="27" cy="13.5" r="1.3" />
      </g>
      <circle cx="20" cy="20" r="13.4" fill="none" stroke="#fffdf4" strokeOpacity="0.5" strokeWidth="0.8" />
    </svg>
  );
}

// Warm gradient sun with soft rays. Glow comes from CSS drop-shadow.
function Sun() {
  const rays = Array.from({ length: 8 }, (_, k) => {
    const a = (k * Math.PI) / 4;
    const x = 22 + Math.cos(a);
    const y = 22 + Math.sin(a);
    return (
      <line
        key={k}
        x1={22 + Math.cos(a) * 14}
        y1={22 + Math.sin(a) * 14}
        x2={22 + Math.cos(a) * 19}
        y2={22 + Math.sin(a) * 19}
        stroke="#f7861d"
        strokeWidth="3"
        strokeLinecap="round"
      />
    );
  });
  return (
    <svg viewBox="0 0 44 44" aria-hidden="true" width="100%">
      <defs>
        <radialGradient id="sCore" cx="42%" cy="38%" r="66%">
          <stop offset="0%" stopColor="#ffd257" />
          <stop offset="52%" stopColor="#ffa22e" />
          <stop offset="100%" stopColor="#f4791a" />
        </radialGradient>
      </defs>
      {rays}
      <circle cx="22" cy="22" r="11.5" fill="url(#sCore)" />
    </svg>
  );
}

export default function Sky({ theme, onToggleTheme }) {
  const reduce = useReducedMotion();
  const isDark = theme === "dark";

  const drift = (dur) =>
    reduce ? {} : { x: [0, -26, 0], transition: { duration: dur, repeat: Infinity, ease: "linear" } };

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
          <motion.div className="cloud c1" animate={drift(26)}><Cloud /></motion.div>
          <motion.div className="cloud c2" animate={drift(34)}><Puff /></motion.div>
          <motion.div className="cloud c3" animate={drift(30)}><Cloud /></motion.div>
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
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isDark ? "moon" : "sun"}
            className="celestial-inner"
            initial={reduce ? false : { scale: 0.5, opacity: 0, rotate: -30 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={reduce ? { opacity: 0 } : { scale: 0.5, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
          >
            {isDark ? <Moon /> : <Sun />}
          </motion.span>
        </AnimatePresence>
      </button>
    </>
  );
}
