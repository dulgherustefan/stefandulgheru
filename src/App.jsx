import { useEffect, useState } from "react";
import { useLenis } from "./hooks/useLenis.js";
import Sky from "./components/Sky.jsx";
import MinimalView from "./components/MinimalView.jsx";

function readAttr(name, fallback) {
  const v = document.documentElement.getAttribute(name);
  return v || fallback;
}

export default function App() {
  const [theme, setTheme] = useState(() => readAttr("data-theme", "dark"));
  useLenis();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    try { localStorage.setItem("theme", theme); } catch (e) {}
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <>
      <Sky theme={theme} onToggleTheme={toggleTheme} />
      <main className="wrap" id="main">
        <MinimalView />
      </main>
    </>
  );
}
