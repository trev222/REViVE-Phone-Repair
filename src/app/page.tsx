import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Smartphone Buyback & Repair",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <div data-page="home">
      <section
        className="mx-auto max-w-[1440px] px-5 pb-24 pt-6 md:px-8 lg:px-12 lg:pb-24 lg:pt-10"
        aria-labelledby="hero-heading"
      >
        <div className="grid grid-cols-1 gap-4 lg:min-h-[600px] lg:grid-cols-2">
          <div className="flex min-h-[560px] flex-col justify-between rounded-[32px] bg-primary p-8 text-foreground md:p-12 lg:p-[52px]">
            <div>
              <p
                className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-secondary-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Buyback + repair, same place
              </p>
              <h1
                id="hero-heading"
                className="mt-6 max-w-[14ch] font-heading text-5xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-6xl lg:text-7xl"
                style={{ whiteSpace: "pre-line" }}
              >
                Your phone, brought back to life.
              </h1>
            </div>
            <div className="mt-12">
              <p
                className="max-w-[44ch] font-sans text-lg leading-7 text-secondary-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Revive pays fair prices for used smartphones and fixes broken
                ones — cracked screens, dead batteries, water damage, and more.
                Walk in or mail it in.
              </p>
              <div className="mt-8 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
                <Link className="hero-btn-primary group" href="/contact">
                  Get a quote
                  <span className="hero-btn-chip" aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-arrow-right"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </span>
                </Link>
                <Link className="hero-btn-secondary" href="/services">
                  Our services
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-8 border-t border-accent pt-8">
                <div>
                  <p
                    className="font-heading text-3xl leading-none text-foreground"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    Same day
                  </p>
                  <p
                    className="mt-1 font-sans text-sm text-secondary-foreground"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    repair on most models
                  </p>
                </div>
                <div>
                  <p
                    className="font-heading text-3xl leading-none text-foreground"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    Fair price
                  </p>
                  <p
                    className="mt-1 font-sans text-sm text-secondary-foreground"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    guaranteed on buyback
                  </p>
                </div>
              </div>
            </div>
          </div>
          <figure className="relative min-h-[360px] overflow-hidden rounded-[32px] lg:min-h-0">
            <img
              alt="Technician repairing a smartphone on a clean workbench"
              width="1200"
              height="1500"
              loading="eager"
              fetchPriority="high"
              className="h-full w-full object-cover"
              src="/images/phone-repair.jpg"
            />
            <figcaption className="absolute bottom-6 left-6 rounded-full bg-card px-4 py-2 font-sans text-xs font-medium text-foreground">
              Expert repairs and fair buyback prices
            </figcaption>
          </figure>
        </div>
      </section>
      <section
        className="mx-auto max-w-[1440px] px-5 pb-20 md:px-8 lg:px-12 lg:pb-24"
        aria-labelledby="credentials-heading"
      >
        <div className="rounded-[32px] border border-border bg-card p-7 md:p-10 lg:p-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-start">
            <div className="max-w-sm">
              <p
                className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Why customers choose Revive
              </p>
              <h2
                id="credentials-heading"
                className="mt-3 font-heading text-3xl leading-tight tracking-[-0.02em] text-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Fast. Fair. No surprises.
              </h2>
            </div>
            <div
              className="flex flex-wrap gap-3"
              role="list"
              aria-label="REViVE credentials"
            >
              <div
                className="flex items-center justify-center gap-3 rounded-full border border-border bg-background px-5 py-3"
                role="listitem"
              >
                <span
                  className="h-2 w-2 rounded-full bg-primary"
                  aria-hidden="true"
                ></span>
                <div>
                  <p
                    className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    Repair time
                  </p>
                  <p
                    className="font-sans text-sm font-semibold text-foreground"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    Same-day on most models
                  </p>
                </div>
              </div>
              <div
                className="flex items-center justify-center gap-3 rounded-full border border-border bg-background px-5 py-3"
                role="listitem"
              >
                <span
                  className="h-2 w-2 rounded-full bg-primary"
                  aria-hidden="true"
                ></span>
                <div>
                  <p
                    className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    Buyback offer
                  </p>
                  <p
                    className="font-sans text-sm font-semibold text-foreground"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    Instant quote, paid same day
                  </p>
                </div>
              </div>
              <div
                className="flex items-center justify-center gap-3 rounded-full border border-border bg-background px-5 py-3"
                role="listitem"
              >
                <span
                  className="h-2 w-2 rounded-full bg-primary"
                  aria-hidden="true"
                ></span>
                <div>
                  <p
                    className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    Pricing
                  </p>
                  <p
                    className="font-sans text-sm font-semibold text-foreground"
                    style={{ whiteSpace: "pre-line" }}
                  >
                    Flat-rate, no hidden fees
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-7">
            <div
              className="flex flex-wrap items-center justify-center gap-3"
              role="list"
              aria-label="Repair standards"
            >
              <span
                className="rounded-full bg-secondary px-4 py-2 font-sans text-sm font-medium text-secondary-foreground"
                role="listitem"
                style={{ whiteSpace: "pre-line" }}
              >
                Certified repair technicians
              </span>
              <span
                className="rounded-full bg-secondary px-4 py-2 font-sans text-sm font-medium text-secondary-foreground"
                role="listitem"
                style={{ whiteSpace: "pre-line" }}
              >
                All major brands serviced
              </span>
              <span
                className="rounded-full bg-secondary px-4 py-2 font-sans text-sm font-medium text-secondary-foreground"
                role="listitem"
                style={{ whiteSpace: "pre-line" }}
              >
                1-year repair warranty
              </span>
            </div>
          </div>
        </div>
      </section>
      <section
        className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 lg:px-12 lg:py-24"
        aria-labelledby="services-heading"
      >
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p
              className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground"
              style={{ whiteSpace: "pre-line" }}
            >
              What we do
            </p>
            <h2
              id="services-heading"
              className="mt-3 max-w-[18ch] font-heading text-4xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl"
              style={{ whiteSpace: "pre-line" }}
            >
              Repairs and buyback, handled under one roof.
            </h2>
          </div>
          <Link
            className="pb-1 font-sans text-[15px] font-medium text-muted-foreground transition-colors hover:text-foreground"
            href="/services"
          >
            View all services →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          <article className="flex min-h-[280px] flex-col overflow-hidden rounded-[32px] p-8 md:min-h-[320px] md:p-10 md:col-span-2 lg:col-span-2 bg-primary text-foreground">
            <div className="">
              <p
                className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Screen repair
              </p>
              <h3
                className="mt-3 font-heading leading-[1.1] tracking-[-0.02em] max-w-[22ch] text-3xl md:text-4xl text-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Cracked screen? Back in your hands today.
              </h3>
              <p
                className="mt-5 max-w-[52ch] font-sans text-base leading-7 text-secondary-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                We replace screens on iPhones, Samsung Galaxy, Pixels, and more
                — most jobs done in under an hour.
              </p>
              <Link
                className="bento-btn mt-8 inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 font-sans text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bento-btn--ink"
                href="/services"
              >
                Explore repairs
                <span className="bento-chip" aria-hidden="true">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-arrow-right"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                </span>
              </Link>
            </div>
          </article>
          <article className="flex min-h-[280px] flex-col overflow-hidden rounded-[32px] p-0 lg:row-span-2 bg-accent text-accent-foreground ">
            <div className="flex flex-col p-8 md:p-10">
              <p
                className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-accent-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Battery &amp; charging
              </p>
              <h3
                className="mt-3 font-heading leading-[1.1] tracking-[-0.02em] max-w-[18ch] text-3xl text-accent-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Battery draining fast? We'll fix that.
              </h3>
              <p
                className="mt-5 max-w-[52ch] font-sans text-base leading-7 text-accent-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Battery replacements, charging port repairs, and power
                diagnostics — all with a 1-year warranty.
              </p>
              <Link
                className="bento-btn mt-8 inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 font-sans text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bento-btn--outline-white"
                href="/services"
              >
                Explore repairs
              </Link>
            </div>
            <figure className="mt-auto min-h-[220px] flex-1 overflow-hidden">
              <img
                alt="Smartphones and tablets on display at REViVE"
                width="900"
                height="700"
                loading="lazy"
                fetchPriority="auto"
                className="h-full w-full object-cover object-center"
                src="/css/img/slide3.JPG"
              />
            </figure>
          </article>
          <article className="flex min-h-[280px] flex-col overflow-hidden rounded-[32px] p-8 md:min-h-[320px] md:p-10 bg-secondary text-foreground">
            <div className="">
              <p
                className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Buyback
              </p>
              <h3
                className="mt-3 font-heading leading-[1.1] tracking-[-0.02em] max-w-[18ch] text-3xl text-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Get paid for your old phone today.
              </h3>
              <p
                className="mt-5 max-w-[52ch] font-sans text-base leading-7 text-secondary-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                We buy used smartphones in any condition. Get an instant quote
                and walk out with cash or store credit.
              </p>
              <Link
                className="bento-btn mt-8 inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 font-sans text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bento-btn--sky"
                href="/contact"
              >
                Get a buyback quote
              </Link>
            </div>
          </article>
          <article className="flex min-h-[280px] flex-col overflow-hidden rounded-[32px] p-8 md:min-h-[320px] md:p-10 border border-border bg-card text-foreground">
            <div className="">
              <p
                className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Water &amp; data
              </p>
              <h3
                className="mt-3 font-heading leading-[1.1] tracking-[-0.02em] max-w-[18ch] text-3xl text-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Water damage and data recovery.
              </h3>
              <p
                className="mt-5 max-w-[52ch] font-sans text-base leading-7 text-secondary-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Dropped it in water? We diagnose, dry, and recover — and
                retrieve your data when the phone can't be saved.
              </p>
              <Link
                className="bento-btn mt-8 inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 font-sans text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring bento-btn--outline-ink"
                href="/contact"
              >
                Talk to our team
              </Link>
            </div>
          </article>
          <div
            className="hidden rounded-[32px] bg-muted lg:block"
            aria-hidden="true"
          ></div>
        </div>
      </section>
      <section
        className="bg-card py-20 lg:py-24"
        aria-labelledby="neighborhoods-heading"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-4 px-5 md:flex-row md:items-end md:justify-between md:px-8 lg:px-12">
            <div>
              <p
                className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Walk in or mail it in
              </p>
              <h2
                id="neighborhoods-heading"
                className="mt-3 font-heading text-4xl tracking-[-0.02em] text-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                Serving customers near and far.
              </h2>
            </div>
            <p
              className="rounded-full bg-secondary px-4 py-2 text-center font-sans text-sm font-medium text-secondary-foreground"
              style={{ whiteSpace: "pre-line" }}
            >
              Walk-in and mail-in customers served
            </p>
          </div>
          <div
            className="mt-10 overflow-hidden py-3"
            role="marquee"
            aria-label="Devices we service"
            aria-live="off"
          >
            <div className="brand-ticker flex w-max items-center justify-center gap-3">
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                iPhone
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                Samsung Galaxy
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                Google Pixel
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                OnePlus
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                Motorola
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                LG
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                iPad
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                Android tablets
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                All major brands
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                Unlocked devices
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                iPhone
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                Samsung Galaxy
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                Google Pixel
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                OnePlus
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                Motorola
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                LG
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                iPad
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                Android tablets
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                All major brands
              </span>
              <span className="rounded-full border border-border bg-card px-5 py-3 font-sans text-sm font-medium text-secondary-foreground">
                Unlocked devices
              </span>
            </div>
          </div>
          <div className="mx-5 mt-12 rounded-[32px] bg-primary p-8 md:mx-8 md:p-12 lg:mx-12 lg:p-14">
            <p
              className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-secondary-foreground"
              style={{ whiteSpace: "pre-line" }}
            >
              A better way to fix your phone
            </p>
            <blockquote
              className="mt-5 max-w-[28ch] font-heading text-3xl leading-[1.1] tracking-[-0.02em] text-foreground sm:text-4xl"
              style={{ whiteSpace: "pre-line" }}
            >
              {
                "“Very satisfied, and I highly recommend. They were quick and stood behind there work.\nA pleasure to deal with..”"
              }
            </blockquote>
            <p
              className="mt-7 font-sans text-sm font-semibold text-foreground"
              style={{ whiteSpace: "pre-line" }}
            >
              - Paul
            </p>
            <p
              className="mt-1 font-sans text-sm text-secondary-foreground"
              style={{ whiteSpace: "pre-line" }}
            >
              Satisfied phone owner
            </p>
            <Link
              className="nbhd-btn mt-8 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-4 font-sans text-[15px] font-medium text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              href="/contact"
            >
              Get a quote
              <span
                className="nbhd-chip grid h-5 w-5 place-items-center rounded-full bg-card text-card-foreground"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-right"
                >
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section
        className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 lg:px-12 lg:py-24"
        aria-labelledby="process-heading"
      >
        <p
          className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-muted-foreground"
          style={{ whiteSpace: "pre-line" }}
        >
          How it works
        </p>
        <h2
          id="process-heading"
          className="mt-3 max-w-[18ch] font-heading text-4xl leading-[1.05] tracking-[-0.02em] text-foreground sm:text-5xl"
          style={{ whiteSpace: "pre-line" }}
        >
          A clear path from drop-off to pickup.
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="border-t border-border pt-6">
            <div className="flex items-center justify-center justify-between">
              <span
                className="font-heading text-3xl text-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                01
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-clipboard-check text-foreground"
                aria-hidden="true"
              >
                <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <path d="m9 14 2 2 4-4"></path>
              </svg>
            </div>
            <h3
              className="mt-8 font-heading text-3xl tracking-[-0.02em] text-foreground"
              style={{ whiteSpace: "pre-line" }}
            >
              Diagnose
            </h3>
            <p
              className="mt-4 font-sans text-base leading-7 text-secondary-foreground"
              style={{ whiteSpace: "pre-line" }}
            >
              We inspect your device and give you a flat-rate quote before any
              work begins — no surprises.
            </p>
          </article>
          <article className="border-t border-border pt-6">
            <div className="flex items-center justify-center justify-between">
              <span
                className="font-heading text-3xl text-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                02
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-house text-foreground"
                aria-hidden="true"
              >
                <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
                <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              </svg>
            </div>
            <h3
              className="mt-8 font-heading text-3xl tracking-[-0.02em] text-foreground"
              style={{ whiteSpace: "pre-line" }}
            >
              Repair
            </h3>
            <p
              className="mt-4 font-sans text-base leading-7 text-secondary-foreground"
              style={{ whiteSpace: "pre-line" }}
            >
              Our certified technicians fix your phone using quality parts,
              usually the same day.
            </p>
          </article>
          <article className="border-t border-border pt-6">
            <div className="flex items-center justify-center justify-between">
              <span
                className="font-heading text-3xl text-foreground"
                style={{ whiteSpace: "pre-line" }}
              >
                03
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-sun text-foreground"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            </div>
            <h3
              className="mt-8 font-heading text-3xl tracking-[-0.02em] text-foreground"
              style={{ whiteSpace: "pre-line" }}
            >
              Pick up
            </h3>
            <p
              className="mt-4 font-sans text-base leading-7 text-secondary-foreground"
              style={{ whiteSpace: "pre-line" }}
            >
              Your phone is tested, cleaned, and ready to go — backed by our
              1-year repair warranty.
            </p>
          </article>
        </div>
      </section>
      <section
        className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 px-5 pb-20 md:px-8 lg:grid-cols-2 lg:px-12 lg:pb-24"
        aria-labelledby="consultation-heading"
      >
        <div className="rounded-[32px] bg-accent p-8 text-accent-foreground md:p-12">
          <p
            className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-accent-foreground"
            style={{ whiteSpace: "pre-line" }}
          >
            Ready to get started?
          </p>
          <h2
            id="consultation-heading"
            className="mt-4 max-w-[14ch] font-heading text-4xl leading-[1.05] tracking-[-0.02em] text-accent-foreground"
            style={{ whiteSpace: "pre-line" }}
          >
            Drop off your phone or get a buyback quote today.
          </h2>
          <p
            className="mt-6 max-w-[48ch] font-sans text-lg leading-7 text-accent-foreground"
            style={{ whiteSpace: "pre-line" }}
          >
            No pressure. No hidden fees. Just a clear answer for your device.
          </p>
          <Link
            className="cta-bottom-btn mt-8 inline-flex items-center gap-3 rounded-full bg-card px-6 py-4 font-sans text-[15px] font-medium text-card-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            href="/contact"
          >
            Get a quote
            <span
              className="cta-bottom-chip grid h-5 w-5 place-items-center rounded-full bg-primary text-foreground"
              aria-hidden="true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-right"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </span>
          </Link>
        </div>
        <figure className="min-h-[320px] overflow-hidden rounded-[32px]">
          <img
            alt="Inside the REViVE smartphone repair shop"
            width="1200"
            height="900"
            loading="lazy"
            fetchPriority="auto"
            className="h-full w-full object-cover"
            src="/css/img/slide2.JPG"
          />
        </figure>
      </section>
    </div>
  );
}
