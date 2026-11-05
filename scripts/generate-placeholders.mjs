/**
 * Generates the temporary placeholder images in /public/images/placeholders:
 * moody dusk "renders" of homes and interiors that hold the site's look until
 * real project photos are added.
 *
 *   node scripts/generate-placeholders.mjs
 *
 * You never need to run this to swap in real photos: just point the data files
 * (/src/content/*.ts, /src/config/services.ts) at your new images.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "public/images/placeholders");
mkdirSync(OUT, { recursive: true });

const GROUND = 780;
const FACADE = "#141312";
const FACADE_2 = "#1b1a18";
const EDGE = `stroke="#3a3632" stroke-width="1.5"`;

// ------------------------------------------------------------ primitives --
const rect = (x, y, w, h, fill, extra = "") =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const poly = (pts, fill, extra = "") =>
  `<polygon points="${pts.map((p) => p.join(",")).join(" ")}" fill="${fill}" ${extra}/>`;

/** A lit window: warm glass, mullions, and a soft bloom behind it. */
function glow(x, y, w, h, { cols = 1, rows = 1, dim = false } = {}) {
  const fill = dim ? "url(#warmDim)" : "url(#warm)";
  let s = `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" fill="#f0b46a" opacity="${dim ? 0.12 : 0.28}" filter="url(#bloom)"/>`;
  s += rect(x, y, w, h, fill);
  for (let c = 1; c < cols; c++) s += rect(x + (w * c) / cols - 1, y, 2, h, "#1a1611");
  for (let r = 1; r < rows; r++) s += rect(x, y + (h * r) / rows - 1, w, 2, "#1a1611");
  return s;
}

function tree(x, h = 200, w = 0.32) {
  return (
    rect(x - 3, GROUND - h * 0.3, 6, h * 0.3, "#050505") +
    `<ellipse cx="${x}" cy="${GROUND - h * 0.6}" rx="${h * w}" ry="${h * 0.42}" fill="#070808"/>`
  );
}

function pathLights(xs) {
  return xs
    .map(
      (x) =>
        `<circle cx="${x}" cy="${GROUND + 14}" r="3" fill="#ffd9a0"/><circle cx="${x}" cy="${GROUND + 14}" r="14" fill="#ffd9a0" opacity="0.18" filter="url(#bloom)"/>`,
    )
    .join("");
}

/** Mirrors the house into a pool for a reflection. */
function pool(x, w, house) {
  return `<g clip-path="url(#poolClip)"><rect x="${x}" y="${GROUND + 40}" width="${w}" height="120" fill="#0b1418"/>
  <g transform="translate(0 ${GROUND * 2 + 40}) scale(1 -1)" opacity="0.28" filter="url(#soft)">${house}</g>
  <rect x="${x}" y="${GROUND + 40}" width="${w}" height="120" fill="url(#poolFade)"/></g>
  <defs><clipPath id="poolClip"><rect x="${x}" y="${GROUND + 40}" width="${w}" height="120"/></clipPath></defs>
  <rect x="${x}" y="${GROUND + 40}" width="${w}" height="1.5" fill="#6b5a44" opacity="0.6"/>`;
}

// ------------------------------------------------------------- exteriors --
function modernHouse() {
  let h = "";
  h += rect(330, 570, 900, GROUND - 570, FACADE, EDGE);
  h += rect(520, 400, 820, 170, FACADE_2, EDGE);
  h += rect(300, 556, 960, 14, "#222", "") + rect(500, 386, 870, 14, "#222");
  h += glow(560, 420, 520, 130, { cols: 5 });
  h += glow(1110, 430, 190, 120, { cols: 2, dim: true });
  h += glow(380, 610, 420, GROUND - 640, { cols: 4 });
  h += rect(840, 600, 110, GROUND - 600, "#0d0c0b") + glow(980, 610, 200, GROUND - 640, { cols: 2, dim: true });
  return h;
}

function customHouse() {
  let h = "";
  h += poly(
    [
      [440, 450],
      [800, 230],
      [1160, 450],
    ],
    "#0e0d0c",
    EDGE,
  );
  h += rect(470, 450, 660, GROUND - 450, FACADE, EDGE);
  h += rect(960, 260, 48, 120, "#0e0d0c", EDGE);
  for (let i = 0; i < 4; i++) h += glow(515 + i * 150, 490, 90, 110, { cols: 2, rows: 2, dim: i % 3 === 2 });
  for (const i of [0, 1, 3]) h += glow(515 + i * 150, 630, 90, 120, { cols: 2, rows: 2 });
  h += glow(770, 620, 60, GROUND - 620) + glow(745, 300, 110, 90, { cols: 2, dim: true });
  h +=
    poly(
      [
        [1120, 560],
        [1260, 490],
        [1400, 560],
      ],
      "#0e0d0c",
      EDGE,
    ) + rect(1130, 560, 260, GROUND - 560, FACADE_2, EDGE);
  h += rect(1170, 610, 180, GROUND - 610, "#0b0b0a") + glow(1170, 590, 180, 8, { dim: true });
  return h;
}

