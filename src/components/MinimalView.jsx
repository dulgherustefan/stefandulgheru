import { useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useTime, useTransform } from "framer-motion";
import { profile, work, competitions, conferences, languages, links } from "../data.js";
import { Arrow, Avatar, Bio } from "./Bits.jsx";
import GithubGraph from "./GithubGraph.jsx";
import TokyoHorizon from "./TokyoHorizon.jsx";
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

// Orbit-Wars ambient system. A planet runs a wide, tilted, non-uniform ellipse
// around the whole row: it lingers on the far arc and whips through the near
// one (a Kepler-ish speed term), threading in FRONT of the rank and title on
// the near pass and BEHIND them on the far pass (per-frame z-index). A comet
// tail trails it and a little moon circles it. Depth (scale + glow) is faked
// from the orbit angle so the flat ellipse reads as 3D. Geometry is measured
// from the row so it stays sane on any width; motion runs on framer's useTime
// without re-rendering React, and stills under reduced motion.
const TAU = Math.PI * 2;
const PERIOD = 9600;
const TILT = -7 * (Math.PI / 180);
const COS_T = Math.cos(TILT);
const SIN_T = Math.sin(TILT);
const STILL = 2600; // frozen phase under reduced motion, tail still reads as a comet

const depth = (near) => 0.5 + 0.62 * near; // near in [0,1]; near arc = larger

// θ with a non-uniform speed term, plus the ellipse point rotated by the tilt.
function place(v, reduce, lag, geo, size) {
  const raw = (((reduce ? STILL : v) - lag) / PERIOD) * TAU;
  const th = raw + 0.55 * Math.sin(raw);
  const ex = geo.rx * Math.cos(th);
  const ey = geo.ry * Math.sin(th);
  const x = geo.cx + ex * COS_T - ey * SIN_T - size / 2;
  const y = geo.cy + ex * SIN_T + ey * COS_T - size / 2;
  const near = 0.5 + 0.5 * Math.sin(th); // 1 at the bottom (front), 0 at the top
  return { x, y, near };
}

function OrbitBody({ t, reduce, geo, lag, size, opacity, kind }) {
  const x = useTransform(t, (v) => place(v, reduce, lag, geo, size).x);
  const y = useTransform(t, (v) => place(v, reduce, lag, geo, size).y);
  const scale = useTransform(t, (v) => depth(place(v, reduce, lag, geo, size).near));
  const zIndex = useTransform(t, (v) => (place(v, reduce, lag, geo, size).near > 0.5 ? 3 : 1));
  const boxShadow = useTransform(t, (v) => {
    const n = place(v, reduce, lag, geo, size).near;
    return `0 0 ${8 + n * 14}px rgba(243,150,70,${0.38 + n * 0.44}), 0 0 3px rgba(255,226,182,.9)`;
  });
  const style = { x, y, scale, width: size, height: size, opacity };
  if (kind === "main") { style.boxShadow = boxShadow; style.zIndex = zIndex; }
  return <motion.span className={`of-b of-${kind}`} style={style} />;
}

function OrbitMoon({ t, reduce, geo }) {
  const size = 5;
  const x = useTransform(t, (v) => {
    const p = place(v, reduce, 0, geo, size);
    return p.x + 15 * Math.cos(((reduce ? STILL : v) / 1500) * TAU);
  });
  const y = useTransform(t, (v) => {
    const p = place(v, reduce, 0, geo, size);
    return p.y + 9 * Math.sin(((reduce ? STILL : v) / 1500) * TAU);
  });
  const scale = useTransform(t, (v) => depth(place(v, reduce, 0, geo, size).near));
  return <motion.span className="of-b of-moon" style={{ x, y, scale, width: size, height: size }} />;
}

// Measures its own box so the ellipse fits whatever width the row has.
function useGeo() {
  const ref = useRef(null);
  const [box, setBox] = useState({ w: 560, h: 184 });
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const read = () => setBox({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const geo = { cx: box.w / 2, cy: box.h / 2, rx: box.w * 0.46, ry: box.h * 0.44 };
  return { ref, geo };
}

function OrbitField() {
  const reduce = useReducedMotion();
  const t = useTime();
  const { ref, geo } = useGeo();
  return (
    <>
      <div className="orbitfield of-back" ref={ref} aria-hidden="true">
        <span className="of-orbit" />
        <OrbitBody t={t} reduce={reduce} geo={geo} lag={920} size={5} opacity={0.16} kind="t" />
        <OrbitBody t={t} reduce={reduce} geo={geo} lag={600} size={7} opacity={0.32} kind="t" />
        <OrbitBody t={t} reduce={reduce} geo={geo} lag={300} size={10} opacity={0.55} kind="t" />
        <OrbitMoon t={t} reduce={reduce} geo={geo} />
      </div>
      <div className="orbitfield of-front" aria-hidden="true">
        <OrbitBody t={t} reduce={reduce} geo={geo} lag={0} size={15} opacity={1} kind="main" />
      </div>
    </>
  );
}

// One list row: an accent stat in the gutter, a title that links straight to
// the primary destination, then any extra links below (code, write-ups, etc.).
function Row({ gtop, gsub, name, desc, primary, extras = [], field = null, i }) {
  return (
    <Reveal i={i}>
      <article className={`row${field ? " has-field" : ""}`}>
        {field}
        <div className="gut">
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
              Machine learning &amp; <b>software</b>
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
              field={c.orbit ? <OrbitField /> : null}
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

      <TokyoHorizon />
    </div>
  );
}
