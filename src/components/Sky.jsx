import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

// Soft rounded cumulus: bumpy top, flat bottom, a lighter crown and a faint
// underside shade so it reads as a fluffy cloud rather than a flat blob.
function Cloud() {
  return (
    <svg viewBox="0 0 48 28" aria-hidden="true" width="100%">
      <path
        fill="currentColor"
        d="M8 27C3.6 27 0 23.6 0 19.3c0-4 3.1-7.2 7-7.5C14.4 4.9 16 4 19 4c3 0 5.6 1.6 7 4 1.2-.8 2.6-1.2 4.2-1.2 4 0 7.3 3 7.8 6.9 5.2.2 9 3 9 7.2 0 3.9-3.3 6.1-7.4 6.1H8Z"
      />
      <path
        fill="#ffffff"
        opacity="0.5"
        d="M19 4c3 0 5.6 1.6 7 4-2.3.5-4.2 2-5.2 4-1-1.4-2.7-2.3-4.6-2.3-1 0-2 .3-2.8.7C14.4 4.9 16 4 19 4Z"
      />
      <path fill="#0b1020" opacity="0.10" d="M8 27h31.6c-1 .6-2.3.9-3.6.9H8c-2.3 0-4.4-.9-5.9-2.4C3.4 26.4 5.5 27 8 27Z" />
    </svg>
  );
}

// Smaller companion puff, same construction.
function Puff() {
  return (
    <svg viewBox="0 0 34 20" aria-hidden="true" width="100%">
      <path
        fill="currentColor"
        d="M6 19C2.7 19 0 16.5 0 13.4c0-2.9 2.3-5.3 5.3-5.5C6.7 3.6 9.2 2 12.2 2c2.7 0 5 1.3 6.4 3.3.9-.5 2-.8 3.1-.8 3 0 5.5 2.2 5.9 5.1 3.7.2 6.4 2.2 6.4 5.2 0 2.8-2.4 4.2-5.4 4.2H6Z"
      />
      <path
        fill="#ffffff"
        opacity="0.5"
        d="M12.2 2c2.7 0 5 1.3 6.4 3.3-1.7.4-3.1 1.5-3.9 3-.8-1-2-1.7-3.4-1.7-.8 0-1.5.2-2.1.5C6.7 3.6 9.2 2 12.2 2Z"
      />
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
