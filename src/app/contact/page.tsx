import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { ContactForm } from "@/components/contact-form";

export const metadata = pageMetadata(
  "Contact REViVE & Get a Repair Quote",
  "Request a phone repair or buyback quote from REViVE in Covington, LA. Call 985-302-5033 or email ReviveCovington@gmail.com with your device details.",
  "/contact",
);

export default function Page() {
  return (
    <div data-page="contact">
      <section
        aria-label="Book a consultation"
        style={{
          maxWidth: "1440px",
          margin: "0px auto",
          padding:
            "clamp(40px, 5vw, 64px) clamp(20px, 4vw, 48px) clamp(64px, 8vw, 96px)",
        }}
      >
        <div className="booking-unit">
          <div className="booking-left">
            <div>
              <span
                className="panel-eyebrow"
                style={{ whiteSpace: "pre-line" }}
              >
                Book a consultation
              </span>
              <h1 className="panel-heading" style={{ whiteSpace: "pre-line" }}>
                Get a quote or ask a question.
              </h1>
              <p className="panel-lede" style={{ whiteSpace: "pre-line" }}>
                Tell us about your device and what you need — repair, buyback,
                or just a question. We'll respond the same day.
              </p>
              <div
                role="list"
                aria-label="Why book with us"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div
                  role="listitem"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <span aria-hidden="true" className="trust-icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 7l3.5 3.5L12 3"></path>
                    </svg>
                  </span>
                  <span
                    className="trust-text"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    1-year warranty on every repair
                  </span>
                </div>
                <div
                  role="listitem"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <span aria-hidden="true" className="trust-icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="7" cy="7" r="5.5"></circle>
                      <path d="M7 4v3.5l2 1.5"></path>
                    </svg>
                  </span>
                  <span
                    className="trust-text"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    Same-day response
                  </span>
                </div>
                <div
                  role="listitem"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "12px",
                  }}
                >
                  <span aria-hidden="true" className="trust-icon">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 7l3.5 3.5L12 3"></path>
                    </svg>
                  </span>
                  <span
                    className="trust-text"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    Flat-rate pricing, no surprises
                  </span>
                </div>
              </div>
            </div>
            <blockquote className="panel-testimonial">
              <p className="testimonial-quote">
                "
                <span style={{ whiteSpace: "pre-line" }}>
                  Dropped my phone and had a cracked screen. Revive fixed it in
                  under an hour for a fair price. Couldn't be happier.
                </span>
                "
              </p>
              <footer>
                <cite className="testimonial-cite">
                  —{" "}
                  <span style={{ whiteSpace: "pre-line" }}>
                    Marcus T., Covington LA
                  </span>
                </cite>
              </footer>
            </blockquote>
          </div>
          <div className="booking-right">
            <ContactForm />
          </div>
        </div>
      </section>
      <section
        aria-labelledby="direct-contact-heading"
        style={{
          maxWidth: "1440px",
          margin: "0px auto",
          padding: "0px clamp(20px, 4vw, 48px) clamp(64px, 8vw, 96px)",
        }}
      >
        <div
          style={{
            backgroundColor: "hsl(var(--secondary))",
            borderRadius: "32px",
            padding: "clamp(28px, 4vw, 40px) clamp(28px, 4vw, 48px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <span
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: "500",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "hsl(var(--muted-foreground))",
                display: "block",
                marginBottom: "8px",
              }}
            >
              We're easy to reach.
            </span>
            <h2
              id="direct-contact-heading"
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(22px, 2.5vw, 32px)",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
                fontWeight: "400",
                color: "hsl(var(--foreground))",
                marginBottom: "6px",
              }}
            >
              Prefer to call or walk in?
            </h2>
            <p
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                color: "hsl(var(--secondary-foreground))",
                lineHeight: "1.5",
              }}
            >
              Walk-ins welcome — no appointment needed for most repairs.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <a
              href="tel:+19853025033"
              className="direct-btn direct-btn--primary"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3.5 3h3.5l1.5 3.5-2 1.2a9 9 0 0 0 3.3 3.3l1.2-2L14.5 10.5V14a1 1 0 0 1-1 1C5.7 15 1 10.3 1 4A1 1 0 0 1 2 3h1.5z"></path>
              </svg>
              <span style={{ whiteSpace: "pre-line" }}>(985) 302-5033</span>
              <span aria-hidden="true" className="direct-btn-chip">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"></path>
                </svg>
              </span>
            </a>
            <a
              href="mailto:ReviveCovington@gmail.com"
              className="direct-btn direct-btn--outline"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1.5" y="3.5" width="13" height="9" rx="1.5"></rect>
                <path d="M1.5 5l6.5 4.5L14.5 5"></path>
              </svg>
              <span style={{ whiteSpace: "pre-line" }}>
                ReviveCovington@gmail.com
              </span>
            </a>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "hsl(var(--muted))",
                color: "hsl(var(--secondary-foreground))",
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: "400",
                padding: "13px 20px",
                borderRadius: "9999px",
                whiteSpace: "nowrap",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 1.5a4.5 4.5 0 0 1 4.5 4.5c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5z"></path>
                <circle cx="8" cy="6" r="1.5"></circle>
              </svg>
              <Link href="/locations" className="underline">
                Visit our Covington shop
              </Link>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
