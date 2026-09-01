// A quiet dawn horizon pinned to the bottom of the page: a soft glow, Mt. Fuji
// with a snow cap, two depths of city silhouette with a few lit windows, and a
// little Tokyo Tower — a nod to the photo up top. Full-bleed and theme-aware
// (silhouettes use currentColor = --cloud); the SVG stretches to any width.
export default function TokyoHorizon() {
  // Front skyline: varied buildings across the width, a few with lit windows.
  const city = [
    { x: 20, w: 46, h: 70 }, { x: 74, w: 30, h: 44 }, { x: 112, w: 54, h: 96, win: true },
    { x: 174, w: 34, h: 58 }, { x: 216, w: 40, h: 40 }, { x: 356, w: 42, h: 62 },
    { x: 406, w: 30, h: 90, win: true }, { x: 444, w: 48, h: 50 }, { x: 500, w: 34, h: 74 },
    { x: 690, w: 40, h: 54 }, { x: 738, w: 52, h: 104, win: true }, { x: 800, w: 32, h: 62 },
    { x: 840, w: 44, h: 42 }, { x: 1030, w: 38, h: 66 }, { x: 1076, w: 30, h: 92, win: true },
    { x: 1114, w: 50, h: 52 }, { x: 1172, w: 26, h: 74 },
  ];
  const base = 200;
  const windows = (b) => {
    const cols = Math.max(1, Math.floor((b.w - 8) / 10));
    const rows = Math.max(1, Math.floor((b.h - 14) / 12));
    const out = [];
    for (let r = 0; r < rows; r++)
      for (let c = 0; c < cols; c++)
        if ((r + c) % 2 === 0)
          out.push(
            <rect key={`${b.x}-${r}-${c}`} className="hz-win"
              x={b.x + 6 + c * 10} y={base - b.h + 8 + r * 12} width="4" height="5" />
          );
    return out;
  };

  return (
    <div className="horizon" aria-hidden="true">
      <svg viewBox="0 0 1200 210" width="100%" preserveAspectRatio="none">
        <defs>
          <radialGradient id="hzGlow" cx="50%" cy="100%" r="62%">
            <stop offset="0%" stopColor="#8ea2e8" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#8ea2e8" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#8ea2e8" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* dawn glow behind the mountain */}
        <ellipse className="hz-glow" cx="600" cy="200" rx="430" ry="150" fill="url(#hzGlow)" />

        {/* Mt. Fuji with a snow cap */}
        <g className="hz-fuji">
          <path d="M300 200 C440 150 560 92 600 70 C640 92 760 150 900 200 Z" />
        </g>
        <path className="hz-snow"
          d="M556 108 C575 92 590 78 600 70 C610 78 625 92 644 108 C632 104 622 112 612 106
             C606 114 600 104 594 112 C584 106 574 114 566 106 C562 111 559 110 556 108 Z" />

        {/* distant back city */}
        <g className="hz-back">
          <rect x="120" y="150" width="60" height="60" />
          <rect x="250" y="132" width="44" height="78" />
          <rect x="470" y="146" width="70" height="64" />
          <rect x="620" y="138" width="40" height="72" />
          <rect x="900" y="150" width="56" height="60" />
          <rect x="1010" y="134" width="46" height="76" />
        </g>

        {/* front city + lit windows */}
        <g className="hz-city">
          {city.map((b) => (
            <rect key={b.x} x={b.x} y={base - b.h} width={b.w} height={b.h} />
          ))}
        </g>
        <g>{city.filter((b) => b.win).flatMap(windows)}</g>

        {/* Tokyo Tower — pinched lattice, decks, antenna + beacon */}
        <g className="hz-tower">
          <path d="M283 200 L294 150 L298 110 L300 92 L302 110 L306 150 L317 200 Z" />
          <rect x="290" y="148" width="20" height="4" />
          <rect x="295" y="118" width="10" height="3" />
          <rect x="299.1" y="80" width="1.8" height="12" />
        </g>
        <circle className="hz-beacon" cx="300" cy="80" r="2.4" />
      </svg>
    </div>
  );
}
