<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## REViVE project handover

Before changing this project, read `docs/AI_HANDOVER.md` for deployment, email, account, DNS, and recovery details. Read `docs/CLIENT_GUIDE.md` for the client editing workflow.

The current Next.js source is on `develop`; `master` and `php-archive` preserve the old PHP site. Production uses Cloudflare Pages Direct Upload, so pushing Git commits does not publish the website. Use the authorized `revive-phone-repair` Wrangler profile for client deployments; the default profile on the original development machine belongs to a different account.

Keep API keys and customer messages out of Git and logs. Automated tests use local or intercepted mail; sending a real test quote requires user authorization for that message. Preserve existing incoming-mail DNS when changing the website or outbound email setup.