function townhomes() {
  let h = "";
  const tops = [400, 380, 420, 390, 410];
  tops.forEach((top, i) => {
    const x = 300 + i * 200;
    h += rect(x, top, 200, GROUND - top, i % 2 ? FACADE : FACADE_2, EDGE) + rect(x - 6, top - 14, 212, 14, "#222");
    for (let r = 0; r < 3; r++)
      for (let c = 0; c < 2; c++)
        h += glow(x + 30 + c * 90, top + 40 + r * 95, 50, 70, { rows: 2, dim: (r + c + i) % 3 === 0 });
    h += glow(x + 120, GROUND - 90, 50, 90, { dim: true });
  });
  return h;
}

function twoFamily() {
  let h =
    poly(
      [
        [520, 380],
        [800, 220],
        [1080, 380],
      ],
      "#0e0d0c",
      EDGE,
    ) + rect(545, 380, 510, GROUND - 380, FACADE, EDGE);
  for (const x of [600, 860])
    for (const y of [420, 560]) h += glow(x, y, 140, 100, { cols: 3, rows: 2, dim: y === 560 && x === 860 });
  h +=
    glow(660, GROUND - 100, 60, 100) +
    glow(880, GROUND - 100, 60, 100, { dim: true }) +
    glow(760, 290, 80, 60, { cols: 2 });
  return h;
}

function dormerHouse() {
  let h =
    rect(430, 560, 740, GROUND - 560, FACADE, EDGE) +
    poly(
      [
        [400, 560],
        [800, 320],
        [1200, 560],
      ],
      "#0e0d0c",
      EDGE,
    );
  h +=
    poly(
      [
        [555, 560],
        [555, 405],
        [1045, 405],
        [1045, 560],
      ],
      FACADE_2,
      EDGE,
    ) + rect(540, 395, 520, 12, "#222");
  for (let i = 0; i < 4; i++) h += glow(590 + i * 112, 435, 80, 90, { cols: 2 });
  h += glow(480, 610, 110, 110, { cols: 2, rows: 2 }) + glow(1010, 610, 110, 110, { cols: 2, rows: 2, dim: true });
  h += glow(765, 625, 70, GROUND - 625);
  return h;
}

function farmhouse() {
  let h =
    poly(
      [
        [600, 430],
        [860, 200],
        [1120, 430],
      ],
      "#0e0d0c",
      EDGE,
    ) + rect(630, 430, 460, GROUND - 430, FACADE, EDGE);
  h +=
    glow(760, 290, 200, 120, { cols: 3 }) +
    glow(680, 470, 160, 140, { cols: 2, rows: 2 }) +
    glow(880, 470, 160, 140, { cols: 2, rows: 2 });
  h += glow(825, 650, 70, GROUND - 650);
  h +=
    poly(
      [
        [370, 560],
        [520, 440],
        [670, 560],
      ],
      "#0e0d0c",
      EDGE,
    ) + rect(395, 560, 250, GROUND - 560, FACADE_2, EDGE);
  h += glow(430, 600, 180, 120, { cols: 3, dim: true });
  h += rect(640, 618, 470, 10, "#222");
  return h;
}

function shingle() {
  let h =
    poly(
      [
        [450, 470],
        [560, 320],
        [1040, 320],
        [1150, 470],
      ],
      "#0e0d0c",
      EDGE,
    ) + rect(470, 470, 660, GROUND - 470, FACADE, EDGE);
  h +=
    poly(
      [
        [700, 320],
        [800, 230],
        [900, 320],
      ],
      "#0e0d0c",
      EDGE,
    ) + glow(765, 262, 70, 45, { cols: 2 });
  for (let i = 0; i < 4; i++) h += glow(525 + i * 150, 500, 90, 90, { cols: 2, rows: 2, dim: i === 1 });
  h += rect(440, 620, 720, 12, "#222");
  for (let i = 0; i < 8; i++) h += rect(458 + i * 98, 632, 6, GROUND - 632, "#1d1b19");
  h += glow(770, 660, 60, GROUND - 660);
  return h;
}

