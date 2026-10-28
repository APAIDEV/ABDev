/**
 * Generates the on-brand placeholder illustrations in /public/images/placeholders.
 * These are temporary stand-ins until real project photos are uploaded.
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

const GOLD = "#B89B6A";
const LINE = `fill="none" stroke="${GOLD}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"`;
const FAINT = `fill="none" stroke="#F8F8F6" stroke-opacity="0.22" stroke-width="1.1"`;
const GROUND = 770;

const rect = (x, y, w, h, a = LINE) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" ${a}/>`;
const line = (x1, y1, x2, y2, a = LINE) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" ${a}/>`;
const poly = (pts, a = LINE) => `<polyline points="${pts.map((p) => p.join(",")).join(" ")}" ${a}/>`;

function win(x, y, w, h, cols = 2, rows = 2) {
  let s = rect(x, y, w, h);
  for (let c = 1; c < cols; c++) s += line(x + (w * c) / cols, y, x + (w * c) / cols, y + h, FAINT);
  for (let r = 1; r < rows; r++) s += line(x, y + (h * r) / rows, x + w, y + (h * r) / rows, FAINT);
  return s;
}

function groundLine() {
  return line(120, GROUND, 1480, GROUND, `stroke="${GOLD}" stroke-opacity="0.6" stroke-width="1.2"`);
}

function tree(x, h = 160) {
  return (
    line(x, GROUND, x, GROUND - h * 0.35, FAINT) +
    `<ellipse cx="${x}" cy="${GROUND - h * 0.62}" rx="${h * 0.24}" ry="${h * 0.38}" ${FAINT}/>`
  );
}

// ---------------------------------------------------------------- drawings --
const drawings = {
  customHome() {
    let s = poly([
      [470, 440],
      [800, 250],
      [1130, 440],
    ]);
    s += rect(500, 440, 600, GROUND - 440);
    s += rect(950, 290, 44, 90);
    for (let i = 0; i < 4; i++) s += win(540 + i * 140, 480, 78, 100);
    for (const i of [0, 1, 3]) s += win(540 + i * 140, 625, 78, 110);
    s += rect(765, 625, 70, GROUND - 625) + `<path d="M765 625 a35 35 0 0 1 70 0" ${LINE}/>`;
    s +=
      poly([
        [1100, 560],
        [1240, 500],
        [1380, 560],
      ]) + rect(1110, 560, 260, GROUND - 560);
    s += rect(1150, 610, 180, GROUND - 610, FAINT);
    for (let i = 1; i < 5; i++) s += line(1150, 610 + i * 32, 1330, 610 + i * 32, FAINT);
    s += `<circle cx="800" cy="372" r="26" ${FAINT}/>`;
    return s + tree(300, 220) + tree(390, 150) + groundLine();
  },
  modernHome() {
    let s = rect(360, 560, 860, GROUND - 560) + rect(560, 400, 760, 160);
    s += line(330, 560, 1250, 560) + line(530, 400, 1350, 400);
    for (let i = 0; i < 9; i++) s += line(600 + i * 84, 400, 600 + i * 84, 560, FAINT);
    for (let i = 0; i < 6; i++) s += rect(400 + i * 110, 590, 90, GROUND - 610, FAINT);
    s += rect(1080, 600, 100, GROUND - 600);
    s += rect(300, GROUND - 14, 1000, 14, FAINT);
    return s + tree(1420, 200) + groundLine();
  },
  townhomes() {
    let s = "";
    const heights = [400, 380, 420, 390, 410];
    heights.forEach((top, i) => {
      const x = 300 + i * 200;
      s += rect(x, top, 200, GROUND - top) + rect(x - 6, top - 14, 212, 14, FAINT);
      for (let r = 0; r < 3; r++)
        for (let c = 0; c < 2; c++) s += win(x + 30 + c * 90, top + 40 + r * 95, 50, 70, 1, 2);
      s +=
        rect(x + 120, GROUND - 90, 50, 90) +
        poly(
          [
            [x + 100, GROUND],
            [x + 100, GROUND - 20],
            [x + 190, GROUND - 20],
          ],
          FAINT,
        );
    });
    return s + tree(220, 180) + groundLine();
  },
  twoFamily() {
    let s =
      poly([
        [540, 380],
        [800, 230],
        [1060, 380],
      ]) + rect(560, 380, 480, GROUND - 380);
    s += line(800, 380, 800, GROUND, FAINT);
    for (const x of [600, 860]) for (const y of [420, 560]) s += win(x, y, 140, 100, 3, 2);
    s += rect(660, GROUND - 100, 60, 100) + rect(880, GROUND - 100, 60, 100);
    s += win(760, 290, 80, 60, 2, 1);
    return s + tree(420, 200) + tree(1180, 170) + groundLine();
  },
  dormer() {
    let s =
      rect(430, 560, 740, GROUND - 560) +
      poly([
        [400, 560],
        [800, 320],
        [1200, 560],
      ]);
    s +=
      poly([
        [560, 560],
        [560, 410],
        [1040, 410],
        [1040, 560],
      ]) + line(540, 410, 800, 330);
    for (let i = 0; i < 4; i++) s += win(590 + i * 112, 440, 80, 84, 2, 1);
    s += win(480, 610, 110, 110) + win(1010, 610, 110, 110);
    s += rect(760, 620, 80, GROUND - 620) + rect(700, GROUND - 10, 200, 10, FAINT);
    return s + tree(300, 200) + tree(1330, 230) + groundLine();
  },
  specHome() {
    let s =
      poly([
        [620, 430],
        [860, 220],
        [1100, 430],
      ]) + rect(650, 430, 420, GROUND - 430);
    for (let i = 1; i < 14; i++)
      s += line(650 + i * 30, 430, 650 + i * 30, GROUND, `stroke="#F8F8F6" stroke-opacity="0.08"`);
    s += win(760, 300, 200, 110, 3, 1) + win(690, 470, 140, 120, 2, 2) + win(890, 470, 140, 120, 2, 2);
    s += rect(820, 640, 80, GROUND - 640);
    s +=
      poly([
        [380, 560],
        [520, 450],
        [660, 560],
      ]) +
      rect(400, 560, 250, GROUND - 560) +
      win(440, 610, 170, 100, 3, 1);
    s += line(640, 620, 1100, 620) + line(660, 620, 660, GROUND, FAINT) + line(1080, 620, 1080, GROUND, FAINT);
    return s + tree(1260, 220) + groundLine();
  },
  specHome2() {
    let s =
      poly([
        [460, 470],
        [560, 330],
        [1040, 330],
        [1140, 470],
      ]) + rect(480, 470, 640, GROUND - 470);
    s +=
      poly([
        [700, 330],
        [800, 240],
        [900, 330],
      ]) + win(760, 270, 80, 50, 2, 1);
    for (let i = 0; i < 4; i++) s += win(530 + i * 145, 500, 90, 90, 2, 2);
    s += line(440, 620, 1160, 620) + line(440, 640, 1160, 640, FAINT);
    for (let i = 0; i < 8; i++) s += line(460 + i * 98, 640, 460 + i * 98, GROUND, FAINT);
    s += rect(770, 660, 60, GROUND - 660);
    return s + tree(330, 220) + tree(1300, 180) + groundLine();
  },
  room({ window: w = true } = {}) {
    // one-point perspective: back wall + floor/ceiling lines
    let s = rect(560, 300, 480, 340);
    s += line(160, 100, 560, 300, FAINT) + line(1440, 100, 1040, 300, FAINT);
    s += line(160, 900, 560, 640, FAINT) + line(1440, 900, 1040, 640, FAINT);
    for (let i = 1; i < 6; i++)
      s += line(560 + (480 * i) / 6, 640, 160 + (1280 * i) / 6, 900, `stroke="#F8F8F6" stroke-opacity="0.07"`);
    if (w) s += win(690, 340, 220, 220, 2, 3);
    return s;
  },
  interior() {
    let s = drawings.room();
    s +=
      poly([
        [620, 560],
        [620, 520],
        [980, 520],
        [980, 560],
      ]) +
      rect(600, 560, 400, 80) +
      rect(560, 600, 480, 90);
    s += rect(500, 610, 50, 60, FAINT) + rect(1050, 610, 50, 60, FAINT);
    return s;
  },
  renovation() {
    let s = drawings.room({ window: false });
    for (let i = 0; i < 3; i++) s += win(600 + i * 140, 320, 110, 260, 1, 4);
    s += rect(580, 610, 440, 60) + rect(600, 560, 400, 50, FAINT) + rect(700, 700, 200, 40, FAINT);
    return s;
  },
  kitchen() {
    let s = drawings.room({ window: false });
    s += win(560, 310, 480, 90, 6, 1) + win(720, 420, 160, 120, 2, 2);
    s += rect(560, 560, 480, 80, FAINT);
    s += rect(620, 650, 360, 110) + line(600, 650, 1000, 650);
    for (const x of [690, 800, 910])
      s += line(x, 100, x, 230, FAINT) + `<path d="M${x - 24} 254 a24 24 0 0 1 48 0 z" ${LINE}/>`;
    return s;
  },
  bath() {
    let s = drawings.room({ window: false });
    s += win(700, 330, 200, 200, 1, 2);
    s +=
      `<path d="M600 610 Q600 700 700 700 L900 700 Q1000 700 1000 610 Z" ${LINE}/>` +
      `<ellipse cx="800" cy="610" rx="200" ry="22" ${FAINT}/>`;
    s += line(1010, 560, 1010, 610) + `<path d="M1010 560 q0 -20 -24 -20" ${LINE}/>`;
    return s;
  },
  floorPlan() {
    const W = `fill="none" stroke="${GOLD}" stroke-width="5"`;
    let s = rect(380, 220, 840, 560, W);
    s +=
      line(760, 220, 760, 560, W) +
      line(380, 560, 960, 560, W) +
      line(960, 420, 960, 780, W) +
      line(960, 420, 1220, 420, W);
    for (const [, , , a] of [
      [760, 600, 60, "M760 600 l0 -60 a60 60 0 0 1 60 60"],
      [960, 470, 50, "M960 470 l50 0 a50 50 0 0 1 -50 50"],
    ])
      s += `<path d="${a}" ${FAINT}/>`;
    s += rect(420, 260, 300, 260, FAINT) + rect(800, 260, 380, 120, FAINT) + win(1000, 460, 180, 280, 3, 4);
    s += line(380, 840, 1220, 840, FAINT) + line(380, 830, 380, 850, FAINT) + line(1220, 830, 1220, 850, FAINT);
    s += line(1280, 220, 1280, 780, FAINT) + line(1270, 220, 1290, 220, FAINT) + line(1270, 780, 1290, 780, FAINT);
    const label = (x, y, t) =>
      `<text x="${x}" y="${y}" fill="#F8F8F6" fill-opacity="0.45" font-family="Helvetica, Arial, sans-serif" font-size="18" letter-spacing="6">${t}</text>`;
    return (
      s + label(480, 400, "LIVING") + label(880, 330, "KITCHEN") + label(520, 680, "DINING") + label(1030, 380, "STUDY")
    );
  },
  story() {
    let s = `<defs><radialGradient id="glow" cx="50%" cy="55%" r="55%"><stop offset="0" stop-color="#E7C98F" stop-opacity="0.55"/><stop offset="1" stop-color="#E7C98F" stop-opacity="0"/></radialGradient></defs>`;
    s += `<rect x="560" y="200" width="480" height="600" fill="url(#glow)"/>`;
    s +=
      rect(560, 200, 480, 600) + rect(580, 220, 440, 560, FAINT) + line(800, 220, 800, 780) + line(580, 500, 1020, 500);
    s += rect(530, 800, 540, 24) + `<path d="M560 200 a240 120 0 0 1 480 0" ${LINE}/>`;
    return s;
  },
  play() {
    return `<circle cx="800" cy="500" r="74" fill="#000" fill-opacity="0.55" stroke="${GOLD}" stroke-width="1.6"/><path d="M780 462 L836 500 L780 538 Z" fill="${GOLD}"/>`;
  },
};

// ------------------------------------------------------------------ frame --
function svg({ body, file, w = 1600, h = 1000, label = true }) {
  const grid = [];
  for (let x = 0; x <= w; x += 80) grid.push(`M${x} 0V${h}`);
  for (let y = 0; y <= h; y += 80) grid.push(`M0 ${y}H${w}`);
  const scale = Math.min(w / 1600, h / 1000);
  const tx = (w - 1600 * scale) / 2;
  const ty = (h - 1000 * scale) / 2;
  const caption = label
    ? `<g font-family="Helvetica, Arial, sans-serif" fill="#F8F8F6"><text x="${w / 2}" y="${h - 76}" text-anchor="middle" font-size="15" letter-spacing="5" fill-opacity="0.75">PLACEHOLDER IMAGE</text><text x="${w / 2}" y="${h - 50}" text-anchor="middle" font-size="13" letter-spacing="1.5" fill-opacity="0.45">Replace /images/placeholders/${file}</text></g>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="xMidYMid slice" role="img">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1A1A19"/><stop offset="1" stop-color="#050505"/></linearGradient></defs>
<rect width="${w}" height="${h}" fill="url(#bg)"/>
<path d="${grid.join("")}" stroke="#F8F8F6" stroke-opacity="0.035" stroke-width="1"/>
<g transform="translate(${tx} ${ty}) scale(${scale})">${body}</g>
${caption}
</svg>
`;
}

const files = {
  "hero.svg": { body: drawings.customHome() + `<circle cx="1320" cy="190" r="44" ${FAINT}/>`, w: 2400, h: 1350 },
  "custom-home.svg": { body: drawings.customHome() },
  "modern-home.svg": { body: drawings.modernHome() },
  "new-construction.svg": { body: drawings.townhomes() },
  "two-family.svg": { body: drawings.twoFamily() },
  "renovation.svg": { body: drawings.renovation() },
  "kitchen.svg": { body: drawings.kitchen() },
  "dormer.svg": { body: drawings.dormer() },
  "dormer-video.svg": { body: drawings.dormer() + drawings.play() },
  "spec-home.svg": { body: drawings.specHome() },
  "spec-home-2.svg": { body: drawings.specHome2() },
  "interior.svg": { body: drawings.interior() },
  "bath.svg": { body: drawings.bath() },
  "design-consulting.svg": { body: drawings.floorPlan() },
  "story.svg": { body: drawings.story(), w: 1200, h: 1500 },
};

for (const [file, opts] of Object.entries(files)) {
  writeFileSync(join(OUT, file), svg({ file, ...opts }));
}
console.log(`Wrote ${Object.keys(files).length} placeholders to ${OUT}`);
