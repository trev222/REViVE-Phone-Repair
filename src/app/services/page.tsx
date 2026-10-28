import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";
import { services } from "@/lib/site";

export const metadata: Metadata = { title: "Services", alternates: { canonical: "/services" } };

export default function ServicesPage() {
  return (
    <>
      <PageTitle>Revive Services</PageTitle>
      <div className="services-grid">
        {services.map(({ title, description }) => <section key={title}><h2>{title}</h2><p>{description}</p></section>)}
      </div>
    </>
  );
}
