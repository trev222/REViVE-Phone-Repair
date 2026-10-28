import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";
import { ContactForm } from "@/components/contact-form";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <>
      <PageTitle>Contact Us</PageTitle>
      <section className="hours">
        <h2>Hours</h2>
        <p>MONDAY – FRIDAY: 9AM – 6PM</p>
        <p>SATURDAY: 10AM – 4PM</p>
        <p>SUNDAY: CLOSED</p>
      </section>
      <section className="contact-info">
        <h2>Covington</h2>
        <p><a href={site.phoneHref}>{site.phone}</a></p>
        <p><a href={`mailto:${site.email}`}>{site.email}</a></p>
      </section>
      <ContactForm />
    </>
  );
}
