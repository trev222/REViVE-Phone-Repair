import type { Metadata } from "next";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/600.css";
import "@fontsource/questrial/400.css";
import "@/styles/header.css";
import "@/styles/home.css";
import "@/styles/services.css";
import "@/styles/about.css";
import "@/styles/contact.css";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Home - Revive Phone Repair",
    template: "%s - Revive Phone Repair",
  },
  description:
    "Phone screen repair, battery replacement, water damage repair, and smartphone buybacks in Covington, Louisiana.",
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/images/revive-logo.png",
        width: 1506,
        height: 532,
        alt: site.name,
      },
    ],
  },
  icons: {
    icon: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
