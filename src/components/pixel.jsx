// All pixel art on the page. Shapes are static data hoisted to module scope;
// two tiny renderers draw them: `rows` are [y, x, width] strips of a given
// height, `rects` are [x, y, width, height] blocks.

function Rows({ rows, h = 1, ...g }) {
  return (
    <g {...g}>
      {rows.map(([y, x, w], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} />
      ))}
    </g>
  );
}

function Rects({ rects, ...g }) {
  return (
    <g {...g}>
      {rects.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} />
      ))}
    </g>
  );
}

// ---------- clouds: chunky cumulus, lighter crown band, darker underside ----------

const CLOUD = {
  viewBox: "0 0 15 8",
  base: [
    [1, 5, 5],
    [2, 3, 9],
    [3, 1, 13],
    [4, 0, 15],
    [5, 1, 13],
  ],
  light: [
    [1, 5, 2],
    [2, 3, 3],
    [3, 1, 3],
  ],
  shade: [
    [4, 9, 6],
    [5, 1, 13],
  ],
};

const PUFF = {
  viewBox: "0 0 11 6",
  base: [
    [1, 4, 3],
    [2, 2, 7],
    [3, 1, 9],
    [4, 2, 7],
  ],
  light: [
    [1, 4, 2],
    [2, 2, 2],
  ],
  shade: [
    [3, 6, 4],
    [4, 2, 7],
  ],
};

function PixelCloud({ shape }) {
  return (
    <svg viewBox={shape.viewBox} shapeRendering="crispEdges" aria-hidden="true" width="100%">
      <Rows rows={shape.base} fill="currentColor" />
      <Rows rows={shape.light} fill="#ffffff" opacity="0.55" />
      <Rows rows={shape.shade} fill="#0b1020" opacity="0.14" />
    </svg>
  );
}

export const Cloud = () => <PixelCloud shape={CLOUD} />;
export const Puff = () => <PixelCloud shape={PUFF} />;

// ---------- moon: smooth cream sphere with a soft terminator and craters ----------

export function Moon() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" width="100%">
      <defs>
        <radialGradient id="mFace" cx="36%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="60%" stopColor="#f6f4ec" />
          <stop offset="100%" stopColor="#e4dfd0" />
        </radialGradient>
        <radialGradient id="mShade" cx="74%" cy="72%" r="62%">
          <stop offset="0%" stopColor="#000000" stopOpacity="0" />
          <stop offset="100%" stopColor="#2b2a22" stopOpacity="0.18" />
        </radialGradient>
      </defs>
      <circle cx="20" cy="20" r="14" fill="url(#mFace)" />
      <circle cx="20" cy="20" r="14" fill="url(#mShade)" />
      <g fill="#d9d3c2" opacity="0.4">
        <circle cx="15" cy="15" r="2.2" />
        <circle cx="25" cy="22" r="2.8" />
        <circle cx="18.5" cy="27" r="1.5" />
      </g>
    </svg>
  );
}

// ---------- sun: stepped disc in three warm tones plus eight pixel rays ----------

const SUN = {
  rays: [
    [16, 0, 4, 4],
    [16, 32, 4, 4],
    [0, 16, 4, 4],
    [32, 16, 4, 4],
    [5, 5, 4, 4],
    [27, 5, 4, 4],
    [5, 27, 4, 4],
    [27, 27, 4, 4],
  ],
  body: [
    [8, 14, 8],
    [10, 12, 12],
    [12, 10, 16],
    [14, 8, 20],
    [16, 8, 20],
    [18, 8, 20],
    [20, 8, 20],
    [22, 10, 16],
    [24, 12, 12],
    [26, 14, 8],
  ],
  shade: [
    [20, 22, 6],
    [22, 20, 6],
    [24, 18, 6],
    [26, 16, 6],
  ],
  light: [
    [10, 12, 6],
    [12, 10, 8],
    [14, 8, 8],
    [16, 8, 6],
  ],
};

