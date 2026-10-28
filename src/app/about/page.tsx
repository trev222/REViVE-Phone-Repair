import { pageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = pageMetadata(
  "About Our Covington Phone Repair Shop",
  "Meet REViVE Phone Repair in Covington, LA. Learn about our repair process, flat-rate quotes, smartphone buyback, and service for major phone brands.",
  "/about",
);

export default function Page() {
  return (
    <div data-page="about">
      <section
        aria-labelledby="about-heading"
        style={{
          maxWidth: "1440px",
          margin: "0px auto",
          padding: "clamp(64px, 8vw, 96px) clamp(20px, 4vw, 48px) 0px",
        }}
      >
        <div style={{ maxWidth: "720px" }}>
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
            Our story
          </span>
          <h1
            id="about-heading"
            style={{
              whiteSpace: "pre-line",
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(40px, 5.5vw, 72px)",
              lineHeight: "1.04",
              letterSpacing: "-0.02em",
              fontWeight: "400",
              color: "hsl(var(--foreground))",
              marginBottom: "20px",
              maxWidth: "20ch",
            }}
          >
            Built for people who depend on their phones.
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
            Revive started with a simple idea: phone repair should be fast,
            honest, and affordable. We built a shop around that — certified
            technicians, flat-rate pricing, and a buyback program that pays you
            fairly for devices you no longer need.
          </p>
        </div>
      </section>
      <section
        aria-labelledby="story-heading"
        style={{
          maxWidth: "1440px",
          margin: "0px auto",
          padding: "clamp(64px, 8vw, 96px) clamp(20px, 4vw, 48px)",
        }}
      >
        <div className="about-story-grid">
          <div className="about-story-content">
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
              Why we exist
            </span>
            <h2
              id="story-heading"
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(32px, 3.5vw, 52px)",
                lineHeight: "1.06",
                letterSpacing: "-0.02em",
                fontWeight: "400",
                color: "hsl(var(--foreground))",
                marginBottom: "28px",
                maxWidth: "18ch",
              }}
            >
              Repair first. Buyback second. Always honest.
            </h2>
            <p
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-sans)",
                fontSize: "17px",
                lineHeight: "1.65",
                color: "hsl(var(--secondary-foreground))",
                marginBottom: "18px",
                maxWidth: "60ch",
              }}
            >
              Too many repair shops quote one price and charge another. We got
              tired of that, so we built Revive around flat-rate pricing and
              quote before any work begins.
            </p>
            <p
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-sans)",
                fontSize: "17px",
                lineHeight: "1.65",
                color: "hsl(var(--secondary-foreground))",
                marginBottom: "18px",
                maxWidth: "60ch",
              }}
            >
              Our buyback program gives used phones a second life instead of a
              landfill. We pay fair market prices on the spot — no waiting, no
              lowball offers.
            </p>
            <aside
              aria-label="Service area note"
              style={{
                marginTop: "36px",
                backgroundColor: "hsl(var(--secondary))",
                borderRadius: "28px",
                padding: "24px 28px",
                maxWidth: "52ch",
              }}
            >
              <p
                style={{
                  whiteSpace: "pre-line",
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "hsl(var(--foreground))",
                  marginBottom: "8px",
                  lineHeight: "1.4",
                }}
              >
                Walk in or mail it in
              </p>
              <p
                style={{
                  whiteSpace: "pre-line",
                  fontFamily: "var(--font-sans)",
                  fontSize: "15px",
                  fontWeight: "400",
                  color: "hsl(var(--secondary-foreground))",
                  lineHeight: "1.6",
                }}
              >
                No appointment needed for most repairs. Mail-in service
                available for customers outside our area.
              </p>
            </aside>
          </div>
          <div className="about-story-image-col">
            <figure style={{ margin: "0px" }}>
              <div
                style={{
                  borderRadius: "32px",
                  overflow: "hidden",
                  aspectRatio: "3 / 4",
                  width: "100%",
                }}
              >
                <img
                  alt="The REViVE team at the repair shop"
                  loading="lazy"
                  src="/css/img/slide2.JPG"
                  style={{ objectFit: "cover", display: "block" }}
                />
              </div>
            </figure>
          </div>
        </div>
      </section>
      <section
        aria-labelledby="stats-heading"
        style={{
          maxWidth: "1440px",
          margin: "0px auto",
          padding: "0px clamp(20px, 4vw, 48px) clamp(64px, 8vw, 96px)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: "32px",
            marginBottom: "40px",
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
                marginBottom: "10px",
              }}
            >
              By the numbers
            </span>
            <h2
              id="stats-heading"
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(32px, 4vw, 56px)",
                lineHeight: "1.05",
                letterSpacing: "-0.02em",
                fontWeight: "400",
                color: "hsl(var(--foreground))",
              }}
            >
              Results that speak for themselves.
            </h2>
          </div>
          <p
            style={{
              whiteSpace: "pre-line",
              fontFamily: "var(--font-sans)",
              fontSize: "14px",
              fontWeight: "400",
              color: "hsl(var(--muted-foreground))",
              lineHeight: "1.5",
              maxWidth: "36ch",
              paddingBottom: "4px",
            }}
          >
            Every repair backed by our 1-year warranty.
          </p>
        </div>
        <div
          className="about-stats-grid"
          role="list"
          aria-label="Company statistics"
        >
          <article
            className="stats-cell stats-lime"
            role="listitem"
            style={{
              backgroundColor: "hsl(var(--primary))",
              borderRadius: "32px",
              padding: "36px 40px",
              display: "flex",
              flexDirection: "column",
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
              Same-day service
            </span>
            <p
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(28px, 2.5vw, 40px)",
                lineHeight: "1.1",
                letterSpacing: "-0.02em",
                fontWeight: "400",
                color: "hsl(var(--foreground))",
                flex: "1 1 0%",
                maxWidth: "20ch",
              }}
            >
              Most repairs done in under an hour.
            </p>
            <div style={{ marginTop: "32px" }}>
              <Link className="stats-lime-btn" href="/contact">
                Get a quote
                <span className="stats-lime-chip" aria-hidden="true">
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
              </Link>
            </div>
          </article>
          <article
            className="stats-cell stats-count"
            role="listitem"
            style={{
              backgroundColor: "hsl(var(--background))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "32px",
              padding: "36px 40px",
              display: "flex",
              flexDirection: "column",
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
                color: "hsl(var(--muted-foreground))",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Devices repaired
            </span>
            <span
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(48px, 5vw, 64px)",
                lineHeight: "1",
                letterSpacing: "-0.03em",
                color: "hsl(var(--foreground))",
                display: "block",
              }}
            >
              23,000+
            </span>
            <p
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: "400",
                color: "hsl(var(--secondary-foreground))",
                lineHeight: "1.5",
                marginTop: "10px",
                maxWidth: "28ch",
              }}
            >
              and counting
            </p>
          </article>
          <figure
            className="stats-cell stats-image"
            role="listitem"
            aria-label="Phones and tablets at REViVE"
            style={{
              margin: "0px",
              borderRadius: "32px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              alt="Phones and tablets at REViVE"
              loading="lazy"
              src="/css/img/slide3.JPG"
              style={{
                position: "absolute",
                inset: "0px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </figure>
          <article
            className="stats-cell stats-cert"
            role="listitem"
            style={{
              backgroundColor: "hsl(var(--muted))",
              borderRadius: "32px",
              padding: "36px 40px",
              display: "flex",
              flexDirection: "column",
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
                color: "hsl(var(--muted-foreground))",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Certified technicians
            </span>
            <span
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(32px, 3.5vw, 44px)",
                lineHeight: "1.05",
                letterSpacing: "-0.02em",
                color: "hsl(var(--foreground))",
                display: "block",
                marginBottom: "8px",
              }}
            >
              100%
            </span>
            <p
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: "400",
                color: "hsl(var(--secondary-foreground))",
                lineHeight: "1.55",
                maxWidth: "32ch",
              }}
            >
              Every technician is trained and certified on the brands we
              service.
            </p>
          </article>
          <article
            className="stats-cell stats-rating"
            role="listitem"
            style={{
              backgroundColor: "hsl(var(--muted))",
              borderRadius: "32px",
              padding: "36px 40px",
              display: "flex",
              flexDirection: "column",
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
                color: "hsl(var(--muted-foreground))",
                display: "block",
                marginBottom: "12px",
              }}
            >
              Customer satisfaction
            </span>
            <span
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(32px, 3.5vw, 44px)",
                lineHeight: "1.05",
                letterSpacing: "-0.02em",
                color: "hsl(var(--foreground))",
                display: "block",
                marginBottom: "8px",
              }}
            >
              4.9 / 5
            </span>
            <p
              style={{
                whiteSpace: "pre-line",
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: "400",
                color: "hsl(var(--secondary-foreground))",
                lineHeight: "1.55",
                maxWidth: "32ch",
              }}
            >
              Based on verified customer reviews across all service types.
            </p>
          </article>
        </div>
      </section>
      <section
        aria-labelledby="cred-heading"
        style={{
          maxWidth: "1440px",
          margin: "0px auto",
          padding: "0px clamp(20px, 4vw, 48px) clamp(64px, 8vw, 96px)",
        }}
      >
        <div
          style={{
            backgroundColor: "hsl(var(--background))",
            borderRadius: "32px",
            border: "1px solid hsl(var(--border))",
            padding: "clamp(28px, 4vw, 40px) clamp(24px, 4vw, 48px)",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          <div className="cred-top">
            <div style={{ flexShrink: "0", maxWidth: "280px" }}>
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
                Our qualifications
              </span>
              <h2
                id="cred-heading"
                style={{
                  whiteSpace: "pre-line",
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(24px, 2.5vw, 32px)",
                  lineHeight: "1.1",
                  letterSpacing: "-0.02em",
                  fontWeight: "400",
                  color: "hsl(var(--foreground))",
                }}
              >
                Certified, experienced, and accountable.
              </h2>
            </div>
            <div style={{ flex: "1 1 0%", minWidth: "0px" }}>
              <div
                role="list"
                aria-label="Professional credentials"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  justifyContent: "flex-end",
                }}
              >
                <div
                  role="listitem"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "9999px",
                    padding: "12px 20px",
                    backgroundColor: "hsl(var(--muted))",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "9999px",
                      flexShrink: "0",
                      backgroundColor: "hsl(var(--primary))",
                    }}
                  ></span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                    }}
                  >
                    <span
                      style={{
                        whiteSpace: "pre-line",
                        fontFamily: "var(--font-sans)",
                        fontSize: "11px",
                        fontWeight: "500",
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        color: "hsl(var(--muted-foreground))",
                        lineHeight: "1.3",
                      }}
                    >
                      Repairs completed
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "hsl(var(--foreground))",
                        lineHeight: "1.3",
                        whiteSpace: "nowrap",
                      }}
                    >
                      23,000+
                    </span>
                  </div>
                </div>
                <div
                  role="listitem"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "9999px",
                    padding: "12px 20px",
                    backgroundColor: "hsl(var(--muted))",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "9999px",
                      flexShrink: "0",
                      backgroundColor: "hsl(var(--secondary))",
                    }}
                  ></span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                    }}
                  >
                    <span
                      style={{
                        whiteSpace: "pre-line",
                        fontFamily: "var(--font-sans)",
                        fontSize: "11px",
                        fontWeight: "500",
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        color: "hsl(var(--muted-foreground))",
                        lineHeight: "1.3",
                      }}
                    >
                      Customer rating
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "hsl(var(--foreground))",
                        lineHeight: "1.3",
                        whiteSpace: "nowrap",
                      }}
                    >
                      4.9 / 5
                    </span>
                  </div>
                </div>
                <div
                  role="listitem"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "9999px",
                    padding: "12px 20px",
                    backgroundColor: "hsl(var(--muted))",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "9999px",
                      flexShrink: "0",
                      backgroundColor: "hsl(var(--border))",
                    }}
                  ></span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                    }}
                  >
                    <span
                      style={{
                        whiteSpace: "pre-line",
                        fontFamily: "var(--font-sans)",
                        fontSize: "11px",
                        fontWeight: "500",
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        color: "hsl(var(--muted-foreground))",
                        lineHeight: "1.3",
                      }}
                    >
                      Warranty
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "hsl(var(--foreground))",
                        lineHeight: "1.3",
                        whiteSpace: "nowrap",
                      }}
                    >
                      1 year
                    </span>
                  </div>
                </div>
                <div
                  role="listitem"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "9999px",
                    padding: "12px 20px",
                    backgroundColor: "hsl(var(--muted))",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "9999px",
                      flexShrink: "0",
                      backgroundColor: "hsl(var(--border))",
                    }}
                  ></span>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1px",
                    }}
                  >
                    <span
                      style={{
                        whiteSpace: "pre-line",
                        fontFamily: "var(--font-sans)",
                        fontSize: "11px",
                        fontWeight: "500",
                        letterSpacing: "0.07em",
                        textTransform: "uppercase",
                        color: "hsl(var(--muted-foreground))",
                        lineHeight: "1.3",
                      }}
                    >
                      Turnaround
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        fontWeight: "600",
                        color: "hsl(var(--foreground))",
                        lineHeight: "1.3",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Same day
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            aria-hidden="true"
            style={{ height: "1px", backgroundColor: "hsl(var(--border))" }}
          ></div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "12px",
                fontWeight: "500",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
                color: "hsl(var(--muted-foreground))",
                whiteSpace: "nowrap",
                flexShrink: "0",
              }}
            >
              Brands we service
            </span>
            <div
              role="list"
              aria-label="Certifications and partners"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                alignItems: "center",
              }}
            >
              <div
                role="listitem"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "hsl(var(--secondary))",
                  borderRadius: "9999px",
                  padding: "10px 18px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "hsl(var(--secondary-foreground))",
                  whiteSpace: "nowrap",
                }}
              >
                iPhone &amp; iPad
              </div>
              <div
                role="listitem"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "hsl(var(--muted))",
                  borderRadius: "9999px",
                  padding: "10px 18px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "hsl(var(--secondary-foreground))",
                  whiteSpace: "nowrap",
                }}
              >
                Samsung Galaxy
              </div>
              <div
                role="listitem"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "hsl(var(--muted))",
                  borderRadius: "9999px",
                  padding: "10px 18px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "hsl(var(--secondary-foreground))",
                  whiteSpace: "nowrap",
                }}
              >
                Google Pixel
              </div>
              <div
                role="listitem"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  backgroundColor: "hsl(var(--muted))",
                  borderRadius: "9999px",
                  padding: "10px 18px",
                  fontFamily: "var(--font-sans)",
                  fontSize: "13px",
                  fontWeight: "500",
                  color: "hsl(var(--secondary-foreground))",
                  whiteSpace: "nowrap",
                }}
              >
                Motorola &amp; OnePlus
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        aria-labelledby="about-cta-heading"
        style={{
          maxWidth: "1440px",
          margin: "0px auto",
          padding: "0px clamp(20px, 4vw, 48px) clamp(64px, 8vw, 96px)",
        }}
      >
        <div
          style={{
            backgroundColor: "hsl(var(--primary))",
            borderRadius: "32px",
            padding: "clamp(40px, 5vw, 64px) clamp(32px, 5vw, 60px)",
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
          <div className="about-cta-inner">
            <div style={{ flex: "1 1 0%" }}>
              <h2
                id="about-cta-heading"
                style={{
                  whiteSpace: "pre-line",
                  fontFamily: "var(--font-heading)",
                  fontSize: "clamp(28px, 3.5vw, 52px)",
                  lineHeight: "1.06",
                  letterSpacing: "-0.02em",
                  fontWeight: "400",
                  color: "hsl(var(--foreground))",
                  marginBottom: "14px",
                  maxWidth: "22ch",
                }}
              >
                Ready to bring your phone back to life?
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
                Walk in, mail it in, or get a quote online.
              </p>
            </div>
            <div className="about-cta-actions">
              <Link className="about-cta-primary-btn" href="/contact">
                Get a quote
                <span className="about-cta-chip" aria-hidden="true">
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
              </Link>
              <Link className="about-cta-secondary-btn" href="/services">
                Our services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
