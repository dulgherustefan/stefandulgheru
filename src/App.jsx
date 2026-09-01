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

    // Light spreads FROM the toggle: a circular reveal centered on the moon/sun.
    const rect = e?.currentTarget?.getBoundingClientRect?.();
    if (rect) {
      root.style.setProperty("--vt-x", `${rect.left + rect.width / 2}px`);
      root.style.setProperty("--vt-y", `${rect.top + rect.height / 2}px`);
    }

    const apply = () => setTheme(next);

    if (prefersReduced() || !document.startViewTransition) {
      apply();
      return;
    }

    // The new theme is what expands into view, so reveal the *incoming* snapshot.
    root.classList.add("vt-reveal");
    try {
      const t = document.startViewTransition(() => flushSync(apply));
      // Both promises reject if the transition is aborted (tab hidden, overlap);
      // swallow them so nothing surfaces as an uncaught rejection.
      if (t.ready) t.ready.catch(() => {});
      t.finished.catch(() => {}).then(() => root.classList.remove("vt-reveal"));
    } catch (err) {
      apply();
      root.classList.remove("vt-reveal");
    }
  };

  return (
    <>
      <Sky theme={theme} onToggleTheme={toggleTheme} />
      <main className="wrap" id="main">
        <MinimalView />
      </main>
    </>
  );
}
