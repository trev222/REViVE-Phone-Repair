import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { servicePages } from "@/lib/service-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/about",
    "/services",
    "/locations",
    "/contact",
    "/blog",
    ...servicePages.map(({ slug }) => `/services/${slug}`),
  ].map((path) => ({
    url: new URL(path, site.url).href,
  }));
}
