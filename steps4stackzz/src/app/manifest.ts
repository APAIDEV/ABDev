import type { MetadataRoute } from "next";
import { foundation } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: foundation.name,
    short_name: foundation.shortName,
    description: foundation.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff5e9",
    theme_color: "#450b1c",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
