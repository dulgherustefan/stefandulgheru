import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
// Fonts are served from this site, no third-party request. Bricolage and Hanken
// are trimmed builds (src/fonts.css); Silkscreen is small enough as published.
import "./fonts.css";
import "@fontsource/silkscreen/400.css";
import "./index.css";

const root = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production HTML is prerendered at build time, so attach to it; in dev the root starts empty.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
