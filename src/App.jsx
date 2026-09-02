import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useLenis } from "./hooks/useLenis.js";
import Sky from "./components/Sky.jsx";
import MinimalView from "./components/MinimalView.jsx";

function readAttr(name, fallback) {
  const v = document.documentElement.getAttribute(name);
  return v || fallback;
}

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function App() {
  const [theme, setTheme] = useState(() => readAttr("data-theme", "dark"));
  const themeRef = useRef(theme);
  themeRef.current = theme;
  useLenis();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }, [theme]);

  const toggleTheme = (e) => {
    const next = themeRef.current === "dark" ? "light" : "dark";
    const root = document.documentElement;

    // Origin = the center of the toggle, so the new theme opens out of the moon.
    const rect = e?.currentTarget?.getBoundingClientRect?.();
    const x = rect ? rect.left + rect.width / 2 : window.innerWidth - 80;
    const y = rect ? rect.top + rect.height / 2 : 40;
    root.style.setProperty("--vt-x", `${x}px`);
    root.style.setProperty("--vt-y", `${y}px`);
    // Rim colour of the expanding light circle, warm turning on / cool going dark.
    root.style.setProperty("--vt-glow", next === "light" ? "rgba(255,214,140,.65)" : "rgba(150,170,255,.55)");

    const apply = () => setTheme(next);

    if (prefersReduced() || !document.startViewTransition) {
      apply();
      return;
    }

    root.classList.add("vt-reveal");
    try {
      const t = document.startViewTransition(() => flushSync(apply));
      if (t.ready) t.ready.catch(() => {});
      t.finished.catch(() => {}).then(() => root.classList.remove("vt-reveal"));
    } catch (err) {
      apply();
      root.classList.remove("vt-reveal");
    }
  };

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Sky theme={theme} onToggleTheme={toggleTheme} />
      <main className="wrap" id="main" tabIndex={-1}>
        <MinimalView />
      </main>
    </>
  );
}
