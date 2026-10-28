import type { Metadata } from "next";
import Link from "next/link";
import { ServiceCatalog } from "@/components/service-catalog";

export const metadata: Metadata = {
  title: "Repair & Buyback Services",
  alternates: { canonical: "/services" },
};

export default function Page() {
  return (
    <div data-page="services">
      <section
        aria-labelledby="services-heading"
        style={{
          maxWidth: "1440px",
          margin: "0px auto",
          padding: "clamp(64px, 8vw, 96px) clamp(20px, 4vw, 48px) 0px",
        }}
      >
        <div style={{ maxWidth: "680px" }}>
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
              marginBottom: "14px",
            }}
          >
            What we offer
          </span>
          <h1
            id="services-heading"
            style={{
              whiteSpace: "pre-line",
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(40px, 5vw, 72px)",
              lineHeight: "1.04",
              letterSpacing: "-0.02em",
              fontWeight: "400",
              color: "hsl(var(--foreground))",
              marginBottom: "20px",
            }}
          >
            Every repair. Every brand. One honest price.
          </h1>
          <p
            style={{
              whiteSpace: "pre-line",
              fontFamily: "var(--font-sans)",
              fontSize: "18px",
              lineHeight: "1.6",
              color: "hsl(var(--secondary-foreground))",
              maxWidth: "58ch",
            }}
          >
            From a cracked screen to a dead battery to a phone that won't turn
            on — Revive handles it. We also buy used smartphones on the spot.
          </p>
        </div>
      </section>
      <section
        aria-label="Service catalog"
        style={{
          maxWidth: "1440px",
          margin: "0px auto",
          padding:
            "clamp(48px, 6vw, 80px) clamp(20px, 4vw, 48px) clamp(64px, 8vw, 96px)",
        }}
      >
        <ServiceCatalog />
      </section>
      <section
        aria-labelledby="services-cta-heading"
        style={{
          maxWidth: "1440px",
          margin: "0px auto",
          padding: "0px clamp(20px, 4vw, 48px) clamp(64px, 8vw, 96px)",
        }}
      >
        <div
          style={{
            background: "hsl(var(--primary))",
            borderRadius: "32px",
            padding: "clamp(40px, 5vw, 64px) clamp(32px, 5vw, 60px)",
            display: "flex",
            flexDirection: "column",
            gap: "0px",
          }}
        >
          <span
            style={{
              whiteSpace: "pre-line",
              fontFamily: "var(--font-sans)",
              fontSize: "12px",
              fontWeight: "500",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "hsl(var(--secondary-foreground))",
              display: "block",
              marginBottom: "14px",
            }}
          >
            Ready to get started?
          </span>
          <div className="cta-inner">
            <div style={{ flex: "1 1 0%" }}>
              <h2
                id="services-cta-heading"
                style={{
                  whiteSpace: "pre-line",
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(32px, 4vw, 56px)",
                  lineHeight: "1.06",
                  letterSpacing: "-0.02em",
                  fontWeight: "400",
                  color: "hsl(var(--foreground))",
                  marginBottom: "16px",
                  maxWidth: "22ch",
                }}
              >
                Not sure what your phone needs?
              </h2>
              <p
                style={{
                  whiteSpace: "pre-line",
                  fontFamily: "var(--font-sans)",
                  fontSize: "17px",
                  lineHeight: "1.625",
                  color: "hsl(var(--secondary-foreground))",
                  maxWidth: "56ch",
                }}
              >
                Bring it in or describe the problem and we'll give you a free
                diagnosis and flat-rate quote.
              </p>
            </div>
            <div className="cta-actions">
              <Link className="cta-btn-primary" href="/contact">
                Get a quote
                <span
                  className="svc-arrow-chip inline-flex items-center justify-center rounded-full flex-shrink-0"
                  aria-hidden="true"
                  style={{
                    width: "20px",
                    height: "20px",
                    overflow: "visible",
                    backgroundColor: "hsl(var(--background))",
                    color: "hsl(var(--accent))",
                    transition:
                      "background-color 250ms cubic-bezier(0.22, 1, 0.36, 1), color 250ms cubic-bezier(0.22, 1, 0.36, 1), transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <svg
                    className="svc-arrow-icon"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transition:
                        "transform 300ms cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5"></path>
                  </svg>
                </span>
              </Link>
              <Link className="cta-btn-secondary" href="/about">
                Learn about us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
