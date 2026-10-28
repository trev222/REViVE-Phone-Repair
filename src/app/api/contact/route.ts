import nodemailer from "nodemailer";
import { site } from "@/lib/site";

export const runtime = "nodejs";
const maximumBodyBytes = 24_000;

function error(message: string, status: number) {
  return Response.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const requestUrl = new URL(request.url);
  // Next.js may normalize request.url to localhost even when the browser uses
  // 127.0.0.1. Match the incoming Host as well as the configured public origin.
  const requestOrigin = `${requestUrl.protocol}//${request.headers.get("host") || requestUrl.host}`;
  if (origin && origin !== requestOrigin && origin !== new URL(site.url).origin) {
    return error("Please submit the form from our website.", 403);
  }
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return error("Please submit the contact form as JSON.", 415);
  }
  if (Number(request.headers.get("content-length")) > maximumBodyBytes) {
    return error("Your message is too long.", 413);
  }

  let data: Record<string, unknown>;
  try {
    // Bound the actual stream too; Content-Length may be absent or inaccurate.
    const reader = request.body?.getReader();
    if (!reader) return error("Please complete the contact form.", 400);
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maximumBodyBytes) {
        await reader.cancel();
        return error("Your message is too long.", 413);
      }
      chunks.push(value);
    }
    const parsed: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return error("Please complete the contact form.", 400);
    data = parsed as Record<string, unknown>;
  } catch {
    return error("Please complete the contact form.", 400);
  }

  // Silently discard submissions that fill the hidden anti-spam field.
  if (typeof data.address === "string" && data.address.trim()) return Response.json({ ok: true });
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const email = typeof data.email === "string" ? data.email.trim() : "";
  const message = typeof data.message === "string" ? data.message.trim() : "";
  if (data.location !== "covington") return error("Please select the Covington location.", 400);
  if (!name || name.length > 50 || /[\r\n]/.test(name)) return error("Please enter a name of 50 characters or fewer.", 400);
  if (!email || email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) return error("Please enter a valid email address.", 400);
  if (!message || message.length > 5000) return error("Please enter a message of 5,000 characters or fewer.", 400);

  const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD, CONTACT_FROM } = process.env;
  const port = Number(process.env.SMTP_PORT || "587");
  if (!SMTP_HOST || !CONTACT_FROM || !Number.isInteger(port) || port < 1 || port > 65535 || Boolean(SMTP_USER) !== Boolean(SMTP_PASSWORD)) {
    return error("The contact form is temporarily unavailable. Please email or call us directly.", 503);
  }

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    requireTLS: process.env.SMTP_REQUIRE_TLS !== "false",
    auth: SMTP_USER && SMTP_PASSWORD ? { user: SMTP_USER, pass: SMTP_PASSWORD } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 15_000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  try {
    const result = await transport.sendMail({
      from: CONTACT_FROM,
      to: process.env.CONTACT_TO || site.email,
      replyTo: { name, address: email },
      subject: "Revive my Phone!",
      text: `Location: Covington\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });
    if (!result.accepted.length || result.rejected.length) throw new Error("Recipient rejected");
    return Response.json({ ok: true });
  } catch {
    // Do not log customer messages or SMTP credentials.
    console.error("Contact email delivery failed.");
    return error("We couldn’t send your message. Please try again or contact us directly.", 502);
  } finally {
    transport.close();
  }
}
