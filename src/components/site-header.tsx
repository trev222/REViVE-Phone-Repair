"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./arrow";

const navigation = [
  ["/", "Home"],
  ["/services", "Services"],
  ["/about", "About"],
  ["/contact", "Contact"],
] as const;

function Logo() {
  return (
    <img
      src="/images/revive-logo.png"
      alt="REViVE Smartphone Buyback and Repair"
      width={1506}
      height={532}
      className="block h-auto max-h-10 w-auto max-w-full object-contain md:max-h-12"
    />
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktop.matches) dialog.current?.close();
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  function close() {
    dialog.current?.close();
  }
  const menuButton =
    "grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-card text-foreground md:hidden";

  return (
    <header className="sticky top-0 z-50 bg-background">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-5 py-5 md:px-8 lg:px-12">
        <Link href="/" aria-label="REViVE home" className="min-w-0 shrink">
          <Logo />
        </Link>
        <nav
          className="hidden items-center justify-center gap-9 md:flex"
          aria-label="Main navigation"
        >
          {navigation.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              className="nav-link font-sans text-[15px] font-medium text-foreground"
              aria-current={pathname === href ? "page" : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link href="/contact" className="header-cta">
          <span className="hidden lg:inline">Get a quote</span>
          <span className="lg:hidden">Quote</span>
          <span className="header-cta-chip">
            <Arrow size={10} />
          </span>
        </Link>
        <button
          className={menuButton}
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => {
            dialog.current?.showModal();
            setOpen(true);
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <dialog
        ref={dialog}
        id="mobile-navigation"
        className="mobile-navigation"
        aria-label="Navigation menu"
        onClose={() => setOpen(false)}
      >
        <div className="flex w-full items-center justify-between gap-6">
          <Link href="/" aria-label="REViVE home" onClick={close}>
            <Logo />
          </Link>
          <button
            type="button"
            className={menuButton}
            aria-label="Close menu"
            onClick={close}
            autoFocus
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="m6 6 12 12M6 18 18 6" />
            </svg>
          </button>
        </div>
        <nav
          className="mt-16 flex w-full flex-1 flex-col gap-2"
          aria-label="Mobile navigation"
        >
          {navigation.map(([href, label]) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              aria-current={pathname === href ? "page" : undefined}
              className="py-2 font-heading text-4xl leading-tight tracking-[-0.02em] text-foreground hover:text-muted-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          onClick={close}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-[15px] font-medium text-accent-foreground"
        >
          Get a quote
          <span className="grid h-5 w-5 place-items-center rounded-full bg-card text-card-foreground">
            <Arrow size={10} />
          </span>
        </Link>
      </dialog>
    </header>
  );
}
