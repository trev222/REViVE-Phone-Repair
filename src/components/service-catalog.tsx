"use client";

import Link from "next/link";
import { useState } from "react";
import { serviceCatalog } from "@/lib/services";
import { Arrow } from "./arrow";

export function ServiceCatalog() {
  const [selected, setSelected] = useState(0);
  const service = serviceCatalog[selected];
  return (
    <div className="services-layout">
      <div className="services-mobile-select-wrap">
        <label
          htmlFor="service-select"
          className="mb-2 block text-[11px] font-medium uppercase tracking-[0.09em] text-muted-foreground"
        >
          Jump to a service
        </label>
        <div className="services-select-outer">
          <select
            id="service-select"
            className="services-select"
            value={selected}
            onChange={(event) => setSelected(Number(event.target.value))}
          >
            <optgroup label="Repairs">
              {serviceCatalog.slice(0, 3).map((item, i) => (
                <option value={i} key={item.label}>
                  {item.label}
                </option>
              ))}
            </optgroup>
            <optgroup label="Buyback">
              <option value={3}>Smartphone buyback</option>
            </optgroup>
          </select>
          <span className="services-select-chevron" aria-hidden="true">
            ⌄
          </span>
        </div>
      </div>
      <div className="services-nav-wrap">
        <nav className="services-list-col" aria-label="Service categories">
          {serviceCatalog.map((item, i) => (
            <div key={item.label}>
              {(i === 0 || i === 3) && (
                <p className="px-[14px] pb-[6px] pt-4 text-[11px] font-medium uppercase tracking-[0.09em] text-muted-foreground">
                  {i === 0 ? "Repairs" : "Buyback"}
                </p>
              )}
              <button
                type="button"
                className="service-category"
                aria-pressed={selected === i}
                aria-controls="service-panel"
                onClick={() => setSelected(i)}
              >
                <span>{item.label}</span>
                <span className="service-count">
                  {item.items.length} services
                </span>
              </button>
            </div>
          ))}
        </nav>
      </div>
      <section
        id="service-panel"
        aria-live="polite"
        aria-labelledby="service-panel-title"
        className={`services-panel-col service-panel service-panel--${selected}`}
      >
        <span className="service-eyebrow">{service.eyebrow}</span>
        <h2 id="service-panel-title">{service.title}</h2>
        <p className="service-description">{service.description}</p>
        <ul className="service-items">
          {service.items.map((item) => (
            <li key={item}>
              <span>{item}</span>
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="m3 8 3.5 3.5L13 4" />
              </svg>
            </li>
          ))}
        </ul>
        <div className="service-panel-action">
          <Link
            href="/contact"
            className={`panel-cta-btn panel-cta-btn--${selected === 3 ? "light" : "dark"}`}
          >
            Get a quote
            <span className="svc-arrow-chip">
              <Arrow size={10} />
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
