# REViVE technical handover

Operational snapshot: October 29, 2026. Read this with [AGENTS.md](../AGENTS.md), the [client guide](CLIENT_GUIDE.md), and [README.md](../README.md). Verify the current checkout and remote account state before making changes; dated observations below are not continuous monitoring.

## Start with the correct source and account

| Item | Value |
| --- | --- |
| Repository | `https://github.com/trev222/REViVE-Phone-Repair.git` (public) |
| Application source | `develop` |
| Default GitHub branch at handover | `master`, still the original PHP site |
| Preserved PHP branch | `php-archive`, commit `a3d7fc9ecac48e09bac4e63f8c6baefcf2633bb2` |
| Live site | `https://revivephonerepair.com` |
| Pages project | `revive-phone-repair` |
| Pages project hostname | `https://revive-phone-repair.pages.dev` |
| Cloudflare account | Client account associated with `ReviveCovington@gmail.com` |
| Account ID | `f64f0d6c66ae5bd8797a4d4f04b68cff` |
| Wrangler profile | `revive-phone-repair` |
| Private email Worker | `revive-contact-email` |

GitHub user `clayb1919` was invited on October 29, 2026 with **write** access to this repository only. The invitation was pending when checked. It confers no Cloudflare, Resend, Gmail, or search-tool access. Do not assume access has been accepted or grant broader privileges from this document.

The existing machine's **default Wrangler profile belongs to the developer's personal account**. Use the named client profile in the scripts. On another machine, authenticate an authorized client user; credentials and secrets are not transferred by cloning the repository. The Pages config omits `account_id` because that field is unsupported there; the private Worker config pins the client account ID.

## Architecture

- Next.js App Router `16.4.3`, React `19.3.1`, TypeScript, Tailwind, npm, Node.js 22 or newer. Use `.nvmrc` and the lockfile. Read the relevant bundled Next documentation in `node_modules/next/dist/docs/` before changing framework code.
- `scripts/build-pages.mjs` builds an isolated static export, excluding the Next API route, then bundles `cloudflare/worker.ts` as the Pages advanced-mode `out/_worker.js`. It generates `_routes.json`, `_redirects`, and `_headers`. Edit source, not `out/` or temporary `.pages-build-*` copies.
- Pages executes the Worker for `/api/*`. Production `/api/contact` forwards through the `CONTACT_EMAIL` service binding to the private email Worker. The production binding is in `wrangler.jsonc`; preview intentionally has no live mail binding.
- A normal local/Node Next server uses `src/app/api/contact/route.ts` and the SMTP adapter. Local SMTP configuration is separate from production Resend delivery. Do not try to fix production by adding Gmail credentials to `.env.local`.
- Hosting is **Cloudflare Pages Direct Upload**. GitHub pushes do not trigger deployment. `--branch main` in the deploy script selects the Pages production label; it does not change the source branch from `develop`.

## First-time setup and normal changes

```sh
git clone --branch develop https://github.com/trev222/REViVE-Phone-Repair.git
cd REViVE-Phone-Repair
nvm use
npm ci
cp .env.example .env.local
npm run dev
```

`nvm` is optional if an appropriate Node version is already installed. `.env.local` is optional for visual work and must remain untracked. The local form correctly reports unavailable if SMTP is not configured.

For an existing checkout, inspect `git status`, the current branch, and local changes before pulling. Use `git pull --ff-only origin develop` on a clean `develop` checkout. Do not overwrite work or switch to `master` as a starting point.

On a new deployment machine, run `npx wrangler auth create revive-phone-repair` and complete authorized sign-in to the client account. Inspect `npx wrangler auth list` and the account selected during authentication. Authentication is an access grant, not permission to buy a plan or change mail routing.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local Next development preview. |
| `npm run typecheck` | Generate Next types and check TypeScript. |
| `npm test` | Build Next and run the local/Node test suite. |
| `npm run build:pages` | Build the production Pages artifact into `out/`. |
| `npm run preview:pages` | Preview the existing `out/` artifact locally. |
| `npm run test:pages` | Build and run tests against Pages plus the email adapter/runtime tests. |
| `npm run deploy:pages` | Build and publish the website using the named client profile. |
| `npm run deploy:email` | Publish only the private email Worker using the named client profile. |

For ordinary content/layout changes, review the affected pages at desktop and mobile widths, run typecheck and `test:pages`, then deploy Pages when publishing is authorized. Commit/push the matching source on `develop` and report the source commit and deployment. Documentation-only changes need link/content review, not an application deployment.

For email Worker/adapter changes, use typecheck plus:

```sh
node --test tests/contact-email.test.mjs tests/contact-resend-runtime.test.mjs
```

