/**
 * BRAND ASSETS
 * ----------------------------------------------------------------------------
 * Builds the favicon, app icons, trimmed header logo, and the 1200x630 social
 * preview image from /public/logo.jpeg (white linework on black).
 *
 * Runs automatically before every build (`npm run build`), so after you replace
 * /public/logo.jpeg with the real logo and deploy, every icon updates itself.
 * You can also run it by hand:  npm run brand
 *
 * If /public/logo.jpeg does not exist yet, a simple placeholder is created.
 */
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const LOGO = join(root, "public/logo.jpeg");
const BRAND_DIR = join(root, "public/brand");
const OG_DIR = join(root, "public/og");
const APP_DIR = join(root, "src/app");
mkdirSync(BRAND_DIR, { recursive: true });
mkdirSync(OG_DIR, { recursive: true });

async function createPlaceholderLogo() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900">
  <rect width="1200" height="900" fill="#000"/>
  <g fill="none" stroke="#fff" stroke-width="5" stroke-linecap="square" stroke-linejoin="miter">
    <path d="M560 150 L390 590 M560 150 L700 520 M455 420 L640 420"/>
    <path d="M600 150 L600 590 M600 150 L720 150 Q820 150 820 255 Q820 355 720 360 L600 360 M720 360 Q850 365 850 475 Q850 590 720 590 L600 590"/>
  </g>
  <text x="600" y="730" text-anchor="middle" fill="#fff" font-family="Inter, Helvetica, Arial, sans-serif" font-weight="200" font-size="54" letter-spacing="26">DEVELOPMENT</text>
</svg>`;
  await sharp(Buffer.from(svg)).jpeg({ quality: 92 }).toFile(LOGO);
  console.log("brand: created placeholder /public/logo.jpeg (replace with the real logo)");
}

/** Rows (top to bottom) that contain any light pixels, grouped into runs. */
async function inkRuns(buffer) {
  const { data, info } = await sharp(buffer).greyscale().raw().toBuffer({ resolveWithObject: true });
  const runs = [];
  let start = -1;
  for (let y = 0; y < info.height; y++) {
    let ink = false;
    for (let x = 0; x < info.width; x++) {
      if (data[y * info.width + x] > 90) {
        ink = true;
        break;
      }
    }
    if (ink && start < 0) start = y;
    if (!ink && start >= 0) {
      runs.push([start, y - 1]);
      start = -1;
    }
  }
  if (start >= 0) runs.push([start, info.height - 1]);
  return { runs, width: info.width, height: info.height };
}

function pad(img, { size, margin }) {
  return sharp(img)
    .resize(Math.round(size * (1 - margin * 2)), Math.round(size * (1 - margin * 2)), {
      fit: "contain",
      background: "#000",
    })
    .extend({
      top: Math.round(size * margin),
      bottom: Math.round(size * margin),
      left: Math.round(size * margin),
      right: Math.round(size * margin),
      background: "#000",
    })
    .flatten({ background: "#000" });
}

/** Minimal .ico writer that embeds PNG images (supported by all modern browsers). */
function toIco(pngs) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(pngs.length, 4);
  const dir = Buffer.alloc(16 * pngs.length);
  let offset = 6 + dir.length;
  pngs.forEach(({ size, buf }, i) => {
    const o = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, o);
    dir.writeUInt8(size >= 256 ? 0 : size, o + 1);
    dir.writeUInt8(0, o + 2);
    dir.writeUInt8(0, o + 3);
    dir.writeUInt16LE(1, o + 4);
    dir.writeUInt16LE(32, o + 6);
    dir.writeUInt32LE(buf.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += buf.length;
  });
  return Buffer.concat([header, dir, ...pngs.map((p) => p.buf)]);
}

async function main() {
  if (!existsSync(LOGO)) await createPlaceholderLogo();

  // 1. Trim black margins for a crisp header/footer logo.
  const trimmed = await sharp(LOGO)
    .flatten({ background: "#000" })
    .trim({ background: "#000", threshold: 40 })
    .toBuffer();
  const meta = await sharp(trimmed).metadata();
  const logoPad = Math.round(Math.max(meta.width, meta.height) * 0.04);
  await sharp(trimmed)
    .extend({ top: logoPad, bottom: logoPad, left: logoPad, right: logoPad, background: "#000" })
    .resize({ height: 360, withoutEnlargement: true })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(join(BRAND_DIR, "logo.jpg"));
  const finalLogo = await sharp(join(BRAND_DIR, "logo.jpg")).metadata();

  // 2. Find the AB monogram: everything above the "DEVELOPMENT" wordmark.
  const { runs, width, height } = await inkRuns(trimmed);
  let monoBottom = height - 1;
  if (runs.length >= 2) {
    // The wordmark is the last run of ink rows; the monogram ends at the gap before it.
    let gapIndex = runs.length - 1;
    let widest = 0;
    for (let i = 1; i < runs.length; i++) {
      const gap = runs[i][0] - runs[i - 1][1];
      if (gap > widest) {
        widest = gap;
        gapIndex = i;
      }
    }
    monoBottom = runs[gapIndex - 1][1];
  }
  const monogram = await sharp(trimmed)
    .extract({ left: 0, top: 0, width, height: Math.max(1, monoBottom + 1) })
    .trim({ background: "#000", threshold: 40 })
    .toBuffer();

  await pad(monogram, { size: 512, margin: 0.14 }).png().toFile(join(BRAND_DIR, "monogram.png"));
  await pad(monogram, { size: 512, margin: 0.14 }).png().toFile(join(APP_DIR, "icon.png"));
  await pad(monogram, { size: 180, margin: 0.16 }).png().toFile(join(APP_DIR, "apple-icon.png"));
  const icoSizes = [16, 32, 48];
  const icoPngs = await Promise.all(
    icoSizes.map(async (size) => ({
      size,
      buf: await sharp(await pad(monogram, { size, margin: 0.08 }).png().toBuffer())
        .ensureAlpha()
        .png()
        .toBuffer(),
    })),
  );
  writeFileSync(join(APP_DIR, "favicon.ico"), toIco(icoPngs));

  // 3. Social preview: full logo centered on black, 1200x630.
  const ogLogo = await sharp(trimmed).resize({ width: 640, height: 400, fit: "inside" }).toBuffer();
  await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#000" } })
    .composite([{ input: ogLogo, gravity: "center" }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(join(OG_DIR, "default.jpg"));

  // 4. Record the header logo's dimensions so the layout never shifts.
  writeFileSync(
    join(root, "src/config/logo.generated.json"),
    JSON.stringify({ src: "/brand/logo.jpg", width: finalLogo.width, height: finalLogo.height }, null, 2) + "\n",
  );

  console.log("brand: generated favicon, icons, header logo, and social preview image");
}

main().catch((err) => {
  console.error("brand: failed to generate assets:", err.message);
  // Never block a deploy over icons: the previously committed assets remain.
  process.exit(0);
});
