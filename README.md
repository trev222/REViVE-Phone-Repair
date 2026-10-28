# REViVE Phone Repair

The client’s GoDaddy design rebuilt with Next.js App Router, React, TypeScript, and Tailwind CSS. Home, Services, About, Contact, and Guides reproduce its green/purple palette, rounded panels, typography, responsive navigation, service selector, and quote form. The Locations tab appears in desktop/mobile navigation and the footer; `/locations` shows the Covington shop's Google map, address, hours, phone number, and directions link.

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

Production uses `POST /api/contact` → the private `revive-contact-email` Worker through a `CONTACT_EMAIL` service binding. The Worker sends through Gmail SMTP over TLS on port 465. Sender and recipient are fixed to `revivecovington@gmail.com`, with the visitor’s address in `Reply-To`. A dedicated Gmail app password is stored only as the encrypted Worker secret `SMTP_PASSWORD`. This uses the existing Workers Free plan and does not need Cloudflare Email Sending or changes to mail DNS. See the activation checklist below: sending is currently paused.

For local development or a conventional Node.js host, [Nodemailer SMTP](https://nodemailer.com/smtp) remains available. Set these server environment variables:

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

Visitors’ addresses are used only for `Reply-To`; recipients and sender come from server configuration. The endpoint validates fields, limits request size, rejects foreign browser origins, and preserves the original hidden anti-spam field. The private email Worker adds rate limits of 5 requests per minute per visitor IP and 30 per minute for the site. These limits are approximate and apply separately in each Cloudflare location; they are not a strict worldwide quota. Shared IPs share a limit. SMTP-only hosting needs equivalent rate limiting or bot protection before enabling delivery.

Keep `.env.local` out of Git. SMTP settings must never use a `NEXT_PUBLIC_` prefix. SMTP delivery needs an authorized sender and provider credentials; tests exercise local SMTP behavior and mocked Gmail sends, not real inbox delivery.

## Cloudflare Pages deployment

Production: [revivephonerepair.com](https://revivephonerepair.com), also available at [www.revivephonerepair.com](https://www.revivephonerepair.com). Pages project: `revive-phone-repair`. Preview: [revive-phone-repair.pages.dev](https://revive-phone-repair.pages.dev).

Both website hostnames point to the Pages project. The 11 legacy service aliases (`autoconfig.admin`, `autoconfig`, `autodiscover.admin`, `autodiscover`, `cpanel`, `ftp`, `webdisk.admin`, `webdisk`, `webmail`, `whm`, and `www.admin`) point through `admin.revivephonerepair.com` to retain the original server routing. The existing admin, mail, MX, SRV, and TXT records were preserved.

The Pages build exports an isolated copy of the Next.js pages to `out/`, then bundles the shared contact handler as a Pages advanced-mode `_worker.js`. The normal Next.js development server remains available. `_routes.json` limits Function execution to `/api/*`; the other pages and assets are served by Pages. `_redirects` preserves the old PHP/HTML URLs and their query strings.

```sh
npm run build:pages
npm run preview:pages
npm run test:pages
```

The suite runs 14 HTTP/SMTP/SEO integration checks against the Cloudflare runtime and 10 email Worker/service adapter checks. It covers fixed recipients, Reply-To, paused delivery, rate-limit failures, and immutable service response headers. Test mail is captured locally or mocked; no real inboxes are contacted.

This project uses **Direct Upload**. Pushing Git commits does not automatically deploy the site. This machine has a separate, approved Wrangler profile named `revive-phone-repair` for the client account. The deploy scripts explicitly select it; the personal default profile is unchanged. On another machine, create the authorized client profile with `wrangler auth create revive-phone-repair`. Deploy the current checkout with:

```sh
npm run deploy:email
npm run deploy:pages
```

The command targets Pages' `main` production deployment branch; the repository's application source remains on `develop`. Alternatively, zip the **contents** of `out/` and upload that ZIP through the Pages dashboard. Never upload the repository, `.env` files, or `node_modules`.

Use compatibility date `2026-10-28` with `nodejs_compat`. The configuration is tracked in `wrangler.jsonc`; its production environment binds `CONTACT_EMAIL` to the private Worker. Preview/local builds omit this live mail binding. Dashboard uploads use the project's runtime settings. Cloudflare's [static Next.js guide](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) and [advanced-mode Function guide](https://developers.cloudflare.com/pages/functions/advanced-mode/) describe this setup.

### Quote email activation — Gmail

On October 29, 2026, the client chose the existing `ReviveCovington@gmail.com` account instead of a Cloudflare paid subscription. The recipient was already verified in Cloudflare, but that verification is not Gmail SMTP authorization.

- The private `revive-contact-email` Worker is deployed with Gmail SMTP and both rate limiters. It has no public workers.dev URL, preview URL, or external route.
- Production Pages calls it through the `CONTACT_EMAIL` binding. `CONTACT_EMAIL_ENABLED` remains `false` until the Gmail credential is added and a test is ready.
- Sender and recipient are fixed in code. Only the customer’s `Reply-To` and validated quote content vary.
- No Cloudflare paid plan was purchased. Existing MX, SPF, and mail-server routing remain unchanged.

**Finish activation:**

1. The client signs into [Google App Passwords](https://myaccount.google.com/apppasswords) as `ReviveCovington@gmail.com`, with 2-Step Verification enabled, and creates an app password named `REViVE website`. The client must complete credential creation and any Google security prompts. Do not use the normal account password or paste credentials into chat/Git.
2. In Cloudflare → Workers & Pages → `revive-contact-email` → Settings → Runtime variables and secrets → Add variable, select **Secret**, enter name **SMTP_PASSWORD**, paste the app password into its value, and deploy/save. This belongs on the private Worker, not the Pages project. Spaces in Google’s displayed app password are removed by the adapter. Alternatively, the account owner can enter it at the hidden prompt from `npx wrangler secret put SMTP_PASSWORD --config cloudflare/email.wrangler.jsonc --profile revive-phone-repair`.
3. Confirm the secret name exists without exposing its value. Set `CONTACT_EMAIL_ENABLED` to `"true"` in `cloudflare/email.wrangler.jsonc`, run `npm run typecheck` and `node --test tests/contact-email.test.mjs`, then `npm run deploy:email`. Commit/push the activation change. Pages does not need rebuilding.
4. Submit one clearly labelled test quote while the client can check Gmail. Confirm it reaches Inbox or Spam, includes every quote field, and Reply addresses the customer. A successful API response proves SMTP acceptance, not inbox receipt. If Google rejects authentication, verify the correct account/app password; do not weaken TLS or disable account protections.
5. If delivery fails, return the flag to `"false"` and redeploy while investigating. The form keeps direct email/phone alternatives and never reports delivery on an SMTP rejection.

App passwords can be revoked by the client. Google password changes revoke app passwords, so create a new one and replace the encrypted Worker secret if the account password changes. Gmail sending limits still apply; revisit the provider if volume grows.

**There is no queue or saved-lead database.** Unavailable/failed submissions are not stored or sent later. Visitors must email/call directly or retry after activation. Do not tell the client quote delivery is live until the final inbox test succeeds.

References: [Google app password setup](https://support.google.com/accounts/answer/185833), [Cloudflare Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/), and [rate-limit scope](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/).

### Search and AI discovery

All ten public pages have unique titles and descriptions, production canonical URLs, Open Graph and Twitter card metadata, and pre-rendered HTML. Four service detail pages cover screen repair, battery/charging repair, water damage/data recovery, and phone buyback. The service index and related-service links make each page discoverable without interacting with the service selector.

JSON-LD identifies the local business, address, phone, public hours, social profiles, and website. Service pages also include Service and BreadcrumbList data. Facts match the visible site; no invented prices or ratings are included. Keep business details and opening hours consistent with the client's Google Business Profile when they change.

`/sitemap.xml` lists the ten canonical pages. `/robots.txt` permits search indexing and explicitly permits OAI-SearchBot, Claude-SearchBot, and PerplexityBot while excluding the contact API. Cloudflare AI Crawl Control was checked: the individual block switches for major search/AI search crawlers were off. Successful requests with their user-agent headers were checked; this is not a guarantee of access from every crawler IP or future indexing.

Cloudflare has an enabled redirect rule named `Canonical www to revivephonerepair.com`, returning 308 from `https://www.revivephonerepair.com/*` to the corresponding apex URL and preserving query strings. The Pages preview retains production canonical URLs.

The domain property is verified in Google Search Console using a DNS TXT record. Google successfully processed the sitemap and discovered all ten pages on October 28, 2026. Its live Rich Results Test validated LocalBusiness, Organization, and BreadcrumbList data on the screen-repair page; the only non-critical recommendation was an optional `priceRange`, omitted until pricing is confirmed. Keep the verification record to retain access. Give the client's own Google account independent verified-owner access before handover; a managing account should not remain their only owner. Search indexing and AI citations are determined by the search providers, not guaranteed by metadata or an AI-specific text file.

Bing Webmaster Tools is also verified using a DNS-only CNAME record pointing to `verify.bing.com`. The same sitemap was submitted on October 28, 2026 and accepted with a `Processing` status. Keep this verification record as well. Google and Bing reporting will populate as their crawlers process the site; sitemap submission does not mean every page has been indexed.

### Standard Node.js hosting

The app can also run on a conventional Node.js host with `npm ci`, `npm run build`, and `npm start`. Set runtime variables before starting it. Static-only or PHP-only hosting cannot run its Next.js contact route; Cloudflare Pages uses the bundled Function instead. Fonts and images are hosted locally.

## Structure

- `src/app/`: pages, metadata, shared styles, contact endpoint.
- `src/components/`: navigation, service catalog, contact form, footer.
- `src/lib/`: business details, service content, shared contact request validation/delivery.
- `cloudflare/worker.ts`: Pages Function adapter.
- `cloudflare/contact-email.ts`: private, rate-limited Cloudflare email Worker.
- `cloudflare/email.wrangler.jsonc`: fixed recipient, activation switch, and Worker deployment settings.
- `scripts/build-pages.mjs`: isolated static export and Function bundling.
- `public/`: original photos, logo, social icons, favicons.
- `tests/`: production HTTP and local SMTP integration checks.

Business claims, testimonials, warranty, and service descriptions follow the client’s GoDaddy reference. Address, phone, email, and shop photos are retained from the original repository.

The quote form sends first/last name, email, optional phone, service, preferred date/contact time, and device notes to the configured mailbox. Preferred dates are requests, not confirmed bookings. Existing name/message API submissions remain supported. Real delivery remains paused pending the encrypted Gmail app password and an inbox test with the client.

Format source with `npx prettier --write src tests tailwind.config.ts postcss.config.mjs`.
