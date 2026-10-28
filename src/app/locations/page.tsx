import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Covington Location",
  alternates: { canonical: "/locations" },
};

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
          <Link
            href="/contact"
            className="mt-8 rounded-full bg-accent px-6 py-4 font-medium text-accent-foreground"
          >
            Get a quote
          </Link>
        </section>
        <img
          className="min-h-[360px] rounded-[32px] object-cover"
          src="/css/img/location2.JPG"
          alt="REViVE Phone Repair’s Covington location"
          width={4032}
          height={3024}
        />
      </div>
      <iframe
        className="mt-8 h-[450px] w-full rounded-[32px] border-0"
        title="Map of REViVE Phone Repair in Covington"
        src={site.mapsEmbed}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
      <p className="mt-5">
        <a className="underline" href={site.mapsUrl}>
          Get directions to our Covington shop
        </a>
      </p>
    </div>
  );
}
