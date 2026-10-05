// Runs after `vite build` (client) and `vite build --ssr` (server bundle):
//   1. renders the page to static HTML inside dist/index.html, so text shows before any JS loads;
//   2. injects the JSON-LD structured data built from src/data.js, plus preloads for
//      the fonts the first screen needs;
//   3. writes dist/llms.txt (a plain-text summary for AI search) from the same data.
import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import { site, profile, work, competitions, community, links } from "../src/data.js";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = (file) => `${root}dist/${file}`;

const bioText = profile.bio.map((para) =>
  para.map((seg) => (typeof seg === "string" ? seg : seg.lnk)).join("")
);

// ---------- structured data ----------

const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

// Podium places, medals and mentions only; plain ranks stay on the page.
const PODIUM = /^(1st|2nd|3rd)$/;

function awards() {
  return competitions
    .filter((c) => PODIUM.test(c.stat) || c.medal || /mention/i.test(c.stat))
    .map((c) => {
      if (PODIUM.test(c.stat)) return `${c.stat} place, ${c.name}${c.sub ? ` (${c.sub})` : ""}`;
      if (c.medal) {
        const rank =
          c.stat.toLowerCase() === c.medal ? "" : ` (${[c.stat, c.sub].filter(Boolean).join(" ")})`;
        return `${capitalize(c.medal)} medal, ${c.name}${rank}`;
      }
      return `Special mention, ${c.name}${c.sub ? ` (${c.sub})` : ""}`;
    });
}

function jsonLd() {
  const email = links.find((l) => l.href.startsWith("mailto:"))?.href;
  const sameAs = links.filter((l) => l.href.startsWith("https://")).map((l) => l.href);
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: site.alternateName,
    url: site.url,
    image: site.image,
    jobTitle: "Student",
    description: site.description,
    email,
    affiliation: { "@type": "EducationalOrganization", name: site.school },
    address: { "@type": "PostalAddress", addressLocality: profile.location, addressCountry: site.country },
    knowsAbout: site.knowsAbout,
    award: awards(),
    sameAs,
  };
  // `<` escaped so the JSON can never close the script tag early.
  return `<script type="application/ld+json">${JSON.stringify(person).replace(/</g, "\\u003c")}</script>`;
}

// ---------- llms.txt (https://llmstxt.org) ----------

function llmsTxt() {
  const entry = (e) => {
    const [first] = e.links ?? [];
    const title = first ? `[${e.name}](${first.href})` : e.name;
    // "288th" + "of 4,730" reads as one phrase; "Bronze" + "National" as two.
    const stat = e.sub ? `${e.stat}${/^[a-z]/.test(e.sub) ? " " : ", "}${e.sub}` : e.stat;
    return `- ${title}: ${stat}. ${e.desc}`;
  };
  return [
    `# ${profile.name}`,
    "",
    `> ${bioText.join(" ")}`,
    "",
    `${profile.role.lead} ${profile.role.accent}. Based in ${profile.location}. Site: ${site.url}`,
    "",
    "## Selected work",
    "",
    ...work.map(entry),
    "",
    "## Competitions & awards",
    "",
    ...competitions.map(entry),
    "",
    "## Teaching & community",
    "",
    ...community.map(entry),
    "",
    "## Contact",
    "",
    ...links.map((l) => `- [${l.key}](${l.href}): ${l.value}`),
    "",
  ].join("\n");
}

// ---------- font preloads ----------

// Fonts the first screen needs (the name and the bio), fetched in parallel with
// the CSS instead of after it. Silkscreen only appears further down, so it waits.
const ABOVE_THE_FOLD = [/^bricolage-600-.*\.woff2$/, /^hanken-400-600-.*\.woff2$/];

async function fontPreloads() {
  const assets = await readdir(dist("assets"));
  return ABOVE_THE_FOLD.map((pattern) => {
    const file = assets.find((f) => pattern.test(f));
    if (!file) throw new Error(`prerender: no built font matches ${pattern}`);
    return `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin />`;
  }).join("\n    ");
}

// ---------- write ----------

const { render } = await import(pathToFileURL(`${root}.ssr/entry-server.js`).href);
const appHtml = render();

let html = await readFile(dist("index.html"), "utf8");
for (const [marker, value] of [
  ['<div id="root"></div>', `<div id="root">${appHtml}</div>`],
  ["<!--app-head-->", `${await fontPreloads()}\n    ${jsonLd()}`],
]) {
  if (!html.includes(marker)) throw new Error(`prerender: marker ${marker} missing from dist/index.html`);
  html = html.replace(marker, () => value);
}
await writeFile(dist("index.html"), html);
await writeFile(dist("llms.txt"), llmsTxt());

console.log(`prerender: ${appHtml.length} chars of HTML, ${awards().length} awards, llms.txt written`);
