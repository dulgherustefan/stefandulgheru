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

// Fuller, softer pixel moon (pale cream with craters + a rim highlight).
function Moon() {
  return (
    <svg viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden="true" width="100%">
      <g fill="#f2ecd9">
        <rect x="6" y="1" width="4" height="1" />
        <rect x="4" y="2" width="8" height="1" />
        <rect x="3" y="3" width="10" height="1" />
        <rect x="2" y="4" width="12" height="2" />
        <rect x="1" y="6" width="14" height="4" />
        <rect x="2" y="10" width="12" height="2" />
        <rect x="3" y="12" width="10" height="1" />
        <rect x="4" y="13" width="8" height="1" />
        <rect x="6" y="14" width="4" height="1" />
      </g>
      <g fill="#fbf7ea">
        <rect x="4" y="2" width="3" height="1" />
        <rect x="3" y="4" width="2" height="2" />
      </g>
      <g fill="#ddd4b8">
        <rect x="9" y="4" width="2" height="2" />
        <rect x="5" y="8" width="1" height="1" />
        <rect x="10" y="9" width="2" height="1" />
        <rect x="7" y="11" width="1" height="1" />
      </g>
    </svg>
  );
}

// Rising-sun flavored pixel sun: warm core, orange rim, short rays.
function Sun() {
  return (
    <svg viewBox="0 0 18 18" shapeRendering="crispEdges" aria-hidden="true" width="100%">
      <g fill="#ff8a3d">
        <rect x="6" y="4" width="6" height="1" />
        <rect x="5" y="5" width="8" height="1" />
        <rect x="4" y="6" width="10" height="6" />
        <rect x="5" y="12" width="8" height="1" />
        <rect x="6" y="13" width="6" height="1" />
      </g>
      <g fill="#ffc061">
        <rect x="6" y="6" width="6" height="5" />
        <rect x="7" y="5" width="4" height="1" />
      </g>
      <g fill="#ff9d4d">
        <rect x="8" y="0" width="2" height="2" />
        <rect x="8" y="16" width="2" height="2" />
        <rect x="0" y="8" width="2" height="2" />
        <rect x="16" y="8" width="2" height="2" />
        <rect x="2" y="2" width="2" height="2" />
        <rect x="14" y="2" width="2" height="2" />
        <rect x="2" y="14" width="2" height="2" />
        <rect x="14" y="14" width="2" height="2" />
      </g>
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

      {/* Sibling of .sky, not a child of it — see .switch's CSS comment. */}
      <button
        type="button"
        className="switch"
        role="switch"
        aria-checked={!isDark}
        onClick={onToggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Light mode" : "Dark mode"}
      >
        <span className="switch-track" aria-hidden="true">
          <span className="switch-star s1" />
          <span className="switch-star s2" />
          <span className="switch-star s3" />
          <motion.span
            className="switch-knob"
            animate={{ x: isDark ? 0 : 32 }}
            transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 520, damping: 30 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={isDark ? "moon" : "sun"}
                initial={reduce ? false : { scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={reduce ? { opacity: 0 } : { scale: 0.4, opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
                className="switch-ic"
              >
                {isDark ? <Moon /> : <Sun />}
              </motion.span>
            </AnimatePresence>
          </motion.span>
        </span>
      </button>
    </>
  );
}
