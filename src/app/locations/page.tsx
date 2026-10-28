import type { Metadata } from "next";
import Image from "next/image";
import { PageTitle } from "@/components/page-title";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Location", alternates: { canonical: "/locations" } };

export default function LocationsPage() {
  return (
    <>
      <PageTitle>Locations</PageTitle>
      <section className="location-content">
        <h2>Covington</h2>
        <address><a href={site.mapsUrl}>{site.address}</a></address>
        <iframe title="Map of REViVE Phone Repair in Covington" src={site.mapsEmbed} width={600} height={450}
          loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" />
        <p><a href={site.mapsUrl}>Get directions to our Covington shop</a></p>
      </section>
      <Image className="location-photo" src="/css/img/location2.JPG" alt="REViVE Phone Repair’s Covington location"
        width={4032} height={3024} sizes="(max-width: 820px) 100vw, 820px" />
    </>
  );
}
