import { motion, useReducedMotion } from "framer-motion";
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

// One list row: an accent stat in the gutter, a title that links straight to
// the primary destination, then any extra links below (code, write-ups, etc.).
function Row({ gtop, gsub, name, desc, primary, extras = [], i }) {
  return (
    <Reveal i={i}>
      <article className="row">
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
        <div className="rows">
          {competitions.map((c, i) => (
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
