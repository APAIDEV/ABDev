import type { MetadataRoute } from "next";
import { business } from "@/config/business";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: "AB Development",
    description: business.description,
    start_url: "/",
    display: "browser",
    background_color: "#000000",
    theme_color: "#000000",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
