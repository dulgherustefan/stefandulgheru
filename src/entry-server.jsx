import { renderToString } from "react-dom/server";
import App from "./App.jsx";

// Build-time render of the page to static HTML (see scripts/prerender.js).
export const render = () => renderToString(<App />);
