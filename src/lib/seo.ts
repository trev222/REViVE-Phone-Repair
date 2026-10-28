import type { Metadata } from "next";
import { site } from "./site";

export const absoluteUrl = (path: string) => new URL(path, site.url).href;
export const businessId = absoluteUrl("/#business");

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  const fullTitle = `${title} | REViVE Phone Repair`;
  const url = absoluteUrl(path);
  const images = [
    {
      url: absoluteUrl("/images/phone-repair.jpg"),
      alt: "A technician repairing a smartphone",
    },
  ];
  return {
    title: { absolute: fullTitle },
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images,
    },
  };
}

export const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": businessId,
      name: site.name,
      url: absoluteUrl("/"),
      description:
        "Smartphone screen repair, battery and charging repair, water damage diagnostics, data recovery, and used phone buyback in Covington, Louisiana.",
      telephone: site.phone,
      email: site.email,
      image: [
        absoluteUrl("/images/phone-repair.jpg"),
        absoluteUrl("/css/img/location2.JPG"),
      ],
      logo: absoluteUrl("/images/revive-logo.png"),
      address: {
        "@type": "PostalAddress",
        streetAddress: "70515 Highway 21 Unit 8",
        addressLocality: "Covington",
        addressRegion: "LA",
        postalCode: "70433",
        addressCountry: "US",
      },
      hasMap: site.mapsUrl,
      areaServed: { "@type": "City", name: "Covington, Louisiana" },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "10:00",
          closes: "17:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "10:00",
          closes: "15:00",
        },
      ],
      sameAs: [
        "https://www.instagram.com/revivephonerepair/",
        "https://www.facebook.com/REViVEphonerepair",
      ],
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: absoluteUrl("/"),
      name: site.name,
      inLanguage: "en-US",
      publisher: { "@id": businessId },
    },
  ],
};
