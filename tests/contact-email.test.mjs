import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { after, test } from "node:test";
import { build } from "esbuild";

const directory = await mkdtemp(join(tmpdir(), "revive-email-test-"));
const output = join(directory, "email.mjs");
const originalFetch = globalThis.fetch;
const apiState = { sent: [], requests: [], send: undefined };
globalThis.fetch = async (url, options) => {
  if (url !== "https://api.resend.com/emails") {
    if (typeof url === "string" && url.startsWith("data:"))
      return originalFetch(url, options);
    throw new Error("Unexpected network request in local-only email test.");
  }
  const message = JSON.parse(options.body);
  apiState.requests.push({ url, options });
  if (apiState.send) return apiState.send(message, options);
  apiState.sent.push(message);
  return Response.json({ id: "test-email-id" });
};
await build({
  entryPoints: ["cloudflare/contact-email.ts"],
  outfile: output,
  bundle: true,
  format: "esm",
  platform: "node",
});
const { default: worker } = await import(pathToFileURL(output));
const pagesOutput = join(directory, "pages.cjs");
await build({
  entryPoints: ["cloudflare/worker.ts"],
  outfile: pagesOutput,
  bundle: true,
  format: "cjs",
  platform: "node",
});
const pages = (await import(pathToFileURL(pagesOutput))).default.default;
after(async () => {
  globalThis.fetch = originalFetch;
  await rm(directory, { recursive: true, force: true });
});

const quote = {
  location: "covington",
  first_name: "Quote",
  last_name: "Visitor",
  email: "visitor@example.test",
  phone: "(985) 555-0100",
  service_type: "battery",
  preferred_date: "2026-11-12",
  time_window: "afternoon",
  notes: "Battery drains quickly.",
  address: "",
};
const request = (data = quote, headers = {}) =>
  new Request("https://revivephonerepair.com/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://revivephonerepair.com",
      "CF-Connecting-IP": "192.0.2.1",
      ...headers,
    },
    body: JSON.stringify(data),
  });
function environment(overrides = {}) {
  apiState.sent = [];
  apiState.requests = [];
  apiState.send = undefined;
  const sent = apiState.sent;
  const env = {
    CONTACT_EMAIL_ENABLED: "true",
    RESEND_API_KEY: " re_test_only_fake_key ",
    CONTACT_RATE_LIMITER: { limit: async () => ({ success: true }) },
    CONTACT_SITE_LIMITER: { limit: async () => ({ success: true }) },
    ...overrides,
  };
  return { env, sent };
}

test("Pages forwards the quote to the private service and handles immutable response headers", async () => {
  const original = request();
  let forwarded;
  const response = await pages.fetch(original, {
    CONTACT_EMAIL: {
      fetch: async (received) => {
        forwarded = received;
        // fetch responses have immutable headers, including across service bindings.
        return fetch('data:application/json,{"ok":true}');
      },
    },
  });
  assert.equal(forwarded, original);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { ok: true });
});

test("Pages preserves a paused service response and safely handles service outages", async () => {
  for (const fetchService of [
    async () =>
      Response.json({ error: "temporarily unavailable" }, { status: 503 }),
    async () => {
      throw new Error("private service details");
    },
  ]) {
    const response = await pages.fetch(request(), {
      CONTACT_EMAIL: { fetch: fetchService },
    });
    assert.ok([502, 503].includes(response.status));
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.doesNotMatch(
      await response.text(),
      /private service details|ok.*true/,
    );
  }
});

