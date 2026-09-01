// A subtle pixel skyline pinned to the bottom of the page: Mt. Fuji, a few
// towers, and a little Tokyo Tower — a quiet nod to the photo up top.
export default function TokyoHorizon() {
  return (
    <div className="horizon" aria-hidden="true">
      <svg viewBox="0 0 300 64" width="100%" preserveAspectRatio="none" shapeRendering="crispEdges">
        <g className="hz-city" fill="currentColor">
          {/* left buildings */}
          <rect x="6" y="42" width="14" height="22" />
          <rect x="22" y="32" width="12" height="32" />
          <rect x="36" y="48" width="10" height="16" />
          <rect x="48" y="38" width="16" height="26" />
          <rect x="66" y="50" width="12" height="14" />

          {/* Mt. Fuji, stepped */}
          <rect x="142" y="20" width="16" height="6" />
          <rect x="134" y="26" width="32" height="6" />
          <rect x="125" y="32" width="50" height="6" />
          <rect x="115" y="38" width="70" height="6" />
          <rect x="104" y="44" width="92" height="6" />
          <rect x="92" y="50" width="116" height="6" />
          <rect x="78" y="56" width="144" height="8" />

          {/* right buildings */}
          <rect x="210" y="44" width="14" height="20" />
          <rect x="226" y="34" width="12" height="30" />
          <rect x="262" y="48" width="10" height="16" />
          <rect x="276" y="38" width="12" height="26" />
          <rect x="290" y="46" width="10" height="18" />
        </g>

        {/* Tokyo Tower — small warm accent */}
        <g className="hz-tower" fill="#e08a45">
          <rect x="243" y="26" width="10" height="38" />
          <rect x="240" y="40" width="16" height="3" />
          <rect x="245" y="18" width="6" height="8" />
          <rect x="247" y="12" width="2" height="6" />
        </g>
      </svg>
    </div>
  );
}
