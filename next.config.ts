import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    const routes = ["index", "about", "services", "location", "locations", "contact"];
    return routes.flatMap((route) => {
      const destination = route === "index" ? "/" : route === "location" ? "/locations" : `/${route}`;
      const sources = [`/${route}.php`, `/${route}.html`];
      if (route === "index" || route === "location") sources.push(`/${route}`);
      return sources.map((source) => ({ source, destination, permanent: true }));
    });
  },
};

export default nextConfig;