// ------------------------------------------------------------- interiors --
function room(extra) {
  let s = `<rect width="1600" height="1000" fill="url(#wall)"/>`;
  s += poly(
    [
      [0, 1000],
      [520, 660],
      [1080, 660],
      [1600, 1000],
    ],
    "url(#floor)",
  );
  s += poly(
    [
      [0, 0],
      [520, 250],
      [1080, 250],
      [1600, 0],
    ],
    "#100d0a",
  );
  s += poly(
    [
      [0, 0],
      [520, 250],
      [520, 660],
      [0, 1000],
    ],
    "#1a1510",
  );
  s += poly(
    [
      [1600, 0],
      [1080, 250],
      [1080, 660],
      [1600, 1000],
    ],
    "#1a1510",
  );
  // big window to a dusk sky
  s +=
    `<rect x="560" y="290" width="480" height="330" fill="url(#sky)"/>` +
    rect(560, 290, 480, 330, "none", `stroke="#0b0907" stroke-width="10"`);
  s += rect(798, 290, 4, 330, "#0b0907") + rect(560, 520, 480, 4, "#0b0907");
  return s + extra;
}

function pendant(x) {
  return `${rect(x - 1, 0, 2, 200, "#0c0a08")}<path d="M${x - 30} 230 a30 30 0 0 1 60 0 z" fill="#1b1612"/>
  <ellipse cx="${x}" cy="236" rx="40" ry="20" fill="#ffd9a0" opacity="0.55" filter="url(#bloom)"/><ellipse cx="${x}" cy="231" rx="24" ry="4" fill="#ffe6c0"/>`;
}

const interiors = {
  living: () =>
    room(
      `${rect(420, 640, 760, 110, "#0e0b09")}${rect(420, 600, 760, 50, "#16120e")}${rect(640, 760, 320, 50, "#120f0c")}
       <ellipse cx="800" cy="900" rx="520" ry="60" fill="#ffcf8a" opacity="0.06" filter="url(#bloom)"/>${pendant(800)}`,
    ),
  kitchen: () =>
    room(
      `${rect(520, 560, 560, 100, "#120e0b")}${rect(560, 680, 480, 150, "#0f0c09")}${rect(540, 672, 520, 12, "#2a221a")}
       ${pendant(680)}${pendant(800)}${pendant(920)}`,
    ),
  bath: () =>
    room(
      `<path d="M560 700 Q560 800 680 800 L920 800 Q1040 800 1040 700 Z" fill="#d9d2c6"/><ellipse cx="800" cy="700" rx="240" ry="26" fill="#efe8dc"/>
       <ellipse cx="800" cy="760" rx="300" ry="80" fill="#ffd9a0" opacity="0.08" filter="url(#bloom)"/>`,
    ),
  bedroom: () =>
    room(
      `${rect(560, 600, 480, 60, "#2a231b")}${rect(530, 660, 540, 110, "#d8cfbf")}${rect(530, 650, 540, 20, "#ece4d6")}
       ${rect(450, 670, 60, 70, "#120f0c")}${rect(1090, 670, 60, 70, "#120f0c")}
       <ellipse cx="480" cy="640" rx="40" ry="40" fill="#ffd9a0" opacity="0.4" filter="url(#bloom)"/><ellipse cx="1120" cy="640" rx="40" ry="40" fill="#ffd9a0" opacity="0.4" filter="url(#bloom)"/>`,
    ),
};

// ------------------------------------------------------------------ frame --
function defs() {
  return `<defs>
<linearGradient id="skyFull" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#07090e"/><stop offset="0.55" stop-color="#1a1d26"/><stop offset="0.85" stop-color="#4a3a2c"/><stop offset="1" stop-color="#6e5238"/></linearGradient>
<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2230"/><stop offset="0.7" stop-color="#5b4632"/><stop offset="1" stop-color="#8a6644"/></linearGradient>
<linearGradient id="warm" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe2b0"/><stop offset="1" stop-color="#d99a52"/></linearGradient>
<linearGradient id="warmDim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b58a55"/><stop offset="1" stop-color="#6e4f2c"/></linearGradient>
<linearGradient id="groundG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0c0b0a"/><stop offset="1" stop-color="#030303"/></linearGradient>
<linearGradient id="poolFade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1418" stop-opacity="0"/><stop offset="1" stop-color="#05080a" stop-opacity="0.9"/></linearGradient>
<linearGradient id="wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d1813"/><stop offset="1" stop-color="#2c241b"/></linearGradient>
<linearGradient id="floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2b2219"/><stop offset="1" stop-color="#0d0a07"/></linearGradient>
<radialGradient id="horizonGlow" cx="0.55" cy="0.78" r="0.6"><stop offset="0" stop-color="#d79a5c" stop-opacity="0.35"/><stop offset="1" stop-color="#d79a5c" stop-opacity="0"/></radialGradient>
<filter id="bloom" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
<filter id="soft"><feGaussianBlur stdDeviation="3"/></filter>
<radialGradient id="vignette" cx="0.5" cy="0.5" r="0.75"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.65"/></radialGradient>
</defs>`;
}

