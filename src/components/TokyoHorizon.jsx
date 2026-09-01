// A pixel-art dusk horizon pinned to the bottom of the page: Mt. Fuji with a
// snow cap, a pixel Tokyo Tower with a beacon, and a city of lit windows — a
// nod to the photo up top. Drawn on an integer grid with crisp edges and a
// uniform (non-stretching) scale so the pixels stay square at any width.
const BASE = 48;

// Mt. Fuji as stacked 4px steps, centred at x=240.
const FUJI = [
  [16, 236, 8], [20, 230, 20], [24, 221, 38], [28, 210, 60],
  [32, 197, 86], [36, 182, 116], [40, 165, 150], [44, 146, 188],
];
// Snow cap pixels near the peak, with a couple of drips.
const SNOW = [
  [16, 236, 8], [20, 231, 13], [24, 228, 9], [24, 240, 5], [28, 231, 4], [28, 244, 4],
];

// Front skyline: [x, width, height, lit?]
const CITY = [
  [4, 16, 20, 1], [22, 10, 12, 0], [40, 22, 30, 1], [66, 12, 16, 0], [82, 16, 24, 1],
  [148, 14, 18, 1], [300, 18, 16, 0], [320, 12, 28, 1], [338, 22, 20, 1],
  [402, 14, 26, 1], [420, 18, 14, 0], [442, 12, 22, 1], [460, 18, 18, 0],
];

// Pixel Tokyo Tower (left of Fuji): [y, x, width].
const TOWER = [
  [44, 108, 24], [40, 111, 18], [37, 114, 12], [33, 116, 8], [30, 118, 4],
  [28, 113, 14], [26, 115, 10], [22, 117, 6], [18, 118, 4], [14, 118, 4],
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
        {/* Mt. Fuji */}
        <g className="hz-fuji">
          {FUJI.map(([y, x, w]) => <rect key={`f${y}`} x={x} y={y} width={w} height="4" />)}
        </g>
        <g className="hz-fuji-s">
          {FUJI.map(([y, x, w]) => <rect key={`fs${y}`} x={x + w - 5} y={y} width="5" height="4" />)}
        </g>
        <g className="hz-snow">
          {SNOW.map(([y, x, w], i) => <rect key={`s${i}`} x={x} y={y} width={w} height="4" />)}
        </g>

        {/* Tokyo Tower — pinched pixel lattice with an antenna + beacon */}
        <g className="hz-tower">
          {TOWER.map(([y, x, w], i) => <rect key={`t${i}`} x={x} y={y} width={w} height="4" />)}
          <rect x="119" y="6" width="2" height="8" />
        </g>
        <rect className="hz-beacon" x="118" y="3" width="4" height="3" />

        {/* City + lit windows */}
        <g className="hz-b">
          {CITY.map(([x, w, h]) => <rect key={`c${x}`} x={x} y={BASE - h} width={w} height={h} />)}
        </g>
        <g className="hz-b-s">
          {CITY.map(([x, w, h]) => <rect key={`cs${x}`} x={x + w - 3} y={BASE - h} width="3" height={h} />)}
        </g>
        <g>{CITY.filter((b) => b[3]).flatMap((b) => windows(b[0], b[1], b[2]))}</g>
      </svg>
    </div>
  );
}
