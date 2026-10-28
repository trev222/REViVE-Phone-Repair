import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import net from "node:net";
import { after, before, test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";

const messages = [];
const connections = new Set();
const applications = [];
let rejectMail = false;
let origin;
let unconfiguredOrigin;

// Local SMTP sink: never connects to an external mail service.
const smtp = net.createServer((socket) => {
  connections.add(socket);
  socket.on("close", () => connections.delete(socket));
  socket.on("error", () => {});
  socket.write("220 localhost test SMTP\r\n");
  let buffer = "";
  let collecting = false;
  let message = [];
  socket.on("data", (chunk) => {
    buffer += chunk.toString();
    let end;
    while ((end = buffer.indexOf("\r\n")) !== -1) {
      const line = buffer.slice(0, end);
      buffer = buffer.slice(end + 2);
      if (collecting) {
        if (line === ".") {
          collecting = false;
          if (!rejectMail) messages.push(message.join("\r\n"));
          socket.write(
            rejectMail
              ? "550 Delivery rejected for test\r\n"
              : "250 Message accepted\r\n",
          );
          message = [];
        } else message.push(line.replace(/^\.\./, "."));
      } else if (/^(EHLO|HELO)/.test(line)) socket.write("250 localhost\r\n");
      else if (line === "DATA") {
        collecting = true;
        socket.write("354 End with a dot\r\n");
      } else if (line === "QUIT") socket.end("221 Bye\r\n");
      else socket.write("250 OK\r\n");
    }
  });
});

async function availablePort() {
  const probe = net.createServer();
  probe.listen(0, "127.0.0.1");
  await once(probe, "listening");
  const port = probe.address().port;
  await new Promise((resolve) => probe.close(resolve));
  return port;
}

async function startApp(extraEnv) {
  const port = await availablePort();
  const child = spawn(
    process.execPath,
    [
      "node_modules/next/dist/bin/next",
      "start",
      "--hostname",
      "127.0.0.1",
      "--port",
      String(port),
    ],
    {
      env: {
        ...process.env,
        NODE_ENV: "production",
        NEXT_TELEMETRY_DISABLED: "1",
        ...extraEnv,
      },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );
  applications.push(child);
  let output = "";
  child.stdout.on("data", (chunk) => {
    output += chunk;
  });
  child.stderr.on("data", (chunk) => {
    output += chunk;
  });
  const url = `http://127.0.0.1:${port}`;
  for (let attempt = 0; attempt < 100; attempt++) {
    if (child.exitCode !== null) throw new Error(`Next.js exited: ${output}`);
    try {
      if ((await fetch(url)).ok) return url;
    } catch {
      /* Wait for startup. */
    }
    await delay(100);
  }
  throw new Error(`Next.js did not start: ${output}`);
}

before(async () => {
  smtp.listen(0, "127.0.0.1");
  await once(smtp, "listening");
  const env = {
    SMTP_HOST: "127.0.0.1",
    SMTP_PORT: String(smtp.address().port),
    SMTP_SECURE: "false",
    SMTP_REQUIRE_TLS: "false",
    SMTP_USER: "",
    SMTP_PASSWORD: "",
    CONTACT_FROM: "Website <website@example.test>",
    CONTACT_TO: "repairs@example.test",
  };
  origin = await startApp(env);
  unconfiguredOrigin = await startApp({
    ...env,
    SMTP_HOST: "",
    CONTACT_FROM: "",
  });
});

after(async () => {
  for (const child of applications) {
    if (child.exitCode === null) {
      child.kill("SIGTERM");
      await once(child, "exit");
    }
  }
  for (const socket of connections) socket.destroy();
  await new Promise((resolve) => smtp.close(resolve));
});

const valid = {
  location: "covington",
  name: "Test Visitor",
  email: "visitor@example.test",
  address: "",
  message: "Please quote a screen repair.",
};
const submit = (body, base = origin, headers = {}) =>
  fetch(`${base}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: base, ...headers },
    body: JSON.stringify(body),
  });

test("all pages render their content and canonical metadata", async () => {
  for (const [path, heading] of [
    ["/", "Your phone, brought back to life."],
    ["/about", "Built for people who depend on their phones."],
    ["/services", "Every repair. Every brand. One honest price."],
    ["/locations", "Visit us in Covington."],
    ["/contact", "Get a quote or ask a question."],
    ["/blog", "Phone repair &amp; buyback guides"],
  ]) {
    const response = await fetch(origin + path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, new RegExp(`<h1[^>]*>${heading}</h1>`));
    assert.equal((html.match(/<h1[ >]/g) || []).length, 1);
    assert.match(html, /rel="canonical"/);
    if (!["/locations", "/blog"].includes(path))
      assert.match(html, /aria-current="page"/);
    assert.doesNotMatch(
      html,
      /<\?php|jquery|godaddy|airo-assets|data-dev-id|roofing|solar/i,
    );
  }
});

test("legacy URLs redirect permanently and keep query strings", async () => {
  for (const route of [
    "index",
    "about",
    "services",
    "location",
    "locations",
    "contact",
  ]) {
    const target =
      route === "index"
        ? "/"
        : route === "location"
          ? "/locations"
          : `/${route}`;
    const aliases = [`/${route}.php`, `/${route}.html`];
    if (["index", "location"].includes(route)) aliases.push(`/${route}`);
    for (const alias of aliases) {
      const response = await fetch(`${origin}${alias}?source=legacy`, {
        redirect: "manual",
      });
      assert.equal(response.status, 308, alias);
      const location = new URL(response.headers.get("location"), origin);
      assert.equal(location.pathname, target);
      assert.equal(location.search, "?source=legacy");
    }
  }
});

test("original assets, sitemap, robots, and manifest are served", async () => {
  const assets = [
    "/css/img/revivephonerepair-logo.png",
    "/css/img/location2.JPG",
    "/images/revive-logo.png",
    "/images/phone-repair.jpg",
    "/favicon/favicon.ico",
    ...Array.from({ length: 8 }, (_, i) => `/css/img/slide${i + 1}.JPG`),
  ];
  for (const path of assets)
    assert.equal((await fetch(origin + path)).status, 200, path);
  const sitemap = await (await fetch(origin + "/sitemap.xml")).text();
  assert.equal((sitemap.match(/<loc>/g) || []).length, 6);
  assert.match(
    await (await fetch(origin + "/robots.txt")).text(),
    /Sitemap: https?:\/\/.+\/sitemap.xml/,
  );
  const manifest = await (await fetch(origin + "/manifest.webmanifest")).json();
  assert.equal(manifest.name, "REViVE Phone Repair");
  for (const icon of manifest.icons)
    assert.equal((await fetch(origin + icon.src)).status, 200);
});

test("unknown pages return 404", async () => {
  assert.equal((await fetch(origin + "/does-not-exist")).status, 404);
});

test("valid submissions reach only the configured local mailbox", async () => {
  const response = await submit({ ...valid, to: "untrusted@example.test" });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true });
  assert.equal(messages.length, 1);
  assert.match(messages[0], /To: repairs@example.test/);
  assert.match(messages[0], /Reply-To: Test Visitor <visitor@example.test>/);
  assert.match(messages[0], /Please quote a screen repair\./);
  assert.doesNotMatch(messages[0], /untrusted@example.test/);
});

test("invalid fields and email header injection are rejected", async () => {
  const count = messages.length;
  for (const patch of [
    { name: " " },
    { name: "x".repeat(51) },
    { email: "not-an-email" },
    { email: "person@example.test\r\nBcc: other@example.test" },
    { message: "" },
    { message: "x".repeat(5001) },
    { location: "mandeville" },
  ]) {
    assert.equal(
      (await submit({ ...valid, ...patch })).status,
      400,
      JSON.stringify(patch).slice(0, 120),
    );
  }
  assert.equal(messages.length, count);
});

test("malformed, oversized, unsupported, and foreign-origin requests are rejected", async () => {
  for (const body of [null, [], "text"])
    assert.equal((await submit(body)).status, 400);
  assert.equal(
    (
      await fetch(origin + "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{",
      })
    ).status,
    400,
  );
  assert.equal(
    (await submit({ ...valid, message: "x".repeat(25_000) })).status,
    413,
  );
  assert.equal(
    (await submit(valid, origin, { "Content-Type": "text/plain" })).status,
    415,
  );
  assert.equal(
    (await submit(valid, origin, { Origin: "https://other.example.test" }))
      .status,
    403,
  );
});

test("honeypot silently discards bot submissions", async () => {
  const count = messages.length;
  assert.equal((await submit({ ...valid, address: "spam" })).status, 200);
  assert.equal(messages.length, count);
});

test("SMTP rejection is reported as failure, never success", async () => {
  rejectMail = true;
  try {
    const response = await submit(valid);
    assert.equal(response.status, 502);
    assert.match((await response.json()).error, /couldn’t send/);
  } finally {
    rejectMail = false;
  }
});

test("missing SMTP configuration has a clear fallback", async () => {
  const response = await submit(valid, unconfiguredOrigin);
  assert.equal(response.status, 503);
  assert.match((await response.json()).error, /email or call/);
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

test("quote form delivers all contact, device, and scheduling fields", async () => {
  const count = messages.length;
  assert.equal((await submit(quote)).status, 200);
  assert.equal(messages.length, count + 1);
  const mail = messages
    .at(-1)
    .replace(/=\r\n/g, "")
    .replace(/=([0-9A-F]{2})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    );
  for (const value of [
    "Quote Visitor",
    "(985) 555-0100",
    "Battery replacement",
    "2026-11-12",
    "Afternoon",
    "Battery drains quickly.",
  ])
    assert.ok(mail.includes(value), value);
  assert.equal(
    (
      await submit({
        ...quote,
        notes: "",
        phone: "",
        service_type: "",
        preferred_date: "",
        time_window: "",
      })
    ).status,
    200,
  );
});

test("invalid quote details cannot reach the mailbox", async () => {
  const count = messages.length;
  for (const patch of [
    { first_name: "" },
    { last_name: "x".repeat(51) },
    { first_name: "Visitor\r\nBcc: other@example.test" },
    { phone: "x".repeat(41) },
    { service_type: "roofing" },
    { service_type: "__proto__" },
    { time_window: "midnight" },
    { preferred_date: "2026-02-30" },
    { preferred_date: "invalid" },
    { notes: "x".repeat(5001) },
  ]) {
    assert.equal(
      (await submit({ ...quote, ...patch })).status,
      400,
      JSON.stringify(patch).slice(0, 120),
    );
  }
  assert.equal(messages.length, count);
});
