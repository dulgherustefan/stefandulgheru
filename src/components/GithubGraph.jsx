import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { githubUser } from "../data.js";
import { Arrow } from "./Bits.jsx";

function toColumns(days) {
  if (!days.length) return [];
  const cells = [];
  const firstDow = new Date(days[0].date).getDay();
  for (let i = 0; i < firstDow; i++) cells.push(null);
  days.forEach((d) => cells.push(d));
  const cols = [];
  for (let i = 0; i < cells.length; i += 7) cols.push(cells.slice(i, i + 7));
  return cols;
}

export default function GithubGraph() {
  const reduce = useReducedMotion();
  const [days, setDays] = useState(null);
  const [total, setTotal] = useState(null);

  useEffect(() => {
    let alive = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${githubUser}?y=last`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        if (!alive) return;
        const contribs = (json.contributions || []).map((c) => ({ date: c.date, level: c.level }));
        if (contribs.length) {
          setDays(contribs.slice(-364));
          const t = json.total && (json.total.lastYear || Object.values(json.total)[0]);
          setTotal(t || null);
        } else setDays("error");
      })
      // Never fabricate activity: if the real data can't load, say so and link out.
      .catch(() => alive && setDays("error"));
    return () => {
      alive = false;
    };
  }, []);

  const failed = days === "error";
  const cols = toColumns(Array.isArray(days) ? days : []);

  return (
    <section className="sec" aria-labelledby="gh-h">
      <div className="gh-head">
        <h2 className="eyebrow" id="gh-h" style={{ margin: 0 }}>GitHub</h2>
        <a className="gh-link" href={`https://github.com/${githubUser}`} target="_blank" rel="noreferrer">
          View on GitHub <Arrow className="ext" />
        </a>
      </div>

      {failed ? (
        <p className="gh-note">
          The contribution graph couldn't load right now — it's on{" "}
          <a href={`https://github.com/${githubUser}`} target="_blank" rel="noreferrer">GitHub</a>.
        </p>
      ) : (
        <>
          <div className="gh-graphwrap">
            <div className="gh-graph" role="img" aria-label={total ? `${total} contributions in the last year` : "GitHub contributions"}>
              {cols.map((col, ci) => (
                <div className="gh-col" key={ci}>
                  {col.map((cell, ri) => (
                    <motion.span
                      key={ri}
                      className={`gh-cell lvl-${cell ? cell.level : 0}`}
                      initial={reduce ? false : { opacity: 0, scale: 0.4 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.25, delay: reduce ? 0 : Math.min(ci * 0.008, 0.6) }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="gh-legend">
            {total != null && <span className="gh-total">{total} contributions</span>}
            <span className="gh-scale">
              Less
              <span className="gh-cell lvl-0" />
              <span className="gh-cell lvl-1" />
              <span className="gh-cell lvl-2" />
              <span className="gh-cell lvl-3" />
              <span className="gh-cell lvl-4" />
              More
            </span>
          </div>
        </>
      )}
    </section>
  );
}
