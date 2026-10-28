import assert from "node:assert/strict";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { after, test } from "node:test";
import { build } from "esbuild";

const directory = await mkdtemp(join(tmpdir(), "revive-email-test-"));
const output = join(directory, "email.mjs");
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
after(() => rm(directory, { recursive: true, force: true }));

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
  const sent = [];
  const env = {
    CONTACT_EMAIL_ENABLED: "true",
    EMAIL: {
      send: async (message) => {
        sent.push(message);
        return { messageId: "local-test-only" };
      },
    },
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
  assert.equal(sent[0].to, "revivecovington@gmail.com");
  assert.equal(sent[0].from.email, "quotes@revivephonerepair.com");
  assert.deepEqual(sent[0].replyTo, {
    email: quote.email,
    name: "Quote Visitor",
  });
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
    { EMAIL: undefined },
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
    async () => ({}),
  ]) {
    const { env } = environment({ EMAIL: { send } });
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
