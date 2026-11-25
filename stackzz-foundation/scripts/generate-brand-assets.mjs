/**
 * BRAND ASSETS
 * ----------------------------------------------------------------------------
 * Builds every logo file the site uses from the official logo artwork in
 * /brand-source/logo-original.png (ivory and pink on deep burgundy).
 *
 * The artwork itself is never redrawn. The script only removes the background
 * so the same logo can sit on any section, and makes a burgundy version of the
 * ivory lettering for light backgrounds:
 *
 *   public/brand/logo-light.png    full logo, ivory + pink  (for dark sections)
 *   public/brand/logo-dark.png     full logo, burgundy + rose (for light sections)
 *   public/brand/roof-light.png    roof mark only, ivory
 *   public/brand/roof-dark.png     roof mark only, burgundy
 *   src/app/icon.png               favicon (roof on burgundy)
 *   src/app/apple-icon.png         home screen icon
 *   public/og/default.jpg          1200x630 social sharing image
 *
 * Runs automatically before every build. To refresh by hand: npm run brand
 * If the official logo is ever updated, replace brand-source/logo-original.png
 * with the new file (same layout) and rebuild.
 */
import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const SOURCE = join(root, "brand-source/logo-original.png");
const BRAND = join(root, "public/brand");
const OG = join(root, "public/og");
const APP = join(root, "src/app");
mkdirSync(BRAND, { recursive: true });
mkdirSync(OG, { recursive: true });

const BURGUNDY = [0x45, 0x0b, 0x1c];
const ROSE = [0xc8, 0x79, 0x89];
const IVORY = [0xff, 0xf5, 0xe9];

const { data, info } = await sharp(SOURCE).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;

/** Average of the four corners: the artwork's background colour. */
const bg = [0, 1, 2].map((c) => {
  const at = (x, y) => data[(y * width + x) * 3 + c];
  return Math.round((at(4, 4) + at(width - 5, 4) + at(4, height - 5) + at(width - 5, height - 5)) / 4);
});

/**
 * Colour-to-alpha: turns the background transparent while keeping the
 * anti-aliased edges of the lettering smooth.
 */
function toTransparent(recolor) {
  const out = Buffer.alloc(width * height * 4);
  for (let i = 0, j = 0; i < data.length; i += 3, j += 4) {
    let a = 0;
    // The artwork is always lighter than its background, so only lighter pixels count.
    for (let c = 0; c < 3; c++) a = Math.max(a, Math.max(0, data[i + c] - bg[c]) / (255 - bg[c]));
    // Ignore the faint texture in the original background.
    a = a < 0.05 ? 0 : Math.min(1, (a - 0.05) / 0.9);
    if (a === 0) continue;
    const rgb = [0, 1, 2].map((c) => Math.max(0, Math.min(255, bg[c] + (data[i + c] - bg[c]) / Math.max(a, 0.001))));
    const [r, g, b] = recolor(rgb);
    out[j] = r;
    out[j + 1] = g;
    out[j + 2] = b;
    out[j + 3] = Math.round(a * 255);
  }
  return sharp(out, { raw: { width, height, channels: 4 } });
}

/** 0 for the pink accents (the "4" and the heart), 1 for the ivory lettering. */
const ivoryness = ([r, g]) => Math.max(0, Math.min(1, (g / Math.max(r, 1) - 0.62) / 0.3));
const mix = (a, b, t) => a.map((v, i) => Math.round(v * (1 - t) + b[i] * t));

const lightOn = () => toTransparent((rgb) => mix(ROSE, IVORY, ivoryness(rgb)));
const darkOn = () => toTransparent((rgb) => mix(ROSE, BURGUNDY, ivoryness(rgb)));

/** Bounding box of the artwork (found from the source so it adapts to a new file). */
function inkBox(y0 = 0, y1 = height) {
  let minX = width,
    maxX = -1,
    minY = height,
    maxY = -1;
  for (let y = y0; y < y1; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 3;
      const d = Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]);
      if (d > 90) {
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y);
      }
    }
  }
  return { minX, maxX, minY, maxY };
}

/** Vertical runs of rows that contain artwork: roof, wordmark, FOUNDATION, heart. */
function rowRuns() {
  const runs = [];
  let start = -1;
  for (let y = 0; y < height; y++) {
    let ink = false;
    for (let x = 0; x < width && !ink; x++) {
      const i = (y * width + x) * 3;
      ink = Math.abs(data[i] - bg[0]) + Math.abs(data[i + 1] - bg[1]) + Math.abs(data[i + 2] - bg[2]) > 90;
    }
    if (ink && start < 0) start = y;
    if (!ink && start >= 0) {
      runs.push([start, y - 1]);
      start = -1;
    }
  }
  return runs;
}

const pad = 6;
const all = inkBox();
const full = {
  left: Math.max(0, all.minX - pad),
  top: Math.max(0, all.minY - pad),
  width: Math.min(width, all.maxX + pad) - Math.max(0, all.minX - pad),
  height: Math.min(height, all.maxY + pad) - Math.max(0, all.minY - pad),
};
const roofRun = rowRuns()[0];
const roofInk = inkBox(roofRun[0], roofRun[1] + 1);
const roof = {
  left: roofInk.minX - pad,
  top: roofInk.minY - pad,
  width: roofInk.maxX - roofInk.minX + pad * 2,
  height: roofInk.maxY - roofInk.minY + pad * 2,
};

const save = async (img, region, file) => {
  const buf = await img.png().toBuffer();
  await sharp(buf).extract(region).png({ compressionLevel: 9 }).toFile(file);
};

await save(lightOn(), full, join(BRAND, "logo-light.png"));
await save(darkOn(), full, join(BRAND, "logo-dark.png"));
await save(lightOn(), roof, join(BRAND, "roof-light.png"));
await save(darkOn(), roof, join(BRAND, "roof-dark.png"));

const roofLight = await sharp(join(BRAND, "roof-light.png")).toBuffer();
const burgundyHex = `#${BURGUNDY.map((v) => v.toString(16).padStart(2, "0")).join("")}`;

async function icon(size, file, inset) {
  const mark = await sharp(roofLight)
    .resize({ width: Math.round(size * (1 - inset * 2)), fit: "inside" })
    .toBuffer();
  const meta = await sharp(mark).metadata();
  await sharp({ create: { width: size, height: size, channels: 4, background: burgundyHex } })
    .composite([{ input: mark, left: Math.round((size - meta.width) / 2), top: Math.round((size - meta.height) / 2) }])
    .png()
    .toFile(file);
}
await icon(512, join(APP, "icon.png"), 0.1);
await icon(180, join(APP, "apple-icon.png"), 0.14);

const logoLight = await sharp(join(BRAND, "logo-light.png")).resize({ width: 640 }).toBuffer();
const logoMeta = await sharp(logoLight).metadata();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: burgundyHex } })
  .composite([
    { input: logoLight, left: Math.round((1200 - logoMeta.width) / 2), top: Math.round((630 - logoMeta.height) / 2) },
  ])
  .jpeg({ quality: 90 })
  .toFile(join(OG, "default.jpg"));

console.log("brand: logo, roof mark, icons and social image generated");
