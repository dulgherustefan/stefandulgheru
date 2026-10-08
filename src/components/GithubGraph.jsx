import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { githubUser } from "../data.js";
import { Arrow } from "./icons.jsx";
import Section from "./Section.jsx";

const API = `https://github-contributions-api.jogruber.de/v4/${githubUser}?y=last`;
const PROFILE = `https://github.com/${githubUser}`;
const LEVELS = [0, 1, 2, 3, 4];

// Lay days out as week columns (Sunday first), padding the first week. The dates
// are calendar days parsed as UTC, so the weekday is read in UTC too; a local
// read shifts every column by a day for visitors west of Greenwich.
function toColumns(days) {
  if (!days.length) return [];
  const cells = Array(new Date(days[0].date).getUTCDay()).fill(null).concat(days);
  const cols = [];
  for (let i = 0; i < cells.length; i += 7) cols.push(cells.slice(i, i + 7));
  return cols;
}

// The last year of real contributions. If the data can't load, it says so and
// links out rather than drawing a made-up graph.
export default function GithubGraph() {
  const [status, setStatus] = useState("loading");
  const [days, setDays] = useState([]);
  const [total, setTotal] = useState(null);
  const wrapRef = useRef(null);
  const graphRef = useRef(null);
  const inView = useInView(graphRef, { once: true });

  // On narrow screens the graph scrolls sideways; start at the latest weeks, as GitHub does.
  useEffect(() => {
    const wrap = wrapRef.current;
    if (status === "ready" && wrap) wrap.scrollLeft = wrap.scrollWidth;
  }, [status]);

  useEffect(() => {
    let alive = true;
    // A hung API ends in the error note instead of an empty box.
    fetch(API, { signal: AbortSignal.timeout?.(10000) })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((json) => {
        if (!alive) return;
        const contribs = (json.contributions || []).map(({ date, level }) => ({ date, level }));
        if (!contribs.length) return setStatus("error");
        setDays(contribs.slice(-364));
        setTotal(json.total?.lastYear || Object.values(json.total ?? {})[0] || null);
        setStatus("ready");
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, []);

  const viewLink = (
    <a className="gh-link" href={PROFILE} target="_blank" rel="noreferrer">
      View on GitHub <Arrow className="ext" />
    </a>
  );

  return (
    <Section id="gh" title="GitHub" aside={viewLink}>
      {status === "error" ? (
        <p className="gh-note">
          The contribution graph couldn't load right now. It's on{" "}
          <a href={PROFILE} target="_blank" rel="noreferrer">
            GitHub
          </a>
          .
        </p>
      ) : (
        <>
          <div className="gh-graphwrap" ref={wrapRef}>
            <div
              ref={graphRef}
              className={`gh-graph${inView ? " is-in" : ""}`}
              role="img"
              aria-label={
                total
                  ? `${total.toLocaleString("en-US")} contributions in the last year`
                  : "GitHub contributions"
              }
            >
              {toColumns(days).map((col, ci) => (
                <div className="gh-col" key={ci} style={{ "--d": `${Math.min(ci * 8, 600)}ms` }}>
                  {col.map((cell, ri) => (
                    <span key={ri} className={`gh-cell lvl-${cell ? cell.level : 0}`} />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="gh-legend">
            {total != null && <span className="gh-total">{total.toLocaleString("en-US")} contributions</span>}
            <span className="gh-scale">
              Less
              {LEVELS.map((l) => (
                <span key={l} className={`gh-cell lvl-${l}`} />
              ))}
              More
            </span>
          </div>
        </>
      )}
    </Section>
  );
}