export function Sun() {
  return (
    <svg viewBox="0 0 36 36" shapeRendering="crispEdges" aria-hidden="true" width="100%">
      <Rects rects={SUN.rays} fill="#f4901f" />
      <Rows rows={SUN.body} h={2} fill="#f6a53c" />
      <Rows rows={SUN.shade} h={2} fill="#db7a1e" />
      <Rows rows={SUN.light} h={2} fill="#ffd67e" />
      <rect fill="#fff2bf" x="12" y="12" width="4" height="4" />
    </svg>
  );
}

// ---------- bronze medal: ribbon plus a coin with an engraved star ----------

const MEDAL = {
  ribbon: [
    [3, 0, 2, 7],
    [7, 0, 2, 7],
  ],
  disc: [
    [6, 4, 4],
    [7, 3, 6],
    [8, 2, 8],
    [9, 2, 8],
    [10, 2, 8],
    [11, 2, 8],
    [12, 3, 6],
    [13, 4, 4],
  ],
  star: [
    [5, 8, 2, 1],
    [4, 9, 4, 1],
    [5, 10, 1, 1],
    [7, 10, 1, 1],
  ],
};

export function Medal() {
  return (
    <svg
      className="medal"
      viewBox="0 0 12 16"
      shapeRendering="crispEdges"
      width="15"
      height="20"
      aria-hidden="true"
    >
      <Rects rects={MEDAL.ribbon} className="medal-ribbon" />
      <Rows rows={MEDAL.disc} className="medal-disc" />
      <rect className="medal-hi" x="3" y="7" width="2" height="1" />
      <Rects rects={MEDAL.star} className="medal-star" />
    </svg>
  );
}

// ---------- service glyphs for the Elsewhere links ----------
// fg = solid, cut = punched holes (page background), soft = translucent detail.

const SERVICE = {
  email: {
    fg: [[1, 4, 14, 8]],
    soft: [
      [2, 5, 1, 1],
      [3, 6, 1, 1],
      [4, 7, 1, 1],
      [5, 8, 1, 1],
      [6, 8, 1, 1],
      [7, 8, 2, 1],
      [9, 8, 1, 1],
      [10, 8, 1, 1],
      [11, 7, 1, 1],
      [12, 6, 1, 1],
      [13, 5, 1, 1],
    ],
  },
  github: {
    fg: [
      [5, 3, 6, 1],
      [4, 4, 8, 1],
      [3, 5, 10, 4],
      [4, 9, 8, 1],
      [4, 3, 2, 1],
      [10, 3, 2, 1],
      [4, 10, 2, 2],
      [7, 10, 2, 2],
      [10, 10, 2, 2],
    ],
    soft: [
      [6, 6, 1, 1],
      [9, 6, 1, 1],
    ],
  },
  linkedin: {
    fg: [[2, 2, 12, 12]],
    cut: [
      [4, 4, 2, 2],
      [4, 7, 2, 5],
      [8, 7, 2, 5],
      [8, 6, 4, 1],
      [11, 7, 2, 5],
    ],
  },
  instagram: {
    fg: [
      [2, 2, 12, 2],
      [2, 12, 12, 2],
      [2, 2, 2, 12],
      [12, 2, 2, 12],
      [6, 6, 4, 4],
      [11, 4, 1, 1],
    ],
    cut: [[7, 7, 2, 2]],
  },
};

export function ServiceIcon({ name }) {
  const glyph = SERVICE[name.toLowerCase()];
  if (!glyph) return null;
  const { fg = [], cut = [], soft = [] } = glyph;
  return (
    <svg
      className="svc"
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      width="16"
      height="16"
      aria-hidden="true"
    >
      <Rects rects={fg} fill="currentColor" />
      <Rects rects={cut} className="svc-cut" />
      <Rects rects={soft} fill="#ffffff" opacity="0.5" />
    </svg>
  );
}
