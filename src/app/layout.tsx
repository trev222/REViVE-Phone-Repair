import type { Metadata } from "next";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/raleway/400.css";
import "@fontsource/coustard/400.css";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Home - Revive Phone Repair", template: "%s - Revive Phone Repair" },
  description: "Phone screen repair, battery replacement, water damage repair, and smartphone buybacks in Covington, Louisiana.",
  openGraph: { siteName: site.name, type: "website", locale: "en_US", images: [{ url: "/css/img/revivephonerepair-logo.png", width: 450, height: 161, alt: site.name }] },
  icons: { icon: "/favicon/favicon.ico", apple: "/favicon/apple-touch-icon.png" },
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <div className="container">
          <SiteHeader />
          <main id="main-content">{children}</main>
          <footer className="site-footer">
            <p>{site.name} · Covington, Louisiana</p>
            <a href={site.phoneHref}>{site.phone}</a>
          </footer>
        </div>
      </body>
    </html>
  );
}
