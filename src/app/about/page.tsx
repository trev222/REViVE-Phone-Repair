import type { Metadata } from "next";
import { PageTitle } from "@/components/page-title";

export const metadata: Metadata = { title: "About", alternates: { canonical: "/about" } };

export default function AboutPage() {
  return (
    <>
      <PageTitle>About Us</PageTitle>
      <section className="about-content">
        <h2>Mission</h2>
        <p>Our mission at Revive has always been simple:</p>
        <p>To be the best at all device-related repairs.</p>
        <p>We pride ourselves on having the best prices, outstanding customer service, <strong>unrivaled integrity</strong> and the highest quality parts available. However, we don’t stop there; we are aware of the stress that arises from being without your smart device, so you can count on Revive to provide you with the fastest and most reliable service.</p>
        <p>“If you want your phone to thrive, bring it to REViVE”</p>
      </section>
    </>
  );
}
