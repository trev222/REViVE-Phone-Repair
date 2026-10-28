# REViVE Phone Repair

The client’s GoDaddy design rebuilt with Next.js App Router, React, TypeScript, and Tailwind CSS. Home, Services, About, Contact, and Guides reproduce its green/purple palette, rounded panels, typography, responsive navigation, service selector, and quote form. The original Covington location remains available at `/locations` and through the contact page.

The source is independent of GoDaddy: no builder scripts, editor chrome, promotional badges, or remote font dependency. Questrial and Be Vietnam Pro are bundled locally. The exact client logo and repair hero are stored in `public/images/`; the original shop photos replace leftover solar images. The empty roofing guide page is replaced with phone-repair and buyback guidance. Unbuilt legal links and unconfigured social accounts are omitted; the original business email and real social links are retained.

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
| `SITE_URL` | Canonical public origin for SEO and form origin checking; defaults to `https://revivephonerepair.com`. |

Visitors’ addresses are used only for `Reply-To`; recipients and sender come from server configuration. The endpoint validates fields, limits request size, rejects foreign browser origins, and preserves the original hidden anti-spam field. Configure rate limiting or bot protection for `/api/contact` at your hosting platform before opening it to public traffic. The honeypot is basic filtering, not a distributed rate limiter.

Keep `.env.local` out of Git. SMTP settings must never use a `NEXT_PUBLIC_` prefix. Production delivery needs an authorized sender and provider credentials; tests exercise local SMTP behavior, not real inbox delivery.

## Cloudflare Pages deployment

Target custom domain: `https://revivephonerepair.com`. Pages project: `revive-phone-repair`. Preview: [revive-phone-repair.pages.dev](https://revive-phone-repair.pages.dev).

The Pages build exports an isolated copy of the Next.js pages to `out/`, then bundles the shared contact handler as a Pages advanced-mode `_worker.js`. The normal Next.js development server remains available. `_routes.json` limits Function execution to `/api/*`; the other pages and assets are served by Pages. `_redirects` preserves the old PHP/HTML URLs and their query strings.

```sh
npm run build:pages
npm run preview:pages
npm run test:pages
```

The same 12 HTTP/SMTP tests run against the actual Cloudflare runtime. Test email is captured locally. No real inboxes are contacted by the tests.

This project uses **Direct Upload**. Pushing Git commits does not automatically deploy the site. After signing into Wrangler on an authorized machine, deploy the current checkout with:

```sh
npm run deploy:pages
```

The command targets Pages' `main` production deployment branch; the repository's application source remains on `develop`. Alternatively, zip the **contents** of `out/` and upload that ZIP through the Pages dashboard. Never upload the repository, `.env` files, or `node_modules`.

Use compatibility date `2026-10-28` with `nodejs_compat`. The configuration is tracked in `wrangler.jsonc`; dashboard uploads use the project's runtime settings. Cloudflare's [static Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) and [advanced-mode Function guide](https://developers.cloudflare.com/pages/functions/advanced-mode/) describe this setup.

### Quote email setup

In Pages → Settings → Variables and Secrets, add the SMTP configuration listed above. Store `SMTP_PASSWORD` as an encrypted secret. The default recipient remains `ReviveCovington@gmail.com`; use a sender authorized by the mail provider. Use port 465 with `SMTP_SECURE=true`, or port 587 with STARTTLS and `SMTP_REQUIRE_TLS=true`. Redeploy after changing runtime settings. Until configured, the form displays direct email/phone alternatives and does not claim that a message was delivered.

### Standard Node.js hosting

The app can also run on a conventional Node.js host with `npm ci`, `npm run build`, and `npm start`. Set runtime variables before starting it. Static-only or PHP-only hosting cannot run its Next.js contact route; Cloudflare Pages uses the bundled Function instead. Fonts and images are hosted locally.

## Structure

- `src/app/`: pages, metadata, shared styles, contact endpoint.
- `src/components/`: navigation, service catalog, contact form, footer.
- `src/lib/`: business details, service content, shared contact request validation/delivery.
- `cloudflare/worker.ts`: Pages Function adapter.
- `scripts/build-pages.mjs`: isolated static export and Function bundling.
- `public/`: original photos, logo, social icons, favicons.
- `tests/`: production HTTP and local SMTP integration checks.

Business claims, testimonials, warranty, and service descriptions follow the client’s GoDaddy reference. Address, phone, email, and shop photos are retained from the original repository.

The quote form sends first/last name, email, optional phone, service, preferred date/contact time, and device notes to the configured mailbox. Preferred dates are requests, not confirmed bookings. Existing name/message API submissions remain supported. SMTP credentials still need to be configured for real delivery.

Format source with `npx prettier --write src tests tailwind.config.ts postcss.config.mjs`.
