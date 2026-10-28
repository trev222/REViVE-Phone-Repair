import type { Metadata } from "next";
import Image from "next/image";
import { Slideshow } from "@/components/slideshow";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function HomePage() {
  return (
    <>
      <div className="social-links" aria-label="Follow REViVE">
        <a href="https://www.facebook.com/REViVEphonerepair" aria-label="REViVE on Facebook">
          <Image src="/css/img/facebook-blue-trans.png" alt="Facebook" width={120} height={120} />
        </a>
        <a href="https://www.instagram.com/revivephonerepair/" aria-label="REViVE on Instagram">
          <Image src="/css/img/instagram.jpg" alt="Instagram" width={120} height={120} />
        </a>
      </div>
      <Slideshow />
      <div className="service-banner"><h1>Quick and Reliable Service</h1></div>
      <div className="feature-grid">
        <section><h2>Services</h2><p>Most repairs can be done while you wait. The average repair time for most iPhones is about 30 minutes.</p></section>
        <section><h2>Warranty</h2><p>Every product and service is covered for 1 year. If something goes wrong on our end, bring it back and we’ll replace it free of charge.</p></section>
        <section><h2>Buyback</h2><p>Bring your old and broken smartphones in and get paid on the spot. Give us a call, email us, or stop by for a free quote.</p></section>
      </div>
    </>
  );
}
