import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "REViVE Phone Repair", short_name: "REViVE", start_url: "/", display: "standalone",
    background_color: "#ffffff", theme_color: "#8cc63e",
    icons: [ { src: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" } ],
  };
}