function exterior(house, { trees = [], poolAt = null, lights = [] } = {}) {
  let s = `<rect width="1600" height="1000" fill="url(#skyFull)"/><rect width="1600" height="1000" fill="url(#horizonGlow)"/>`;
  s += `<path d="M0 ${GROUND - 40} Q300 ${GROUND - 90} 600 ${GROUND - 55} T1200 ${GROUND - 70} T1600 ${GROUND - 45} V${GROUND} H0 Z" fill="#0a0b0c"/>`;
  s += trees.map(([x, h]) => tree(x, h)).join("");
  s += house;
  s += rect(0, GROUND, 1600, 1000 - GROUND, "url(#groundG)");
  if (poolAt) s += pool(poolAt[0], poolAt[1], house);
  s += pathLights(lights);
  return s;
}

function svg({ body, file, w = 1600, h = 1000 }) {
  const scale = Math.max(w / 1600, h / 1000);
  const tx = (w - 1600 * scale) / 2;
  const ty = (h - 1000 * scale) / 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img">
${defs()}
<rect width="${w}" height="${h}" fill="#050505"/>
<g transform="translate(${tx} ${ty}) scale(${scale})">${body}</g>
<rect width="${w}" height="${h}" fill="url(#vignette)"/>
<text x="${w - 28}" y="${h - 26}" text-anchor="end" font-family="Helvetica, Arial, sans-serif" font-size="12" letter-spacing="3" fill="#f8f8f6" fill-opacity="0.45">PLACEHOLDER · ${file.replace(".svg", "").toUpperCase()}</text>
</svg>
`;
}

const files = {
  "hero.svg": {
    body: exterior(modernHouse(), {
      trees: [
        [180, 300],
        [1460, 260],
      ],
      poolAt: [300, 1000],
      lights: [],
    }),
    w: 2400,
    h: 1350,
  },
  "hero-2.svg": {
    body: exterior(customHouse(), {
      trees: [
        [260, 260],
        [1480, 300],
      ],
      lights: [520, 640, 960, 1080],
    }),
    w: 2400,
    h: 1350,
  },
  "hero-3.svg": {
    body: exterior(farmhouse(), {
      trees: [
        [230, 280],
        [1350, 240],
        [1470, 200],
      ],
      lights: [700, 820, 940],
    }),
    w: 2400,
    h: 1350,
  },
  "custom-home.svg": {
    body: exterior(customHouse(), {
      trees: [
        [260, 240],
        [360, 170],
      ],
      lights: [560, 700, 900, 1040],
    }),
  },
  "modern-home.svg": { body: exterior(modernHouse(), { trees: [[1460, 240]], poolAt: [320, 960] }) },
  "new-construction.svg": {
    body: exterior(townhomes(), {
      trees: [
        [210, 210],
        [1400, 190],
      ],
      lights: [420, 620, 820, 1020, 1220],
    }),
  },
  "two-family.svg": {
    body: exterior(twoFamily(), {
      trees: [
        [400, 240],
        [1200, 200],
      ],
      lights: [690, 910],
    }),
  },
  "dormer.svg": {
    body: exterior(dormerHouse(), {
      trees: [
        [290, 240],
        [1330, 260],
      ],
      lights: [700, 900],
    }),
  },
  "dormer-video.svg": {
    body:
      exterior(dormerHouse(), {
        trees: [
          [290, 240],
          [1330, 260],
        ],
      }) +
      `<circle cx="800" cy="500" r="74" fill="#000" fill-opacity="0.55" stroke="#f8f8f6" stroke-opacity="0.8" stroke-width="1.5"/><path d="M780 462 L836 500 L780 538 Z" fill="#f8f8f6"/>`,
  },
  "spec-home.svg": {
    body: exterior(farmhouse(), {
      trees: [
        [1300, 240],
        [1420, 190],
      ],
      lights: [720, 860, 1000],
    }),
  },
  "spec-home-2.svg": {
    body: exterior(shingle(), {
      trees: [
        [330, 240],
        [1290, 210],
      ],
      lights: [600, 800, 1000],
    }),
  },
  "renovation.svg": { body: interiors.living() },
  "kitchen.svg": { body: interiors.kitchen() },
  "bath.svg": { body: interiors.bath() },
  "interior.svg": { body: interiors.bedroom() },
  "design-consulting.svg": { body: interiors.kitchen() },
  "story.svg": { body: interiors.living(), w: 1200, h: 1500 },
};

for (const [file, opts] of Object.entries(files)) {
  writeFileSync(join(OUT, file), svg({ file, ...opts }));
}
console.log(`Wrote ${Object.keys(files).length} placeholders to ${OUT}`);
