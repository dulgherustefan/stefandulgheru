import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile, work, competitions, conferences, languages, links } from "../data.js";
import { Arrow, Avatar, Bio } from "./Bits.jsx";
import GithubGraph from "./GithubGraph.jsx";
import { useMagnetic } from "../hooks/useMagnetic.js";

function Reveal({ children, i = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.2, 1], delay: reduce ? 0 : i * 0.04 }}
    >
      {children}
    </motion.div>
  );
}

function Eyebrow({ children }) {
  return <h2 className="eyebrow">{children}</h2>;
}

// Small right arrow that nudges forward on hover — the "go here" affordance.
function Go({ className = "go" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  );
}

// A little pixel bronze medal for the Competitions gutter — a ribbon and a
// coin with an engraved star. Only shown where an actual medal was won.
function Medal() {
  const disc = [[6, 4, 4], [7, 3, 6], [8, 2, 8], [9, 2, 8], [10, 2, 8], [11, 2, 8], [12, 3, 6], [13, 4, 4]];
  const star = [[5, 8, 2, 1], [4, 9, 4, 1], [5, 10, 1, 1], [7, 10, 1, 1]];
  return (
    <svg className="medal" viewBox="0 0 12 16" shapeRendering="crispEdges" width="15" height="20" aria-hidden="true">
      <g className="medal-ribbon"><rect x="3" y="0" width="2" height="7" /><rect x="7" y="0" width="2" height="7" /></g>
      <g className="medal-disc">
        {disc.map(([y, x, w], i) => <rect key={i} x={x} y={y} width={w} height="1" />)}
      </g>
      <rect className="medal-hi" x="3" y="7" width="2" height="1" />
      <g className="medal-star">
        {star.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} />)}
      </g>
    </svg>
  );
}

// Pixel brand glyphs for the Elsewhere links. fg = solid, cut = punched holes
// (page background), soft = translucent detail.
function Glyph({ fg = [], cut = [], soft = [] }) {
  return (
    <svg className="svc" viewBox="0 0 16 16" shapeRendering="crispEdges" width="16" height="16" aria-hidden="true">
      <g fill="currentColor">{fg.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} />)}</g>
      <g className="svc-cut">{cut.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} />)}</g>
      <g fill="#ffffff" opacity="0.5">{soft.map(([x, y, w, h], i) => <rect key={i} x={x} y={y} width={w} height={h} />)}</g>
    </svg>
  );
}

const SERVICE = {
  email: {
    fg: [[1, 4, 14, 8]],
    soft: [[2, 5, 1, 1], [3, 6, 1, 1], [4, 7, 1, 1], [5, 8, 1, 1], [6, 8, 1, 1], [7, 8, 2, 1], [9, 8, 1, 1], [10, 8, 1, 1], [11, 7, 1, 1], [12, 6, 1, 1], [13, 5, 1, 1]],
  },
  github: {
    fg: [[5, 3, 6, 1], [4, 4, 8, 1], [3, 5, 10, 4], [4, 9, 8, 1], [4, 3, 2, 1], [10, 3, 2, 1], [4, 10, 2, 2], [7, 10, 2, 2], [10, 10, 2, 2]],
    soft: [[6, 6, 1, 1], [9, 6, 1, 1]],
  },
  linkedin: {
    fg: [[2, 2, 12, 12]],
    cut: [[4, 4, 2, 2], [4, 7, 2, 5], [8, 7, 2, 5], [8, 6, 4, 1], [11, 7, 2, 5]],
  },
  instagram: {
    fg: [[2, 2, 12, 2], [2, 12, 12, 2], [2, 2, 2, 12], [12, 2, 2, 12], [6, 6, 4, 4], [11, 4, 1, 1]],
    cut: [[7, 7, 2, 2]],
  },
};

function ServiceIcon({ name }) {
  const g = SERVICE[name.toLowerCase()];
  return g ? <Glyph {...g} /> : null;
}

// One list row: an accent stat in the gutter, a title that links straight to
// the primary destination, then any extra links below (code, write-ups, etc.).
// Pointer convenience: clicking anywhere on the row opens the primary link.
// This is a mouse-only enhancement — the real title <a> carries the accessible
// name and keyboard/screen-reader semantics, so the row itself takes no link
// role. A click that lands on a nested <a> or on selected text is left alone.
function openRow(e, href) {
  if (!href || e.target.closest("a")) return;
  if (window.getSelection && String(window.getSelection())) return;
  window.open(href, "_blank", "noopener,noreferrer");
}

