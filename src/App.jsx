import { useEffect, useState } from "react";
import { LazyMotion, domAnimation } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import { useLenis } from "./hooks/useLenis.js";
import { useTheme } from "./hooks/useTheme.js";
import Sky from "./components/Sky.jsx";
import Home from "./components/Home.jsx";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  useLenis();
  // The sky shows the saved theme (moon or sun), which only the browser knows,
  // so it mounts after hydration instead of being baked into the static HTML.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);

  return (
    // Only the DOM animation features ship; components use `m` instead of `motion`.
    <LazyMotion features={domAnimation} strict>
      <a className="skip" href="#main">
        Skip to content
      </a>
      {hydrated && <Sky theme={theme} onToggleTheme={toggleTheme} />}
      <main className="wrap" id="main" tabIndex={-1}>
        <Home />
      </main>
      <Analytics />
    </LazyMotion>
  );
}
