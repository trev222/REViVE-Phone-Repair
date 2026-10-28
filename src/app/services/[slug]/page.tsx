import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/structured-data";
import { servicePages } from "@/lib/service-pages";
import { absoluteUrl, businessId, pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return servicePages.map(({ slug }) => ({ slug }));
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);
  if (!service) notFound();
  return pageMetadata(service.title, service.description, `/services/${slug}`);
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = servicePages.find((item) => item.slug === slug);
  if (!service) notFound();
  const url = absoluteUrl(`/services/${slug}`);
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 lg:px-12">
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": `${url}#service`,
              name: service.title,
              serviceType: service.name,
              description: service.intro,
              url,
              provider: { "@id": businessId },
              areaServed: { "@type": "City", name: "Covington, Louisiana" },
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Home",
                  item: absoluteUrl("/"),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Services",
                  item: absoluteUrl("/services"),
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: service.name,
                  item: url,
                },
              ],
            },
          ],
        }}
      />
      <nav
        aria-label="Breadcrumb"
        className="mb-8 flex flex-wrap gap-2 text-sm text-muted-foreground"
      >
        <Link className="underline" href="/">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link className="underline" href="/services">
          Services
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{service.name}</span>
      </nav>
      <section className="rounded-[32px] bg-primary p-8 md:p-14">
        <p className="text-xs font-medium uppercase tracking-[0.08em]">
          REViVE · Covington, Louisiana
        </p>
        <h1 className="mt-5 max-w-4xl text-4xl leading-[1.08] tracking-[-0.03em] sm:text-6xl">
          {service.title}
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-8">{service.intro}</p>
        <div className="mt-8 flex flex-wrap items-center gap-5">
          <Link
            className="rounded-full bg-accent px-6 py-4 font-medium text-accent-foreground"
            href="/contact"
          >
            Get a quote
          </Link>
          <a className="underline" href={site.phoneHref}>
            Call {site.phone}
          </a>
        </div>
      </section>
      <div className="my-12 grid gap-5 lg:grid-cols-2">
        <section className="rounded-[32px] bg-muted p-8 md:p-12">
          <h2 className="text-3xl">How we can help</h2>
          <ul className="mt-6 list-disc space-y-3 pl-5 leading-7">
            {service.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <section className="rounded-[32px] bg-muted p-8 md:p-12">
          <h2 className="text-3xl">Before you visit</h2>
          <p className="mt-6 leading-8">{service.preparation}</p>
          <Link className="mt-5 inline-block underline" href="/locations">
            Shop hours & directions
          </Link>
        </section>
      </div>
      <section className="max-w-3xl">
        <h2 className="text-3xl">{service.question}</h2>
        <p className="mt-5 leading-8">{service.answer}</p>
      </section>
      <nav
        aria-label="More repair services"
        className="mt-14 border-t border-border pt-8"
      >
        <h2 className="text-2xl">Explore other services</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          {servicePages
            .filter((item) => item.slug !== slug)
            .map((item) => (
              <Link
                key={item.slug}
                className="rounded-full border border-border px-5 py-3 text-sm underline"
                href={`/services/${item.slug}`}
              >
                {item.name}
              </Link>
            ))}
        </div>
      </nav>
    </div>
  );
}
