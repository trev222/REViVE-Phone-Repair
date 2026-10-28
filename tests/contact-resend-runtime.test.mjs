import assert from "node:assert/strict";
import { test } from "node:test";
import { build } from "esbuild";
import { Miniflare } from "miniflare";

test("Resend sending and redirect rejection work in the Cloudflare runtime", async () => {
  const bundle = await build({
    stdin: {
      contents: `
        import { createResendSender } from "./src/lib/contact-resend";
        export default {
          async fetch() {
            try {
              await createResendSender("re_runtime_test_only")({
                replyTo: { name: "Test", address: "visitor@example.test" },
                subject: "Local runtime test", text: "No email leaves this test."
              });
              return Response.json({ ok: true });
            } catch {
              return Response.json({ ok: false }, { status: 502 });
            }
          }
        };
      `,
      resolveDir: process.cwd(),
    },
    bundle: true,
    format: "esm",
    platform: "browser",
    write: false,
  });
  const requests = [];
  let redirect = false;
  const runtime = new Miniflare({
    cf: false,
    telemetry: { enabled: false },
    workers: [
      {
        config: {
          name: "resend-runtime-test",
          compatibilityDate: "2026-10-28",
          compatibilityFlags: ["nodejs_compat"],
          manifest: {
            mainModule: "index.js",
            modules: {
              "index.js": { type: "esm", contents: bundle.outputFiles[0].text },
            },
          },
        },
        // Intercept every outbound request: this test cannot contact Resend or Gmail.
        dev: {
          outboundService: {
            type: "fetcher",
            handler: async (request) => {
              requests.push(request.url);
              assert.equal(request.url, "https://api.resend.com/emails");
              assert.equal(
                request.headers.get("authorization"),
                "Bearer re_runtime_test_only",
              );
              const message = await request.json();
              assert.deepEqual(message.to, ["revivecovington@gmail.com"]);
              assert.equal(message.reply_to, "visitor@example.test");
              return redirect
                ? new Response(null, {
                    status: 302,
                    headers: { Location: "https://unrelated.example.test" },
                  })
                : Response.json({ id: "local-runtime-message" });
            },
          },
        },
      },
    ],
  });
  try {
    const accepted = await runtime.dispatchFetch("https://local.example.test/");
    assert.equal(accepted.status, 200);
    assert.deepEqual(await accepted.json(), { ok: true });
    redirect = true;
    const rejected = await runtime.dispatchFetch("https://local.example.test/");
    assert.equal(rejected.status, 502);
    assert.deepEqual(await rejected.json(), { ok: false });
    assert.equal(requests.length, 2, "redirects must not forward the API key");
  } finally {
    await runtime.dispose();
  }
});
