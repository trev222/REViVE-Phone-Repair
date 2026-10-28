import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/arrow";

export const metadata: Metadata = {
  title: "Phone Repair Guides",
  description:
    "Prepare for your phone repair, battery replacement, or smartphone buyback at REViVE.",
  alternates: { canonical: "/blog" },
};

const guides = [
  {
    title: "Getting a repair quote",
    text: "Tell us your phone’s brand and model, what happened, and whether it still turns on. Let us know if the screen, touch controls, cameras, or charging have stopped working. Those details help us understand the repair you need.",
  },
  {
    title: "Before bringing in your phone",
    text: "Back up your photos, contacts, and other important files if your phone is still working. Bring the device and a note of the issues you’ve noticed. If you’re having charging trouble, tell us which cables and chargers you’ve already tried.",
  },
  {
    title: "Thinking about a buyback?",
    text: "Start with your phone’s model, storage capacity, and condition. Tell us about any cracks or faults. Keep your data on the phone until you’ve backed it up, and ask our team about the steps for removing your accounts and resetting the device before a handover.",
  },
];

export default function GuidesPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 lg:px-12 lg:py-24">
      <h1 className="font-heading text-5xl tracking-[-0.03em] text-foreground sm:text-6xl">
        Phone repair &amp; buyback guides
      </h1>
      <p className="mt-5 max-w-2xl text-lg leading-8 text-secondary-foreground">
        Straightforward guidance for getting your phone repaired, preparing for
        a visit, or selling your old device.
      </p>
      <div className="mt-14 grid gap-4 lg:grid-cols-3">
        {guides.map((guide, index) => (
          <article
            key={guide.title}
            className={`rounded-[32px] p-8 md:p-10 ${index === 0 ? "bg-primary" : "bg-muted"}`}
          >
            <p className="mb-8 text-xs font-medium uppercase tracking-[0.08em] text-secondary-foreground">
              0{index + 1} / Phone care
            </p>
            <h2 className="text-3xl leading-tight tracking-[-0.02em]">
              {guide.title}
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-secondary-foreground">
              {guide.text}
            </p>
          </article>
        ))}
      </div>
      <Link
        href="/contact"
        className="mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-6 py-4 text-[15px] font-medium text-accent-foreground"
      >
        Ask us about your phone <Arrow />
      </Link>
    </div>
  );
}