test("Cloudflare mail preserves quote details and ignores visitor-supplied recipients", async () => {
  const { env, sent } = environment();
  const response = await worker.fetch(
    request({
      ...quote,
      to: "attacker@example.test",
      from: "attacker@example.test",
    }),
    env,
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(sent.length, 1);
  assert.deepEqual(sent[0].to, ["revivecovington@gmail.com"]);
  assert.equal(
    sent[0].from,
    "REViVE website quotes <quotes@notifications.revivephonerepair.com>",
  );
  const { url, options } = apiState.requests[0];
  assert.equal(url, "https://api.resend.com/emails");
  assert.equal(options.method, "POST");
  assert.equal(options.headers.Authorization, "Bearer re_test_only_fake_key");
  assert.equal(options.redirect, "manual");
  assert.ok(options.signal instanceof AbortSignal);
  assert.equal(sent[0].reply_to, quote.email);
  assert.ok(sent[0].text.includes("Quote Visitor"));
  for (const value of [
    quote.phone,
    "Battery replacement",
    quote.preferred_date,
    "Afternoon",
    quote.notes,
  ])
    assert.ok(sent[0].text.includes(value), value);
});

test("Cloudflare mail stays unavailable while activation or required bindings are missing", async () => {
  for (const patch of [
    { CONTACT_EMAIL_ENABLED: "false" },
    { RESEND_API_KEY: undefined },
    { RESEND_API_KEY: "   " },
    { CONTACT_RATE_LIMITER: undefined },
    { CONTACT_SITE_LIMITER: undefined },
  ]) {
    const { env, sent } = environment(patch);
    const response = await worker.fetch(request(), env);
    assert.equal(response.status, 503);
    assert.equal(sent.length, 0);
    assert.match((await response.json()).error, /email or call/);
  }
});

test("Cloudflare mail failures never return success or expose provider details", async () => {
  for (const send of [
    async () => {
      throw new Error("private provider details");
    },
    async () =>
      Response.json({ message: "private provider details" }, { status: 403 }),
    async () => Response.json({ message: "quota exceeded" }, { status: 429 }),
    async () =>
      new Response(null, {
        status: 302,
        headers: { Location: "https://unrelated.example.test" },
      }),
    async () => Response.json({}),
    async () => Response.json({ id: " " }),
    async () => new Response("not json"),
    async () => {
      throw new DOMException("Request timed out", "TimeoutError");
    },
  ]) {
    const { env } = environment();
    apiState.send = send;
    const response = await worker.fetch(request(), env);
    assert.equal(response.status, 502);

    const body = await response.text();
    assert.match(body, /couldn’t send/);
    assert.doesNotMatch(body, /private provider details|ok.*true/);
  }
});

test("Cloudflare mail enforces per-visitor and site request limits", async () => {
  for (const name of ["CONTACT_RATE_LIMITER", "CONTACT_SITE_LIMITER"]) {
    const { env, sent } = environment({
      [name]: { limit: async () => ({ success: false }) },
    });
    const response = await worker.fetch(request(), env);
    assert.equal(response.status, 429);
    assert.equal(sent.length, 0);
  }
});

test("Cloudflare mail does not send if rate-limit checks fail", async () => {
  const { env, sent } = environment({
    CONTACT_RATE_LIMITER: {
      limit: async () => {
        throw new Error("unavailable");
      },
    },
  });
  assert.equal((await worker.fetch(request(), env)).status, 502);
  assert.equal(sent.length, 0);
});

test("Cloudflare mail requires Cloudflare's visitor IP and rejects foreign origins", async () => {
  const { env, sent } = environment();
  const withoutIp = request();
  withoutIp.headers.delete("CF-Connecting-IP");
  assert.equal((await worker.fetch(withoutIp, env)).status, 503);
  assert.equal(
    (
      await worker.fetch(
        request(quote, { Origin: "https://unrelated.example.test" }),
        env,
      )
    ).status,
    403,
  );
  assert.equal(sent.length, 0);
});

test("Cloudflare mail validates fields and drops honeypot submissions", async () => {
  const { env, sent } = environment();
  assert.equal(
    (
      await worker.fetch(
        request({
          ...quote,
          email: "visitor@example.test\r\nBcc: attacker@example.test",
        }),
        env,
      )
    ).status,
    400,
  );
  assert.equal(
    (await worker.fetch(request({ ...quote, notes: "x".repeat(25000) }), env))
      .status,
    413,
  );
  assert.equal(
    (await worker.fetch(request({ ...quote, address: "spam" }), env)).status,
    200,
  );
  assert.equal(sent.length, 0);
});

test("Cloudflare email Worker exposes only POST /api/contact", async () => {
  const { env, sent } = environment();
  const response = await worker.fetch(
    new Request("https://revivephonerepair.com/api/contact"),
    env,
  );
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "POST");
  assert.equal(
    (await worker.fetch(new Request("https://revivephonerepair.com/"), env))
      .status,
    404,
  );
  assert.equal(sent.length, 0);
});
