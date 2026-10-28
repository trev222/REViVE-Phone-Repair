import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-accent text-accent-foreground">
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-5 py-16 md:grid-cols-[1.4fr_1fr] md:px-8 lg:px-12">
        <div>
          <p
            className="max-w-md font-sans text-base leading-7 text-accent-foreground"
            style={{ whiteSpace: "pre-line" }}
          >
            Smartphone buyback and repair — fast turnarounds, fair prices, and
            no surprises.
          </p>
          <nav
            className="mt-7 flex items-center gap-3"
            aria-label="Social media"
          >
            <a
              href="https://www.instagram.com/revivephonerepair/"
              aria-label="Instagram"
              className="flex size-10 items-center justify-center rounded-full border border-primary-foreground text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram size-4"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/REViVEphonerepair"
              aria-label="Facebook"
              className="flex size-10 items-center justify-center rounded-full border border-primary-foreground text-accent-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook size-4"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
          </nav>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <p
              className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-primary"
              style={{ whiteSpace: "pre-line" }}
            >
              Explore
            </p>
            <nav className="mt-4 flex flex-col gap-3" aria-label="Footer links">
              <Link
                className="font-sans text-sm text-accent-foreground transition-colors hover:text-primary"
                href="/services"
              >
                Services
              </Link>
              <Link
                className="font-sans text-sm text-accent-foreground transition-colors hover:text-primary"
                href="/about"
              >
                About
              </Link>
              <Link
                className="font-sans text-sm text-accent-foreground transition-colors hover:text-primary"
                href="/blog"
              >
                Guides
              </Link>
              <Link
                className="font-sans text-sm text-accent-foreground transition-colors hover:text-primary"
                href="/contact"
              >
                Get a quote
              </Link>
            </nav>
          </div>
          <div>
            <p
              className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-primary"
              style={{ whiteSpace: "pre-line" }}
            >
              Service
            </p>
            <p
              className="mt-4 font-sans text-sm leading-6 text-accent-foreground"
              style={{ whiteSpace: "pre-line" }}
            >
              Walk-in and mail-in service available
            </p>
            <p
              className="mt-6 font-sans text-sm leading-6 text-accent-foreground"
              style={{ whiteSpace: "pre-line" }}
            >
              Buyback + repair, handled by one team.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-border px-5 py-6 md:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            className="font-sans text-sm text-accent-foreground"
            style={{ whiteSpace: "pre-line" }}
          >
            © 2026 Revive. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
