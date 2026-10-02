import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal.jsx";
import { Arrow, Go } from "./icons.jsx";
import { Medal } from "./pixel.jsx";

// Clicking anywhere on a row opens its primary link. Mouse-only convenience:
// the title <a> carries the accessible name and keyboard semantics, so the row
// itself takes no link role. Clicks on a nested <a> or on selected text pass.
function openRow(e, href) {
  if (e.target.closest("a")) return;
  if (String(window.getSelection?.() ?? "")) return;
  window.open(href, "_blank", "noopener,noreferrer");
}

// One entry: an accent stat in the left gutter (with a medal when one was won),
// a title linking to the first of `links`, a description, then any extra links.
function Row({ item, i }) {
  const [primary, ...extras] = item.links ?? [];
  const href = primary?.href;
  return (
    <Reveal i={i}>
      <article
        className={`row${href ? " row-linked" : ""}`}
        onClick={href ? (e) => openRow(e, href) : undefined}
      >
        <div className="gut">
          {item.medal ? <Medal /> : null}
          <div className="gtop">{item.stat}</div>
          {item.sub ? <div className="gsub">{item.sub}</div> : null}
        </div>
        <div className="rbody">
          <h3 className="rname">
            {primary ? (
              <a className="rlink" href={primary.href} target="_blank" rel="noreferrer">
                <span>{item.name}</span>
                <Go />
              </a>
            ) : (
              item.name
            )}
          </h3>
          <p className="rdesc">{item.desc}</p>
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

// A list of rows. With `limit`, only the first `limit` show until "View all"
// expands the rest in place.
export default function RowList({ items, limit = items.length }) {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const head = items.slice(0, limit);
  const tail = items.slice(limit);

  return (
    <div className="rows">
      {head.map((item, i) => (
        <Row key={item.id} item={item} i={i} />
      ))}
      <AnimatePresence initial={false}>
        {open &&
          tail.map((item, i) => (
            <m.div
              key={item.id}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.32, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <Row item={item} i={limit + i} />
            </m.div>
          ))}
      </AnimatePresence>
      {tail.length > 0 && (
        <button type="button" className="showmore" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span className="showmore-txt">{open ? "Show less" : `View all (${tail.length} more)`}</span>
          <span className={`showmore-caret ${open ? "up" : ""}`} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