Run broader tests if shared validation or the Pages adapter changes. The suite currently contains 14 HTTP/SMTP/SEO integration tests and 11 email adapter/service/runtime tests. All test mail is local or intercepted. A real form submission sends to the client and needs authorization for that send; this handover does not authorize extra test messages.

## Content map and linked changes

| Area | Files and dependencies |
| --- | --- |
| Shared business contact details | `src/lib/site.ts`; phone and `phoneHref` must agree. Public email is independent of the delivery recipient. |
| Hours | `src/app/locations/page.tsx`, `src/components/site-footer.tsx`, and `openingHoursSpecification` in `src/lib/seo.ts`. |
| Address and maps | `site.ts` address, `mapsUrl`, `mapsEmbed`; separate structured address in `seo.ts`; page metadata and any location-specific copy. |
| Home and About | `src/app/page.tsx`, `src/app/about/page.tsx`. |
| Service selector and detail pages | `src/lib/services.ts`, `src/lib/service-pages.ts`, `src/components/service-catalog.tsx`, `src/app/services/[slug]/page.tsx`. |
| Guides | `src/app/blog/page.tsx`; public URL remains `/blog`. |
| Contact UI and accepted values | `src/components/contact-form.tsx` and `src/lib/contact.ts`. Keep option values and validation aligned. |
| Navigation and footer | `src/components/site-header.tsx`, `src/components/site-footer.tsx`. |
| Styling | `src/app/globals.css`, `src/styles/*.css`, Tailwind config, and component classes/inline styles. |
| Images and fonts | `public/images/`, `public/css/img/`, and bundled font packages. Preserve case-sensitive paths and descriptive alt text. |
| SEO | Per-page metadata, `src/lib/seo.ts`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/layout.tsx`. |

Search for the old value across `src/` before calling a business-detail edit complete. Address and hours are not fully centralized. Social links are repeated in the footer and `seo.ts`. New standalone pages need sitemap entries and internal links; service slugs flow into the sitemap from `servicePages`.

Keep client-approved business claims, pricing, reviews, warranty, and turnaround accurate. Do not invent ratings, opening hours, guarantees, or addresses. Keep Google Business Profile consistent through a separately authorized update.

## Production quote delivery

Flow: browser `POST /api/contact` → Pages adapter → private `revive-contact-email` Worker → Resend HTTPS API → client's Gmail.

| Setting | Current value |
| --- | --- |
| Resend team | Developer-managed `voric41` team |
| Verified sending domain | `notifications.revivephonerepair.com`, North Virginia region |
| Sender | `REViVE website quotes <quotes@notifications.revivephonerepair.com>` |
| Fixed recipient | `revivecovington@gmail.com` |
| Reply-To | Visitor's validated email address |
| Subject | `Revive my Phone!` |
| Secret | `RESEND_API_KEY`, encrypted on the private Worker |
| Activation | `CONTACT_EMAIL_ENABLED: "true"` in `cloudflare/email.wrangler.jsonc` |

Sender/recipient are fixed in `src/lib/contact-resend.ts`. `CONTACT_TO` and `CONTACT_FROM` from the SMTP environment do not configure production Resend. Changing the public email in `site.ts` does not change delivery. Change the adapter and tests, deploy the email Worker, and update/publish public content separately if appropriate.

`RESEND_API_KEY` is a **Sending access** key restricted to the notification domain, named `REViVE website quotes`. Never print it, commit it, include it in a `NEXT_PUBLIC_` variable, or pass it as a visible shell argument. Rotate it through Resend and the Cloudflare dashboard or the hidden prompt:

```sh
npx wrangler secret put RESEND_API_KEY --config cloudflare/email.wrangler.jsonc --profile revive-phone-repair
```

Confirm the secret name exists without reading its value. Keep old/new keys overlapping only as needed for a verified rotation, then revoke the old key. Resend receiving is disabled. No Gmail app password or Workers Paid subscription is needed by this deployed design.

The handler validates fields, allowed service values, email header input, browser origin, and a 24 KB request limit; it includes a honeypot. The private Worker requires the secret, activation, rate-limit bindings, and visitor IP, and exposes no public Worker route or preview URL. Limits are 5 requests/minute/IP and 30/minute/site, approximate per Cloudflare location, not strict global quotas. Resend's free allowance was 100/day and 3,000/month at setup; check current account quotas and usage. They are shared by the Resend account.

Success requires a successful Resend HTTP status and a nonempty message ID. The adapter has a 15-second timeout and no automatic retries. Ambiguous failures may already have sent mail; investigate before resubmitting. Use `redirect: "manual"` and reject redirects. **Workers rejects `redirect: "error"`**; keep the actual workerd regression test in `tests/contact-resend-runtime.test.mjs`. Its outbound requests are intercepted and cannot send mail.

There is **no database, queue, or saved-lead dashboard**. Failed/unavailable submissions are not stored or replayed. Do not log customer message bodies or provider response bodies. A preferred date is an inquiry, not a booking confirmation.

## DNS and search settings to retain

The three Resend records are limited to the notification subdomain:

| Type | Name relative to the zone | Target or source |
| --- | --- | --- |
| TXT | `resend._domainkey.notifications` | Use the exact public DKIM value shown by the verified Resend domain. |
| CNAME | `rsend.notifications` | `rsend.forge.rmta.net`, DNS only. |
| CNAME | `send.notifications` | `send.forge.rmta.net`, DNS only. |

Preserve existing apex MX/SPF, mail/admin A records, SRV records, Google verification TXT, and Bing verification CNAME. The dashboard apex MX points to `mail.revivephonerepair.com`; public DNS can expose Cloudflare's `_dc-mx` alias. Mail and admin retain the original `107.180.39.228` server. Do not enable apex Cloudflare Email Routing or replace the existing incoming-mail records to troubleshoot outbound form email.

Eleven legacy CNAME aliases route through `admin.revivephonerepair.com`: `autoconfig.admin`, `autoconfig`, `autodiscover.admin`, `autodiscover`, `cpanel`, `ftp`, `webdisk.admin`, `webdisk`, `webmail`, `whm`, and `www.admin`. Keep them intact during website changes.

The enabled Cloudflare rule `Canonical www to revivephonerepair.com` redirects www to apex with status 308 and preserves path/query. Pages generates redirects for old PHP/HTML page URLs. Ten public pages have metadata/canonicals, local-business structured data, and a sitemap. Search crawlers and OAI-SearchBot, Claude-SearchBot, and PerplexityBot are permitted by robots; `/api/` is excluded. Do not promise ranking, indexing, or AI citations.

Google Search Console and Bing were verified through the managing Google account `voric41@gmail.com`. Google processed the ten-page sitemap on October 28; Bing accepted it with Processing status at that check. Client-controlled access remains a handover task, not completed ownership transfer.

## Evidence and recovery

- Last email implementation commit before this documentation: `8503cc1` (`Activate quote delivery through Resend`). Typecheck and all 11 email adapter/service/runtime checks passed then. The older 14 integration checks had passed previously; they were not rerun for that adapter-only change.
- Live Worker version `abbbdbca-6a11-4f86-b3f1-b7e6062ba53b` was active with sending enabled at the October 29 check.
- One authorized test quote submitted through the live form produced Resend ID `01a184c2-ed14-7b57-8a6f-d4ab782456d7`, status Delivered at October 28, 2026 23:05 UTC (October 29 08:05 JST). [Delivery record](https://resend.com/emails/01a184c2-ed14-7b57-8a6f-d4ab782456d7). Recipient Inbox/Spam placement remains for the client to confirm.
- No paid plan was purchased. Existing inbound mail was preserved. Client access to Resend and independent search ownership still need arranging; do not treat this document as approval for those grants or a billing change.

If the site breaks, use the last known working **production** deployment's rollback control in Cloudflare Pages, then revert the faulty source commit with a new commit on `develop` and publish the corrected source. Avoid resetting or force-pushing shared history. Inspect the chosen deployment and bindings before rollback; website and email Worker releases are independent.

If quotes fail, inspect Resend delivery events/quotas/domain status, Worker secret-name presence, activation and rate-limit bindings, and the Pages `CONTACT_EMAIL` binding. To pause delivery, set `CONTACT_EMAIL_ENABLED` to `"false"`, test and deploy the email Worker, and commit/push the flag. Restore it and redeploy once fixed. The site will show the unavailable message with contact alternatives. Do not claim failed leads can be recovered.

For an email regression, revert the relevant source/config changes and redeploy the private Worker. Do not remove the private service or secret as an incidental troubleshooting step. Request permission before a real test message, then distinguish provider acceptance, recipient-server delivery, and the client's actual inbox check.

Update this handover, README, and the client guide when workflows or account responsibilities change. `CLIENT_GUIDE.md` is the editable text source for `REViVE-Website-Guide.docx`; regenerate and visually review the Word copy after substantive client-guide edits.

## Provider references

- [Cloudflare static Next.js deployment](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/)
- [Pages advanced mode](https://developers.cloudflare.com/pages/functions/advanced-mode/)
- [Worker secrets](https://developers.cloudflare.com/workers/configuration/secrets/)
- [Rate-limit binding scope](https://developers.cloudflare.com/workers/runtime-apis/bindings/rate-limit/)
- [Resend domain setup](https://resend.com/docs/dashboard/domains/introduction)
- [Resend API keys](https://resend.com/docs/dashboard/api-keys/introduction)
- [Resend pricing and current quotas](https://resend.com/pricing)
