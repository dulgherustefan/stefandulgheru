// A titled page section. `id` names the heading so the section is labelled by
// it; `aside` puts an element (e.g. a "View on GitHub" link) beside the title.
export default function Section({ id, title, aside, children }) {
  const headingId = `${id}-h`;
  const heading = (
    <h2 className="eyebrow" id={headingId}>
      {title}
    </h2>
  );
  return (
    <section className="sec" aria-labelledby={headingId}>
      {aside ? (
        <div className="sec-head">
          {heading}
          {aside}
        </div>
      ) : (
        heading
      )}
      {children}
    </section>
  );
}
