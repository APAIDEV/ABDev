/**
 * Stylized map of the service area: Long Island (Nassau & Suffolk), the five
 * NYC boroughs, and Westchester. Shapes are simplified outlines, not survey data.
 */

type LonLat = [number, number];

const W = 1000;
const H = 505;
const project = ([lon, lat]: LonLat) => [((lon + 74.3) * 400).toFixed(1), ((41.4 - lat) * 530).toFixed(1)].join(",");
const points = (coords: LonLat[]) => coords.map(project).join(" ");

const shapes: { name: string; region: "li" | "nyc" | "wc"; coords: LonLat[] }[] = [
  {
    name: "Westchester County",
    region: "wc",
    coords: [
      [-73.98, 41.32],
      [-73.95, 41.36],
      [-73.55, 41.36],
      [-73.52, 41.29],
      [-73.66, 41.0],
      [-73.78, 40.88],
      [-73.91, 40.91],
      [-73.92, 40.92],
    ],
  },
  {
    name: "The Bronx",
    region: "nyc",
    coords: [
      [-73.92, 40.91],
      [-73.81, 40.885],
      [-73.78, 40.84],
      [-73.79, 40.8],
      [-73.87, 40.795],
      [-73.93, 40.8],
      [-73.93, 40.86],
    ],
  },
  {
    name: "Manhattan",
    region: "nyc",
    coords: [
      [-74.02, 40.7],
      [-73.97, 40.71],
      [-73.94, 40.77],
      [-73.93, 40.8],
      [-73.91, 40.87],
      [-73.93, 40.88],
      [-74.01, 40.76],
    ],
  },
  {
    name: "Queens",
    region: "nyc",
    coords: [
      [-73.96, 40.74],
      [-73.89, 40.79],
      [-73.77, 40.8],
      [-73.7, 40.75],
      [-73.73, 40.6],
      [-73.94, 40.55],
      [-73.87, 40.65],
      [-73.92, 40.69],
    ],
  },
  {
    name: "Brooklyn",
    region: "nyc",
    coords: [
      [-73.95, 40.735],
      [-73.92, 40.69],
      [-73.86, 40.66],
      [-73.88, 40.58],
      [-74.01, 40.57],
      [-74.04, 40.61],
      [-74.02, 40.68],
      [-73.97, 40.71],
    ],
  },
  {
    name: "Staten Island",
    region: "nyc",
    coords: [
      [-74.07, 40.645],
      [-74.05, 40.6],
      [-74.13, 40.53],
      [-74.25, 40.5],
      [-74.24, 40.56],
      [-74.2, 40.63],
      [-74.12, 40.645],
    ],
  },
  {
    name: "Nassau County",
    region: "li",
    coords: [
      [-73.77, 40.8],
      [-73.7, 40.87],
      [-73.6, 40.9],
      [-73.42, 40.9],
      [-73.43, 40.65],
      [-73.47, 40.6],
      [-73.75, 40.59],
      [-73.73, 40.65],
      [-73.7, 40.75],
    ],
  },
  {
    name: "Suffolk County",
    region: "li",
    coords: [
      [-73.42, 40.9],
      [-73.15, 40.93],
      [-72.85, 40.97],
      [-72.55, 41.02],
      [-72.36, 41.1],
      [-72.29, 41.16],
      [-72.38, 41.08],
      [-72.55, 40.98],
      [-72.64, 40.93],
      [-72.5, 40.92],
      [-72.3, 41.0],
      [-72.1, 41.05],
      [-71.86, 41.07],
      [-71.95, 41.03],
      [-72.2, 40.93],
      [-72.5, 40.84],
      [-72.8, 40.76],
      [-73.1, 40.66],
      [-73.43, 40.65],
    ],
  },
];

const labels: { text: string; sub: string; at: LonLat; anchor: [number, number] }[] = [
  { text: "WESTCHESTER", sub: "Westchester County", at: [-73.75, 41.17], anchor: [370, 60] },
  { text: "NEW YORK CITY", sub: "All five boroughs", at: [-73.96, 40.7], anchor: [130, 450] },
  { text: "LONG ISLAND", sub: "Nassau & Suffolk", at: [-72.9, 40.85], anchor: [700, 420] },
];

export function ServiceAreaMap({ className = "" }: { className?: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-labelledby="map-title map-desc" className={className}>
      <title id="map-title">AB Development service area map</title>
      <desc id="map-desc">
        A stylized map showing Westchester County, the five boroughs of New York City (Manhattan, Brooklyn, Queens, the
        Bronx, and Staten Island), and Long Island (Nassau and Suffolk counties).
      </desc>
      <defs>
        <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="#f8f8f6" strokeOpacity="0.04" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#map-grid)" />
      {shapes.map((s) => (
        <polygon
          key={s.name}
          points={points(s.coords)}
          fill="#b89b6a"
          fillOpacity={s.region === "nyc" ? 0.32 : 0.2}
          stroke="#b89b6a"
          strokeWidth={1}
          strokeLinejoin="round"
        >
          <title>{s.name}</title>
        </polygon>
      ))}
      {labels.map((l) => {
        const [x, y] = project(l.at).split(",").map(Number);
        const [ax, ay] = l.anchor;
        return (
          <g key={l.text}>
            <circle cx={x} cy={y} r="3" fill="#d2bd96" />
            <line x1={x} y1={y} x2={ax} y2={ay - 22} stroke="#f8f8f6" strokeOpacity="0.35" strokeWidth="0.75" />
            <text
              x={ax}
              y={ay}
              fill="#f8f8f6"
              fontSize="15"
              letterSpacing="5"
              textAnchor="middle"
              fontFamily="var(--font-sans)"
            >
              {l.text}
            </text>
            <text
              x={ax}
              y={ay + 22}
              fill="#a8a49c"
              fontSize="12"
              letterSpacing="1.5"
              textAnchor="middle"
              fontFamily="var(--font-sans)"
            >
              {l.sub}
            </text>
          </g>
        );
      })}
      <g fill="#a8a49c" fontSize="10" letterSpacing="3" fontFamily="var(--font-sans)" opacity="0.7">
        <text x="540" y="205" textAnchor="middle">
          LONG ISLAND SOUND
        </text>
        <text x="420" y="485" textAnchor="middle">
          ATLANTIC OCEAN
        </text>
      </g>
    </svg>
  );
}