function Row({ gtop, gsub, name, desc, primary, extras = [], emblem = null, i }) {
  const href = primary?.href;
  return (
    <Reveal i={i}>
      <article
        className={`row${href ? " row-linked" : ""}`}
        onClick={href ? (e) => openRow(e, href) : undefined}
      >
        <div className="gut">
          {emblem}
          <div className="gtop">{gtop}</div>
          {gsub ? <div className="gsub">{gsub}</div> : null}
        </div>
        <div className="rbody">
          <h3 className="rname">
            {primary ? (
              <a className="rlink" href={primary.href} target="_blank" rel="noreferrer">
                <span>{name}</span>
                <Go />
              </a>
            ) : (
              name
            )}
          </h3>
          <p className="rdesc">{desc}</p>
          {extras.length > 0 && (
            <div className="rmeta">
              {extras.map((l) => (
                <a key={l.href} className="xlink" href={l.href} target="_blank" rel="noreferrer">
                  {l.label}
                  <Arrow className="ext" />
                </a>
              ))}
            </div>
          )}
        </div>
      </article>
    </Reveal>
  );
}

function ElsewhereLink({ l }) {
  const mag = useMagnetic(0.25, 9);
  return (
    <motion.a {...mag} href={l.href} target="_blank" rel="noreferrer">
      <ServiceIcon name={l.key} />
      <span className="lkey">{l.key}</span>
      <span className="lval">{l.value}</span>
      <Arrow />
    </motion.a>
  );
}

const primaryOf = (item) => (item.links ? item.links[0] : item.link) || null;
const extrasOf = (item) => (item.links ? item.links.slice(1) : []);

// Renders the first `initial` items, then hides the rest behind a toggle that
// expands them in place below. No-op button when everything already fits.
function CollapsibleRows({ items, initial = 4, render }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const head = items.slice(0, initial);
  const tail = items.slice(initial);

  return (
    <div className="rows">
      {head.map((item, i) => render(item, i))}
      <AnimatePresence initial={false}>
        {open &&
          tail.map((item, i) => (
            <motion.div
              key={item.id}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
            >
              {render(item, initial + i)}
            </motion.div>
          ))}
      </AnimatePresence>
      {tail.length > 0 && (
        <button
          type="button"
          className="showmore"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="showmore-txt">{open ? "Show less" : `View all (${tail.length} more)`}</span>
          <span className={`showmore-caret ${open ? "up" : ""}`} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}

export default function MinimalView() {
  return (
    <div className="minimal">
      <header className="hero">
        <div className="idrow">
          <Avatar />
          <div>
            <h1 className="name">{profile.name}</h1>
            <p className="role">
              Machine learning &amp; <b>software development</b>
            </p>
          </div>
        </div>

        <Bio paragraphs={profile.bio} />
      </header>

      <section className="sec" aria-labelledby="work-h">
        <Eyebrow>Selected work</Eyebrow>
        <div className="rows">
          {work.map((w, i) => (
            <Row
              key={w.id}
              i={i}
              gtop={w.stat}
              gsub={w.sub}
              name={w.name}
              desc={w.desc}
              primary={primaryOf(w)}
              extras={extrasOf(w)}
            />
          ))}
        </div>
      </section>

      <section className="sec" aria-labelledby="comp-h">
        <Eyebrow>Competitions &amp; awards</Eyebrow>
        <CollapsibleRows
          items={competitions}
          initial={4}
          render={(c, i) => (
            <Row
              key={c.id}
              i={i}
              gtop={c.tagTop}
              gsub={c.tagSub}
              name={c.name}
              desc={c.desc}
              primary={primaryOf(c)}
              extras={extrasOf(c)}
              emblem={c.medal ? <Medal /> : null}
            />
          )}
        />
      </section>

      <section className="sec" aria-labelledby="conf-h">
        <Eyebrow>Teaching &amp; community</Eyebrow>
        <div className="rows">
          {conferences.map((c, i) => (
            <Row
              key={c.id}
              i={i}
              gtop={c.tagTop}
              gsub={c.tagSub}
              name={c.name}
              desc={c.desc}
              primary={primaryOf(c)}
              extras={extrasOf(c)}
            />
          ))}
        </div>
      </section>

      <section className="sec" aria-labelledby="lang-h">
        <Eyebrow>Languages</Eyebrow>
        <ul className="langs">
          {languages.map((l) => (
            <li key={l.name} className="lang">
              <span className="lname">{l.name}</span>
              <span className="llevel">{l.level}</span>
            </li>
          ))}
        </ul>
      </section>

      <GithubGraph />

      <section className="sec" aria-labelledby="else-h">
        <Eyebrow>Elsewhere</Eyebrow>
        <nav className="links">
          {links.map((l) => (
            <ElsewhereLink key={l.key} l={l} />
          ))}
        </nav>
      </section>

      <footer>
        <span>Ștefan Dulgheru</span>
        <span>Bucharest</span>
      </footer>
    </div>
  );
}
