// A pixel-art Tokyo skyline pinned to the bottom of the page: a city of lit
// windows, the Tokyo Tower with its beacon, and a tall Skytree spire — a nod to
// the photo up top. Drawn on an integer grid with crisp edges and a uniform
// (non-stretching) scale so the pixels stay square at any width.
const BASE = 48;

// Front skyline across the width: [x, width, height, lit?]
const CITY = [
  [4, 16, 20, 1], [22, 10, 12, 0], [40, 22, 30, 1], [66, 12, 16, 0], [82, 18, 24, 1],
  [140, 14, 18, 0], [156, 22, 34, 1], [182, 12, 22, 0], [200, 20, 28, 1], [224, 14, 16, 0],
  [248, 18, 26, 1], [270, 12, 20, 0], [300, 20, 30, 1], [324, 14, 18, 0], [342, 22, 24, 1],
  [402, 14, 26, 1], [420, 18, 16, 0], [442, 12, 22, 1], [460, 18, 20, 0],
];

// Pixel Tokyo Tower (left): [y, x, width], 4px bands.
const TOWER = [
  [44, 108, 24], [40, 111, 18], [37, 114, 12], [33, 116, 8], [30, 118, 4],
  [28, 113, 14], [26, 115, 10], [22, 117, 6], [18, 118, 4], [14, 118, 4],
];

// Skytree spire (right): [y, x, width], 4px bands, a slim tapering mast.
const SKYTREE = [
  [44, 366, 12], [40, 368, 8], [36, 369, 6], [32, 370, 4], [28, 370, 4],
  [24, 371, 3], [20, 371, 3], [16, 371, 2], [12, 371, 2], [8, 371, 2],
];

function windows(x, w, h) {
  const out = [];
  const top = BASE - h;
  for (let wy = top + 3; wy < BASE - 3; wy += 5)
    for (let wx = x + 3; wx < x + w - 2; wx += 5)
      if ((wx + wy) % 2 === 0) out.push(<rect key={`${wx}-${wy}`} className="hz-win" x={wx} y={wy} width="2" height="2" />);
  return out;
}

export default function TokyoHorizon() {
  return (
    <div className="horizon" aria-hidden="true">
      <svg viewBox="0 0 480 48" width="100%" preserveAspectRatio="xMidYMax slice" shapeRendering="crispEdges">
        {/* City + lit windows */}
        <g className="hz-b">
          {CITY.map(([x, w, h]) => <rect key={`c${x}`} x={x} y={BASE - h} width={w} height={h} />)}
        </g>
        <g className="hz-b-s">
          {CITY.map(([x, w, h]) => <rect key={`cs${x}`} x={x + w - 3} y={BASE - h} width="3" height={h} />)}
        </g>
        <g>{CITY.filter((b) => b[3]).flatMap((b) => windows(b[0], b[1], b[2]))}</g>

        {/* Skytree spire */}
        <g className="hz-b">
          {SKYTREE.map(([y, x, w], i) => <rect key={`k${i}`} x={x} y={y} width={w} height="4" />)}
        </g>
        <rect className="hz-beacon" x="371" y="4" width="2" height="3" />

        {/* Tokyo Tower — pinched pixel lattice with an antenna + beacon */}
        <g className="hz-tower">
          {TOWER.map(([y, x, w], i) => <rect key={`t${i}`} x={x} y={y} width={w} height="4" />)}
          <rect x="119" y="6" width="2" height="8" />
        </g>
        <rect className="hz-beacon" x="118" y="3" width="4" height="3" />
      </svg>
    </div>
  );
}
