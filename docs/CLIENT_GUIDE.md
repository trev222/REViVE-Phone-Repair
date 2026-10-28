# REViVE Website Guide

Prepared for REViVE Phone Repair by the website development team. Updated October 29, 2026.

This guide explains how to change your website, publish updates, and handle quote requests. You can make small text changes in GitHub or ask an AI coding assistant to help. Keep this guide with the website files so the next person can continue the work.

**The main thing to remember:** saving a change in GitHub does not put it on the live website. A separate Cloudflare publish step is required.

## Start here

Your live website is [revivephonerepair.com](https://revivephonerepair.com). It is built with Next.js and hosted on Cloudflare Pages. Editing the old GoDaddy builder will not update this website.

| Service | What you use it for |
| --- | --- |
| GitHub | Store and edit the website files and their history. |
| Cloudflare | Publish the website and run the quote form. |
| Resend | Send quote emails and check delivery status. |
| Gmail | Read customer requests and reply to customers. |
| Google Search Console and Bing Webmaster Tools | Check how search engines discover the website. |

Open the [current website files on GitHub](https://github.com/trev222/REViVE-Phone-Repair/tree/develop). Always select the **develop** branch, which is the current website version. GitHub currently opens **master** by default; that is the old PHP site. **php-archive** also preserves the old site.

GitHub user **clayb1919** was invited with write access to this repository on October 29, 2026. Accept the [repository invitation](https://github.com/trev222/REViVE-Phone-Repair/invitations) while signed into that account. This invitation does not give access to other repositories or to Cloudflare, Resend, or Gmail.

<!-- pagebreak -->

## Make a small change

1. Open the GitHub link above and confirm the branch says **develop**.
2. Open the relevant file from the table below, then choose the pencil or **Edit** button.
3. Change only the wording you intend to change. Keep the surrounding quotes, commas, brackets, and HTML tags. Ask an AI assistant if you are unsure.
4. Choose **Commit changes**, add a short description such as “Update shop phone number,” and save to **develop** if GitHub permits it. A commit is a saved version you can return to later.
5. Follow the publish steps on the next page. If GitHub requires a pull request, have it reviewed and merged into **develop** first.

| What you want to change | Where to look |
| --- | --- |
| Phone, public email, address, map links | `src/lib/site.ts` |
| Home page wording | `src/app/page.tsx` |
| About page wording | `src/app/about/page.tsx` |
| Services overview | `src/lib/services.ts` |
| Individual service pages | `src/lib/service-pages.ts` |
| Repair guides | `src/app/blog/page.tsx` |
| Hours and location page | `src/app/locations/page.tsx` |
| Footer, including hours and social links | `src/components/site-footer.tsx` |
| Logo and photos | `public/images/` and `public/css/img/` |

**Hours need three updates:** the Locations page, the footer, and the search-engine business information in `src/lib/seo.ts`. Also update your Google Business Profile separately.

For a phone change, update both `phone` and `phoneHref` in `site.ts`. For an address change, also update the map links, the address in `seo.ts`, and any page wording that names the old location. Ask the assistant to search the whole project for the old value.

For photos, upload an image you have permission to use. Keeping the same filename, capitalization, and file type avoids changing the image reference. If you use a new filename, update the reference and its image description. Check the mobile layout afterward.

Changing the public email in `site.ts` does **not** change where quote emails arrive. That setting is separate; see the quote section.

<!-- pagebreak -->

## Publish your changes

Publishing makes the saved files visible to customers. You need authorized access to the client's Cloudflare account as well as GitHub. You do not need to publish the email Worker for an ordinary text or photo update.

### The easiest way with an AI assistant

Open the repository in your coding assistant and paste this request, replacing the example change:

> Read AGENTS.md, docs/CLIENT_GUIDE.md, and docs/AI_HANDOVER.md. Work from the latest develop branch. Change [describe exactly what should change]. Check all related visible text, map links, and SEO details. Preview the result and run the appropriate checks. Publish the approved change to revivephonerepair.com using the client Cloudflare profile revive-phone-repair, then commit and push the final source changes to develop. Report the commit and deployment. Preserve the email setup and existing mail DNS. Do not send test emails unless I request one.

### Publishing from a computer

These steps are for someone comfortable using a terminal. Start in a clean checkout on **develop**. If the computer is not set up yet, ask the assistant to follow the first-time setup in `docs/AI_HANDOVER.md`.

```sh
git pull --ff-only origin develop
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000) to review the site. Stop the preview with **Ctrl+C**, then run:

```sh
npm run typecheck
npm run test:pages
npm run deploy:pages
```

If a check fails, fix it before publishing. The deploy command builds and uploads the website using the saved **revive-phone-repair** Cloudflare profile. It must belong to the client account. A new computer needs its own authorized sign-in; credentials are not included in GitHub.

After publishing, open the live site in a private browser window. Check the changed page on a phone and a computer, plus the navigation, phone link, and map directions. Local form delivery may be unavailable without local email settings; this does not mean production email is broken. Automated tests use simulated or local mail.

The publish command mentions **main** because that is Cloudflare's production deployment label. Keep editing the GitHub **develop** branch.

<!-- pagebreak -->

## Read and reply to quote requests

Quote requests go to **ReviveCovington@gmail.com**. The subject is **Revive my Phone!**. They are sent as **REViVE website quotes** from **quotes@notifications.revivephonerepair.com**.

The path is: customer submits the website form, Cloudflare checks the request, Resend sends the email, and Gmail receives it. Pressing **Reply** in Gmail should address the customer because the form sets their email as the reply address. Check the recipient before sending.

The email includes the customer's name, email, optional phone number, requested service, preferred date and contact time, and device notes. A preferred date is a request, not a confirmed appointment. Follow up with the customer to confirm arrangements.

**There is no separate customer dashboard or backup lead list.** Failed requests are not saved for later delivery. The form shows an error and provides phone and direct-email alternatives. Do not assume a request is waiting in a queue.

### If a message seems missing

1. Search Gmail for **Revive my Phone!** and check Spam and All Mail.
2. In Resend, open **Emails** and find the request. A **Delivered** event means Gmail's server accepted it; it does not prove it is in the Inbox.
3. If Resend shows a failure or no matching email, ask the website maintainer to check the form, sending allowance, domain verification, and Cloudflare Worker. Do not repeatedly submit customer details while investigating.

The live form test was delivered to Gmail's server on October 28, 2026 at 23:05 UTC, which was October 29 in Japan. The client still needs to confirm Inbox or Spam placement.

### Change the receiving address

Ask the maintainer to change the fixed recipient in `src/lib/contact-resend.ts`, update the relevant tests, and publish with `npm run deploy:email`. Also update `src/lib/site.ts` and publish the website if the public contact email should change. Gmail passwords are not needed for this setup.

The setup uses the free Cloudflare Workers and Resend plans. At setup, Resend's allowance was 3,000 emails per month and 100 per day, shared by its account. Check the current dashboard before increasing usage. If the allowance is exhausted, the form reports an error.

<!-- pagebreak -->

## Keep access and recover from problems

GitHub access lets you edit files. Separate account access is needed to publish, investigate emails, or manage search tools. Use individual logins and invitations instead of sharing passwords.

| Account or tool | Current handover position |
| --- | --- |
| GitHub | `clayb1919` has a repository-only write invitation to accept. |
| Cloudflare | Client account is associated with ReviveCovington@gmail.com. Each maintainer needs authorized deployment access. |
| Resend | Managed through the developer's `voric41` team. Arrange suitable client access or a client-owned account before ending the maintenance arrangement. |
| Google Search Console and Bing | Set up through the developer's Google account. Arrange the client's own access; Google should have a client-controlled verified owner. |
| Gmail | Client controls the destination mailbox. No Gmail password is stored in the website. |

### If a change goes wrong

**The website still looks old:** confirm your edit is on **develop** and the Cloudflare publish step finished successfully. Try a private browser window.

**A new update breaks a page:** ask the maintainer to restore the last working production deployment in Cloudflare Pages. They should also revert the faulty Git commit on **develop** so a later publish does not bring the problem back. Website and email Worker deployments are separate.

**Quotes stop working:** check Resend and Gmail first. A maintainer can pause the form's delivery while investigating. Failed requests cannot be recovered from the website because they are not stored.

### Keep search information accurate

Search metadata, a sitemap, and local-business information are already included. Keep the name, address, hours, and phone consistent across the website and Google Business Profile. New pages should be added to the sitemap and navigation. Search ranking and inclusion in AI answers are decided by the search providers and can take time.

### Finish the handover

- Accept the GitHub invitation and open **develop**.
- Confirm the client can read a quote and reply to the customer.
- Arrange the Cloudflare, Resend, and search-tool access needed by the long-term maintainer.
- Keep this guide updated when the setup changes. The [technical handover](https://github.com/trev222/REViVE-Phone-Repair/blob/develop/docs/AI_HANDOVER.md) gives an AI agent or developer the file map, commands, and recovery details.
