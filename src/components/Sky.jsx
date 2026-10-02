import { m, useReducedMotion } from "framer-motion";
import { Cloud, Moon, Puff, Sun } from "./pixel.jsx";

const DRIFT = { x: [0, -14, 0], transition: { duration: 30, repeat: Infinity, ease: "easeInOut" } };
const BOB = { y: [0, -3, 0], transition: { duration: 4.5, repeat: Infinity, ease: "easeInOut" } };

// The hero sky: a pixel cloud cluster drifting by the moon/sun, which doubles
// as the light/dark toggle.
export default function Sky({ theme, onToggleTheme }) {
  const reduce = useReducedMotion();
  const isDark = theme === "dark";

  return (
    <>
      <m.div className="sky" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        {/* One cluster that drifts as a whole, so the clouds stay together. */}
        <m.div className="cloudset" animate={reduce ? {} : DRIFT}>
          <div className="cloud c1">
            <Cloud />
          </div>
          <m.div className="cloud c2" animate={reduce ? {} : BOB}>
            <Puff />
          </m.div>
        </m.div>
      </m.div>

      {/* A sibling of .sky, not a child, so its own z-index clears the page. */}
      <button
        type="button"
        className={`celestial ${isDark ? "is-moon" : "is-sun"}`}
        onClick={onToggleTheme}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        title={isDark ? "Light mode" : "Dark mode"}
      >
        <m.span
          key={isDark ? "moon" : "sun"}
          className="celestial-inner"
          initial={reduce ? false : { scale: 0.55, opacity: 0, rotate: -35 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {isDark ? <Moon /> : <Sun />}
        </m.span>
      </button>
    </>
  );
}
