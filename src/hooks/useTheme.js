import { useCallback, useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

const STORAGE_KEY = "theme";
// Rim colour of the expanding light circle: warm when turning on, cool going dark.
const GLOW = { light: "rgba(255,214,140,.65)", dark: "rgba(150,170,255,.55)" };

const prefersReducedMotion = () => window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Light/dark theme on <html data-theme>, persisted to localStorage. The inline
// script in index.html applies the saved theme before first paint; this hook
// takes over from there. Toggling spreads the new theme out of the element that
// was clicked, as a View Transition, where the browser supports it.
export function useTheme() {
  const [theme, setTheme] = useState(() =>
    typeof document === "undefined" ? "dark" : document.documentElement.getAttribute("data-theme") || "dark"
  );
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Storage can be unavailable (private mode); the theme still applies.
    }
  }, [theme]);

  const toggleTheme = useCallback((e) => {
    const next = themeRef.current === "dark" ? "light" : "dark";
    const root = document.documentElement;

    const rect = e?.currentTarget?.getBoundingClientRect?.();
    root.style.setProperty("--vt-x", `${rect ? rect.left + rect.width / 2 : window.innerWidth - 80}px`);
    root.style.setProperty("--vt-y", `${rect ? rect.top + rect.height / 2 : 40}px`);
    root.style.setProperty("--vt-glow", GLOW[next]);

    const apply = () => setTheme(next);
    if (prefersReducedMotion() || !document.startViewTransition) return apply();

    root.classList.add("vt-reveal");
    try {
      const t = document.startViewTransition(() => flushSync(apply));
      t.ready?.catch(() => {});
      t.finished.catch(() => {}).then(() => root.classList.remove("vt-reveal"));
    } catch {
      apply();
      root.classList.remove("vt-reveal");
    }
  }, []);

  return { theme, toggleTheme };
}
