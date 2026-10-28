import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata = pageMetadata(
  "Covington Phone Repair Shop: Hours & Directions",
  "Visit REViVE at 70515 Highway 21 Unit 8, Covington, LA 70433. Find shop hours, directions, and contact details for phone repair and buyback.",
  "/locations",
);

export default function LocationsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 lg:px-12">
      <h1 className="text-5xl tracking-[-0.02em] sm:text-6xl">
        Visit us in Covington.
      </h1>
      <div className="mt-12 grid gap-4 lg:grid-cols-2">
        <section className="flex flex-col items-start justify-center rounded-[32px] bg-primary p-8 md:p-12">
          <h2 className="text-4xl">Your local phone repair team.</h2>
          <address className="mt-6 text-lg not-italic leading-8">
            <a href={site.mapsUrl}>{site.address}</a>
          </address>
          <p className="mt-4 leading-7">
            Monday–Friday: 10 am–5 pm
            <br />
            Saturday: 10 am–3 pm
            <br />
            Sunday: Closed
          </p>
          <a href={site.phoneHref} className="mt-6 underline">
            {site.phone}
          </a>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <a
              href={site.mapsUrl}
              className="rounded-full bg-accent px-6 py-4 font-medium text-accent-foreground"
            >
              Get directions
            </a>
            <Link href="/contact" className="font-medium underline">
              Get a quote
            </Link>
          </div>
        </section>
        <section
          className="flex min-w-0 flex-col overflow-hidden rounded-[32px] border border-border bg-card"
          aria-labelledby="location-map-heading"
        >
          <div className="px-8 py-6">
            <h2 id="location-map-heading" className="text-2xl">
              Find us on Google Maps.
            </h2>
          </div>
          <iframe
            className="min-h-[360px] w-full flex-1 border-0 sm:min-h-[450px]"
            title="Map of REViVE Phone Repair in Covington"
            src={site.mapsEmbed}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </section>
      </div>
    </div>
  );
}
