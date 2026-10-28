"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  ["/", "Home"], ["/about", "About"], ["/services", "Services"],
  ["/locations", "Locations"], ["/contact", "Contact"],
] as const;

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header>
      <div className="logo">
        <Link href="/" aria-label="REViVE Phone Repair home">
          <Image src="/css/img/revivephonerepair-logo.png" alt="REViVE Phone Repair" width={450} height={161} preload />
        </Link>
      </div>
      <nav className="header-navigation" aria-label="Main navigation">
        <ul>
          {navigation.map(([href, label]) => (
            <li key={href}>
              <Link href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
