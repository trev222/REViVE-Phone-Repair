import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 lg:px-12">
      <section className="rounded-[32px] bg-primary p-8 md:p-16">
        <h1 className="text-5xl">Page not found</h1>
        <p className="mt-6 text-lg">We couldn’t find that page.</p>
        <Link
          className="mt-8 inline-block rounded-full bg-accent px-6 py-4 text-accent-foreground"
          href="/"
        >
          Back to home
        </Link>
      </section>
    </div>
  );
}
