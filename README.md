# REViVE Phone Repair

The original website rebuilt with Next.js App Router, React, and TypeScript. All five pages, eight slideshow photos, brand assets, Covington contact details, and service copy are carried over from the PHP site.

## Branches

- `php-archive` preserves the complete PHP site and history at `a3d7fc9ecac48e09bac4e63f8c6baefcf2633bb2`.
- `develop` contains the Next.js replacement.
- Only `master` existed when migration began; `develop` was created for this version. `master` still points to the original site.

## Run locally

Use Node.js 22 or newer and npm:

```sh
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

Open [localhost:3000](http://localhost:3000). Pages and assets work without email credentials. The contact form reports that it is unavailable until SMTP is configured; it never claims delivery when sending fails.

```sh
npm run typecheck
npm test
```

`npm test` creates a production build and runs integration tests against temporary local Next.js and SMTP servers. It covers pages, redirects, assets, metadata, malformed and oversized requests, email delivery and rejection, the honeypot, and missing configuration. Test mail stays on this machine; no messages are sent to the business. Ports are assigned automatically and test servers shut down afterward.

## Email setup

PHP `mail()` is replaced by `POST /api/contact`, using [Nodemailer SMTP](https://nodemailer.com/smtp). Set these server environment variables:

| Variable | Purpose |
| --- | --- |
| `SMTP_HOST` | Email provider’s SMTP hostname. Required. |
| `SMTP_PORT` | SMTP port; defaults to `587`. |
| `SMTP_SECURE` | `true` for implicit TLS (normally `465`); `false` for STARTTLS (normally `587`). Defaults according to port. |
| `SMTP_REQUIRE_TLS` | Requires encrypted delivery unless explicitly `false` for a trusted local test relay. Defaults to `true`. |
| `SMTP_USER`, `SMTP_PASSWORD` | Provider credentials; supply both together. May be omitted for a network relay that does not require authentication. |
| `CONTACT_FROM` | Sender address approved by the provider. Required. |
| `CONTACT_TO` | Recipient; defaults to the original `ReviveCovington@gmail.com`. |
| `SITE_URL` | Canonical public origin for SEO and form origin checking; defaults to `https://www.revivephonerepair.com`. |

Visitors’ addresses are used only for `Reply-To`; recipients and sender come from server configuration. The endpoint validates fields, limits request size, rejects foreign browser origins, and preserves the original hidden anti-spam field. Configure rate limiting or bot protection for `/api/contact` at your hosting platform before opening it to public traffic. The honeypot is basic filtering, not a distributed rate limiter.

Keep `.env.local` out of Git. SMTP settings must never use a `NEXT_PUBLIC_` prefix. Production delivery needs an authorized sender and provider credentials; tests exercise local SMTP behavior, not real inbox delivery.

## Deploy

Use a Node.js host that supports [Next.js](https://nextjs.org/docs/app/getting-started/deploying), such as Vercel or a server running:

```sh
npm ci
npm run build
npm start
```

Set environment variables before building/running. The default port is `3000`; set `PORT` to override. Static-only hosting or PHP-only Apache cannot run the contact endpoint. No Apache rewrite rules or PHP runtime are needed.

Old `/index`, `/location`, and `.php`/`.html` page URLs permanently redirect to their Next.js equivalents, preserving query strings. Image URLs under `/css/img/` and favicon URLs remain available. Next.js generates the sitemap, robots, and web manifest. Fonts are bundled locally.

## Structure

- `src/app/`: pages, metadata, shared styles, contact endpoint.
- `src/components/`: navigation, accessible slideshow, contact form.
- `src/lib/site.ts`: business content, contact details, map links.
- `public/`: original photos, logo, social icons, favicons.
- `tests/`: production HTTP and local SMTP integration checks.

Business claims, hours, address, warranty, and service descriptions are preserved from the original site. Review them with the business before launching a new production version.
